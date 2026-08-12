#!/usr/bin/env node
/**
 * generate-echo-reference-json.js
 *
 * Converts `Reference/echo-breeds.js` (the published clinical constants behind the VetCardioHub
 * Echo Calculator) into `VCHEchoCalc/Resources/echo-reference.json`, which the iOS app bundles and
 * decodes via `Logic/ReferenceStore.swift`. Sibling of `generate-glossary-json.js` — same safety
 * model, same "one source of truth" workflow.
 *
 * WHY: 911 lines of reference intervals hand-transcribed into Swift is a guaranteed source of
 * silent clinical error, and it would drift the moment the web copy is edited. Edit the JS, bump
 * `VCH_ECHO_REF_REVIEWED`, regenerate. NEVER hand-edit the JSON — regenerating wipes it.
 *
 * USAGE (paths default relative to this script's own folder):
 *   node Tools/generate-echo-reference-json.js
 *   node Tools/generate-echo-reference-json.js [input echo-breeds.js] [output echo-reference.json]
 * DEFAULTS:
 *   ../Reference/echo-breeds.js  ->  ../VCHEchoCalc/Resources/echo-reference.json
 *
 * SAFETY: the file is treated as DATA, not code — evaluated in a locked-down `vm` sandbox (timeout,
 * no require / fs / process / network). Output is deterministic (keys sorted, no build timestamps)
 * so identical input gives byte-identical output: clean git diffs.
 *
 * ── Transformations applied (CONVERSION-PLAN.md §4.1) ────────────────────────────────────────
 *
 * 1. `Infinity` -> `null`.  JSON has no Infinity. It occurs only as the `max` of a terminal band in
 *    `mineModels[*].ranges[*]` and `diastolicRules[*]`, where `null` unambiguously means "no upper
 *    bound". Swift decodes those two sites as `max ?? .infinity`. NaN is rejected outright.
 *
 * 2. Breed metric keys are CANONICALISED.  The 28 breed entries spell the same measurements 30
 *    different ways (`FS` / `fs_pct` / `FS_PCT`, `lad` / `LAD_mm`, `lvidd_n` / `lviddn`,
 *    `ivsd_cm` vs `ivsd_mm`). `echocalc.js:505` papers over this with a lookup dictionary. Here each
 *    metric is emitted under a canonical key matching the Swift/JS derived-index property name, with
 *    the original preserved as `sourceKey` for traceability, plus a curated clinical `label`/`unit`.
 *
 * 3. `*_cm` metrics are multiplied by 10 to mm, so every breed metric is directly comparable with the
 *    app's patient values. Affects `ivsd_cm` and `lvidd_cm` (Toy Breeds only). The web app does NOT
 *    do this — see "Deliberate divergences" below.
 *
 * 4. Flat breeds and `sources[]` breeds are normalised to ONE shape: every breed has a `sources`
 *    array; a flat breed becomes a single source carrying the breed's own reference/pmid/note.
 *
 * 5. Non-interval scalars (`exponent`, `VPC_24h_limit`, `tr_prevalence`) are separated out into
 *    `extras` — they are study facts, not reference intervals, and must not render as ranges.
 *
 * `median`+`sd` metrics are emitted VERBATIM. The `median ± 1.96×sd` derivation and its on-screen
 * "Statistical Derivation Note" are ported into Swift (Phase 5) so the disclosure travels with it.
 *
 * ── Deliberate divergences from the web app (all fix latent web display bugs) ─────────────────
 *   a. `ivsd_cm` / `lvidd_cm` (Toy Breeds) become mm. The web renders "~1.78" against a patient
 *      LVIDd in mm — a 10x mismatch on screen.
 *   b. `LAD_mm` (Whippet) and `lviddn` (Toy Breeds) are absent from the web's patientValues map, so
 *      those rows never show a patient value. Canonicalisation fixes that.
 *
 * Requires Node.js (any recent version). No npm dependencies.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

function fail(msg) {
  console.error('✖ ' + msg);
  process.exit(1);
}

const here = __dirname; // .../VCHEchoCalc/Tools
const inputPath = process.argv[2] || path.join(here, '..', 'Reference', 'echo-breeds.js');
const outputPath =
  process.argv[3] || path.join(here, '..', 'VCHEchoCalc', 'Resources', 'echo-reference.json');

// ── Evaluate echo-breeds.js as data ───────────────────────────────────────────────────────────
let source;
try {
  source = fs.readFileSync(inputPath, 'utf8');
} catch (e) {
  fail(`Cannot read input file "${inputPath}": ${e.message}`);
}

// echo-breeds.js declares its consts at top level (the first one is indented), so discover them
// rather than hard-coding names: a rename in the JS is then picked up automatically.
const names = [];
const re = /^\s*const\s+([A-Za-z_$][A-Za-z0-9_$]*)\s*=/gm;
let m;
while ((m = re.exec(source)) !== null) names.push(m[1]);
if (names.length === 0) fail('No top-level `const` declarations found — is this the right file?');

const collector = `\n;globalThis.__VCH_EXPORT__ = { ${names.join(', ')} };`;
const sandbox = {}; // no require, no process, no fs, no network
vm.createContext(sandbox);
try {
  vm.runInContext(source + collector, sandbox, { timeout: 5000, filename: inputPath });
} catch (e) {
  fail(`Failed to evaluate "${inputPath}" as data: ${e.message}`);
}
const data = sandbox.__VCH_EXPORT__ || {};

// ── Sanity checks — refuse to emit a garbled / truncated / undated reference set ──────────────
const reviewed = data.VCH_ECHO_REF_REVIEWED;
if (typeof reviewed !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(reviewed.trim())) {
  fail('VCH_ECHO_REF_REVIEWED is missing or not an ISO yyyy-MM-dd date — add/bump it in echo-breeds.js.');
}

const REQUIRED = {
  breedSpecificReferenceRanges: 28,
  allometricModels: 7,
  rightHeartModels: 2,
  leftHeartModels: 2,
  mineModels: 2,
  diastolicRules: 8,
};
for (const [name, expectedCount] of Object.entries(REQUIRED)) {
  const obj = data[name];
  if (!obj || typeof obj !== 'object') fail(`${name} is missing or not an object.`);
  const n = Object.keys(obj).length;
  // A shrinking table means a truncated paste; a growing one means new clinical content that
  // needs Swift tests. Either way, stop and make the author look.
  if (n !== expectedCount) {
    fail(
      `${name} has ${n} entries, expected ${expectedCount}. If this change is intended, update ` +
        `REQUIRED in this generator AND add Swift tests for the new content.`
    );
  }
}

// ── Canonical breed-metric dictionary ─────────────────────────────────────────────────────────
// canonical key -> label/unit. The canonical key is the app's derived-index property name, so a
// view can look up the live patient value for a breed row by key alone (cf. echocalc.js:505).
// `unit: null` means dimensionless (ratios) or not stated by the source — never a guess.
const METRICS = {
  lvidd:     { label: 'LVIDd',          unit: 'mm' },
  lvids:     { label: 'LVIDs',          unit: 'mm' },
  ivsd:      { label: 'IVSd',           unit: 'mm' },
  lvpwd:     { label: 'LVFWd',          unit: 'mm' },
  lad:       { label: 'LAD',            unit: 'mm' },
  ladn:      { label: 'LADN',           unit: null },
  lviddn:    { label: 'LVIDdN',         unit: null },
  lvidsn:    { label: 'LVIDsN',         unit: null },
  laAo:      { label: 'LA:Ao',          unit: null },
  tapse:     { label: 'TAPSE',          unit: 'mm' },
  tapseaola: { label: 'TAPSE:Ao',       unit: null },
  eivrt:     { label: 'E:IVRT',         unit: null },
  fs:        { label: 'FS',             unit: '%' },
  ef:        { label: 'EF',             unit: '%' },
  lvedv:     { label: 'EDV (SMOD)',     unit: 'ml' },
  lvesv:     { label: 'ESV (SMOD)',     unit: 'ml' },
  lvedvbw:   { label: 'EDV (SMOD)/BW',  unit: 'ml/kg' },
  lvesvbw:   { label: 'ESV (SMOD)/BW',  unit: 'ml/kg' },
  edvim2:    { label: 'EDVI (SMOD)',    unit: 'ml/m²' },
  esvim2:    { label: 'ESVI (SMOD)',    unit: 'ml/m²' },
  aovmax:    { label: 'Ao Vmax',        unit: 'm/s' },
  vhs:       { label: 'VHS',            unit: null },
  ntProBnp:  { label: 'NT-proBNP',      unit: null },
};

// source key -> { key: canonical, scale: multiplier applied to every numeric field }
const METRIC_KEY_MAP = {
  lvidd_mm:      { key: 'lvidd' },
  lvidd_cm:      { key: 'lvidd', scale: 10 },
  lvids_mm:      { key: 'lvids' },
  ivsd_mm:       { key: 'ivsd' },
  ivsd_cm:       { key: 'ivsd', scale: 10 },
  lvfwd_mm:      { key: 'lvpwd' }, // the app measures LV free wall as lvpwd (echocalc.js:505)
  lvpwd_mm:      { key: 'lvpwd' },
  lad:           { key: 'lad' },
  lad_mm:        { key: 'lad' },
  LAD_mm:        { key: 'lad' },
  lad_n:         { key: 'ladn' },
  lvidd_n:       { key: 'lviddn' },
  lviddn:        { key: 'lviddn' },
  lvids_n:       { key: 'lvidsn' },
  la_ao:         { key: 'laAo' },
  TAPSE_mm:      { key: 'tapse' },
  TAPSE_Ao:      { key: 'tapseaola' },
  eivrt:         { key: 'eivrt' },
  FS:            { key: 'fs' },
  fs_pct:        { key: 'fs' },
  FS_PCT:        { key: 'fs' },
  EF:            { key: 'ef' },
  ef:            { key: 'ef' },
  ef_pct:        { key: 'ef' },
  EF_PCT:        { key: 'ef' },
  edv_smod:      { key: 'lvedv' },
  esv_smod:      { key: 'lvesv' },
  edvi_smod_kg:  { key: 'lvedvbw' },
  esvi_smod_kg:  { key: 'lvesvbw' },
  edvi_smod_m2:  { key: 'edvim2' },
  esvi_smod_m2:  { key: 'esvim2' },
  ao_vmax:       { key: 'aovmax' },
  vhs:           { key: 'vhs' },
  nt_probnp:     { key: 'ntProBnp' },
};

// Keys that are breed/source metadata, not measurements.
const BREED_TAGS = [
  'is_deviant', 'isSighthound', 'isFeline', 'isToy', 'isKitten',
  'pmid', 'clinical_note', 'reference', 'sources', 'metrics',
  'DataCheck', // authoring marker in echo-breeds.js (Great Dane) — not clinical content
];

// Non-interval scalars: study facts that must not be rendered as a reference interval.
const EXTRAS = {
  exponent:      { label: 'Allometric exponent' },
  VPC_24h_limit: { label: 'VPC limit (24 h Holter)' },
  tr_prevalence: { label: 'TR prevalence' },
};

// The nine observed MetricRange shapes (CONVERSION-PLAN.md §4.2). Any tenth shape is new clinical
// content that Swift's `MetricRange` has not been taught to decode — stop rather than emit it.
const RANGE_FIELDS = ['min', 'max', 'mean', 'median', 'sd'];
const KNOWN_SHAPES = new Set([
  'max+min', 'max+median+min', 'median+sd', 'max+mean+min',
  'max', 'max+median', 'median', 'min', 'mean',
]);

const problems = [];

// echo-breeds.js spells species "canine" in allometricModels but "Canine" in the right-heart and
// volumetric models. The species tag gates "never apply a canine model to a cat", so it is
// normalised here rather than left for every call site to case-fold.
const SPECIES = new Set(['canine', 'feline']);
function normaliseSpecies(context, raw) {
  const s = String(raw ?? '').trim().toLowerCase();
  if (!SPECIES.has(s)) {
    problems.push(`${context}: species "${raw}" is neither canine nor feline.`);
    return null;
  }
  return s;
}

function convertMetric(breedName, sourceKey, raw) {
  const mapping = METRIC_KEY_MAP[sourceKey];
  if (!mapping) {
    problems.push(
      `${breedName}: unmapped metric key "${sourceKey}" — add it to METRIC_KEY_MAP (and METRICS).`
    );
    return null;
  }
  const def = METRICS[mapping.key];
  if (!def) {
    problems.push(`${breedName}: "${sourceKey}" maps to unknown canonical key "${mapping.key}".`);
    return null;
  }

  const shape = Object.keys(raw).sort().join('+');
  if (!KNOWN_SHAPES.has(shape)) {
    problems.push(
      `${breedName}.${sourceKey}: unrecognised range shape {${shape}}. Teach Swift's MetricRange ` +
        `to decode it, then add the shape to KNOWN_SHAPES.`
    );
    return null;
  }

  const out = { key: mapping.key, sourceKey, label: def.label, unit: def.unit };
  const scale = mapping.scale || 1;
  for (const field of RANGE_FIELDS) {
    if (raw[field] === undefined) continue;
    const n = Number(raw[field]);
    if (!Number.isFinite(n)) {
      problems.push(`${breedName}.${sourceKey}.${field}: not a finite number (${raw[field]}).`);
      return null;
    }
    // Round away binary float noise introduced by the cm->mm scaling (1.78*10 = 17.799999...).
    out[field] = scale === 1 ? n : Math.round(n * scale * 1e6) / 1e6;
  }
  if (scale !== 1) out.scaledFromSourceUnit = 'cm'; // provenance for the ×10 conversion
  return out;
}

/** Splits one flat metric bag (a flat breed, or a source's `metrics`) into ranges + extras. */
function convertMetricBag(breedName, bag) {
  const metrics = {};
  const extras = {};
  for (const [sourceKey, value] of Object.entries(bag)) {
    if (BREED_TAGS.includes(sourceKey)) continue;

    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      const converted = convertMetric(breedName, sourceKey, value);
      if (!converted) continue;
      if (metrics[converted.key]) {
        // Two spellings of the same measurement inside one source would silently lose one of them.
        problems.push(
          `${breedName}: "${sourceKey}" and "${metrics[converted.key].sourceKey}" both canonicalise ` +
            `to "${converted.key}" within the same source — resolve in echo-breeds.js.`
        );
        continue;
      }
      metrics[converted.key] = converted;
    } else if (EXTRAS[sourceKey]) {
      extras[sourceKey] = { label: EXTRAS[sourceKey].label, value };
    } else {
      problems.push(
        `${breedName}: scalar key "${sourceKey}" (${JSON.stringify(value)}) is neither a metric ` +
          `nor a known extra — add it to EXTRAS or BREED_TAGS.`
      );
    }
  }
  return { metrics, extras };
}

// ── Breeds ────────────────────────────────────────────────────────────────────────────────────
const breedReferences = {};
for (const [name, breed] of Object.entries(data.breedSpecificReferenceRanges)) {
  const rawSources = Array.isArray(breed.sources)
    ? breed.sources
    : [breed]; // a flat breed normalises to a single source carrying its own metadata

  const sources = rawSources.map((src) => {
    const { metrics, extras } = convertMetricBag(name, src.metrics || src);
    return {
      reference: src.reference ?? null,
      pmid: src.pmid !== undefined && src.pmid !== null ? String(src.pmid) : null,
      clinicalNote: src.clinical_note ?? null,
      metrics,
      extras,
    };
  });

  breedReferences[name] = {
    name,
    isDeviant: breed.is_deviant === true,
    isSighthound: breed.isSighthound === true,
    isToy: breed.isToy === true,
    isFeline: breed.isFeline === true,
    isKitten: breed.isKitten === true,
    sources,
  };
}

// ── Models — passed through verbatim, with only key-name normalisation ────────────────────────
// Params are copied field-for-field rather than whitelisted, so no published constant can be
// silently dropped; unknown fields are reported instead.
const KNOWN_PARAM_FIELDS = new Set([
  'a', 'b', 'type', 'see', 'normMin', 'normMax', 'multiplier', 'minMultiplier', 'maxMultiplier',
]);
const KNOWN_PARAM_TYPES = new Set(['norm', 'log', 'log_direct', undefined]);

function convertParams(modelName, params) {
  const out = {};
  for (const [param, spec] of Object.entries(params)) {
    const copy = {};
    for (const [field, value] of Object.entries(spec)) {
      if (!KNOWN_PARAM_FIELDS.has(field)) {
        problems.push(`${modelName}.${param}: unknown field "${field}" — teach ReferenceStore.swift about it.`);
        continue;
      }
      copy[field] = value;
    }
    if (!KNOWN_PARAM_TYPES.has(copy.type)) {
      problems.push(`${modelName}.${param}: unknown formula type "${copy.type}".`);
    }
    if (!Number.isFinite(copy.a) || !Number.isFinite(copy.b)) {
      problems.push(`${modelName}.${param}: missing or non-finite a/b coefficient.`);
    }
    out[param] = copy;
  }
  return out;
}

const allometricModels = {};
for (const [key, model] of Object.entries(data.allometricModels)) {
  allometricModels[key] = {
    label: model.label,
    species: normaliseSpecies(`allometricModels.${key}`, model.species),
    reference: model.reference ?? null,
    pmid: model.pmid !== undefined ? String(model.pmid) : null,
    // Constants published in cm; the app works in mm. Getting this backwards is a 10x error.
    isCm: model.isCm === true,
    breed: model.breed ?? null,
    multiplier: model.multiplier ?? null, // k for the log-interval half-width; Swift defaults to 1.96
    clinicalNote: model.clinicalNote ?? null,
    params: convertParams(`allometricModels.${key}`, model.params),
  };
  if (typeof model.isCm !== 'boolean') {
    problems.push(`allometricModels.${key}: isCm is not a boolean (${model.isCm}) — a 10x risk.`);
  }
}

const rightHeartModels = {};
for (const [key, model] of Object.entries(data.rightHeartModels)) {
  rightHeartModels[key] = {
    label: model.label,
    species: normaliseSpecies(`rightHeartModels.${key}`, model.species),
    pmid: model.PMID !== undefined ? String(model.PMID) : model.pmid !== undefined ? String(model.pmid) : null,
    reference: model.reference ?? null,
    clinicalNote: model.clinicalNote ?? null,
    params: convertParams(`rightHeartModels.${key}`, model.params),
  };
}

const leftHeartModels = {};
for (const [key, model] of Object.entries(data.leftHeartModels)) {
  const rows = model.data.map((r) => ({
    weight: r.weight,
    edvMin: r.edvMin,
    edvMax: r.edvMax,
    esvMin: r.esvMin,
    esvMax: r.esvMax,
  }));
  for (let i = 1; i < rows.length; i++) {
    // Interpolation assumes a strictly ascending weight column; an unsorted table would silently
    // return the wrong interval rather than fail.
    if (!(rows[i].weight > rows[i - 1].weight)) {
      problems.push(`leftHeartModels.${key}: weight column is not strictly ascending at row ${i}.`);
    }
  }
  leftHeartModels[key] = {
    label: model.label,
    species: normaliseSpecies(`leftHeartModels.${key}`, model.species),
    pmid: model.PMID !== undefined ? String(model.PMID) : null,
    type: model.type,
    data: rows,
  };
}

const mineModels = {};
for (const [key, model] of Object.entries(data.mineModels)) {
  const ranges = {};
  for (const [variable, bands] of Object.entries(model.ranges)) {
    ranges[variable] = bands.map((b) => ({
      max: Number.isFinite(b.max) ? b.max : null, // Infinity -> null (terminal band)
      pts: b.pts,
    }));
  }
  for (const variable of model.variables) {
    if (!ranges[variable]) problems.push(`mineModels.${key}: variable "${variable}" has no ranges.`);
  }
  mineModels[key] = {
    label: model.label,
    variables: model.variables.slice(),
    ranges,
    tiers: model.tiers.map((t) => ({
      min: t.min,
      max: t.max,
      label: t.label,
      mst: t.mst,
      severityClass: t.class, // JS key: class (reserved-ish in Swift; renamed at the boundary)
    })),
  };
}

const diastolicRules = {};
for (const [param, bands] of Object.entries(data.diastolicRules)) {
  diastolicRules[param] = bands.map((b) => ({
    min: b.min,
    max: Number.isFinite(b.max) ? b.max : null, // Infinity -> null (terminal band)
    category: b.category,
    grade: b.grade,
    points: b.points,
  }));
}

if (problems.length > 0) {
  problems.forEach((p) => console.error('  ✖ ' + p));
  fail(`${problems.length} problem(s) in the reference data — nothing written.`);
}

// ── Deterministic output ──────────────────────────────────────────────────────────────────────
function sortKeys(value) {
  if (Array.isArray(value)) return value.map(sortKeys);
  if (value && typeof value === 'object') {
    const out = {};
    for (const k of Object.keys(value).sort()) out[k] = sortKeys(value[k]);
    return out;
  }
  if (typeof value === 'number' && !Number.isFinite(value)) {
    fail(`Non-finite number survived conversion (${value}) — JSON cannot represent it.`);
  }
  return value;
}

const output = {
  _meta: {
    source: path.basename(inputPath),
    generator: 'generate-echo-reference-json.js',
    note: 'GENERATED FILE — do not edit by hand. Regenerate from echo-breeds.js.',
    infinityEncoding: 'A null `max` in mineModels.ranges / diastolicRules means +Infinity.',
  },
  reviewedDate: reviewed.trim(),
  allometricModels: sortKeys(allometricModels),
  rightHeartModels: sortKeys(rightHeartModels),
  leftHeartModels: sortKeys(leftHeartModels),
  mineModels: sortKeys(mineModels),
  diastolicRules: sortKeys(diastolicRules),
  breedReferences: sortKeys(breedReferences),
};

let json;
try {
  json = JSON.stringify(output, null, 1) + '\n';
} catch (e) {
  fail(`Data is not JSON-serialisable: ${e.message}`);
}
try {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, json, 'utf8');
} catch (e) {
  fail(`Cannot write output file "${outputPath}": ${e.message}`);
}

const sourceCount = Object.values(breedReferences).reduce((n, b) => n + b.sources.length, 0);
console.log(`✔ Wrote ${outputPath} (${Buffer.byteLength(json)} bytes)`);
console.log(`  reviewedDate:      ${output.reviewedDate}`);
console.log(`  allometricModels:  ${Object.keys(allometricModels).length}`);
console.log(`  rightHeartModels:  ${Object.keys(rightHeartModels).length}`);
console.log(`  leftHeartModels:   ${Object.keys(leftHeartModels).length}`);
console.log(`  mineModels:        ${Object.keys(mineModels).length}`);
console.log(`  diastolicRules:    ${Object.keys(diastolicRules).length}`);
console.log(`  breedReferences:   ${Object.keys(breedReferences).length} (${sourceCount} sources)`);
