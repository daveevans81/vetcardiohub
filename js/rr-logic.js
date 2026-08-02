// ============================================================================
// BLOOD MARKER CATALOGUE  (parity with iOS Logic/BloodMarkers.swift — keep in step)
// ============================================================================
// Deliberately SHORT: the markers that change management in a cardiac patient, plus the ones an
// owner of such a patient is most often handed a number for. A short whitelist is what makes the
// entry form a picker rather than a spelling test, and what lets a report importer FIND known names
// instead of trying to understand a whole page layout.
//
// `typicalRange` is a data-entry PREFILL ONLY and is never used to judge a result — each stored
// result carries the range printed on its own report. `synonyms` are the spellings real UK labs
// print, used by the picker's search and the paste-a-report parser.
//
// TODO (BACKLOG §2): move this to med-data.json so new lab spellings ship without a release; iOS
// currently holds an identical copy in Swift.
const BLOOD_MARKERS = [
    // Kidney
    { id: 'creatinine', label: 'Creatinine', group: 'Kidney', units: ['µmol/L', 'mg/dL'], typicalRange: [44, 159],
      synonyms: ['creatinine', 'crea', 'creat', 'cre'],
      blurb: 'A waste product cleared by the kidneys. Watched closely when a pet takes diuretics, because dehydration pushes it up.' },
    { id: 'urea', label: 'Urea', group: 'Kidney', units: ['mmol/L', 'mg/dL'], typicalRange: [2.5, 9.6],
      synonyms: ['urea', 'blood urea'],
      blurb: 'Another waste product the kidneys clear. Reported as urea in the UK and as BUN in the US — the two are not the same number, so keep them apart.' },
    { id: 'bun', label: 'BUN (blood urea nitrogen)', group: 'Kidney', units: ['mg/dL', 'mmol/L'], typicalRange: [7, 27],
      synonyms: ['bun', 'blood urea nitrogen', 'urea nitrogen'],
      blurb: 'The US way of reporting urea. Roughly urea divided by 2.14 — recorded separately so the two are never mixed on one graph.' },
    { id: 'sdma', label: 'SDMA', group: 'Kidney', units: ['µg/dL'], typicalRange: [null, 14],
      synonyms: ['sdma', 'idexx sdma', 'symmetric dimethylarginine'],
      blurb: 'An earlier marker of kidney function than creatinine — it can rise before creatinine does.' },
    { id: 'phosphate', label: 'Phosphate', group: 'Kidney', units: ['mmol/L', 'mg/dL'], typicalRange: [0.8, 1.6],
      synonyms: ['phosphate', 'phosphorus', 'phos', 'po4'],
      blurb: 'A mineral that tends to build up when the kidneys are struggling.' },
    { id: 'usg', label: 'Urine specific gravity', group: 'Kidney', units: ['', 'SG'], typicalRange: null,
      synonyms: ['usg', 'urine specific gravity', 'specific gravity', 'sg'],
      blurb: 'How concentrated the urine is — it tells your vet how well the kidneys are holding on to water.' },
    // Electrolytes
    { id: 'potassium', label: 'Potassium', group: 'Electrolytes', units: ['mmol/L', 'mEq/L'], typicalRange: [3.5, 5.8],
      synonyms: ['potassium', 'k', 'k+'],
      blurb: 'Important for heart rhythm and muscle function. Both diuretics and some heart medicines can shift it, so it is often rechecked after a dose change.' },
    { id: 'sodium', label: 'Sodium', group: 'Electrolytes', units: ['mmol/L', 'mEq/L'], typicalRange: [144, 160],
      synonyms: ['sodium', 'na', 'na+'],
      blurb: 'The main salt in blood, tied to how much water the body holds on to.' },
    { id: 'chloride', label: 'Chloride', group: 'Electrolytes', units: ['mmol/L', 'mEq/L'], typicalRange: [109, 122],
      synonyms: ['chloride', 'cl', 'cl-'],
      blurb: 'A salt measured alongside sodium; diuretics commonly lower it.' },
    { id: 'calcium', label: 'Calcium', group: 'Electrolytes', units: ['mmol/L', 'mg/dL'], typicalRange: [2.3, 3.0],
      synonyms: ['calcium', 'ca', 'ca2+', 'total calcium'],
      blurb: 'A mineral needed for muscle and nerve function, including the heart.' },
    { id: 'magnesium', label: 'Magnesium', group: 'Electrolytes', units: ['mmol/L', 'mg/dL'], typicalRange: [0.7, 1.1],
      synonyms: ['magnesium', 'mg', 'mg2+'],
      blurb: 'A mineral that supports steady heart rhythm; it can fall alongside potassium.' },
    // Cardiac
    { id: 'ntprobnp', label: 'NT-proBNP', group: 'Cardiac', units: ['pmol/L'], typicalRange: null,
      synonyms: ['nt-probnp', 'ntprobnp', 'nt probnp', 'probnp', 'bnp'],
      blurb: 'A substance released when heart muscle is stretched. Used to help judge whether the heart is under strain.' },
    { id: 'troponin', label: 'Troponin I', group: 'Cardiac', units: ['ng/mL', 'µg/L'], typicalRange: null,
      synonyms: ['troponin', 'troponin i', 'ctni', 'tnl'],
      blurb: 'Released when heart muscle cells are damaged.' },
    // Blood count
    { id: 'pcv', label: 'PCV / haematocrit', group: 'Blood count', units: ['%', 'L/L'], typicalRange: [37, 55],
      synonyms: ['pcv', 'haematocrit', 'hematocrit', 'hct', 'packed cell volume'],
      blurb: 'The proportion of blood made up of red cells — the practical measure of anaemia.' },
    { id: 'haemoglobin', label: 'Haemoglobin', group: 'Blood count', units: ['g/L', 'g/dL'], typicalRange: [120, 180],
      synonyms: ['haemoglobin', 'hemoglobin', 'hb', 'hgb'],
      blurb: 'The protein in red cells that carries oxygen.' },
    { id: 'wbc', label: 'White cell count', group: 'Blood count', units: ['×10⁹/L', '/µL'], typicalRange: [6, 17],
      synonyms: ['wbc', 'white blood cells', 'white cell count', 'leucocytes', 'leukocytes'],
      blurb: "The immune system's cells — often raised with infection or inflammation." },
    { id: 'platelets', label: 'Platelets', group: 'Blood count', units: ['×10⁹/L', '/µL'], typicalRange: [200, 500],
      synonyms: ['platelets', 'plt', 'thrombocytes'],
      blurb: 'Cells that help blood clot. Relevant for cats on clot-prevention medicines.' },
    // Liver / protein
    { id: 'alt', label: 'ALT', group: 'Liver', units: ['U/L', 'IU/L'], typicalRange: [10, 125],
      synonyms: ['alt', 'alanine aminotransferase', 'sgpt'],
      blurb: 'A liver enzyme. It can rise when the liver is congested by a struggling heart.' },
    { id: 'alkp', label: 'ALKP', group: 'Liver', units: ['U/L', 'IU/L'], typicalRange: [23, 212],
      synonyms: ['alkp', 'alp', 'alkaline phosphatase', 'sap'],
      blurb: 'Another liver enzyme, also affected by some medicines.' },
    { id: 'albumin', label: 'Albumin', group: 'Liver', units: ['g/L', 'g/dL'], typicalRange: [23, 40],
      synonyms: ['albumin', 'alb'],
      blurb: 'The main protein in blood; it helps keep fluid inside the blood vessels.' },
    { id: 'totalProtein', label: 'Total protein', group: 'Liver', units: ['g/L', 'g/dL'], typicalRange: [52, 82],
      synonyms: ['total protein', 'tp', 'protein total'],
      blurb: 'All the protein in blood, albumin included.' },
    { id: 'glucose', label: 'Glucose', group: 'Liver', units: ['mmol/L', 'mg/dL'], typicalRange: [3.3, 6.8],
      synonyms: ['glucose', 'glu', 'blood sugar', 'bg'],
      blurb: 'Blood sugar.' },
    // Thyroid
    { id: 't4', label: 'Total T4', group: 'Thyroid', units: ['nmol/L', 'µg/dL'], typicalRange: [13, 51],
      synonyms: ['t4', 'tt4', 'total t4', 'thyroxine'],
      blurb: 'The main thyroid hormone. An overactive thyroid in cats speeds the heart and can look like heart disease.' },
    { id: 'tsh', label: 'TSH', group: 'Thyroid', units: ['ng/mL', 'mU/L'], typicalRange: null,
      synonyms: ['tsh', 'thyroid stimulating hormone', 'ctsh'],
      blurb: 'The hormone that tells the thyroid to work; measured alongside T4.' },
];

const BLOOD_MARKER_GROUPS = ['Kidney', 'Electrolytes', 'Cardiac', 'Blood count', 'Liver', 'Thyroid', 'Other'];
const BLOOD_OTHER_ID = 'other';

// ============================================================================
// ECHO MEASUREMENTS  (parity with iOS Logic/EchoMeasures.swift + EchoCalc.swift — keep in step)
// ============================================================================
// A very short list on purpose. Echo reports diverge far more between centres than lab reports do,
// and a full study can carry fifty measurements — but only a handful are worth WATCHING over time.
//
// The allometric formulas below are the same ones the public VetCardioHub echo calculator uses
// (echocalc.html), so the tracker and the calculator can never disagree:
//     LVIDDN = LVIDd (cm) / weight (kg) ^ 0.294      "Cornell"
//     LADN   = LAD   (cm) / weight (kg) ^ 0.309
//     LVEDV/BW = LVEDV (mL) / weight (kg)
//
// NOTE the one place this app converts units at all: the formulas are defined in CENTIMETRES, so a
// millimetre measurement MUST be converted or the index comes out ten times too large — straight
// across the 1.7 threshold that says "enlarged". Conversion happens for the derivation only; the
// stored measurement keeps the unit it was reported in. An unrecognised unit yields NO index rather
// than a guess.
const ECHO_MEASURES = [
    { id: 'lad', label: 'Left atrial diameter (LAD)', short: 'LAD', units: ['cm', 'mm'],
      synonyms: ['lad', 'la diameter', 'left atrial diameter', 'la long axis', 'ladiam'],
      blurb: 'The width of the left atrium measured in the long-axis view. Scaled to your pet\'s weight it is one of the clearest signs of whether the left atrium has enlarged.' },
    { id: 'la', label: 'Left atrium, short axis (LA)', short: 'LA', units: ['cm', 'mm'],
      synonyms: ['la', 'left atrium', 'la dimension', 'la diam', 'la sax', 'la short axis'],
      blurb: 'The size of the left atrium, the chamber that fills the main pumping chamber.' },
    { id: 'ao', label: 'Aorta (Ao)', short: 'Ao', units: ['cm', 'mm'],
      synonyms: ['ao', 'aorta', 'aortic root', 'aortic diameter', 'ao diam', 'aortic diam', 'ao dia'],
      blurb: 'The width of the aorta. It changes very little with disease, which is why the left atrium is compared against it.' },
    { id: 'laao', label: 'LA:Ao ratio', short: 'LA:Ao', units: [''],
      synonyms: ['la/ao', 'la:ao', 'la ao', 'la to ao', 'laao', 'la:ao ratio', 'la/ao ratio'],
      blurb: 'The left atrium measured against the aorta. Being a ratio it needs no units.' },
    { id: 'lvidd', label: 'LVIDd', short: 'LVIDd', units: ['cm', 'mm'],
      synonyms: ['lvidd', 'lvid d', 'lvid diastole', 'lv internal diameter diastole', 'lvedd', 'lvid'],
      blurb: 'The width of the main pumping chamber when it is full. Scaled to weight, it shows whether that chamber has stretched.' },
    { id: 'lvedv', label: 'LV end-diastolic volume (LVEDV)', short: 'LVEDV', units: ['ml', 'mL'],
      synonyms: ['lvedv', 'edv', 'end diastolic volume', 'lv edv', 'ved', 'lv edv mod', 'edv mod'],
      blurb: 'How much blood the main pumping chamber holds when full. Divided by weight it can be compared between visits.' },
];

// The echo form's inputs bind with `x-model="newEchoStudy.values[m.id].value"`, and x-show does NOT
// stop Alpine rendering (and evaluating) that template — so EVERY measure must already have a slot
// before first paint, not just once openEchoForm() has run. Hence one blank-row builder used by
// both the initial state and the form.
function blankEchoValues() {
    const values = {};
    ECHO_MEASURES.forEach(m => { values[m.id] = { value: '', unit: m.units[0] || '' }; });
    return values;
}

// --- SURGERIES, DENTALS & PROCEDURES (parity with iOS schema V12; see BACKLOG §3l) -----------
// What has been DONE to a pet, as opposed to what the pet HAS. For a cardiac patient this is not
// background: a documented, uneventful general anaesthetic is one of the strongest reassurances a
// vet has when weighing up the next one, and a PDA ligation or balloon valvuloplasty IS the cardiac
// history.
//
// TWO RULES ARE LOAD-BEARING and must not be "improved":
//   1. `status` ('completed' | 'scheduled') is STORED, never derived from whether the date has
//      passed. A booked procedure that slipped has not happened; inferring otherwise would put a
//      cancelled dental into the vet report as a procedure the pet went through.
//   2. `performedBy` is free text, not a link to a saved contact. Contacts live in appSettings,
//      outside the clinical export, so a reference would mean nothing after a restore or on iOS.
//
// Ids below are PERSISTED — add new ones, never rename. Hand-kept identical with
// `ProcedureCatalogue.swift` / `DentalChart.swift`; change both together.
const PROCEDURE_CATEGORIES = [
    { id: 'surgery',    label: 'Surgery' },
    { id: 'dental',     label: 'Dental' },
    { id: 'cardiac',    label: 'Cardiac procedure' },
    { id: 'diagnostic', label: 'Diagnostic procedure' },
    { id: 'other',      label: 'Other' },
];

const PROCEDURE_AREAS = [
    { id: 'mouth',       label: 'Mouth and teeth' },
    { id: 'abdomen',     label: 'Abdomen (tummy)' },
    { id: 'chest',       label: 'Chest' },
    { id: 'heart',       label: 'Heart and blood vessels' },
    { id: 'skin',        label: 'Skin or lump' },
    { id: 'orthopaedic', label: 'Bones and joints' },
    { id: 'spine',       label: 'Spine and nerves' },
    { id: 'eye',         label: 'Eye' },
    { id: 'ear_nose',    label: 'Ears, nose and throat' },
    { id: 'urogenital',  label: 'Urinary and reproductive' },
    { id: 'other',       label: 'Other / not sure' },
];

// Prefills only — every field they feed also takes free text. No list of operations is ever
// complete, and one that refused the unusual case would push the interesting histories out.
const PROCEDURE_SUGGESTIONS = {
    mouth:       ['Dental scale and polish', 'Dental with extractions', 'Dental x-rays',
                  'Tooth root abscess treatment', 'Gum (oral) mass removal'],
    abdomen:     ['Neutering — spay (ovariohysterectomy)', 'Exploratory laparotomy',
                  'Removal of a swallowed object (foreign body)', 'Spleen removal (splenectomy)',
                  'Bladder stone removal (cystotomy)', 'Gastric dilatation-volvulus (GDV) surgery',
                  'Liver or intestinal biopsy'],
    chest:       ['Chest drain placement', 'Lung lobe removal (lobectomy)',
                  'Diaphragmatic hernia repair', 'Thoracoscopy',
                  'Pericardectomy (removing the sac around the heart)'],
    heart:       ['PDA closure (occlusion or ligation)', 'Balloon valvuloplasty',
                  'Pacemaker implantation', 'Mitral valve repair',
                  'Pericardiocentesis (draining fluid from around the heart)',
                  'Balloon dilation for cor triatriatum'],
    skin:        ['Lump (mass) removal', 'Skin biopsy', 'Wound repair', 'Abscess treatment',
                  'Removal of a skin tumour with wide margins'],
    orthopaedic: ['Cruciate ligament surgery (TPLO or lateral suture)', 'Fracture repair',
                  'Patella (kneecap) stabilisation', 'Hip surgery (FHO or replacement)',
                  'Joint arthroscopy', 'Amputation'],
    spine:       ['Spinal decompression surgery (hemilaminectomy)',
                  'MRI or CT scan under anaesthetic', 'Spinal tap (CSF sample)'],
    eye:         ['Cataract surgery', 'Cherry eye correction', 'Entropion correction',
                  'Eye removal (enucleation)', 'Corneal ulcer surgery'],
    ear_nose:    ['Ear flush under anaesthetic', 'Total ear canal ablation (TECA)',
                  'BOAS surgery (soft palate and nostrils)', 'Aural haematoma repair',
                  'Rhinoscopy (looking up the nose)'],
    urogenital:  ['Neutering — castration', 'Neutering — spay (ovariohysterectomy)',
                  'Caesarean section', 'Urethrostomy', 'Kidney or bladder biopsy'],
    other:       ['Endoscopy', 'Biopsy under anaesthetic', 'Imaging under anaesthetic (CT or MRI)',
                  'Wound repair', 'Lump (mass) removal'],
};

// --- VETERINARY APPOINTMENTS (parity with iOS schema V15; see appointments-web-patch.md) ------
// The diary: health checks, boosters, post-op checks, cardiology and other specialist visits, and
// emergencies — booked, attended, cancelled or missed.
//
// Kept SEPARATE from procedureLog on purpose. `procedureLog` is a surgical history, the thing a vet
// reads before an anaesthetic; filling it with consultations would bury the signal it exists for.
// The two are merged only for DISPLAY, in `upcomingCare()`, because the owner does not think in
// storage models — on a Tuesday morning they want to know what is in the diary, and having to check
// two lists is how a dental gets missed.
//
// THREE RULES ARE LOAD-BEARING and must not be "improved":
//   1. `status` is STORED, never derived from whether the date has passed — same rule as
//      procedureLog. An appointment the practice cancelled keeps its old date until someone moves
//      it, and a date-based rule would record a visit that never happened.
//   2. `time` is a SEPARATE wall-clock 'HH:mm' string, not folded into `date`. A 2:30pm slot is a
//      wall-clock time at a practice, not an instant, and merging them makes it drift across time
//      zones. '' means "not been told the slot yet", which is a real state.
//   3. The provider details are DENORMALISED — name, branch, address and phone as TEXT. Contacts
//      live in appSettings, outside the clinical export, so a stored reference would arrive
//      dangling on iOS or after a restore. `providerId`/`locationId` are a soft hint only.
//
// Ids below are PERSISTED — add new ones, never rename. Hand-kept identical with
// `AppointmentCatalogue.swift`; change both together.
//
// `defaultLeadDays` varies by type because the useful notice period does: a week suits a booster
// you might need to rearrange, and is useless for a post-op check booked three days after surgery —
// the reminder would fall due before the operation.
const APPOINTMENT_TYPES = [
    { id: 'checkup',     label: 'Health check',             defaultTitle: 'Health check',
      defaultLeadDays: 7,  preparationHint: '' },
    // The everyday appointment: something is wrong, or the vet asked to see them again. This was
    // the gap owners hit first — 'Health check' reads as the annual wellness exam, so an ordinary
    // "she's been off her food" consultation had nowhere obvious to go and ended up as 'Other'.
    { id: 'consult',     label: 'Vet appointment (problem or recheck)', defaultTitle: 'Vet appointment',
      defaultLeadDays: 3,  preparationHint: 'Note down when the problem started and anything that makes it better or worse.' },
    // Nurse clinics are a large share of what an owner actually attends, and are usually cheaper,
    // shorter and booked separately from a vet consultation.
    { id: 'nurse',       label: 'Nurse / vet tech appointment', defaultTitle: 'Nurse appointment',
      defaultLeadDays: 3,  preparationHint: 'Nurse clinics usually cover weight checks, nail clips, anal glands, post-op checks and repeat injections.' },
    { id: 'cardiology',  label: 'Cardiology appointment',   defaultTitle: 'Cardiology recheck',
      defaultLeadDays: 7,  preparationHint: 'Take a week of sleeping breathing rates and the current medication list.' },
    { id: 'vaccination', label: 'Vaccination / booster',    defaultTitle: 'Annual booster',
      defaultLeadDays: 7,  preparationHint: 'Bring the vaccination card.' },
    // The BOOKING for an operation. `procedureLog` records what was DONE — the surgical history a
    // vet reads before an anaesthetic — and this is the diary entry that gets the owner and the pet
    // there on the right morning, having fasted. The two coexist on purpose.
    { id: 'surgery',     label: 'Surgery / operation',      defaultTitle: 'Surgery',
      defaultLeadDays: 7,  preparationHint: 'Confirm the fasting instructions, the drop-off time and who to phone for news.' },
    { id: 'postop',      label: 'Post-op check',            defaultTitle: 'Post-operative check',
      defaultLeadDays: 2,  preparationHint: 'Keep the wound dry and the buster collar on until seen.' },
    { id: 'specialist',  label: 'Specialist referral',      defaultTitle: 'Specialist appointment',
      defaultLeadDays: 7,  preparationHint: 'Take any referral letter, previous reports and scans.' },
    { id: 'bloods',      label: 'Blood test / monitoring',  defaultTitle: 'Blood test',
      defaultLeadDays: 3,  preparationHint: 'Check whether food should be withheld beforehand.' },
    { id: 'imaging',     label: 'Scan or x-ray',            defaultTitle: 'Imaging appointment',
      defaultLeadDays: 3,  preparationHint: 'Check whether food should be withheld beforehand.' },
    { id: 'dental',      label: 'Dental appointment',       defaultTitle: 'Dental appointment',
      defaultLeadDays: 7,  preparationHint: 'Confirm the fasting instructions and the drop-off time.' },
    { id: 'physio',      label: 'Physiotherapy / rehab',    defaultTitle: 'Physiotherapy session',
      defaultLeadDays: 2,  preparationHint: '' },
    // Not veterinary, but it is in the same diary and it is where a lump or a sore ear is most
    // often first noticed — and for a cardiac patient, whether a groom went well is a real
    // observation about exercise tolerance.
    { id: 'grooming',    label: 'Grooming appointment',     defaultTitle: 'Grooming',
      defaultLeadDays: 3,  preparationHint: '' },
    // An emergency is logged after the fact far more often than it is booked ahead; there is
    // nothing to give notice of.
    { id: 'emergency',   label: 'Emergency / out-of-hours', defaultTitle: 'Emergency visit',
      defaultLeadDays: 0,  preparationHint: '' },
    { id: 'other',       label: 'Other',                    defaultTitle: '',
      defaultLeadDays: 7,  preparationHint: '' },
];

// Only 'booked' is open. Everything else belongs to the history — including 'cancelled', which is
// kept on purpose: "we cancelled because she was too unwell to travel" is a clinical fact.
const APPOINTMENT_STATUSES = [
    // "The vet said come back in about six months" — and nobody gave you a slot. This is the single
    // most common way an appointment gets lost, and until 2026-08 there was nowhere to put it: an
    // owner could only record a booking that existed. Told to return in six months with no date,
    // they either invented one (and got a reminder for an appointment that was never made) or
    // recorded nothing (and remembered in month nine).
    //
    // A to-book record carries the date the pet should be SEEN BY, not a slot. `time` stays empty
    // and its reminders say "time to book this" rather than "your appointment is tomorrow". It is
    // OPEN: the whole point is that it stays in front of the owner. Leads the list because it comes
    // first in life — you are told to come back, then you book, then you attend.
    { id: 'toBook',    label: 'Still to book' },
    { id: 'booked',    label: 'Booked' },
    { id: 'attended',  label: 'Attended' },
    { id: 'cancelled', label: 'Cancelled' },
    // "Missed", not "did not attend" — this is the owner's own record, and clinical shorthand
    // aimed at them reads as a reprimand.
    { id: 'missed',    label: 'Missed' },
];

// --- FOOD ALLERGIES & ADVERSE DRUG REACTIONS (parity with iOS schema V13; see BACKLOG §3m) ----
// Everything else in this app is a LOG — a series of observations read for a trend. An allergy is
// not that. It is a standing fact about the animal that changes what may safely be put into it, and
// it stays true whether or not anything was recorded this month.
//
// THREE RULES ARE LOAD-BEARING and must not be "improved":
//   1. Allergies are NEVER date-filtered and NEVER module-gated in an export. A pet does not stop
//      being allergic to chicken because the report covers the last three months.
//   2. `severity` and `certainty` are separate stored fields. Severity is "how bad was it";
//      certainty is "how do we know". Collapsing them either overstates a hunch or buries a
//      diagnosis, and neither can be inferred from the free-text reaction without a regular
//      expression making a clinical judgement.
//   3. Nothing anywhere prints "no known allergies". An empty list means nobody recorded one, which
//      is not the same claim, and a vet reading it as a clearance would be misled.
//
// Ids below are PERSISTED — add new ones, never rename. Hand-kept identical with
// `AllergyCatalogue.swift`; change both together.
const ALLERGY_TYPES = [
    { id: 'food',       label: 'Food allergy' },
    { id: 'medication', label: 'Medication reaction' },
];

// Worst first, so a dropdown reads in the order that matters.
const ALLERGY_SEVERITIES = [
    { id: 'severe',   label: 'Severe',       rank: 3,
      hint: 'Needed urgent treatment, or was life-threatening — collapse, swelling of the face or throat, difficulty breathing.' },
    { id: 'moderate', label: 'Moderate',     rank: 2,
      hint: 'Clearly unwell and needed treatment, but not an emergency.' },
    { id: 'mild',     label: 'Mild',         rank: 1,
      hint: 'Noticeable but settled on its own, or with simple treatment.' },
    // Unknown ranks BELOW mild, not above it: an unfilled field is not evidence of a bad reaction,
    // and floating it to the top would push a recorded anaphylaxis down the list.
    { id: 'unknown',  label: 'Not recorded', rank: 0,
      hint: "Leave as not recorded if you're unsure how bad it was." },
];

const ALLERGY_CERTAINTIES = [
    { id: 'confirmed', label: 'Diagnosed by a vet', short: 'confirmed' },
    { id: 'suspected', label: 'Suspected',          short: 'suspected' },
];

// Prefills only — every field they feed also takes free text. Protein sources lead the food list
// because that is what an elimination diet is actually built around.
const ALLERGEN_SUGGESTIONS = {
    food: ['Chicken', 'Beef', 'Dairy', 'Egg', 'Lamb', 'Pork', 'Fish', 'Turkey',
           'Wheat / gluten', 'Soya', 'Maize / corn', 'Rice', 'Additives or preservatives'],
    medication: ['Penicillin / amoxicillin', 'Cephalosporin', 'Potentiated sulfonamide',
                 'Metronidazole', 'NSAID (e.g. meloxicam, carprofen)', 'Vaccine reaction',
                 'Flea or worm treatment', 'Anaesthetic or sedative', 'Steroid'],
};

const ALLERGY_COMMON_SIGNS = ['Itching or scratching', 'Skin rash or hives', 'Vomiting', 'Diarrhoea',
                              'Swelling of the face or muzzle', 'Difficulty breathing', 'Collapse',
                              'Lethargy'];

const ALLERGY_REACTION_SIGNS = {
    food: ALLERGY_COMMON_SIGNS.concat(['Recurrent ear infections', 'Licking or chewing paws',
                                       'Wind or gurgling gut', 'Poor coat']),
    medication: ALLERGY_COMMON_SIGNS.concat(['Off food', 'Wobbliness or unsteadiness',
                                             'Blood in stool', 'Yellow gums (jaundice)']),
};

// --- SKIN & ITCH ------------------------------------------------------------------------------
// Ids below are PERSISTED — add new ones, never rename. Hand-kept identical with
// `SkinCatalogue.swift`; change both together.
//
// Why a 0–10 score and not mild/moderate/severe: itch is continuous, it is scored on the SAME pet
// week after week, and the whole point of recording it is to see it move. Three bands cannot show
// a pet going from "scratching most evenings" to "scratching all evening and half the night", so a
// seasonal rise would flatten into one word for months. The written ANCHORS are what keep one
// owner's 6 comparable with the same owner's 6 a year later — never show the slider without them.
const SKIN_SCORE_ANCHORS = [
    'No itching at all — normal for them.',
    'The odd scratch, no more than any dog or cat does.',
    'A little more scratching than usual, easy to miss.',
    "Noticeable scratching or licking, but it doesn't interrupt anything.",
    'Scratching several times an hour when settled.',
    'Regular scratching, licking or chewing — you notice it every evening.',
    'Frequent enough to interrupt resting, eating or play.',
    "Scratching or chewing most of the time they're awake.",
    'Almost constant, and it disturbs their sleep.',
    'Constant, distressing, and stops only when they’re distracted.',
    'Cannot be stopped — self-harming, breaking the skin.',
];

// Ear disease is its own field rather than one more site chip: sore ears are what books the
// appointment, they recur on their own rhythm, and "her ears flare every August" is precisely the
// annual pattern this module exists to surface. Buried in a multi-select it could not be counted.
const SKIN_EAR_STATES = [
    { id: 'infected',  label: 'Sore or discharging', rank: 2,
      hint: 'Red, smelly, waxy or discharging, or painful when touched. Worth a vet appointment.' },
    { id: 'irritated', label: 'Itchy or head-shaking', rank: 1,
      hint: 'Scratching at the ears or shaking the head, but the ears themselves look normal.' },
    { id: 'none',      label: 'Ears fine', rank: 0,
      hint: 'Clean, comfortable, no scratching or head-shaking.' },
];

const SKIN_SITES = [
    { id: 'paws',     label: 'Paws' },
    { id: 'ears',     label: 'Ears' },
    { id: 'face',     label: 'Face or muzzle' },
    { id: 'belly',    label: 'Tummy or groin' },
    { id: 'armpits',  label: 'Armpits' },
    { id: 'legs',     label: 'Legs' },
    { id: 'back',     label: 'Back or flanks' },
    { id: 'tailBase', label: 'Base of tail or bottom' },
    { id: 'neck',     label: 'Neck or collar area' },
    { id: 'allOver',  label: 'All over' },
];

const SKIN_SIGNS = [
    { id: 'scratching',   label: 'Scratching' },
    { id: 'licking',      label: 'Licking or chewing paws' },
    { id: 'rubbing',      label: 'Rubbing face on furniture' },
    { id: 'headShaking',  label: 'Shaking head' },
    { id: 'overGrooming', label: 'Over-grooming' },
    { id: 'hairLoss',     label: 'Hair loss or thin patches' },
    { id: 'redSkin',      label: 'Red or inflamed skin' },
    { id: 'spots',        label: 'Spots, scabs or crusts' },
    { id: 'hotSpot',      label: 'Hot spot (sudden sore wet patch)' },
    { id: 'smell',        label: 'Smelly skin or coat' },
    { id: 'darkSkin',     label: 'Darkened or thickened skin' },
    { id: 'restless',     label: 'Restless or disturbed sleep' },
];

// A record of what was USED, not a prescription and never a suggestion — nothing in the app
// recommends any of these. The list exists so "she was on steroids that whole summer" is legible
// on the chart instead of buried in free text.
const SKIN_TREATMENTS = [
    { id: 'none',          label: 'Nothing given' },
    { id: 'oclacitinib',   label: 'Oclacitinib (Apoquel)' },
    { id: 'lokivetmab',    label: 'Lokivetmab (Cytopoint)' },
    { id: 'ciclosporin',   label: 'Ciclosporin (Atopica)' },
    { id: 'steroid',       label: 'Steroid tablets or injection' },
    { id: 'antihistamine', label: 'Antihistamine' },
    { id: 'antibiotic',    label: 'Antibiotic' },
    { id: 'antifungal',    label: 'Anti-fungal' },
    { id: 'earDrops',      label: 'Ear drops' },
    { id: 'shampoo',       label: 'Medicated shampoo or wash' },
    { id: 'sprayCream',    label: 'Spray, cream or mousse' },
    { id: 'omega',         label: 'Skin supplement or omega oils' },
    { id: 'fleaTreatment', label: 'Flea treatment' },
    { id: 'dietChange',    label: 'Diet change or elimination diet' },
    { id: 'buster',        label: 'Buster collar or body suit' },
    { id: 'other',         label: 'Something else' },
];

// The owner's hunch, recorded as a hunch. Never read as a cause by anything in the app, and the
// seasonal analysis ignores it entirely.
const SKIN_TRIGGERS = [
    { id: 'unknown',     label: 'No idea' },
    { id: 'grassPollen', label: 'Grass, pollen or being outdoors' },
    { id: 'dustMites',   label: 'House dust' },
    { id: 'fleas',       label: 'Fleas or insect bites' },
    { id: 'food',        label: 'Something they ate' },
    { id: 'contact',     label: 'Contact with something new' },
    { id: 'grooming',    label: 'After grooming or bathing' },
    { id: 'stress',      label: 'Stress or a change in routine' },
    { id: 'weather',     label: 'Hot or humid weather' },
    { id: 'heating',     label: 'Indoor heating' },
];

// Minimum evidence before the seasonal analysis will describe a shape at all. Not a significance
// test — a floor below which any shape is noise. Mirrors `SkinLogic.SeasonalGate` exactly.
const SKIN_SEASONAL_GATE = {
    minScoredDays: 12,        // ~a year of monthly logging, or three months of weekly
    minMonthsCovered: 6,      // half the year seen, or the "peak" is just the months logged
    minAmplitude: 2.0,        // score points between best and worst month
    peakTolerance: 1.0,       // months within this of the top count as part of the peak
    minMonthsForYearPeak: 4,  // a year with two logged months has no peak, it has two months
};

// --- LUMPS ------------------------------------------------------------------------------------
// THE RULE THIS WHOLE FEATURE IS BUILT AROUND: nothing here, and nothing in the lump functions
// below, ever tells an owner a lump is fine. Not "probably benign", not "no concerning features",
// not "no significant change". A soft, mobile, unchanging lump can be a mast cell tumour, and only
// a needle and a microscope distinguish one lump from another. An app that offered reassurance
// would be doing the one thing that could cost an animal its life.
//
// Ids are PERSISTED — hand-kept identical with `LumpCatalogue.swift`.
const LUMP_SITES = [
    { id: 'head',     label: 'Head or face' },
    { id: 'ear',      label: 'Ear' },
    { id: 'mouth',    label: 'Mouth, lip or gum' },
    { id: 'neck',     label: 'Neck or throat' },
    { id: 'shoulder', label: 'Shoulder' },
    { id: 'chest',    label: 'Chest' },
    { id: 'back',     label: 'Back' },
    { id: 'flank',    label: 'Side or flank' },
    { id: 'tummy',    label: 'Tummy' },
    { id: 'mammary',  label: 'Mammary or nipple area' },
    { id: 'groin',    label: 'Groin or inner thigh' },
    { id: 'frontLeg', label: 'Front leg' },
    { id: 'hindLeg',  label: 'Hind leg' },
    { id: 'paw',      label: 'Paw or toe' },
    { id: 'tail',     label: 'Tail' },
    { id: 'other',    label: 'Somewhere else' },
];

const LUMP_SIDES = [
    { id: 'left',    label: 'Left' },
    { id: 'right',   label: 'Right' },
    { id: 'midline', label: 'Middle' },
    { id: '',        label: 'Not recorded' },
];

const LUMP_CONSISTENCIES = [
    { id: 'soft',   label: 'Soft, squashy' },
    { id: 'firm',   label: 'Firm, like a rubber' },
    { id: 'hard',   label: 'Hard, like a pebble' },
    { id: 'fluid',  label: 'Fluid-filled or squelchy' },
    { id: 'unsure', label: 'Not sure' },
];

const LUMP_MOBILITIES = [
    { id: 'free',     label: 'Moves freely under the skin' },
    { id: 'inSkin',   label: 'In the skin itself, moves with it' },
    { id: 'attached', label: "Feels stuck to what's underneath" },
    { id: 'unsure',   label: 'Not sure' },
];

const LUMP_SIGNS = [
    { id: 'ulcerated', label: 'Broken, open or ulcerated' },
    { id: 'bleeding',  label: 'Bleeding' },
    { id: 'weeping',   label: 'Weeping or discharging' },
    { id: 'painful',   label: 'Sore when touched' },
    { id: 'red',       label: 'Red or inflamed' },
    { id: 'bruised',   label: 'Bruised-looking' },
    { id: 'hairless',  label: 'Hair loss over it' },
    { id: 'licking',   label: 'They keep licking or chewing it' },
    { id: 'swollen',   label: 'Swollen around it' },
];

// The signs that always warrant a vet being told, whatever the measurements say.
const LUMP_URGENT_SIGNS = ['ulcerated', 'bleeding', 'weeping', 'painful'];

const LUMP_VET_STAGES = [
    { id: 'notSeen', label: 'Not seen by a vet yet' },
    { id: 'seen',    label: 'A vet has examined it' },
    { id: 'sampled', label: 'Sampled or biopsied' },
];

const LUMP_STATUSES = [
    { id: 'monitoring', label: 'Being monitored' },
    { id: 'removed',    label: 'Removed' },
    { id: 'resolved',   label: 'Went away on its own' },
];

// Everyday objects to size a lump against, for the owner with no ruler to hand. An approximate
// number recorded today beats an exact one recorded never.
const LUMP_SIZE_REFERENCES = [
    { label: 'Grain of rice', mm: 5 },
    { label: 'Pea', mm: 8 },
    { label: 'Blueberry', mm: 12 },
    { label: 'Grape', mm: 20 },
    { label: 'Walnut', mm: 30 },
    { label: 'Golf ball', mm: 43 },
    { label: 'Plum', mm: 55 },
    { label: 'Tennis ball', mm: 67 },
];

// An owner with a ruler, measuring a soft lump under a coat of fur, is comfortably ±2 mm. A change
// must therefore clear BOTH an absolute floor and a relative one. Mirrors `LumpLogic.GrowthGate`.
const LUMP_GROWTH_GATE = {
    minAbsoluteMm: 3.0,
    minRelative: 0.20,
    fastMmPerMonth: 5.0,
    staleDays: 90,
};

// Shown on every lump screen and under the lump table on the vet report, whether or not anything
// has been flagged. It is the counterweight to an empty prompt list. Do not make it conditional.
const LUMP_STANDING_NOTE = 'Measurements and photos help your vet see how a lump has changed, '
    + "but they can't show what it is. Only your vet can tell you that, usually with a needle sample.";


// --- ORTHOPAEDICS: LAMENESS & JOINTS (parity with iOS schema V17) ------------------------------
// Two tables, the same shape as lumps: `orthoConditions` holds the standing facts about a PROBLEM
// (which legs, what the vet said, how long it has been going on, the pain-relief plan) and
// `orthoLog` holds one row per DAY per problem. Flattened into one table, "cruciate disease in the
// left hind, diagnosed in March, on meloxicam" would exist only as a string repeated on every row —
// one typo would split a single condition into two, and there would be nowhere for the facts that
// belong to the condition rather than to a Tuesday.
//
// ══ THE SAFETY RULE, WHICH IS THE WHOLE POINT ═══════════════════════════════════════════════
// NOTHING IN THIS MODULE EVER SAYS WHAT IS WRONG WITH THE ANIMAL, AND NOTHING EVER REASSURES.
//
// Lameness has a long differential — a strain, a cruciate, elbow dysplasia, a foreign body in a
// pad, an immune arthropathy, a bone tumour — and telling them apart needs a lame animal on a
// consulting-room table plus imaging. It cannot be done from a number typed into a phone, and an
// app that implied otherwise would do harm in both directions: an owner reassured out of an
// appointment, or frightened into one at 2am by a chart.
//
// So every sentence this module produces is a statement about THE RECORD ("scored 3 or worse on 6
// of the last 14 days"), never a diagnosis ("his arthritis is flaring") and never a judgement
// ("improving nicely"). `ORTHO_STANDING_NOTE` is printed unconditionally on every screen and in
// every export, for the same reason `LUMP_STANDING_NOTE` is.
//
// `ORTHO_CAUSES` records WHAT A VET SAID. Nothing reads it, ranks it or infers from it.
//
// Ids below are PERSISTED — add new ones, never rename. Hand-kept identical with
// `OrthoCatalogue.swift`; change both together.

const ORTHO_LEGS = [
    { id: 'lf',    label: 'Left front' },
    { id: 'rf',    label: 'Right front' },
    { id: 'lh',    label: 'Left back' },
    { id: 'rh',    label: 'Right back' },
    // Not a leg, but back pain presents as a gait problem and owners reach for this module for it.
    // Refusing it would push those records into "notes" where nothing can chart them.
    { id: 'spine', label: 'Back / spine' },
];

// The 0–4 scale vets use, worded for an owner as what can be SEEN — "won't put the foot down"
// rather than "non-weight-bearing". An owner cannot measure pain; they can judge whether the foot
// is going down, and that is the only thing they can honestly report.
const ORTHO_LAMENESS_SCALE = [
    { score: 0, label: 'Sound',
      detail: "Walking and trotting normally — you can't pick out a bad leg." },
    { score: 1, label: 'Only just noticeable',
      detail: 'Something is slightly off, and only some of the time. You might only see it at a trot, or after a long walk.' },
    { score: 2, label: 'Obvious, but using the leg',
      detail: 'You can see which leg it is and you can see it every time, but they are still putting weight on it.' },
    { score: 3, label: 'Barely using the leg',
      detail: 'Touching the ground lightly or now and then, taking most of the weight on the others.' },
    { score: 4, label: 'Not using the leg at all',
      detail: 'Holding it up, hopping, or refusing to move on it.' },
];

// Morning stiffness that walks off is a different observation from lameness that persists, and it
// is one vets ask about by name.
const ORTHO_STIFFNESS = [
    { id: 'none',      label: 'Gets up normally' },
    { id: 'slow',      label: 'Slow to get going, then fine' },
    { id: 'stiff',     label: 'Stiff for the first few minutes' },
    { id: 'struggles', label: 'Struggles to get up' },
    { id: 'needsHelp', label: 'Needs helping up' },
    { id: 'unsure',    label: "Didn't notice" },
];

// Often more useful than the score itself: "worse after rest" and "worse after exercise" point in
// genuinely different directions, and it is something an owner is uniquely placed to notice.
const ORTHO_AGGRAVATORS = [
    { id: 'rest',      label: 'After lying down / resting' },
    { id: 'exercise',  label: 'After a walk or exercise' },
    { id: 'morning',   label: 'First thing in the morning' },
    { id: 'evening',   label: 'Later in the day' },
    { id: 'cold',      label: 'Cold or damp weather' },
    { id: 'stairs',    label: 'Stairs or jumping' },
    { id: 'slippery',  label: 'Slippery floors' },
    { id: 'car',       label: 'Getting in or out of the car' },
];

// What was actually GIVEN. Generic groups, not brands — the medication ledger holds the real
// product, and this is the "was he covered today?" answer. "Nothing today" is explicit because a
// blank row cannot tell the difference between "nothing" and "didn't record".
const ORTHO_PAIN_RELIEF = [
    { id: 'none',        label: 'Nothing today' },
    { id: 'nsaid',       label: 'Anti-inflammatory (e.g. meloxicam, carprofen)' },
    { id: 'gabapentin',  label: 'Gabapentin' },
    { id: 'paracetamol', label: 'Paracetamol (as prescribed)' },
    { id: 'opioid',      label: 'Stronger painkiller (e.g. tramadol)' },
    { id: 'amantadine',  label: 'Amantadine' },
    { id: 'monoclonal',  label: 'Monthly pain injection (e.g. Librela, Solensia)' },
    { id: 'joint',       label: 'Joint supplement' },
    { id: 'other',       label: 'Something else' },
];

// The things owners are asked to do and then forget they were asked to do.
const ORTHO_MANAGEMENTS = [
    { id: 'leadOnly',    label: 'Lead exercise only' },
    { id: 'shortWalks',  label: 'Shorter, more frequent walks' },
    { id: 'restricted',  label: 'Strict rest' },
    { id: 'weight',      label: 'Weight loss plan' },
    { id: 'physio',      label: 'Physiotherapy' },
    { id: 'hydro',       label: 'Hydrotherapy' },
    { id: 'ramps',       label: 'Ramps / no stairs or jumping' },
    { id: 'flooring',    label: 'Non-slip flooring or rugs' },
    { id: 'bedding',     label: 'Orthopaedic bedding' },
    { id: 'harness',     label: 'Support harness' },
];

// WHAT THE OWNER WAS TOLD — never a menu of possibilities for them to pick from, and never read by
// anything. "Not been told yet" leads because it is the honest answer for most lameness.
const ORTHO_CAUSES = [
    { id: 'unknown',        label: 'Not been told yet' },
    { id: 'arthritis',      label: 'Arthritis / degenerative joint disease' },
    { id: 'cruciate',       label: 'Cruciate ligament' },
    { id: 'hipDysplasia',   label: 'Hip dysplasia' },
    { id: 'elbowDysplasia', label: 'Elbow dysplasia' },
    { id: 'patella',        label: 'Slipping kneecap (luxating patella)' },
    { id: 'softTissue',     label: 'Soft-tissue strain or sprain' },
    { id: 'fracture',       label: 'Fracture' },
    { id: 'spinal',         label: 'Back or disc problem' },
    { id: 'paw',            label: 'Paw, pad or nail' },
    { id: 'postop',         label: 'Recovering from surgery' },
    { id: 'growth',         label: 'Growing-pain condition (e.g. panosteitis)' },
    { id: 'other',          label: 'Something else — see the note' },
];

// Stored rather than inferred from how long the log has run: a condition of several years'
// standing can be entered today, and a fortnight of records would otherwise call it acute.
const ORTHO_CHRONICITIES = [
    { id: 'acute',        label: 'Came on suddenly',
      detail: 'Days rather than weeks — he was fine, then he wasn\'t.' },
    { id: 'intermittent', label: 'Comes and goes',
      detail: 'Good spells and bad spells, often for months.' },
    { id: 'chronic',      label: 'There all the time, much the same',
      detail: 'Long-standing and fairly steady.' },
    { id: 'worsening',    label: 'There all the time, and getting worse',
      detail: 'Long-standing and slowly going downhill.' },
    { id: 'unsure',       label: 'Not sure', detail: '' },
];

const ORTHO_VET_STAGES = [
    { id: 'notSeen',  label: 'Not seen by a vet yet' },
    { id: 'seen',     label: 'A vet has examined it' },
    { id: 'imaging',  label: 'X-rays or a scan done' },
    { id: 'referred', label: 'Referred to a specialist' },
    { id: 'surgery',  label: 'Surgery done' },
    { id: 'managed',  label: 'Being managed long-term' },
];

const ORTHO_STATUSES = [
    { id: 'active',   label: 'Being monitored' },
    { id: 'postop',   label: 'Recovering from surgery' },
    { id: 'improved', label: 'Much improved' },
    { id: 'resolved', label: 'Resolved' },
];

// How many days count as "recently"; the score at which a day counts as a bad one; and how many bad
// days before the read mentions it at all. Two prevents a single bad day after a long walk from
// generating an alert — the whole module is about the pattern.
const ORTHO_RECENT_WINDOW_DAYS = 14;
const ORTHO_BAD_DAY_SCORE = 3;
const ORTHO_BAD_DAY_FLOOR = 2;

const ORTHO_STANDING_NOTE =
    'These scores are a record of what you have seen, not a diagnosis. Lameness has many causes '
    + 'and telling them apart needs a vet to examine your pet — but a fortnight of scores, and what '
    + 'you noticed made it worse, is exactly what makes that examination more useful.';


// --- MODIFIED TRIADAN DENTAL CHART ------------------------------------------------------------
// Three digits. The FIRST is the quadrant seen from the front of the animal:
//     1 = upper right   2 = upper left   3 = lower left   4 = lower right   (permanent)
//     5 = upper right   6 = upper left   7 = lower left   8 = lower right   (deciduous)
// The LAST TWO are the position counting back from the midline, on the fixed rule that the canine
// is ALWAYS 04 and the first molar ALWAYS 09. Positions a species lacks are simply absent — which
// is why a cat has no x05 and its lower arcade jumps from 304 to 307.
//
// Counts this table must produce (asserted by DentalChartTests on iOS):
//     Dog permanent 42 · Cat permanent 30 · Dog deciduous 28 · Cat deciduous 26
const DENTAL_POSITIONS = {
    dog: { upper: [1,2,3,4,5,6,7,8,9,10], lower: [1,2,3,4,5,6,7,8,9,10,11] },
    cat: { upper: [1,2,3,4,6,7,8,9],      lower: [1,2,3,4,7,8,9] },
    dogDeciduous: { upper: [1,2,3,4,6,7,8], lower: [1,2,3,4,6,7,8] },
    catDeciduous: { upper: [1,2,3,4,6,7,8], lower: [1,2,3,4,7,8] },
};

const DENTAL_QUADRANTS = [
    { id: 'upperRight', label: 'Upper right', upper: true,  digit: 1, deciduousDigit: 5 },
    { id: 'upperLeft',  label: 'Upper left',  upper: true,  digit: 2, deciduousDigit: 6 },
    { id: 'lowerLeft',  label: 'Lower left',  upper: false, digit: 3, deciduousDigit: 7 },
    { id: 'lowerRight', label: 'Lower right', upper: false, digit: 4, deciduousDigit: 8 },
];

const ECHO_OTHER_ID = 'other';
const ECHO_LVIDD_EXPONENT = 0.294;
const ECHO_LAD_EXPONENT = 0.309;

document.addEventListener('alpine:init', () => {
    Alpine.data('rrTracker', () => ({
        // Absorb the Glossary Engine for tooltips 
        ...glossaryEngine, 

// Onboarding State
showOnboarding: false,
onboardingStep: 0, // 0 = Welcome, 1 = Demographics, 2 = Clinical, 3 = Recommendations
isExistingPatientEdit: false, // Flag to bypass wizard when editing later
speciesOther: '',
// `concerns` is MULTI-SELECT and is the real answer to the step-2 question (2026-08). A pet is
// not one problem: a cardiac patient can just as easily have a lump and itchy skin, and the old
// single-choice radio forced the owner to pick which of their pet's problems counted. Every tick
// simply ADDS to the recommended module set — see `generateModuleRecommendations`.
//
// 'wellness' leads and starts ticked: it is the floor everyone stands on, and the specific
// concerns are things a pet has AS WELL, not instead. Pre-ticking 'cardiac' would be the
// cardiac-first assumption this question dropped.
//
// `hasCardiacIssue` is KEPT as a derived mirror ('yes' | 'seizure' | 'no') because it is the
// parity contract with iOS's `PrimaryConcern` raw values and is still read by the diagnosis
// guard in `saveOnboardedPatient`. Never set it directly — `toggleOnboardingConcern` keeps it
// in step with `concerns`.
onboardingData: {
    concerns: ['wellness'],
    hasCardiacIssue: 'no',
    murmurGrade: '',
    diagnosis: '',
    acvimStage: ''
},

// The step-2 tick list, in display order. Ids are UI-only — nothing persists them; the modules
// they seed are what gets saved.
ONBOARDING_CONCERNS: [
    { id: 'wellness', label: 'General health and wellness' },
    { id: 'cardiac',  label: 'A heart condition or murmur' },
    { id: 'seizure',  label: 'Collapse, fainting or seizures' },
    { id: 'skin',     label: 'Skin problems or itching' },
    { id: 'lump',     label: 'A lump or growth' },
    { id: 'ortho',    label: 'Limping, stiffness or arthritis' },
],

// --- PWA install nudge ---
showInstallOverlay: false,
installPlatform: 'other',      // 'ios' | 'android' | 'other'
canNativeInstall: false,       // beforeinstallprompt captured (Android)
isStandalone: false,

// --- Terms gate (hard, first-use, versioned) ---
termsVersion: '2026-07-01',   // bump this string when terms materially change
termsAgreed: false,
showTermsModal: false,
showPrivacyModal: false,
showTermsGate: false,         // returning-user re-acceptance only
    showDisclaimerModal: false,
    
    
    
    
showRollingMean: true,


// Default module template
defaultModules: {
    srr: true,
    medications: true,
    coughLog: true,
    activityLog: true,
    syncopeLog: true,
    acvimStaging: true,
    weightDiet: true,  
    vaccinations: true,
    antiparasitics: true,
    // Opt-in, so these default OFF where every other module defaults on. Most cardiac patients
    // have neither a skin problem nor a lump, and two empty panels on the wellness view would be
    // clutter for the majority to buy discoverability for the minority. iOS stores the same two
    // flags on the patient itself (`skinLogEnabled` / `lumpTrackingEnabled`) but carries them
    // here, under `modules`, in the backup — so the JSON shape matches on both platforms.
    skinLog: false,
    lumps: false,
    // Opt-in for the same reason: most pets are not lame, and an empty lameness panel on the
    // Monitor view is clutter for the majority to buy discoverability for the minority.
    ortho: false
},

showProgressionBanner: false,

// --- CORE STATE ---



        showHeroHeader: true,
        showLog: false,
        showMedGraph: true,
        showAnalytics: true,
        srrUseRelationalTime: true,
        
        patients: [],    // Array of patient demographic objects
        weightLog: [],   // Array of weight entries over time
        srrHistory: [],  // Array of respiratory rate records
        medLedger: [],   // Array of medication events
        
        activePatientId: null, // UUID of the selected patient
        showPatientManager: false,
        showManualSrr: false,

        // Form bindings
        editingPatient: {
    id: '',
    name: '',
    ownerName: '',
    species: 'dog',
    breed: '',
    sex: 'MN',
    dob: '',
    weight: null,
    weightUnit: 'kg',
    customSrrCutoff: 30,
    // Identification + insurance (see PET_ID_KINDS). Kept literal here because this initial state
    // object is evaluated before `_blankIdentity()` is callable; the other two templates use it.
    microchipNumber: '',
    identifiers: [],
    insuranceCompany: '',
    insurancePolicyNumber: '',
    insuranceLimit: '',
    insuranceNotes: '',
    modules: {
        srr: false,
        medications: false,
        coughLog: false,
        activityLog: false,
        syncopeLog: false,
        acvimStaging: false,
        weightDiet: true,
        vaccinations: true,
        antiparasitics: true
    }
},
        manualSrrInput: null,
        manualSrrDate: '',

        isCounting: false,
        timeLeft: 30,
        tapCount: 0,
        finalRate: null,
        timerInterval: null,
        hasSavedCurrentCount: false,





// ── Vet Export panel state ──

vetExportModules: {
    srr: true,
    medications: true,
    coughLog: true,
    activityLog: true,
    weightDiet: true,
    syncopeLog: true,
    acvimStaging: true,
    vaccinations: true,
    antiparasitics: true,
    skinLog: true,
    lumps: true,
    ortho: true
},


// --- SYMPTOM TRACKING STATE ---
        showSymptomLog: false,        // cough card (Monitor)
        showActivityLog: false,       // activity card (Wellness) — split from the cough card in 2026-08
        coughLog: [],
        activityLog: [],
        showCoughForm: false,     
        showActivityForm: false,
        showCoughOverlay: false,      
        showActivityOverlay: false,  
        showImportExport: false,  
        activityPlotType: 'durationMins',
        
        newCough: {
            date: new Date().toISOString().split('T')[0],
            frequencyCount: '',
            frequencyPeriod: 'day', // hour, day, week
            severity: 'Mild', 
            description: 'chesty/productive', // chesty/productive, goose honking, reverse sneezing, expiratory reflex (gag)
            context: 'Resting/Night', 
            notes: ''
        },

        newActivity: {
            date: new Date().toISOString().split('T')[0],
            status: 'Normal', 
            durationMins: '', 
            distanceValue: '',      // numeric, in appSettings.distanceUnit
            distanceUnit: null,     // resolved to appSettings.distanceUnit when the form opens
            notes: ''
        },

        // --- Syncope and Diagnosis objects ---
        showDiagnosisLog: false,

// --- BLOOD TEST RESULTS (parity with iOS schema V8; see BACKLOG §3j) ---
// One row per analyte per sample. Two rules are load-bearing and must not be "improved":
//   1. The reference range stored is the one PRINTED ON THAT REPORT. Ranges are lab-, analyser-,
//      species- and unit-specific, so the app only ever says "inside/outside the range this lab
//      gave" and says nothing at all when none was given.
//   2. Units are NEVER converted and never mixed on one chart. Urea vs BUN differ ~2.14x and
//      SI vs conventional creatinine ~88x; a silent conversion here is a clinical safety bug.
bloodResults: [],
echoMeasurements: [],
// Surgeries, dentals & procedures — see PROCEDURE_CATEGORIES above for the two load-bearing rules.
procedureLog: [],
PROCEDURE_CATEGORIES_LIST: PROCEDURE_CATEGORIES,
PROCEDURE_AREAS_LIST: PROCEDURE_AREAS,
showProcedurePanel: false,
showProcedureForm: false,
editingProcedureId: null,
newProcedure: {
    date: new Date().toISOString().split('T')[0],
    status: 'completed',
    category: 'surgery',
    name: '',
    area: '',
    performedBy: '',
    hadGA: true,
    recoveryNotes: '',
    extractions: [],           // [{ tooth: '104', note: 'FORL' }]
    histopathSent: false,
    histopathResult: '',
    histopathDate: '',
    notes: '',
    reminderEnabled: true
},
showDeciduousTeeth: false,
// Veterinary appointments — see APPOINTMENT_TYPES above for the three load-bearing rules.
appointmentLog: [],
APPOINTMENT_TYPES_LIST: APPOINTMENT_TYPES,
APPOINTMENT_STATUSES_LIST: APPOINTMENT_STATUSES,
showAppointmentPanel: false,
showAppointmentForm: false,
editingAppointmentId: null,
// The type the form was showing before the owner changed it — see `onAppointmentTypeChange`.
_appointmentPrevType: 'checkup',
newAppointment: {
    date: new Date().toISOString().split('T')[0],
    time: '',                 // '' or 'HH:mm' LOCAL WALL-CLOCK — never folded into `date`
    type: 'checkup',
    status: 'booked',
    title: '',
    providerName: '',         // copied from appSettings.careProviders — NOT a reference
    locationLabel: '',
    address: '',
    phone: '',
    providerId: null,         // soft hint into the device-local contacts book; may dangle
    locationId: null,
    preparation: '',          // 'no food after 8pm' — the part worth being reminded of
    questionsToAsk: '',       // one per line
    outcome: '',
    notes: '',
    reminderEnabled: true,
    reminderLeadDays: 7,
    remindDayBefore: true,
    createdAt: ''
},
// Food allergies & adverse drug reactions — see ALLERGY_TYPES above for the three load-bearing
// rules. One list holds both kinds; the two panels filter on `type`.
allergyLog: [],
ALLERGY_TYPES_LIST: ALLERGY_TYPES,
ALLERGY_SEVERITIES_LIST: ALLERGY_SEVERITIES,
ALLERGY_CERTAINTIES_LIST: ALLERGY_CERTAINTIES,
showAllergyForm: false,
editingAllergyId: null,
viewingAllergyId: null,        // the record whose full detail card is open
newAllergy: {
    type: 'food',
    allergen: '',
    drugId: '',
    severity: 'unknown',
    certainty: 'confirmed',
    reaction: '',
    date: '',                  // '' = the owner does not know when it started; never today
    notes: ''
},
// --- Skin & itch -----------------------------------------------------------------------
// A DAILY SUMMARY: one entry per patient per day, upserted on the day like the cough log.
// Itch is a state, not an event — "she scratched at three o'clock" is not a fact anyone acts
// on, whereas "Tuesday was a 7" is. One row per day also stops a chatty week out-voting a
// quiet month simply by having more rows in it.
skinLog: [],
SKIN_SITES_LIST: SKIN_SITES,
SKIN_SIGNS_LIST: SKIN_SIGNS,
SKIN_TREATMENTS_LIST: SKIN_TREATMENTS,
SKIN_TRIGGERS_LIST: SKIN_TRIGGERS,
SKIN_EAR_STATES_LIST: SKIN_EAR_STATES,
showSkinLog: false,
showSkinForm: false,
showSkinPattern: false,
newSkin: {
    date: new Date().toISOString().split('T')[0],
    // null = the day was logged WITHOUT a score, which is not the same as 0 (the pet was
    // comfortable). Neither end may coerce one into the other — see `saveSkinEntry`.
    itchScore: 3,
    hasScore: true,
    sites: [],
    signs: [],
    earStatus: 'none',
    treatments: [],
    treatmentNotes: '',
    suspectedTrigger: 'unknown',
    vetVisit: false,
    notes: ''
},

// --- Lumps -----------------------------------------------------------------------------
// A lump is an ENTITY with a log attached, not a flat series of dated rows: the thing being
// tracked persists and the observations attach to it. Flattened into one table, "the lump on
// her left shoulder" would exist only as a string repeated on every row — a typo would split
// one lump into two, and there would be nowhere for the facts that belong to the lump rather
// than to a Tuesday (when it was first noticed, whether a vet has seen it, whether it is out).
lumpLog: [],
lumpMeasurements: [],

// ── Orthopaedics (see the ORTHO_* block near the top of this file for the safety rule) ──
orthoConditions: [],
orthoLog: [],
ORTHO_LEGS_LIST: ORTHO_LEGS,
ORTHO_LAMENESS_SCALE_LIST: ORTHO_LAMENESS_SCALE,
ORTHO_STIFFNESS_LIST: ORTHO_STIFFNESS,
ORTHO_AGGRAVATORS_LIST: ORTHO_AGGRAVATORS,
ORTHO_PAIN_RELIEF_LIST: ORTHO_PAIN_RELIEF,
ORTHO_MANAGEMENTS_LIST: ORTHO_MANAGEMENTS,
ORTHO_CAUSES_LIST: ORTHO_CAUSES,
ORTHO_CHRONICITIES_LIST: ORTHO_CHRONICITIES,
ORTHO_VET_STAGES_LIST: ORTHO_VET_STAGES,
ORTHO_STATUSES_LIST: ORTHO_STATUSES,
ORTHO_STANDING_NOTE_TEXT: ORTHO_STANDING_NOTE,
showOrthoLog: false,
showOrthoConditionForm: false,
showOrthoEntryForm: false,
editingOrthoConditionId: null,
editingOrthoEntryId: null,
viewingOrthoConditionId: null,   // the condition whose day-by-day history is open
scoringOrthoConditionId: null,   // the condition the daily form is attached to
newOrthoCondition: {
    label: '',
    legs: [],
    suspectedCause: 'unknown',
    vetDiagnosis: '',
    chronicity: 'unsure',
    firstNoticed: '',            // '' = the owner does not know; never today
    vetStage: 'notSeen',
    painReliefPlan: '',
    management: [],
    status: 'active',
    notes: ''
},
newOrthoEntry: {
    date: new Date().toISOString().split('T')[0],
    // '' means the day was logged WITHOUT being scored, which is not the same as 0 (sound). Every
    // consumer skips it rather than reading it as zero — see `_orthoIsScored`.
    lamenessScore: '',
    legs: [],
    stiffnessOnRising: 'unsure',
    worseAfter: [],
    painReliefGiven: [],
    painReliefNotes: '',
    vetVisit: false,
    notes: ''
},
LUMP_SITES_LIST: LUMP_SITES,
LUMP_SIDES_LIST: LUMP_SIDES,
LUMP_CONSISTENCIES_LIST: LUMP_CONSISTENCIES,
LUMP_MOBILITIES_LIST: LUMP_MOBILITIES,
LUMP_SIGNS_LIST: LUMP_SIGNS,
LUMP_VET_STAGES_LIST: LUMP_VET_STAGES,
LUMP_STATUSES_LIST: LUMP_STATUSES,
LUMP_SIZE_REFERENCES_LIST: LUMP_SIZE_REFERENCES,
LUMP_STANDING_NOTE_TEXT: LUMP_STANDING_NOTE,
showLumpLog: false,
showLumpForm: false,
showLumpMeasureForm: false,
editingLumpId: null,
editingMeasurementId: null,
viewingLumpId: null,           // the lump whose measurement history is open
measuringLumpId: null,         // the lump the measurement form is attached to
newLump: {
    label: '',
    site: '',
    side: '',
    siteDetail: '',
    firstNoticed: '',          // '' = the owner does not know; never today
    status: 'monitoring',
    vetStage: 'notSeen',
    vetDiagnosis: '',
    resolvedDate: '',
    notes: '',
    // The FIRST measurement, taken inline while the lump is being added (2026-08). Measuring used
    // to live only behind the lump's history panel and owners did not find it, which left the
    // module recording that a lump exists and nothing about its size — when the size over time is
    // the entire point. Optional: a lump added from the sofa with no ruler to hand is still worth
    // recording, so nothing is created unless a dimension is typed. Ignored when EDITING — the
    // full measurement form is where consistency, signs and notes belong.
    firstMeasure: { unit: 'mm', length: '', width: '', depth: '' }
},
newLumpMeasurement: {
    date: new Date().toISOString().split('T')[0],
    // Typed in the owner's chosen unit; ALWAYS converted to millimetres on save. A table
    // holding a number plus the unit it was written in is a table where "12" and "1.2"
    // describe the same lump.
    unit: 'mm',
    length: '',
    width: '',
    depth: '',
    consistency: 'unsure',
    mobility: 'unsure',
    signs: [],
    notes: ''
},

// Alpine templates can only see component properties, not module globals — same reason
// `antiparasiticFormulary` is exposed below.
ECHO_MEASURES_LIST: ECHO_MEASURES,
copiedInsuranceField: null,
showEchoPanel: false,
showEchoForm: false,
editingEchoKey: null,          // "studyDate|centre" of the study being edited
newEchoStudy: {
    studyDate: new Date().toISOString().split('T')[0],
    centreName: '',
    notes: '',
    values: blankEchoValues()  // measureId -> { value, unit }; never {} — see blankEchoValues()
},
showBloodPanel: false,
showBloodForm: false,
showBloodImport: false,
bloodViewMode: 'latest',          // 'latest' | 'visits'
editingBloodId: null,
expandedBloodMarker: null,
bloodPasteText: '',
bloodParseRows: [],               // review rows from a pasted report, before anything is saved
bloodParseMeta: { sampleDate: '', labName: '' },
newBloodResult: {
    id: null,
    sampleDate: new Date().toISOString().split('T')[0],
    markerId: '',
    customName: '',
    value: '',
    unit: '',
    refLow: '',
    refHigh: '',
    labName: '',
    notes: ''
},

        showSyncopeLog: false,
        showSyncopeOverlay: false,
        showDiagnosisOverlay: true,
        diagnosisLog: [],
        syncopeLog: [],
        showDiagnosisForm: false,
        showSyncopeForm: false,
        newConcurrentDiagnosis: '',
        editingDiagnosisId: null, // Tracks if we are editing an existing diagnosis log
        editingSyncopeId: null, // Tracks if we are editing an existing syncope log
        
        // --- SYNCOPE / EVENT LOGGING ---
selectedEventType: 'Unknown', // Defaults to Unknown
customEventType: '',
eventDate: '',
eventDuration: '',
eventNotes: '',
eventTimeline: [],


// --- WEIGHT & DIET STATE ---
showWeightLogPanel: false,
showWeightForm: false,
editingWeightId: null,
newWeightEntry: {
    date: new Date().toISOString().split('T')[0],
    weightValue: '',
    bcs: '',
    appetite: 'Normal', // Ravenous, Normal, Reduced, Anorexic
    foodBrand: '',
    portionSize: '',
    supplements: '',
    notes: ''
},

// --- ANTIPARASITIC STATE ---
antiparasiticFormulary: ANTIPARASITIC_FORMULARY,   // expose global to Alpine
parasiteTargets: PARASITE_TARGETS,                 // expose global to Alpine
parasiteRegionDefaults: PARASITE_REGION_DEFAULTS,  // expose global to Alpine
antiparasiticLog: [],
showAntiparasiticPanel: false,
showAntiparasiticForm: false,
editingAntiparasiticId: null,
selectedProductEntry: null,        // active product entry while form is open
newCustomParasite: { label: '', category: 'endo' },

// Reusable priorities page
showPrioritiesModal: false,
prioritiesContext: 'edit',         // 'onboarding' | 'edit' | 'review'
prioritiesDraft: { region: 'uk', travel: false, priorities: [] },

newAntiparasitic: {
    date: new Date().toISOString().split('T')[0],
    productId: '',
    customName: '',
    customCovers: [],              // user-defined coverage for 'other'
    covers: [],                    // auto-filled from formulary (display chips)
    partial: [],
    intervalDays: 30,
    intervalLabel: 'Monthly',
    nextDueDate: '',
    batchNumber: '',
    administeredBy: '',
    notes: ''
},

// --- VACCINATION STATE ---
vaccinationLog: [],
showVaccinationLogPanel: false,
showVaccinationForm: false,
editingVaccineId: null,
selectedCatalogueEntry: null,   // active catalogue entry while form is open
vaccineAddonList: [],           // array of addon objects for the current form

newVaccine: {
    date: new Date().toISOString().split('T')[0],
    vaccineId: '',              // catalogue ID
    type: '',                   // shortLabel — kept for backward compat display
    customType: '',
    isCombi: false,
    components: [],             // auto-filled from catalogue
    additionals: [],            // [{ id, label, nextDueDate }] — saved alongside
    nextDueDate: '',
    wsavaSuggestedDate: '',
    intervalMode: 'wsava',      // 'wsava' | 'custom'
    batchNumber: '',
    administeredBy: '',
    notes: ''
},


        // --- DIAGNOSIS & STAGING ---

acvimStage: '', // Easily mutable without changing the primary diagnosis
concurrentDiagnoses: [], // Array to hold non-cardiac issues

        
showCardiacForm: false,
        showConcurrentForm: false,

        newDiagnosis: {
            date: new Date().toISOString().split('T')[0],
            diagnosis: '',
            customDiagnosis: '', 
            murmurGrade: 'N/A',  
            acvimStage: 'N/A',
            concurrentDiagnoses: [],
            notes: '',
            resolvedDate: ''        // '' = ongoing (iOS schema V8 parity; BACKLOG §3j)
        },
        

injectionLog: [],
showInjectionPanel: false,
showInjectionForm: false,
editingInjectionId: null,
injectionChartRenderTimeout: null,
newInjection: {
    date: new Date().toISOString().split('T')[0],   // day-level yyyy-MM-dd
    customName: '',        // product name (custom-only)
    dose: '',              // optional free text: "40 mg" / "1 vial"
    intervalDays: 30,
    intervalLabel: 'Monthly',
    nextDueDate: '',       // filled by _calcInjectionDue
    batchNumber: '',
    administeredBy: '',
    notes: ''
},


        newSyncope: {
            date: new Date().toISOString().split('T')[0],
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
            type: 'Syncope', // Syncope, Collapse, Seizure
            duration: '',
            loc: 'Full', // Full, Partial, None
            muscleTone: 'Flaccid', // Flaccid, Stiff, Jerking, Normal
            activityBefore: '',
            mmColour: '',
            hr: null,
            rr: null,
            notes: ''
        },
        
        // --- PAGINATION STATE and COUNTING ---
        currentPage: 1,
        itemsPerPage: 20,
        editingCommentId: null,
		commentDraft: '',
		expandedCommentId: null,
		currentEffort: null,   // 1–5 for the count on the result card; null = not recorded
		currentRestState: 'asleep',   // 'asleep' | 'resting'

		
		// Cardalis Import State
cardalisEmailText: '',
showCardalisImport: false,

// Heart2Heart Import State
heart2HeartText: '',
showHeart2HeartImport: false,

        // --- CHART & CONTROLS ---
        timeScale: '180d', // Default to 6 months
        customStartDate: '',
        customEndDate: '',
        showMedications: true,
        chartInstance: null,
        chartRenderTimeout: null,
        isChartExpanded: false,
        showCutoffLine: true,
showMeanRef: true,

weightChartRenderTimeout: null,
        
        // Medication Module State
 editingMedId: null,   // non-null → med modal is editing this entry
showMedLog: false, // Accordion toggle state
showMedForm: false, // Overlay form visibility
formulary: VET_FORMULARY, // Expose the global object to Alpine
drugClassColors: (typeof DRUG_CLASS_COLORS !== 'undefined' ? DRUG_CLASS_COLORS : {}), // class → colour (colour-by-class)
injectableFormulary: (typeof INJECTABLE_FORMULARY !== 'undefined' ? INJECTABLE_FORMULARY : {}), // Cytopoint/Librela/Solensia…
injSearchOpen: false,   // injectable name suggestion list visibility
// Type-ahead medication search state (replaces the fixed dropdown — mirrors iOS DrugSearchField).
medSearch: '',            // the visible text in the medication search box
medSearchFocused: false,
medSearchOpen: false,     // whether the suggestion list is shown
newMed: {
    eventDate: new Date().toISOString().split('T')[0],
    drugId: '',
    customName: '',
    brand: '',            // trade name (formulary optional / custom trade) — "Brand (Generic)"
    isStopped: false,
        openedDate: '',     // NEW — date liquid bottle was opened
    discardDays: '', 
    form: 'tablet',           // NEW — 'tablet' | 'liquid'
    tabletStrengthMg: '',     // tablet: mg/tablet   | liquid: mg/ml (concentration)
    tabletsPerDose: '',       // tablet: tablets/dose | liquid: ml/dose
    frequency: 'q12h',
    doseTimes: [],   // ['08:00','20:00'] local wall-clock; [] = no schedule
    tabletsInStock: '',       // tablet: tablets      | liquid: total ml
    stockDate: new Date().toISOString().split('T')[0]
},
suppLedger: [],  // Array of supplement events (mirrors medLedger, dose optional)
// Supplement Module State
showSuppForm: false,
editingSuppId: null,  // non-null → supplement modal is editing this entry
suppFormulary: SUPPLEMENT_FORMULARY,
suppConstituents: SUPPLEMENT_CONSTITUENTS,
newSupp: {
    eventDate: new Date().toISOString().split('T')[0],
    productId: '',
    customName: '',
    customConstituents: [],
    customExtras: [],
    isStopped: false,
    doseAmount: '',
    doseUnit: 'tablet(s)',
    frequency: 'q24h'
},
newSuppExtraDraft: '',


        // Medication Chart State
      //  medTimeScale: '180d', 
        medChartInstance: null,
     //   medCustomStartDate: '',
      //  medCustomEndDate: '',
        medChartRenderTimeout: null,
        
        // State for the Merge UI
        showMergeTools: false,
        mergeTargetId: '',
        
// --- module status pills ---
showAllModules: false,
modulePopover: { open: false, key: null, x: 0, y: 0 },
termsError: false,

moduleMeta: [
  { key:'srr',            label:'SRR',            icon:'fa-lungs',            c:'#15803d', bg:'#dcfce7', bd:'#bbf7d0', glossary:'module_srr',
    desc:'Resting respiratory rate — the key early-warning sign of heart failure.' },
  { key:'medications',    label:'Meds',           icon:'fa-pills',           c:'#1d4ed8', bg:'#dbeafe', bd:'#bfdbfe', glossary:'module_medications',
    desc:'Log cardiac drugs, doses and changes over time.' },
  { key:'coughLog',       label:'Cough',          icon:'fa-head-side-cough', c:'#be123c', bg:'#fff1f2', bd:'#fecdd3', glossary:'module_cough',
    desc:'Track cough frequency, type and severity day to day.' },
  { key:'activityLog',    label:'Activity',       icon:'fa-person-running',  c:'#0f766e', bg:'#ecfeff', bd:'#a5f3fc', glossary:'module_activity',
    desc:'Record energy levels, walk duration and distance.' },
  { key:'acvimStaging',   label:'Diagnosis',      icon:'fa-stethoscope',     c:'#6d28d9', bg:'#ede9fe', bd:'#ddd6fe', glossary:'module_diagnosis',
    desc:'Record diagnosis and ACVIM heart-disease stage.' },
  { key:'weightDiet',     label:'Weight',         icon:'fa-scale-balanced',  c:'#c2410c', bg:'#fff7ed', bd:'#fed7aa', glossary:'module_diet_weight',
    desc:'Monitor body weight and diet as a time series.' },
  { key:'syncopeLog',     label:'Syncope',        icon:'fa-bolt',            c:'#b91c1c', bg:'#fef2f2', bd:'#fecaca', glossary:'module_syncope',
    desc:'Diary of fainting or collapse episodes.' },
  { key:'vaccinations',   label:'Vaccines',       icon:'fa-syringe',         c:'#2563eb', bg:'#eff6ff', bd:'#bfdbfe', glossary:'module_vaccinations',
    desc:'Keep a vaccination history and due dates.' },
  { key:'antiparasitics', label:'Anti-Parasitics',icon:'fa-bug-slash',       c:'#166534', bg:'#f0fdf4', bd:'#bbf7d0', glossary:'module_antiparasitics',
    desc:'Track flea, tick and worming protection.' },
  // Skin and lumps sit at the end because they are opt-in and newer than the rest of this table.
  // Amber for skin (the register the app uses for irritation) and a deliberately neutral slate for
  // lumps — a lump chip must not look like a verdict. Kept identical with `ModuleCatalogue.all`.
  { key:'skinLog',        label:'Skin',           icon:'fa-hand-dots',       c:'#b45309', bg:'#fffbeb', bd:'#fde68a', glossary:'module_skin',
    desc:'Score itching day by day and spot a yearly pattern.' },
  { key:'lumps',          label:'Lumps',          icon:'fa-circle-dot',      c:'#475569', bg:'#f8fafc', bd:'#e2e8f0', glossary:'module_lumps',
    desc:'Measure lumps over time and keep the history.' },
  // Indigo — distinct from the cardiac greens and the skin amber, and deliberately not a warning
  // colour: a lameness chip must not look like an alert.
  { key:'ortho',          label:'Lameness',       icon:'fa-bone',             c:'#4338ca', bg:'#eef2ff', bd:'#c7d2fe', glossary:'module_ortho',
    desc:'Score lameness day by day against how much they walked.' },
],

moduleMetaByKey(key) {
  return this.moduleMeta.find(m => m.key === key) || {};
},

inactiveModuleCount() {
  const mods = this.activePatientProfile?.modules || {};
  return this.moduleMeta.filter(m => !mods[m.key]).length;
},

onModulePillClick(m, ev) {
  const x = Math.min(ev.clientX, window.innerWidth - 250);
  const y = Math.min(ev.clientY + 12, window.innerHeight - 190);
  this.modulePopover = { open: true, key: m.key, x, y };
},

disableModuleFromPill(key) {
  const p = this.patients.find(p => p.id === this.activePatientId);
  if (!p || !p.modules) return;
  p.modules[key] = false;
  this.saveToStorage('vch_patients', this.patients);
  this.modulePopover.open = false;
},

enableModuleFromPill(key) {
  const p = this.patients.find(p => p.id === this.activePatientId);
  if (!p) return;
  if (!p.modules) p.modules = {};
  p.modules[key] = true;

  this.saveToStorage('vch_patients', this.patients);   // same call savePatient() uses
  this.modulePopover.open = false;

  if (key === 'antiparasitics') this.openPrioritiesModal('edit');
},

learnModuleFromPill(key) {
  const g = this.moduleMetaByKey(key).glossary;
  this.modulePopover.open = false;
  // Every module now has an entry, but the guard stays: a NEW module added to `moduleMeta` before
  // its glossary term is written would otherwise open a blank drawer, and doing nothing is better.
  // (Skin, lumps and lameness sat on '' here for a while after their entries existed — the pill's
  // "Learn more" silently did nothing. Set `glossary` when you add the term.)
  if (!g) return;
  this.openGlossary(g);
},
        
        // ===================== VIEW NAVIGATION (activeView) =====================
activeView: 'monitor',        // ← first run lands on the counter (was the retired 'all' scroll)

// Sections split by what the OWNER came to do, not by data type (2026-08 restructure; see
// `navigation-restructure-2026-08.md`). Monitor = what you watch, Wellness = routine upkeep,
// Medical = the vet-side record. Kept in step with the iOS tab bar, ids included.
//
// The old 'all' view — every section in one scroll — was retired in the same change: it was
// already the longest page in the app, and a three-way split made it longer still.
navItems: [
    { id: 'monitor',  label: 'Monitor',  icon: 'fa-heart-pulse',  modules: ['srr','coughLog','syncopeLog','skinLog','lumps','ortho'] },
    { id: 'wellness', label: 'Wellness', icon: 'fa-paw',          modules: ['weightDiet','activityLog','vaccinations','antiparasitics'] },
    { id: 'medical',  label: 'Medical',  icon: 'fa-stethoscope',  modules: null },
    { id: 'trends',   label: 'Trends',   icon: 'fa-chart-line',   modules: ['srr','medications','acvimStaging','weightDiet','antiparasitics','vaccinations'] },
    { id: 'more',     label: 'More',     icon: 'fa-ellipsis',     modules: null }
],

// Tab ids persisted before the restructure, mapped onto the current ones. `vch_activeView` and
// `appSettings.defaultLandingView` both store a raw id, so without this an existing owner's saved
// view silently stops resolving. Mirrors `AppTab.migrate` on iOS.
_legacyViewIds: { count: 'monitor', meds: 'medical', all: 'monitor' },

migrateViewId(stored) {
    if (!stored) return stored;
    if (this.navItems.some(n => n.id === stored)) return stored;
    return this._legacyViewIds[stored] || stored;
},
// ── More view sub-navigation ──
moreSection: 'data',
moreSections: [
    { id: 'settings',  label: 'Settings',       icon: 'fa-sliders' },
    { id: 'appointments', label: 'Appointments', icon: 'fa-calendar-check' },
    { id: 'insurance', label: 'Insurance',      icon: 'fa-shield-halved' },
    { id: 'data',      label: 'Data & Backup',  icon: 'fa-database' },
    { id: 'help',     label: 'Help & FAQs',    icon: 'fa-circle-question' },
    { id: 'about',    label: 'About',          icon: 'fa-circle-info' }
],
// Whether this pet has anything worth showing in the insurance panel.
hasInsuranceDetails(p) {
    const pet = p || this.activePatientProfile;
    if (!pet) return false;
    return !!((pet.insuranceCompany || '').trim() || (pet.insurancePolicyNumber || '').trim());
},

// Copy a value to the clipboard. The moment an owner needs a policy number is at a reception desk,
// and pasting it beats reading it aloud off a screen — the same reasoning as the iOS screen.
copyInsuranceValue(value, label) {
    const text = String(value == null ? '' : value).trim();
    if (!text) return;
    const done = () => {
        this.copiedInsuranceField = label;
        setTimeout(() => { if (this.copiedInsuranceField === label) this.copiedInsuranceField = null; }, 2000);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(() => {});
    } else {
        // Older Safari on iOS: the execCommand path still works from a user gesture.
        try {
            const el = document.createElement('textarea');
            el.value = text;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            done();
        } catch (e) {}
    }
},

setMoreSection(s) {
    this.moreSection = s;
    try { localStorage.setItem('vch_moreSection', s); } catch (e) {}
    window.scrollTo({ top: 0, behavior: 'auto' });
},

// True if ANY of the given modules is enabled for the active patient.
// Legacy profiles without a modules object show everything.
modOn(...keys) {
    const mods = this.activePatientProfile?.modules;
    if (!mods) return true;
    return keys.some(k => mods[k]);
},

// Exact match. This used to carry an `activeView === 'all'` branch so every section could show at
// once; retiring the 'all' view removed the need for it.
isView(v) {
    return this.activeView === v;
},

// Tabs whose required modules are all disabled get hidden
visibleNavItems() {
    const mods = this.activePatientProfile?.modules || {};
    return this.navItems.filter(item => !item.modules || item.modules.some(m => mods[m]));
},

get currentViewLabel() {
    return (this.navItems.find(n => n.id === this.activeView) || {}).label || '';
},

// Opening a tab auto-expands the accordions that belong to it
_expandForView(v) {
    if (v === 'medical')  { this.showMedLog = true; this.showDiagnosisLog = true; this.showMedGraph = true; this.$nextTick(() => this.renderInjectionChart()); }
    if (v === 'monitor')  { this.showLog = true; this.showAnalytics = true;
                            this.showSymptomLog = true; this.showSyncopeLog = true;
                            this.showSkinLog = true; this.showLumpLog = true; }
    if (v === 'wellness') { this.showActivityLog = true; this.showWeightLogPanel = true;
                            this.showVaccinationLogPanel = true;
                            this.showAntiparasiticPanel = true; }
    if (v === 'trends')   { this.showAnalytics = true; this.showMedGraph = true; this.$nextTick(() => this.renderWeightChart()); }
},

setView(v) {
    const sameTab = this.activeView === v;
    this.activeView = v;
    this._expandForView(v);
    try { localStorage.setItem('vch_activeView', v); } catch (e) {}
    // Tapping the active tab again scrolls back to top; switching jumps to top
    window.scrollTo({ top: 0, behavior: sameTab ? 'smooth' : 'auto' });
},

// ── App settings — global preferences, persisted separately from patient data ──
appSettings: {
    defaultLandingView: 'remember',   // 'remember' or a navItems id
    defaultWeightUnit: 'kg',          // pre-fills new patient profiles
    defaultSrrCutoff: 30,             // pre-fills new patient profiles
    countDuration: 30,                // preferred SRR count window (seconds): 15, 30 or 60
    backupWarnDays: 14,                // backup staleness threshold
    distanceUnit: null,                // 'miles'|'feet'|'km'|'metres' — derived from locale on first run
    // [{ id, name, role, email, phone, notes, locations: [{ id, label, address, phone }] }]
    //
    // `locations` are BRANCHES. A practice group is one contact with several front doors: the owner
    // books with "Oakwood Vets" but is told to attend Taunton this time and Exeter the next. An
    // appointment picks a branch and copies its address in, so on the day the owner knows exactly
    // where to go. `address` is one multi-line string on purpose — structured fields buy nothing
    // here and are wrong the moment a referral centre writes its address in another shape.
    //
    // Absent on every contacts book saved before branches existed, hence `normaliseCareProviders`.
    careProviders: [],
},

loadAppSettings() {
    try {
        const saved = JSON.parse(localStorage.getItem('vch_appSettings'));
if (saved && typeof saved === 'object') Object.assign(this.appSettings, saved);
    } catch (e) {}
    if (!this.appSettings.distanceUnit) this.appSettings.distanceUnit = this._defaultDistanceUnit();
    // A landing view saved before the 2026-08 rename matches no <option>, which would render the
    // picker blank and lose the owner's choice the next time they touched it.
    if (this.appSettings.defaultLandingView !== 'remember')
        this.appSettings.defaultLandingView = this.migrateViewId(this.appSettings.defaultLandingView);
    this.normaliseCareProviders();
},

// Every contacts book saved before branches existed lacks `locations`. Backfilling it here means
// nothing downstream has to guard, and — the part that matters — the owner's vet, cardiologist and
// emergency clinic survive the upgrade untouched.
normaliseCareProviders() {
    this.appSettings.careProviders = (this.appSettings.careProviders || []).map(p => ({
        ...p,
        locations: (p.locations || []).map(l => ({
            id: l.id || this.generateId(),
            label: l.label || '', address: l.address || '', phone: l.phone || ''
        }))
    }));
},

// Drop branch rows the owner added but never filled in — an empty one would show up as a
// nameless option in the appointment picker.
cleanCareProviderLocations(list) {
    return (list || [])
        .filter(l => (l.label || '').trim() || (l.address || '').trim())
        .map(l => ({
            id: l.id || this.generateId(),
            label: (l.label || '').trim(),
            address: (l.address || '').trim(),
            phone: (l.phone || '').trim()
        }));
},

saveAppSettings() {
    this.saveToStorage('vch_appSettings', this.appSettings);
},

    // Disclaimer Engine
acceptTermsAndStart() {          // step-0 CTA
  if (!this.termsAgreed) return;
  this.recordTermsAcceptance();
  this.onboardingStep = 1;
},
recordTermsAcceptance() {
  localStorage.setItem('vch_terms_version', this.termsVersion);
  localStorage.setItem('vch_terms_accepted_at', new Date().toISOString());
  this.termsAgreed = true;
  this.showTermsGate = false;
},
addCareProvider(p)    { this.appSettings.careProviders.push({ id: this.generateId(), ...p, locations: this.cleanCareProviderLocations(p.locations) }); this.saveAppSettings(); },
updateCareProvider(p) { const i = this.appSettings.careProviders.findIndex(x => x.id === p.id); if (i > -1) this.appSettings.careProviders[i] = { ...p, locations: this.cleanCareProviderLocations(p.locations) }; this.saveAppSettings(); },
deleteCareProvider(id){ this.appSettings.careProviders = this.appSettings.careProviders.filter(x => x.id !== id); this.saveAppSettings(); },


    
initDisclaimer() {
  if (this.patients.length === 0) return;   // brand-new users see onboarding instead
  const last = localStorage.getItem('vch_disclaimer_timestamp');
  const thirtyDays = 30 * 24 * 60 * 60 * 1000;
  if (!last || (Date.now() - parseInt(last, 10)) > thirtyDays) {
    this.showDisclaimerModal = true;
  }
},
    
acceptDisclaimer() {
        localStorage.setItem('vch_disclaimer_timestamp', Date.now().toString());
        this.showDisclaimerModal = false;
    },

    // Optional: Allow users to manually invoke it from the footer
    forceShowDisclaimer() {
        this.showDisclaimerModal = true;
    },
    
get formularyReviewedLabel() {
    try {
        return new Date(VCH_FORMULARY_REVIEWED + 'T12:00:00')
            .toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch (e) { return VCH_FORMULARY_REVIEWED; }
},

initInstallNudge() {
    this.isStandalone = window.matchMedia('(display-mode: standalone)').matches
        || window.navigator.standalone === true;
    const ua = navigator.userAgent;
    const isIPad = /Macintosh/.test(ua) && 'ontouchend' in document; // iPadOS reports as Mac
    if (/iPhone|iPad|iPod/.test(ua) || isIPad) this.installPlatform = 'ios';
    else if (/Android/.test(ua)) this.installPlatform = 'android';

    this.canNativeInstall = !!window.vchDeferredInstall;
    window.addEventListener('vch-installable', () => { this.canNativeInstall = true; });
    window.addEventListener('appinstalled', () => { this.showInstallOverlay = false; });

    // Auto-offer once: mobile browser tab, no patient data yet, not previously dismissed
    if (!this.isStandalone && this.installPlatform !== 'other'
        && this.patients.length === 0
        && !localStorage.getItem('vch_install_prompt_seen')) {
        setTimeout(() => { this.showInstallOverlay = true; }, 800);
    }
},
iosIsSafari() {
    return this.installPlatform === 'ios' && !/CriOS|FxiOS|EdgiOS|OPT\//.test(navigator.userAgent);
},
dismissInstallOverlay() {
    localStorage.setItem('vch_install_prompt_seen', '1');
    this.showInstallOverlay = false;
},
async triggerNativeInstall() {
    const p = window.vchDeferredInstall;
    if (!p) return;
    p.prompt();
    const { outcome } = await p.userChoice;
    window.vchDeferredInstall = null;
    this.canNativeInstall = false;
    if (outcome === 'accepted') this.dismissInstallOverlay();
},

// Generate robust UUID (Fallback for older browsers just in case)
        generateId() {
            if (window.crypto && window.crypto.randomUUID) return crypto.randomUUID();
            return 'vch-' + Date.now().toString(36) + Math.random().toString(36).substr(2);
        },
        
        saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (e) {
        if (e.name === 'QuotaExceededError' || e.code === 22 || e.code === 1014) {
            alert(
                '⚠️ Device storage is full.\n\n' +
                'Your last save did NOT complete. Please export a Master Backup immediately, ' +
                'then clear old browser data before continuing.'
            );
        } else {
            console.error('VCH Storage Error:', key, e);
        }
        return false;
    }
},


speciesIcon(patient) {
  if (!patient) return 'fa-paw';
  if (patient.species === 'dog') return 'fa-dog';
  if (patient.species === 'cat') return 'fa-cat';

  // 'other' → sniff the free-text field for an obvious match
  const s = (patient.speciesOther || '').toLowerCase();

  const match = [
    [/rabbit|bunny|lagomorph/,                'fa-carrot'],      // no free rabbit; carrot as thematic stand-in
    [/horse|pony|equine|foal|mare|stallion/,  'fa-horse'],
    [/bird|budgie|parrot|cockatiel|canary|finch|dove|pigeon|chicken|hen|duck|goose|avian/, 'fa-dove'],  // fa-dove is free
    [/fish|goldfish|koi/,                      'fa-fish'],
    [/frog|toad|newt|amphibian/,               'fa-frog'],
    [/snake|lizard|gecko|reptile|tortoise|turtle/, 'fa-worm'],
    [/ferret|weasel|stoat|mustelid/,           'fa-otter'],
    [/cow|cattle|calf|bovine|bull/,            'fa-cow'],
    [/sheep|lamb|ewe|ram|goat/,                'fa-paw'],         // no free sheep/goat icon
    [/pig|hog|swine|piglet/,                   'fa-paw'],         // no free pig icon
    [/hamster|gerbil|mouse|rat|guinea|rodent/, 'fa-paw'],       // no rodent icon; paw fallback
  ].find(([re]) => re.test(s));

  return match ? match[1] : 'fa-paw';
},

normalisePatientText(p) {
  if (!p) return p;
  p.name      = this.toTitleCase(p.name);
  p.ownerName = this.toTitleCase(p.ownerName);
  p.breed     = this.toTitleCase(p.breed);
  if (p.species === 'other') p.speciesOther = this.toTitleCase(p.speciesOther);
  this.normalisePatientIdentity(p);
  return p;
},

// ===================== PET IDENTIFICATION & INSURANCE =====================
// Mirrors iOS `Logic/PetIdentifiers.swift` + `Logic/PetInsurance.swift` 1:1 — same kind ids, same
// labels, same microchip rules, same report lines — so a backup crosses web↔iOS unchanged.
//
// The MICROCHIP has a field of its own (`microchipNumber`) because every country uses one: legally
// required for dogs and cats in the UK and in every Australian state, and required in ISO
// 11784/11785 form for EU/UK travel. Everything else is a LIST (`identifiers`), because which number
// is mandatory is country-specific:
//   UK        Kennel Club registration, pet passport / travel paperwork
//   US        county or city pet licence, rabies tag, AKC registration
//   Australia council registration (NSW Pet Registry, Victorian council registration …)
//   Europe    EU pet passport (mandatory for movement between member states from 22 April 2026),
//             national registers such as France's I-CAD, and tattoos on older animals
// A column per jurisdiction ages badly and leaves an owner who moved country nowhere to put the old
// number, so region only ORDERS the picker — every kind stays selectable everywhere.
//
// INSURANCE is its own set of fields, not a kind in that list: an insurer, a policy number, a cover
// limit and the small print are four facts, and an owner needs all four at once at an emergency
// appointment.

// `id` is PERSISTED in every saved record — never rename one, add a kind instead.
PET_ID_KINDS: [
    { id: 'kennelClub',          label: 'Kennel Club registration', placeholder: 'e.g. AS01234567',                regions: ['uk'] },
    { id: 'petPassport',         label: 'Pet passport',             placeholder: 'Number on the front page',       regions: ['uk', 'europe'] },
    { id: 'councilRegistration', label: 'Council registration',     placeholder: 'e.g. NSW Pet Registry number',   regions: ['oceania'] },
    { id: 'petLicence',          label: 'Pet licence',              placeholder: 'County or city licence number',  regions: ['us'] },
    { id: 'rabiesTag',           label: 'Rabies tag',               placeholder: 'Number stamped on the tag',      regions: ['us'] },
    { id: 'nationalRegister',    label: 'National pet register',    placeholder: 'e.g. Petlog, I-CAD, Anibase',    regions: ['uk', 'europe', 'asia', 'row'] },
    { id: 'pedigree',            label: 'Pedigree registration',    placeholder: 'e.g. AKC, ANKC, FCI',            regions: ['us', 'oceania', 'europe', 'asia', 'row'] },
    { id: 'tattoo',              label: 'Tattoo',                   placeholder: 'Ear or inner-thigh tattoo',      regions: ['europe', 'row'] },
    { id: 'other',               label: 'Other',                    placeholder: 'Number or reference',            regions: [] }
],

petIdKind(id) {
    return this.PET_ID_KINDS.find(k => k.id === id) || null;
},

/// Picker order: numbers issued in `region` first, then the rest, with "Other" always last.
petIdKinds(region) {
    const local = this.PET_ID_KINDS.filter(k => k.regions.includes(region));
    const rest  = this.PET_ID_KINDS.filter(k => !k.regions.includes(region) && k.id !== 'other');
    const other = this.PET_ID_KINDS.filter(k => k.id === 'other');
    return [...local, ...rest, ...other];
},

/// What to print for a stored identifier. Falls back to the raw kind for a record written by a
/// newer build (a restored backup from a later version) so nothing is ever shown unlabelled.
petIdLabel(kind, customLabel) {
    const custom = (customLabel || '').trim();
    if (kind === 'other') return custom || 'Other';
    const known = this.petIdKind(kind);
    if (known) return known.label;
    return custom || kind || 'Other';
},

/// Region used only to ORDER the picker for the patient being edited.
petIdRegion(p) {
    return (p && p.parasiteRegion) || this._defaultRegion();
},

/// Strips the spaces, dashes and dots owners copy off a vet's printout and upper-cases the letters
/// used by older American chips. Never rejects anything: a number we don't recognise is still the
/// number in the pet.
normaliseMicrochip(raw) {
    return String(raw == null ? '' : raw).toUpperCase().replace(/[^0-9A-Z]/g, '');
},

/// 'empty' | 'iso' (15 digits, ISO 11784/11785) | 'legacy' (9–10 chars, pre-ISO US chips —
/// AVID/Trovan/Destron, still in plenty of older pets and perfectly valid) | 'unrecognised'.
microchipCheck(raw) {
    const s = this.normaliseMicrochip(raw);
    if (!s) return 'empty';
    if (s.length === 15 && /^[0-9]+$/.test(s)) return 'iso';
    if (s.length === 9 || s.length === 10) return 'legacy';
    return 'unrecognised';
},

/// Advisory only — NOTHING here ever blocks a save.
microchipNote(raw) {
    switch (this.microchipCheck(raw)) {
        case 'legacy':
            return "That's the shorter format used by some older American microchips.";
        case 'unrecognised':
            return 'Most microchips are 15 digits. Older American chips can be 9 or 10 characters — '
                 + "it's worth double-checking this one.";
        default:
            return '';
    }
},

/// Groups an ISO number as vets and databases print it (3-3-3-3-3) so 15 digits can be read back
/// aloud without losing your place. Anything else is returned unchanged.
formatMicrochip(raw) {
    const s = this.normaliseMicrochip(raw);
    if (s.length !== 15 || !/^[0-9]+$/.test(s)) return s;
    return s.match(/.{1,3}/g).join(' ');
},

/// Report lines: microchip first, then each number in the order the owner added it. Blank values
/// are dropped — an empty result means "print nothing", not "print a row of dashes".
patientIdLines(p) {
    if (!p) return [];
    const lines = [];
    const chip = this.formatMicrochip(p.microchipNumber);
    if (chip) lines.push({ label: 'Microchip', value: chip });
    (p.identifiers || []).forEach(row => {
        const value = (row && row.value ? String(row.value) : '').trim();
        if (!value) return;
        lines.push({ label: this.petIdLabel(row.kind, row.customLabel), value });
    });
    return lines;
},

/// Insurance lines, in the order a practice asks for them. Blank fields are dropped, so a
/// half-filled record prints only what's there and a pet with no policy prints no block at all.
patientInsuranceLines(p) {
    if (!p) return [];
    return [
        ['Insurer',       p.insuranceCompany],
        ['Policy number', p.insurancePolicyNumber],
        ['Cover limit',   p.insuranceLimit],
        ['Policy notes',  p.insuranceNotes]
    ].map(([label, v]) => ({ label, value: (v == null ? '' : String(v)).trim() }))
     .filter(l => l.value !== '');
},

/// The identification + insurance fields as a blank patient starts life with. Kept in one place so
/// the three `editingPatient` templates can't drift apart.
_blankIdentity() {
    return {
        microchipNumber: '',
        identifiers: [],
        insuranceCompany: '',
        insurancePolicyNumber: '',
        insuranceLimit: '',
        insuranceNotes: ''
    };
},

/// Backfills the fields on a record written before they existed (a legacy profile at load, or an
/// older/web backup at import). Without this, `identifiers` is undefined and the x-for throws.
_backfillPatientIdentity(p) {
    if (!p) return p;
    const blank = this._blankIdentity();
    Object.keys(blank).forEach(k => { if (p[k] == null) p[k] = blank[k]; });
    if (!Array.isArray(p.identifiers)) p.identifiers = [];
    return p;
},

/// Save-time tidy-up: normalise the chip, trim everything, and drop identifier rows the owner
/// added but never filled in (an empty row is not a record of anything, and it would otherwise
/// print as a labelled blank on every vet report).
normalisePatientIdentity(p) {
    if (!p) return p;
    this._backfillPatientIdentity(p);
    p.microchipNumber = this.normaliseMicrochip(p.microchipNumber);
    p.identifiers = (p.identifiers || [])
        .map(row => ({
            id:          row.id || this.generateId(),
            kind:        row.kind || 'other',
            customLabel: (row.customLabel || '').trim(),
            value:       (row.value || '').trim()
        }))
        .filter(row => row.value !== '');
    ['insuranceCompany', 'insurancePolicyNumber', 'insuranceLimit', 'insuranceNotes']
        .forEach(k => { p[k] = (p[k] || '').trim(); });
    return p;
},

addPatientIdentifier() {
    if (!Array.isArray(this.editingPatient.identifiers)) this.editingPatient.identifiers = [];
    const used = this.editingPatient.identifiers.map(r => r.kind);
    const next = this.petIdKinds(this.petIdRegion(this.editingPatient))
        .find(k => !used.includes(k.id));
    this.editingPatient.identifiers.push({
        id: this.generateId(), kind: next ? next.id : 'other', customLabel: '', value: ''
    });
},

removePatientIdentifier(index) {
    this.editingPatient.identifiers.splice(index, 1);
},

sanitiseCSV(val) {
    const s = String(val == null ? '' : val);
    // Prefix formula-injection characters to prevent spreadsheet execution
    return /^[=+\-@\t\r]/.test(s) ? `'${s}` : s;
},

// ── Storage health ──
storagePersisted: null,   // true / false / null = API unsupported
storageUsage: null,       // { usedMB, quotaMB }
async initStorageHealth() {
    try {
        if (navigator.storage && navigator.storage.persisted) {
            this.storagePersisted = await navigator.storage.persisted();
            if (this.storagePersisted === false && navigator.storage.persist) {
                this.storagePersisted = await navigator.storage.persist();
            }
        }
    } catch (e) { this.storagePersisted = null; }
    try {
        if (navigator.storage && navigator.storage.estimate) {
            const est = await navigator.storage.estimate();
            if (est && est.quota) {
                this.storageUsage = {
                    usedMB: (est.usage / 1048576).toFixed(1),
                    quotaMB: Math.round(est.quota / 1048576)
                };
            }
        }
    } catch (e) {}
},
// ── Backup staleness ──
lastBackupAt: null,        // ms epoch — reactive mirror of vch_lastBackupAt
backupSnoozedUntil: 0,
get daysSinceBackup() {
    return this.lastBackupAt ? Math.floor((Date.now() - this.lastBackupAt) / 86400000) : null;
},
get lastBackupLabel() {
    if (!this.lastBackupAt) return 'Never';
    const d = this.daysSinceBackup;
    return d === 0 ? 'Today' : d === 1 ? 'Yesterday' : `${d} days ago`;
},
backupNudgeVisible() {
    if (!this.appSettings.backupWarnDays) return false;        // 'Never remind me'
    if (this.patients.length === 0) return false;
    if (Date.now() < this.backupSnoozedUntil) return false;
    if (!this.lastBackupAt) return this.srrHistory.length >= 5; // don't nag brand-new users
    return this.daysSinceBackup > this.appSettings.backupWarnDays;
},
snoozeBackupNudge(days = 7) {
    this.backupSnoozedUntil = Date.now() + days * 86400000;
    try { localStorage.setItem('vch_backupNudgeSnooze', String(this.backupSnoozedUntil)); } catch (e) {}
},

// ── WebKit ITP (7-day storage purge) warning ──
itpWarnDismissedAt: 0,
isWebKitBrowserTab() {
    if (this.isStandalone) return false;                       // home-screen apps are exempt
    const ua = navigator.userAgent;
    const isIOS = /iPhone|iPad|iPod/.test(ua)
        || (/Macintosh/.test(ua) && 'ontouchend' in document); // iPadOS reports as Mac
    const isDesktopSafari = /Safari\//.test(ua)
        && !/Chrome|Chromium|CriOS|Edg|OPR|FxiOS|Android/.test(ua);
    return isIOS || isDesktopSafari;
},
itpWarningVisible() {
    if (!this.isWebKitBrowserTab() || this.patients.length === 0) return false;
    return (Date.now() - this.itpWarnDismissedAt) > 30 * 86400000;   // resurface monthly
},
dismissItpWarning() {
    this.itpWarnDismissedAt = Date.now();
    try { localStorage.setItem('vch_itpWarnSeen', String(this.itpWarnDismissedAt)); } catch (e) {}
},
        
init() {
 // 1. ROBUST DATA LOAD: per-key isolation — one corrupt key cannot
    //    blank the other nine datasets. Non-array payloads are also rejected.
    const loadKey = (key) => {
        try {
            const parsed = JSON.parse(localStorage.getItem(key));
            return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            console.error(`VCH: corrupt localStorage key "${key}" — loading empty.`, e);
            return [];
        }
    };
    this.patients         = loadKey('vch_patients');
    this.weightLog        = loadKey('vch_weightLog');
    this.srrHistory       = loadKey('vch_srrHistory');
    this.medLedger        = loadKey('vch_medLedger');
    this.suppLedger       = loadKey('vch_suppLedger');
    this.migrateLegacySupplements();   // one-time diet → supplement ledger migration
    this.diagnosisLog     = loadKey('vch_diagnosisLog');
    this.syncopeLog       = loadKey('vch_syncopeLog');
    this.coughLog         = loadKey('vch_coughLog');
    this.activityLog      = loadKey('vch_activityLog');
    this.vaccinationLog   = loadKey('vch_vaccinationLog');
    this.antiparasiticLog = loadKey('vch_antiparasiticLog');
    this.injectionLog = loadKey('vch_injectionLog');
    this.medDoseLog = loadKey('vch_medDoseLog') || [];
    this.bloodResults = loadKey('vch_bloodResults') || [];
    this.echoMeasurements = loadKey('vch_echoMeasurements') || [];
    this.procedureLog = loadKey('vch_procedureLog') || [];
    this.allergyLog = loadKey('vch_allergyLog') || [];
    this.appointmentLog = loadKey('vch_appointmentLog') || [];
    this.skinLog = loadKey('vch_skinLog') || [];
    this.lumpLog = loadKey('vch_lumpLog') || [];
    this.lumpMeasurements = loadKey('vch_lumpMeasurements') || [];
    this.orthoConditions = loadKey('vch_orthoConditions') || [];
    this.orthoLog = loadKey('vch_orthoLog') || [];

    // Backfill module flags for legacy / restored profiles
    this.patients.forEach(p => { p.modules = { ...this.defaultModules, ...(p.modules || {}) }; });
    // Same for identification + insurance (profiles saved before those fields existed) — otherwise
    // `identifiers` is undefined and the patient-form x-for throws on open.
    this.patients.forEach(p => this._backfillPatientIdentity(p));
    this._syncVetExportModules();
    
    this.initInstallNudge();
    this.initStorageHealth();
    this.migrateDiagnosisEqualisation();
    
    this.itpWarnDismissedAt = parseInt(localStorage.getItem('vch_itpWarnSeen'), 10) || 0;
    
    this.lastBackupAt = parseInt(localStorage.getItem('vch_lastBackupAt'), 10) || null;
    this.backupSnoozedUntil = parseInt(localStorage.getItem('vch_backupNudgeSnooze'), 10) || 0;
   
      const termsCurrent = localStorage.getItem('vch_terms_version') === this.termsVersion;

  if (this.patients.length === 0) {
    this.showOnboarding = true;      // new user — step 0 captures acceptance
  } else if (!termsCurrent) {
    this.showTermsGate = true;       // returning user, never accepted / terms changed
  } else {
    this.initDisclaimer();           // fully onboarded & current — only now nudge backups
  }

    // Set initial active patient safely
       if (this.patients.length > 0) {
        const lastId = localStorage.getItem('vch_lastPatientId');
        this.activePatientId = this.patients.some(p => p.id === lastId)
            ? lastId
            : this.patients[0].id;
    } else {
        this.startNewPatientOnboarding();
    }

    // Compact the hero for anyone with data OR anyone past their 2nd visit
    let vchVisits = 1;
    try {
        vchVisits = parseInt(localStorage.getItem('vch_visitCount') || '0', 10) + 1;
        localStorage.setItem('vch_visitCount', String(vchVisits));
    } catch (e) {}
    this.showHeroHeader = (this.paginatedHistory.length === 0 && vchVisits <= 2);
    
    // 2. ACCORDION WATCHERS: Forces Chart.js to redraw *only* after Alpine makes the canvas visible
    this.$watch('showAnalytics', (isVisible) => { 
        if (isVisible) this.$nextTick(() => { this.renderChart(); }); 
    });
    this.$watch('showMedGraph', (isVisible) => { 
        if (isVisible) this.$nextTick(() => { this.renderMedChart(); }); 
    });
    this.$watch('showWeightLogPanel', (isVisible) => {
    if (isVisible) this.$nextTick(() => { this.renderWeightChart(); });
});
    this.$watch('showMedLog', (isVisible) => {
        if (isVisible) this.$nextTick(() => { this.renderInjectionChart(); });
    });

    // Existing watchers
    this.$watch('activePatientId', () => { if (this.activePatientId) { try { localStorage.setItem('vch_lastPatientId', this.activePatientId); } catch (e) {} } this.currentPage = 1; this.renderChart(); this.renderMedChart(); this.renderWeightChart(); this.renderInjectionChart(); if (!this.visibleNavItems().some(i => i.id === this.activeView)) this.activeView = (this.visibleNavItems()[0] || {}).id || 'wellness'; this._syncVetExportModules(); });
    this.$watch('timeScale', () => { this.currentPage = 1; this.renderChart(); this.renderMedChart(); this.renderWeightChart(); });
    this.$watch('srrUseRelationalTime', () => { this.renderChart(); });
    this.$watch('showCoughOverlay', () => { this.renderChart(); });
    this.$watch('showActivityOverlay', () => { this.renderChart(); });
    this.$watch('showMedications', () => { this.renderChart(); });
    this.$watch('activityPlotType', () => { this.renderChart(); });
    this.$watch('showSyncopeOverlay', () => { this.renderChart(); });
    this.$watch('showDiagnosisOverlay', () => { this.renderChart(); });
    this.$watch('showCutoffLine', () => { this.renderChart(); });
    this.$watch('showMeanRef',    () => { this.renderChart(); });
    this.$watch('showRollingMean', () => this.renderChart());
    this.$watch('showManualSrr', (isVisible) => {
        if (isVisible) {
            // Pre-populate to current local datetime when panel opens
            const now = new Date();
            // toISOString() gives UTC — we need local time for datetime-local input
            const localIso = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
                .toISOString()
                .slice(0, 16);
            this.manualSrrDate = localIso;
        }
    });
    
    // Restore last-used view
        // Restore last-used view
    try {
        this.loadAppSettings();
        this.migrateActivityDistances();
        let savedView = localStorage.getItem('vch_activeView');
        if (savedView === 'data') savedView = 'more';          // legacy id migration
        if (this.appSettings.defaultLandingView !== 'remember')
            savedView = this.appSettings.defaultLandingView;
        // Pre-2026-08 ids ('count', 'meds', and the retired 'all') map onto the current sections.
        savedView = this.migrateViewId(savedView);
        if (savedView) this.activeView = savedView;
        // The saved view may be module-gated off for this pet — fall back to the first tab that
        // actually exists. This used to fall back to 'all', which no longer exists.
        if (!this.visibleNavItems().some(i => i.id === this.activeView))
            this.activeView = (this.visibleNavItems()[0] || {}).id || 'wellness';
        this._expandForView(this.activeView);
        this.moreSection = localStorage.getItem('vch_moreSection') || 'data';
    } catch (e) {}
    
    // Charts only size correctly once their canvas becomes visible (x-show toggles display:none)
    this.$watch('activeView', () => {
        this.$nextTick(() => { this.renderChart(); this.renderMedChart(); this.renderWeightChart(); });
    });
    
    // UX-1: Warn user if they try to navigate away with unsaved form state open
    this._unloadHandler = (e) => {
        const formIsOpen = this.showPatientManager || 
                           this.editingCommentId !== null || 
                           this.showManualSrr ||
                           this.isCounting;
        if (formIsOpen) {
            e.preventDefault();
            e.returnValue = ''; // Required for Chrome; text ignored by modern browsers
        }
    };
    window.addEventListener('beforeunload', this._unloadHandler);
    
    // Clean up if Alpine ever destroys this component
    this.$el.addEventListener('alpine:destroy', () => {
        window.removeEventListener('beforeunload', this._unloadHandler);
    });
    
    this.$nextTick(() => { if (this.patients.length > 0) { this.renderChart(); this.renderMedChart(); this.renderWeightChart();} });
},

// Initialization method for new patients
startNewPatientOnboarding() {
    this.editingPatient = {
        id: this.generateId(),
        name: '', ownerName: '', species: 'dog', breed: '', sex: '', dob: '', weight: '', weightUnit: this.appSettings.defaultWeightUnit, customSrrCutoff: this.appSettings.defaultSrrCutoff,
        ...this._blankIdentity(),
        modules: { ...this.defaultModules }
    };
    
    // Initialize your ACTUAL diagnosis tracker object for the onboarding wizard
    this.newDiagnosis = {
        id: this.generateId(),
        patientId: this.editingPatient.id,
        date: new Date().toISOString().split('T')[0],
        diagnosis: '',
        customDiagnosis: '',
        murmurGrade: 'N/A',
        acvimStage: 'N/A',
        concurrentDiagnoses: [],
        notes: 'Initial Baseline via Onboarding'
    };
    
    this.onboardingData = { concerns: ['wellness'], hasCardiacIssue: 'no' };
    this.isExistingPatientEdit = false;
    this.onboardingStep = this.patients.length === 0 ? 0 : 1; 
    this.showOnboarding = true;
},

// State for Backup Export / Import UI
        exportPatientId: 'all',
        showBackupImportModal: false,
        backupPreview: null,      // parsed backup file awaiting confirmation
        backupSelection: [],      // patient IDs ticked for import

// Is this step-2 concern ticked? Ids are from `ONBOARDING_CONCERNS`.
hasOnboardingConcern(id) {
    return (this.onboardingData.concerns || []).includes(id);
},

// Tick / untick one concern. NOTHING here is exclusive — 'wellness' used to clear the others,
// which forced an owner with a cardiac patient to choose between watching the heart and doing the
// routine care, when in reality they are doing both.
toggleOnboardingConcern(id) {
    const current = this.onboardingData.concerns || [];
    this.onboardingData.concerns = current.includes(id)
        ? current.filter(c => c !== id)
        : [...current, id];
    // Keep the legacy single-value mirror in step. Cardiac wins over seizure because it is the
    // one that opens the diagnosis panel and saves a baseline diagnosis.
    this.onboardingData.hasCardiacIssue =
        this.hasOnboardingConcern('cardiac') ? 'yes'
      : this.hasOnboardingConcern('seizure') ? 'seizure'
      : 'no';
},

// Mirrors `OnboardingRecommendations.modules(for:acvimStage:)` on iOS — change both together.
//
// The rule is a plain UNION: a module is recommended if ANY ticked concern recommends it, and
// nothing cancels anything else out. Under-recommending is a module the owner has to go and find
// later; over-recommending is one toggle on the very next screen.
generateModuleRecommendations() {
    // Baseline every pet gets, whatever brought the owner here.
    //
    // `medications` and `acvimStaging` joined that baseline in 2026-08. Both used to wait for a
    // cardiac tick, which read as "this app is for heart patients", and both are wrong to withhold:
    // the medication module is also where SUPPLEMENTS are recorded, and a joint supplement belongs
    // in a perfectly well pet's record; the diagnosis module takes ANY diagnosis, not only a staged
    // cardiac one. Both are cheap when unused — an empty ledger, not a wall of prompts.
    let recs = { srr: false, medications: true, coughLog: false, activityLog: false,
                 syncopeLog: false, acvimStaging: true, vaccinations: true, weightDiet: true,
                 antiparasitics: true, skinLog: false, lumps: false };

    const has = (id) => this.hasOnboardingConcern(id);
    // No tick at all still has to produce a usable pet, not an app with everything switched off.
    const none = (this.onboardingData.concerns || []).length === 0;

    if (none || has('wellness')) {
        recs.activityLog = true;
    }
    if (has('cardiac')) {
        recs.srr = true;
        // An escalating stage only escalates a CARDIAC patient — a leftover stage from a
        // half-filled form must not switch on cough for a skin case.
        if (['Stage B2', 'Stage C', 'Stage D'].includes(this.newDiagnosis.acvimStage)) {
            recs.coughLog = true;
            recs.activityLog = true;
        }
    }
    if (has('seizure')) {
        recs.syncopeLog = true;
        recs.activityLog = true;
        recs.srr = true; // useful for collapse context
    }
    // None of these implies a heart problem, so SRR stays off — switching on a breathing-rate
    // counter for a pet with an itchy ear is exactly the assumption this dropped.
    if (has('skin')) { recs.activityLog = true; recs.skinLog = true; }
    if (has('lump')) { recs.activityLog = true; recs.lumps = true; }
    // Activity is not optional for a lame pet: the lameness chart is plotted AGAINST how far they
    // walked, and with the activity log off half of that picture is simply missing.
    if (has('ortho')) { recs.activityLog = true; recs.ortho = true; }

    this.editingPatient.modules = { ...recs };
    this.onboardingStep = 3;
},

saveOnboardedPatient() {
    this.normalisePatientText(this.editingPatient);
    const { weight, ...patientData } = this.editingPatient;
    const patientIdToSave = patientData.id;

    this.patients.push({ ...patientData });
    this.activePatientId = patientIdToSave;

    const weightValue = parseFloat(weight);
    if (!isNaN(weightValue) && weightValue > 0) {
        this.logWeight(patientIdToSave, weightValue);
    }

    // A baseline diagnosis is only saved when the CARDIAC concern was actually ticked and a
    // diagnosis chosen — matches iOS's `concerns.contains(.cardiac), !diagnosis.isEmpty` guard.
    if (this.hasOnboardingConcern('cardiac') && this.newDiagnosis.diagnosis) {
        this.newDiagnosis.patientId = patientIdToSave; // ensure correct ID
        this.diagnosisLog.push({ ...this.newDiagnosis, timestamp: Date.now() });
        this.saveToStorage('vch_diagnosisLog', this.diagnosisLog);
    }

    this.saveToStorage('vch_patients', this.patients);
    this.showOnboarding = false;
    this.$nextTick(() => { this.renderChart(); this.renderMedChart(); });
},

        
        // --- PET MANAGEMENT ---
        // Determines if we are editing an existing record or creating a new one
get isEditingExistingPatient() {
            if (!this.editingPatient?.id) return false;
            return this.patients.some(p => p.id === this.editingPatient.id);
        },
        
        // Safely executes the existing merge logic from the UI
executeMerge() {
            if (!this.mergeTargetId) {
                return alert("Validation Error: Please select a Master Profile to merge into.");
            }
            if (this.mergeTargetId === this.editingPatient.id) {
                return alert("Logic Error: Cannot merge a patient into itself.");
            }
            
            // Call your existing robust merge function
            this.mergePatients(this.mergeTargetId, this.editingPatient.id);
            
            // Clean up UI state
            this.showMergeTools = false;
            this.mergeTargetId = '';
            this.closePatientManager();
        },

        // Cascading relational delete
deletePatient(patientId) {
            const profile = this.patients.find(p => p.id === patientId);
            if (!profile) return;

            const warning = `CRITICAL WARNING: You are about to permanently delete ${profile.name} and ALL associated clinical records.\n\n` +
                            `This will wipe their:\n` +
                            `- Respiratory Rate Logs\n` +
                            `- Medication History\n` +
                            `- Weight Logs\n` +
                            `- Diagnostic & Syncope Events\n\n` +
                            `This cannot be undone. Type 'DELETE' to confirm.`;

            const confirmation = prompt(warning);
            if (confirmation !== 'DELETE') {
                return alert("Deletion cancelled.");
            }

            // 1. Cascade delete across all relational arrays
            this.patients = this.patients.filter(p => p.id !== patientId);
            this.srrHistory = this.srrHistory.filter(s => s.patientId !== patientId);
            this.medLedger = this.medLedger.filter(m => m.patientId !== patientId);
            this.suppLedger = this.suppLedger.filter(s => s.patientId !== patientId);
            this.weightLog = this.weightLog.filter(w => w.patientId !== patientId);
            this.diagnosisLog = this.diagnosisLog.filter(d => d.patientId !== patientId);
            this.syncopeLog = this.syncopeLog.filter(s => s.patientId !== patientId);
            this.coughLog = this.coughLog.filter(s => s.patientId !== patientId);
            this.activityLog = this.activityLog.filter(s => s.patientId !== patientId);
            this.vaccinationLog = this.vaccinationLog.filter(v => v.patientId !== patientId);   
            this.antiparasiticLog = this.antiparasiticLog.filter(a => a.patientId !== patientId);
            this.injectionLog = this.injectionLog.filter(a => a.patientId !== patientId);
            // Dose ticks cascade like every other log. Left behind they linger in localStorage for
            // ever, and would re-attach to a stranger if an import ever re-issued this UUID.
            this.medDoseLog = (this.medDoseLog || []).filter(r => r.patientId !== patientId);
            this.bloodResults = (this.bloodResults || []).filter(b => b.patientId !== patientId);
            this.echoMeasurements = (this.echoMeasurements || []).filter(e => e.patientId !== patientId);
            this.procedureLog = (this.procedureLog || []).filter(p => p.patientId !== patientId);
            this.allergyLog = (this.allergyLog || []).filter(a => a.patientId !== patientId);
            this.appointmentLog = (this.appointmentLog || []).filter(a => a.patientId !== patientId);
            this.skinLog = (this.skinLog || []).filter(s => s.patientId !== patientId);
            // Both lump tables go together: a measurement whose lump has been deleted is a size
            // with nothing to be the size OF.
            this.lumpMeasurements = (this.lumpMeasurements || []).filter(m => m.patientId !== patientId);
            // Both orthopaedics tables go together — a day's score whose condition has gone is a
            // lameness grade with nothing to be a grade of.
            this.orthoLog = (this.orthoLog || []).filter(e => e.patientId !== patientId);
            this.orthoConditions = (this.orthoConditions || []).filter(c => c.patientId !== patientId);
            this.lumpLog = (this.lumpLog || []).filter(l => l.patientId !== patientId);

            // 2. Persist the flushed arrays to local storage
            this.saveToStorage('vch_patients', this.patients);
            this.saveToStorage('vch_srrHistory', this.srrHistory);
            this.saveToStorage('vch_medLedger', this.medLedger);
            this.saveToStorage('vch_suppLedger', this.suppLedger);
            this.saveToStorage('vch_weightLog', this.weightLog);
            this.saveToStorage('vch_diagnosisLog', this.diagnosisLog);
            this.saveToStorage('vch_syncopeLog', this.syncopeLog);
            this.saveToStorage('vch_coughLog', this.coughLog);
            this.saveToStorage('vch_activityLog', this.activityLog);
            this.saveToStorage('vch_vaccinationLog', this.vaccinationLog); 
            this.saveToStorage('vch_antiparasiticLog', this.antiparasiticLog);
            this.saveToStorage('vch_injectionLog', this.injectionLog);
            this.saveToStorage('vch_medDoseLog', this.medDoseLog);
            this.saveToStorage('vch_bloodResults', this.bloodResults);
            this.saveToStorage('vch_echoMeasurements', this.echoMeasurements);
            this.saveToStorage('vch_procedureLog', this.procedureLog);
            this.saveToStorage('vch_allergyLog', this.allergyLog);
            this.saveToStorage('vch_appointmentLog', this.appointmentLog);
            this.saveToStorage('vch_skinLog', this.skinLog);
            this.saveToStorage('vch_lumpLog', this.lumpLog);
            this.saveToStorage('vch_lumpMeasurements', this.lumpMeasurements);
            this.saveToStorage('vch_orthoConditions', this.orthoConditions);
            this.saveToStorage('vch_orthoLog', this.orthoLog);

            // 3. Reset application state
            if (this.patients.length > 0) {
                this.activePatientId = this.patients[0].id;
            } else {
                this.activePatientId = null;
                this.closePatientManager();
                this.$nextTick(() => this.startNewPatientOnboarding());
                return;   // nothing to plot; skip the chart re-render below
            }

            this.closePatientManager();
            
            // Force a re-render of the canvas layers to drop the deleted data
            this.$nextTick(() => { 
                this.renderChart(); 
                this.renderMedChart(); 
            });
        },
        
get activePatientProfile() {
            if (!this.activePatientId) return null;
            return this.patients.find(p => p.id === this.activePatientId) || null;
        },
        
get computedAgeText() {
    const p = this.activePatientProfile;
    if (!p || !p.dob) return 'Age Unknown';
    const dob = new Date(p.dob);
    if (isNaN(dob)) return 'Age Unknown';
    const now = new Date();
    let months = (now.getFullYear() - dob.getFullYear()) * 12 + (now.getMonth() - dob.getMonth());
    if (now.getDate() < dob.getDate()) months--;        // day-of-month not yet reached
    if (months < 0) months = 0;
    const years = Math.floor(months / 12);
    const rem = months % 12;
    if (years === 0) return `${months}m`;               // e.g. "6m"
    if (years < 2 || rem > 0) return `${years}y ${rem}m`; // e.g. "1y 4m"
    return `${years}y`;
},
        
get latestWeightText() {
    if (!this.activePatientId) return '';
    // Skip diet-only days (null weight) — show the most recent day with an actual weigh-in.
    const weights = this.sortedWeighedLog;
    if (weights.length === 0) return 'No weight logged';
    const unit = this.activePatientProfile?.weightUnit || 'kg';
    return `${weights[0].weightValue} ${unit}`;
},

get isCatalogueSpecies() {
  return this.currentSpecies === 'dog' || this.currentSpecies === 'cat';
},
        
savePatient() {
    
    const cleanName = (this.editingPatient.name || '').trim();
    if (!cleanName) return alert("Patient Name is clinically required.");
    
    this.normalisePatientText(this.editingPatient);
    const { weight, ...patientData } = this.editingPatient;
    const currentWeightValue = parseFloat(weight);
    const patientIdToSave = patientData.id;
    const newUnit = patientData.weightUnit || 'kg';

    // ── Unit-change conversion ──────────────────────────────────────────
    // Capture the previous unit BEFORE overwriting the patient record.
    const existingIndex = this.patients.findIndex(p => p.id === patientIdToSave);
    const previousUnit  = existingIndex > -1
        ? (this.patients[existingIndex].weightUnit || 'kg')
        : newUnit; // new patient — no prior entries, no conversion needed

    if (previousUnit !== newUnit) {
        // Confirm with the user — this is a destructive bulk conversion
        const entryCount = this.weightLog.filter(w => w.patientId === patientIdToSave).length;
        if (entryCount > 0) {
            const direction = previousUnit === 'kg'
                ? `kg → lbs (× 2.2046)`
                : `lbs → kg (÷ 2.2046)`;
            const ok = confirm(
                `You have changed the weight unit from ${previousUnit} to ${newUnit}.\n\n` +
                `${entryCount} existing weight log entr${entryCount !== 1 ? 'ies' : 'y'} will be converted (${direction}) to match.\n\n` +
                `Proceed?`
            );
            if (!ok) {
                // Roll the selector back — don't save
                return;
            }

            const factor = previousUnit === 'kg' ? 2.2046 : (1 / 2.2046);
            this.weightLog = this.weightLog.map(w => {
                if (w.patientId !== patientIdToSave) return w;
                if (w.weightValue == null || isNaN(parseFloat(w.weightValue))) return w; // diet-only day
                return {
                    ...w,
                    weightValue: Math.round(parseFloat(w.weightValue) * factor * 1000) / 1000
                };
            });
            this.saveToStorage('vch_weightLog', this.weightLog);
        }
    }

    // ── Persist patient record ──────────────────────────────────────────
    if (existingIndex > -1) {
        this.patients[existingIndex] = { ...patientData };
    } else {
        this.patients.push({ ...patientData });
    }

    // The weight field is always interpreted in the NEW unit — log as-is
    if (!isNaN(currentWeightValue) && currentWeightValue > 0) {
        this.logWeight(patientIdToSave, currentWeightValue);
    }

    this.saveToStorage('vch_patients', this.patients);
    this.activePatientId = patientIdToSave;
    this.closePatientManager();

    // Re-render both charts so axis label and mg/kg both reflect the new unit
    this.$nextTick(() => {
        this.renderWeightChart();
        this.renderMedChart();
    });
},
        
logWeight(patientId, value) {
    const today = new Date().toISOString().split('T')[0];
    const recent = this.weightLog.find(w => w.patientId === patientId && w.date.startsWith(today));
    
    if (recent) {
        recent.weightValue = value;
    } else {
        this.weightLog.push({ 
            id: this.generateId(), 
            patientId, 
            date: new Date().toISOString(), 
            weightValue: value,
            appetite: 'Normal', foodBrand: '', portionSize: '', supplements: '', notes: ''
        });
    }
    this.saveToStorage('vch_weightLog', this.weightLog);
},
        
        // --- DATA MERGING ALGORITHM ---
        
mergePatients(targetId, sourceId) {
            if (!confirm("CRITICAL: Merge all clinical logs from the source patient into the target patient? The source profile will be deleted. This cannot be undone.")) return;

            // Reassign IDs across all normalized arrays
            this.weightLog = this.weightLog.map(w => w.patientId === sourceId ? { ...w, patientId: targetId } : w);
            this.srrHistory = this.srrHistory.map(s => s.patientId === sourceId ? { ...s, patientId: targetId } : s);
            this.medLedger = this.medLedger.map(m => m.patientId === sourceId ? { ...m, patientId: targetId } : m);
            this.suppLedger = this.suppLedger.map(s => s.patientId === sourceId ? { ...s, patientId: targetId } : s);
            this.diagnosisLog = this.diagnosisLog.map(m => m.patientId === sourceId ? { ...m, patientId: targetId } : m);
            this.syncopeLog = this.syncopeLog.map(m => m.patientId === sourceId ? { ...m, patientId: targetId } : m);
            this.coughLog = this.coughLog.map(c => c.patientId === sourceId ? { ...c, patientId: targetId } : c);
            this.activityLog = this.activityLog.map(c => c.patientId === sourceId ? { ...c, patientId: targetId } : c);
            this.vaccinationLog = this.vaccinationLog.map(v => v.patientId === sourceId ? { ...v, patientId: targetId } : v);
            this.antiparasiticLog = this.antiparasiticLog.map(a => a.patientId === sourceId ? { ...a, patientId: targetId } : a);
            this.injectionLog = this.injectionLog.map(a => a.patientId === sourceId ? { ...a, patientId: targetId } : a);
            this.medDoseLog = (this.medDoseLog || []).map(r => r.patientId === sourceId ? { ...r, patientId: targetId } : r);
            this.bloodResults = (this.bloodResults || []).map(b => b.patientId === sourceId ? { ...b, patientId: targetId } : b);
            this.echoMeasurements = (this.echoMeasurements || []).map(e => e.patientId === sourceId ? { ...e, patientId: targetId } : e);
            this.procedureLog = (this.procedureLog || []).map(p => p.patientId === sourceId ? { ...p, patientId: targetId } : p);
            this.allergyLog = (this.allergyLog || []).map(a => a.patientId === sourceId ? { ...a, patientId: targetId } : a);
            this.appointmentLog = (this.appointmentLog || []).map(a => a.patientId === sourceId ? { ...a, patientId: targetId } : a);
            this.skinLog = (this.skinLog || []).map(s => s.patientId === sourceId ? { ...s, patientId: targetId } : s);
            // `lumpId` is deliberately untouched — the measurements follow their lump, and
            // rewriting that link is the one change capable of attributing one animal's
            // measurements to another animal's lump.
            this.lumpLog = (this.lumpLog || []).map(l => l.patientId === sourceId ? { ...l, patientId: targetId } : l);
            this.lumpMeasurements = (this.lumpMeasurements || []).map(m => m.patientId === sourceId ? { ...m, patientId: targetId } : m);
            // Same rule as the lump pair: `conditionId` is untouched, so each day's score stays
            // attached to the problem it describes.
            this.orthoConditions = (this.orthoConditions || []).map(c => c.patientId === sourceId ? { ...c, patientId: targetId } : c);
            this.orthoLog = (this.orthoLog || []).map(e => e.patientId === sourceId ? { ...e, patientId: targetId } : e);

            // Dedupe identical SRR readings created by merging an imported copy
            const seen = new Set();
            this.srrHistory = this.srrHistory.filter(s => {
                if (s.patientId !== targetId) return true;
                const sig = `${s.date}|${s.rate}`;
                if (seen.has(sig)) return false;
                seen.add(sig);
                return true;
            });

            // Same for dose ticks, which the reassignment above can genuinely duplicate: two profiles
            // for the same animal both ticked the 08:00 furosemide, and a tick is identified by
            // drugKey + slotDay + slotTime, not by its id. Left duplicated, `isDoseGiven` still reads
            // "given" but `toggleDose` splices only ONE row, so unticking would appear to do nothing.
            const seenDose = new Set();
            this.medDoseLog = this.medDoseLog.filter(r => {
                if (r.patientId !== targetId) return true;
                const sig = `${r.drugKey}|${r.slotDay}|${r.slotTime}`;
                if (seenDose.has(sig)) return false;
                seenDose.add(sig);
                return true;
            });

            // Delete Source Patient
            this.patients = this.patients.filter(p => p.id !== sourceId);

            // Save state
            this.saveToStorage('vch_weightLog', this.weightLog);
            this.saveToStorage('vch_srrHistory', this.srrHistory);
            this.saveToStorage('vch_medLedger', this.medLedger);
            this.saveToStorage('vch_suppLedger', this.suppLedger);
            this.saveToStorage('vch_diagnosisLog', this.diagnosisLog);
            this.saveToStorage('vch_syncopeLog', this.syncopeLog);
            this.saveToStorage('vch_coughLog', this.coughLog);
            this.saveToStorage('vch_activityLog', this.activityLog);
            this.saveToStorage('vch_vaccinationLog', this.vaccinationLog);
            this.saveToStorage('vch_patients', this.patients);
            this.saveToStorage('vch_antiparasiticLog', this.antiparasiticLog);
            this.saveToStorage('vch_injectionLog', this.injectionLog);
            this.saveToStorage('vch_medDoseLog', this.medDoseLog);
            this.saveToStorage('vch_bloodResults', this.bloodResults);
            this.saveToStorage('vch_echoMeasurements', this.echoMeasurements);
            this.saveToStorage('vch_procedureLog', this.procedureLog);
            this.saveToStorage('vch_allergyLog', this.allergyLog);
            this.saveToStorage('vch_appointmentLog', this.appointmentLog);
            this.saveToStorage('vch_skinLog', this.skinLog);
            this.saveToStorage('vch_lumpLog', this.lumpLog);
            this.saveToStorage('vch_lumpMeasurements', this.lumpMeasurements);
            this.saveToStorage('vch_orthoConditions', this.orthoConditions);
            this.saveToStorage('vch_orthoLog', this.orthoLog);

            this.activePatientId = targetId;
            alert("Patient records successfully merged.");
            this.$nextTick(() => { this.renderChart(); this.renderMedChart(); });
        },
        
        openPatientManager(isNew = false, patientId = null) {
    this.showPatientManager = true;
    if (isNew || !patientId) {
        this.editingPatient = {
            id: this.generateId(),
            name: '',
            ownerName: '',
            species: 'dog',
            breed: '',
            sex: 'MN',
            dob: '',
            weight: null,
            weightUnit: 'kg',
            customSrrCutoff: 30,
            ...this._blankIdentity(),
            modules: { ...this.defaultModules }
        };
    } else {
        const target = this.patients.find(p => p.id === patientId);
        const weights = this.weightLog
            .filter(w => w.patientId === patientId)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
        this.editingPatient = {
            ...this._blankIdentity(),   // defaults first, so a legacy profile gains the new keys…
            ...target,                  // …and a saved value always wins
            weight: null,
            // CRITICAL FIX: backfill modules for patients created before this feature
            modules: target.modules
                ? { ...this.defaultModules, ...target.modules }  // merge: defaults fill any new keys
                : { ...this.defaultModules }
        };
        // Editing a COPY of the array, so cancelling doesn't mutate the stored record.
        this.editingPatient.identifiers = (target.identifiers || []).map(r => ({ ...r }));
    }
},

closePatientManager() {
    this.showPatientManager = false;
},
        
openModuleSettings() {
    this.openPatientManager(false, this.activePatientId);
    this.showProgressionBanner = false;
    setTimeout(() => {
        const el = document.getElementById('edit-patient-modules-section');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 150);
},

get currentSpecies() {
    return this.activePatientProfile?.species || 'dog';
},
        
        get uniquePets() {
            return this.patients.map(p => p.name);
        },
        
get hasAnyDataForActivePet() {
    if (!this.srrHistory || !this.activePatientId) return false;
    return this.srrHistory.some(item => item.patientId === this.activePatientId);
},

        get timeScaleLabel() {
            const labels = {
                'thisWeek': 'This Week',
                'lastWeek': 'Last Week',
                'thisMonth': 'This Month',
                'lastMonth': 'Last Month',
                '60d': 'Last 60 Days',
                '90d': 'Last 90 Days',
                '180d': 'Last 6 Months',
                'all': 'Entire Dataset',
                'custom': 'Custom Range'
            };
            return labels[this.timeScale] || 'Filtered Range';
        },
        
        
              
get filteredStats() {
    const data = this.getFilteredReadings();
    if (data.length < 2) return null;
    return this.calculateStats(data);
},

// Descriptive statistics for the SELECTED period — the numbers behind the chart's reference
// lines, plus the cutoff split the histogram summarises. Needs 2+ readings, same as
// filteredStats (a single reading has no meaningful spread).
get srrPeriodStats() {
    const data = this.getFilteredReadings();
    if (data.length < 2) return null;

    const cutoff = parseInt(this.activePatientProfile?.customSrrCutoff) || 30;
    const rates  = data.map(r => r.rate);
    const s      = this.calculateStats(data);
    const below  = rates.filter(r => r < cutoff).length;

    // Latest 7-day rolling mean — same trailing window and 3-reading minimum as the chart overlay.
    const rows = data.map(r => ({ t: this.parseDateSafe(r.date).getTime(), rate: r.rate }));
    const lastT = rows[rows.length - 1].t;
    const win = rows.filter(r => r.t > lastT - 7 * 86400000 && r.t <= lastT).map(r => r.rate);
    const latestRolling = win.length >= 3 ? Math.round(this._meanOf(win) * 10) / 10 : null;

    return {
        n: rates.length,
        mean: s.mean,
        sd: s.sd,
        upperRef: s.upperRef,
        belowCutoff: below,
        atOrAbove: rates.length - below,
        belowPct: Math.round((below / rates.length) * 100),
        latestRolling,
        min: Math.min(...rates),
        max: Math.max(...rates),
        cutoff
    };
},
        
        // ===================== ANTIPARASITIC LOGIC =====================

_defaultRegion() {
    return 'uk';   // project home base; could later derive from locale
},

_defaultDistanceUnit() {
    try {
        const loc = navigator.language || 'en-GB';
        const region = ((new Intl.Locale(loc).region) || loc.split('-')[1] || '').toUpperCase();
        return (region === 'GB' || region === 'US') ? 'miles' : 'km';
    } catch (e) { return 'miles'; }
},

// metres per unit — canonical conversion table
_distanceMetres: { miles: 1609.344, feet: 0.3048, km: 1000, metres: 1 },

// short unit label for display
distanceLabel(unit) {
    return ({ miles: 'miles', feet: 'ft', km: 'km', metres: 'm' })[unit] || unit || '';
},

// convert a numeric value between units (returns Number to 3 dp, or null if not numeric)
convertDistance(value, fromUnit, toUnit) {
    const v = parseFloat(value);
    if (isNaN(v)) return null;
    const f = this._distanceMetres[fromUnit], t = this._distanceMetres[toUnit];
    if (!f || !t) return v;
    return Math.round((v * f / t) * 1000) / 1000;
},

// parse a legacy free-text distance ("2 miles", "500m", "3") into {value, unit}
_parseDistanceText(txt, fallbackUnit) {
    const s = String(txt == null ? '' : txt).trim();
    if (!s) return { value: '', unit: fallbackUnit };
    const num = parseFloat(s.replace(/[^0-9.]/g, ''));
    let unit = fallbackUnit;
    if (/mile/i.test(s))                 unit = 'miles';
    else if (/(km|kilomet)/i.test(s))    unit = 'km';
    else if (/(feet|foot|\bft\b)/i.test(s)) unit = 'feet';
    else if (/(metre|meter|\bm\b)/i.test(s)) unit = 'metres';
    return { value: isNaN(num) ? '' : num, unit };
},

// one-time migration of legacy text `distance` -> distanceValue + distanceUnit
migrateActivityDistances() {
    if (!Array.isArray(this.activityLog)) return;
    let changed = false;
    this.activityLog.forEach(a => {
        if (a.distanceValue === undefined) {
            const { value, unit } = this._parseDistanceText(a.distance, this.appSettings.distanceUnit);
            a.distanceValue = value;
            a.distanceUnit  = value === '' ? null : unit;
            delete a.distance;
            changed = true;
        }
    });
    if (changed) this.saveToStorage('vch_activityLog', this.activityLog);
},

// change the global unit AND back-convert every stored entry
setDistanceUnit(newUnit) {
    const oldUnit = this.appSettings.distanceUnit;
    if (!newUnit || newUnit === oldUnit) return;
    (this.activityLog || []).forEach(a => {
        if (a.distanceValue !== '' && a.distanceValue != null) {
            const conv = this.convertDistance(a.distanceValue, a.distanceUnit || oldUnit, newUnit);
            if (conv !== null) { a.distanceValue = conv; a.distanceUnit = newUnit; }
        } else {
            a.distanceUnit = newUnit;
        }
    });
    this.appSettings.distanceUnit = newUnit;
    this.saveAppSettings();
    this.saveToStorage('vch_activityLog', this.activityLog);
    if (typeof this.renderChart === 'function') this.$nextTick(() => this.renderChart());
},

get antiparasiticRegion() {
    return this.activePatientProfile?.parasiteRegion || this._defaultRegion();
},

// Effective priority list: explicit patient set, else region default,
// plus travel-triggered additions (e.g. heartworm for UK travellers).
getParasitePriorities() {
  const p = this.activePatientProfile;
  const region = p?.parasiteRegion || this._defaultRegion();
  const base = (p && Array.isArray(p.parasitePriorities) && p.parasitePriorities.length)
      ? p.parasitePriorities.slice()
      : (this.isCatalogueSpecies                              // ← only dog/cat get region seeds
            ? (PARASITE_REGION_DEFAULTS[region]?.priorities || []).slice()
            : []);
    if (this.isCatalogueSpecies && p?.parasiteTravel) {
      (PARASITE_REGION_DEFAULTS[region]?.travelAdds || []).forEach(id => {
        if (!base.includes(id)) base.push(id);
      });
    }
  return base;
},

// Grouped + region/species-filtered product list for the selector
get productOptions() {
  const region  = this.antiparasiticRegion;
  const species = this.currentSpecies;
  const groups  = { broad: [], ecto: [], endo: [], custom: [] };
  for (const prod of Object.values(this.antiparasiticFormulary)) {
    if (prod.group === 'custom') { groups.custom.push(prod); continue; }
    if (!prod.regions.includes(region)) continue;
    // dog/cat: filter to species. 'other': show every product (vet judges suitability).
    if (this.isCatalogueSpecies && prod.species !== 'both' && prod.species !== species) continue;
    (groups[prod.group] || groups.broad).push(prod);
  }
  return groups;
},

_getProductEntry(productId) {
    return this.antiparasiticFormulary[productId] || null;
},

_calcParasiticDue(dateStr, intervalDays) {
    if (!dateStr || !intervalDays) return '';
    const d = new Date(dateStr + 'T12:00:00');
    d.setDate(d.getDate() + Number(intervalDays));
    return d.toISOString().split('T')[0];
},

get effectiveParasiteTargets() {
  return [...PARASITE_TARGETS, ...(this.activePatientProfile?.customParasites || [])];
},

addCustomParasite() {
  const label = this.toTitleCase((this.newCustomParasite.label || '').trim());
  if (!label) return;
  const p = this.activePatientProfile; if (!p) return;
  if (!Array.isArray(p.customParasites)) p.customParasites = [];
  p.customParasites.push({
    id: 'custom_' + (crypto.randomUUID ? crypto.randomUUID() : Date.now()),
    label, category: this.newCustomParasite.category || 'other', custom: true
  });
  this.newCustomParasite.label = '';
  this.saveToStorage('vch_patients', this.patients);   // use whatever key savePatient() uses
},

removeCustomParasite(id) {
  const p = this.activePatientProfile;
  if (!p || !Array.isArray(p.customParasites)) return;
  p.customParasites = p.customParasites.filter(cp => cp.id !== id);
  if (Array.isArray(p.parasitePriorities))
    p.parasitePriorities = p.parasitePriorities.filter(x => x !== id);
  this.saveToStorage('vch_patients', this.patients);
},

onProductSelected(productId) {
    this.selectedProductEntry       = null;
    this.newAntiparasitic.productId = productId;
    this.newAntiparasitic.covers    = [];
    this.newAntiparasitic.partial   = [];

    if (!productId || productId === 'other') {
        this.newAntiparasitic.intervalDays  = 30;
        this.newAntiparasitic.intervalLabel = 'Monthly';
        this.newAntiparasitic.nextDueDate   = this._calcParasiticDue(this.newAntiparasitic.date, 30);
        return;
    }
    const entry = this._getProductEntry(productId);
    if (!entry) return;

    this.selectedProductEntry           = entry;
    this.newAntiparasitic.covers        = entry.covers.slice();
    this.newAntiparasitic.partial       = (entry.partial || []).slice();
    this.newAntiparasitic.intervalDays  = entry.intervalDays;
    this.newAntiparasitic.intervalLabel = entry.intervalLabel;
    this.newAntiparasitic.nextDueDate   = this._calcParasiticDue(this.newAntiparasitic.date, entry.intervalDays);
},

// Re-derive due date when the administered date changes
_refreshParasiticDue() {
    this.newAntiparasitic.nextDueDate =
        this._calcParasiticDue(this.newAntiparasitic.date, this.newAntiparasitic.intervalDays);
},

openAntiparasiticForm(logEntry = null) {
    this.selectedProductEntry = null;
    if (logEntry) {
        this.newAntiparasitic = {
            ...logEntry,
            customCovers: logEntry.productId === 'other' ? (logEntry.covers || []).slice() : [],
            covers:  (logEntry.covers  || []).slice(),
            partial: (logEntry.partial || []).slice()
        };
        this.editingAntiparasiticId = logEntry.id;
        if (logEntry.productId && logEntry.productId !== 'other') {
            this.selectedProductEntry = this._getProductEntry(logEntry.productId);
        }
    } else {
        this.newAntiparasitic = {
            date: new Date().toISOString().split('T')[0],
            productId: '', customName: '', customCovers: [],
            covers: [], partial: [], intervalDays: 30, intervalLabel: 'Monthly',
            nextDueDate: '', batchNumber: '', administeredBy: '', notes: ''
        };
        this.editingAntiparasiticId = null;
    }
    this.showAntiparasiticForm = true;
},

saveAntiparasitic() {
    if (!this.activePatientId) return alert('Select a patient first.');
    if (!this.newAntiparasitic.productId) return alert('Please select a product.');
    if (this.newAntiparasitic.productId === 'other' && !this.newAntiparasitic.customName.trim()) {
        return alert('Please name the custom product.');
    }

    const isCustom = this.newAntiparasitic.productId === 'other';
    const entryToSave = {
        ...this.newAntiparasitic,
        id:        this.editingAntiparasiticId || this.generateId(),
        patientId: this.activePatientId,
        covers:  isCustom ? (this.newAntiparasitic.customCovers || []) : this.newAntiparasitic.covers,
        partial: isCustom ? [] : this.newAntiparasitic.partial,
        productLabel: isCustom
            ? (this.newAntiparasitic.customName || 'Custom Product')
            : (this._getProductEntry(this.newAntiparasitic.productId)?.brand || this.newAntiparasitic.productId)
    };
    delete entryToSave.customCovers;

    if (this.editingAntiparasiticId) {
        const idx = this.antiparasiticLog.findIndex(a => a.id === this.editingAntiparasiticId);
        if (idx !== -1) this.antiparasiticLog[idx] = entryToSave;
    } else {
        this.antiparasiticLog.push(entryToSave);
    }
    this.saveToStorage('vch_antiparasiticLog', this.antiparasiticLog);
    this.showAntiparasiticForm = false;
    this.selectedProductEntry = null;
},

deleteAntiparasitic(id) {
    if (confirm('Delete this antiparasitic record?')) {
        this.antiparasiticLog = this.antiparasiticLog.filter(a => a.id !== id);
        this.saveToStorage('vch_antiparasiticLog', this.antiparasiticLog);
    }
},

sortedAntiparasiticLog() {
    if (!this.activePatientId) return [];
    return this.antiparasiticLog
        .filter(a => a.patientId === this.activePatientId)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
},

// Reuse the vaccine due-date colour engine — identical semantics
getParasiticStatus(nextDueDate) {
    return this.getVaccineStatus(nextDueDate);
},

// For each parasite, the most-recent IN-DATE product covering it.
// Returns { parasiteId: { product, level, dueStatus, entryId } | null }
activeParasiticCoverage() {
    const coverage = {};
    PARASITE_TARGETS.forEach(t => { coverage[t.id] = null; });

    for (const entry of this.sortedAntiparasiticLog()) {   // newest first
        const status = this.getParasiticStatus(entry.nextDueDate);
        if (!status || status.days < 0) continue;          // lapsed — skip
        const apply = (ids, level) => (ids || []).forEach(pid => {
            if (coverage[pid]) return;                     // most recent wins
            coverage[pid] = { product: entry.productLabel || entry.productId, level, dueStatus: status, entryId: entry.id };
        });
        apply(entry.covers, 'full');
        apply(entry.partial, 'partial');
    }
    return coverage;
},

// Diffs priorities against active coverage → one row per priority.
parasiticCoverageGaps() {
    const priorities = this.getParasitePriorities();
    const coverage   = this.activeParasiticCoverage();
    const logs       = this.sortedAntiparasiticLog();

    return priorities.map(pid => {
        const target = PARASITE_TARGETS.find(t => t.id === pid);
        const cov    = coverage[pid];
        const everCovered = logs.some(e =>
            (e.covers || []).includes(pid) || (e.partial || []).includes(pid));

        let state = 'gap';                                 // covered | partial | lapsed | gap
        if (cov && cov.level === 'full')         state = 'covered';
        else if (cov && cov.level === 'partial') state = 'partial';
        else if (everCovered)                    state = 'lapsed';

        return {
            id: pid,
            label: target?.label || pid,
            cardiac: !!target?.cardiac,
            state,
            product: cov?.product || null,
            dueStatus: cov?.dueStatus || null
        };
    });
},

// Actionable alert feed — cardiac-relevant gaps surfaced first.
parasiticAlerts() {
    return this.parasiticCoverageGaps()
        .filter(g => g.state !== 'covered')
        .map(g => ({
            id: g.id,
            label: g.label,
            cardiac: g.cardiac,
            state: g.state,
            message: g.state === 'lapsed'
                ? `${g.label} cover has lapsed — last product is overdue`
                : g.state === 'partial'
                    ? `${g.label} is only partially covered`
                    : `No active product covers ${g.label}`
        }))
        .sort((a, b) => (b.cardiac - a.cardiac));
},

// ---- Reusable priorities page (onboarding + edit + review) ----
openPrioritiesModal(context = 'edit') {
    this.prioritiesContext = context;
    const src = (context === 'review') ? this.activePatientProfile : this.editingPatient;
    const region = src?.parasiteRegion || this._defaultRegion();
    const explicit = Array.isArray(src?.parasitePriorities) && src.parasitePriorities.length;
    const catalogue = (src?.species === 'dog' || src?.species === 'cat');   // ← add

    this.prioritiesDraft = {
        region,
        travel: !!src?.parasiteTravel,
        priorities: explicit
            ? src.parasitePriorities.slice()
            : (catalogue ? (PARASITE_REGION_DEFAULTS[region]?.priorities || []).slice() : [])  // ← gate
    };
    this.showPrioritiesModal = true;
},

applyRegionDefaults(region) {
    this.prioritiesDraft.region = region;
    const catalogue = this.isCatalogueSpecies;   // or check editingPatient.species as above
    this.prioritiesDraft.priorities = catalogue
        ? (PARASITE_REGION_DEFAULTS[region]?.priorities || []).slice()
        : [];
},

togglePriority(parasiteId) {
    const arr = this.prioritiesDraft.priorities;
    const i = arr.indexOf(parasiteId);
    if (i === -1) arr.push(parasiteId); else arr.splice(i, 1);
},

// Effective priorities for the draft being edited — same merge logic as
// getParasitePriorities(), but reads live draft state so ticking "travels
// abroad" is reflected in the checklist immediately, before Save.
draftEffectivePriorities() {
    const draft = this.prioritiesDraft;
    const base = draft.priorities.slice();
    if (draft.travel) {
        (PARASITE_REGION_DEFAULTS[draft.region]?.travelAdds || []).forEach(id => {
            if (!base.includes(id)) base.push(id);
        });
    }
    return base;
},

// True when a priority is showing as covered only because "travels abroad"
// is ticked, not because it's explicitly selected below.
isPriorityForcedByTravel(parasiteId) {
    const draft = this.prioritiesDraft;
    return !!draft.travel
        && (PARASITE_REGION_DEFAULTS[draft.region]?.travelAdds || []).includes(parasiteId)
        && !draft.priorities.includes(parasiteId);
},

get prioritiesRegionNote() {
    return PARASITE_REGION_DEFAULTS[this.prioritiesDraft.region]?.note || '';
},

savePriorities() {
    const draft = this.prioritiesDraft;
    if (this.prioritiesContext === 'review') {
        const p = this.activePatientProfile;
        if (p) {
            p.parasiteRegion     = draft.region;
            p.parasiteTravel     = draft.travel;
            p.parasitePriorities = draft.priorities.slice();
            this.saveToStorage('vch_patients', this.patients);
        }
        this.showPrioritiesModal = false;
    } else {
        this.editingPatient.parasiteRegion     = draft.region;
        this.editingPatient.parasiteTravel     = draft.travel;
        this.editingPatient.parasitePriorities = draft.priorities.slice();
        this.showPrioritiesModal = false;
        // Reached from the onboarding wizard → finalise the new patient now.
        if (this.prioritiesContext === 'onboarding') this.saveOnboardedPatient();
    }
},

// ---- Recurring calendar reminders (RRULE) ----
_parasiticRrule(intervalDays) {
    const d = Number(intervalDays) || 30;
    if (d >= 360)                  return 'FREQ=YEARLY;INTERVAL=1';
    if (d % 30 === 0 && d <= 366)  return `FREQ=MONTHLY;INTERVAL=${Math.round(d / 30)}`;
    if (d % 7 === 0)               return `FREQ=WEEKLY;INTERVAL=${d / 7}`;
    return `FREQ=DAILY;INTERVAL=${d}`;
},

_buildParasiticVevent(entry, patientName) {
    const name  = entry.productLabel || entry.productId || 'Antiparasitic';
    const start = (entry.nextDueDate || '').replace(/-/g, '');
    if (!start) return [];

    const endDate = new Date(entry.nextDueDate);
    endDate.setDate(endDate.getDate() + 1);
    const end = endDate.getFullYear()
        + String(endDate.getMonth() + 1).padStart(2, '0')
        + String(endDate.getDate()).padStart(2, '0');

    const now = new Date();
    const dtstamp = now.getUTCFullYear()
        + String(now.getUTCMonth() + 1).padStart(2, '0')
        + String(now.getUTCDate()).padStart(2, '0') + 'T'
        + String(now.getUTCHours()).padStart(2, '0')
        + String(now.getUTCMinutes()).padStart(2, '0')
        + String(now.getUTCSeconds()).padStart(2, '0') + 'Z';

    const coversText = (entry.covers || [])
        .map(id => PARASITE_TARGETS.find(t => t.id === id)?.label || id)
        .join(', ');

    const descParts = [
        `Pet: ${patientName}`,
        `Product: ${name}`,
        `Schedule: ${entry.intervalLabel || 'recurring'}`,
        coversText ? `Covers: ${coversText}` : null,
        entry.batchNumber    ? `Batch: ${entry.batchNumber}`              : null,
        entry.administeredBy ? `Administered by: ${entry.administeredBy}` : null,
        '',
        'Recurring reminder generated by VetCardioHub — vetcardiohub.com'
    ].filter(v => v !== null).join('\\n');

    return [
        'BEGIN:VEVENT',
        `UID:${this.generateId()}@vetcardiohub.com`,
        `DTSTAMP:${dtstamp}`,
        `DTSTART;VALUE=DATE:${start}`,
        `DTEND;VALUE=DATE:${end}`,
        `RRULE:${this._parasiticRrule(entry.intervalDays)}`,
        `SUMMARY:${this._escapeIcs(`${patientName} – ${name} due`)}`,
        `DESCRIPTION:${this._escapeIcs(descParts)}`,
        'BEGIN:VALARM',
        'ACTION:DISPLAY',
        `DESCRIPTION:${this._escapeIcs(`Reminder: ${patientName}'s ${name} is due in 3 days`)}`,
        'TRIGGER:-P3D',
        'END:VALARM',
        'BEGIN:VALARM',
        'ACTION:DISPLAY',
        `DESCRIPTION:${this._escapeIcs(`${patientName}'s ${name} is due today`)}`,
        'TRIGGER:PT9H',
        'END:VALARM',
        'END:VEVENT'
    ];
},

addParasiticReminder(entry) {
    if (!entry.nextDueDate) return alert('No next due date set for this product.');
    const patientName = this.activePatientProfile?.name || 'Pet';
    const fileName = (entry.productLabel || entry.productId || 'Antiparasitic').replace(/\s+/g, '-');
    const lines = [
        'BEGIN:VCALENDAR', 'VERSION:2.0',
        'PRODID:-//VetCardioHub//Antiparasitic Reminder//EN',
        'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
        ...this._buildParasiticVevent(entry, patientName),
        'END:VCALENDAR'
    ];
    this._downloadIcs(this._buildIcsString(lines),
        `${patientName.replace(/\s+/g, '-')}-${fileName}-Recurring.ics`);
},

exportAllParasiticReminders() {
    if (!this.activePatientId) return;
    const patientName = this.activePatientProfile?.name || 'Pet';

    const byProduct = {};
    this.sortedAntiparasiticLog()
        .filter(e => e.nextDueDate)
        .forEach(e => {
            const key = e.productId === 'other' ? (e.productLabel || e.id) : e.productId;
            if (!byProduct[key]) byProduct[key] = e;   // most recent per product
        });

    const products = Object.values(byProduct);
    if (products.length === 0) return alert('No antiparasitic records with a due date found.');

    const eventBlocks = products.flatMap(e => this._buildParasiticVevent(e, patientName));
    const lines = [
        'BEGIN:VCALENDAR', 'VERSION:2.0',
        'PRODID:-//VetCardioHub//Antiparasitic Reminders//EN',
        'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
        ...eventBlocks,
        'END:VCALENDAR'
    ];
    this._downloadIcs(this._buildIcsString(lines),
        `${patientName.replace(/\s+/g, '-')}-All-Antiparasitic-Reminders.ics`);
},
// Horizontal coverage timeline — one row per priority parasite, each a set of
// covered intervals positioned as % across a fixed look-back window.
coverageTimeline() {
    const now   = new Date(); now.setHours(0, 0, 0, 0);
    const start = new Date(now); start.setDate(start.getDate() - 365);
    const end   = new Date(now); end.setDate(end.getDate() + 45);   // margin to show next-due edge
    const span  = end - start;
    const pct   = (d) => Math.max(0, Math.min(100, ((new Date(d) - start) / span) * 100));

    const coverage   = this.activeParasiticCoverage();
    const priorities = this.getParasitePriorities();
    const logs = this.antiparasiticLog
        .filter(a => a.patientId === this.activePatientId)
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    const rows = priorities.map(pid => {
        const target = PARASITE_TARGETS.find(t => t.id === pid);
        const segments = logs
            .filter(e => (e.covers || []).includes(pid) || (e.partial || []).includes(pid))
            .map(e => {
                const s = new Date(e.date);
                const f = e.nextDueDate
                    ? new Date(e.nextDueDate)
                    : new Date(new Date(e.date).getTime() + (e.intervalDays || 30) * 86400000);
                const left = pct(s);
                return {
                    left,
                    width: Math.max(1.2, pct(f) - left),
                    color: this.antiparasiticFormulary[e.productId]?.color || '#64748b',
                    partial: (e.partial || []).includes(pid) && !(e.covers || []).includes(pid),
                    label: `${e.productLabel || e.productId}: ${e.date} → ${e.nextDueDate || '—'}`
                };
            })
            .filter(seg => seg.left < 100 && (seg.left + seg.width) > 0);

        return { id: pid, short: target?.short || pid, cardiac: !!target?.cardiac, covered: !!coverage[pid], segments };
    });

    return {
        rows,
        todayPct: pct(now),
        startLabel: start.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' }),
        endLabel:   end.toLocaleDateString('en-GB',   { month: 'short', year: '2-digit' })
    };
},




      // --- VACCINATION LOGIC ---
      
      
      // Vaccine due-date status engine
getVaccineStatus(nextDueDate) {
    if (!nextDueDate) return null;
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const due = new Date(nextDueDate);
    if (isNaN(due.getTime())) return null;
    const days = Math.round((due - now) / 86400000);

    if (days < -60)  return { status: 'critical',  days, label: `Overdue by ${Math.abs(days)}d`,   color: '#7f1d1d', bg: '#fef2f2', border: '#fca5a5' };
    if (days < 0)    return { status: 'overdue',   days, label: `Overdue by ${Math.abs(days)}d`,   color: '#dc2626', bg: '#fef2f2', border: '#fecaca' };
    if (days === 0)  return { status: 'due-today', days, label: 'Due today!',                       color: '#b45309', bg: '#fffbeb', border: '#fde68a' };
    if (days <= 14)  return { status: 'due-soon',  days, label: `Due in ${days}d`,                  color: '#d97706', bg: '#fffbeb', border: '#fde68a' };
    if (days <= 42)  return { status: 'upcoming',  days, label: `Due in ${days}d`,                  color: '#0369a1', bg: '#f0f9ff', border: '#bae6fd' };
    return           { status: 'ok',               days, label: `Due ${due.toLocaleDateString('en-GB', {day:'numeric', month:'short', year:'numeric'})}`, color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0' };
},

// Surfaces the most-recent due date per vaccine type for the alerts panel
get vaccineAlerts() {
    if (!this.activePatientId) return [];
    const byKey = {};

    [...this.vaccinationLog]
        .filter(v => v.patientId === this.activePatientId)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .forEach(v => {
            // Main vaccine
            if (v.nextDueDate) {
                const key = v.vaccineId || v.type;
                if (!byKey[key]) {
                    byKey[key] = {
                        ...v,
                        displayLabel: v.type || v.vaccineId,
                        isAddon: false
                    };
                }
            }
            // Each addon's own due date
            (v.additionals || []).forEach(addon => {
                if (!addon.nextDueDate) return;
                const aKey = `addon_${addon.id}`;
                if (!byKey[aKey]) {
                    byKey[aKey] = {
                        ...v,
                        displayLabel: addon.label,
                        nextDueDate: addon.nextDueDate,
                        isAddon: true,
                        parentVaccineLabel: v.type
                    };
                }
            });
        });

    return Object.values(byKey)
        .map(v => ({ ...v, vaccineStatus: this.getVaccineStatus(v.nextDueDate) }))
        .filter(v => v.vaccineStatus && v.vaccineStatus.status !== 'ok')
        .sort((a, b) => new Date(a.nextDueDate) - new Date(b.nextDueDate));
},

get availableVaccineGroups() {
  // WSAVA catalogues are validated for dog & cat only.
  // For 'other', return empty — the "Other / Custom Vaccine" option remains.
  if (!this.isCatalogueSpecies) return { combis: [], nonCore: [], individual: [] };
  const catalogue = VACCINE_CATALOGUE[this.currentSpecies] || VACCINE_CATALOGUE.dog;
  return {
    combis:     catalogue.combis     || [],
    nonCore:    catalogue.nonCore    || [],
    individual: catalogue.individual || []
  };
},

get sortedVaccinationLog() {
    if (!this.activePatientId) return [];
    return this.vaccinationLog
        .filter(v => v.patientId === this.activePatientId)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
},

// Finds a catalogue entry by ID across all groups for the current species
_getCatalogueEntry(vaccineId) {
    const g = this.availableVaccineGroups;
    return [...g.combis, ...g.nonCore, ...g.individual].find(e => e.id === vaccineId) || null;
},

// Counts prior records where this vaccine/addon appears as main OR as an additional
_prevVaccineCount(vaccineId) {
    return this.vaccinationLog.filter(v =>
        v.patientId === this.activePatientId &&
        v.id !== this.editingVaccineId &&
        (v.vaccineId === vaccineId ||
         v.type      === vaccineId ||
         (v.additionals || []).some(a => a.id === vaccineId))
    ).length;
},

// Computes the WSAVA-suggested due date for any catalogue entry from a given date
_wsavaDueDate(entry, fromDateStr) {
    if (!entry || !fromDateStr) return '';
    const prevCount = this._prevVaccineCount(entry.id);
    const days      = prevCount >= 1 ? entry.subsequentDays : entry.firstBoosterDays;
    const d         = new Date(fromDateStr + 'T12:00:00');
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
},

// Called when the vaccine selector changes
onVaccineSelected(vaccineId) {
    this.selectedCatalogueEntry    = null;
    this.vaccineAddonList          = [];
    this.newVaccine.components     = [];
    this.newVaccine.isCombi        = false;
    this.newVaccine.vaccineId      = vaccineId;
    this.newVaccine.wsavaSuggestedDate = '';

    if (!vaccineId || vaccineId === 'Other') {
        this.newVaccine.type = vaccineId === 'Other' ? 'Other' : '';
        return;
    }

    const entry = this._getCatalogueEntry(vaccineId);
    if (!entry) return;

    this.selectedCatalogueEntry = entry;
    this.newVaccine.type        = entry.shortLabel || entry.id;
    this.newVaccine.isCombi     = !!(entry.components && entry.components.length);
    this.newVaccine.components  = entry.components || [];

    // Build addon list — not pre-ticked; vet confirms what was actually given
    this.vaccineAddonList = (entry.suggestedAddons || []).map(addon => ({
        id:               addon.id,
        label:            addon.label,
        note:             addon.note || '',
        selected:         false,
        nextDueDate:      this._wsavaDueDate(addon, this.newVaccine.date),
        firstBoosterDays: addon.firstBoosterDays,
        subsequentDays:   addon.subsequentDays
    }));

    this._refreshMainDueDate();
},

// Re-derives the main WSAVA date — called on vaccine change or date change
_refreshMainDueDate() {
    const entry = this.selectedCatalogueEntry;
    if (!entry) return;
    const suggested = this._wsavaDueDate(entry, this.newVaccine.date);
    this.newVaccine.wsavaSuggestedDate = suggested;
    if (this.newVaccine.intervalMode === 'wsava') {
        this.newVaccine.nextDueDate = suggested;
    }
},

// Re-derives all addon due dates when the administered date changes
_refreshAddonDueDates() {
    this.vaccineAddonList = this.vaccineAddonList.map(addon => ({
        ...addon,
        nextDueDate: this._wsavaDueDate(
            { id: addon.id, firstBoosterDays: addon.firstBoosterDays, subsequentDays: addon.subsequentDays },
            this.newVaccine.date
        )
    }));
},

openVaccineForm(logEntry = null) {
    this.selectedCatalogueEntry = null;
    this.vaccineAddonList       = [];

    if (logEntry) {
        this.newVaccine = {
            ...logEntry,
            intervalMode:       'custom',   // saved dates are authoritative
            wsavaSuggestedDate: '',
            components:  logEntry.components  || [],
            additionals: logEntry.additionals || []
        };
        this.editingVaccineId = logEntry.id;

        // Restore catalogue entry
        if (logEntry.vaccineId) {
            this.selectedCatalogueEntry = this._getCatalogueEntry(logEntry.vaccineId);
        }

        // Restore addon list — include saved additionals + any suggested-but-not-saved addons
        const entry = this.selectedCatalogueEntry;
        const savedAdditionals = logEntry.additionals || [];

        if (entry && entry.suggestedAddons) {
            this.vaccineAddonList = entry.suggestedAddons.map(addon => {
                const saved = savedAdditionals.find(a => a.id === addon.id);
                return {
                    id:               addon.id,
                    label:            addon.label,
                    note:             addon.note || '',
                    selected:         !!saved,
                    nextDueDate:      saved ? saved.nextDueDate : this._wsavaDueDate(addon, logEntry.date),
                    firstBoosterDays: addon.firstBoosterDays,
                    subsequentDays:   addon.subsequentDays
                };
            });
        }
    } else {
        const groups       = this.availableVaccineGroups;
        const defaultEntry = groups.combis[0] || null;

        this.newVaccine = {
            date:               new Date().toISOString().split('T')[0],
            vaccineId:          '',
            type:               '',
            customType:         '',
            isCombi:            false,
            components:         [],
            additionals:        [],
            nextDueDate:        '',
            wsavaSuggestedDate: '',
            intervalMode:       'wsava',
            batchNumber:        '',
            administeredBy:     '',
            notes:              ''
        };
        this.editingVaccineId = null;

        if (defaultEntry) {
            this.newVaccine.vaccineId = defaultEntry.id;
            this.onVaccineSelected(defaultEntry.id);
        }
    }

    this.showVaccinationForm = true; 
},

saveVaccine() {
    if (!this.activePatientId) return alert("Select a patient first.");
    if (!this.newVaccine.vaccineId) return alert("Please select a vaccine type.");
    if (this.newVaccine.vaccineId === 'Other' && !this.newVaccine.customType.trim()) {
        return alert("Please specify the custom vaccine name.");
    }

    // Compile selected addons into the additionals array
    const additionals = this.vaccineAddonList
        .filter(a => a.selected)
        .map(a => ({ id: a.id, label: a.label, nextDueDate: a.nextDueDate || '' }));

    const entryToSave = {
        ...this.newVaccine,
        id:          this.editingVaccineId || this.generateId(),
        patientId:   this.activePatientId,
        additionals,
        type: this.newVaccine.vaccineId === 'Other'
            ? (this.newVaccine.customType || 'Other')
            : (this.newVaccine.type || this.newVaccine.vaccineId)
    };

    // Strip transient form-only fields before persisting
    delete entryToSave.wsavaSuggestedDate;
    delete entryToSave.intervalMode;

    if (this.editingVaccineId) {
        const idx = this.vaccinationLog.findIndex(v => v.id === this.editingVaccineId);
        if (idx !== -1) this.vaccinationLog[idx] = entryToSave;
    } else {
        this.vaccinationLog.push(entryToSave);
    }

    this.saveToStorage('vch_vaccinationLog', this.vaccinationLog);
    this.showVaccinationForm = false;
    this.selectedCatalogueEntry = null;
    this.vaccineAddonList = [];
},

deleteVaccine(id) {
    if (confirm("Delete this vaccination record?")) {
        this.vaccinationLog = this.vaccinationLog.filter(v => v.id !== id);
        this.saveToStorage('vch_vaccinationLog', this.vaccinationLog);
    }
},  

// RFC 5545-compliant ICS line folder (75-octet limit, CRLF, space-continuation)
_foldIcsLine(line) {
    const CRLF = '\r\n';
    const enc = new TextEncoder();
    let result = '';
    let current = '';

    for (const char of line) {
        const candidate = current + char;
        if (enc.encode(candidate).length > 75) {
            result += current + CRLF + ' ';
            current = char;
        } else {
            current = candidate;
        }
    }
    return result + current;
},

_buildIcsString(lines) {
    return lines.map(l => this._foldIcsLine(l)).join('\r\n') + '\r\n';
},

_escapeIcs(text) {
    return String(text || '')
        .replace(/\\/g, '\\\\')
        .replace(/\r\n|[\r\n]/g, '\\n')
        .replace(/,/g, '\\,')
        .replace(/;/g, '\\;');
},

_buildVevent(vaccine, patientName) {
    const vaccineName = vaccine.type === 'Other'
        ? (vaccine.customType || 'Vaccination')
        : vaccine.type;

    const start = vaccine.nextDueDate.replace(/-/g, '');

    const endDate = new Date(vaccine.nextDueDate);
    endDate.setDate(endDate.getDate() + 1);
    const end = endDate.getFullYear()
        + String(endDate.getMonth() + 1).padStart(2, '0')
        + String(endDate.getDate()).padStart(2, '0');

    const now = new Date();
    const dtstamp = now.getUTCFullYear()
        + String(now.getUTCMonth() + 1).padStart(2, '0')
        + String(now.getUTCDate()).padStart(2, '0') + 'T'
        + String(now.getUTCHours()).padStart(2, '0')
        + String(now.getUTCMinutes()).padStart(2, '0')
        + String(now.getUTCSeconds()).padStart(2, '0') + 'Z';

    const descParts = [
        `Pet: ${patientName}`,
        `Vaccine: ${vaccineName}`,
        `Due: ${new Date(vaccine.nextDueDate).toLocaleDateString('en-GB')}`,
        vaccine.batchNumber    ? `Batch: ${vaccine.batchNumber}`                : null,
        vaccine.administeredBy ? `Administered by: ${vaccine.administeredBy}`   : null,
        vaccine.notes          ? `Notes: ${vaccine.notes}`                       : null,
        '',
        'Generated by VetCardioHub — vetcardiohub.com'
    ].filter(v => v !== null).join('\\n');

    return [
        'BEGIN:VEVENT',
        `UID:${this.generateId()}@vetcardiohub.com`,
        `DTSTAMP:${dtstamp}`,
        `DTSTART;VALUE=DATE:${start}`,
        `DTEND;VALUE=DATE:${end}`,
        `SUMMARY:${this._escapeIcs(`${patientName} – ${vaccineName} due`)}`,
        `DESCRIPTION:${this._escapeIcs(descParts)}`,
        // Alarm 1 — 7 days before
        'BEGIN:VALARM',
        'ACTION:DISPLAY',
        `DESCRIPTION:${this._escapeIcs(`Reminder: ${patientName}'s ${vaccineName} is due in 7 days`)}`,
        'TRIGGER:-P7D',
        'END:VALARM',
        // Alarm 2 — morning of the due date
        'BEGIN:VALARM',
        'ACTION:DISPLAY',
        `DESCRIPTION:${this._escapeIcs(`${patientName}'s ${vaccineName} is due today`)}`,
        'TRIGGER:PT9H',   // 9 AM on the event date (all-day events start at midnight)
        'END:VALARM',
        'END:VEVENT'
    ];
},

_downloadIcs(icsString, filename) {
    const blob = new Blob([icsString], { type: 'text/calendar;charset=utf-8' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
},

// Single vaccine reminder
addVaccineReminder(vaccine) {
    if (!vaccine.nextDueDate) return alert('No next due date has been set for this vaccine.');

    const patientName = this.activePatientProfile?.name || 'Pet';
    const vaccineName = vaccine.type === 'Other'
        ? (vaccine.customType || 'Vaccination')
        : vaccine.type;

    const lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//VetCardioHub//Vaccination Reminder//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        ...this._buildVevent(vaccine, patientName),
        'END:VCALENDAR'
    ];

    this._downloadIcs(
        this._buildIcsString(lines),
        `${patientName.replace(/\s+/g, '-')}-${vaccineName.replace(/\s+/g, '-')}-Reminder.ics`
    );
},

// Bulk export — all vaccines with a nextDueDate for this patient
exportAllVaccineReminders() {
    if (!this.activePatientId) return;
    const patientName = this.activePatientProfile?.name || 'Pet';

    const eligible = this.vaccinationLog
        .filter(v => v.patientId === this.activePatientId && v.nextDueDate);

    // Deduplicate: keep only the most recent record per vaccine type
    const byType = {};
    [...eligible]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .forEach(v => {
            const key = v.type === 'Other' ? (v.customType || 'Other') : v.type;
            if (!byType[key]) byType[key] = v;
        });

    const uniqueVaccines = Object.values(byType);
    if (uniqueVaccines.length === 0) {
        return alert('No vaccination records with a due date found for this patient.');
    }

    const eventBlocks = uniqueVaccines.flatMap(v => this._buildVevent(v, patientName));

    const lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//VetCardioHub//Vaccination Reminders//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        ...eventBlocks,
        'END:VCALENDAR'
    ];

    this._downloadIcs(
        this._buildIcsString(lines),
        `${patientName.replace(/\s+/g, '-')}-All-Vaccination-Reminders.ics`
    );
},




        // --- WEIGHT & DIET LOGIC ---
get sortedWeightLog() {
    if (!this.activePatientId) return [];
    return this.weightLog
        .filter(w => w.patientId === this.activePatientId)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
},

// Only the days that actually have a weigh-in (weight is optional — a diet-only day has
// weightValue === null). Weight trends/summaries must ignore diet-only days, never treat
// their missing weight as 0.
get sortedWeighedLog() {
    return this.sortedWeightLog.filter(w => w.weightValue != null && !isNaN(parseFloat(w.weightValue)));
},

openWeightForm(logEntry = null) {
    if (logEntry) {
        // Format ISO date to standard YYYY-MM-DD for the HTML input.
        this.newWeightEntry = { ...logEntry, date: logEntry.date.split('T')[0] };
        this.editingWeightId = logEntry.id;
    } else {
        this.newWeightEntry = {
            date: new Date().toISOString().split('T')[0],
            weightValue: '',
            bcs: '',
            appetite: 'Normal',
            foodBrand: '',
            portionSize: '',
            supplements: '',
            notes: ''
        };
        this.editingWeightId = null;
        // ONE RECORD PER DAY: if today already has an entry, load it so the user updates that
        // record (and can add diet to it) instead of blanking it out with a fresh form.
        this.loadWeightEntryForPickedDate();
    }
    this.showWeightForm = true;
},

// Called when the date field in the weight form changes: load that day's existing entry (edit
// it in place), or reset to a blank record for a day with no entry yet. Keeps the form in step
// with the one-record-per-day rule so changing the date never silently overwrites another day.
loadWeightEntryForPickedDate() {
    const dateStr = this.newWeightEntry.date;
    if (!dateStr || !this.activePatientId) return;
    const dayKey = dateStr.split('T')[0];
    const existing = this.weightLog.find(w =>
        w.patientId === this.activePatientId && w.date.split('T')[0] === dayKey);
    if (existing) {
        this.newWeightEntry = { ...existing, date: existing.date.split('T')[0] };
        this.editingWeightId = existing.id;
    } else {
        this.newWeightEntry = {
            date: dayKey, weightValue: '', bcs: '', appetite: 'Normal',
            foodBrand: '', portionSize: '', supplements: '', notes: ''
        };
        this.editingWeightId = null;
    }
},

saveWeightEntry() {
    if (!this.activePatientId) return alert("Select a patient first.");

    // Weight is OPTIONAL — a diet-only day (no weigh-in) is valid. A blank or non-positive
    // weight is stored as null (NOT 0, which would poison charts and mg/kg dosing).
    const parsed = parseFloat(this.newWeightEntry.weightValue);
    const val = (!isNaN(parsed) && parsed > 0) ? parsed : null;

    const bcsVal = parseInt(this.newWeightEntry.bcs, 10);
    const bcs = (Number.isInteger(bcsVal) && bcsVal >= 1 && bcsVal <= 9) ? bcsVal : null;
    const appetite = this.newWeightEntry.appetite || 'Normal';
    const foodBrand = (this.newWeightEntry.foodBrand || '').trim();
    const portionSize = (this.newWeightEntry.portionSize || '').trim();
    const notes = (this.newWeightEntry.notes || '').trim();

    // Need at least one meaningful field — a weight, a body condition, or some diet detail.
    if (val === null && bcs === null && appetite === 'Normal' && !foodBrand && !portionSize && !notes) {
        return alert("Enter a weight, or some diet detail (food, appetite, body condition or notes), to save.");
    }

    // Day-level date → UTC noon (the T12:00Z storage convention).
    const dateStr = this.newWeightEntry.date.includes('T')
        ? this.newWeightEntry.date
        : `${this.newWeightEntry.date}T12:00:00.000Z`;
    const dayKey = dateStr.split('T')[0];

    // ONE RECORD PER DAY: saving for a day that already has an entry UPDATES it rather than
    // adding a confusing duplicate (matches the iOS app). When editing, keep that entry's id.
    const existingOnDay = this.weightLog.find(w =>
        w.patientId === this.activePatientId &&
        w.id !== this.editingWeightId &&
        w.date.split('T')[0] === dayKey);
    const targetId = this.editingWeightId || (existingOnDay && existingOnDay.id) || this.generateId();

    const entryToSave = {
        ...this.newWeightEntry,
        id: targetId,
        patientId: this.activePatientId,
        weightValue: val,
        bcs, appetite, foodBrand, portionSize, notes,
        date: dateStr
    };

    const index = this.weightLog.findIndex(w => w.id === targetId);
    if (index !== -1) this.weightLog[index] = entryToSave;
    else this.weightLog.push(entryToSave);

    this.saveToStorage('vch_weightLog', this.weightLog);
    this.showWeightForm = false;

    // Force a chart re-render as historical mg/kg calculations may have changed
    this.$nextTick(() => { this.renderMedChart(); this.renderWeightChart(); });
},

deleteWeightEntry(id) {
    if (confirm("Delete this weight and diet record?")) {
        this.weightLog = this.weightLog.filter(w => w.id !== id);
        this.saveToStorage('vch_weightLog', this.weightLog);
        this.$nextTick(() => { this.renderMedChart(); this.renderWeightChart();});
    }
},


        
        
        
        // Getters dor diagnosis and syncope logic
        


sortedDiagnosisLog() {
            if (!this.activePatientId) return [];
            return this.diagnosisLog
                .filter(d => d.patientId === this.activePatientId)
                .sort((a, b) => new Date(b.date) - new Date(a.date));
        },

        sortedSyncopeLog() {
            if (!this.activePatientId) return [];
            return this.syncopeLog
                .filter(s => s.patientId === this.activePatientId)
                .sort((a, b) => {
                    const dateA = new Date(`${a.date}T${a.time || '00:00:00'}`);
                    const dateB = new Date(`${b.date}T${b.time || '00:00:00'}`);
                    return dateB - dateA;
                });
        },
        
        //Methods for syncope and Diagnosis data
saveCardiacDiagnosis() {
    if (!this.newDiagnosis.diagnosis) return alert("Primary Cardiac Diagnosis is required.");
    this.newDiagnosis.concurrentDiagnoses = [];   // <-- add: cardiac records hold no concurrent list
    this._saveDiagnosisLogEntry();
    this.showCardiacForm = false;
},

migrateDiagnosisEqualisation() {
    if (!Array.isArray(this.diagnosisLog)) return;
    const spawned = [];
    let changed = false;

    this.diagnosisLog.forEach(d => {
        const conditions = (d.concurrentDiagnoses || [])
            .map(s => (s || '').trim()).filter(Boolean);

        if (d.diagnosis === 'Concurrent Conditions Only') {
            // Multi-condition sentinel → keep first here, spawn the rest (copy date AND notes).
            if (conditions.length > 1) {
                d.concurrentDiagnoses = [conditions[0]];
                conditions.slice(1).forEach(c => spawned.push({
                    id: this.generateId(), patientId: d.patientId, date: d.date,
                    diagnosis: 'Concurrent Conditions Only',
                    customDiagnosis: '', murmurGrade: 'N/A', acvimStage: 'N/A',
                    concurrentDiagnoses: [c], notes: d.notes || '', timestamp: Date.now()
                }));
                changed = true;
            }
        } else if (conditions.length > 0) {
            // Cardiac record carrying a concurrent list → empty it, spawn one sentinel per
            // condition (copy date, NOT notes — notes belong to the cardiac diagnosis).
            d.concurrentDiagnoses = [];
            conditions.forEach(c => spawned.push({
                id: this.generateId(), patientId: d.patientId, date: d.date,
                diagnosis: 'Concurrent Conditions Only',
                customDiagnosis: '', murmurGrade: 'N/A', acvimStage: 'N/A',
                concurrentDiagnoses: [c], notes: '', timestamp: Date.now()
            }));
            changed = true;
        }
    });

    if (spawned.length) this.diagnosisLog.push(...spawned);
    if (changed) this.saveToStorage('vch_diagnosisLog', this.diagnosisLog);
},
        
// Human-facing name for a diagnosis row. Non-cardiac (sentinel) rows show their
// condition; cardiac "Other" rows show the free-text. Mirrors iOS ClinicalCSV.
diagDisplayName(d) {
    if (d.diagnosis === 'Concurrent Conditions Only') {
        const c = (d.concurrentDiagnoses || []).join(', ');
        return c || 'Non-cardiac diagnosis';
    }
    // "Other" resolves to the detail alone (a bare "Other" says nothing); a congenital defect KEEPS
    // its category because that is clinically informative — "Congenital Defect — Subaortic stenosis".
    // Before this, a congenital defect's detail was dropped from all three reports entirely.
    const detail = (d.customDiagnosis || '').trim();
    if (d.diagnosis === 'Other') return detail || 'Other';
    if (d.diagnosis === 'Congenital Defect' && detail) return `Congenital Defect — ${detail}`;
    return d.diagnosis || '—';
},

// A condition the owner has marked resolved (iOS schema V8 `resolvedDate`; BACKLOG §3j).
isDiagnosisResolved(d) { return !!(d && d.resolvedDate); },

saveConcurrentDiagnosis() {
    const lines = (this.newConcurrentDiagnosis || '')
        .split('\n').map(s => s.trim()).filter(Boolean);

    if (lines.length === 0 && !this.newDiagnosis.notes) {
        return alert("Please add at least one condition or a clinical note.");
    }

    // EDIT MODE: a sentinel record being edited stays a single record (first line wins).
    if (this.editingDiagnosisId) {
        this.newDiagnosis.diagnosis = 'Concurrent Conditions Only';
        this.newDiagnosis.concurrentDiagnoses = lines.slice(0, 1);
        this.newDiagnosis.murmurGrade = 'N/A';
        this.newDiagnosis.acvimStage  = 'N/A';
        this._saveDiagnosisLogEntry();
        this.showConcurrentForm = false;
        return;
    }

    // ADD MODE: push one record per line.
    (lines.length ? lines : ['']).forEach(line => {
        this.diagnosisLog.push({
            id: this.generateId(),
            patientId: this.activePatientId,
            date: this.newDiagnosis.date,
            diagnosis: 'Concurrent Conditions Only',
            customDiagnosis: '', murmurGrade: 'N/A', acvimStage: 'N/A',
            concurrentDiagnoses: line ? [line] : [],
            notes: this.newDiagnosis.notes || '',
            // The ADD path builds records inline rather than via _saveDiagnosisLogEntry, so the
            // resolved date has to be carried here too or it is silently dropped on new entries.
            resolvedDate: this.newDiagnosis.resolvedDate || null,
            timestamp: Date.now()
        });
    });
    this.saveToStorage('vch_diagnosisLog', this.diagnosisLog);
    this.showConcurrentForm = false;
},
        
_saveDiagnosisLogEntry() {
            const entryToSave = {
                id: this.editingDiagnosisId || this.generateId(),
                patientId: this.activePatientId, 
                date: this.newDiagnosis.date,
                diagnosis: this.newDiagnosis.diagnosis,
                customDiagnosis: this.newDiagnosis.customDiagnosis, 
                murmurGrade: this.newDiagnosis.murmurGrade,         
                acvimStage: this.newDiagnosis.acvimStage,
                concurrentDiagnoses: [...(this.newDiagnosis.concurrentDiagnoses || [])],
                notes: this.newDiagnosis.notes,
                // '' → null so "ongoing" is one value on the wire, matching iOS (absent/null).
                resolvedDate: this.newDiagnosis.resolvedDate || null,
                timestamp: Date.now()
            };

            if (this.editingDiagnosisId) {
                const index = this.diagnosisLog.findIndex(d => d.id === this.editingDiagnosisId);
                if (index !== -1) this.diagnosisLog[index] = entryToSave;
            } else {
                this.diagnosisLog.push(entryToSave);
            }

            this.saveToStorage('vch_diagnosisLog', this.diagnosisLog);
            this.checkProgressionTrigger(entryToSave.acvimStage);
        },
            

checkProgressionTrigger(newStage) {
    if (!this.activePatientProfile) return;
    const currentModules = this.activePatientProfile.modules || {};
    // The stored values are "Stage C"/"Stage D" (see the <select> options), so comparing the raw
    // value against ['C','D'] never matched and this banner has never fired for any web user.
    newStage = String(newStage || '').replace(/^Stage\s+/i, '');
    if (['C', 'D'].includes(newStage) &&
        (!currentModules.medications || !currentModules.coughLog || !currentModules.activityLog)) {
        this.showProgressionBanner = true;
    }
},

// --- DIAGNOSIS LOGIC ---

openCardiacForm(logEntry = null) {
            if (logEntry) {
                this.newDiagnosis = { ...logEntry, concurrentDiagnoses: [...(logEntry.concurrentDiagnoses || [])] };
                this.editingDiagnosisId = logEntry.id;
            } else {
                // Auto-load previous state for the ACTIVE patient
                const recent = this.currentClinicalStatus;
                this.newDiagnosis = {
                    id: null,
                    date: new Date().toISOString().split('T')[0],
                    diagnosis: recent ? recent.diagnosis : '', 
                    customDiagnosis: recent ? (recent.customDiagnosis || '') : '',
                    murmurGrade: recent ? (recent.murmurGrade || 'N/A') : 'N/A',
                    acvimStage: recent ? recent.acvimStage : 'N/A',
                    concurrentDiagnoses: [],
                    notes: '',
                    resolvedDate: ''      // a NEW record is never resolved — you are recording something current
                };
                this.editingDiagnosisId = null;
            }
            this.showCardiacForm = true;
            this.showConcurrentForm = false;
        },

openConcurrentForm(logEntry = null) {
    if (logEntry) {
        this.newDiagnosis = { ...logEntry, concurrentDiagnoses: [...(logEntry.concurrentDiagnoses || [])] };
        this.editingDiagnosisId = logEntry.id;
        // Rehydrate textarea from saved array
        this.newConcurrentDiagnosis = logEntry ? (logEntry.concurrentDiagnoses || [])[0] || '' : '';
    } else {
        const history = this.sortedDiagnosisLog();
        const recentConc = history.find(d => d.concurrentDiagnoses && d.concurrentDiagnoses.length > 0);
        this.newDiagnosis = {
            id: null,
            date: new Date().toISOString().split('T')[0],
            diagnosis: 'Concurrent Conditions Only',
            customDiagnosis: '',
            murmurGrade: 'N/A',
            acvimStage: 'N/A',
            concurrentDiagnoses: recentConc ? [...recentConc.concurrentDiagnoses] : [],
            notes: ''
        };
        this.editingDiagnosisId = null;
        // Pre-populate textarea with recent conditions so vet can amend, not retype
        this.newConcurrentDiagnosis = recentConc ? recentConc.concurrentDiagnoses.join('\n') : '';
    }
    this.showConcurrentForm = true;
    this.showCardiacForm = false;
},
        
openDiagnosisForm(logEntry = null) {
    if (logEntry) {
        this.newDiagnosis = { ...logEntry };
        this.newDiagnosis.concurrentDiagnoses = logEntry.concurrentDiagnoses ? [...logEntry.concurrentDiagnoses] : [];
        this.editingDiagnosisId = logEntry.id;
    } else {
        const recentEntry = this.diagnosisLog.length > 0 ? this.diagnosisLog[0] : null;
        
        this.newDiagnosis = {
            id: null,
            date: new Date().toISOString().split('T')[0],
            diagnosis: recentEntry ? recentEntry.diagnosis : '', 
            customDiagnosis: recentEntry ? (recentEntry.customDiagnosis || '') : '',
            murmurGrade: recentEntry ? (recentEntry.murmurGrade || 'N/A') : 'N/A',
            acvimStage: recentEntry ? recentEntry.acvimStage : 'N/A',
            concurrentDiagnoses: recentEntry && recentEntry.concurrentDiagnoses ? [...recentEntry.concurrentDiagnoses] : [],
            notes: ''
        };
        this.editingDiagnosisId = null;
    }
    this.newConcurrentDiagnosis = ''; 
    this.showDiagnosisForm = true;
},

get currentClinicalStatus() {
            if (!this.activePatientId) return null;
            const history = this.sortedDiagnosisLog();
            // Most recent primary cardiac diagnosis, ignoring concurrent-only logs AND anything
            // marked resolved — the banner/stage state what the pet has NOW.
            return history.find(d => d.diagnosis
                && d.diagnosis !== 'Concurrent Conditions Only'
                && !this.isDiagnosisResolved(d)) || null;
        },
        
get primaryCardiacDiagnosis() {
            return this.currentClinicalStatus?.diagnosis || '';
        },

// ============================================================================
// BLOOD TEST RESULTS  (parity with iOS Logic/BloodResults.swift + LabReportParser.swift)
// ============================================================================
// Nothing here interprets a result. Every judgement is "inside or outside the interval THIS report
// printed", and where no interval was printed the answer is "unknown" — never a guess.

bloodMarker(id) { return BLOOD_MARKERS.find(m => m.id === id) || null; },

bloodMarkerGroups() { return BLOOD_MARKER_GROUPS; },

bloodGroupOf(markerId) {
    const m = this.bloodMarker(markerId);
    return m ? m.group : 'Other';
},

// Human-facing name: the catalogue label, or the owner's own text for an "other" marker. Falls back
// to the raw id so an unknown id from a newer app version never renders as a blank row.
bloodDisplayName(r) {
    const m = this.bloodMarker(r.markerId);
    if (m) return m.label;
    const custom = (r.customName || '').trim();
    if (custom) return custom;
    return r.markerId === BLOOD_OTHER_ID ? 'Other marker' : (r.markerId || 'Marker');
},

// Lower-case, collapse whitespace, and drop a trailing bracket ONLY when it holds a unit.
// A bracket holding a QUALIFIER is kept so it fails to match: ionised calcium is not total calcium,
// and free T4 is not total T4 — mapping either onto the catalogue would silently corrupt a series.
bloodNormalise(raw) {
    let s = (raw || '').toLowerCase();
    const open = s.indexOf('('), close = s.lastIndexOf(')');
    if (open !== -1 && close > open) {
        const inner = s.slice(open + 1, close).trim();
        const knownUnits = new Set(BLOOD_MARKERS.flatMap(m => m.units).map(u => u.toLowerCase()).filter(Boolean).concat(['%', 'sg', 'ratio']));
        const unitLike = knownUnits.has(inner) || (inner.includes('/') && !inner.includes(' '));
        if (unitLike) s = s.slice(0, open);
    }
    return s.replace(/[:*]/g, ' ').split(/\s+/).filter(Boolean).join(' ');
},

// Exact / synonym match only — never fuzzy. A near-miss returning null (so the owner picks) is
// always safer than a confident wrong marker.
bloodMatchMarker(printedName) {
    const needle = this.bloodNormalise(printedName);
    if (!needle) return null;
    return BLOOD_MARKERS.find(m =>
        this.bloodNormalise(m.label) === needle ||
        (m.synonyms || []).some(sy => this.bloodNormalise(sy) === needle)) || null;
},

bloodMarkerSearch(query) {
    const needle = this.bloodNormalise(query);
    if (!needle) return BLOOD_MARKERS;
    return BLOOD_MARKERS.filter(m =>
        this.bloodNormalise(m.label).includes(needle) ||
        (m.synonyms || []).some(sy => this.bloodNormalise(sy).includes(needle)));
},

// Where a value sits relative to the lab's printed interval. A one-sided interval is honoured;
// no interval at all gives 'unknown'.
bloodStatus(r) {
    const v = Number(r.value);
    const lo = (r.refLow === '' || r.refLow === null || r.refLow === undefined) ? null : Number(r.refLow);
    const hi = (r.refHigh === '' || r.refHigh === null || r.refHigh === undefined) ? null : Number(r.refHigh);
    if (!isFinite(v)) return 'unknown';
    if (hi !== null && v > hi) return 'above';
    if (lo !== null && v < lo) return 'below';
    if (lo === null && hi === null) return 'unknown';
    return 'within';
},

bloodStatusLabel(status) {
    return { below: "Below the lab's range", above: "Above the lab's range",
             within: "Within the lab's range", unknown: 'No range given' }[status] || '';
},
bloodStatusShort(status) {
    return { below: 'Low', above: 'High', within: 'In range', unknown: '—' }[status] || '';
},
// Amber for outside the range, not red: outside a lab interval is a talking point for the vet,
// not an emergency, and the UI must not imply otherwise.
bloodStatusColour(status) {
    return { below: '#d97706', above: '#d97706', within: '#16a34a', unknown: '#94a3b8' }[status] || '#94a3b8';
},

// 0 = the low limit, 1 = the high limit, clamped to -0.5..1.5 so one wild result cannot blow up a
// bar. THIS is what lets markers in different units be compared: everything becomes "how far
// through its own lab range". Null unless both limits are known and the interval has width.
bloodPositionInRange(r) {
    const v = Number(r.value);
    const lo = (r.refLow === '' || r.refLow === null || r.refLow === undefined) ? null : Number(r.refLow);
    const hi = (r.refHigh === '' || r.refHigh === null || r.refHigh === undefined) ? null : Number(r.refHigh);
    if (!isFinite(v) || lo === null || hi === null || !(hi > lo)) return null;
    return Math.min(Math.max((v - lo) / (hi - lo), -0.5), 1.5);
},

// Percentage offsets for the little in-range bar (band occupies the middle half).
bloodBarLeft(r) {
    const pos = this.bloodPositionInRange(r);
    return pos === null ? null : Math.min(Math.max(((pos + 0.5) / 2) * 100, 0), 100);
},

bloodValueText(r) {
    const v = this.trimBloodNumber(r.value);
    return r.unit ? `${v} ${r.unit}` : v;
},

// The lab's interval as printed: "44–159 µmol/L", "< 14 µg/dL", "> 23 g/L", or '' when none.
bloodRefText(r) {
    const suffix = r.unit ? ` ${r.unit}` : '';
    const lo = (r.refLow === '' || r.refLow === null || r.refLow === undefined) ? null : Number(r.refLow);
    const hi = (r.refHigh === '' || r.refHigh === null || r.refHigh === undefined) ? null : Number(r.refHigh);
    if (lo !== null && hi !== null) return `${this.trimBloodNumber(lo)}–${this.trimBloodNumber(hi)}${suffix}`;
    if (hi !== null) return `< ${this.trimBloodNumber(hi)}${suffix}`;
    if (lo !== null) return `> ${this.trimBloodNumber(lo)}${suffix}`;
    return '';
},

trimBloodNumber(v) {
    const n = Number(v);
    if (!isFinite(n)) return '';
    return String(parseFloat(n.toFixed(3)));
},

// This patient's rows, newest sample first.
patientBloodResults() {
    return (this.bloodResults || [])
        .filter(b => b.patientId === this.activePatientId)
        .sort((a, b) => new Date(b.sampleDate) - new Date(a.sampleDate));
},

// Clinical display order: group order, then catalogue order, then name.
sortBloodForDisplay(rows) {
    const groupRank = Object.fromEntries(BLOOD_MARKER_GROUPS.map((g, i) => [g, i]));
    const markerRank = Object.fromEntries(BLOOD_MARKERS.map((m, i) => [m.id, i]));
    return [...rows].sort((a, b) => {
        const ga = groupRank[this.bloodGroupOf(a.markerId)] ?? 99;
        const gb = groupRank[this.bloodGroupOf(b.markerId)] ?? 99;
        if (ga !== gb) return ga - gb;
        const ma = markerRank[a.markerId] ?? 999;
        const mb = markerRank[b.markerId] ?? 999;
        if (ma !== mb) return ma - mb;
        return this.bloodDisplayName(a).localeCompare(this.bloodDisplayName(b));
    });
},

// Rows grouped back into the visits they came from (sampleDate + lab), newest first. Two labs on
// one day stay separate panels — their reference ranges differ.
bloodPanels() {
    const groups = {};
    this.patientBloodResults().forEach(r => {
        const key = `${r.sampleDate}|${r.labName || ''}`;
        (groups[key] = groups[key] || []).push(r);
    });
    return Object.entries(groups).map(([key, rows]) => ({
        key,
        sampleDate: rows[0].sampleDate,
        labName: rows[0].labName || '',
        rows: this.sortBloodForDisplay(rows),
        outOfRangeCount: rows.filter(r => ['above', 'below'].includes(this.bloodStatus(r))).length,
        lacksAnyRange: rows.every(r => this.bloodStatus(r) === 'unknown')
    })).sort((a, b) => new Date(b.sampleDate) - new Date(a.sampleDate) || a.labName.localeCompare(b.labName));
},

// One marker's history in ONE unit, oldest first. The unit of the most recent result wins and the
// others are declared, never silently plotted together: a creatinine history switching µmol/L to
// mg/dL (~88x) would otherwise show a cliff that looks like a clinical collapse.
bloodSeriesFor(markerId, customName = '') {
    const mine = this.patientBloodResults()
        .filter(r => r.markerId === markerId)
        .filter(r => markerId !== BLOOD_OTHER_ID || !customName ||
                     (r.customName || '').toLowerCase() === customName.toLowerCase())
        .sort((a, b) => new Date(a.sampleDate) - new Date(b.sampleDate));
    if (!mine.length) return null;
    const newest = mine[mine.length - 1];
    const unit = newest.unit || '';
    const points = mine.filter(r => (r.unit || '') === unit);
    const excludedUnits = [...new Set(mine.map(r => r.unit || '').filter(u => u !== unit))].sort();
    const rangeSigs = new Set(points.map(r => `${r.refLow ?? '-'}|${r.refHigh ?? '-'}`));
    return {
        markerId, unit, points, excludedUnits,
        displayName: this.bloodDisplayName(customName ? { markerId, customName } : newest),
        referenceRangeVaries: rangeSigs.size > 1,
        latest: points[points.length - 1] || null,
        previous: points.length >= 2 ? points[points.length - 2] : null
    };
},

// Every marker this pet has ever had measured, in clinical order — the screen's backbone.
allBloodSeries() {
    const seen = new Set();
    const out = [];
    this.sortBloodForDisplay(this.patientBloodResults()).forEach(r => {
        const custom = r.markerId === BLOOD_OTHER_ID ? (r.customName || '') : '';
        const key = `${r.markerId}|${custom.toLowerCase()}`;
        if (seen.has(key)) return;
        seen.add(key);
        const s = this.bloodSeriesFor(r.markerId, custom);
        if (s) out.push(s);
    });
    return out;
},

// Plain arithmetic between consecutive results. Direction only — no clinical reading of it, and
// deliberately no better/worse, since for different markers either direction can be either.
bloodChangeVsPrevious(series) {
    if (!series || !series.latest || !series.previous) return null;
    const delta = Number(series.latest.value) - Number(series.previous.value);
    const days = Math.abs(Math.round(
        (new Date(series.latest.sampleDate) - new Date(series.previous.sampleDate)) / 86400000));
    const span = days === 1 ? '1 day' : `${days} days`;
    if (delta === 0) return { delta, days, summary: `unchanged over ${span}` };
    const sign = delta > 0 ? '+' : '−';
    const unitSuffix = series.unit ? ` ${series.unit}` : '';
    return { delta, days, summary: `${sign}${this.trimBloodNumber(Math.abs(delta))}${unitSuffix} in ${span}` };
},

// --- Form ---

openBloodForm(existing = null) {
    const lastPanel = this.bloodPanels()[0];
    if (existing) {
        this.newBloodResult = { ...existing };
        this.editingBloodId = existing.id;
    } else {
        this.newBloodResult = {
            id: null,
            sampleDate: lastPanel ? String(lastPanel.sampleDate).split('T')[0]
                                  : new Date().toISOString().split('T')[0],
            markerId: '', customName: '', value: '', unit: '', refLow: '', refHigh: '',
            labName: lastPanel ? lastPanel.labName : '', notes: ''
        };
        this.editingBloodId = null;
    }
    this.showBloodForm = true;
},

// On picking a marker: carry the unit + range + lab from that marker's last result if there is one
// (a recheck is nearly always the same lab and range), else the catalogue's first unit and typical
// range as an OVERWRITABLE prefill. Always applied on an explicit pick — an earlier iOS build
// guarded this and ended up keeping the previous marker's unit.
onBloodMarkerChange() {
    const chosen = this.newBloodResult.markerId;
    const previous = this.patientBloodResults().filter(r => r.markerId === chosen)[0];
    if (previous) {
        this.newBloodResult.unit = previous.unit || '';
        this.newBloodResult.refLow = previous.refLow ?? '';
        this.newBloodResult.refHigh = previous.refHigh ?? '';
        if (!this.newBloodResult.labName) this.newBloodResult.labName = previous.labName || '';
        return;
    }
    const m = this.bloodMarker(chosen);
    if (!m) { this.newBloodResult.unit = ''; this.newBloodResult.refLow = ''; this.newBloodResult.refHigh = ''; return; }
    this.newBloodResult.unit = m.units[0] || '';
    this.newBloodResult.refLow = m.typicalRange && m.typicalRange[0] !== null ? m.typicalRange[0] : '';
    this.newBloodResult.refHigh = m.typicalRange && m.typicalRange[1] !== null ? m.typicalRange[1] : '';
},

canSaveBloodResult() {
    const r = this.newBloodResult;
    if (!r.markerId || r.value === '' || !isFinite(Number(r.value))) return false;
    if (r.markerId === BLOOD_OTHER_ID && !(r.customName || '').trim()) return false;
    const lo = r.refLow === '' ? null : Number(r.refLow);
    const hi = r.refHigh === '' ? null : Number(r.refHigh);
    if (lo !== null && hi !== null && lo > hi) return false;   // a reversed range inverts every judgement
    return true;
},

saveBloodResult() {
    if (!this.canSaveBloodResult()) return alert('Enter a marker and a numeric result.');
    const r = this.newBloodResult;
    const entry = {
        id: this.editingBloodId || this.generateId(),
        patientId: this.activePatientId,
        sampleDate: r.sampleDate,
        markerId: r.markerId,
        customName: r.markerId === BLOOD_OTHER_ID ? (r.customName || '').trim() : '',
        value: Number(r.value),
        unit: (r.unit || '').trim(),
        refLow: r.refLow === '' ? null : Number(r.refLow),
        refHigh: r.refHigh === '' ? null : Number(r.refHigh),
        labName: (r.labName || '').trim(),
        notes: r.notes || ''
    };
    if (this.editingBloodId) {
        this.bloodResults = this.bloodResults.map(b => b.id === this.editingBloodId ? entry : b);
    } else {
        this.bloodResults.push(entry);
    }
    this.saveToStorage('vch_bloodResults', this.bloodResults);
    this.showBloodForm = false;
    this.editingBloodId = null;
},

deleteBloodResult(id) {
    if (!confirm('Delete this blood result?')) return;
    this.bloodResults = this.bloodResults.filter(b => b.id !== id);
    this.saveToStorage('vch_bloodResults', this.bloodResults);
},

// ============================================================================
// ECHO MEASUREMENTS  (parity with iOS EchoCalc.swift / EchoStudiesView.swift)
// ============================================================================
// Nothing here diagnoses. The bands DESCRIBE a value against published criteria and the copy says
// so; staging and treatment remain the vet's.

echoMeasure(id) { return ECHO_MEASURES.find(m => m.id === id) || null; },

// Fragments marking a name as the report's OWN DERIVED INDEX rather than a raw measurement.
// The safety rule that matters most here: a real echo report prints its normalised values right
// beside the measurements they came from ("LVIDd 38.19 mm" / "LVDDN 2D 1.822", "LVEDV MOD A4C 47 ml"
// / "LVEDV RPLA/BW 3.790"). Strip qualifiers carelessly and "LVEDV RPLA/BW" collapses to "lvedv",
// filing an index of 3.79 as a 3.79 mL volume — which the app would then scale AGAIN.
echoDerivedNameMarkers: ['/bw', 'cornell', 'lvddn', 'lvdsn', 'lviddn', 'lvidsn', 'ladn', 'nla', '-n', 'index', '/kg'],
// Method qualifiers describing HOW a measurement was taken — no clinical meaning here, and they
// differ between machines, so they are dropped before matching: "LVEDV MOD A4C" is still an LVEDV.
echoMethodQualifiers: ['2d', '3d', 'mod', 'a4c', 'a2c', 'rpla', 'lax', 'sax', 'mmode', 'm-mode',
                       'biplane', 'simpson', 'teich', 'teichholz', 'avg', 'mean'],

echoNormaliseName(raw) {
    const base = this.bloodNormalise(raw);
    if (this.echoDerivedNameMarkers.some(k => base.includes(k))) return base;
    const kept = base.split(' ').filter(t => !this.echoMethodQualifiers.includes(t));
    return kept.length ? kept.join(' ') : base;
},

// Exact / synonym match only, never fuzzy — a near-miss returning null is safer than a wrong measure.
echoMatchMeasure(printedName) {
    const needle = this.echoNormaliseName(printedName);
    if (!needle) return null;
    return ECHO_MEASURES.find(m =>
        this.echoNormaliseName(m.label) === needle ||
        this.echoNormaliseName(m.short) === needle ||
        (m.synonyms || []).some(sy => this.echoNormaliseName(sy) === needle)) || null;
},

// ── SURGERIES, DENTALS & PROCEDURES ───────────────────────────────────────────────────────────
// Mirrors iOS `ProcedureLogic.swift` + `DentalChart.swift`. Every consumer — the on-screen list,
// the CSV and the vet report — formats a procedure through THESE helpers, so a dental cannot read
// one way on screen and another way in the report a vet acts on.

_usesDogChart(species) {
    return String(species || '').trim().toLowerCase() !== 'cat';
},

// Type + ordinal for a Triadan position, on the fixed rule "canine = 04, first molar = 09".
_toothAnatomy(position) {
    if (position <= 3) return { type: 'incisor', ordinal: position };
    if (position === 4) return { type: 'canine', ordinal: null };
    if (position <= 8) return { type: 'premolar', ordinal: position - 4 };
    return { type: 'molar', ordinal: position - 8 };
},

_ordinalWord(n) {
    return n === 1 ? '1st' : n === 2 ? '2nd' : n === 3 ? '3rd' : `${n}th`;
},

// Every tooth for a species, in chart order. `deciduous` swaps to the 5–8 quadrants.
dentalChartTeeth(species, deciduous = false) {
    const dog = this._usesDogChart(species);
    const key = deciduous ? (dog ? 'dogDeciduous' : 'catDeciduous') : (dog ? 'dog' : 'cat');
    const table = DENTAL_POSITIONS[key];
    const out = [];
    DENTAL_QUADRANTS.forEach(q => {
        const digit = deciduous ? q.deciduousDigit : q.digit;
        (q.upper ? table.upper : table.lower).forEach(position => {
            const a = this._toothAnatomy(position);
            // The carnassials — upper PM4 and lower M1 — are the extractions that most change how a
            // mouth works, and the one bit of dental anatomy owners have usually heard of.
            const carnassial = !deciduous && (q.upper ? position === 8 : position === 9);
            out.push({
                triadan: `${digit}${String(position).padStart(2, '0')}`,
                quadrant: q.id, quadrantLabel: q.label,
                type: a.type, ordinal: a.ordinal,
                isCarnassial: carnassial, isDeciduous: deciduous
            });
        });
    });
    return out;
},

dentalChartQuadrants() { return DENTAL_QUADRANTS; },

// Teeth of one quadrant, for the picker grid.
dentalChartQuadrantTeeth(species, quadrantId, deciduous = false) {
    return this.dentalChartTeeth(species, deciduous).filter(t => t.quadrant === quadrantId);
},

_allTeeth(species) {
    return this.dentalChartTeeth(species, false).concat(this.dentalChartTeeth(species, true));
},

// "Upper right canine (104)" · "Lower left 1st molar — carnassial (309)". A code the species does
// not have falls back to the bare number rather than borrowing another species' name for it.
toothLabel(triadan, species) {
    const t = this._allTeeth(species || this.activePatient?.species).find(x => x.triadan === triadan);
    if (!t) return triadan;
    let name = `${t.quadrantLabel} ${t.ordinal ? this._ordinalWord(t.ordinal) + ' ' : ''}${t.type}`;
    if (t.isDeciduous) name += ' (baby)';
    if (t.isCarnassial) name += ' — carnassial';
    return `${name} (${t.triadan})`;
},

// Chart order for stored codes, so a report never lists 409 before 104. Unknown codes sort last.
sortTeeth(codes, species) {
    const order = {};
    this._allTeeth(species || this.activePatient?.species).forEach((t, i) => { order[t.triadan] = i; });
    return [...codes].sort((a, b) => {
        const ia = order[a] ?? Number.MAX_SAFE_INTEGER, ib = order[b] ?? Number.MAX_SAFE_INTEGER;
        return ia === ib ? String(a).localeCompare(String(b)) : ia - ib;
    });
},

// --- Filtering & ordering (status-driven, NEVER date-driven) ---

patientProcedures() {
    return (this.procedureLog || []).filter(p => p.patientId === this.activePatientId);
},

// Procedures that have happened, newest first.
completedProcedures() {
    return this.patientProcedures()
        .filter(p => p.status !== 'scheduled')
        .sort((a, b) => new Date(b.date) - new Date(a.date) || String(a.id).localeCompare(String(b.id)));
},

// Booked procedures, soonest first. A booking whose date has slipped past is STILL a booking.
scheduledProcedures() {
    return this.patientProcedures()
        .filter(p => p.status === 'scheduled')
        .sort((a, b) => new Date(a.date) - new Date(b.date) || String(a.id).localeCompare(String(b.id)));
},

// Bookings whose day has gone. These get ASKED about — "did it go ahead?" — never assumed either way.
procedureNeedsOutcome(p) {
    if (p.status !== 'scheduled') return false;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const d = new Date(p.date); d.setHours(0, 0, 0, 0);
    return d < today;
},

// --- Anaesthetic history: the reason this module exists ---
// A vet weighing up a dental in a stage-C dog wants to know whether this animal has been under
// before, when, and how it went. Only COMPLETED procedures count — an anaesthetic that has not
// happened is not a track record.
procedureAnaestheticHistory() {
    const gas = this.completedProcedures().filter(p => p.hadGA);
    return {
        count: gas.length,
        mostRecent: gas.length ? gas[0].date : null,
        mostRecentRecovery: gas.length ? (gas[0].recoveryNotes || '').trim() : ''
    };
},

// --- Wording ---

procedureCategoryLabel(id) {
    const c = PROCEDURE_CATEGORIES.find(x => x.id === id);
    if (c) return c.label;
    return id ? id.charAt(0).toUpperCase() + id.slice(1) : 'Procedure';
},

procedureAreaLabel(id) {
    const a = PROCEDURE_AREAS.find(x => x.id === id);
    return a ? a.label : (id || '');
},

// Falls back to the category so a row is never blank — "Dental" beats an empty line on a report.
procedureTitle(p) {
    const name = (p.name || '').trim();
    return name || this.procedureCategoryLabel(p.category);
},

// "Mouth and teeth · Oakwood Vets" — joined only when both are present.
procedureSubtitle(p) {
    return [this.procedureAreaLabel(p.area), (p.performedBy || '').trim()]
        .filter(Boolean).join(' · ');
},

procedureSuggestions(area) {
    return PROCEDURE_SUGGESTIONS[area] || PROCEDURE_SUGGESTIONS.other;
},

usesExtractions(category) { return category === 'dental'; },

// "4 teeth extracted: 104, 108, 307, 409" — empty when there were none.
extractionSummary(extractions, species) {
    const list = extractions || [];
    if (!list.length) return '';
    const codes = this.sortTeeth(list.map(t => t.tooth), species).join(', ');
    return `${list.length === 1 ? '1 tooth' : list.length + ' teeth'} extracted: ${codes}`;
},

// One readable line per tooth — the form a vet reads, spelling the tooth out.
extractionLines(extractions, species) {
    const list = extractions || [];
    return this.sortTeeth(list.map(t => t.tooth), species).map(code => {
        const entry = list.find(t => t.tooth === code);
        const note = ((entry && entry.note) || '').trim();
        const label = this.toothLabel(code, species);
        return note ? `${label} — ${note}` : label;
    });
},

// A procedure done conscious says NOTHING rather than "no anaesthetic", which would read as a
// warning it is not.
procedureAnaestheticLine(p) {
    if (!p.hadGA) return '';
    const recovery = (p.recoveryNotes || '').trim();
    return recovery ? `General anaesthetic — ${recovery}` : 'General anaesthetic';
},

// An un-ticked "sample sent" hides any leftover text: a stale result must never print on a vet
// report as though a laboratory had reported it.
procedureHistopathLine(p) {
    if (!p.histopathSent) return '';
    const result = (p.histopathResult || '').trim();
    return result ? `Histopathology: ${result}` : 'Sample sent for histopathology — result awaited';
},

// --- Form & CRUD ---

openProcedureForm(id = null) {
    const existing = id ? (this.procedureLog || []).find(p => p.id === id) : null;
    this.editingProcedureId = id;
    this.showDeciduousTeeth = false;
    this.newProcedure = existing
        ? { ...existing, extractions: (existing.extractions || []).map(t => ({ ...t })) }
        : {
            date: new Date().toISOString().split('T')[0],
            status: 'completed', category: 'surgery', name: '', area: '',
            performedBy: '', hadGA: true, recoveryNotes: '', extractions: [],
            histopathSent: false, histopathResult: '', histopathDate: '',
            notes: '', reminderEnabled: true
          };
    this.showProcedureForm = true;
},

closeProcedureForm() {
    this.showProcedureForm = false;
    this.editingProcedureId = null;
},

// Preselect the obvious body region on a category change, but never overwrite a chosen one.
onProcedureCategoryChange() {
    if (this.newProcedure.area) return;
    if (this.newProcedure.category === 'dental') this.newProcedure.area = 'mouth';
    else if (this.newProcedure.category === 'cardiac') this.newProcedure.area = 'heart';
},

isToothSelected(triadan) {
    return (this.newProcedure.extractions || []).some(t => t.tooth === triadan);
},

toggleTooth(triadan) {
    const list = this.newProcedure.extractions || [];
    const i = list.findIndex(t => t.tooth === triadan);
    if (i >= 0) list.splice(i, 1);
    else list.push({ tooth: triadan, note: '' });
    this.newProcedure.extractions = list;
},

saveProcedure() {
    const p = this.newProcedure;
    const name = (p.name || '').trim();
    if (!name && !p.area) { alert('Please say what was done, or pick an area.'); return; }

    // A non-dental must not carry teeth (switching the type after picking them would leave
    // extractions attached to a spay), and a BOOKING has no outcome yet — carrying an anaesthetic
    // or a lab result on something that has not happened would put both into the report as fact.
    const isDental = this.usesExtractions(p.category);
    const happened = p.status !== 'scheduled';

    const record = {
        id: this.editingProcedureId || this.generateId(),
        patientId: this.activePatientId,
        date: p.date,
        status: p.status === 'scheduled' ? 'scheduled' : 'completed',
        category: p.category,
        name,
        area: p.area || '',
        performedBy: (p.performedBy || '').trim(),
        hadGA: happened && !!p.hadGA,
        recoveryNotes: happened && p.hadGA ? (p.recoveryNotes || '') : '',
        extractions: isDental
            ? (p.extractions || [])
                .filter(t => (t.tooth || '').trim())
                .map(t => ({ tooth: t.tooth.trim(), note: t.note || '' }))
            : [],
        histopathSent: happened && !!p.histopathSent,
        histopathResult: happened && p.histopathSent ? (p.histopathResult || '') : '',
        histopathDate: happened && p.histopathSent ? (p.histopathDate || '') : '',
        notes: p.notes || '',
        reminderEnabled: p.reminderEnabled !== false
    };

    this.procedureLog = this.editingProcedureId
        ? this.procedureLog.map(x => x.id === this.editingProcedureId ? record : x)
        : [...(this.procedureLog || []), record];
    this.saveToStorage('vch_procedureLog', this.procedureLog);
    this.closeProcedureForm();
},

// Turn a booking into history once it has gone ahead — the owner's call, never the date's.
markProcedureDone(id) {
    this.procedureLog = (this.procedureLog || [])
        .map(p => p.id === id ? { ...p, status: 'completed' } : p);
    this.saveToStorage('vch_procedureLog', this.procedureLog);
},

deleteProcedure(id) {
    if (!window.confirm('Delete this procedure? This cannot be undone.')) return;
    this.procedureLog = (this.procedureLog || []).filter(p => p.id !== id);
    this.saveToStorage('vch_procedureLog', this.procedureLog);
},

// ── VETERINARY APPOINTMENTS ──────────────────────────────────────────────────────────────────
// See APPOINTMENT_TYPES at the top of this file for the three load-bearing rules. Every consumer —
// the diary card, the .ics export, the CSV and the report text — words an appointment through the
// helpers below, so a booking cannot read one way on screen and another way in the report a vet
// acts on. Parity with iOS `Logic/AppointmentLogic.swift` — change both together.

appointmentType(id) {
    return APPOINTMENT_TYPES.find(t => t.id === id) || null;
},

// An unknown id (a record from a newer build, or from iOS) still reads as something rather than
// leaving a blank row.
appointmentTypeLabel(id) {
    const t = this.appointmentType(id);
    if (t) return t.label;
    return id ? id.charAt(0).toUpperCase() + id.slice(1) : 'Appointment';
},

appointmentStatusLabel(status) {
    const s = APPOINTMENT_STATUSES.find(x => x.id === status);
    return s ? s.label : 'Booked';
},

// A to-book record is OPEN. It is the one thing on the list that still needs an ACTION from the
// owner, so treating it as history would defeat the entire feature.
appointmentIsOpen(a) {
    const st = a?.status || 'booked';
    return st === 'booked' || st === 'toBook';
},

// Is this a REMINDER TO BOOK rather than a confirmed appointment? Callers use it to change the
// wording — "time to book" instead of "your appointment is" — and to leave out anything that
// assumes a slot exists (a clock time, an evening-before fasting alert, a calendar entry pinned to
// an hour). Mirrors `AppointmentCatalogue.needsBooking` on iOS.
appointmentNeedsBooking(a) { return (a?.status || 'booked') === 'toBook'; },

// Days of notice for a TO-BOOK record, which is a different quantity from the lead on a real
// booking. A week is fine for "your appointment is on Tuesday"; it is not enough to get a slot at a
// busy practice, so the nudge to phone lands a fortnight before the pet is due to be seen.
APPOINTMENT_BOOKING_LEAD_DAYS: 14,

// --- Filtering & ordering (status-driven, NEVER date-driven) ---

patientAppointments() {
    return (this.appointmentLog || []).filter(a => a.patientId === this.activePatientId);
},

// A sortable key: date, then clock time (an unknown time sorts LAST within its day, since a
// booked slot is more certain than one still to be confirmed), then entry order.
_appointmentSortKey(a) {
    return `${a.date || ''} ${a.time || '99:99'} ${a.createdAt || ''} ${a.id || ''}`;
},

// Still ahead of the owner, soonest first. A booking whose date has slipped is STILL a booking.
upcomingAppointments() {
    return this.patientAppointments()
        .filter(a => this.appointmentIsOpen(a))
        .sort((x, y) => this._appointmentSortKey(x).localeCompare(this._appointmentSortKey(y)));
},

// Everything closed — attended, cancelled or missed — newest first.
appointmentHistory() {
    return this.patientAppointments()
        .filter(a => !this.appointmentIsOpen(a))
        .sort((x, y) => this._appointmentSortKey(y).localeCompare(this._appointmentSortKey(x)));
},

// Booked, but the day has gone. These get ASKED about — "did you go?" — never assumed either way.
//
// A to-book record is EXCLUDED however overdue it is: there was no appointment, so "did you go?"
// cannot be answered and marking it attended would file a visit that never happened.
// `appointmentsOverdueToBook` asks the right question instead.
appointmentNeedsOutcome(a) {
    if (!this.appointmentIsOpen(a)) return false;
    if (this.appointmentNeedsBooking(a)) return false;
    return (a.date || '') < new Date().toISOString().split('T')[0];
},

// A to-book record the pet is now due for — "you were told to go back by now, and it still isn't
// booked". The counterpart to `appointmentNeedsOutcome`, and the reason the status exists.
appointmentBookingOverdue(a) {
    if (!this.appointmentNeedsBooking(a)) return false;
    return (a.date || '') < new Date().toISOString().split('T')[0];
},

appointmentsNeedingOutcome() {
    return this.upcomingAppointments().filter(a => this.appointmentNeedsOutcome(a));
},

appointmentsOverdueToBook() {
    return this.upcomingAppointments().filter(a => this.appointmentBookingOverdue(a));
},

// The merged diary: appointments PLUS booked procedures, so "what is coming up" is one list.
// The storage stays split (a surgical history must not fill up with consultations) and only the
// DISPLAY is joined — parity with iOS `Logic/UpcomingCare.swift`.
//
// Anything whose day has passed leads the list whatever its date: a slipped booking sorting into
// the past, below today where nobody scrolls, is exactly how it stops being dealt with.
upcomingCare() {
    const items = this.upcomingAppointments().map(a => ({
        id: 'appointment.' + a.id, kind: 'appointment', sourceId: a.id,
        date: a.date, time: a.time || '',
        title: this.appointmentTitle(a), subtitle: this.appointmentSubtitle(a),
        needsOutcome: this.appointmentNeedsOutcome(a),
        needsBooking: this.appointmentNeedsBooking(a),
        bookingOverdue: this.appointmentBookingOverdue(a)
    })).concat(this.scheduledProcedures().map(pr => ({
        id: 'procedure.' + pr.id, kind: 'procedure', sourceId: pr.id,
        date: pr.date, time: '',
        title: this.procedureTitle(pr), subtitle: this.procedureSubtitle(pr),
        needsOutcome: !!this.procedureNeedsOutcome(pr),
        needsBooking: false, bookingOverdue: false
    })));
    return items.sort((a, b) => {
        if (a.needsOutcome !== b.needsOutcome) return a.needsOutcome ? -1 : 1;
        const ka = `${a.date} ${a.time || '99:99'} ${a.id}`;
        const kb = `${b.date} ${b.time || '99:99'} ${b.id}`;
        return ka.localeCompare(kb);
    });
},

// Excludes overdue to-book items, which get their own section for the same reason slipped bookings
// do: buried among future dates is exactly where they stop being dealt with.
futureCare()          { return this.upcomingCare().filter(i => !i.needsOutcome && !i.bookingOverdue); },
careAwaitingOutcome() { return this.upcomingCare().filter(i => i.needsOutcome); },
careOverdueToBook()   { return this.upcomingCare().filter(i => i.bookingOverdue); },

// --- Wording ---

// Falls back to the type's default title, then to the type label, so a row is never blank.
appointmentTitle(a) {
    const typed = (a.title || '').trim();
    if (typed) return typed;
    const t = this.appointmentType(a.type);
    return (t && t.defaultTitle) ? t.defaultTitle : this.appointmentTypeLabel(a.type);
},

// "Oakwood Vets — Exeter branch", or whichever part exists.
appointmentPlaceName(a) {
    const provider = (a.providerName || '').trim();
    const branch = (a.locationLabel || '').trim();
    if (!provider) return branch;
    if (!branch) return provider;
    return `${provider} — ${branch}`;
},

// "12 Mill Lane, Exeter, EX1 2AB" — the multi-line address on one line for a row subtitle.
appointmentAddressOneLine(a) {
    return (a.address || '').split('\n').map(l => l.trim()).filter(Boolean).join(', ');
},

appointmentSubtitle(a) {
    return [this.appointmentPlaceName(a), this.appointmentAddressOneLine(a)].filter(Boolean).join(' · ');
},

// Questions are stored as one text field because that is how owners type them; split for display.
appointmentQuestionLines(a) {
    return (a.questionsToAsk || '').split('\n').map(l => l.trim()).filter(Boolean);
},

// "Tuesday 12 August at 14:30" — the one string that answers "when is it".
appointmentWhenText(a) {
    if (!a.date) return '';
    const day = new Date(a.date + 'T12:00:00Z').toLocaleDateString(undefined,
        { weekday: 'long', day: 'numeric', month: 'long' });
    return a.time ? `${day} at ${a.time}` : day;
},

// "Due by Tuesday 12 August — not booked yet" for a to-book record, otherwise the usual line.
// A to-book record's date is when the pet should be SEEN BY, not a slot, and printing it the same
// way as a confirmed booking is exactly the confusion this status exists to remove.
appointmentWhenLine(a) {
    const when = this.appointmentWhenText(a);
    return this.appointmentNeedsBooking(a) ? `Due by ${when} — not booked yet` : when;
},

// "In about six months" → a due date that many months from today. The quick answers for a to-book
// record, because "come back in about six months" is exactly how this is said in the consulting
// room and typing it should be that quick.
setAppointmentDueInMonths(months) {
    const d = new Date();
    d.setMonth(d.getMonth() + months);
    this.newAppointment.date = d.toISOString().split('T')[0];
},

// Switching to "still to book" clears the time (there is no slot) and widens the notice period —
// a week is not enough to get a slot at a busy practice.
onAppointmentStatusChange() {
    if (this.appointmentNeedsBooking(this.newAppointment)) {
        this.newAppointment.time = '';
        this.newAppointment.reminderLeadDays = this.APPOINTMENT_BOOKING_LEAD_DAYS;
        this.newAppointment.remindDayBefore = false;
    }
},

// "I've booked it now" — promotes a to-book note into a real appointment.
//
// Deliberately does NOT touch the date. The stored date is when the pet was DUE to be seen, and
// the slot the practice gave is almost never that day. Guessing one would put a wrong date in the
// diary; the owner puts the real date and time in on the form that opens.
markAppointmentBooked(id) {
    const a = (this.appointmentLog || []).find(x => x.id === id);
    if (!a) return;
    a.status = 'booked';
    a.reminderLeadDays = this.appointmentType(a.type)?.defaultLeadDays ?? 7;
    this.saveToStorage('vch_appointmentLog', this.appointmentLog);
    this.openAppointmentForm(id);
},

// --- Form & CRUD ---

openAppointmentForm(id = null) {
    const existing = id ? (this.appointmentLog || []).find(a => a.id === id) : null;
    this.editingAppointmentId = id;
    this._appointmentPrevType = existing ? existing.type : 'checkup';
    this.newAppointment = existing
        ? { ...existing }
        : {
            date: new Date().toISOString().split('T')[0],
            time: '', type: 'checkup', status: 'booked', title: 'Health check',
            providerName: '', locationLabel: '', address: '', phone: '',
            providerId: null, locationId: null,
            preparation: '', questionsToAsk: '', outcome: '', notes: '',
            reminderEnabled: true, reminderLeadDays: 7, remindDayBefore: true,
            createdAt: ''
          };
    this.showAppointmentForm = true;
},

closeAppointmentForm() {
    this.showAppointmentForm = false;
    this.editingAppointmentId = null;
},

// Fill in the obvious title and notice period on a type change, but never overwrite what the
// owner has already typed or chosen.
//
// The previous type is tracked on the COMPONENT, not on the <select> element: `x-init` runs once,
// so an element-held value goes stale the moment the form is reopened for an existing appointment
// — and a stale "previous" is what would let this quietly rewrite a title the owner chose.
onAppointmentTypeChange() {
    const was = this.appointmentType(this._appointmentPrevType);
    const now = this.appointmentType(this.newAppointment.type);
    this._appointmentPrevType = this.newAppointment.type;
    if (!now) return;
    const title = (this.newAppointment.title || '').trim();
    if (!title || (was && title === was.defaultTitle)) this.newAppointment.title = now.defaultTitle;
    if (!was || this.newAppointment.reminderLeadDays === was.defaultLeadDays) {
        this.newAppointment.reminderLeadDays = now.defaultLeadDays;
    }
    // An emergency visit is nearly always entered after the event, not booked ahead.
    if (now.id === 'emergency' && !this.editingAppointmentId) this.newAppointment.status = 'attended';
},

// Every provider/branch pair the owner could be attending, flattened for the picker. A practice
// with branches offers one row each: "which building" is the whole question this answers.
careProviderOptions() {
    const out = [];
    (this.appSettings.careProviders || []).forEach(p => {
        const locations = p.locations || [];
        if (!locations.length) {
            out.push({ key: p.id, label: p.name, detail: p.role || '', provider: p, location: null });
        } else {
            locations.forEach(l => out.push({
                key: `${p.id}.${l.id}`,
                label: l.label ? `${p.name} — ${l.label}` : p.name,
                detail: (l.address || '').split('\n').map(s => s.trim()).filter(Boolean).join(', '),
                provider: p, location: l
            }));
        }
    });
    return out;
},

// Copy a contact into the appointment. The branch's direct line wins over the practice's main
// number — it is the one that gets answered on the day.
applyCareProviderToAppointment(option) {
    const p = option.provider, l = option.location;
    Object.assign(this.newAppointment, {
        providerName: p.name || '',
        providerId: p.id || null,
        locationLabel: l ? (l.label || '') : '',
        locationId: l ? (l.id || null) : null,
        address: l ? (l.address || '') : '',
        phone: (l && (l.phone || '').trim()) ? l.phone.trim() : (p.phone || '')
    });
},

saveAppointment() {
    const a = this.newAppointment;
    const open = (a.status || 'booked') === 'booked';
    // Only a well-formed HH:mm survives. Junk here would reach the reminder wording, where an
    // unparseable time reads as "no time given" anyway — better to store that honestly.
    const time = /^([01]\d|2[0-3]):([0-5]\d)$/.test(a.time || '') ? a.time : '';

    const record = {
        id: this.editingAppointmentId || this.generateId(),
        patientId: this.activePatientId,
        date: a.date,
        time,
        type: a.type || 'checkup',
        status: APPOINTMENT_STATUSES.some(s => s.id === a.status) ? a.status : 'booked',
        title: (a.title || '').trim(),
        providerName: (a.providerName || '').trim(),
        locationLabel: (a.locationLabel || '').trim(),
        address: (a.address || '').trim(),
        phone: (a.phone || '').trim(),
        providerId: a.providerId || null,
        locationId: a.locationId || null,
        preparation: (a.preparation || '').trim(),
        questionsToAsk: a.questionsToAsk || '',
        // A still-open appointment has no outcome yet; carrying one across would put a claim in
        // the record that nobody made.
        outcome: open ? '' : (a.outcome || '').trim(),
        notes: a.notes || '',
        reminderEnabled: a.reminderEnabled !== false,
        reminderLeadDays: Math.max(0, parseInt(a.reminderLeadDays, 10) || 0),
        remindDayBefore: a.remindDayBefore !== false,
        createdAt: a.createdAt || new Date().toISOString()
    };

    this.appointmentLog = this.editingAppointmentId
        ? this.appointmentLog.map(x => x.id === this.editingAppointmentId ? record : x)
        : [...(this.appointmentLog || []), record];
    this.saveToStorage('vch_appointmentLog', this.appointmentLog);
    this.closeAppointmentForm();
},

// Turn a booking into history once it has gone ahead — the owner's call, never the date's.
markAppointmentAttended(id) {
    this.appointmentLog = (this.appointmentLog || [])
        .map(a => a.id === id ? { ...a, status: 'attended' } : a);
    this.saveToStorage('vch_appointmentLog', this.appointmentLog);
},

// One-tap from the merged diary, whichever list the item came from.
markCareItemDone(item) {
    if (item.kind === 'procedure') this.markProcedureDone(item.sourceId);
    else this.markAppointmentAttended(item.sourceId);
},

openCareItem(item) {
    if (item.kind === 'procedure') { this.showProcedurePanel = true; this.openProcedureForm(item.sourceId); }
    else this.openAppointmentForm(item.sourceId);
},

deleteAppointment(id) {
    if (!window.confirm('Delete this appointment? This cannot be undone.')) return;
    this.appointmentLog = (this.appointmentLog || []).filter(a => a.id !== id);
    this.saveToStorage('vch_appointmentLog', this.appointmentLog);
},

// --- Calendar export ---
//
// A VEVENT of its own rather than a reuse of `_buildVevent`: that one is vaccine-shaped and
// hardcodes the word "due", and an appointment described as due reads like a lapsed treatment —
// the opposite of the truth. This one says "booked", and carries the real slot time when there is
// one instead of pretending an all-day event.
// A to-book record goes into the calendar too, but as "Book: …" and never "booked": putting an
// appointment nobody made into the owner's real calendar as a confirmed booking is precisely the
// mistake the 'toBook' status exists to prevent. It also never carries a clock time — there is no
// slot — so it always renders as an all-day entry.
_buildAppointmentVevent(a, patientName) {
    const toBook = this.appointmentNeedsBooking(a);
    const title = toBook ? `Book: ${this.appointmentTitle(a)}` : this.appointmentTitle(a);
    const pad = n => String(n).padStart(2, '0');
    const ymd = a.date.replace(/-/g, '');

    const now = new Date();
    const dtstamp = now.getUTCFullYear() + pad(now.getUTCMonth() + 1) + pad(now.getUTCDate())
        + 'T' + pad(now.getUTCHours()) + pad(now.getUTCMinutes()) + pad(now.getUTCSeconds()) + 'Z';

    // With a known slot: a one-hour local-time event, so it lands in the right place in the day.
    // Without one: an all-day event, which is the honest rendering of "we have not been told yet".
    let dtstart, dtend;
    if (a.time && !toBook) {
        const [h, m] = a.time.split(':').map(Number);
        dtstart = `DTSTART:${ymd}T${pad(h)}${pad(m)}00`;
        dtend   = `DTEND:${ymd}T${pad((h + 1) % 24)}${pad(m)}00`;
    } else {
        const next = new Date(a.date + 'T12:00:00Z');
        next.setUTCDate(next.getUTCDate() + 1);
        dtstart = `DTSTART;VALUE=DATE:${ymd}`;
        dtend   = `DTEND;VALUE=DATE:${next.getUTCFullYear()}${pad(next.getUTCMonth() + 1)}${pad(next.getUTCDate())}`;
    }

    const desc = [
        `Pet: ${patientName}`,
        `Appointment: ${title}`,
        toBook
            ? `Due by: ${new Date(a.date + 'T12:00:00Z').toLocaleDateString('en-GB')} — not booked yet`
            : `Booked: ${new Date(a.date + 'T12:00:00Z').toLocaleDateString('en-GB')}${a.time ? ' at ' + a.time : ''}`,
    ];
    const place = this.appointmentPlaceName(a);
    if (place) desc.push(`Where: ${place}`);
    const address = this.appointmentAddressOneLine(a);
    if (address) desc.push(`Address: ${address}`);
    if (a.phone) desc.push(`Phone: ${a.phone}`);
    if (a.preparation) desc.push(`Before you go: ${a.preparation}`);
    this.appointmentQuestionLines(a).forEach(q => desc.push(`Ask: ${q}`));
    if (a.notes) desc.push(`Notes: ${a.notes}`);
    desc.push('', 'Generated by VetCardioHub — vetcardiohub.com');

    const lead = Math.max(0, parseInt(a.reminderLeadDays, 10) || 0);
    const alarms = [];
    if (lead > 0) {
        alarms.push('BEGIN:VALARM', 'ACTION:DISPLAY',
            `DESCRIPTION:${this._escapeIcs(
                (toBook
                    ? `Time to book ${patientName}'s ${this.appointmentTitle(a)} — due in ${lead} day${lead === 1 ? '' : 's'}`
                      + (a.phone ? ` · ${a.phone}` : '')
                    : `${patientName}'s ${title} is booked in ${lead} day${lead === 1 ? '' : 's'}`
                      + (a.preparation ? ` — ${a.preparation}` : '')))}`,
            `TRIGGER:-P${lead}D`, 'END:VALARM');
    }
    if (a.remindDayBefore !== false) {
        alarms.push('BEGIN:VALARM', 'ACTION:DISPLAY',
            `DESCRIPTION:${this._escapeIcs(`${patientName}'s ${title} is tomorrow${a.time ? ' at ' + a.time : ''}`
                + (a.preparation ? ` — ${a.preparation}` : ''))}`,
            // 6pm the evening before an all-day event; two hours before a timed one.
            a.time ? 'TRIGGER:-PT2H' : 'TRIGGER:-PT6H', 'END:VALARM');
    }

    return [
        'BEGIN:VEVENT',
        `UID:${this.generateId()}@vetcardiohub.com`,
        `DTSTAMP:${dtstamp}`,
        dtstart,
        dtend,
        `SUMMARY:${this._escapeIcs(`${patientName} – ${title} booked`)}`,
        `DESCRIPTION:${this._escapeIcs(desc.join('\\n'))}`,
        ...(address ? [`LOCATION:${this._escapeIcs(address)}`] : []),
        ...alarms,
        'END:VEVENT'
    ];
},

downloadAppointmentIcs() {
    const booked = this.upcomingAppointments().filter(a => a.date);
    if (!booked.length) { alert('No booked appointments to add to your calendar.'); return; }
    const patientName = this.activePatientProfile?.name || 'Pet';
    const lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//VetCardioHub//Appointment Reminders//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        ...booked.flatMap(a => this._buildAppointmentVevent(a, patientName)),
        'END:VCALENDAR'
    ];
    this._downloadIcs(this._buildIcsString(lines),
        `${patientName.replace(/\s+/g, '-')}-Appointments.ics`);
},

// ── FOOD ALLERGIES & ADVERSE DRUG REACTIONS ──────────────────────────────────────────────────
// See ALLERGY_TYPES at the top of this file for the three load-bearing rules. Every consumer —
// the panel at the top of the diet log, the panel at the top of the medication ledger, the CSV,
// the report text and the PDF — words an allergy through the helpers below, so a severe reaction
// cannot read one way on screen and another way in the report a vet acts on.

// --- Filtering & ordering (severity-driven, NOT date-driven) ---
//
// Everywhere else the newest record leads, because the question is "what is happening now". This
// list answers a different question: "what must not be given to this animal". A collapse after
// amoxicillin in 2019 outranks a bit of itching after a new treat last week.

patientAllergies() {
    return (this.allergyLog || []).filter(a => a.patientId === this.activePatientId);
},

allergySeverityRank(id) {
    const s = ALLERGY_SEVERITIES.find(x => x.id === id);
    return s ? s.rank : 0;
},

// Worst first; within a severity the most recently dated first, undated last; then the allergen
// name, with the id as the final tie-break so the order is stable between page loads.
sortAllergies(list) {
    return [...(list || [])].sort((a, b) => {
        const ra = this.allergySeverityRank(a.severity), rb = this.allergySeverityRank(b.severity);
        if (ra !== rb) return rb - ra;
        if (a.date && b.date && a.date !== b.date) return new Date(b.date) - new Date(a.date);
        if (!a.date && b.date) return 1;        // undated sinks below dated
        if (a.date && !b.date) return -1;
        const na = this.allergyDisplayName(a), nb = this.allergyDisplayName(b);
        if (na !== nb) return na.localeCompare(nb);
        return String(a.id).localeCompare(String(b.id));
    });
},

foodAllergies() {
    return this.sortAllergies(this.patientAllergies().filter(a => a.type !== 'medication'));
},

medicationAllergies() {
    return this.sortAllergies(this.patientAllergies().filter(a => a.type === 'medication'));
},

allergiesOfType(type) {
    return type === 'medication' ? this.medicationAllergies() : this.foodAllergies();
},

hasSevereAllergy(list) {
    return (list || this.patientAllergies()).some(a => a.severity === 'severe');
},

// Export order: medication reactions first — they are the ones that change what a vet does in the
// next five minutes — each group worst-first.
allergyExportOrder() {
    return this.medicationAllergies().concat(this.foodAllergies());
},

// --- Wording ---

allergyTypeLabel(id) {
    const t = ALLERGY_TYPES.find(x => x.id === id);
    return t ? t.label : (id ? id.charAt(0).toUpperCase() + id.slice(1) : 'Allergy');
},

allergyTypeNoun(id) { return id === 'medication' ? 'medication reaction' : 'food allergy'; },

allergySeverityLabel(id) {
    const s = ALLERGY_SEVERITIES.find(x => x.id === id);
    return s ? s.label : (id ? id.charAt(0).toUpperCase() + id.slice(1) : 'Not recorded');
},

allergySeverityHint(id) {
    const s = ALLERGY_SEVERITIES.find(x => x.id === id);
    return s ? s.hint : '';
},

allergyCertaintyLabel(id) {
    const c = ALLERGY_CERTAINTIES.find(x => x.id === id);
    return c ? c.label : 'Suspected';
},

allergyCertaintyShort(id) { return id === 'confirmed' ? 'confirmed' : 'suspected'; },

// One colour per severity, shared by both panels so a "moderate" never reads red in one place and
// amber in the other.
allergyDotColour(severity) {
    switch (severity) {
        case 'severe':   return '#b91c1c';
        case 'moderate': return '#ea580c';
        case 'mild':     return '#ca8a04';
        default:         return '#94a3b8';
    }
},

// Falls back to a placeholder rather than an empty string — a nameless warning still tells a vet
// to ask the question.
allergyDisplayName(a) {
    const name = ((a && a.allergen) || '').trim();
    if (name) return name;
    return (a && a.type === 'medication') ? 'Unnamed medication' : 'Unnamed food';
},

// "Severe · Confirmed". The severity is dropped when it was never recorded, so the line does not
// claim a judgement nobody made.
allergyQualifier(a) {
    const parts = [];
    if (this.allergySeverityRank(a.severity) > 0) parts.push(this.allergySeverityLabel(a.severity));
    const cert = this.allergyCertaintyShort(a.certainty);
    parts.push(cert.charAt(0).toUpperCase() + cert.slice(1));
    return parts.join(' · ');
},

// "4 Mar 2024" — day-level dates are stored as bare 'yyyy-MM-dd', read in UTC so they name the
// day the owner picked wherever the browser is set.
allergyDayText(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d)) return '';
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
},

// The one-line subtitle under an allergen on screen.
allergySummaryLine(a) {
    const parts = [this.allergyQualifier(a)];
    const reaction = (a.reaction || '').trim();
    if (reaction) parts.push(reaction);
    if (a.date) parts.push(this.allergyDayText(a.date));
    return parts.join(' — ');
},

// "Chicken (Severe · Confirmed) — vomiting, hives — diagnosed 4 Mar 2024 — <notes>"
allergyReportLine(a) {
    let line = `${this.allergyDisplayName(a)} (${this.allergyQualifier(a)})`;
    const reaction = (a.reaction || '').trim();
    if (reaction) line += ` — ${reaction}`;
    if (a.date) line += ` — diagnosed ${this.allergyDayText(a.date)}`;
    const notes = (a.notes || '').trim();
    if (notes) line += ` — ${notes}`;
    return line;
},

// The kind leads, because a vet scanning the block needs to know which list they are reading
// before they read the name — the two carry different consequences.
allergyExportLine(a) {
    const kind = a.type === 'medication' ? 'MEDICATION REACTION' : 'FOOD ALLERGY';
    return `${kind} — ${this.allergyReportLine(a)}`;
},

// "2 medication reactions · 1 food allergy". Empty when there are none.
allergyCountSummary() {
    const meds = this.medicationAllergies().length, foods = this.foodAllergies().length;
    const parts = [];
    if (meds) parts.push(`${meds} medication reaction${meds === 1 ? '' : 's'}`);
    if (foods) parts.push(`${foods} food allerg${foods === 1 ? 'y' : 'ies'}`);
    return parts.join(' · ');
},

// --- Form & CRUD ---

allergenSuggestions(type) {
    return ALLERGEN_SUGGESTIONS[type === 'medication' ? 'medication' : 'food'];
},

allergyReactionSigns(type) {
    return ALLERGY_REACTION_SIGNS[type === 'medication' ? 'medication' : 'food'];
},

// Sign chips APPEND rather than replace — a reaction is usually several things at once
// ("vomiting, hives"), and replacing would make the owner retype the ones already chosen.
_allergySignList() {
    return (this.newAllergy.reaction || '').split(',').map(s => s.trim()).filter(Boolean);
},

isAllergySignSelected(sign) {
    return this._allergySignList().some(s => s.toLowerCase() === sign.toLowerCase());
},

toggleAllergySign(sign) {
    const list = this._allergySignList();
    const i = list.findIndex(s => s.toLowerCase() === sign.toLowerCase());
    if (i >= 0) list.splice(i, 1); else list.push(sign);
    this.newAllergy.reaction = list.join(', ');
},

openAllergyForm(type, id = null) {
    const existing = id ? (this.allergyLog || []).find(a => a.id === id) : null;
    this.editingAllergyId = id;
    this.viewingAllergyId = null;
    this.newAllergy = existing
        ? { ...existing }
        : { type: type || 'food', allergen: '', drugId: '', severity: 'unknown',
            certainty: 'confirmed', reaction: '', date: '', notes: '' };
    this.showAllergyForm = true;
},

closeAllergyForm() {
    this.showAllergyForm = false;
    this.editingAllergyId = null;
},

// Tapping a row opens the full record; tapping it again closes it.
toggleAllergyDetail(id) {
    this.viewingAllergyId = this.viewingAllergyId === id ? null : id;
},

saveAllergy() {
    const a = this.newAllergy;
    const allergen = (a.allergen || '').trim();
    if (!allergen) { alert('Please say what your pet reacts to.'); return; }

    const record = {
        id: this.editingAllergyId || this.generateId(),
        patientId: this.activePatientId,
        type: a.type === 'medication' ? 'medication' : 'food',
        allergen,
        // A food record must never keep a drug id behind from a type switch.
        drugId: a.type === 'medication' ? (a.drugId || '') : '',
        severity: ALLERGY_SEVERITIES.some(s => s.id === a.severity) ? a.severity : 'unknown',
        certainty: a.certainty === 'suspected' ? 'suspected' : 'confirmed',
        reaction: (a.reaction || '').trim(),
        // '' stays '' — a blank date means the owner does not know when this started, and
        // defaulting it to today would fabricate a diagnosis date on every future vet report.
        date: a.date || '',
        notes: (a.notes || '').trim(),
        createdAt: (this.editingAllergyId && (this.allergyLog.find(x => x.id === this.editingAllergyId) || {}).createdAt)
                   || new Date().toISOString()
    };

    this.allergyLog = this.editingAllergyId
        ? this.allergyLog.map(x => x.id === this.editingAllergyId ? record : x)
        : [...(this.allergyLog || []), record];
    this.saveToStorage('vch_allergyLog', this.allergyLog);
    this.closeAllergyForm();
},

deleteAllergy(id) {
    if (!window.confirm('Delete this allergy record? It will no longer appear on any report.')) return;
    this.allergyLog = (this.allergyLog || []).filter(a => a.id !== id);
    this.saveToStorage('vch_allergyLog', this.allergyLog);
    if (this.viewingAllergyId === id) this.viewingAllergyId = null;
},

// =================================================================================================
// SKIN & ITCH
// =================================================================================================
//
// Ported 1:1 from `Logic/SkinLogic.swift` — every threshold, every sentence. If you change a
// number or a phrase here, change it there too, or the same pet's records will read differently
// on the two platforms.
//
// WHAT THE SEASONAL ANALYSIS IS ALLOWED TO SAY. An owner who can tell their vet "it's the same
// every June" has changed the consultation. That is the value, and it is also the risk: a pattern
// found in a handful of records, stated confidently, would send a vet down the wrong road. So:
//   1. It never reports a pattern it cannot support — below the coverage floor it says how much
//      more logging is needed and stops, rather than offering a tentative guess.
//   2. It averages MONTHLY MEANS, not raw days. An owner who logged every day of one bad August
//      and once a month otherwise would otherwise hand August the year on sample size alone.
//   3. "Peaks in July" (one year) and "peaks in July, both years" get different words.
//   4. It never names a cause. Pollen, mites and food all produce summer itch and this app cannot
//      tell them apart. Every pattern sentence ends by handing the finding to the vet.
//
// Days logged WITHOUT a score are excluded from every mean. Reading a null as 0 would let a month
// the owner forgot to score masquerade as the pet's most comfortable month of the year, which is
// precisely the mistake that would invert a real pattern.
//
// Dates are day-level 'yyyy-MM-dd' strings here (localStorage convention); iOS stores the same day
// at UTC noon and reads the month back in UTC, so the two agree on which bucket a record is in.

patientSkinLog() {
    return (this.skinLog || []).filter(s => s.patientId === this.activePatientId);
},

// Newest first — the opposite of the allergy list, and deliberately so. This log answers "what is
// happening now".
get sortedSkinLog() {
    return this.patientSkinLog().slice().sort((a, b) => (b.date || '').localeCompare(a.date || ''));
},

skinScoreAnchor(score) {
    const n = Math.max(0, Math.min(10, Number(score) || 0));
    return SKIN_SCORE_ANCHORS[n];
},

// Derived from the score, never stored, so it cannot contradict it. The cut-points follow the
// anchors: 1–3 is background scratching, 4–6 is clearly uncomfortable, 7+ is a day ruled by it.
skinScoreBand(score) {
    if (score === null || score === undefined || score === '') return '';
    const n = Number(score);
    if (n <= 0) return 'None';
    if (n <= 3) return 'Mild';
    if (n <= 6) return 'Moderate';
    return 'Severe';
},

skinEarLabel(id) {
    const e = SKIN_EAR_STATES.find(x => x.id === id);
    return e ? e.label : 'Ears fine';
},

// An unrecognised id ranks 0 rather than throwing: a value written by a newer build must not break
// an older one, and "fine" is the safe reading because it makes no claim.
skinEarRank(id) {
    const e = SKIN_EAR_STATES.find(x => x.id === id);
    return e ? e.rank : 0;
},

skinEarHint(id) {
    const e = SKIN_EAR_STATES.find(x => x.id === id);
    return e ? e.hint : SKIN_EAR_STATES[SKIN_EAR_STATES.length - 1].hint;
},

skinSiteLabel(id) {
    const s = SKIN_SITES.find(x => x.id === id);
    return s ? s.label : id;   // unknown ids pass through — still belongs on the vet's copy
},

skinSignLabel(id) {
    const s = SKIN_SIGNS.find(x => x.id === id);
    return s ? s.label : id;
},

skinTreatmentLabel(id) {
    const t = SKIN_TREATMENTS.find(x => x.id === id);
    return t ? t.label : id;
},

skinTriggerLabel(id) {
    const t = SKIN_TRIGGERS.find(x => x.id === id);
    return t ? t.label : id;
},

// "Paws, Ears and Tummy or groin"
skinSiteList(ids) {
    const labels = (ids || []).map(id => this.skinSiteLabel(id)).filter(Boolean);
    if (labels.length === 0) return '';
    if (labels.length === 1) return labels[0];
    return labels.slice(0, -1).join(', ') + ' and ' + labels[labels.length - 1];
},

// "Nothing given" is dropped when a real treatment is also selected — that can only happen if a
// chip was left on by mistake.
skinTreatmentList(ids) {
    const real = (ids || []).filter(id => id !== 'none');
    if (real.length === 0) return (ids || []).includes('none') ? 'Nothing given' : '';
    return real.map(id => this.skinTreatmentLabel(id)).join(', ');
},

skinScoreText(entry) {
    if (entry.itchScore === null || entry.itchScore === undefined) return 'Not scored';
    return `${entry.itchScore}/10 · ${this.skinScoreBand(entry.itchScore)}`;
},

skinSummaryLine(entry) {
    const parts = [];
    const sites = this.skinSiteList(entry.sites);
    if (sites) parts.push(sites);
    if (this.skinEarRank(entry.earStatus) > 0) parts.push(this.skinEarLabel(entry.earStatus));
    const treatments = this.skinTreatmentList((entry.treatments || []).filter(t => t !== 'none'));
    if (treatments) parts.push(treatments);
    if (entry.vetVisit) parts.push('Seen by a vet');
    return parts.join(' · ');
},

// --- Form -------------------------------------------------------------------------------------

hasSkinForDate() {
    return this.patientSkinLog().some(s => s.date === this.newSkin.date);
},

loadSkinForDate() {
    const existing = this.patientSkinLog().find(s => s.date === this.newSkin.date);
    if (existing) {
        this.newSkin = {
            date: existing.date,
            itchScore: existing.itchScore === null || existing.itchScore === undefined ? 3 : existing.itchScore,
            hasScore: existing.itchScore !== null && existing.itchScore !== undefined,
            sites: [...(existing.sites || [])],
            signs: [...(existing.signs || [])],
            earStatus: existing.earStatus || 'none',
            treatments: [...(existing.treatments || [])],
            treatmentNotes: existing.treatmentNotes || '',
            suspectedTrigger: existing.suspectedTrigger || 'unknown',
            vetVisit: !!existing.vetVisit,
            notes: existing.notes || ''
        };
    } else {
        const date = this.newSkin.date;
        this.newSkin = { date, itchScore: 3, hasScore: true, sites: [], signs: [], earStatus: 'none',
                         treatments: [], treatmentNotes: '', suspectedTrigger: 'unknown',
                         vetVisit: false, notes: '' };
    }
},

openSkinForm(date = null) {
    this.newSkin.date = date || new Date().toISOString().split('T')[0];
    this.loadSkinForDate();
    this.showSkinForm = true;
},

closeSkinForm() { this.showSkinForm = false; },

// Multi-select chips. `none` is exclusive — it is a statement, not one item among many.
toggleSkinChip(field, id, exclusiveId = null) {
    const list = this.newSkin[field] || [];
    if (list.includes(id)) {
        this.newSkin[field] = list.filter(x => x !== id);
        return;
    }
    if (exclusiveId) {
        if (id === exclusiveId) { this.newSkin[field] = [exclusiveId]; return; }
        this.newSkin[field] = list.filter(x => x !== exclusiveId).concat(id);
        return;
    }
    this.newSkin[field] = list.concat(id);
},

saveSkinEntry() {
    const s = this.newSkin;
    if (!this.activePatientId) return;
    const existing = this.patientSkinLog().find(x => x.date === s.date);
    const record = {
        id: existing ? existing.id : this.generateId(),
        patientId: this.activePatientId,
        date: s.date,
        // null, NOT 0 — a day logged without a score is not a comfortable day.
        itchScore: s.hasScore ? Math.max(0, Math.min(10, Number(s.itchScore) || 0)) : null,
        sites: [...(s.sites || [])],
        signs: [...(s.signs || [])],
        earStatus: SKIN_EAR_STATES.some(e => e.id === s.earStatus) ? s.earStatus : 'none',
        treatments: [...(s.treatments || [])],
        treatmentNotes: (s.treatmentNotes || '').trim(),
        suspectedTrigger: s.suspectedTrigger || 'unknown',
        vetVisit: !!s.vetVisit,
        notes: (s.notes || '').trim(),
        createdAt: (existing && existing.createdAt) || new Date().toISOString()
    };
    // One entry per day: saving for a day already logged REPLACES it.
    this.skinLog = existing
        ? this.skinLog.map(x => x.id === existing.id ? record : x)
        : [...(this.skinLog || []), record];
    this.saveToStorage('vch_skinLog', this.skinLog);
    this.closeSkinForm();
},

deleteSkinEntry(id) {
    if (!window.confirm('Delete this day from the skin log?')) return;
    this.skinLog = (this.skinLog || []).filter(s => s.id !== id);
    this.saveToStorage('vch_skinLog', this.skinLog);
},

// --- Seasonal analysis --------------------------------------------------------------------------

_skinMonth(dateStr) { return Number((dateStr || '').split('-')[1]) || 0; },
_skinYear(dateStr)  { return Number((dateStr || '').split('-')[0]) || 0; },

_skinIsScored(e) { return e.itchScore !== null && e.itchScore !== undefined; },

// Mean score for each calendar month WITHIN each year — the building block every aggregate is made
// of, so sampling effort in one month of one year cannot dominate.
skinMonthlyStatsByYear(entries) {
    const buckets = {};
    (entries || []).forEach(e => {
        const y = this._skinYear(e.date), m = this._skinMonth(e.date);
        if (!y || !m) return;
        const key = `${y}-${m}`;
        if (!buckets[key]) buckets[key] = { year: y, month: m, total: 0, days: 0, earDays: 0 };
        if (this._skinIsScored(e)) { buckets[key].total += Number(e.itchScore); buckets[key].days += 1; }
        if (this.skinEarRank(e.earStatus) > 0) buckets[key].earDays += 1;
    });
    return Object.values(buckets)
        .filter(b => b.days > 0)
        .map(b => ({ year: b.year, month: b.month, mean: b.total / b.days,
                     scoredDays: b.days, earDays: b.earDays }))
        .sort((a, b) => a.year - b.year || a.month - b.month);
},

// Every calendar month with at least one scored day, in month order. The mean is the mean of that
// month's PER-YEAR means — see the header.
skinMonthlyStats(entries) {
    const byYear = this.skinMonthlyStatsByYear(entries);
    const out = [];
    for (let m = 1; m <= 12; m++) {
        const rows = byYear.filter(r => r.month === m);
        if (!rows.length) continue;
        out.push({
            month: m,
            mean: rows.reduce((n, r) => n + r.mean, 0) / rows.length,
            scoredDays: rows.reduce((n, r) => n + r.scoredDays, 0),
            years: rows.map(r => r.year).sort(),
            earDays: rows.reduce((n, r) => n + r.earDays, 0)
        });
    }
    return out;
},

// Dec→Jan is 1 month apart, not 11. A naive abs(a - b) would split a winter peak spanning the year
// end into two unrelated seasons.
skinCircularMonthDistance(a, b) {
    const raw = Math.abs(a - b);
    return Math.min(raw, 12 - raw);
},

// Whether every WELL-COVERED year peaked at the same time of year, within one month. Needs at least
// two such years — a single year cannot repeat. A thinly-logged year has no peak of its own to
// disagree with and must not veto the finding.
skinPeakRepeatsAcrossYears(entries) {
    const byYear = this.skinMonthlyStatsByYear(entries);
    const years = [...new Set(byYear.map(r => r.year))].sort();
    const peaks = [];
    years.forEach(y => {
        const rows = byYear.filter(r => r.year === y);
        if (rows.length < SKIN_SEASONAL_GATE.minMonthsForYearPeak) return;
        let best = rows[0];
        rows.forEach(r => { if (r.mean > best.mean) best = r; });
        peaks.push(best.month);
    });
    if (peaks.length < 2) return false;
    for (const a of peaks) {
        for (const b of peaks) {
            if (this.skinCircularMonthDistance(a, b) > 1) return false;
        }
    }
    return true;
},

skinMonthName(m) {
    return ['January','February','March','April','May','June','July','August','September',
            'October','November','December'][m - 1] || '';
},

skinShortMonthName(m) {
    return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][m - 1] || '';
},

// "June", "June and July", or "June to August" when the peak months run consecutively.
skinMonthPhrase(months) {
    const sorted = (months || []).slice().sort((a, b) => a - b);
    if (!sorted.length) return '';
    if (sorted.length === 1) return this.skinMonthName(sorted[0]);
    const isRun = sorted.every((m, i) => i === 0 || m === sorted[i - 1] + 1);
    if (isRun) return `${this.skinMonthName(sorted[0])} to ${this.skinMonthName(sorted[sorted.length - 1])}`;
    const names = sorted.map(m => this.skinMonthName(m));
    return names.slice(0, -1).join(', ') + ' and ' + names[names.length - 1];
},

// Memoised wrapper for the templates. `skinSeasonalPattern` walks the whole log, and a template
// that called it directly would re-walk it for every binding on the panel. The cache key is the
// patient plus the log's length and last-modified stamp, so an edit invalidates it.
_skinPatternCache: null,

skinPattern() {
    const list = this.patientSkinLog();
    const key = `${this.activePatientId}|${list.length}|${list.map(e => e.id + ':' + e.itchScore + ':' + e.date + ':' + e.earStatus).join(',')}`;
    if (!this._skinPatternCache || this._skinPatternCache.key !== key) {
        this._skinPatternCache = { key, value: this.skinSeasonalPattern(list) };
    }
    return this._skinPatternCache.value;
},

// The seasonal read. Mirrors `SkinLogic.seasonalPattern` exactly, including every sentence.
skinSeasonalPattern(entries) {
    const list = entries || this.patientSkinLog();
    const monthly = this.skinMonthlyStats(list);
    const scored = list.filter(e => this._skinIsScored(e));
    const scoredDays = scored.length;
    const yearsCovered = new Set(scored.map(e => this._skinYear(e.date))).size;
    const monthsCovered = monthly.length;
    const means = monthly.map(m => m.mean);
    const amplitude = means.length ? Math.max(...means) - Math.min(...means) : 0;

    const base = { monthly, peakMonths: [], quietMonths: [], yearsCovered, monthsCovered,
                   scoredDays, amplitude, repeatsAcrossYears: false };

    // 1. Coverage floor.
    if (scoredDays < SKIN_SEASONAL_GATE.minScoredDays ||
        monthsCovered < SKIN_SEASONAL_GATE.minMonthsCovered) {
        return { ...base, confidence: 'insufficient',
                 headline: 'Not enough recorded yet to look for a yearly pattern',
                 detail: `You've scored ${scoredDays} day${scoredDays === 1 ? '' : 's'} across `
                       + `${monthsCovered} month${monthsCovered === 1 ? '' : 's'}. A yearly pattern only `
                       + 'becomes visible once there are records spread through the seasons — logging a '
                       + 'score once a week, even on the good weeks, is what makes the chart worth reading.' };
    }

    // 2. Is there a shape at all?
    if (amplitude < SKIN_SEASONAL_GATE.minAmplitude) {
        return { ...base, confidence: 'noPattern',
                 headline: 'No clear yearly pattern so far',
                 detail: 'Itch scores have been broadly similar through the months you\'ve recorded, so '
                       + 'nothing here points to one time of year being worse. Keep logging — patterns '
                       + 'often take a couple of years to show.' };
    }

    const top = Math.max(...means), bottom = Math.min(...means);
    const peakMonths = monthly.filter(m => m.mean >= top - SKIN_SEASONAL_GATE.peakTolerance)
                              .map(m => m.month).sort((a, b) => a - b);
    const quietMonths = monthly.filter(m => m.mean <= bottom + SKIN_SEASONAL_GATE.peakTolerance)
                               .map(m => m.month).sort((a, b) => a - b);
    const repeats = this.skinPeakRepeatsAcrossYears(list);

    // 3. A repeat across years is the only thing that earns the word "each year".
    if (yearsCovered >= 2 && repeats) {
        let detail = `Scores have peaked in ${this.skinMonthPhrase(peakMonths)} in each of the `
                   + `${yearsCovered} years recorded`;
        if (quietMonths.length) detail += `, and have been at their lowest in ${this.skinMonthPhrase(quietMonths)}`;
        detail += '. This is a pattern in your own records, not a diagnosis — there are several reasons '
                + "a pet's skin can follow the seasons, and telling them apart needs a vet. It is worth "
                + 'showing them this chart.';
        return { ...base, confidence: 'established', peakMonths, quietMonths,
                 repeatsAcrossYears: true,
                 headline: 'Itching has peaked around the same time each year', detail };
    }

    let detail = `Across the records so far, scores have been highest in ${this.skinMonthPhrase(peakMonths)}`;
    if (quietMonths.length) detail += ` and lowest in ${this.skinMonthPhrase(quietMonths)}`;
    detail += '. ';
    detail += yearsCovered >= 2
        ? "The peaks haven't landed at the same time of year yet, so this may not be seasonal. "
        : "That's one year of records, which isn't enough to call it seasonal — a single hot summer, "
        + 'a house move or a course of treatment would look the same. ';
    detail += 'Another year of logging will show whether it repeats.';
    return { ...base, confidence: 'emerging', peakMonths, quietMonths,
             headline: `Itching has been worst in ${this.skinMonthPhrase(peakMonths)}`, detail };
},

// Months where the ears were affected most often. Ear disease is counted separately because it
// recurs on its own rhythm and is usually what prompts the appointment.
skinEarMonths(entries) {
    const counts = {};
    (entries || []).forEach(e => {
        if (this.skinEarRank(e.earStatus) > 0) {
            const m = this._skinMonth(e.date);
            counts[m] = (counts[m] || 0) + 1;
        }
    });
    return Object.keys(counts).map(m => ({ month: Number(m), days: counts[m] }))
        .sort((a, b) => b.days - a.days || a.month - b.month);
},

skinEarSummary(entries) {
    const list = entries || this.patientSkinLog();
    const affected = list.filter(e => this.skinEarRank(e.earStatus) > 0);
    if (affected.length < 3) return '';
    const infected = affected.filter(e => e.earStatus === 'infected').length;
    let s = `Ears have been affected on ${affected.length} recorded day${affected.length === 1 ? '' : 's'}`;
    if (infected > 0) s += `, sore or discharging on ${infected} of them`;
    const months = this.skinEarMonths(list);
    if (months.length > 1 && months[0].days >= 3) s += `. Most often in ${this.skinMonthName(months[0].month)}`;
    return s + '.';
},

// The last month against the month before it — "is this getting worse?", answered without any claim
// about why.
skinRecentChange(entries) {
    const list = entries || this.patientSkinLog();
    const day = 86400000;
    const now = Date.now();
    const currentStart = now - 30 * day, previousStart = now - 60 * day;
    const scoresIn = (from, to) => list
        .filter(e => this._skinIsScored(e))
        .filter(e => { const t = new Date(e.date + 'T12:00:00Z').getTime(); return t > from && t <= to; })
        .map(e => Number(e.itchScore));
    const current = scoresIn(currentStart, now), previous = scoresIn(previousStart, currentStart);
    const mean = a => a.reduce((n, v) => n + v, 0) / a.length;
    const oneDP = v => (Math.round(v * 10) / 10).toString();

    if (!current.length) return 'Nothing scored in the last 30 days.';
    const c = mean(current);
    if (!previous.length) {
        return `Average ${oneDP(c)} out of 10 over the last 30 days. Nothing scored the month before to compare with.`;
    }
    const p = mean(previous);
    if (Math.abs(c - p) < 1) return `About the same as the month before (average ${oneDP(c)} out of 10).`;
    return c > p
        ? `Itchier than the month before — average ${oneDP(c)} out of 10, up from ${oneDP(p)}.`
        : `More settled than the month before — average ${oneDP(c)} out of 10, down from ${oneDP(p)}.`;
},

// Days on which each treatment was recorded, most-used first.
skinTreatmentDays(entries) {
    const list = entries || this.patientSkinLog();
    const counts = {};
    list.forEach(e => {
        [...new Set((e.treatments || []).filter(t => t !== 'none'))]
            .forEach(t => { counts[t] = (counts[t] || 0) + 1; });
    });
    return Object.keys(counts).map(t => ({ treatment: t, days: counts[t] }))
        .sort((a, b) => b.days - a.days || a.treatment.localeCompare(b.treatment));
},

// =================================================================================================
// LUMPS
// =================================================================================================
//
// Ported 1:1 from `Logic/LumpLogic.swift`.
//
// NOTHING HERE EVER REASSURES. There is no "benign", no "nothing to worry about", no "stable, no
// action needed". The worst outcome this app could produce is an owner reading a soothing sentence
// and cancelling an appointment: a lump that has not changed in six months can still be a mast cell
// tumour, and no measurement distinguishes one lump from another — only a needle does. Change is
// reported plainly and prompts a vet; ABSENCE of change is reported as an observation about the
// NUMBERS ("no measurable change since 4 March"), never as a verdict about the lump. If a change to
// this file makes it possible for the app to say a lump looks fine, that is a bug.
//
// The chart plots the GREATEST DIMENSION: it is what a vet records, and the most robust thing an
// owner can produce — which axis they call "length" varies between people and between weeks, but
// the longest way across a lump is the longest way across it. Area and volume were rejected;
// multiplying two shaky numbers squares the error.

patientLumps() {
    return (this.lumpLog || []).filter(l => l.patientId === this.activePatientId);
},

patientLumpMeasurements() {
    return (this.lumpMeasurements || []).filter(m => m.patientId === this.activePatientId);
},

lumpIsActive(status) { return status !== 'removed' && status !== 'resolved'; },

// Active first, then by when they appeared (newest first). Deliberately NOT ordered by how alarming
// the app thinks each one is — a ranking like that would be the app forming an opinion about which
// lump matters. Prompts sit on the row instead, where they can be read against the actual lump.
get sortedLumps() {
    return this.patientLumps().slice().sort((a, b) => {
        const aa = this.lumpIsActive(a.status), ba = this.lumpIsActive(b.status);
        if (aa !== ba) return aa ? -1 : 1;
        const da = (aa ? a.firstNoticed : a.resolvedDate) || a.createdAt || '';
        const db = (ba ? b.firstNoticed : b.resolvedDate) || b.createdAt || '';
        return db.localeCompare(da);
    });
},

// Oldest first — chart order, and the order every comparison assumes. `createdAt` breaks ties so
// two measurements on the same day keep the order they were taken in.
lumpMeasurementsFor(lumpId) {
    return (this.lumpMeasurements || [])
        .filter(m => m.lumpId === lumpId)
        .sort((a, b) => (a.date || '').localeCompare(b.date || '')
                     || (a.createdAt || '').localeCompare(b.createdAt || ''));
},

// The longest way across. Zero and negative values are not measurements — a stray 0 left in a field
// would otherwise draw a lump that vanished.
lumpGreatestMm(m) {
    const dims = [m.lengthMm, m.widthMm, m.depthMm]
        .map(v => Number(v)).filter(v => Number.isFinite(v) && v > 0);
    return dims.length ? Math.max(...dims) : null;
},

lumpNumberText(v) {
    const r = Math.round(Number(v) * 10) / 10;
    return Number.isInteger(r) ? String(r) : r.toFixed(1);
},

lumpMmText(mm) { return `${this.lumpNumberText(mm)} mm`; },

lumpSizeText(m) {
    const dims = [m.lengthMm, m.widthMm, m.depthMm]
        .map(v => Number(v)).filter(v => Number.isFinite(v) && v > 0);
    if (!dims.length) return 'Not measured';
    return dims.map(v => this.lumpNumberText(v)).join(' × ') + ' mm';
},

lumpGreatestText(m) {
    const mm = this.lumpGreatestMm(m);
    return mm === null ? 'Not measured' : `${this.lumpMmText(mm)} across`;
},

lumpSiteLabel(id) {
    const s = LUMP_SITES.find(x => x.id === id);
    return s ? s.label : (id ? id : 'Not recorded');
},

lumpStatusLabel(id) {
    const s = LUMP_STATUSES.find(x => x.id === id);
    return s ? s.label : LUMP_STATUSES[0].label;
},

lumpVetStageLabel(id) {
    const s = LUMP_VET_STAGES.find(x => x.id === id);
    return s ? s.label : LUMP_VET_STAGES[0].label;
},

lumpConsistencyLabel(id) {
    const c = LUMP_CONSISTENCIES.find(x => x.id === id);
    return c ? c.label : 'Not sure';
},

lumpMobilityLabel(id) {
    const m = LUMP_MOBILITIES.find(x => x.id === id);
    return m ? m.label : 'Not sure';
},

lumpSignLabel(id) {
    const s = LUMP_SIGNS.find(x => x.id === id);
    return s ? s.label : id;
},

lumpSignList(ids) { return (ids || []).map(id => this.lumpSignLabel(id)).join(', '); },

// "Left shoulder" — its own field rather than sixteen more site rows, and it matters: "the lump on
// her shoulder" is two different lumps if there is one on each side.
lumpLocationText(site, side) {
    const siteText = this.lumpSiteLabel(site);
    if (side === 'left')    return `Left ${siteText.toLowerCase()}`;
    if (side === 'right')   return `Right ${siteText.toLowerCase()}`;
    if (side === 'midline') return `${siteText} (middle)`;
    return siteText;
},

lumpDisplayName(l) {
    const label = (l.label || '').trim();
    if (label) return label;
    if (!l.site) return 'Unnamed lump';
    return this.lumpLocationText(l.site, l.side);
},

lumpLocationLine(l) {
    const parts = [];
    if (l.site) parts.push(this.lumpLocationText(l.site, l.side));
    const detail = (l.siteDetail || '').trim();
    if (detail) parts.push(detail);
    return parts.join(' · ');
},

lumpDaysBetween(a, b) {
    return (new Date(b + 'T12:00:00Z') - new Date(a + 'T12:00:00Z')) / 86400000;
},

// "3 months" / "6 weeks" / "9 days"
lumpSpanText(days) {
    const d = Math.abs(days);
    if (d < 14) { const n = Math.round(d); return `${n} day${n === 1 ? '' : 's'}`; }
    if (d < 60) { const n = Math.round(d / 7); return `${n} week${n === 1 ? '' : 's'}`; }
    const n = Math.round(d / 30.44);
    return `${n} month${n === 1 ? '' : 's'}`;
},

// Change between two measurements. A change must clear BOTH floors — an owner with a ruler on a
// furry lump is comfortably ±2 mm, and 3 mm on a golf-ball-sized mass is not growth.
lumpGrowth(earlier, later) {
    const a = this.lumpGreatestMm(earlier), b = this.lumpGreatestMm(later);
    if (a === null || b === null || a <= 0) return null;
    const days = this.lumpDaysBetween(earlier.date, later.date);
    const deltaMm = b - a;
    const relative = deltaMm / a;
    const meaningful = Math.abs(deltaMm) >= LUMP_GROWTH_GATE.minAbsoluteMm
                    && Math.abs(relative) >= LUMP_GROWTH_GATE.minRelative;
    const mmPerMonth = days > 0 ? deltaMm / days * 30 : null;
    return {
        fromDate: earlier.date, toDate: later.date, fromMm: a, toMm: b, deltaMm, relative, days,
        mmPerMonth, isMeaningful: meaningful,
        isGrowth: meaningful && deltaMm > 0,
        isShrinkage: meaningful && deltaMm < 0,
        isFast: meaningful && deltaMm > 0 && mmPerMonth !== null
                && mmPerMonth >= LUMP_GROWTH_GATE.fastMmPerMonth
    };
},

// First sized measurement to most recent. This is the headline figure: a lump gaining a millimetre
// a month shows nothing month to month and a great deal over a year.
lumpOverallGrowth(lumpId) {
    const sized = this.lumpMeasurementsFor(lumpId).filter(m => this.lumpGreatestMm(m) !== null);
    if (sized.length < 2) return null;
    return this.lumpGrowth(sized[0], sized[sized.length - 1]);
},

lumpLatestGrowth(lumpId) {
    const sized = this.lumpMeasurementsFor(lumpId).filter(m => this.lumpGreatestMm(m) !== null);
    if (sized.length < 2) return null;
    return this.lumpGrowth(sized[sized.length - 2], sized[sized.length - 1]);
},

// "grown 6 mm", "smaller by 4 mm", or "no measurable change" — note the third describes the
// MEASUREMENTS, not the lump.
lumpChangePhrase(g) {
    if (!g) return '';
    if (g.isGrowth) return `grown ${this.lumpMmText(g.deltaMm)}`;
    if (g.isShrinkage) return `smaller by ${this.lumpMmText(Math.abs(g.deltaMm))}`;
    return 'no measurable change';
},

lumpSummaryLine(l) {
    const mine = this.lumpMeasurementsFor(l.id);
    if (!mine.length) return 'No measurements yet';
    const last = mine[mine.length - 1];
    const parts = [];
    if (this.lumpGreatestMm(last) !== null) parts.push(this.lumpGreatestText(last));
    parts.push(this.allergyDayText(last.date));
    const overall = this.lumpOverallGrowth(l.id);
    if (overall) parts.push(this.lumpChangePhrase(overall));
    return parts.join(' · ');
},

lumpChangeSummary(l) {
    const sized = this.lumpMeasurementsFor(l.id).filter(m => this.lumpGreatestMm(m) !== null);
    if (!sized.length) return 'No measurements recorded yet.';
    if (sized.length < 2) {
        return `One measurement so far: ${this.lumpGreatestText(sized[0])} on ${this.allergyDayText(sized[0].date)}.`;
    }
    const g = this.lumpOverallGrowth(l.id);
    const span = this.lumpSpanText(g.days);
    if (g.isGrowth) {
        return `Grown from ${this.lumpMmText(g.fromMm)} to ${this.lumpMmText(g.toMm)} across over `
             + `${span} — ${this.lumpMmText(g.deltaMm)} larger.`;
    }
    if (g.isShrinkage) {
        return `Smaller over ${span} — from ${this.lumpMmText(g.fromMm)} to ${this.lumpMmText(g.toMm)} across.`;
    }
    return `Measured ${this.lumpMmText(g.toMm)} across on ${this.allergyDayText(g.toDate)}, against `
         + `${this.lumpMmText(g.fromMm)} on ${this.allergyDayText(g.fromDate)} — no measurable change over ${span}.`;
},

// Whether what the lump FEELS like has changed. "Not sure" is skipped at both ends: an owner who
// could not tell in March and could in June has discovered a ruler, not a change.
lumpCharacterChange(lumpId) {
    const mine = this.lumpMeasurementsFor(lumpId);
    const firstAndLast = (get) => {
        const known = mine.filter(m => get(m) && get(m) !== 'unsure');
        if (known.length < 2) return null;
        const from = get(known[0]), to = get(known[known.length - 1]);
        return from === to ? null : { from, to };
    };
    const parts = [];
    const c = firstAndLast(m => m.consistency);
    if (c) parts.push(`from ${this.lumpConsistencyLabel(c.from).toLowerCase()} to ${this.lumpConsistencyLabel(c.to).toLowerCase()}`);
    const mo = firstAndLast(m => m.mobility);
    if (mo) parts.push(`from "${this.lumpMobilityLabel(mo.from).toLowerCase()}" to "${this.lumpMobilityLabel(mo.to).toLowerCase()}"`);
    if (!parts.length) return '';
    return 'What it feels like has changed — ' + parts.join(', and ')
         + '. Worth mentioning at the next appointment.';
},

// Reasons to speak to a vet, and housekeeping nudges. An EMPTY list is not a verdict — every screen
// that shows these also shows LUMP_STANDING_NOTE, unconditionally.
lumpPrompts(l) {
    if (!this.lumpIsActive(l.status)) return [];   // nothing left to act on
    const out = [];
    const mine = this.lumpMeasurementsFor(l.id);
    const last = mine.length ? mine[mine.length - 1] : null;

    if (last) {
        const urgent = (last.signs || []).filter(s => LUMP_URGENT_SIGNS.includes(s));
        if (urgent.length) {
            out.push({ kind: 'urgentSign', clinical: true,
                text: `You recorded that it was ${this.lumpSignList(urgent).toLowerCase()} on `
                    + `${this.allergyDayText(last.date)}. That's worth a vet appointment rather than `
                    + 'waiting for the next measurement.' });
        }
    }

    const overall = this.lumpOverallGrowth(l.id);
    if (overall && overall.isGrowth) {
        out.push(overall.isFast
            ? { kind: 'grownFast', clinical: true,
                text: `It has grown ${this.lumpMmText(overall.deltaMm)} since `
                    + `${this.allergyDayText(overall.fromDate)} — about `
                    + `${this.lumpMmText(overall.mmPerMonth || 0)} a month. Let your vet know how quickly `
                    + 'this is changing.' }
            : { kind: 'grown', clinical: true,
                text: `It has grown ${this.lumpMmText(overall.deltaMm)} since `
                    + `${this.allergyDayText(overall.fromDate)} — from ${this.lumpMmText(overall.fromMm)} `
                    + `to ${this.lumpMmText(overall.toMm)} across. Worth mentioning to your vet.` });
    }

    const character = this.lumpCharacterChange(l.id);
    if (character) out.push({ kind: 'changedCharacter', clinical: true, text: character });

    if (l.vetStage === 'notSeen') {
        out.push({ kind: 'neverSeen', clinical: true,
            text: 'No vet has examined this one yet. Any new lump is worth having checked — how it '
                + "looks and feels can't tell you what it is." });
    }

    if (!mine.length) {
        out.push({ kind: 'neverMeasured', clinical: false,
            text: 'No measurements recorded yet. The first one is what everything afterwards gets '
                + 'compared against.' });
    } else if (last) {
        const days = (Date.now() - new Date(last.date + 'T12:00:00Z').getTime()) / 86400000;
        if (days >= LUMP_GROWTH_GATE.staleDays) {
            out.push({ kind: 'overdue', clinical: false,
                text: `Last measured ${this.allergyDayText(last.date)}, about ${this.lumpSpanText(days)} `
                    + 'ago. A fresh measurement keeps the chart useful.' });
        }
    }
    return out;
},

// One export line for one measurement — "3 May 2026 — 24 × 18 mm — firm — moves freely".
// Mirrors `LumpLogic.measurementReportLine` on iOS. Shared by the CSV and the PDF so the two
// cannot describe the same measurement differently.
lumpMeasurementReportLine(m) {
    let line = `${this.allergyDayText(m.date)} — ${this.lumpSizeText(m)}`;
    if (m.consistency && m.consistency !== 'unsure') line += ` — ${this.lumpConsistencyLabel(m.consistency)}`;
    if (m.mobility && m.mobility !== 'unsure') line += ` — ${this.lumpMobilityLabel(m.mobility)}`;
    if ((m.signs || []).length) line += ` — ${this.lumpSignList(m.signs)}`;
    // Photos are iOS-only, but an imported record can carry one — say so rather than losing it.
    if (m.photoFilename) line += ' — photo taken';
    if (m.notes) line += ` — ${m.notes}`;
    return line;
},

lumpCountSummary() {
    const lumps = this.patientLumps();
    if (!lumps.length) return '';
    const active = lumps.filter(l => this.lumpIsActive(l.status)).length;
    const inactive = lumps.length - active;
    const parts = [];
    if (active) parts.push(`${active} being monitored`);
    if (inactive) parts.push(`${inactive} removed or resolved`);
    return parts.join(' · ');
},

// One short line per lump for the collapsed Monitor card: what it is called and how big it was
// last measured. Mirrors `LumpLogic.cardLines` on iOS — change both together.
//
// The card used to show only "2 being monitored", which answers a question nobody has. The size is
// what an owner is checking the app FOR, and having to expand the panel and open a lump to see it
// is what made the measurements feel hidden.
//
// Deliberately NO growth phrase: on a summary line, stripped of the dates it was computed from,
// "grown 6 mm" reads as a verdict. That belongs on the row, next to the numbers it came from.
// Active lumps only — a removed lump's last size is history, not something to keep watching.
lumpCardLines(limit = 4) {
    return this.patientLumps()
        .filter(l => this.lumpIsActive(l.status))
        .slice()
        .sort((a, b) => ((b.firstNoticed || b.createdAt || '')
            .localeCompare(a.firstNoticed || a.createdAt || '')))
        .slice(0, limit)
        .map(l => {
            const mine = this.lumpMeasurementsFor(l.id);
            const last = mine.length ? mine[mine.length - 1] : null;
            if (!last || this.lumpGreatestMm(last) === null) {
                return `${this.lumpDisplayName(l)} — not measured yet`;
            }
            return `${this.lumpDisplayName(l)} — ${this.lumpGreatestText(last)}, `
                 + `${this.allergyDayText(last.date)}`;
        });
},

// "+ 2 more in the lump log" when there are more active lumps than the card shows, else ''.
lumpCardOverflowText(limit = 4) {
    const active = this.patientLumps().filter(l => this.lumpIsActive(l.status)).length;
    return active > limit ? `+ ${active - limit} more in the lump log` : '';
},

// --- Lump forms -----------------------------------------------------------------------------------

openLumpForm(id = null) {
    const existing = id ? this.patientLumps().find(l => l.id === id) : null;
    this.editingLumpId = id;
    this.newLump = existing
        ? { label: existing.label || '', site: existing.site || '', side: existing.side || '',
            siteDetail: existing.siteDetail || '', firstNoticed: existing.firstNoticed || '',
            status: existing.status || 'monitoring', vetStage: existing.vetStage || 'notSeen',
            vetDiagnosis: existing.vetDiagnosis || '', resolvedDate: existing.resolvedDate || '',
            notes: existing.notes || '',
            firstMeasure: { unit: 'mm', length: '', width: '', depth: '' } }
        : { label: '', site: '', side: '', siteDetail: '', firstNoticed: '', status: 'monitoring',
            vetStage: 'notSeen', vetDiagnosis: '', resolvedDate: '', notes: '',
            firstMeasure: { unit: 'mm', length: '', width: '', depth: '' } };
    this.showLumpForm = true;
},

// mm ↔ cm on the inline first measurement. RE-EXPRESSES what has been typed rather than
// reinterpreting it, so flipping to cm and back cannot silently turn 24 mm into 24 cm. Same rule
// as `setLumpMeasurementUnit` on the full form.
setNewLumpMeasureUnit(unit) {
    const fm = this.newLump.firstMeasure;
    if (!fm || unit === fm.unit) return;
    const factor = unit === 'cm' ? 0.1 : 10;
    ['length', 'width', 'depth'].forEach(k => {
        const v = Number(fm[k]);
        if (Number.isFinite(v) && fm[k] !== '') fm[k] = Math.round(v * factor * 100) / 100;
    });
    fm.unit = unit;
},

// Tap-to-fill a rough size ("about the size of a pea") into the inline first measurement.
setNewLumpMeasureReference(mm) {
    const fm = this.newLump.firstMeasure;
    if (!fm) return;
    fm.length = fm.unit === 'cm' ? mm / 10 : mm;
},

closeLumpForm() { this.showLumpForm = false; this.editingLumpId = null; },

saveLump() {
    if (!this.activePatientId) return;
    const l = this.newLump;
    const existing = this.editingLumpId ? (this.lumpLog || []).find(x => x.id === this.editingLumpId) : null;
    const active = this.lumpIsActive(l.status);
    const record = {
        id: this.editingLumpId || this.generateId(),
        patientId: this.activePatientId,
        label: (l.label || '').trim(),
        site: l.site || '',
        side: LUMP_SIDES.some(s => s.id === l.side) ? l.side : '',
        siteDetail: (l.siteDetail || '').trim(),
        // '' stays '' — "we don't know when it appeared" is the common answer, and defaulting to
        // today would fabricate how long the lump has been there.
        firstNoticed: l.firstNoticed || '',
        status: LUMP_STATUSES.some(s => s.id === l.status) ? l.status : 'monitoring',
        vetStage: LUMP_VET_STAGES.some(s => s.id === l.vetStage) ? l.vetStage : 'notSeen',
        vetDiagnosis: (l.vetDiagnosis || '').trim(),
        // A lump put back under observation must not keep the date it was removed.
        resolvedDate: active ? '' : (l.resolvedDate || ''),
        notes: (l.notes || '').trim(),
        createdAt: (existing && existing.createdAt) || new Date().toISOString()
    };
    const isNew = !this.editingLumpId;
    this.lumpLog = this.editingLumpId
        ? this.lumpLog.map(x => x.id === this.editingLumpId ? record : x)
        : [...(this.lumpLog || []), record];
    this.saveToStorage('vch_lumpLog', this.lumpLog);

    // The first measurement, if one was taken on the add form. Dated TODAY rather than
    // `firstNoticed`: the owner measured it now, and back-dating today's number to whenever they
    // first spotted it would invent a size for a day nobody measured.
    const fm = l.firstMeasure || {};
    const toMm = v => {
        const n = Number(v);
        if (!Number.isFinite(n) || n <= 0) return null;
        return fm.unit === 'cm' ? n * 10 : n;
    };
    const dims = { lengthMm: toMm(fm.length), widthMm: toMm(fm.width), depthMm: toMm(fm.depth) };
    if (isNew && (dims.lengthMm || dims.widthMm || dims.depthMm)) {
        this.lumpMeasurements = [...(this.lumpMeasurements || []), {
            id: this.generateId(),
            patientId: this.activePatientId,
            lumpId: record.id,
            date: new Date().toISOString().split('T')[0],
            ...dims,
            consistency: 'unsure',
            mobility: 'unsure',
            signs: [],
            photoFilename: '',
            notes: '',
            createdAt: new Date().toISOString()
        }];
        this.saveToStorage('vch_lumpMeasurements', this.lumpMeasurements);
    }
    this.closeLumpForm();
},

deleteLump(id) {
    if (!window.confirm('Delete this lump and all of its measurements? This cannot be undone.')) return;
    // The measurements go with it: a measurement whose lump has been deleted is a size with nothing
    // to be the size of.
    this.lumpMeasurements = (this.lumpMeasurements || []).filter(m => m.lumpId !== id);
    this.lumpLog = (this.lumpLog || []).filter(l => l.id !== id);
    this.saveToStorage('vch_lumpMeasurements', this.lumpMeasurements);
    this.saveToStorage('vch_lumpLog', this.lumpLog);
    if (this.viewingLumpId === id) this.viewingLumpId = null;
},

toggleLumpDetail(id) { this.viewingLumpId = this.viewingLumpId === id ? null : id; },

openLumpMeasureForm(lumpId, measurementId = null) {
    const existing = measurementId
        ? (this.lumpMeasurements || []).find(m => m.id === measurementId) : null;
    this.measuringLumpId = lumpId;
    this.editingMeasurementId = measurementId;
    this.newLumpMeasurement = existing
        ? { date: existing.date, unit: 'mm',
            length: existing.lengthMm ?? '', width: existing.widthMm ?? '', depth: existing.depthMm ?? '',
            consistency: existing.consistency || 'unsure', mobility: existing.mobility || 'unsure',
            signs: [...(existing.signs || [])], notes: existing.notes || '' }
        : { date: new Date().toISOString().split('T')[0], unit: 'mm', length: '', width: '', depth: '',
            consistency: 'unsure', mobility: 'unsure', signs: [], notes: '' };
    this.showLumpMeasureForm = true;
},

closeLumpMeasureForm() {
    this.showLumpMeasureForm = false;
    this.measuringLumpId = null;
    this.editingMeasurementId = null;
},

toggleLumpSign(id) {
    const list = this.newLumpMeasurement.signs || [];
    this.newLumpMeasurement.signs = list.includes(id)
        ? list.filter(x => x !== id) : list.concat(id);
},

// Switching mm↔cm RE-EXPRESSES what has been typed rather than reinterpreting it, so flipping to cm
// and back cannot silently turn 24 mm into 24 cm.
changeLumpUnit(unit) {
    if (unit === this.newLumpMeasurement.unit) return;
    const factor = unit === 'cm' ? 0.1 : 10;
    ['length', 'width', 'depth'].forEach(k => {
        const v = Number(this.newLumpMeasurement[k]);
        if (Number.isFinite(v) && this.newLumpMeasurement[k] !== '') {
            this.newLumpMeasurement[k] = Math.round(v * factor * 100) / 100;
        }
    });
    this.newLumpMeasurement.unit = unit;
},

useLumpSizeReference(mm) {
    const unit = this.newLumpMeasurement.unit;
    this.newLumpMeasurement.length = unit === 'cm' ? mm / 10 : mm;
},

saveLumpMeasurement() {
    if (!this.activePatientId || !this.measuringLumpId) return;
    const m = this.newLumpMeasurement;
    // Always stored in MILLIMETRES, whatever the owner typed in.
    const toMm = v => {
        const n = Number(v);
        if (!Number.isFinite(n) || n <= 0) return null;
        return m.unit === 'cm' ? n * 10 : n;
    };
    const existing = this.editingMeasurementId
        ? (this.lumpMeasurements || []).find(x => x.id === this.editingMeasurementId) : null;
    const record = {
        id: this.editingMeasurementId || this.generateId(),
        patientId: this.activePatientId,
        lumpId: this.measuringLumpId,
        date: m.date,
        lengthMm: toMm(m.length),
        widthMm: toMm(m.width),
        depthMm: toMm(m.depth),
        consistency: m.consistency || 'unsure',
        mobility: m.mobility || 'unsure',
        signs: [...(m.signs || [])],
        // Photos are an iOS-only feature: the web app has nowhere device-local to keep them and
        // they cannot ride in the JSON backup. The key exists so records round-trip unchanged.
        photoFilename: (existing && existing.photoFilename) || '',
        notes: (m.notes || '').trim(),
        createdAt: (existing && existing.createdAt) || new Date().toISOString()
    };
    // Deliberately NO one-per-day upsert: measuring twice in a day happens (once before the vet,
    // once after) and silently overwriting the first would destroy a reading.
    this.lumpMeasurements = this.editingMeasurementId
        ? this.lumpMeasurements.map(x => x.id === this.editingMeasurementId ? record : x)
        : [...(this.lumpMeasurements || []), record];
    this.saveToStorage('vch_lumpMeasurements', this.lumpMeasurements);
    this.closeLumpMeasureForm();
},

deleteLumpMeasurement(id) {
    if (!window.confirm('Delete this measurement?')) return;
    this.lumpMeasurements = (this.lumpMeasurements || []).filter(m => m.id !== id);
    this.saveToStorage('vch_lumpMeasurements', this.lumpMeasurements);
},

// ══ ORTHOPAEDICS: LAMENESS & JOINTS ═══════════════════════════════════════════════════════════
// Mirrors `OrthoLogic.swift` on iOS — change both together. Read the safety rule in the ORTHO_*
// block near the top of this file before touching a single sentence any of this produces.

// --- Catalogue lookups ---

orthoLegLabel(id)         { return (ORTHO_LEGS.find(x => x.id === id) || {}).label || id; },
orthoStiffnessLabel(id)   { return (ORTHO_STIFFNESS.find(x => x.id === id) || {}).label || id; },
orthoAggravatorLabel(id)  { return (ORTHO_AGGRAVATORS.find(x => x.id === id) || {}).label || id; },
orthoPainReliefLabel(id)  { return (ORTHO_PAIN_RELIEF.find(x => x.id === id) || {}).label || id; },
orthoManagementLabel(id)  { return (ORTHO_MANAGEMENTS.find(x => x.id === id) || {}).label || id; },
orthoCauseLabel(id)       { return (ORTHO_CAUSES.find(x => x.id === id) || {}).label || id; },
orthoChronicityLabel(id)  { return (ORTHO_CHRONICITIES.find(x => x.id === id) || {}).label || id; },
orthoVetStageLabel(id)    { return (ORTHO_VET_STAGES.find(x => x.id === id) || {}).label || id; },
orthoStatusLabel(id)      { return (ORTHO_STATUSES.find(x => x.id === id) || {}).label || id; },

orthoLamenessLabel(score) {
    const g = ORTHO_LAMENESS_SCALE.find(x => x.score === Number(score));
    return g ? g.label : 'Not scored';
},

orthoLamenessDetail(score) {
    const g = ORTHO_LAMENESS_SCALE.find(x => x.score === Number(score));
    return g ? g.detail : '';
},

// "2 — obvious, but using the leg". The one place the score and the words are joined, so screen,
// CSV and PDF cannot describe the same day differently.
orthoLamenessText(score) {
    if (score === null || score === undefined || score === '') return 'Not scored';
    return `${score} — ${this.orthoLamenessLabel(score).toLowerCase()}`;
},

// "Left back and Right back", or '' when none were ticked.
orthoLegList(ids) {
    const names = (ids || []).map(id => (ORTHO_LEGS.find(x => x.id === id) || {}).label).filter(Boolean);
    if (!names.length) return '';
    if (names.length === 1) return names[0];
    return names.slice(0, -1).join(', ') + ' and ' + names[names.length - 1];
},

orthoAggravatorList(ids) { return (ids || []).map(id => this.orthoAggravatorLabel(id)).join('; '); },
orthoPainReliefList(ids) { return (ids || []).map(id => this.orthoPainReliefLabel(id)).join('; '); },
orthoManagementList(ids) { return (ids || []).map(id => this.orthoManagementLabel(id)).join('; '); },

orthoIsActive(status) { return status !== 'resolved'; },

// A day that was actually SCORED. '' / null / absent means logged-but-unscored, which is NOT 0
// (sound) — treating them alike would invent good days out of missing ones and flatten the trend.
//
// All THREE spellings are checked on purpose. This app writes an explicit `null`; iOS omits the key
// entirely, because Swift's JSONEncoder drops a nil optional — so a backup restored from an iPhone
// arrives with `lamenessScore` UNDEFINED, not null. `''` is the unsaved form value. Verified against
// real exports from both platforms, 2026-08-02. Never coerce a missing score to a number.
_orthoIsScored(e) {
    return e && e.lamenessScore !== null && e.lamenessScore !== undefined && e.lamenessScore !== '';
},

// --- Filtering & ordering ---

patientOrthoConditions() {
    return (this.orthoConditions || []).filter(c => c.patientId === this.activePatientId);
},

patientOrthoLog() {
    return (this.orthoLog || []).filter(e => e.patientId === this.activePatientId);
},

// Active problems first, then by when they were first noticed (most recent first); resolved last.
//
// Deliberately NOT ordered by how bad the app thinks each one is — a ranking like that would be the
// app forming an opinion about which of a pet's problems matters.
get sortedOrthoConditions() {
    return this.patientOrthoConditions().slice().sort((a, b) => {
        const aa = this.orthoIsActive(a.status), ba = this.orthoIsActive(b.status);
        if (aa !== ba) return aa ? -1 : 1;
        const da = a.firstNoticed || a.createdAt || '';
        const db = b.firstNoticed || b.createdAt || '';
        return db.localeCompare(da);
    });
},

// One condition's days, oldest first — chart order, and the order every comparison assumes.
orthoEntriesFor(conditionId) {
    return this.patientOrthoLog()
        .filter(e => e.conditionId === conditionId)
        .sort((a, b) => (a.date || '').localeCompare(b.date || '')
                     || (a.createdAt || '').localeCompare(b.createdAt || ''));
},

orthoLatestEntry(conditionId) {
    const mine = this.orthoEntriesFor(conditionId);
    return mine.length ? mine[mine.length - 1] : null;
},

// Scored days only. Unscored days are ABSENT rather than plotted as zero.
orthoScoreSeries(conditionId) {
    return this.orthoEntriesFor(conditionId)
        .filter(e => this._orthoIsScored(e))
        .map(e => ({ date: e.date, score: Number(e.lamenessScore) }));
},

// The days a given pain relief was recorded as GIVEN — what makes "he was only comfortable while
// he was on the anti-inflammatory" visible. "Nothing today" is an answer, not a treatment.
orthoPainReliefDays(conditionId) {
    const counts = {};
    this.orthoEntriesFor(conditionId).forEach(e => {
        (e.painReliefGiven || []).forEach(t => {
            if (t !== 'none') counts[t] = (counts[t] || 0) + 1;
        });
    });
    return Object.keys(counts)
        .map(t => ({ treatment: t, days: counts[t] }))
        .sort((a, b) => b.days - a.days || a.treatment.localeCompare(b.treatment));
},

// The lameness score and that day's walking, paired for the chart.
//
// Days with a score but no activity record are KEPT with `mins` null — the score is still a real
// observation. Days with activity but no score are dropped: there is nothing to plot them against.
//
// This does NOT, and must not, adjust the score for the activity.
orthoActivityPairs(conditionId) {
    const byDay = {};
    (this.activityLog || [])
        .filter(a => a.patientId === this.activePatientId)
        .forEach(a => { byDay[(a.date || '').split('T')[0]] = a.durationMins ?? null; });
    return this.orthoScoreSeries(conditionId).map(p => ({
        date: p.date, score: p.score, mins: byDay[(p.date || '').split('T')[0]] ?? null
    }));
},

// --- The recent read ---
//
// States what was RECORDED. Nothing more. Note what it deliberately does NOT do: it does not
// compare with the previous fortnight and announce an improvement. "Better than last week" is a
// clinical judgement about an animal from a handful of numbers an owner eyeballed, and getting it
// wrong in the reassuring direction is the failure that keeps a limping dog at home.
orthoRecentRead(conditionId) {
    const cutoff = new Date(Date.now() - ORTHO_RECENT_WINDOW_DAYS * 864e5)
        .toISOString().split('T')[0];
    const scored = this.orthoEntriesFor(conditionId)
        .filter(e => (e.date || '') >= cutoff && this._orthoIsScored(e))
        .map(e => Number(e.lamenessScore));

    if (!scored.length) {
        return { scoredDays: 0, badDays: 0, mean: null, worthRaising: false,
                 text: `No lameness scores in the last ${ORTHO_RECENT_WINDOW_DAYS} days.` };
    }

    const bad = scored.filter(v => v >= ORTHO_BAD_DAY_SCORE).length;
    const mean = scored.reduce((n, v) => n + v, 0) / scored.length;
    const dayWord = scored.length === 1 ? 'day' : 'days';
    let text = `Scored on ${scored.length} ${dayWord} in the last ${ORTHO_RECENT_WINDOW_DAYS}, `
             + `averaging ${this.orthoScoreText(mean)} out of 4.`;
    let raise = false;
    if (bad >= ORTHO_BAD_DAY_FLOOR) {
        text += ` ${bad} of those were ${ORTHO_BAD_DAY_SCORE} or worse — worth showing your vet.`;
        raise = true;
    }
    return { scoredDays: scored.length, badDays: bad, mean, worthRaising: raise, text };
},

// "2" / "2.4" — one decimal place, no trailing ".0".
orthoScoreText(value) {
    const rounded = Math.round(value * 10) / 10;
    return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
},

// --- Wording ---

orthoDisplayName(c) {
    const label = (c.label || '').trim();
    if (label) return label;
    const legs = this.orthoLegList(c.legs);
    return legs || 'Lameness';
},

orthoSubtitle(c) {
    return [this.orthoLegList(c.legs),
            c.chronicity === 'unsure' ? '' : this.orthoChronicityLabel(c.chronicity)]
        .filter(Boolean).join(' · ');
},

orthoSummaryLine(c) {
    const last = this.orthoLatestEntry(c.id);
    if (!last) return 'No days logged yet';
    const scorePart = this._orthoIsScored(last)
        ? this.orthoLamenessText(last.lamenessScore) : 'logged, not scored';
    return `${scorePart} · ${this.allergyDayText(last.date)}`;
},

// One short line per problem for the collapsed Monitor card.
//
// Active problems only, and deliberately NO trend phrase: on a summary card, stripped of the dates
// it came from, "getting worse" reads as a verdict. The recent read lives on the log panel where
// the numbers behind it are visible.
orthoCardLines(limit = 3) {
    return this.sortedOrthoConditions
        .filter(c => this.orthoIsActive(c.status))
        .slice(0, limit)
        .map(c => `${this.orthoDisplayName(c)} — ${this.orthoSummaryLine(c)}`);
},

orthoCountSummary() {
    const list = this.patientOrthoConditions();
    if (!list.length) return '';
    const active = list.filter(c => this.orthoIsActive(c.status)).length;
    const inactive = list.length - active;
    const parts = [];
    if (active) parts.push(`${active} being monitored`);
    if (inactive) parts.push(`${inactive} resolved`);
    return parts.join(' · ');
},

// One export line for a condition — its own facts only, no interpretation.
orthoConditionReportLine(c) {
    let line = this.orthoDisplayName(c);
    const legs = this.orthoLegList(c.legs);
    // Only when the name is NOT already the legs. An unnamed condition falls back to its legs
    // (`orthoDisplayName`), and appending them again gave "Left back and Right back — Left back and
    // Right back" on every row of the export.
    if (legs && line !== legs) line += ` — ${legs}`;
    line += ` — ${this.orthoStatusLabel(c.status)}`;
    line += ` — ${this.orthoChronicityLabel(c.chronicity)}`;
    line += ` — ${this.orthoVetStageLabel(c.vetStage)}`;
    // Worded as what the owner was TOLD, so a vet reading the export cannot mistake it for the
    // app's own conclusion.
    if (c.suspectedCause && c.suspectedCause !== 'unknown') {
        line += ` — recorded as: ${this.orthoCauseLabel(c.suspectedCause)}`;
    }
    if (c.firstNoticed) line += ` — first noticed ${this.allergyDayText(c.firstNoticed)}`;
    if (c.vetDiagnosis) line += ` — vet's note: ${c.vetDiagnosis}`;
    if (c.painReliefPlan) line += ` — pain relief: ${c.painReliefPlan}`;
    if ((c.management || []).length) line += ` — ${this.orthoManagementList(c.management)}`;
    if (c.notes) line += ` — ${c.notes}`;
    return line;
},

// One export line for one day.
orthoEntryReportLine(e) {
    let line = `${this.allergyDayText(e.date)} — ${this.orthoLamenessText(this._orthoIsScored(e) ? e.lamenessScore : null)}`;
    const legs = this.orthoLegList(e.legs);
    if (legs) line += ` — ${legs}`;
    if (e.stiffnessOnRising && e.stiffnessOnRising !== 'unsure') {
        line += ` — ${this.orthoStiffnessLabel(e.stiffnessOnRising)}`;
    }
    if ((e.worseAfter || []).length) line += ` — worse ${this.orthoAggravatorList(e.worseAfter)}`;
    if ((e.painReliefGiven || []).length) line += ` — given: ${this.orthoPainReliefList(e.painReliefGiven)}`;
    if (e.painReliefNotes) line += ` (${e.painReliefNotes})`;
    if (e.vetVisit) line += ' — seen by a vet';
    if (e.notes) line += ` — ${e.notes}`;
    return line;
},

// --- Forms & CRUD ---

openOrthoConditionForm(id = null) {
    const existing = id ? this.patientOrthoConditions().find(c => c.id === id) : null;
    this.editingOrthoConditionId = id;
    this.newOrthoCondition = existing
        ? { label: existing.label || '', legs: [...(existing.legs || [])],
            suspectedCause: existing.suspectedCause || 'unknown',
            vetDiagnosis: existing.vetDiagnosis || '', chronicity: existing.chronicity || 'unsure',
            firstNoticed: existing.firstNoticed || '', vetStage: existing.vetStage || 'notSeen',
            painReliefPlan: existing.painReliefPlan || '',
            management: [...(existing.management || [])],
            status: existing.status || 'active', notes: existing.notes || '' }
        : { label: '', legs: [], suspectedCause: 'unknown', vetDiagnosis: '', chronicity: 'unsure',
            firstNoticed: '', vetStage: 'notSeen', painReliefPlan: '', management: [],
            status: 'active', notes: '' };
    this.showOrthoConditionForm = true;
},

closeOrthoConditionForm() {
    this.showOrthoConditionForm = false;
    this.editingOrthoConditionId = null;
},

toggleOrthoConditionLeg(id) {
    const list = this.newOrthoCondition.legs || [];
    this.newOrthoCondition.legs = list.includes(id) ? list.filter(x => x !== id) : [...list, id];
},

toggleOrthoManagement(id) {
    const list = this.newOrthoCondition.management || [];
    this.newOrthoCondition.management = list.includes(id) ? list.filter(x => x !== id) : [...list, id];
},

saveOrthoCondition() {
    if (!this.activePatientId) return;
    const c = this.newOrthoCondition;
    const existing = this.editingOrthoConditionId
        ? (this.orthoConditions || []).find(x => x.id === this.editingOrthoConditionId) : null;
    const record = {
        id: this.editingOrthoConditionId || this.generateId(),
        patientId: this.activePatientId,
        label: (c.label || '').trim(),
        legs: (c.legs || []).filter(id => ORTHO_LEGS.some(l => l.id === id)),
        suspectedCause: ORTHO_CAUSES.some(x => x.id === c.suspectedCause) ? c.suspectedCause : 'unknown',
        vetDiagnosis: (c.vetDiagnosis || '').trim(),
        chronicity: ORTHO_CHRONICITIES.some(x => x.id === c.chronicity) ? c.chronicity : 'unsure',
        // '' stays '' — plenty of arthritis has no start date, and defaulting to today would
        // fabricate how long it has been going on.
        firstNoticed: c.firstNoticed || '',
        vetStage: ORTHO_VET_STAGES.some(x => x.id === c.vetStage) ? c.vetStage : 'notSeen',
        painReliefPlan: (c.painReliefPlan || '').trim(),
        management: (c.management || []).filter(id => ORTHO_MANAGEMENTS.some(m => m.id === id)),
        status: ORTHO_STATUSES.some(x => x.id === c.status) ? c.status : 'active',
        notes: (c.notes || '').trim(),
        createdAt: (existing && existing.createdAt) || new Date().toISOString()
    };
    this.orthoConditions = this.editingOrthoConditionId
        ? this.orthoConditions.map(x => x.id === this.editingOrthoConditionId ? record : x)
        : [...(this.orthoConditions || []), record];
    this.saveToStorage('vch_orthoConditions', this.orthoConditions);
    this.closeOrthoConditionForm();
},

deleteOrthoCondition(id) {
    if (!window.confirm('Delete this problem and all of its daily scores? This cannot be undone.')) return;
    // The days go with it: a score whose condition has been deleted is a lameness grade with
    // nothing to be a grade of.
    this.orthoLog = (this.orthoLog || []).filter(e => e.conditionId !== id);
    this.orthoConditions = (this.orthoConditions || []).filter(c => c.id !== id);
    this.saveToStorage('vch_orthoLog', this.orthoLog);
    this.saveToStorage('vch_orthoConditions', this.orthoConditions);
    if (this.viewingOrthoConditionId === id) this.viewingOrthoConditionId = null;
},

toggleOrthoConditionDetail(id) {
    this.viewingOrthoConditionId = this.viewingOrthoConditionId === id ? null : id;
},

openOrthoEntryForm(conditionId, entryId = null) {
    const condition = this.patientOrthoConditions().find(c => c.id === conditionId);
    if (!condition) return;
    this.scoringOrthoConditionId = conditionId;
    this.editingOrthoEntryId = entryId;
    const existing = entryId ? (this.orthoLog || []).find(e => e.id === entryId) : null;
    this.newOrthoEntry = existing
        ? { date: existing.date, lamenessScore: this._orthoIsScored(existing) ? existing.lamenessScore : '',
            legs: [...(existing.legs || [])],
            stiffnessOnRising: existing.stiffnessOnRising || 'unsure',
            worseAfter: [...(existing.worseAfter || [])],
            painReliefGiven: [...(existing.painReliefGiven || [])],
            painReliefNotes: existing.painReliefNotes || '',
            vetVisit: !!existing.vetVisit, notes: existing.notes || '' }
        // A new day starts with the condition's own legs pre-ticked: on most days it is the same
        // leg, and re-ticking it every time is the friction that stops people logging.
        : { date: new Date().toISOString().split('T')[0], lamenessScore: '',
            legs: [...(condition.legs || [])], stiffnessOnRising: 'unsure', worseAfter: [],
            painReliefGiven: [], painReliefNotes: '', vetVisit: false, notes: '' };
    this.showOrthoEntryForm = true;
},

closeOrthoEntryForm() {
    this.showOrthoEntryForm = false;
    this.editingOrthoEntryId = null;
    this.scoringOrthoConditionId = null;
},

toggleOrthoEntryField(field, id) {
    const list = this.newOrthoEntry[field] || [];
    this.newOrthoEntry[field] = list.includes(id) ? list.filter(x => x !== id) : [...list, id];
},

saveOrthoEntry() {
    if (!this.activePatientId || !this.scoringOrthoConditionId) return;
    const e = this.newOrthoEntry;
    // An unscored day stays unscored. Writing 0 would turn "logged, not scored" into "sound".
    const raw = Number(e.lamenessScore);
    const score = (e.lamenessScore === '' || e.lamenessScore === null || !Number.isFinite(raw)
                   || raw < 0 || raw > 4) ? null : raw;

    // One record per day PER CONDITION — saving over an existing day replaces it, the same upsert
    // the cough, activity and skin logs use.
    const existing = this.editingOrthoEntryId
        ? (this.orthoLog || []).find(x => x.id === this.editingOrthoEntryId)
        : (this.orthoLog || []).find(x => x.patientId === this.activePatientId
                                       && x.conditionId === this.scoringOrthoConditionId
                                       && x.date === e.date);
    const record = {
        id: (existing && existing.id) || this.generateId(),
        patientId: this.activePatientId,
        conditionId: this.scoringOrthoConditionId,
        date: e.date,
        lamenessScore: score,
        legs: (e.legs || []).filter(id => ORTHO_LEGS.some(l => l.id === id)),
        stiffnessOnRising: ORTHO_STIFFNESS.some(x => x.id === e.stiffnessOnRising) ? e.stiffnessOnRising : 'unsure',
        worseAfter: (e.worseAfter || []).filter(id => ORTHO_AGGRAVATORS.some(a => a.id === id)),
        painReliefGiven: (e.painReliefGiven || []).filter(id => ORTHO_PAIN_RELIEF.some(p => p.id === id)),
        painReliefNotes: (e.painReliefNotes || '').trim(),
        vetVisit: !!e.vetVisit,
        notes: (e.notes || '').trim(),
        createdAt: (existing && existing.createdAt) || new Date().toISOString()
    };
    this.orthoLog = existing
        ? this.orthoLog.map(x => x.id === existing.id ? record : x)
        : [...(this.orthoLog || []), record];
    this.saveToStorage('vch_orthoLog', this.orthoLog);
    this.closeOrthoEntryForm();
},

deleteOrthoEntry(id) {
    if (!window.confirm('Delete this day?')) return;
    this.orthoLog = (this.orthoLog || []).filter(e => e.id !== id);
    this.saveToStorage('vch_orthoLog', this.orthoLog);
},

echoDisplayName(r) {
    const m = this.echoMeasure(r.measureId);
    if (m) return m.label;
    const custom = (r.customName || '').trim();
    return custom || (r.measureId === ECHO_OTHER_ID ? 'Other measurement' : (r.measureId || 'Measurement'));
},

echoShortName(measureId) {
    const m = this.echoMeasure(measureId);
    return m ? m.short : measureId;
},

// Centimetres for the allometric formulas. Returns null for anything not positively recognised —
// an unlabelled number could be cm or mm, and guessing is a factor-of-ten error in the index.
echoCentimetres(value, unit) {
    const u = String(unit || '').trim().toLowerCase();
    const v = Number(value);
    if (!isFinite(v)) return null;
    if (['cm', 'cms', 'centimetre', 'centimetres', 'centimeter', 'centimeters'].includes(u)) return v;
    if (['mm', 'mms', 'millimetre', 'millimetres', 'millimeter', 'millimeters'].includes(u)) return v / 10;
    return null;
},

echoMillilitres(value, unit) {
    const u = String(unit || '').trim().toLowerCase();
    const v = Number(value);
    if (!isFinite(v)) return null;
    if (['ml', 'mls', 'millilitre', 'millilitres', 'milliliter', 'milliliters', 'cc'].includes(u)) return v;
    if (['l', 'litre', 'litres', 'liter', 'liters'].includes(u)) return v * 1000;
    return null;
},

// This patient's echo rows, newest study first.
patientEchoMeasurements() {
    return (this.echoMeasurements || [])
        .filter(e => e.patientId === this.activePatientId)
        .sort((a, b) => new Date(b.studyDate) - new Date(a.studyDate));
},

// Rows grouped back into the studies they came from.
echoStudies() {
    const groups = {};
    this.patientEchoMeasurements().forEach(r => {
        const key = `${r.studyDate}|${r.centreName || ''}`;
        (groups[key] = groups[key] || []).push(r);
    });
    const order = Object.fromEntries(ECHO_MEASURES.map((m, i) => [m.id, i]));
    return Object.entries(groups).map(([key, rows]) => ({
        key,
        studyDate: rows[0].studyDate,
        centreName: rows[0].centreName || '',
        rows: [...rows].sort((a, b) => (order[a.measureId] ?? 99) - (order[b.measureId] ?? 99))
    })).sort((a, b) => new Date(b.studyDate) - new Date(a.studyDate));
},

// Body weight in KILOGRAMS on or before a study date. Patients can be stored in pounds, so this
// converts — the formulas take kg and nothing else.
echoWeightKgAt(dateStr) {
    const target = new Date(dateStr);
    const mine = (this.weightLog || [])
        .filter(w => w.patientId === this.activePatientId && w.weightValue !== '' && w.weightValue !== null && isFinite(Number(w.weightValue)))
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    if (!mine.length) return null;
    const before = mine.filter(w => new Date(w.date) <= target);
    const chosen = before.length ? before[before.length - 1] : mine[mine.length - 1];
    const raw = Number(chosen.weightValue);
    const unit = (this.activePatientProfile && this.activePatientProfile.weightUnit) || 'kg';
    return { kg: unit === 'lbs' ? raw / 2.20462 : raw, date: chosen.date };
},

// Everything derivable from one study, including the reason an index could NOT be worked out —
// "add a weight" and "the units are missing" are different problems with different fixes.
echoDerived(study) {
    const val = id => {
        const row = study.rows.find(r => r.measureId === id);
        return row ? { value: Number(row.value), unit: row.unit || '' } : null;
    };
    const w = this.echoWeightKgAt(study.studyDate);
    const kg = w ? w.kg : null;
    const out = [];

    // LA:Ao — printed if the report gave it, else computed from LA and Ao.
    const printed = val('laao');
    let ratio = printed ? printed.value : null;
    let computed = false;
    if (ratio === null) {
        const la = val('la'), ao = val('ao');
        if (la && ao) {
            const laCm = this.echoCentimetres(la.value, la.unit), aoCm = this.echoCentimetres(ao.value, ao.unit);
            if (laCm && aoCm > 0) { ratio = laCm / aoCm; computed = true; }
        }
    }
    out.push({ id: 'laao', label: 'LA:Ao', value: ratio, computed,
               band: this.echoBand('laao', ratio), formula: 'LA ÷ Ao',
               reason: ratio === null ? 'Record LA:Ao, or both LA and Ao in the same units.' : null });

    const scaled = (id, label, measure, formula, convert, unitHint) => {
        const m = val(measure);
        if (!m) return { id, label, value: null, band: 'unknown', formula,
                         reason: `Record ${this.echoShortName(measure)} for this study.` };
        if (!kg || kg <= 0) return { id, label, value: null, band: 'unknown', formula,
                         reason: 'Add a weight on or before the study date — this index is scaled to body weight.' };
        const base = convert(m.value, m.unit);
        if (base === null) return { id, label, value: null, band: 'unknown', formula,
                         reason: `The units recorded for ${this.echoShortName(measure)} (${m.unit || 'none'}) can't be scaled from — set them to ${unitHint}.` };
        const v = id === 'lvedvPerKg' ? base / kg
                : base / Math.pow(kg, id === 'lviddn' ? ECHO_LVIDD_EXPONENT : ECHO_LAD_EXPONENT);
        return { id, label, value: v, band: this.echoBand(id, v), formula, reason: null };
    };

    out.push(scaled('ladn', 'LADN (weight-scaled LAD)', 'lad',
                    `LAD (cm) ÷ weight (kg)^${ECHO_LAD_EXPONENT}`, (v, u) => this.echoCentimetres(v, u), 'cm or mm'));
    out.push(scaled('lviddn', 'LVIDDN (weight-scaled LVIDd)', 'lvidd',
                    `LVIDd (cm) ÷ weight (kg)^${ECHO_LVIDD_EXPONENT}`, (v, u) => this.echoCentimetres(v, u), 'cm or mm'));
    out.push(scaled('lvedvPerKg', 'LVEDV per kg', 'lvedv',
                    'LVEDV (mL) ÷ weight (kg)', (v, u) => this.echoMillilitres(v, u), 'mL'));
    return out;
},

// Published bands — the same numbers as the echo calculator.
echoBand(id, v) {
    if (v === null || v === undefined || !isFinite(v) || v <= 0) return 'unknown';
    if (id === 'lviddn') {
        if (v >= 1.85) return 'enlarged';
        if (v >= 1.7) return 'borderline';
        if (v >= 1.27) return 'normal';
        return 'underfilled';
    }
    if (id === 'ladn') return v > 1.6 ? 'enlarged' : 'normal';
    if (id === 'laao') return v >= 1.6 ? 'enlarged' : 'normal';
    if (id === 'lvedvPerKg') {
        const sight = this.echoIsSighthound();
        const low = sight ? 1.92 : 1.25, high = sight ? 4.17 : 3.27;
        if (v >= high) return 'enlarged';
        if (v < low) return 'underfilled';
        return 'normal';
    }
    return 'unknown';
},

// Sighthounds have a genuinely different normal LVEDV/kg range — checked against an explicit list,
// and only for that one band.
echoIsSighthound() {
    const b = ((this.activePatientProfile && this.activePatientProfile.breed) || '').toLowerCase();
    return ['greyhound', 'whippet', 'saluki', 'borzoi', 'deerhound', 'wolfhound', 'afghan', 'lurcher', 'sighthound']
        .some(x => b.includes(x));
},

// Change in the RAW measurement since the previous study, e.g. "+1.4 mm". Only when the two were
// reported in the SAME unit — a mm→cm switch between centres would otherwise read as a collapse.
// Direction only; no interpretation.
echoChangeSincePrevious(row) {
    const history = (this.echoMeasurements || [])
        .filter(e => e.patientId === this.activePatientId
                  && e.measureId === row.measureId
                  && (e.customName || '') === (row.customName || ''))
        .sort((a, b) => new Date(a.studyDate) - new Date(b.studyDate));
    const idx = history.findIndex(e => e.id === row.id);
    if (idx <= 0) return '';
    const prev = history[idx - 1];
    if ((prev.unit || '') !== (row.unit || '')) return '';
    const delta = Number(row.value) - Number(prev.value);
    if (!isFinite(delta)) return '';
    if (Math.abs(delta) < 0.0001) return 'no change';
    const sign = delta > 0 ? '+' : '−';
    return `${sign}${this.trimBloodNumber(Math.abs(delta))}${row.unit ? ' ' + row.unit : ''}`;
},

echoBandLabel(band) {
    return { underfilled: 'Small', normal: 'Normal', borderline: 'Borderline', enlarged: 'Enlarged', unknown: '—' }[band] || '';
},
// Amber for noteworthy, not red — an enlarged chamber is a conversation with the vet.
echoBandColour(band) {
    return { underfilled: '#d97706', normal: '#16a34a', borderline: '#ca8a04', enlarged: '#d97706', unknown: '#94a3b8' }[band] || '#94a3b8';
},
echoFormatIndex(v) { return (v === null || v === undefined || !isFinite(v)) ? '' : Number(v).toFixed(2); },

// The EPIC trial's echocardiographic criteria for stage B2: a murmur of at least grade 3/6 WITH
// LA:Ao >= 1.6 AND LVIDDN >= 1.7. Reported as "meets the criteria the EPIC trial used", never as a
// stage — a missing input gives null (unknown), which must never read as "does not meet".
echoEpic(study) {
    const d = this.echoDerived(study);
    const laao = d.find(x => x.id === 'laao')?.value ?? null;
    const lviddn = d.find(x => x.id === 'lviddn')?.value ?? null;
    const murmur = this.echoLatestMurmurGrade();
    const flags = [
        laao === null ? null : laao >= 1.6,
        lviddn === null ? null : lviddn >= 1.7,
        murmur === null ? null : murmur >= 3
    ];
    const missing = [];
    if (flags[0] === null) missing.push('LA:Ao');
    if (flags[1] === null) missing.push('LVIDDN (needs LVIDd, its units, and a weight)');
    if (flags[2] === null) missing.push('a recorded murmur grade');
    let meets = null;
    if (flags.some(f => f === false)) meets = false;
    else if (!flags.some(f => f === null)) meets = true;
    return { meets, missing };
},

echoLatestMurmurGrade() {
    const entry = this.sortedDiagnosisLog()
        .filter(d => d.diagnosis !== 'Concurrent Conditions Only')
        .find(d => d.murmurGrade && parseInt(d.murmurGrade, 10) >= 0 && !isNaN(parseInt(d.murmurGrade, 10)));
    if (!entry) return null;
    const n = parseInt(entry.murmurGrade, 10);
    return isNaN(n) ? null : n;
},

// --- Form (a whole study at a time: an echo report always carries the same handful of numbers) ---

openEchoForm(study = null) {
    const values = blankEchoValues();
    if (study) {
        study.rows.forEach(r => { values[r.measureId] = { value: r.value, unit: r.unit || '' }; });
        this.newEchoStudy = {
            studyDate: String(study.studyDate).split('T')[0],
            centreName: study.centreName || '',
            notes: (study.rows.find(r => r.notes) || {}).notes || '',
            values
        };
        this.editingEchoKey = study.key;
    } else {
        this.newEchoStudy = {
            studyDate: new Date().toISOString().split('T')[0],
            centreName: '', notes: '', values
        };
        this.editingEchoKey = null;
    }
    this.showEchoForm = true;
},

echoFormEnteredCount() {
    return Object.values(this.newEchoStudy.values || {}).filter(v => v.value !== '' && isFinite(Number(v.value))).length;
},

// Live preview so the owner sees the consequence of a unit choice BEFORE saving — the cm/mm mistake
// shows up here as an absurd index.
echoFormPreview() {
    const rows = ECHO_MEASURES
        .filter(m => { const v = this.newEchoStudy.values[m.id]; return v && v.value !== '' && isFinite(Number(v.value)); })
        .map(m => ({ measureId: m.id, value: Number(this.newEchoStudy.values[m.id].value),
                     unit: this.newEchoStudy.values[m.id].unit || '' }));
    return this.echoDerived({ studyDate: this.newEchoStudy.studyDate, rows }).filter(d => d.value !== null);
},

saveEchoStudy() {
    if (this.echoFormEnteredCount() === 0) return alert('Enter at least one measurement.');
    const date = this.newEchoStudy.studyDate;
    const centre = (this.newEchoStudy.centreName || '').trim();

    // Editing replaces the study's rows wholesale, so a value cleared to blank disappears — an
    // update-in-place loop would silently keep it.
    if (this.editingEchoKey) {
        this.echoMeasurements = this.echoMeasurements.filter(
            e => `${e.studyDate}|${e.centreName || ''}` !== this.editingEchoKey || e.patientId !== this.activePatientId);
    }
    ECHO_MEASURES.forEach(m => {
        const entry = this.newEchoStudy.values[m.id];
        if (!entry || entry.value === '' || !isFinite(Number(entry.value))) return;
        this.echoMeasurements.push({
            id: this.generateId(),
            patientId: this.activePatientId,
            studyDate: date,
            measureId: m.id,
            customName: '',
            value: Number(entry.value),
            unit: entry.unit || '',
            refLow: null,
            refHigh: null,
            centreName: centre,
            notes: this.newEchoStudy.notes || ''
        });
    });
    this.saveToStorage('vch_echoMeasurements', this.echoMeasurements);
    this.showEchoForm = false;
    this.editingEchoKey = null;
},

deleteEchoStudy(key) {
    if (!confirm('Delete this echo study and all its measurements?')) return;
    this.echoMeasurements = this.echoMeasurements.filter(
        e => `${e.studyDate}|${e.centreName || ''}` !== key || e.patientId !== this.activePatientId);
    this.saveToStorage('vch_echoMeasurements', this.echoMeasurements);
},

// --- Paste a report (the web's equivalent of the iOS PDF import) ---
//
// The browser cannot read an image-only PDF the way iOS can (that needs OCR), so the web path is:
// the owner selects the text of their report — or opens the PDF and copies it — and pastes it here.
// The GRAMMAR below is the same one iOS uses on PDF text, so both platforms read the same reports
// the same way. See BACKLOG §3j.

// The lines of the two biggest UK labs disagree about column order:
//   VPG    "Creatinine 74 umol/L 40 - 125"           name, value, UNIT, range
//   IDEXX  "Creatinine | 80.0 | 44.0 - 133.0 umol/L" name, value, range, UNIT
// so this reads name → number → (range and unit in either order).
parseBloodLine(raw) {
    const line = String(raw).replace(/\|/g, ' ').trim();
    if (line.length < 3) return null;
    const lower = line.toLowerCase();
    const skip = ['page', 'lab number', 'submission', 'order id', 'account', 'telephone', 'microchip',
                  'animal ref', 'patient id', 'date of', 'collection date', 'generated by',
                  'reference value', 'last updated', 'order received', 'serum interferences', 'comment'];
    if (skip.some(k => lower.includes(k))) return null;

    const tokens = line.split(/\s+/).filter(Boolean);
    // A token starting with a digit is usually the value — EXCEPT on echo reports, where the method
    // is written into the name: "LVDDN 2D 1.822", "LVEDV MOD A4C 47 ml". Reading "2D" as the value
    // gives a result of 2.0 and buries the real number in the unit. A short digits-then-letters
    // token with no decimal point and no slash is therefore part of the name.
    const isValueLike = t => {
        const c = String(t).replace(/[(),;]/g, '');
        if (/[./^]/.test(c)) return true;
        const m = c.match(/^(\d+)([A-Za-z]*)$/);
        if (!m) return true;
        return !(m[1].length <= 2 && m[2].length > 0 && m[2].length <= 2);
    };
    const startsNumeric = t => (/^[0-9]/.test(t) ? isValueLike(t) : (/^[<>≤≥.]/.test(t) && /[0-9]/.test(t)));
    const firstNum = tokens.findIndex(startsNumeric);
    if (firstNum <= 0) return null;
    // More than four words and the "name" has swallowed a sentence — which is what happens when the
    // RESULT ITSELF was words ("Glucose No OXF received mmol/L 3.5 - 6.5"). The first number found is
    // then the range's LOW end, so parsing on would record a result for a test never run.
    if (firstNum > 4) return null;

    const name = tokens.slice(0, firstNum).join(' ').replace(/^[\s:;•*-]+|[\s:;•*-]+$/g, '');
    if (!name || !/[a-z]/i.test(name)) return null;

    // Re-separate what tight typesetting glued together: "26.3-38.2g/L" → "26.3 - 38.2 g/L".
    const rest = tokens.slice(firstNum).join(' ')
        .replace(/[–—]/g, '-')
        .replace(/(\d)\s*-\s*(\d)/g, '$1 - $2')
        .replace(/(\d)([a-zA-Zµ%])/g, '$1 $2');
    const restTokens = rest.split(/\s+/).filter(Boolean);
    const num = t => {
        const m = String(t).replace(/,/g, '.').match(/[0-9]*\.?[0-9]+/);
        return m ? parseFloat(m[0]) : null;
    };
    const value = num(restTokens[0]);
    if (value === null) return null;

    let tail = restTokens.slice(1);
    const flagSet = ['high', 'low', 'h', 'l', 'hh', 'll', 'abnormal', '!', '!!'];
    let flag = '';
    tail = tail.filter(t => {
        const c = t.toLowerCase().replace(/[*(),]/g, '');
        if (flagSet.includes(c)) { if (!flag) flag = c.toUpperCase(); return false; }
        return true;
    });

    let refLow = null, refHigh = null;
    const dash = tail.indexOf('-');
    if (dash > 0 && dash + 1 < tail.length && num(tail[dash - 1]) !== null && num(tail[dash + 1]) !== null) {
        const a = num(tail[dash - 1]), b = num(tail[dash + 1]);
        refLow = Math.min(a, b); refHigh = Math.max(a, b);
        tail.splice(dash - 1, 3);
    } else {
        // The comparator may be wrapped in a bracket — how echo reports print a single limit.
        const bare = t => String(t).replace(/^[([]+|[)\]]+$/g, '');
        const i = tail.findIndex(t => /^[<>≤≥]/.test(bare(t)));
        if (i !== -1) {
            const upper = /^[<≤]/.test(bare(tail[i]));
            let n = /[0-9]/.test(bare(tail[i]).slice(1)) ? num(bare(tail[i])) : null;
            if (n !== null) { tail.splice(i, 1); }
            else if (i + 1 < tail.length && num(tail[i + 1]) !== null) { n = num(tail[i + 1]); tail.splice(i, 2); }
            if (n !== null) { if (upper) refHigh = n; else refLow = n; }
        }
    }
    if (refLow !== null && refHigh !== null && refLow === refHigh) { refLow = null; refHigh = null; }

    const unit = tail.filter(t => !['-', 'to', 'ref', 'range'].includes(t.toLowerCase()))
                     .join(' ').replace(/^[\s.,;:()]+|[\s.,;:()]+$/g, '');
    const matched = this.bloodMatchMarker(name);
    return { printedName: name, value, unit, refLow, refHigh, flag,
             markerId: matched ? matched.id : null, rawLine: String(raw) };
},

parseBloodPaste() {
    const lines = (this.bloodPasteText || '').split(/\r?\n/);
    let rows = lines.map(l => this.parseBloodLine(l)).filter(Boolean)
        // A row survives if the catalogue knew its name OR the report printed a range beside it.
        // With neither it is indistinguishable from address/footer noise ("WEST YORKSHIRE LS 22 7DN").
        .filter(r => r.markerId || r.refLow !== null || r.refHigh !== null);

    // First occurrence wins for a repeated name+value (a header read twice).
    const seen = new Set();
    rows = rows.filter(r => {
        const k = `${this.bloodNormalise(r.printedName)}|${r.value}`;
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
    });
    // A lab prints each analyte once: a SECOND match for the same marker is far more likely a wrapped
    // table row than a repeat. IDEXX's two-line "Albumin: / Globulin Ratio" label is the real case —
    // it parses as Albumin = 1.10 beside the genuine Albumin = 35.9 g/L. Demote it so it arrives
    // unticked instead of corrupting the albumin series.
    const claimed = new Set();
    rows.forEach(r => {
        if (!r.markerId) return;
        if (claimed.has(r.markerId)) { r.markerId = null; return; }
        claimed.add(r.markerId);
    });

    this.bloodParseRows = rows.map(r => ({ ...r, include: !!r.markerId }));
    this.bloodParseMeta = {
        sampleDate: this.parseBloodReportDate(lines) || new Date().toISOString().split('T')[0],
        labName: this.parseBloodReportLab(lines)
    };
    if (!rows.length) alert('No results could be read from that text. Check you pasted the results table, or add the values by hand.');
},

// UK date order (dd/MM/yyyy). A US-order date is refused rather than silently read three months out.
parseBloodReportDate(lines) {
    const pick = (keys, excludePrint = false) => {
        for (const line of lines) {
            const lower = String(line).toLowerCase();
            if (!keys.some(k => lower.includes(k))) continue;
            if (excludePrint && (lower.includes('print') || lower.includes('printed'))) continue;
            let m = String(line).match(/\b(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{2,4})\b/);
            if (m) {
                const d = +m[1], mo = +m[2];
                let y = +m[3]; if (y < 100) y += 2000;
                if (d >= 1 && d <= 31 && mo >= 1 && mo <= 12) {
                    const iso = `${y}-${String(mo).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                    if (new Date(iso) <= new Date()) return iso;
                }
            }
            m = String(line).match(/\b(\d{4})-(\d{1,2})-(\d{1,2})\b/);
            if (m) return `${m[1]}-${String(+m[2]).padStart(2, '0')}-${String(+m[3]).padStart(2, '0')}`;
        }
        return null;
    };
    // Most specific first. A PRINT date is the last resort: a report reprinted months later would
    // otherwise be filed under the day it was printed rather than the day of the study.
    const tiers = [
        ['collection date', 'sample date', 'date sampled', 'date collected', 'date taken',
         'study date', 'scan date', 'exam date', 'date of study', 'date of exam'],
        ['date'],                                  // a bare "Date 31/07/2026" line
        ['date of receipt', 'received', 'date of result', 'reported'],
        ['print date', 'printed'],
    ];
    for (let t = 0; t < tiers.length; t++) {
        const found = pick(tiers[t], t === 1);     // tier 1 must not swallow the print date
        if (found) return found;
    }
    return null;
},

parseBloodReportLab(lines) {
    const blob = lines.join(' ').toLowerCase();
    const known = [['idexx', 'IDEXX'], ['thevpg', 'VPG'], ['veterinary pathology group', 'VPG'],
                   ['nationwide laboratories', 'Nationwide Laboratories'], ['axiom', 'Axiom Veterinary Laboratories'],
                   ['langford', 'Langford Vets']];
    for (const [needle, name] of known) if (blob.includes(needle)) return name;
    return '';
},

bloodParseSelectedCount() {
    return (this.bloodParseRows || []).filter(r => r.include && isFinite(Number(r.value))).length;
},

// Marker names appearing more than once among the SELECTED rows — usually a wrapped label.
bloodParseDuplicateNames() {
    const counts = {};
    (this.bloodParseRows || []).filter(r => r.include).forEach(r => {
        const n = r.markerId ? this.bloodDisplayName(r) : r.printedName;
        counts[n] = (counts[n] || 0) + 1;
    });
    return Object.keys(counts).filter(k => counts[k] > 1);
},

confirmBloodImport() {
    const rows = (this.bloodParseRows || []).filter(r => r.include && isFinite(Number(r.value)));
    if (!rows.length) return alert('Tick at least one result to import.');
    rows.forEach(r => {
        this.bloodResults.push({
            id: this.generateId(),
            patientId: this.activePatientId,
            sampleDate: this.bloodParseMeta.sampleDate,
            markerId: r.markerId || BLOOD_OTHER_ID,
            customName: r.markerId ? '' : r.printedName,
            value: Number(r.value),
            unit: (r.unit || '').trim(),
            refLow: r.refLow,
            refHigh: r.refHigh,
            labName: (this.bloodParseMeta.labName || '').trim(),
            notes: ''
        });
    });
    this.saveToStorage('vch_bloodResults', this.bloodResults);
    this.showBloodImport = false;
    this.bloodPasteText = '';
    this.bloodParseRows = [];
    alert(`${rows.length} result${rows.length === 1 ? '' : 's'} added.`);
},

deleteDiagnosis(id) {
            if (confirm("Are you sure you want to delete this diagnosis entry?")) {
                this.diagnosisLog = this.diagnosisLog.filter(d => d.id !== id);
                this.saveToStorage('vch_diagnosisLog', this.diagnosisLog);
            }
        },
        
        //AMurmur progression Logic
        
        get murmurProgression() {
    return this.diagnosisLog
        .filter(d =>
            d.patientId === this.activePatientId &&
            d.murmurGrade &&
            d.murmurGrade !== 'N/A' &&
            d.murmurGrade !== 'Not Graded / Unknown' &&
            d.diagnosis !== 'Concurrent Conditions Only'
        )
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map(entry => {
            // parseInt('3/6') → 3, parseInt('0/6') → 0 — JS stops at '/'
            const gradeNum = parseInt(entry.murmurGrade);
            return {
                date: entry.date,
                murmurGrade: entry.murmurGrade,
                gradeNum: isNaN(gradeNum) ? null : gradeNum
            };
        })
        .filter(e => e.gradeNum !== null && e.gradeNum >= 0 && e.gradeNum <= 6);
},

get murmurChartHtml() {
    if (!this.murmurProgression || this.murmurProgression.length === 0) return '';

    const MURMUR_STAGES = [
        { id: '0', label: '0',   subtitle: 'No murmur' },
        { id: '1', label: 'I',   subtitle: 'Very soft' },
        { id: '2', label: 'II',  subtitle: 'Soft' },
        { id: '3', label: 'III', subtitle: 'Moderate' },
        { id: '4', label: 'IV',  subtitle: 'Loud' },
        { id: '5', label: 'V',   subtitle: '+ Thrill' },
        { id: '6', label: 'VI',  subtitle: 'No contact' },
    ];

    const MFILL = {
        '0': '#16a34a',
        '1': '#65a30d',
        '2': '#84cc16',
        '3': '#ca8a04',
        '4': '#d97706',
        '5': '#ea580c',
        '6': '#dc2626',
    };

    // ── Layout constants ──────────────────────────────────────────────────
    const PAD     = 55;
    const SPACING = 85;
    const CY      = 105;
    const R       = 50;

    const POS = {};
    MURMUR_STAGES.forEach((s, i) => { POS[s.id] = Math.round(PAD + i * SPACING); });

    const firstX   = POS['0'];
    const lastX    = POS['6'];
    const arrowTip = lastX + R + 20;

    // Most recent recorded grade — drives the highlight ring
    const lastEntry = this.murmurProgression[this.murmurProgression.length - 1];
    const currentGradeNum = lastEntry ? lastEntry.gradeNum : null;

    let html = '';

    // ── 1. Connector arrow ────────────────────────────────────────────────
    html += `
        <line x1="${firstX}" y1="${CY}" x2="${arrowTip - 4}" y2="${CY}"
              stroke="#cbd5e1" stroke-width="12" stroke-linecap="round"/>
        <polygon points="${arrowTip - 4},${CY - 14} ${arrowTip + 12},${CY} ${arrowTip - 4},${CY + 14}"
              fill="#cbd5e1"/>`;

    // ── 2. Grade circles ──────────────────────────────────────────────────
    MURMUR_STAGES.forEach(stage => {
        const x       = POS[stage.id];
        const current = currentGradeNum !== null && currentGradeNum === parseInt(stage.id);
        const fill    = MFILL[stage.id] || '#64748b';

    html += `
        <g>
            <circle cx="${x}" cy="${CY}" r="${R}"
                fill="${fill}"
                stroke="${current ? '#1e3a8a' : '#ffffff'}"
                stroke-width="${current ? 6 : 3}"/>
            <text x="${x}" y="${CY - 8}" text-anchor="middle"
                  fill="white" font-size="22" font-weight="bold"
                  font-family="sans-serif">${stage.label}</text>
            <text x="${x}" y="${CY + 14}" text-anchor="middle"
                  fill="rgba(255,255,255,0.92)" font-size="9"
                  font-family="sans-serif">${stage.subtitle}</text>
            <g style="cursor:pointer;" @click="openGlossary('murmurGrade_${stage.id}')">
                <circle cx="${x + 33}" cy="${CY - 32}" r="10" fill="#f8fafc" stroke="${fill}" stroke-width="2"/>
                <text x="${x + 33}" y="${CY - 28}" text-anchor="middle" font-size="11"
                      fill="${fill}" font-weight="bold" font-family="sans-serif">i</text>
            </g>
        </g>`;
    });

    // ── 3. Date markers ───────────────────────────────────────────────────
    // Group by grade so multiple visits to same grade spread horizontally
    const gradeCounts = {};
    this.murmurProgression.forEach(t => {
        const k = String(t.gradeNum);
        gradeCounts[k] = (gradeCounts[k] || 0) + 1;
    });

    const MSEP  = 18;
    const drawn = {};
    let latestMX = null;

    this.murmurProgression.forEach(t => {
        const k    = String(t.gradeNum);
        const baseX = POS[k];
        if (baseX === undefined) return;

        if (drawn[k] === undefined) drawn[k] = 0;
        const count = gradeCounts[k];
        const i     = drawn[k]++;
        const mx    = baseX - ((count - 1) * MSEP) / 2 + i * MSEP;
        latestMX    = mx;

        const dateStr = t.date
            ? new Date(t.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' })
            : '';

        html += `
            <g>
                <line x1="${mx}" y1="${CY + R + 4}" x2="${mx}" y2="${CY + R + 26}"
                      stroke="#2563eb" stroke-width="2.5"/>
                <circle cx="${mx}" cy="${CY + R + 4}" r="5" fill="#2563eb"/>
                ${dateStr ? `<text x="${mx}" y="${CY + R + 42}" text-anchor="middle"
                    font-size="11" fill="#475569" font-weight="bold"
                    font-family="sans-serif">${dateStr}</text>` : ''}
            </g>`;
    });

    // ── 4. NOW pointer ────────────────────────────────────────────────────
if (latestMX !== null) {
    const tipY       = CY - R - 8;
    const BADGE_W    = 42, BADGE_H = 22;
    const bx         = latestMX - BADGE_W / 2;
    const badgeBottom = tipY - 7;
    const badgeTop    = badgeBottom - BADGE_H;

    html += `
        <polygon points="${latestMX - 7},${badgeBottom} ${latestMX + 7},${badgeBottom} ${latestMX},${tipY}"
            fill="#2563eb"/>
        <rect x="${bx}" y="${badgeTop}" width="${BADGE_W}" height="${BADGE_H}" rx="5" fill="#2563eb"/>
        <text x="${latestMX}" y="${badgeTop + 15}" text-anchor="middle"
            font-size="12" fill="white" font-weight="bold"
            font-family="sans-serif">NOW</text>`;
}

    return html;
},
        
        //ACVIM Staging Logic
        
                // Computed property to determine if staging is clinically relevant
get isStagingApplicable() {
            const diag = this.newDiagnosis.diagnosis?.toLowerCase() || '';
            return diag.includes('mmvd') || diag.includes('mitral') || diag.includes('hcm') || diag.includes('dcm');
        },


get stageProgression() {
    return this.diagnosisLog
        .filter(d =>
            d.patientId === this.activePatientId &&
            d.acvimStage &&
            d.acvimStage !== 'N/A' &&
            d.acvimStage !== 'Unstaged / N/A' &&
            d.diagnosis !== 'Concurrent Conditions Only'
        )
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map(entry => ({
            stage: entry.acvimStage.replace(/^Stage\s+/i, ''), // "Stage B2" → "B2"
            date: entry.date
        }));
},


stageX(stageId) {
    if (!this.activePathway) return 0;
    const idx = this.activePathway.stages.findIndex(
        s => s.id === stageId
    );
    
    // Prevent off-screen rendering if stage is ever invalid
    if (idx === -1) return -1000;
    return 110 + (idx * 190);
},

get activePathway() {
            // This is now purely reactive and driven by the currentClinicalStatus getter!
            const diagnosis = this.primaryCardiacDiagnosis;
            if (!diagnosis) return null;
            if (diagnosis.startsWith('MMVD')) return ACVIM_PATHWAYS.MMVD;
            if (diagnosis.startsWith('HCM')) return ACVIM_PATHWAYS.HCM;
            if (diagnosis.startsWith('DCM')) return ACVIM_PATHWAYS.DCM;
            return null;
        },

get currentStage() {
    // RESOLVED records are excluded — a ligated PDA or a corrected diagnosis should not keep
    // advertising a stage — while `stageProgression` KEEPS them so the chart still shows the
    // history that led there. Mirrors iOS DiagnosisLogic.currentStage.
    const resolvedIds = new Set(this.diagnosisLog
        .filter(d => this.isDiagnosisResolved(d))
        .map(d => `${d.acvimStage}|${d.date}`));
    const history = this.stageProgression.filter(e => !resolvedIds.has(`Stage ${e.stage}|${e.date}`)
                                                   && !resolvedIds.has(`${e.stage}|${e.date}`));

    if (!history.length) return null;

    return history[history.length - 1];
},

get stageMarkers() {
    const pathway = this.activePathway;
    if (!pathway) return [];

    return this.stageProgression.map(entry => {

        const stageIndex =
            pathway.stages.findIndex(
                s => s.id === entry.stage
            );

        return {
            stage: entry.stage,
            date: entry.date,
            position: stageIndex
        };
    });
},

isCurrentStage(stageId) {
    return this.currentStage?.stage === stageId;
},


//GENERATE ACVIM CHART AS SVG and inj HTML back

get acvimChartHtml() {
    if (!this.activePathway) return '';

    const diseasePrefix = this.primaryCardiacDiagnosis ? this.primaryCardiacDiagnosis.split(' ')[0] : 'Disease';

    // --- AUTO-GENERATE GLOSSARY ENTRIES ---
    this.activePathway.stages.forEach(stage => {
        const key = `acvim_${diseasePrefix}_${stage.id}`;
        if (!this.glossaryDatabase[key]) {
            this.glossaryDatabase[key] = {
                title: `${diseasePrefix} - Stage ${stage.id}`,
                category: "ACVIM Staging",
                difficulty: 2,
                group: "Cardiology",
                description: `Clinical classification for ${diseasePrefix} Stage ${stage.id}. ${stage.subtitle ? 'Key indicator: ' + stage.subtitle + '.' : ''}`,
                textOwner: `Your pet's heart condition is classified as Stage ${stage.id}. ${stage.subtitle ? 'This generally means ' + stage.subtitle.toLowerCase() + '.' : ''} Monitoring resting breathing rates is critical at this stage to detect subtle changes.`,
            };
        }
    });

    // ── Layout constants (NEW COMPACT, OVERLAPPING MATH) ──────────────
    const W       = 600;  // Reduced total canvas width
    const STAGES  = this.activePathway.stages;
    const N       = STAGES.length;                          
    const PAD     = 70;
    const SPACING = 100;  // Tightly packed (less than 2*R forces overlap)
    const CY      = 100;  // Y-center of circles
    const R       = 60;   // Increased radius for bigger circles

    const POS = {};
    STAGES.forEach((s, i) => { POS[s.id] = Math.round(PAD + i * SPACING); });

    const firstX = POS[STAGES[0].id];
    const lastX  = POS[STAGES[N - 1].id];
    const arrowTip = lastX + R + 20;

    const norm = id => (id || '').replace(/^Stage\s+/i, '');

    const splitSub = (sub) => {
        if (!sub || sub.length <= 14) return [sub || ''];
        const words = sub.split(' ');
        const mid = sub.length / 2;
        let run = 0, at = 1;
        for (let i = 0; i < words.length - 1; i++) {
            run += words[i].length + 1;
            at = i + 1;
            if (run >= mid) break;
        }
        return [words.slice(0, at).join(' '), words.slice(at).join(' ')];
    };

    let html = '';

    // 1. Connector arrow (Thicker to match larger circles)
    html += `
        <line x1="${firstX}" y1="${CY}" x2="${arrowTip - 4}" y2="${CY}"
              stroke="#cbd5e1" stroke-width="12" stroke-linecap="round"/>
        <polygon points="${arrowTip - 4},${CY - 14} ${arrowTip + 12},${CY} ${arrowTip - 4},${CY + 14}"
              fill="#cbd5e1"/>`;

    // 2. Stage circles
    const FILL = { Normal:'#65a30d', B1:'#84cc16', B2:'#ca8a04', C:'#d97706', D:'#dc2626' };

    STAGES.forEach(stage => {
        const x       = POS[stage.id];
        const current = this.isCurrentStage(stage.id);
        const fill    = FILL[stage.id] || '#64748b';
        const lines   = splitSub(stage.subtitle);
        const hasSub  = lines.some(l => l);

        const labelY  = hasSub ? CY - 10 : CY + 10;   
        let subHtml   = '';

        if (hasSub) {
            if (lines.length === 1) {
                subHtml = `<text x="${x}" y="${CY + 16}" text-anchor="middle"
                    fill="rgba(255,255,255,0.95)" font-size="10.5">${lines[0]}</text>`;
            } else {
                subHtml = `<text text-anchor="middle" fill="rgba(255,255,255,0.95)" font-size="10">
                    <tspan x="${x}" y="${CY + 10}">${lines[0]}</tspan>
                    <tspan x="${x}" dy="14">${lines[1]}</tspan>
                </text>`;
            }
        }

        html += `
            <g>
                <circle cx="${x}" cy="${CY}" r="${R}"
                    fill="${fill}"
                    stroke="${current ? '#1e3a8a' : '#ffffff'}"
                    stroke-width="${current ? 6 : 3}"/>
                <text x="${x}" y="${labelY}" text-anchor="middle"
                      fill="white" font-size="28" font-weight="bold">${stage.label}</text>
                ${subHtml}
                
                <g style="cursor:pointer;" @click="openGlossary('acvim_${diseasePrefix}_${stage.id}')">
                    <circle cx="${x + 40}" cy="${CY - 30}" r="11" fill="#f8fafc" stroke="${fill}" stroke-width="2"/>
                    <text x="${x + 40}" y="${CY - 26}" text-anchor="middle" font-size="12" fill="${fill}" font-weight="bold" font-family="sans-serif">i</text>
                </g>
            </g>`;
    });

    // 3. Transition markers
    const progression = this.stageProgression;
    const stageCounts = {};
    progression.forEach(t => { stageCounts[t.stage] = (stageCounts[t.stage] || 0) + 1; });

    const MSEP  = 19;    
    const drawn = {};
    let latestMX = null;

    progression.forEach(t => {
        const baseX = POS[t.stage];
        if (baseX === undefined) return;          

        if (drawn[t.stage] === undefined) drawn[t.stage] = 0;
        const count = stageCounts[t.stage];
        const i     = drawn[t.stage]++;
        const mx    = baseX - ((count - 1) * MSEP) / 2 + i * MSEP;
        latestMX    = mx;

        const dateStr = t.date
            ? new Date(t.date).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'2-digit' })
            : '';

        html += `
            <g>
                <line x1="${mx}" y1="${CY + R + 4}" x2="${mx}" y2="${CY + R + 26}"
                      stroke="#2563eb" stroke-width="2.5"/>
                <circle cx="${mx}" cy="${CY + R + 4}" r="5" fill="#2563eb"/>
                ${dateStr ? `<text x="${mx}" y="${CY + R + 42}" text-anchor="middle"
                    font-size="11" fill="#475569" font-weight="bold">${dateStr}</text>` : ''}
            </g>`;
    });

// 4. NOW pointer (Floating above the big circles)
if (latestMX !== null) {
    const tipY        = CY - R - 8;
    const BADGE_W     = 42, BADGE_H = 22;
    const bx          = latestMX - BADGE_W / 2;
    const badgeBottom = tipY - 7;
    const badgeTop    = badgeBottom - BADGE_H;

    html += `
        <polygon points="${latestMX - 7},${badgeBottom} ${latestMX + 7},${badgeBottom} ${latestMX},${tipY}"
            fill="#2563eb"/>
        <rect x="${bx}" y="${badgeTop}" width="${BADGE_W}" height="${BADGE_H}" rx="5" fill="#2563eb"/>
        <text x="${latestMX}" y="${badgeTop + 15}" text-anchor="middle"
            font-size="12" fill="white" font-weight="bold"
            font-family="sans-serif">NOW</text>`;
}

    // 5. Treatment bands (Shifted down below the new timeline markers)
    const BAND_Y0  = CY + R + 55;    
    const BAND_H   = 22;
    const BAND_GAP = 6;

    (this.activePathway.treatmentBands || []).forEach((band, idx) => {
        const startX = POS[norm(band.startStage)];
        if (startX === undefined) return;
        const y     = BAND_Y0 + idx * (BAND_H + BAND_GAP);
        const bandW = arrowTip + 10 - (startX - R);
        html += `
            <g>
                <rect x="${startX - R}" y="${y}" width="${bandW}" height="${BAND_H}"
                      rx="11" fill="#dbeafe" stroke="#93c5fd"/>
                <text x="${startX - R + 14}" y="${y + 15}"
                      font-size="11" fill="#1e3a8a" font-weight="bold">${band.label}</text>
            </g>`;
    });

    return html;
},

// --- SYNCOPE / EVENT LOGIC ---
openSyncopeForm(logEntry = null) {
    if (logEntry) {
        this.newSyncope = { ...logEntry };
        this.editingSyncopeId = logEntry.id;
    } else {
        this.newSyncope = {
            id: null,
            date: new Date().toISOString().split('T')[0],
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
            type: 'Syncope', 
            duration: '',
            loc: 'Full',
            muscleTone: 'Flaccid',
            activityBefore: '',
            mmColour: '',
            hr: null,
            rr: null,
            notes: ''
        };
        this.editingSyncopeId = null;
    }
    this.showSyncopeForm = true;
},

saveSyncope() {
    if (!this.newSyncope.date) {
        alert("Event date is required.");
        return;
    }

    // Spread the newSyncope object to include ALL bound fields from the HTML form
    const entryToSave = {
        ...this.newSyncope, 
        id: this.editingSyncopeId || this.generateId(),
        patientId: this.activePatientId // CRITICAL: Binds event to the current patient
    };

    // If type is "Other", we should ideally capture the custom text
    // Assuming you bound custom text to 'customEventType' in your HTML
    if (entryToSave.type === 'Other' && this.customEventType) {
        entryToSave.type = this.customEventType; 
    }

    if (this.editingSyncopeId) {
        const index = this.syncopeLog.findIndex(s => s.id === this.editingSyncopeId);
        if (index !== -1) this.syncopeLog[index] = entryToSave;
    } else {
        this.syncopeLog.push(entryToSave);
    }

    // Sort descending by date (most recent first)
    this.syncopeLog.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Save to localStorage
    this.saveToStorage('vch_syncopeLog', this.syncopeLog);
    
    // Close the form and optionally reset state
    this.showSyncopeForm = false;
    this.customEventType = ''; // Reset custom type if used
},



deleteSyncope(id) {
    if (confirm("Are you sure you want to delete this event?")) {
        this.syncopeLog = this.syncopeLog.filter(s => s.id !== id);
        this.saveToStorage('vch_syncopeLog', this.syncopeLog);
    }
},
        
        
 // --- COUGH LOGIC (DAILY SUMMARY) ---
get sortedCoughLog() {
            if (!this.activePatientId) return [];
            return this.coughLog
                .filter(c => c.patientId === this.activePatientId)
                .sort((a, b) => new Date(b.date) - new Date(a.date));
        },

hasCoughForDate() {
            return this.coughLog.some(c => c.patientId === this.activePatientId && c.date === this.newCough.date);
        },

loadCoughForDate() {
            const existing = this.coughLog.find(c => c.patientId === this.activePatientId && c.date === this.newCough.date);
            if (existing) {
                this.newCough = { ...existing };
            } else {
                // Reset fields but keep the user's selected date
                this.newCough = {
                    date: this.newCough.date,
                    frequencyCount: '', frequencyPeriod: 'day',
                    severity: 'Mild', description: 'chesty/productive', context: 'Resting/Night', notes: ''
                };
            }
        },
        
openCoughForm(dateStr = null) {
            this.showCoughForm = true;
            this.newCough.date = dateStr || new Date().toISOString().split('T')[0];
            this.loadCoughForDate();
        },

closeCoughForm() {
            this.showCoughForm = false;
        },

saveCough() {
            if (!this.activePatientId) return alert("Select a patient first.");
            
            const existingIndex = this.coughLog.findIndex(c => c.patientId === this.activePatientId && c.date === this.newCough.date);
            
            if (existingIndex > -1) {
                this.coughLog[existingIndex] = { ...this.coughLog[existingIndex], ...this.newCough };
            } else {
                this.coughLog.push({ id: this.generateId(), patientId: this.activePatientId, ...this.newCough });
            }
            
            this.saveToStorage('vch_coughLog', this.coughLog);
            this.closeCoughForm(); // Hide the form after saving
        },

deleteCough(id) {
            if (confirm("Delete this daily cough summary?")) {
                this.coughLog = this.coughLog.filter(c => c.id !== id);
                this.saveToStorage('vch_coughLog', this.coughLog);
                this.loadCoughForDate(); // Refresh form state
            }
        },

        // --- ACTIVITY LOGIC (DAILY SUMMARY) ---
get sortedActivityLog() {
            if (!this.activePatientId) return [];
            return this.activityLog
                .filter(a => a.patientId === this.activePatientId)
                .sort((a, b) => new Date(b.date) - new Date(a.date));
        },

hasActivityForDate() {
            return this.activityLog.some(a => a.patientId === this.activePatientId && a.date === this.newActivity.date);
        },

loadActivityForDate() {
            const existing = this.activityLog.find(a => a.patientId === this.activePatientId && a.date === this.newActivity.date);
            if (existing) {
                this.newActivity = { ...existing };
            } else {
                this.newActivity = {
                    date: this.newActivity.date,
                    status: 'Normal', durationMins: '',
                    distanceValue: '', distanceUnit: this.appSettings.distanceUnit,
                    notes: ''
                };
            }
        },

// --- ACTIVITY LOGIC ---
openActivityForm(dateStr = null) {
            this.showActivityForm = true;
            this.newActivity.date = dateStr || new Date().toISOString().split('T')[0];
            this.loadActivityForDate();
        },

closeActivityForm() {
            this.showActivityForm = false;
        },

saveActivity() {
            if (!this.activePatientId) return alert("Select a patient first.");

            if (!this.newActivity.distanceUnit) this.newActivity.distanceUnit = this.appSettings.distanceUnit;
            this.newActivity.distanceValue =
                (this.newActivity.distanceValue === '' || this.newActivity.distanceValue == null)
                    ? '' : parseFloat(this.newActivity.distanceValue);

            const existingIndex = this.activityLog.findIndex(a => a.patientId === this.activePatientId && a.date === this.newActivity.date);
            
            if (existingIndex > -1) {
                this.activityLog[existingIndex] = { ...this.activityLog[existingIndex], ...this.newActivity };
            } else {
                this.activityLog.push({ id: this.generateId(), patientId: this.activePatientId, ...this.newActivity });
            }
            
            this.saveToStorage('vch_activityLog', this.activityLog);
            this.closeActivityForm(); // Hide the form after saving
        },

deleteActivity(id) {
            if (confirm("Delete this daily activity summary?")) {
                this.activityLog = this.activityLog.filter(a => a.id !== id);
                this.saveToStorage('vch_activityLog', this.activityLog);
                this.loadActivityForDate(); // Refresh form state
            }
        },
        
editCough(dateStr) {
            this.newCough.date = dateStr;
            this.loadCoughForDate();
        },

        editActivity(dateStr) {
            this.newActivity.date = dateStr;
            this.loadActivityForDate();
        },
                
    // Creates an alphabetical list of "Generic (Brands)"
        get medicationOptions() {
            let options = [];
            for (const [id, drug] of Object.entries(this.formulary)) {
                if (id === 'other') {
                    options.push({ value: 'other', label: 'Other / Custom Medication' });
                    continue;
                }
                
                // Construct the label text
                let labelText = drug.generic;
                if (drug.brands && drug.brands.length > 0) {
                    labelText += ` (${drug.brands.join(', ')})`;
                }
                
                options.push({ value: id, label: labelText });
            }
            
            // Sort alphabetically for easy finding
            return options.sort((a, b) => a.label.localeCompare(b.label));
        },
        
        //Injection Log helpers
        
         
_calcInjectionDue(dateStr, intervalDays) {          // = _calcParasiticDue
    if (!dateStr || !intervalDays) return '';
    const d = new Date(dateStr + 'T12:00:00');
    d.setDate(d.getDate() + Number(intervalDays));
    return d.toISOString().split('T')[0];
},

// Owner-facing cadence label derived from the interval in days.
_injectionCadenceLabel(intervalDays) {
    const n = Number(intervalDays);
    if (!n) return '';
    if (n >= 28 && n <= 31) return 'Monthly';
    if (n === 7)  return 'Weekly';
    if (n === 14) return 'Every 2 weeks';
    if (n === 21) return 'Every 3 weeks';
    if (n === 56) return 'Every 8 weeks';
    if (n >= 88 && n <= 92) return 'Quarterly';
    return `Every ${n} days`;
},

// Re-derive next-due date AND cadence label whenever date/interval change.
_refreshInjectionDue() {
    this.newInjection.intervalLabel = this._injectionCadenceLabel(this.newInjection.intervalDays);
    this.newInjection.nextDueDate =
        this._calcInjectionDue(this.newInjection.date, this.newInjection.intervalDays);
},

// A blank injectable ready for entry.
_freshInjection() {
    return {
        date: new Date().toISOString().split('T')[0],
        customName: '', dose: '', intervalDays: 30, intervalLabel: 'Monthly',
        nextDueDate: '', batchNumber: '', administeredBy: '', notes: ''
    };
},

// Opens the medication form in Injectable mode. Pass a log entry to edit it,
// or null for a fresh injectable. (Repeat uses this with a today-dated copy.)
openInjectionForm(entry = null) {
    this.editingMedId = null;
    this.newMed = {
        eventDate: new Date().toISOString().split('T')[0],
        drugId: '', customName: '', isStopped: false,
        openedDate: '', discardDays: '', form: 'injectable',
        tabletStrengthMg: '', tabletsPerDose: '',
        frequency: 'q12h', doseTimes: [],
        tabletsInStock: '',
        stockDate: new Date().toISOString().split('T')[0]
    };
    if (entry && entry.id) {
        this.newInjection = {
            date: entry.date || new Date().toISOString().split('T')[0],
            customName: entry.customName || '',
            dose: entry.dose || '',
            intervalDays: entry.intervalDays || 30,
            intervalLabel: entry.intervalLabel || 'Monthly',
            nextDueDate: entry.nextDueDate || '',
            batchNumber: entry.batchNumber || '',
            administeredBy: entry.administeredBy || '',
            notes: entry.notes || ''
        };
        this.editingInjectionId = entry.id;
    } else {
        this.newInjection = this._freshInjection();
        // Allow a partial hydrate (used by repeatInjection) while staying a NEW record.
        if (entry) Object.assign(this.newInjection, {
            customName: entry.customName || '',
            dose: entry.dose || '',
            intervalDays: entry.intervalDays || 30,
            batchNumber: '', administeredBy: entry.administeredBy || ''
        });
        this.editingInjectionId = null;
    }
    this._refreshInjectionDue();
    this.showMedForm = true;
},

// One-tap re-dose: pre-fill from an existing record but date it TODAY as a new entry.
repeatInjection(id) {
    const e = this.injectionLog.find(x => x.id === id);
    if (!e) return;
    this.openInjectionForm({
        customName: e.customName, dose: e.dose,
        intervalDays: e.intervalDays, administeredBy: e.administeredBy
    });
},

saveInjection() {
    if (!this.activePatientId) return alert('Select a patient first.');
    if (!this.newInjection.customName || !this.newInjection.customName.trim()) {
        return alert('Please enter the injectable product name.');
    }
    this._refreshInjectionDue();

    const entryToSave = {
        id:        this.editingInjectionId || this.generateId(),
        patientId: this.activePatientId,
        date:          this.newInjection.date,
        customName:    this.newInjection.customName.trim(),
        dose:          (this.newInjection.dose || '').trim(),
        intervalDays:  Number(this.newInjection.intervalDays) || 0,
        intervalLabel: this.newInjection.intervalLabel || this._injectionCadenceLabel(this.newInjection.intervalDays),
        nextDueDate:   this.newInjection.nextDueDate,
        batchNumber:   (this.newInjection.batchNumber || '').trim(),
        administeredBy:(this.newInjection.administeredBy || '').trim(),
        notes:         (this.newInjection.notes || '').trim()
    };

    if (this.editingInjectionId) {
        const idx = this.injectionLog.findIndex(e => e.id === this.editingInjectionId);
        if (idx !== -1) this.injectionLog.splice(idx, 1, entryToSave);
        else this.injectionLog.push(entryToSave);
    } else {
        this.injectionLog.push(entryToSave);
    }

    // Conversion: an existing tablet/liquid med was switched to Injectable → drop the med.
    if (this.editingMedId) {
        this.medLedger = this.medLedger.filter(m => m.id !== this.editingMedId);
        this.saveToStorage('vch_medLedger', this.medLedger);
        this.editingMedId = null;
    }

    this.saveToStorage('vch_injectionLog', this.injectionLog);
    this.editingInjectionId = null;
    this.newInjection = this._freshInjection();
    if (typeof this.renderInjectionChart === 'function') this.renderInjectionChart();
    this.showMedForm = false;
    this.showInjectionForm = false;
},

deleteInjection(id) {
    if (confirm('Delete this injectable record?')) {
        this.injectionLog = this.injectionLog.filter(e => e.id !== id);
        this.saveToStorage('vch_injectionLog', this.injectionLog);
        if (typeof this.renderInjectionChart === 'function') this.renderInjectionChart();
    }
},

sortedInjectionLog() {
    if (!this.activePatientId) return [];
    return this.injectionLog
        .filter(e => e.patientId === this.activePatientId)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
},

// Reuse the vaccine/antiparasitic due-date colour engine — identical semantics.
getInjectionStatus(nextDueDate) {
    return this.getVaccineStatus(nextDueDate);
},

// Ids of the most-recent (live) dose per product name — the only rows that show a due pill.
liveInjectionIds() {
    const seen = new Set();
    const live = new Set();
    for (const e of this.sortedInjectionLog()) {          // newest first
        const key = (e.customName || '').trim().toLowerCase();
        if (!key || seen.has(key)) continue;
        seen.add(key);
        live.add(e.id);
    }
    return live;
},

// Consecutive-dose day gaps for one product (mirrors iOS InjectionLogic.administrationGaps).
injectionAdminGaps(customName) {
    const key = (customName || '').trim().toLowerCase();
    const dates = this.injectionLog
        .filter(e => e.patientId === this.activePatientId && (e.customName || '').trim().toLowerCase() === key)
        .map(e => new Date(e.date + 'T12:00:00'))
        .sort((a, b) => a - b);
    const gaps = [];
    for (let i = 1; i < dates.length; i++) {
        gaps.push(Math.round((dates[i] - dates[i - 1]) / 86400000));
    }
    return gaps;
},

// 12-month timeline of each product's administrations — surfaces interval drift.
renderInjectionChart() {
    if (this.injectionChartRenderTimeout) clearTimeout(this.injectionChartRenderTimeout);
    this.injectionChartRenderTimeout = setTimeout(() => {
        const canvas = this.$refs.injectionChartCanvas;
        if (!canvas || typeof Chart === 'undefined') return;
        // GATEKEEPER: don't draw into a hidden canvas (accordion collapsed / other view)
        if (canvas.offsetParent === null) return;

        const existing = Chart.getChart(canvas);
        if (existing) existing.destroy();

        const now = new Date();
        const start = new Date(now); start.setMonth(start.getMonth() - 12);

        // Group this pet's doses by product name, keeping only the last 12 months.
        const groups = {};
        this.sortedInjectionLog().forEach(e => {
            const label = (e.customName || 'Injectable').trim();
            const key = label.toLowerCase();
            const d = new Date((e.date || '') + 'T12:00:00');
            if (isNaN(d.getTime()) || d < start) return;
            (groups[key] = groups[key] || { label, dates: [], intervalDays: e.intervalDays })
                .dates.push(d);
        });
        const keys = Object.keys(groups);
        if (keys.length === 0) return;

        const palette = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6'];
        const datasets = keys.map((key, i) => {
            const g = groups[key];
            const gaps = this.injectionAdminGaps(g.label);
            const avg = gaps.length ? Math.round(gaps.reduce((a, b) => a + b, 0) / gaps.length) : null;
            const suffix = avg
                ? `  (avg ${avg}d${g.intervalDays ? ` vs label ${g.intervalDays}d` : ''})`
                : '';
            const color = palette[i % palette.length];
            return {
                label: g.label + suffix,
                data: g.dates.map(d => ({ x: d, y: g.label })),
                backgroundColor: color,
                borderColor: color,
                showLine: true,
                borderWidth: 1,
                pointRadius: 5,
                pointHoverRadius: 7
            };
        });

        new Chart(canvas.getContext('2d'), {
            type: 'scatter',
            data: { datasets },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 10 } } },
                    title: { display: true, text: 'Injectable administrations — last 12 months', font: { size: 12 } },
                    tooltip: { callbacks: { label: (ctx) => `${ctx.raw.y}: ${new Date(ctx.raw.x).toLocaleDateString('en-GB')}` } }
                },
                scales: {
                    x: { type: 'time', min: start, max: now, time: { unit: 'month' }, ticks: { font: { size: 9 } } },
                    y: { type: 'category', labels: keys.map(k => groups[k].label), offset: true, ticks: { font: { size: 9 } } }
                }
            }
        });
    }, 60);
},
        
        
        
        
        
        
        
        // Helper function to calculate mg/kg dynamically in the UI
      
      
      // Total dose (mg) derived from tablet strength × tablets per dose
newMedDoseMg() {
    const strength = parseFloat(this.newMed.tabletStrengthMg);
    const perDose  = parseFloat(this.newMed.tabletsPerDose);
    if (isNaN(strength) || isNaN(perDose)) return null;
    return Math.round(strength * perDose * 1000) / 1000;
},

  
// Dynamic mg/kg Calculator (with strict null/clinical safety checks)
calculatedMgPerKg() {
    const profile = this.activePatientProfile;  
    if (!profile) return null;

    // Diet-only days (null weight) are skipped — use the most recent actual weigh-in.
    const weights = this.sortedWeighedLog;

    const latestWeight = weights.length > 0 ? parseFloat(weights[0].weightValue) : null;
    const dose = this.newMedDoseMg();
    if (!latestWeight || dose == null || latestWeight <= 0 || isNaN(latestWeight)) return null;

    const weightInKg = profile.weightUnit === 'lbs' ? latestWeight / 2.2046 : latestWeight;
    return (dose / weightInKg).toFixed(2);
},

// Returns the most recent weight log entry at or before a given date
getWeightAtDate(patientId, dateStr) {
    const targetDate = new Date(dateStr);
    if (isNaN(targetDate.getTime())) return null;

    // Only weighed days count — a diet-only day (null weight) must not mask an earlier weigh-in.
    const sorted = this.weightLog
        .filter(w => w.patientId === patientId
            && w.weightValue != null && !isNaN(parseFloat(w.weightValue))
            && new Date(w.date) <= targetDate)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    return sorted.length > 0 ? sorted[0].weightValue : null;
},

// Computes mg/kg using the weight closest to the med's event date
computeHistoricMgPerKg(doseMg, patientId, eventDateStr) {
    if (!doseMg || doseMg <= 0) return null;
    const weightAtEntry = this.getWeightAtDate(patientId, eventDateStr + 'T23:59:59');
    if (!weightAtEntry || weightAtEntry <= 0) return null;
    const profile = this.patients.find(p => p.id === patientId);
    const weightKg = profile?.weightUnit === 'lbs' ? weightAtEntry / 2.2046 : weightAtEntry;
    return (doseMg / weightKg).toFixed(2);
},


parseDateSafe(dateStr) {
            // 1. Try standard parsing (Works perfectly for our new ISO strings)
            let d = new Date(dateStr);
            if (!isNaN(d.getTime())) return d;
            
            // 2. Legacy Fallback (Sniffs out DD/MM vs MM/DD based on the numbers)
            const cleanStr = dateStr.split(',')[0]; 
            const parts = cleanStr.split(/[/\-]/);
            if (parts.length === 3) {
                // If the first number is > 12, it MUST be UK format (DD/MM/YYYY)
                if (parseInt(parts[0]) > 12) {
                    return new Date(`${parts[2]}-${parts[1]}-${parts[0]}T12:00:00`);
                } 
                // Otherwise, rely on native JS which expects US format (MM/DD/YYYY)
                return new Date(`${parts[2]}-${parts[0]}-${parts[1]}T12:00:00`);
            }
                       // Absolute fallback: Invalid Date — .getTime() → NaN, so all range
            // comparisons fail and the row drops out rather than posing as "today"
            console.warn('VCH: unparseable date encountered —', dateStr);
            return new Date(NaN);
        },
        
countWindow() {
    // Preferred count window in seconds; guard against stale/invalid stored values
    return [15, 30, 60].includes(this.appSettings.countDuration) ? this.appSettings.countDuration : 30;
},
        
startCount() {
    if (!this.activePatientId) return alert("Please establish or select a patient profile first.");
    clearInterval(this.timerInterval);   // ← guard: restarting mid-count must kill the old timer
    const duration = this.countWindow(); // 15, 30 or 60s from settings
    this.isCounting = true;
    this.currentEffort = null;
    this.tapCount = 0;
    this.timeLeft = duration;
    this.finalRate = null;
    this.hasSavedCurrentCount = false; // Reset the save state
    this._acquireWakeLock();
    this._countStart = Date.now();     // ← anchor the count window to wall-clock time
    this.timerInterval = setInterval(() => {
        this.timeLeft = Math.max(0, duration - Math.round((Date.now() - this._countStart) / 1000));
        if (this.timeLeft <= 0) this.finishCount();
    }, 250);
},

cancelCount() {
    // Abort the current count without producing a reading
    clearInterval(this.timerInterval);
    this.isCounting = false;
    this.tapCount = 0;
    this.timeLeft = this.countWindow();
    this.finalRate = null;
    this._releaseWakeLock();
    this.hasSavedCurrentCount = false;
},        
        
registerTap() {
            if (!this.isCounting) return;
            this.tapCount++;
            
            // Haptic Feedback (Supported on Android, ignored silently on iOS)
            if (typeof navigator.vibrate === 'function') {
                navigator.vibrate(50); // Short 50ms physical pulse
            }
        },

finishCount() {
            clearInterval(this.timerInterval);
            this._releaseWakeLock();
            this.isCounting = false;
            // Extrapolate the tap count to a full minute (×4 for 15s, ×2 for 30s, ×1 for 60s)
            this.finalRate = Math.round(this.tapCount * (60 / this.countWindow()));
        },
        
setCountWindow(sec) {
    if (![15, 30, 60].includes(sec)) return;
    this.appSettings.countDuration = sec;
    this.saveAppSettings();                 // keep it as the new preference
    if (this.isCounting) this.startCount(); // restart cleanly with the new window
},
        
// Post-count nudge: "you've logged a rate, log the symptoms too". Cough shares the Monitor view
// with the counter, but activity moved to Wellness in the 2026-08 restructure — so this now has to
// cross views rather than just expand an accordion further down the same page.
nudgeToSymptom(type) {
            this.closeResult();

            if (type === 'cough') {
                this.showSymptomLog = true;
                this.openCoughForm();
            } else if (type === 'activity') {
                this.setView('wellness');          // also expands the activity card
                this.openActivityForm();
            }

            this.$nextTick(() => {
                const el = document.getElementById(type === 'activity' ? 'activitySection' : 'coughSection');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        },
        
closeResult() {
            // Manually closes the results panel and returns to the start screen
            this.finalRate = null;
            this.currentEffort = null;
            this.tapCount = 0;
            this.hasSavedCurrentCount = false;
        },
        
openMedForm() {
    this.editingMedId = null;
    this.editingInjectionId = null;
    this.newInjection = this._freshInjection();
    this.newMed = {
        eventDate: new Date().toISOString().split('T')[0],
        drugId: '', customName: '', brand: '', isStopped: false,
        openedDate: '', discardDays: '', form: 'tablet',
        tabletStrengthMg: '', tabletsPerDose: '',
        frequency: 'q12h',
        tabletsInStock: '',
        stockDate: new Date().toISOString().split('T')[0]
    };
    this.medSearch = '';
    this.medSearchOpen = false;
    this.showMedForm = true;
},
editMedication(id) {
    const m = this.medLedger.find(x => x.id === id);
    if (!m) return;
    this.medSearch = this.medSearchTextFor(m);
    this.medSearchOpen = false;
    this.newMed = {
        eventDate: m.eventDate,
        drugId: m.drugId,
        customName: m.customName || '',
        brand: m.brand || '',
        isStopped: !!m.isStopped,
        openedDate: m.openedDate || '',
        discardDays: m.discardDays != null ? m.discardDays : '',
        form: m.form || 'tablet',
        tabletStrengthMg: m.tabletStrengthMg != null ? m.tabletStrengthMg : '',
        tabletsPerDose: m.tabletsPerDose != null ? m.tabletsPerDose : '',
        frequency: m.frequency || 'q12h',
        tabletsInStock: m.tabletsInStock != null ? m.tabletsInStock : '',
        stockDate: m.stockDate || m.eventDate
    };
    this.editingMedId = id;
    this.editingInjectionId = null;
    this.newInjection = this._freshInjection();
    this.showMedForm = true;
},

// "Log a change (today)": open the med form seeded from an existing entry (drug identity + dose)
// but as a NEW record dated today, so a dose change keeps the history accurate rather than
// back-dating the original. Mirrors iOS MedsView "Log a change (today)".
logMedChange(id) {
    const m = this.medLedger.find(x => x.id === id);
    if (!m) return;
    this.newMed = {
        eventDate: new Date().toISOString().split('T')[0],   // today, NOT the original date
        drugId: m.drugId,
        customName: m.customName || '',
        brand: m.brand || '',
        isStopped: false,                                    // a change starts a fresh active run
        openedDate: '', discardDays: '',                     // stock is not carried over
        form: m.form || 'tablet',
        tabletStrengthMg: m.tabletStrengthMg != null ? m.tabletStrengthMg : '',
        tabletsPerDose: m.tabletsPerDose != null ? m.tabletsPerDose : '',
        frequency: m.frequency || 'q12h',
        doseTimes: Array.isArray(m.doseTimes) ? [...m.doseTimes] : [],
        tabletsInStock: '',
        stockDate: new Date().toISOString().split('T')[0]
    };
    this.medSearch = this.medSearchTextFor(m);   // seed the search box from the source entry
    this.medSearchOpen = false;
    this.editingMedId = null;          // NEW entry, not an edit
    this.editingInjectionId = null;
    this.newInjection = this._freshInjection();
    this.showMedForm = true;
},

// Quick stock update: set the current count + re-anchor to today, editing the entry IN PLACE (no
// new ledger row — stock is a running count, not a dose change). Mirrors iOS StockUpdateButton.
updateStock(id) {
    const m = this.medLedger.find(x => x.id === id);
    if (!m || m.isStopped) return;
    const unit = m.form === 'liquid' ? 'ml' : 'tablets';
    const current = m.tabletsInStock != null ? m.tabletsInStock : '';
    const val = prompt(`Current ${unit} in stock — updates the count as of today, without adding a new entry:`, current);
    if (val === null) return;                       // cancelled
    const n = parseFloat(val);
    m.tabletsInStock = isNaN(n) ? null : n;
    if (!isNaN(n)) m.stockDate = new Date().toISOString().split('T')[0];
    this.saveToStorage('vch_medLedger', this.medLedger);
    this.renderMedChart();
},

// "Stop this med (today)": append a NEW stopped entry dated today for the same drug, instead of
// back-dating the tapped entry to stopped. Mirrors iOS stopMedToday.
stopMedToday(id) {
    const m = this.medLedger.find(x => x.id === id);
    if (!m) return;
    const today = new Date().toISOString().split('T')[0];
    const key = this._drugKey(m);
    // One entry per day: if this drug already has an entry today, convert THAT to the stop rather
    // than pushing a duplicate; otherwise add a fresh stopped entry dated today.
    const sameDay = this.medLedger.find(e => e.patientId === (m.patientId || this.activePatientId)
        && e.eventDate === today && this._drugKey(e) === key);
    if (sameDay) {
        Object.assign(sameDay, {
            isStopped: true, doseMg: null, frequency: null, mgPerKg: null, tabletsPerDose: null,
            tabletStrengthMg: null, tabletsInStock: null, doseTimes: [], stockDate: null
        });
    } else {
        this.medLedger.push({
            id: this.generateId(),
            patientId: m.patientId || this.activePatientId,
            eventDate: today,
            drugId: m.drugId,
            customName: m.drugId === 'other' ? (m.customName || '') : null,
            brand: m.brand || null,
            isStopped: true,
            doseMg: null, frequency: null, mgPerKg: null, tabletsPerDose: null,
            form: m.form || 'tablet',
            openedDate: null, discardDays: null, tabletStrengthMg: null,
            tabletsInStock: null, doseTimes: [], stockDate: null
        });
    }
    this.saveToStorage('vch_medLedger', this.medLedger);
    this.renderMedChart();
},

        // Save function for the Ledger
addMedication() {
    if (!this.activePatientId) return alert("Clinical Entry Error: No patient selected.");
    // Injectable preparation → routes to its own array (§Feature 4).
    if (this.newMed.form === 'injectable') return this.saveInjection();
    if (!this.newMed.drugId) return alert("Clinical Entry Error: Please select a medication.");
    
    // Explicit null/empty check that works regardless of type
    if (!this.newMed.isStopped && (this.newMed.tabletStrengthMg === '' || this.newMed.tabletsPerDose === '')) {
        return alert("Clinical Entry Error: Please enter tablet strength and tablets per dose.");
    }

    const entry = {
        id: this.generateId(),
        patientId: this.activePatientId,
        eventDate: this.newMed.eventDate,
        drugId: this.newMed.drugId,
        customName: this.newMed.drugId === 'other' ? this.newMed.customName : null,
        brand: (this.newMed.brand || '').trim() || null,                     // trade name (formulary or custom)
        isStopped: this.newMed.isStopped,                                    // raw intent stored
        doseMg:           this.newMed.isStopped ? null : this.newMedDoseMg(),   // ← derived
        frequency:        this.newMed.isStopped ? null : this.newMed.frequency,
        mgPerKg:          this.newMed.isStopped ? null : this.calculatedMgPerKg(),
        tabletsPerDose:   this.newMed.isStopped ? null : parseFloat(this.newMed.tabletsPerDose),
        form:             this.newMed.form || 'tablet',
        openedDate:  this.newMed.isStopped ? null : (this.newMed.openedDate || null),
        discardDays: this.newMed.isStopped ? null : (this.newMed.discardDays === '' ? null : parseFloat(this.newMed.discardDays)),
        tabletStrengthMg: this.newMed.isStopped ? null : parseFloat(this.newMed.tabletStrengthMg),
        tabletsInStock: this.newMed.isStopped ? null : (this.newMed.tabletsInStock === '' ? null : parseFloat(this.newMed.tabletsInStock)),
        doseTimes: (this.newMed.isStopped || this.newMed.frequency === 'PRN') ? [] : [...new Set(this.newMed.doseTimes)].sort(),
        stockDate:      this.newMed.isStopped ? null : (this.newMed.stockDate || this.newMed.eventDate),
    };

    // One entry per (drug, day): if a DIFFERENT entry for this drug already exists on this date,
    // confirm before replacing it so the ledger never holds ambiguous same-day duplicates.
    const newKey = this._drugKey(entry);
    const clash = this.medLedger.find(m => m.patientId === entry.patientId
        && m.id !== this.editingMedId
        && m.eventDate === entry.eventDate
        && this._drugKey(m) === newKey);
    if (clash) {
        if (!confirm(`There's already an entry for ${this.medDisplayName(clash)} on ${entry.eventDate}. Replace it so each day keeps a single record?`)) {
            return;   // abort — keep the form open
        }
        this.medLedger = this.medLedger.filter(m => m.id !== clash.id);
    }

    if (this.editingMedId) {
        const idx = this.medLedger.findIndex(m => m.id === this.editingMedId);
        if (idx !== -1) {
            entry.id = this.editingMedId;
            entry.patientId = this.medLedger[idx].patientId;
            this.medLedger.splice(idx, 1, entry);
        } else {
            this.medLedger.push(entry);   // edited entry was the one we just removed as a clash
        }
        this.editingMedId = null;
    } else {
        this.medLedger.push(entry);
    }

    // Conversion: an existing injectable was switched to a tablet/liquid med → drop the injection.
    if (this.editingInjectionId) {
        this.injectionLog = this.injectionLog.filter(e => e.id !== this.editingInjectionId);
        this.saveToStorage('vch_injectionLog', this.injectionLog);
        this.editingInjectionId = null;
    }

    this.saveToStorage('vch_medLedger', this.medLedger);
    this.renderMedChart();

    this.newMed = {
        eventDate: this.newMed.eventDate,
        drugId: '', customName: '', brand: '', isStopped: false,
        tabletStrengthMg: '', tabletsPerDose: '',
        frequency: 'q12h',
        form: 'tablet',
        tabletsInStock: '',
        stockDate: new Date().toISOString().split('T')[0]
    };
    this.medSearch = '';
    this.medSearchOpen = false;
    this.showMedForm = false;
},

getComputedAction(entry) {
    if (entry.isStopped) return 'Stopped';

    // Get all non-stopped entries for this drug+patient, sorted oldest first
    const priorEntries = this.medLedger
        .filter(m =>
            m.patientId === entry.patientId &&
            this._drugKey(m) === this._drugKey(entry) &&
            !m.isStopped &&
            new Date(m.eventDate) < new Date(entry.eventDate)
        );

    // Was there a 'Stopped' entry between the last dose entry and this one?
    const lastStop = this.medLedger
        .filter(m =>
            m.patientId === entry.patientId &&
            this._drugKey(m) === this._drugKey(entry) &&
            m.isStopped &&
            new Date(m.eventDate) <= new Date(entry.eventDate)
        )
        .sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate))[0];

    const lastDoseBefore = priorEntries
        .sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate))[0];

    // If the most recent stop happened AFTER the most recent prior dose, this is a fresh start
    if (lastStop && (!lastDoseBefore || new Date(lastStop.eventDate) > new Date(lastDoseBefore.eventDate))) {
        return 'Started';
    }

    return priorEntries.length === 0 ? 'Started' : 'Adjusted';
},

// Doses per day for the stored frequency codes (PRN is unpredictable → 0)
dosesPerDay(freq) {
    return { q24h: 1, q12h: 2, q8h: 3 }[freq] || 0;
},

// Labels + units for the current preparation type
medUnits(form) {
    return form === 'liquid'
        ? { strengthLabel: 'Concentration (mg/ml)', doseLabel: 'ml per Dose',     stockLabel: 'Total ml in Stock', dose: 'ml',  count: 'ml' }
        : { strengthLabel: 'Tablet Strength (mg)',  doseLabel: 'Tablets per Dose', stockLabel: 'Tablets in Stock',  dose: 'tab', count: 'tab' };
},

_drugKey(m) { return m.drugId === 'other' ? 'other:' + (m.customName || '') : m.drugId; },

// Projects run-out from a med entry's stock data. Returns null if not computable.
medStockProjection(entry) {
    if (!entry || entry.isStopped) return null;
    const perDose = parseFloat(entry.tabletsPerDose);
    const stock   = parseFloat(entry.tabletsInStock);
    const perDay  = this.dosesPerDay(entry.frequency) * (perDose || 0);

    // (a) run-out from consumption
    let runOutDate = null, tabletsPerDay = null;
    if (stock >= 0 && perDay > 0) {
        tabletsPerDay = perDay;
        const base = new Date(entry.stockDate || entry.eventDate);
        base.setHours(0, 0, 0, 0);
        runOutDate = new Date(base.getTime() + Math.floor(stock / perDay) * 86400000);
    }

    // (b) in-use expiry from opened date + shelf life
    let discardDate = null;
    const discardDays = parseFloat(entry.discardDays);
    if (entry.openedDate && !isNaN(discardDays) && discardDays > 0) {
        const od = new Date(entry.openedDate);
        if (!isNaN(od.getTime())) {
            od.setHours(0, 0, 0, 0);
            discardDate = new Date(od.getTime() + discardDays * 86400000);
        }
    }

    if (!runOutDate && !discardDate) return null;

    // limiting factor = whichever is sooner
    let emptyDate, reason;
    if (runOutDate && discardDate) {
        if (discardDate <= runOutDate) { emptyDate = discardDate; reason = 'expiry'; }
        else                           { emptyDate = runOutDate;  reason = 'runout'; }
    } else if (discardDate) { emptyDate = discardDate; reason = 'expiry'; }
    else                    { emptyDate = runOutDate;  reason = 'runout'; }

    const now = new Date(); now.setHours(0, 0, 0, 0);
    return {
        tabletsPerDay,
        daysLeft:    Math.round((emptyDate - now) / 86400000),   // to the limiting date
        emptyDate:   emptyDate.toISOString().split('T')[0],       // limiting date
        runOutDate:  runOutDate  ? runOutDate.toISOString().split('T')[0]  : null,
        discardDate: discardDate ? discardDate.toISOString().split('T')[0] : null,
        reason       // 'runout' | 'expiry'
    };
},

// Graded stock status — same shape as getVaccineStatus, 7-day warn window
getStockStatus(emptyDate, reason) {
    if (!emptyDate) return null;
    const now = new Date(); now.setHours(0, 0, 0, 0);
    const due = new Date(emptyDate);
    if (isNaN(due.getTime())) return null;
    const days = Math.round((due - now) / 86400000);
    const exp  = reason === 'expiry';
    if (days < 0)   return { status: 'empty',    days, label: exp ? `Expired ${Math.abs(days)}d ago` : `Ran out ${Math.abs(days)}d ago`, color:'#7f1d1d', bg:'#fef2f2', border:'#fca5a5' };
    if (days === 0) return { status: 'empty',    days, label: exp ? 'Discard today!' : 'Empty today!',            color:'#dc2626', bg:'#fef2f2', border:'#fecaca' };
    if (days <= 7)  return { status: 'low',      days, label: `${days}d ${exp ? 'until discard' : 'of stock left'}`, color:'#d97706', bg:'#fffbeb', border:'#fde68a' };
    if (days <= 14) return { status: 'upcoming', days, label: `${days}d left`,                                     color:'#0369a1', bg:'#f0f9ff', border:'#bae6fd' };
    return          { status: 'ok',              days, label: `${days}d left`,                                     color:'#15803d', bg:'#f0fdf4', border:'#bbf7d0' };
},

// Human "days left" for a stock projection — guards negatives ("Ran out 3d ago") and drops the
// tilde, which reads like a minus sign. `p` is a medStockProjection result (or null).
stockDaysLabel(p) {
    if (!p || p.daysLeft == null) return '—';
    const d = p.daysLeft, exp = p.reason === 'expiry';
    if (d < 0)   return `${exp ? 'Expired' : 'Ran out'} ${Math.abs(d)}d ago`;
    if (d === 0) return exp ? 'Discard today' : 'Out today';
    return `${d}d left`;
},

get allAlerts() {
    const list = [];
    const mods = this.activePatientProfile?.modules || {};
    if (mods.medications !== false) (this.medStockAlerts || []).forEach(a => list.push({
        id: 'stock-' + a.id, kind: 'Medication stock', view: 'medical',
        label: a.drugName, statusLabel: a.stockStatus.label,
        color: a.stockStatus.color, bg: a.stockStatus.bg, border: a.stockStatus.border, days: a.stockStatus.days
    }));
    if (mods.vaccinations !== false) (this.vaccineAlerts || []).forEach(a => list.push({
        id: 'vac-' + a.id, kind: 'Vaccination', view: 'wellness',
        label: a.displayLabel || a.type, statusLabel: a.vaccineStatus.label,
        color: a.vaccineStatus.color, bg: a.vaccineStatus.bg, border: a.vaccineStatus.border, days: a.vaccineStatus.days
    }));
    if (mods.antiparasitics !== false)(this.parasiticAlerts() || []).forEach(a => {
        const c = a.state === 'lapsed'
            ? { color:'#dc2626', bg:'#fef2f2', border:'#fecaca' }
            : { color:'#d97706', bg:'#fffbeb', border:'#fde68a' };
        list.push({
            id: 'par-' + a.id, kind: 'Parasite cover', view: 'wellness',
            label: a.label, statusLabel: a.state === 'lapsed' ? 'Lapsed' : (a.state === 'partial' ? 'Partial' : 'Gap'),
            color: c.color, bg: c.bg, border: c.border, days: a.cardiac ? -100 : -50
        });
    });
    return list.sort((x, y) => (x.days ?? 0) - (y.days ?? 0));
},

get medStockAlerts() {
    return this.currentMedStock()
        .filter(r => r.status && (r.status.status === 'low' || r.status.status === 'empty'))
        .map(r => ({ id: r.entry.id, drugName: r.name, projection: r.projection, stockStatus: r.status }))
        .sort((a, b) => a.stockStatus.days - b.stockStatus.days);
},

// Current active meds for the patient, newest entry per drug, projection attached
currentMedStock() {
    if (!this.activePatientId) return [];
    const latestByDrug = {};
    [...this.medLedger]
        .filter(m => m.patientId === this.activePatientId)
        .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate))
        .forEach(m => { latestByDrug[this._drugKey(m)] = m; });
    return Object.values(latestByDrug)
        .filter(m => !m.isStopped)
        .map(m => {
            const name = this.medDisplayName(m);
            const projection = this.medStockProjection(m);
            const isLiquid = m.form === 'liquid';
            return { entry: m, name, projection,
                     status: projection ? this.getStockStatus(projection.emptyDate, projection.reason) : null,
                     isLiquid, doseUnit: isLiquid ? 'ml' : 'tab' };
        })
        .sort((a, b) => a.name.localeCompare(b.name));
},

        
// Sort ledger chronologically (newest first) to avoid Alpine array freezing
sortedMedLedger() {
    if (!this.activePatientId) return [];
    return this.medLedger
        .filter(med => med.patientId === this.activePatientId)
        .sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate))
        .map(med => {
            const action = this.getComputedAction(med);
            // Compute mg/kg from the weight log at time of the med event
            const dynamicMgPerKg = (!med.isStopped && med.doseMg)
                ? this.computeHistoricMgPerKg(med.doseMg, med.patientId, med.eventDate)
                : null;
            // Flag if weight has changed enough to alter the dose band
            const storedVal = parseFloat(med.mgPerKg);
            const dynamicVal = parseFloat(dynamicMgPerKg);
            const weightChanged = !isNaN(storedVal) && !isNaN(dynamicVal) && 
                                  Math.abs(dynamicVal - storedVal) >= 0.05;
            return {
                ...med,
                action,
                isMajorChange: action !== 'Adjusted',
                dynamicMgPerKg,
                weightChanged
            };
        });
},

deleteMedication(id) {
    if(confirm("Delete this medication entry? This will remove it from the patient's historical chart.")) {
        this.medLedger = this.medLedger.filter(med => med.id !== id);
        this.saveToStorage('vch_medLedger', this.medLedger);
        this.renderMedChart();
    }
},

// ── Medication type-ahead (mirrors the tested iOS DrugSearch) ───────────────────────────────
// Owners think in brand names, so search matches the generic AND every brand synonym, presenting
// the canonical generic. The 'other' sentinel is never a search result (custom = free text).
_drugNorm(s) { return (s || '').trim().toLowerCase(); },

// Chart/legend colour for a formulary drug: its FIRST class's palette colour (colour-by-class),
// falling back to the drug's own `color`. Mirrors iOS CatalogueData.color(for:).
drugColor(d) {
    if (!d) return '#64748b';
    const cls = (d.classes || [])[0];
    return (cls && this.drugClassColors[cls]) || d.color || '#64748b';
},

// Exact (case/space-insensitive) resolution → { id, brand } or null. brand is '' when the query
// matched the generic name, or the canonical brand spelling when it matched a brand.
drugResolveWithBrand(q) {
    const n = this._drugNorm(q);
    if (!n) return null;
    for (const [id, d] of Object.entries(this.formulary)) {
        if (id === 'other') continue;
        if (this._drugNorm(d.generic) === n) return { id, brand: '' };
        const b = (d.brands || []).find(x => this._drugNorm(x) === n);
        if (b) return { id, brand: b };
    }
    return null;
},

// Ranked partial suggestions: 0 generic-exact · 1 generic-prefix · 2 brand-prefix · 3 generic-substr
// · 4 brand-substr, alphabetical within a rank; empty for a blank/exact query. Max 8.
drugSearchMatches(q) {
    const n = this._drugNorm(q);
    if (!n || this.drugResolveWithBrand(q)) return [];
    const scored = [];
    for (const [id, d] of Object.entries(this.formulary)) {
        if (id === 'other') continue;
        const g = this._drugNorm(d.generic);
        let rank = null, mBrand = null;
        if (g === n) rank = 0;
        else if (g.startsWith(n)) rank = 1;
        else {
            const bp = (d.brands || []).find(x => this._drugNorm(x).startsWith(n));
            if (bp) { rank = 2; mBrand = bp; }
            else if (g.includes(n)) rank = 3;
            else { const bc = (d.brands || []).find(x => this._drugNorm(x).includes(n)); if (bc) { rank = 4; mBrand = bc; } }
        }
        if (rank !== null) scored.push({ id, generic: d.generic, matchedBrand: mBrand, rank });
    }
    scored.sort((a, b) => a.rank !== b.rank ? a.rank - b.rank : a.generic.localeCompare(b.generic));
    return scored.slice(0, 8);
},

// The visible search text for an existing entry (brand for a formulary drug carrying one, else the
// generic; the custom name for an 'other' product). Mirrors iOS DrugSearchField.onAppear.
medSearchTextFor(m) {
    if (!m || !m.drugId) return '';
    if (m.drugId === 'other') return m.customName || '';
    if ((m.brand || '').trim()) return m.brand;
    return this.formulary[m.drugId]?.generic || m.drugId;
},

// Keep newMed.drugId / brand / customName in step with the typed text (called on every input). An
// exact brand match records the brand; a generic match sets the drug; anything else → custom.
applyMedSearch() {
    const q = (this.medSearch || '').trim();
    const prevId = this.newMed.drugId;
    const r = this.drugResolveWithBrand(q);
    if (r) {
        this.newMed.drugId = r.id;
        this.newMed.customName = '';
        if (r.brand) this.newMed.brand = r.brand;   // a typed brand fills the brand field
        // Prefill the typical cadence when the drug CHANGES (still user-editable).
        if (r.id !== prevId) {
            const def = this.formulary[r.id]?.defaultFrequency;
            if (def) this.newMed.frequency = def;
        }
    } else if (!q) {
        this.newMed.drugId = ''; this.newMed.customName = '';
    } else {
        this.newMed.drugId = 'other'; this.newMed.customName = q;   // brand field left for the trade name
    }
    this.medSearchOpen = this.medSearchFocused && this.drugSearchMatches(q).length > 0;
},

// Pick a suggestion: set the text to the matched brand (or generic), then resolve identity.
selectMedSearch(m) {
    this.medSearch = m.matchedBrand || m.generic;
    this.applyMedSearch();
    this.medSearchOpen = false;
},

// ── Injectable type-ahead (INJECTABLE_FORMULARY: Cytopoint/Librela/Solensia…) ────────────────
// Matches the curated products by brand OR generic; picking one fills the name + label interval.
injectableMatches(q) {
    const n = (q || '').trim().toLowerCase();
    if (!n) return [];
    const out = [];
    for (const p of Object.values(this.injectableFormulary)) {
        const b = (p.brand || '').toLowerCase(), g = (p.generic || '').toLowerCase();
        if (b === n) continue;                          // already an exact match — nothing to suggest
        if (b.includes(n) || g.includes(n)) out.push(p);
    }
    return out.slice(0, 8);
},
selectInjectable(p) {
    this.newInjection.customName = p.brand;
    if (p.intervalDays) this.newInjection.intervalDays = p.intervalDays;
    this._refreshInjectionDue();
    this.injSearchOpen = false;
},

// Display name for a med entry — "Brand (Generic)" when a trade name is recorded, else the generic
// (or the custom name for an 'other' product). Mirrors iOS FormularyDrug.displayName.
medDisplayName(m) {
    const brand = (m.brand || '').trim();
    let generic;
    if (m.drugId === 'other') {
        generic = (m.customName || '').trim();
        if (!brand && !generic) return 'Custom';
    } else {
        generic = (this.formulary[m.drugId]?.generic) || m.drugId;
    }
    if (!brand)   return generic;
    if (!generic) return brand;
    return `${brand} (${generic})`;
},
medScheduleDefaults(freq) { return ({ q24h:['08:00'], q12h:['08:00','20:00'], q8h:['06:00','14:00','22:00'] })[freq] || []; },

// Currently-active meds: the latest non-stopped entry per drug, alphabetical by display name.
// Powers the "Current medications" + "Medication stock" panels (mirrors iOS CurrentMeds).
get currentMedsList() {
    const latest = {};
    this.medLedger.filter(m => m.patientId === this.activePatientId)
        .slice().sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate))
        .forEach(m => { latest[this._drugKey(m)] = m; });
    return Object.values(latest).filter(m => !m.isStopped)
        .sort((a, b) => this.medDisplayName(a).localeCompare(this.medDisplayName(b)));
},
// Strength label: "20mg" tablet / "5mg/ml" liquid; '' when not recorded.
medStrengthLabel(m) {
    if (m.tabletStrengthMg == null || m.tabletStrengthMg === '') return '';
    return m.form === 'liquid' ? `${m.tabletStrengthMg}mg/ml` : `${m.tabletStrengthMg}mg`;
},
// Regimen line: "0.5 tab · 10 mg · q12h" — per-dose count, total dose, frequency.
medRegimenText(m) {
    if (m.isStopped) return 'Discontinued';
    const unit = m.form === 'liquid' ? 'ml' : 'tab';
    const parts = [];
    if (m.tabletsPerDose != null && m.tabletsPerDose !== '') parts.push(`${m.tabletsPerDose} ${unit}`);
    if (m.doseMg != null && m.doseMg !== '') parts.push(`${m.doseMg} mg`);
    if (m.frequency) parts.push(m.frequency);
    return parts.join(' · ');
},
_dayKey(d = new Date()) { const y=d.getFullYear(), m=String(d.getMonth()+1).padStart(2,'0'), day=String(d.getDate()).padStart(2,'0'); return `${y}-${m}-${day}`; },

doseSlots(dayDate = new Date()) {
    const pid = this.activePatientId, slotDay = this._dayKey(dayDate), latest = {};
    (this.medLedger || []).filter(m => m.patientId === pid)
        .sort((a,b) => new Date(a.eventDate) - new Date(b.eventDate))
        .forEach(m => { latest[this._drugKey(m)] = m; });
    const slots = [];
    Object.entries(latest).forEach(([key, m]) => {
        if (m.isStopped || !(m.doseTimes && m.doseTimes.length)) return;
        const name = this.medDisplayName(m);
        m.doseTimes.forEach(t => { if (/^\d{2}:\d{2}$/.test(t)) slots.push({ drugKey:key, name, time:t, slotDay }); });
    });
    return slots.sort((a,b) => a.time.localeCompare(b.time) || a.name.localeCompare(b.name));
},
isDoseGiven(s) { return (this.medDoseLog || []).some(r => r.drugKey===s.drugKey && r.slotDay===s.slotDay && r.slotTime===s.time); },
toggleDose(s) {
    const i = (this.medDoseLog || []).findIndex(r => r.drugKey===s.drugKey && r.slotDay===s.slotDay && r.slotTime===s.time);
    if (i > -1) this.medDoseLog.splice(i,1);
    else this.medDoseLog.push({ id:this.generateId(), patientId:this.activePatientId, drugKey:s.drugKey, slotDay:s.slotDay, slotTime:s.time, givenAt:new Date().toISOString() });
    this.saveToStorage('vch_medDoseLog', this.medDoseLog);
},

// ── SUPPLEMENT MODULE ──────────────────────────────────────────────

_suppKey(s) { return s.productId === 'other' ? 'other:' + (s.customName || '') : s.productId; },

suppDisplayName(s) {
    if (s.productId === 'other') return s.customName || 'Custom Supplement';
    const p = this.suppFormulary[s.productId];
    return p ? p.brand : s.productId;
},

// Constituent ids for a ledger entry (product mapping, or manual ticks for custom)
suppConstituentIdsFor(s) {
    if (s.productId === 'other') {
        const ticked = Array.isArray(s.customConstituents) ? s.customConstituents : [];
        const extras = (Array.isArray(s.customExtras) ? s.customExtras : [])
            .map(n => 'custom:' + n.toLowerCase());
        return [...ticked, ...extras];
    }
    return this.suppFormulary[s.productId]?.constituents || [];
},

// Constituent ids for the entry currently being drafted in the form
newSuppConstituentIds() {
    if (!this.newSupp.productId) return [];
    if (this.newSupp.productId === 'other') {
        return [
            ...this.newSupp.customConstituents,
            ...this.newSupp.customExtras.map(n => 'custom:' + n.toLowerCase())
        ];
    }
    return this.suppFormulary[this.newSupp.productId]?.constituents || [];
},

// Grouped options for the <select> (optgroups per category)
supplementOptions() {
    const cats = [
        { id: 'cardiac',     label: 'Cardiac Combination Products' },
        { id: 'omega',       label: 'Omega-3 / Fish Oils' },
        { id: 'single',      label: 'Single-Agent Supplements' },
        { id: 'electrolyte', label: 'Potassium & Electrolytes' },
        { id: 'joint',       label: 'Joint Support' },
        { id: 'liver',       label: 'Liver Support' },
        { id: 'senior',      label: 'Senior / Cognitive' },
        { id: 'other',       label: 'Other' },
        { id: 'custom',      label: 'Custom' }
    ];
    return cats.map(cat => ({
        label: cat.label,
        items: Object.values(this.suppFormulary)
            .filter(p => p.category === cat.id)
            .map(p => ({ value: p.id, label: p.maker ? `${p.brand} (${p.maker})` : p.brand }))
            .sort((a, b) => a.label.localeCompare(b.label))
    })).filter(g => g.items.length > 0);
},

openSuppForm() {
    this.editingSuppId = null;
    this.newSupp = {
        eventDate: new Date().toISOString().split('T')[0],
        productId: '', customName: '', customConstituents: [], customExtras: [],
        isStopped: false, doseAmount: '', doseUnit: 'tablet(s)', frequency: 'q24h'
    };
    this.showSuppForm = true;
},

editSupplement(id) {
    const s = this.suppLedger.find(x => x.id === id);
    if (!s) return;
    this.newSupp = {
        eventDate: s.eventDate,
        productId: s.productId,
        customName: s.customName || '',
        customConstituents: Array.isArray(s.customConstituents) ? [...s.customConstituents] : [],
        customExtras: Array.isArray(s.customExtras) ? [...s.customExtras] : [],
        isStopped: !!s.isStopped,
        doseAmount: s.doseAmount != null ? s.doseAmount : '',
        doseUnit: s.doseUnit || 'tablet(s)',
        frequency: s.frequency || 'q24h'
    };
    this.editingSuppId = id;
    this.showSuppForm = true;
},

addSupplement() {
    if (!this.activePatientId) return alert("Clinical Entry Error: No patient selected.");
    if (!this.newSupp.productId) return alert("Clinical Entry Error: Please select a supplement.");
    if (this.newSupp.productId === 'other' && !this.newSupp.customName.trim()) {
        return alert("Clinical Entry Error: Please enter a name for the custom supplement.");
    }

    const entry = {
        id: this.generateId(),
        patientId: this.activePatientId,
        eventDate: this.newSupp.eventDate,
        productId: this.newSupp.productId,
        customName: this.newSupp.productId === 'other' ? this.newSupp.customName.trim() : null,
        customConstituents: this.newSupp.productId === 'other' ? [...this.newSupp.customConstituents] : null,
        customExtras: this.newSupp.productId === 'other' ? [...this.newSupp.customExtras] : null,
        isStopped: this.newSupp.isStopped,
        doseAmount: this.newSupp.isStopped ? null : (this.newSupp.doseAmount === '' ? null : this.newSupp.doseAmount),
        doseUnit:   this.newSupp.isStopped ? null : this.newSupp.doseUnit,
        frequency:  this.newSupp.isStopped ? null : this.newSupp.frequency
    };

    if (this.editingSuppId) {
        const idx = this.suppLedger.findIndex(s => s.id === this.editingSuppId);
        if (idx !== -1) {
            entry.id = this.editingSuppId;
            entry.patientId = this.suppLedger[idx].patientId;
            this.suppLedger.splice(idx, 1, entry);
        }
        this.editingSuppId = null;
    } else {
        this.suppLedger.push(entry);
    }
    
    this.saveToStorage('vch_suppLedger', this.suppLedger);
    this.renderMedChart();
    this.showSuppForm = false;
},

deleteSupplement(id) {
    if (confirm("Delete this supplement entry? This will remove it from the patient's historical chart.")) {
        this.suppLedger = this.suppLedger.filter(s => s.id !== id);
        this.saveToStorage('vch_suppLedger', this.suppLedger);
        this.renderMedChart();
    }
},

// Started / Adjusted / Stopped — mirrors getComputedAction()
getComputedSuppAction(entry) {
    if (entry.isStopped) return 'Stopped';

    const prior = this.suppLedger.filter(s =>
        s.patientId === entry.patientId &&
        this._suppKey(s) === this._suppKey(entry) &&
        !s.isStopped &&
        new Date(s.eventDate) < new Date(entry.eventDate)
    );

    const lastStop = this.suppLedger.filter(s =>
        s.patientId === entry.patientId &&
        this._suppKey(s) === this._suppKey(entry) &&
        s.isStopped &&
        new Date(s.eventDate) <= new Date(entry.eventDate)
    ).sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate))[0];

    const lastDoseBefore = prior.sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate))[0];

    if (lastStop && (!lastDoseBefore || new Date(lastStop.eventDate) > new Date(lastDoseBefore.eventDate))) {
        return 'Started';
    }
    return prior.length === 0 ? 'Started' : 'Adjusted';
},

// Ledger rows for the table (newest first, with action + constituent chips)
sortedSuppLedger() {
    if (!this.activePatientId) return [];
    return this.suppLedger
        .filter(s => s.patientId === this.activePatientId)
        .sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate))
        .map(s => {
            const action = this.getComputedSuppAction(s);
            return {
                ...s,
                action,
                isMajorChange: action !== 'Adjusted',
                displayName: this.suppDisplayName(s),
                doseLabel: s.doseAmount ? `${s.doseAmount} ${s.doseUnit || ''}`.trim() + (s.frequency ? ' ' + s.frequency : '') : null,
                chips: this.suppConstituentIdsFor(s).map(cid => ({
                    id: cid,
                    label: this.suppConstituentLabel(cid),
                    color: this.suppConstituentColor(cid)
                }))
            };
        });
},

// Active supplements = newest entry per product, not stopped
activeSupplements() {
    if (!this.activePatientId) return [];
    const latest = {};
    [...this.suppLedger]
        .filter(s => s.patientId === this.activePatientId)
        .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate))
        .forEach(s => { latest[this._suppKey(s)] = s; });
    return Object.values(latest).filter(s => !s.isStopped);
},

// ── WARNING ENGINE ─────────────────────────────────────────────────

// Constituents of the drafted entry already provided by another active supplement
newSuppDuplicateWarnings() {
    const ids = this.newSuppConstituentIds();
    if (!ids.length) return [];
    const draftKey = this._suppKey({ productId: this.newSupp.productId, customName: this.newSupp.customName });

    const clashes = {};
    this.activeSupplements()
        .filter(s => this._suppKey(s) !== draftKey)
        .forEach(s => {
            this.suppConstituentIdsFor(s).forEach(cid => {
                if (ids.includes(cid)) {
                    if (!clashes[cid]) clashes[cid] = [];
                    const name = this.suppDisplayName(s);
                    if (!clashes[cid].includes(name)) clashes[cid].push(name);
                }
            });
        });

    return Object.entries(clashes).map(([cid, sources]) => ({
        label: this.suppConstituentLabel(cid),
        note:  String(cid).startsWith('custom:') ? '' : (this.suppConstituents[cid]?.note || ''),
        sources
    }));
},

// Constituent ↔ medication cautions (e.g. potassium + spironolactone/ACE-i)
newSuppMedCautions() {
    const ids = this.newSuppConstituentIds();
    if (!ids.length || !this.activePatientId) return [];

    const latest = {};
    [...this.medLedger]
        .filter(m => m.patientId === this.activePatientId)
        .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate))
        .forEach(m => { latest[this._drugKey(m)] = m; });
    const activeDrugIds = Object.values(latest).filter(m => !m.isStopped).map(m => m.drugId);

    const out = [];
    ids.forEach(cid => {
        const mc = this.suppConstituents[cid]?.medCaution;
        if (!mc) return;
        const hits = mc.drugs.filter(d => activeDrugIds.includes(d));
        if (hits.length) {
            out.push({
                label: this.suppConstituents[cid].label,
                drugs: hits.map(d => this.formulary[d]?.generic || d),
                text: mc.text
            });
        }
    });
    return out;
},

// ── CHART EPOCHS ───────────────────────────────────────────────────

// Mirrors generateMedEpochs() — solid blocks per supplement
generateSuppEpochs() {
    if (!Array.isArray(this.suppLedger) || !this.activePatientId) return [];

    const petSupps = this.suppLedger
        .filter(s => s.patientId === this.activePatientId)
        .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());

    const epochs = [];
    const active = {};

    petSupps.forEach(s => {
        const ts = new Date(s.eventDate + 'T12:00:00').getTime();
        const key = this._suppKey(s);
        const action = this.getComputedSuppAction(s);

        if (action === 'Started' || action === 'Adjusted') {
            if (active[key]) { active[key].endTime = ts; epochs.push({ ...active[key] }); }
            active[key] = {
                _isSupp: true,
                name: this.suppDisplayName(s),
                color: s.productId === 'other' ? '#64748b' : (this.suppFormulary[s.productId]?.color || '#64748b'),
                doseLabel: s.doseAmount ? `${s.doseAmount} ${s.doseUnit || ''}`.trim() + (s.frequency ? ' ' + s.frequency : '') : null,
                startTime: ts,
                endTime: null
            };
        } else if (action === 'Stopped') {
            if (active[key]) { active[key].endTime = ts; epochs.push({ ...active[key] }); delete active[key]; }
        }
    });

    const nowTs = new Date().getTime();
    Object.values(active).forEach(e => { e.endTime = nowTs; epochs.push(e); });
    return epochs;
},

// Label/colour resolvers that understand 'custom:' pseudo-constituents
suppConstituentLabel(cid) {
    if (String(cid).startsWith('custom:')) {
        return cid.slice(7).replace(/\b\w/g, ch => ch.toUpperCase());
    }
    return this.suppConstituents[cid]?.label || cid;
},

suppConstituentColor(cid) {
    return String(cid).startsWith('custom:') ? '#64748b' : (this.suppConstituents[cid]?.color || '#64748b');
},

// Adds the drafted free-text ingredient as a chip (deduplicated, case-insensitive)
addCustomIngredient() {
    const name = (this.newSuppExtraDraft || '').trim();
    if (!name) return;
    if (!this.newSupp.customExtras.some(n => n.toLowerCase() === name.toLowerCase())) {
        this.newSupp.customExtras.push(name);
    }
    this.newSuppExtraDraft = '';
},

// Every free-text ingredient ever used — feeds the datalist for consistent spelling
knownCustomIngredients() {
    const names = {};
    (this.suppLedger || []).forEach(s =>
        (Array.isArray(s.customExtras) ? s.customExtras : []).forEach(n => { names[n.toLowerCase()] = n; }));
    return Object.values(names).sort((a, b) => a.localeCompare(b));
},


// ── LEGACY MIGRATION (diet log free-text → supplement ledger) ──────

migrateLegacySupplements() {
    try {
        if (localStorage.getItem('vch_suppMigrated')) return;

        // Earliest appearance of each comma-separated token, per patient
        const seen = {};
        (this.weightLog || []).forEach(w => {
            if (!w.supplements || !String(w.supplements).trim() || !w.patientId) return;
            String(w.supplements).split(/[,;/]+/).map(t => t.trim()).filter(Boolean).forEach(token => {
                const key = w.patientId + '::' + token.toLowerCase();
                if (!seen[key] || new Date(w.date) < new Date(seen[key].date)) {
                    seen[key] = { patientId: w.patientId, name: token, date: w.date };
                }
            });
        });

        let count = 0;
        Object.values(seen).forEach(s => {
            const exists = this.suppLedger.some(e =>
                e.patientId === s.patientId &&
                (e.customName || '').toLowerCase() === s.name.toLowerCase());
            if (exists) return;
            this.suppLedger.push({
                id: this.generateId(),
                patientId: s.patientId,
                eventDate: String(s.date).split('T')[0],
                productId: 'other',
                customName: s.name,
                customConstituents: [],
                customExtras: [],
                isStopped: false,
                doseAmount: null, doseUnit: null, frequency: 'q24h',
                migratedFromDiet: true
            });
            count++;
        });

        if (count > 0) this.saveToStorage('vch_suppLedger', this.suppLedger);
        localStorage.setItem('vch_suppMigrated', '1');
        if (count > 0) console.info(`VCH: migrated ${count} legacy diet supplement entr${count === 1 ? 'y' : 'ies'}.`);
    } catch (e) {
        console.warn('VCH: legacy supplement migration skipped —', e);
    }
},

// --- SRR RECORDING (MANUAL & AUTOMATIC) ---
        
saveToHistory(manualRate = null, manualDate = null) {
            if (!this.activePatientId) return alert("Select a patient profile first.");

            const profile = this.activePatientProfile;
            const isManual = manualRate !== null;
            const rate = isManual ? manualRate : this.finalRate;
            
            let dateObj = manualDate ? new Date(manualDate) : new Date();
            if (isNaN(dateObj.getTime())) dateObj = new Date();

            const cutoff = parseInt(profile?.customSrrCutoff) || 30;
            const isEquivocal = rate >= cutoff && rate < cutoff + 10;

            const newLog = {
                id: this.generateId(),
                patientId: this.activePatientId,
                date: dateObj.toISOString(),
                time: dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                rate: rate,
                isManual: isManual,
                isEquivocal: isEquivocal,
                comment: isManual ? 'Manually recorded' : '',
                breathingEffort: this.currentEffort ?? null,      //  1–5 or null
                restState: this.currentRestState || null,   // NEW — 'asleep' | 'resting'
            };

            this.srrHistory.unshift(newLog); 
            this.saveToStorage('vch_srrHistory', this.srrHistory);

            this.currentPage = 1;
            this.$nextTick(() => { this.renderChart(); });

            // If it's a live count, we change the UI state to show the nudges instead of closing
            if (!isManual) {
                this.hasSavedCurrentCount = true; 
            } else {
                this.closeResult(); // Manual modal can close itself normally
            }
},

get liveEstimate() {
    if (!this._countStart || this.tapCount < 1) return 'Estimating…';
    const elapsed = (Date.now() - this._countStart) / 1000;
    if (elapsed < 3) return 'Estimating…';
    return '≈ ' + Math.round(this.tapCount * 60 / elapsed) + ' bpm so far';
},

get countProgress() {                 // 1 → 0
    return this.countWindow() ? Math.max(0, this.timeLeft / this.countWindow()) : 0;
},

async _acquireWakeLock() { try { this._wakeLock = await navigator.wakeLock?.request('screen'); } catch (_) {} },
_releaseWakeLock() { this._wakeLock?.release?.(); this._wakeLock = null; },

breathingEffortDescription(n) {
    return ({
        1: 'Imperceptible — barely any movement.',
        2: 'Very gentle — soft, shallow, effortless.',
        3: 'Normal — easy, regular rise and fall.',
        4: 'Mildly increased — deeper/faster, more visible movement.',
        5: 'Marked effort — deep movements with obvious abdominal push.'
    })[n] || 'Optional — how hard is your pet working to breathe?';
},

breathingEffortName(n) { return ({1:'Imperceptible',2:'Very gentle',3:'Normal',4:'Mildly increased',5:'Marked effort'})[n] || ''; },
        
saveManualSrr() {
            const rate = parseFloat(this.manualSrrInput);
            if (isNaN(rate) || rate < 0) return alert("Invalid respiratory rate.");
            if (rate > 120 && !confirm('That is an unusually high rate — save anyway?')) return;
            this.saveToHistory(rate, this.manualSrrDate);
            this.showManualSrr = false;
            this.manualSrrInput = null;
            this.manualSrrDate = '';
        },
        
        
get clinicalInterpretation() {
            if (this.finalRate === null || isNaN(this.finalRate)) return null;
            
            const rate = this.finalRate;
            const profile = this.activePatientProfile;
            const petName = profile?.name || 'the pet';
            
            // Dynamic Cutoff Engine
            const cutoff = profile?.customSrrCutoff ? parseInt(profile.customSrrCutoff) : 30;
            const dangerZone = cutoff + 10;

            if (rate >= dangerZone) {
                return { 
                    status: 'danger', 
                    title: 'Action Required', 
                    text: `Resting rate is significantly elevated above the target cutoff of ${cutoff}. Contact your veterinary surgeon.` 
                };
            }
            if (rate >= cutoff && rate < dangerZone) {
                return { 
                    status: 'equivocal', 
                    title: 'Equivocal (Borderline)', 
                    text: `This rate is borderline high (Target is < ${cutoff}). Please recount in 2-4 hours while ${petName} is in deep sleep.` 
                };
            }
            return { 
                status: 'normal', 
                title: 'Normal Range', 
                text: `Resting respiratory rate is within normal expected limits (< ${cutoff} bpm).` 
            };
},
        
        // Unified Date Range Calculator
getDateRange() {
            const now = new Date();
            const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
            const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            
            let startDate = null;
            let endDate = endOfToday;

            const dayOfWeek = startOfToday.getDay();
            const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

            switch (this.timeScale) {
                case 'thisWeek':
                    startDate = new Date(startOfToday);
                    startDate.setDate(startDate.getDate() + daysToMonday);
                    break;
                case 'lastWeek':
                    startDate = new Date(startOfToday);
                    startDate.setDate(startDate.getDate() + daysToMonday - 7);
                    endDate = new Date(startDate);
                    endDate.setDate(endDate.getDate() + 6);
                    endDate.setHours(23, 59, 59);
                    break;
                case 'thisMonth':
                    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                    break;
                case 'lastMonth':
                    startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                    endDate = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
                    break;
                case '60d':
                    startDate = new Date(startOfToday.getTime() - (60 * 24 * 60 * 60 * 1000));
                    break;
                case '90d':
                    startDate = new Date(startOfToday.getTime() - (90 * 24 * 60 * 60 * 1000));
                    break;
                case '180d':
                    startDate = new Date(startOfToday.getTime() - (180 * 24 * 60 * 60 * 1000));
                    break;
				case 'custom':
                    // 1. Check if BOTH fields contain something
                    if (this.customStartDate && this.customEndDate) {
                        const s = new Date(this.customStartDate + 'T00:00:00');
                        const e = new Date(this.customEndDate + 'T23:59:59');
                        
                        // 2. Verify they are valid dates AND logically ordered (Start <= End)
                        if (!isNaN(s.getTime()) && !isNaN(e.getTime()) && s <= e) {
                            startDate = s;
                            endDate = e;
                        } else {
                            // Logic failure (e.g., End date is before Start date, or date is invalid)
                            // Safe fallback: show all data until they fix the inputs
                            startDate = new Date(0);
                        }
                    } else {
                        // 3. Incomplete: They are still typing or haven't clicked the second box yet
                        // Safe fallback: show all data so the chart doesn't crash or go blank
                        startDate = new Date(0);
                    }
                    break;
                case 'all':
                default:
                    startDate = new Date(0);
                    break;
            }
            return { startDate, endDate };
        },
        
        // Sync the Vet Export module pills to the active patient's enabled modules.
// The user can still toggle pills afterwards — this only sets sensible defaults.
_syncVetExportModules() {
    const mods = this.activePatientProfile?.modules;
    if (!mods) return;
    Object.keys(this.vetExportModules).forEach(k => {
        if (k in mods) this.vetExportModules[k] = !!mods[k];
    });
},
        // ── Vet Export date range — mirrors getDateRange() but reads vetExportTimeScale ──
// ── Vet Export date range — unified with the dashboard filter ──
getVetExportDateRange() {
    return this.getDateRange();
},

get vetExportTimeScaleLabel() {
    return this.timeScaleLabel;
},
        
        // --- PAGINATION GETTERS ---
// paginatedHistory getter
// Data flow explanation:
//   srrHistory is stored newest-first (unshift on save).
//   getFilteredReadings() re-sorts oldest-first for Chart.js (ascending time axis).
//   We reverse() here to restore newest-first for the human-readable log list.
//   currentPage resets to 1 on both activePatientId and timeScale changes (see watchers in init()).
get paginatedHistory() {
    const listData = [...this.getFilteredReadings()].reverse(); // oldest→newest reversed back to newest→oldest
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return listData.slice(start, start + this.itemsPerPage);
},

get totalPages() {
    return Math.ceil(this.getFilteredReadings().length / this.itemsPerPage) || 1;
},

nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; },
prevPage() { if (this.currentPage > 1) this.currentPage--; },
        
// ---  FILTER (Respects Pet Selection) ---
getFilteredReadings() {
    // Force array check
    if (!Array.isArray(this.srrHistory) || this.srrHistory.length === 0 || !this.activePatientId) return [];
    
    let filtered = this.srrHistory.filter(item => item.patientId === this.activePatientId);
    const { startDate, endDate } = this.getDateRange();
    
    if (startDate) {
        filtered = filtered.filter(item => {
            const itemDate = this.parseDateSafe(item.date);
            return itemDate >= startDate && itemDate <= endDate;
        });
    }
    return filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
},
        
        
        // --- DATA MANAGEMENT ---
        
resetData() {
    if (!window.confirm("CRITICAL WARNING: This permanently clears ALL local data for ALL patients. Proceed?")) return;

    const keys = ['vch_patients','vch_weightLog','vch_srrHistory','vch_medLedger','vch_suppLedger',
                  'vch_diagnosisLog','vch_syncopeLog','vch_coughLog','vch_activityLog',
                  'vch_vaccinationLog','vch_antiparasiticLog','vch_injectionLog','vch_medDoseLog',
                  'vch_bloodResults', 'vch_echoMeasurements', 'vch_procedureLog', 'vch_allergyLog',
                  'vch_appointmentLog', 'vch_skinLog', 'vch_lumpLog', 'vch_lumpMeasurements',
                  'vch_orthoConditions', 'vch_orthoLog'];
    keys.forEach(k => localStorage.removeItem(k));

    this.patients = []; this.weightLog = []; this.srrHistory = []; this.medLedger = []; this.suppLedger = [];
    this.diagnosisLog = []; this.syncopeLog = []; this.coughLog = []; this.activityLog = [];
    this.vaccinationLog = []; this.antiparasiticLog = []; this.injectionLog = []; this.medDoseLog = [];
    this.bloodResults = []; this.echoMeasurements = []; this.procedureLog = []; this.allergyLog = [];
    this.appointmentLog = []; this.skinLog = []; this.lumpLog = []; this.lumpMeasurements = [];
    this.orthoConditions = []; this.orthoLog = [];
    this.activePatientId = null;

    [this.$refs.rrrChartCanvas, this.$refs.medChartCanvas, this.$refs.weightChartCanvas, this.$refs.injectionChartCanvas]
        .forEach(c => { const ch = c && Chart.getChart(c); if (ch) ch.destroy(); });

    alert("Database completely flushed.");
    this.startNewPatientOnboarding();
},
        
   calculateStats(data) {
    if (!data || data.length === 0) return { mean: 0, sd: 0, upperCI: 0, lowerCI: 0, upperRef: 0 };

    const n = data.length;
    const mean = data.reduce((sum, val) => sum + val.rate, 0) / n;

    const variance = data.reduce((sum, val) => sum + Math.pow(val.rate - mean, 2), 0) / (n - 1 || 1);
    const sd = Math.sqrt(variance);

    const se = sd / Math.sqrt(n);
    const marginOfError = 1.96 * se;

    return {
        mean,
        sd,
        upperCI:  mean + marginOfError,
        lowerCI:  mean - marginOfError,
        upperRef: mean + (2 * sd)   // Population reference range, not CI — stays wide regardless of n
    };
},        
                // --- CHARTING FUNCTIONS ---
                
toggleChartExpansion() {
    this.isChartExpanded = !this.isChartExpanded;

    this.$nextTick(() => {
        setTimeout(() => {
            if (this.isChartExpanded) {
                // Expanding: overlay is position:fixed, size is immediate — resize is enough
                const chart = Chart.getChart(this.$refs.rrrChartCanvas);
                if (chart) chart.resize();
            } else {
                // Collapsing: rebuild at the settled container size so a stale
                // oversized canvas can never prop the layout open
                this.renderChart();
            }
        }, 350);   // outlasts the card's 0.3s CSS transition
    });
},
        
get compiledTimeline() {
            if (!this.activePatientId) return [];
            
            const combinedEvents = [];
            const { startDate, endDate } = this.getDateRange();
            
            const safeTimestamp = (dateStr) => {
                if (!dateStr) return new Date().getTime();
                if (typeof dateStr === 'string' && dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) return new Date(`${dateStr}T12:00:00`).getTime(); 
                return this.parseDateSafe(dateStr).getTime();
            };

            const isWithinRange = (ts) => !startDate || (ts >= startDate.getTime() && ts <= endDate.getTime());

            // 1. SRR Data (We use the raw data here so the vet sees exact times, not daily means)
            this.getFilteredReadings().forEach(r => {
                if (isWithinRange(safeTimestamp(r.date))) {
                    combinedEvents.push({ type: 'SRR', dateObj: new Date(r.date), displayDate: new Date(r.date).toLocaleString(), summary: `${r.rate} bpm`, notes: r.comment || '' });
                }
            });

            // 2. Meds
            if (this.showMedications && Array.isArray(this.medLedger)) {
                this.medLedger.filter(m => m.patientId === this.activePatientId).forEach(m => {
                    if (isWithinRange(safeTimestamp(m.eventDate))) {
                        const drugName = this.medDisplayName(m);
                        combinedEvents.push({ type: 'Medication', dateObj: new Date(m.eventDate), displayDate: new Date(m.eventDate).toLocaleDateString(), summary: `${m.action.toUpperCase()}: ${drugName} (${m.doseMg ? m.doseMg+'mg' : '?'})`, notes: m.notes || '' });
                    }
                });
            }
            
             // 2b. Supplements
            if (this.showMedications && Array.isArray(this.suppLedger)) {
                this.suppLedger.filter(s => s.patientId === this.activePatientId).forEach(s => {
                    if (isWithinRange(safeTimestamp(s.eventDate))) {
                        combinedEvents.push({ type: 'Supplement', dateObj: new Date(s.eventDate), displayDate: new Date(s.eventDate).toLocaleDateString(), summary: `${this.getComputedSuppAction(s).toUpperCase()}: ${this.suppDisplayName(s)}`, notes: s.doseAmount ? `${s.doseAmount} ${s.doseUnit || ''} ${s.frequency || ''}`.trim() : '' });
                    }
                });
            }

            // 3. Cough
            if (this.showCoughOverlay && Array.isArray(this.coughLog)) {
                this.coughLog.filter(c => c.patientId === this.activePatientId).forEach(c => {
                    if (isWithinRange(safeTimestamp(c.date))) {
                        combinedEvents.push({ type: 'Cough', dateObj: new Date(c.date), displayDate: new Date(c.date).toLocaleDateString(), summary: `${c.severity} - ${c.frequencyCount}x/${c.frequencyPeriod}`, notes: `${c.description}. ${c.notes || ''}` });
                    }
                });
            }

            // 4. Activity
            if (this.showActivityOverlay && Array.isArray(this.activityLog)) {
                this.activityLog.filter(a => a.patientId === this.activePatientId).forEach(a => {
                    if (isWithinRange(safeTimestamp(a.date))) {
                        let metric = a.durationMins ? `${a.durationMins}m`
                            : ((a.distanceValue !== '' && a.distanceValue != null)
                                ? `${a.distanceValue} ${this.distanceLabel(a.distanceUnit || this.appSettings.distanceUnit)}` : '');
                        combinedEvents.push({ type: 'Activity', dateObj: new Date(a.date), displayDate: new Date(a.date).toLocaleDateString(), summary: `${a.status} ${metric ? '('+metric+')' : ''}`, notes: a.notes || '' });
                    }
                });
            }

            // 5. Syncope & Diagnosis
            if (this.showSyncopeOverlay && Array.isArray(this.syncopeLog)) {
                this.syncopeLog.filter(s => s.patientId === this.activePatientId).forEach(s => {
                    if (isWithinRange(safeTimestamp(s.date))) combinedEvents.push({ type: 'Syncope', dateObj: new Date(s.date), displayDate: new Date(s.date).toLocaleString(), summary: `Collapse Episode`, notes: s.notes || s.context || '' });
                });
            }
            if (this.showDiagnosisOverlay && Array.isArray(this.diagnosisLog)) {
                this.diagnosisLog.filter(d => d.patientId === this.activePatientId).forEach(d => {
                    if (isWithinRange(safeTimestamp(d.date))) combinedEvents.push({ type: 'Diagnosis', dateObj: new Date(d.date), displayDate: new Date(d.date).toLocaleDateString(), summary: d.diagnosis || d.stage || 'Update', notes: d.notes || '' });
                });
            }

            // Sort chronologically (newest first for the table)
            return combinedEvents.sort((a, b) => b.dateObj - a.dateObj);
        },
        
        // ── Offscreen SRR chart for PDF export — honours the Vet Export date range,
//    immune to on-screen zoom, logbook filter, and hidden-canvas staleness ──
_srrChartExportDataUrl(startDate, endDate) {
    const rows = this.srrHistory.filter(r => {
        if (r.patientId !== this.activePatientId) return false;
        if (!startDate) return true;
        const d = this.parseDateSafe(r.date);
        return d >= startDate && d <= endDate;
    });
    if (rows.length < 2) return null;

    // Daily mean aggregation — mirrors renderChart()
    const byDate = {};
    rows.forEach(r => {
        const dStr = r.date.split('T')[0];
        (byDate[dStr] = byDate[dStr] || []).push(r.rate);
    });
    const points = Object.keys(byDate).sort().map(dStr => ({
        x: new Date(dStr + 'T12:00:00').getTime(),
        y: Math.round(byDate[dStr].reduce((s, v) => s + v, 0) / byDate[dStr].length * 10) / 10
    }));

    const cutoff = parseInt(this.activePatientProfile?.customSrrCutoff) || 30;

    const canvas = document.createElement('canvas');
    canvas.width = 1200; canvas.height = 480;
    const chart = new Chart(canvas.getContext('2d'), {
        type: 'line',
        data: { datasets: [{
            label: 'Daily mean SRR (bpm)', data: points,
            borderColor: '#0e7490', backgroundColor: '#0e7490',
            pointRadius: 3, tension: 0.2
        }]},
        options: {
            responsive: false, animation: false, devicePixelRatio: 2,
            scales: {
                x: { type: 'time', time: { unit: points.length > 60 ? 'month' : 'day' } },
                y: { beginAtZero: true, title: { display: true, text: 'Breaths per minute' } }
            },
            plugins: {
                legend: { display: false },
                annotation: { annotations: { cutoffLine: {
                    type: 'line', yMin: cutoff, yMax: cutoff,
                    borderColor: '#dc2626', borderWidth: 2, borderDash: [6, 4],
                    label: { display: true, content: `Cutoff (${cutoff})`, position: 'end',
                             backgroundColor: '#dc2626', font: { size: 11 } }
                }}}
            }
        }
    });

    // Flatten onto white for JPEG
    const out = document.createElement('canvas');
    out.width = canvas.width; out.height = canvas.height;
    const ctx = out.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, out.width, out.height);
    ctx.drawImage(canvas, 0, 0);
    chart.destroy();
    return out.toDataURL('image/jpeg', 0.92);
},

// ── Offscreen weight chart for PDF export — honours the Vet Export date
//    range, immune to hidden-canvas staleness ──
_weightChartExportDataUrl(startDate, endDate) {
    const data = this.weightLog
        .filter(w => {
            if (w.patientId !== this.activePatientId) return false;
            if (w.weightValue == null || isNaN(parseFloat(w.weightValue))) return false; // diet-only day
            if (!startDate) return true;
            const d = this.parseDateSafe(w.date);
            return d >= startDate && d <= endDate;
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    if (data.length < 2) return null;

    const unit = this.activePatientProfile?.weightUnit || 'kg';
    const labels = data.map(w =>
        new Date(w.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' })
    );
    const values = data.map(w => parseFloat(w.weightValue));

    const canvas = document.createElement('canvas');
    canvas.width = 1200; canvas.height = 480;
    const chart = new Chart(canvas.getContext('2d'), {
        type: 'line',
        data: { labels, datasets: [{
            label: `Weight (${unit})`, data: values,
            borderColor: '#0f766e', backgroundColor: 'rgba(15, 118, 110, 0.08)',
            tension: 0.25, pointRadius: 3, fill: true, spanGaps: true
        }]},
        options: {
            responsive: false, animation: false, devicePixelRatio: 2,
            plugins: { legend: { display: false } },
            scales: {
                x: { ticks: { maxRotation: 0, maxTicksLimit: 12 } },
                y: { beginAtZero: false, title: { display: true, text: `Weight (${unit})` } }
            }
        }
    });

    // Flatten onto white for JPEG
    const out = document.createElement('canvas');
    out.width = canvas.width; out.height = canvas.height;
    const ctx = out.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, out.width, out.height);
    ctx.drawImage(canvas, 0, 0);
    chart.destroy();
    return out.toDataURL('image/jpeg', 0.92);
},

// ── Offscreen chart helpers for the SKIN and LUMP PDF sections ───────────────────────────────
//
// Same offscreen-canvas pattern as `_weightChartExportDataUrl` above: build the chart in a
// detached canvas so it cannot pick up a hidden/stale on-screen one, flatten onto white, destroy.

// Shared tail of every helper here: flatten `canvas` onto white and return a JPEG data URL.
_flattenChartToJpeg(canvas, chart) {
    const out = document.createElement('canvas');
    out.width = canvas.width; out.height = canvas.height;
    const ctx = out.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, out.width, out.height);
    ctx.drawImage(canvas, 0, 0);
    chart.destroy();
    return out.toDataURL('image/jpeg', 0.92);
},

// Twelve bars, one per calendar month — the yearly pattern.
//
// Deliberately computed from EVERYTHING ever logged and NOT from the export date range: a seasonal
// read taken from a 90-day window is not a seasonal read. Peak months are only picked out in colour
// once `skinPattern()` is willing to name them ('emerging' / 'established'), so the picture can
// never imply more than the words beside it do. Mirrors `MonthlyItchChart` on iOS.
_skinMonthlyChartExportDataUrl() {
    const pattern = this.skinPattern();
    if (!pattern || !pattern.monthly || !pattern.monthly.length) return null;

    const namesPeaks = pattern.confidence === 'emerging' || pattern.confidence === 'established';
    const months = [];
    const values = [];
    const colours = [];
    for (let m = 1; m <= 12; m++) {
        const stat = pattern.monthly.find(x => x.month === m);
        months.push(this.skinShortMonthName(m));
        values.push(stat ? Math.round(stat.mean * 10) / 10 : null);
        colours.push(namesPeaks && pattern.peakMonths.includes(m) ? '#f59e0b' : 'rgba(100,116,139,0.5)');
    }

    const canvas = document.createElement('canvas');
    canvas.width = 1200; canvas.height = 480;
    const chart = new Chart(canvas.getContext('2d'), {
        type: 'bar',
        data: { labels: months, datasets: [{ label: 'Average itch score', data: values,
                                             backgroundColor: colours, borderWidth: 0 }] },
        options: {
            responsive: false, animation: false, devicePixelRatio: 2,
            plugins: { legend: { display: false } },
            scales: { y: { min: 0, max: 10, title: { display: true, text: 'average score' } } }
        }
    });
    return this._flattenChartToJpeg(canvas, chart);
},

// The day-by-day itch line. Unlike the monthly bars this DOES honour the export range, like every
// other dated chart in the report. Days logged without a score are absent rather than plotted as 0
// — a nil score is "not scored", which is not the same claim as "no itching".
_skinScoreChartExportDataUrl(startDate, endDate) {
    const data = this.patientSkinLog()
        .filter(e => {
            if (!this._skinIsScored(e)) return false;
            if (!startDate) return true;
            const d = this.parseDateSafe(e.date);
            return d >= startDate && d <= endDate;
        })
        .sort((a, b) => (a.date || '').localeCompare(b.date || ''));
    if (data.length < 2) return null;

    const canvas = document.createElement('canvas');
    canvas.width = 1200; canvas.height = 420;
    const chart = new Chart(canvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: data.map(e => new Date(e.date).toLocaleDateString('en-GB',
                { day: 'numeric', month: 'short', year: '2-digit' })),
            datasets: [{ label: 'Itch score', data: data.map(e => Number(e.itchScore)),
                         borderColor: '#f59e0b', backgroundColor: 'rgba(245,158,11,0.08)',
                         tension: 0.25, pointRadius: 3, fill: true, spanGaps: true }]
        },
        options: {
            responsive: false, animation: false, devicePixelRatio: 2,
            plugins: { legend: { display: false } },
            scales: {
                x: { ticks: { maxRotation: 0, maxTicksLimit: 12 } },
                y: { min: 0, max: 10, title: { display: true, text: 'itch score (0–10)' } }
            }
        }
    });
    return this._flattenChartToJpeg(canvas, chart);
},

// One line per orthopaedic problem, plotted on the 0–4 scale a vet uses.
//
// NOT date-filtered, for the same reason the table is not. The y-axis is FIXED at 0–4 rather than
// scaled to the data: a fortnight that ran 0–1 would otherwise be drawn as a full-height climb,
// which on a document read for exactly this question would be alarming and wrong.
_orthoChartExportDataUrl() {
    const palette = ['#4338ca', '#0f766e', '#b45309', '#be123c', '#1d4ed8', '#166534'];
    const series = [];
    this.sortedOrthoConditions.forEach(c => {
        const points = this.orthoScoreSeries(c.id).map(p => ({ date: (p.date || '').split('T')[0], score: p.score }));
        if (points.length) series.push({ name: this.orthoDisplayName(c), points });
    });
    if (!series.length) return null;

    // Every scored date across every problem becomes a shared category axis, so two problems
    // scored on different days still line up against the same timeline.
    const labels = [...new Set(series.flatMap(x => x.points.map(p => p.date)))].sort();
    const datasets = series.map((x, i) => {
        const byDate = {};
        x.points.forEach(p => { byDate[p.date] = p.score; });
        return {
            label: x.name,
            data: labels.map(d => (d in byDate ? byDate[d] : null)),
            borderColor: palette[i % palette.length],
            backgroundColor: palette[i % palette.length],
            tension: 0.25, pointRadius: 3, fill: false, spanGaps: true
        };
    });

    const canvas = document.createElement('canvas');
    canvas.width = 1200; canvas.height = 460;
    const chart = new Chart(canvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: labels.map(d => new Date(`${d}T12:00:00`).toLocaleDateString('en-GB',
                { day: 'numeric', month: 'short', year: '2-digit' })),
            datasets
        },
        options: {
            responsive: false, animation: false, devicePixelRatio: 2,
            plugins: { legend: { display: true, position: 'bottom' } },
            scales: {
                x: { ticks: { maxRotation: 0, maxTicksLimit: 12 } },
                y: { min: 0, max: 4, ticks: { stepSize: 1 },
                     title: { display: true, text: 'lameness (0–4)' } }
            }
        }
    });
    return this._flattenChartToJpeg(canvas, chart);
},

// One line per lump, on shared axes, plotted as the longest way across — the measurement a vet
// records and the one least affected by which way round the owner measured.
//
// NOT date-filtered, for the same reason the lump TABLE is not: a size series only means anything
// whole. Clipping it to the report window would show a vet the last three months of a two-year
// record and invite exactly the wrong comparison. The y-axis is always anchored at zero: a chart
// auto-scaled to a 1 mm span turns measurement noise into a dramatic-looking climb, which on a
// document read for precisely this question would be alarming and wrong.
_lumpSizeChartExportDataUrl() {
    const palette = ['#0f766e', '#b45309', '#6d28d9', '#be123c', '#1d4ed8', '#166534'];

    // Every measurement date across every lump becomes a shared category axis, so two lumps
    // measured on different days still line up against the same timeline instead of each being
    // stretched across the full width.
    const series = [];
    this.sortedLumps.forEach(l => {
        const points = this.lumpMeasurementsFor(l.id)
            .map(m => ({ date: (m.date || '').split('T')[0], mm: this.lumpGreatestMm(m) }))
            .filter(p => p.mm !== null && p.date);
        if (points.length) series.push({ name: this.lumpDisplayName(l), points });
    });
    if (!series.length) return null;

    const labels = [...new Set(series.flatMap(s => s.points.map(p => p.date)))].sort();
    let maxMm = 0;
    const datasets = series.map((s, i) => {
        const byDate = {};
        s.points.forEach(p => { byDate[p.date] = p.mm; if (p.mm > maxMm) maxMm = p.mm; });
        return {
            label: s.name,
            data: labels.map(d => (d in byDate ? byDate[d] : null)),
            borderColor: palette[i % palette.length],
            backgroundColor: palette[i % palette.length],
            tension: 0.25, pointRadius: 3, fill: false, spanGaps: true
        };
    });

    const canvas = document.createElement('canvas');
    canvas.width = 1200; canvas.height = 460;
    const chart = new Chart(canvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: labels.map(d => new Date(`${d}T12:00:00`).toLocaleDateString('en-GB',
                { day: 'numeric', month: 'short', year: '2-digit' })),
            datasets
        },
        options: {
            responsive: false, animation: false, devicePixelRatio: 2,
            plugins: { legend: { display: true, position: 'bottom' } },
            scales: {
                x: { ticks: { maxRotation: 0, maxTicksLimit: 12 } },
                y: { min: 0, suggestedMax: Math.max(maxMm * 1.2, 10),
                     title: { display: true, text: 'mm across' } }
            }
        }
    });
    return this._flattenChartToJpeg(canvas, chart);
},

renderChart() {
    if (this.chartRenderTimeout) clearTimeout(this.chartRenderTimeout);
    this.chartRenderTimeout = setTimeout(() => {
        const canvas = this.$refs.rrrChartCanvas;

        // GATEKEEPER: Stop Chart.js from crashing if canvas is display: none
        if (!canvas || (canvas.offsetParent === null && !this.isChartExpanded)) return;
        const rawSrrData = this.getFilteredReadings() || [];
        const ctx = canvas.getContext('2d');
        const existingChart = Chart.getChart(canvas);
        if (existingChart) existingChart.destroy();
        if (rawSrrData.length < 2) return;
        const safeTimestamp = (dateStr) => {
            if (!dateStr) return new Date().getTime();
            if (typeof dateStr === 'string' && dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
                return new Date(`${dateStr}T12:00:00`).getTime();
            }
            return this.parseDateSafe(dateStr).getTime();
        };
        const combinedEvents = [];
        const { startDate, endDate } = this.getDateRange();
        // 1. SRR Data (Daily Mean Aggregation)
        const srrByDate = {};
        rawSrrData.forEach(r => {
            const dStr = r.date.split('T')[0];
            if (!srrByDate[dStr]) srrByDate[dStr] = [];
            srrByDate[dStr].push(r.rate);
        });
        Object.keys(srrByDate).forEach(dStr => {
            const rates = srrByDate[dStr];
            const meanRate = rates.reduce((sum, val) => sum + val, 0) / rates.length;
            combinedEvents.push({
                type: 'srr',
                timestamp: safeTimestamp(dStr),
                data: { rate: Math.round(meanRate * 10) / 10, readingCount: rates.length, date: dStr }
            });
        });
        // 2. Medication Data
        const safeMedLedger = Array.isArray(this.medLedger) ? this.medLedger : [];
        if (this.showMedications && safeMedLedger.length > 0) {
            const petMeds = safeMedLedger.filter(m => m.patientId === this.activePatientId);
            const medsByDate = {};
            petMeds.forEach(m => {
                const ts = safeTimestamp(m.eventDate);
                if (!startDate || (ts >= startDate.getTime() && ts <= endDate.getTime())) {
                    const dStr = new Date(ts).toISOString().split('T')[0];
                    if (!medsByDate[dStr]) medsByDate[dStr] = [];
                    medsByDate[dStr].push(m);
                }
            });
            Object.keys(medsByDate).forEach(dStr => combinedEvents.push({ type: 'med', timestamp: new Date(`${dStr}T12:00:00`).getTime(), data: medsByDate[dStr] }));
        }
        // 3. Symptom Data (Coughs & Activity)
        if (this.showCoughOverlay && Array.isArray(this.coughLog)) {
            this.coughLog.filter(c => c.patientId === this.activePatientId).forEach(c => {
                const ts = safeTimestamp(c.date);
                if (!startDate || (ts >= startDate.getTime() && ts <= endDate.getTime())) combinedEvents.push({ type: 'cough', timestamp: ts, data: c });
            });
        }
        if (this.showActivityOverlay && Array.isArray(this.activityLog)) {
            this.activityLog.filter(a => a.patientId === this.activePatientId).forEach(a => {
                const ts = safeTimestamp(a.date);
                if (!startDate || (ts >= startDate.getTime() && ts <= endDate.getTime())) combinedEvents.push({ type: 'activity', timestamp: ts, data: a });
            });
        }
        // 4. Clinical Events (Syncope & Diagnosis)
        if (this.showSyncopeOverlay && Array.isArray(this.syncopeLog)) {
            this.syncopeLog.filter(s => s.patientId === this.activePatientId).forEach(s => {
                const ts = safeTimestamp(s.date);
                if (!startDate || (ts >= startDate.getTime() && ts <= endDate.getTime())) combinedEvents.push({ type: 'syncope', timestamp: ts, data: s });
            });
        }
        if (this.showDiagnosisOverlay && Array.isArray(this.diagnosisLog)) {
            this.diagnosisLog.filter(d => d.patientId === this.activePatientId).forEach(d => {
                const ts = safeTimestamp(d.date);
                if (!startDate || (ts >= startDate.getTime() && ts <= endDate.getTime())) combinedEvents.push({ type: 'diagnosis', timestamp: ts, data: d });
            });
        }
        // Sort everything chronologically
        combinedEvents.sort((a, b) => a.timestamp - b.timestamp);

        // --- 5. BUILD SHARED COLUMN INDEX ---
        // In category mode, collapse events on the same calendar day into one
        // shared column so overlays sit on the SRR point. In true-time mode,
        // each distinct timestamp is its own column (the time scale aligns them).
        const useTime = this.srrUseRelationalTime;
        const dayKey = ts => new Date(ts).toISOString().split('T')[0];

        const columns = [];          // timestamp per column, in chronological order
        const keyToIndex = {};
        combinedEvents.forEach(ev => {
            const k = useTime ? ev.timestamp : dayKey(ev.timestamp);
            if (!(k in keyToIndex)) {
                keyToIndex[k] = columns.length;
                columns.push(ev.timestamp);
            }
        });
        const n = columns.length;

        const labels = columns.map(ts => {
            if (useTime) return ts;
            const d = new Date(ts);
            if (n <= 14) return d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' });
            if (n <= 60) return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
            return d.toLocaleDateString(undefined, { month: 'short', year: '2-digit' });
        });

        // Pre-sized, index-addressable series arrays
        const srrDataPoints = Array(n).fill(null),  srrTooltips = Array(n).fill(null);
        const medDataPoints = Array(n).fill(null),  medColors = Array(n).fill('transparent'), medTooltips = Array(n).fill([]);
        const coughDataPoints = Array(n).fill(null), coughColors = Array(n).fill('transparent'), coughTooltips = Array(n).fill('');
        const activityDataPoints = Array(n).fill(null), activityTooltips = Array(n).fill('');
        const syncDataPoints = Array(n).fill(null), syncTooltips = Array(n).fill('');
        const diagDataPoints = Array(n).fill(null), diagTooltips = Array(n).fill('');

        let lastSrrRate = null;
        const srrValuesForStats = [];

        combinedEvents.forEach(ev => {
            const i = keyToIndex[useTime ? ev.timestamp : dayKey(ev.timestamp)];

            if (ev.type === 'srr') {
                const srrVal = ev.data.rate;
                srrValuesForStats.push(ev.data);
                lastSrrRate = srrVal;
                srrDataPoints[i] = srrVal;
                srrTooltips[i] = `Rate: ${srrVal} bpm${ev.data.readingCount > 1 ? ` (Mean of ${ev.data.readingCount})` : ''}`;
            }
            else if (ev.type === 'med') {
                medDataPoints[i] = lastSrrRate !== null ? lastSrrRate : 30;
                medColors[i] = this.formulary[ev.data[0].drugId]?.color || '#f59e0b';
                medTooltips[i] = ev.data.map(m => `💊 ${m.action}: ${this.medDisplayName(m)} (${m.doseMg ? m.doseMg + 'mg' : '?'})`);
            }
            else if (ev.type === 'syncope') {
                syncDataPoints[i] = lastSrrRate !== null ? lastSrrRate : 30;
                syncTooltips[i] = `⚠️ Syncope Episode\nNotes: ${ev.data.notes || ev.data.context || 'Recorded collapse/fainting'}`;
            }
            else if (ev.type === 'diagnosis') {
                diagDataPoints[i] = lastSrrRate !== null ? lastSrrRate : 30;
                const diagName = ev.data.diagnosis || ev.data.stage || ev.data.title || 'Status Update';
                diagTooltips[i] = `🩺 Clinical Update: ${diagName}\n${ev.data.notes ? 'Notes: ' + ev.data.notes : ''}`;
            }
            else if (ev.type === 'cough') {
                const c = ev.data;
                let cpd = parseFloat(c.frequencyCount);
                let coughVal;
                if (!isNaN(cpd)) {
                    if (c.frequencyPeriod === 'hour') cpd *= 24;
                    if (c.frequencyPeriod === 'week') cpd /= 7;
                    coughVal = Math.round(cpd * 10) / 10;
                } else { coughVal = 1; }
                coughDataPoints[i] = coughVal;

                if (c.severity === 'Severe') coughColors[i] = 'rgba(239, 68, 68, 0.85)';
                else if (c.severity === 'Moderate') coughColors[i] = 'rgba(245, 158, 11, 0.85)';
                else coughColors[i] = 'rgba(253, 224, 71, 0.85)';

                coughTooltips[i] = `Cough (${c.severity}): ${isNaN(parseFloat(c.frequencyCount)) ? 'Freq Unknown' : c.frequencyCount + 'x/' + c.frequencyPeriod} - ${c.description}`;
            }
            else if (ev.type === 'activity') {
                const a = ev.data;
                let actVal = null;
                if (this.activityPlotType === 'durationMins' && a.durationMins) actVal = parseFloat(a.durationMins);
                else if (this.activityPlotType === 'distance' && a.distanceValue !== '' && a.distanceValue != null) {
                    // normalise every point to the current global unit before plotting
                    const parsed = this.convertDistance(a.distanceValue, a.distanceUnit || this.appSettings.distanceUnit, this.appSettings.distanceUnit);
                    if (parsed !== null) actVal = parsed;
                }
                if (actVal !== null) {
                    activityDataPoints[i] = actVal;
                    activityTooltips[i] = `Activity (${a.status}): ${this.activityPlotType === 'durationMins' ? a.durationMins + 'm' : (a.distanceValue + ' ' + this.distanceLabel(a.distanceUnit || this.appSettings.distanceUnit))}`;
                }
            }
        });

        // Snap event markers onto the SRR point sharing their column, so they sit
        // exactly on the line rather than at the 30-bpm fallback.
        for (let i = 0; i < n; i++) {
            if (srrDataPoints[i] !== null) {
                if (medDataPoints[i]  !== null) medDataPoints[i]  = srrDataPoints[i];
                if (syncDataPoints[i] !== null) syncDataPoints[i] = srrDataPoints[i];
                if (diagDataPoints[i] !== null) diagDataPoints[i] = srrDataPoints[i];
            }
        }

        const stats = this.calculateStats(srrValuesForStats);
        const cutoff = parseInt(this.activePatientProfile?.customSrrCutoff) || 30;

        // Defensive fallback: treat undefined as true so lines show even if
        // state variables were not yet added to the Alpine data block
        const showCutoff  = this.showCutoffLine  !== false;
        const showMeanRef = this.showMeanRef     !== false;

        let annotations = {};

        if (showCutoff) {
            annotations.thresholdLine = {
                type: 'line',
                yMin: cutoff,
                yMax: cutoff,
                borderColor: 'rgb(220, 38, 38)',
                borderWidth: 2,
                borderDash: [6, 4],
                label: {
                    display: true,
                    content: `Cutoff (${cutoff})`,
                    position: 'end',
                    backgroundColor: 'rgba(220,38,38,0.85)',
                    color: '#fff',
                    font: { size: 11 }
                }
            };
        }

        if (showMeanRef && srrValuesForStats.length >= 2) {
            annotations.meanLine = {
                type: 'line',
                yMin: stats.mean,
                yMax: stats.mean,
                borderColor: 'rgb(59, 130, 246)',
                borderWidth: 1.5,
                borderDash: [5, 4],
                label: {
                    display: true,
                    content: `Mean ${stats.mean.toFixed(1)}`,
                    position: 'start',
                    backgroundColor: 'rgba(59,130,246,0.85)',
                    color: '#fff',
                    font: { size: 11 }
                }
            };

            if (stats.sd > 0) {
                annotations.upperRefLine = {
                    type: 'line',
                    yMin: stats.upperRef,
                    yMax: stats.upperRef,
                    borderColor: 'rgba(99, 102, 241, 0.8)',
                    borderWidth: 1.5,
                    borderDash: [3, 5],
                    label: {
                        display: true,
                        content: `+2SD ${stats.upperRef.toFixed(1)}`,
                        position: 'start',
                        backgroundColor: 'rgba(99,102,241,0.8)',
                        color: '#fff',
                        font: { size: 11 }
                    }
                };
            }
        }

        const datasets = [
            {
                label: `${this.activePatientProfile?.name ?? 'Patient'}'s Respiratory Rate (bpm)`,
                data: srrDataPoints, srrTooltips: srrTooltips,
                borderColor: 'rgb(14, 165, 233)', backgroundColor: 'rgba(14, 165, 233, 0.08)',
                tension: 0.25, pointRadius: n > 30 ? 2 : 5,
                spanGaps: true, fill: true, order: 5, yAxisID: 'y'
            }
        ];
        
        // ── 7-day rolling mean overlay ──
        if (this.showRollingMean) {
            const rmWindow = 7 * 86400000;
            const allSrr = this.srrHistory
                .filter(r => r.patientId === this.activePatientId)
                .map(r => ({ t: this.parseDateSafe(r.date).getTime(), rate: r.rate }));
            const rollingData = Array(n).fill(null);
            for (let i = 0; i < n; i++) {
                if (srrDataPoints[i] === null) continue;
                const winVals = allSrr.filter(r => r.t > columns[i] - rmWindow && r.t <= columns[i]).map(r => r.rate);
                if (winVals.length >= 3) rollingData[i] = Math.round(winVals.reduce((s, v) => s + v, 0) / winVals.length * 10) / 10;
            }
            if (rollingData.some(d => d !== null)) datasets.push({
                label: '7-day rolling mean', type: 'line', data: rollingData,
                borderColor: '#f59e0b', backgroundColor: 'transparent',
                borderWidth: 2.5, borderDash: [8, 4], pointRadius: 0,
                tension: 0.35, spanGaps: true, fill: false, order: 4, yAxisID: 'y'
            });
        }

        if (this.showMedications && medDataPoints.some(d => d !== null)) datasets.push({ label: 'Medication Change', type: 'line', showLine: false, data: medDataPoints, backgroundColor: medColors, borderColor: '#ffffff', borderWidth: 2, pointStyle: 'triangle', rotation: 180, radius: 10, hoverRadius: 13, order: 3, medTooltips: medTooltips, yAxisID: 'y' });
        if (this.showSyncopeOverlay && syncDataPoints.some(d => d !== null)) datasets.push({
            label: 'Syncope Event',
            type: 'line',
            showLine: false,
            data: syncDataPoints,
            backgroundColor: '#ef4444',
            borderColor: '#b91c1c',
            borderWidth: 2,
            pointStyle: 'triangle',
            rotation: 0,          // points upwards
            radius: 12,
            hoverRadius: 15,
            order: 1,
            syncTooltips: syncTooltips,
            yAxisID: 'y'
        });
        if (this.showDiagnosisOverlay && diagDataPoints.some(d => d !== null)) datasets.push({ label: 'Diagnosis / Stage', type: 'line', showLine: false, data: diagDataPoints, backgroundColor: '#9333ea', borderColor: '#ffffff', borderWidth: 2, pointStyle: 'rectRot', radius: 10, hoverRadius: 13, order: 2, diagTooltips: diagTooltips, yAxisID: 'y' });
        if (this.showCoughOverlay && coughDataPoints.some(d => d !== null)) datasets.push({ label: 'Cough Frequency', type: 'bar', data: coughDataPoints, backgroundColor: coughColors, borderRadius: 4, barThickness: 12, order: 6, yAxisID: 'yCough', coughTooltips: coughTooltips });
        if (this.showActivityOverlay && activityDataPoints.some(d => d !== null)) datasets.push({ label: 'Activity', type: 'line', data: activityDataPoints, borderColor: '#10b981', backgroundColor: '#10b981', pointBackgroundColor: '#ffffff', pointBorderWidth: 2, tension: 0.3, spanGaps: true, order: 4, yAxisID: 'yActivity', activityTooltips: activityTooltips });

        // --- DYNAMIC SCALES ---
        const scalesObj = {
            x: this.srrUseRelationalTime
                ? { type: 'time', time: { tooltipFormat: 'dd MMM yyyy HH:mm' }, ticks: { maxRotation: 0 }, grid: { color: '#e2e8f0' } }
                : { type: 'category', ticks: { maxTicksLimit: 10, maxRotation: 0 } },
            y: { type: 'linear', display: true, position: 'left', beginAtZero: true, suggestedMax: 45, title: { display: true, text: 'Breaths / Min' } }
        };

        if (this.showCoughOverlay) scalesObj.yCough = { type: 'linear', display: true, position: 'right', beginAtZero: true, title: { display: true, text: 'Coughs / Day' }, grid: { drawOnChartArea: false } };
        if (this.showActivityOverlay) scalesObj.yActivity = { type: 'linear', display: true, position: 'right', beginAtZero: true, title: { display: true, text: this.activityPlotType === 'durationMins' ? 'Activity (Mins)' : 'Activity (Dist)' }, grid: { drawOnChartArea: false } };

        // --- RENDER CHART ---
        new Chart(ctx, {
            type: 'line',
            data: { labels: labels, datasets: datasets },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                plugins: {
                    annotation: { annotations: annotations },
                    tooltip: {
                        callbacks: {
                            title: (context) => context[0].label,
                            label: (context) => {
                                if (context.dataset.label === 'Medication Change') return context.dataset.medTooltips[context.dataIndex];
                                if (context.dataset.label === 'Syncope Event') return context.dataset.syncTooltips[context.dataIndex];
                                if (context.dataset.label === 'Diagnosis / Stage') return context.dataset.diagTooltips[context.dataIndex];
                                if (context.dataset.label === 'Cough Frequency') return context.dataset.coughTooltips[context.dataIndex];
                                if (context.dataset.label === 'Activity') return context.dataset.activityTooltips[context.dataIndex];
                                if (context.raw === null) return null;
                                return context.dataset.srrTooltips ? context.dataset.srrTooltips[context.dataIndex] : `Rate: ${context.parsed.y} bpm`;
                            }
                        }
                    },
                    zoom: {
                        pan: {
                            enabled: true,
                            mode: 'x',
                            onPanRejected: ({ chart }) => { console.warn('Pan boundary reached'); }
                        },
                        zoom: {
                            wheel: { enabled: true },
                            pinch: { enabled: true },
                            mode: 'x',
                            limits: {
                                x: { min: 'original', max: 'original', minRange: 1000 * 60 * 60 * 24 * 7 },
                                y: { min: 0, max: 100 }
                            }
                        }
                    }
                },
                scales: scalesObj
            }
        });
    }, 50);
},



renderWeightChart() {
    if (this.weightChartRenderTimeout) clearTimeout(this.weightChartRenderTimeout);
    this.weightChartRenderTimeout = setTimeout(() => {
        const canvases = [this.$refs.weightChartCanvas, this.$refs.weightChartTrendsCanvas]
            .filter(c => c && c.offsetParent !== null);
        if (!canvases.length) return;

        const data = this.weightLog
            .filter(w => w.patientId === this.activePatientId
                && w.weightValue != null && !isNaN(parseFloat(w.weightValue))) // skip diet-only days
            .sort((a, b) => new Date(a.date) - new Date(b.date));
        if (data.length < 2) return;

        const unit = this.activePatientProfile?.weightUnit || 'kg';
        const labels = data.map(w =>
            new Date(w.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' })
        );
        const values = data.map(w => parseFloat(w.weightValue));

        canvases.forEach(canvas => {
            const existingChart = Chart.getChart(canvas);
            if (existingChart) existingChart.destroy();
            new Chart(canvas.getContext('2d'), {
                type: 'line',
                data: {
                    labels,
                    datasets: [{
                        label: `Weight (${unit})`,
                        data: values,
                        borderColor: '#0f766e',
                        backgroundColor: 'rgba(15, 118, 110, 0.08)',
                        tension: 0.25,
                        pointRadius: data.length > 30 ? 3 : 5,
                        fill: true,
                        spanGaps: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                afterLabel: (ctx) => {
                                    const e = data[ctx.dataIndex];
                                    const parts = [];
                                    if (e.appetite && e.appetite !== 'Normal') parts.push(`Appetite: ${e.appetite}`);
                                    if (e.foodBrand) parts.push(`Diet: ${e.foodBrand}`);
                                    if (e.portionSize) parts.push(e.portionSize);
                                    if (e.notes) parts.push(e.notes);
                                    return parts;
                                }
                            }
                        }
                    },
                    scales: {
                        x: { ticks: { maxRotation: 0, maxTicksLimit: 10 }, grid: { color: '#e2e8f0' } },
                        y: { beginAtZero: false, title: { display: true, text: `Weight (${unit})` } }
                    }
                }
            });
        });
    }, 100);
},

// ===================== TRENDS DASHBOARD ENGINE =====================

_srrForPatient() {
    if (!Array.isArray(this.srrHistory) || !this.activePatientId) return [];
    return this.srrHistory
        .filter(r => r.patientId === this.activePatientId)
        .map(r => ({ t: this.parseDateSafe(r.date).getTime(), rate: r.rate }))
        .sort((a, b) => a.t - b.t);
},

_meanOf(arr) { return arr.reduce((s, v) => s + v, 0) / arr.length; },

_sdOf(arr) {
    if (arr.length < 2) return 0;
    const m = this._meanOf(arr);
    return Math.sqrt(arr.reduce((s, v) => s + (v - m) ** 2, 0) / (arr.length - 1));
},

// Full SRR rows for the active patient — keeps the fields the plain _srrForPatient() drops
// (breathing effort, rest state), which the effort/conditions insights need.
_srrRowsFull() {
    if (!Array.isArray(this.srrHistory) || !this.activePatientId) return [];
    return this.srrHistory
        .filter(r => r.patientId === this.activePatientId)
        .map(r => ({
            t: this.parseDateSafe(r.date).getTime(),
            rate: r.rate,
            effort: r.breathingEffort ?? null,
            restState: r.restState || null
        }))
        .sort((a, b) => a.t - b.t);
},

// Daily-mean SRR series, one point per UTC calendar day (day = UTC noon), ascending.
// Same aggregation renderChart() does inline; extracted so the consecutive-days insight can
// reason about DAYS rather than individual readings.
_srrDailyMeans(rows) {
    const src = rows || this._srrForPatient();
    const byDay = {};
    src.forEach(r => {
        const d = new Date(r.t);
        const key = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 12);
        (byDay[key] = byDay[key] || []).push(r.rate);
    });
    return Object.keys(byDay)
        .map(k => parseInt(k))
        .sort((a, b) => a - b)
        .map(t => ({ t, mean: Math.round(this._meanOf(byDay[t]) * 10) / 10, count: byDay[t].length }));
},

// Combined daily symptom burden: cough severity + reduced activity + collapse events
_dailyBurdenMap() {
    const sevMap = { Mild: 1, Moderate: 2, Severe: 3 };
    const actMap = { Reduced: 1, Lethargic: 2, Hyper: 1 };
    const map = {};
    const add = (date, pts) => { if (date && pts) map[date] = (map[date] || 0) + pts; };
    (this.coughLog || []).filter(c => c.patientId === this.activePatientId)
        .forEach(c => add(c.date, sevMap[c.severity] || 1));
    (this.activityLog || []).filter(a => a.patientId === this.activePatientId)
        .forEach(a => add(a.date, actMap[a.status] || 0));
    (this.syncopeLog || []).filter(s => s.patientId === this.activePatientId)
        .forEach(s => add(s.date, 3));
    return map;
},

_tileCss(state) {
    const c = {
        ok:      'background:#f0fdf4;border-color:#bbf7d0;color:#15803d;',
        warn:    'background:#fffbeb;border-color:#fde68a;color:#b45309;',
        danger:  'background:#fef2f2;border-color:#fecaca;color:#dc2626;',
        neutral: 'background:#f8fafc;border-color:#e2e8f0;color:#475569;'
    };
    return c[state] || c.neutral;
},

// ── Patient Snapshot scorecard ──────────────────────────────────────────

trendsSnapshot() {
    const tiles = [];
    if (!this.activePatientId) return tiles;
    const day = 86400000, now = Date.now();
    const cutoff = parseInt(this.activePatientProfile?.customSrrCutoff) || 30;
    const rows = this._srrForPatient();

    if (this.modOn('srr') && rows.length) {
        const last = rows[rows.length - 1];
        tiles.push({
            icon: 'fa-lungs', view: 'monitor', label: 'Latest SRR', value: last.rate + ' bpm',
            sub: new Date(last.t).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
            state: last.rate >= cutoff + 10 ? 'danger' : last.rate >= cutoff ? 'warn' : 'ok'
        });
    }

    const m7v  = rows.filter(r => r.t >= now - 7 * day).map(r => r.rate);
    const m30v = rows.filter(r => r.t >= now - 30 * day).map(r => r.rate);
    if (m7v.length >= 3 && m30v.length >= 6) {
        const m7 = this._meanOf(m7v), m30 = this._meanOf(m30v);
        const pct = m30 > 0 ? ((m7 - m30) / m30) * 100 : 0;
        tiles.push({
            icon: 'fa-chart-line', view: 'monitor', label: '7d vs 30d mean',
            value: `${m7.toFixed(1)} / ${m30.toFixed(1)}`,
            sub: (pct > 2 ? '▲ ' : pct < -2 ? '▼ ' : '→ ') + Math.abs(pct).toFixed(0) + '%',
            state: pct >= 20 ? 'danger' : pct >= 10 ? 'warn' : 'ok'
        });
    }

    if (this.modOn('weightDiet')) {
        const wl = (this.weightLog || [])
            .filter(w => w.patientId === this.activePatientId)
            .sort((a, b) => new Date(a.date) - new Date(b.date));
        if (wl.length >= 2) {
            const unit = this.activePatientProfile?.weightUnit || 'kg';
            const latest = wl[wl.length - 1];
            const latestT = new Date(latest.date).getTime();
            let ref = wl[0];
            wl.forEach(w => { if (new Date(w.date).getTime() <= latestT - 56 * day) ref = w; });
            const lv = parseFloat(latest.weightValue), rv = parseFloat(ref.weightValue);
            const pct = rv > 0 ? ((lv - rv) / rv) * 100 : 0;
            tiles.push({
                icon: 'fa-weight-scale', view: 'wellness', label: 'Weight', value: `${lv} ${unit}`,
                sub: (pct > 0 ? '▲ ' : pct < 0 ? '▼ ' : '→ ') + Math.abs(pct).toFixed(1) + '% vs '
                     + new Date(ref.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
                state: pct <= -5 ? 'danger' : Math.abs(pct) >= 5 ? 'warn' : 'ok'
            });
        }
    }

    if (this.modOn('syncopeLog')) {
        const sl = (this.syncopeLog || []).filter(s => s.patientId === this.activePatientId);
        if (sl.length) {
            const lastT = Math.max(...sl.map(s => this.parseDateSafe(s.date).getTime()));
            const days = Math.floor((now - lastT) / day);
            tiles.push({
                icon: 'fa-heart-crack', view: 'monitor', label: 'Last collapse event',
                value: days === 0 ? 'Today' : days + 'd ago',
                sub: sl.length + ' logged',
                state: days < 7 ? 'danger' : days < 30 ? 'warn' : 'ok'
            });
        } else {
            tiles.push({ icon: 'fa-heart-crack', view: 'monitor', label: 'Collapse events', value: 'None', sub: 'logged', state: 'neutral' });
        }
    }

    if (this.modOn('acvimStaging') && this.currentClinicalStatus) {
        const s = this.currentClinicalStatus;
        tiles.push({
            icon: 'fa-stethoscope', view: 'medical', label: s.diagnosis || 'Diagnosis',
            value: s.acvimStage && s.acvimStage !== 'N/A' ? s.acvimStage : '—',
            sub: new Date(s.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' }),
            state: ['Stage C', 'Stage D'].includes(s.acvimStage) ? 'warn' : 'neutral'
        });
    }

    // Next medication top-up — reuses the stock projection engine
    if (this.modOn('medications')) {
        const stock = this.currentMedStock().filter(r => r.status);
        if (stock.length) {
            const next = [...stock].sort((a, b) => a.status.days - b.status.days)[0];
            const d = next.status.days;
            tiles.push({
                icon: 'fa-prescription-bottle-medical', view: 'medical', label: 'Next med top-up',
                value: d < 0 ? Math.abs(d) + 'd ago' : d === 0 ? 'Today' : d + 'd',
                sub: next.name + (next.projection?.reason === 'expiry' ? ' (in-use expiry)' : '')
                     + ' · ' + new Date(next.projection.emptyDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
                state: d <= 0 ? 'danger' : d <= 7 ? 'warn' : 'ok'
            });
        } else if (this.hasAnyMedData()) {
            tiles.push({ icon: 'fa-prescription-bottle-medical', view: 'medical', label: 'Next med top-up', value: '—', sub: 'no stock data logged', state: 'neutral' });
        }
    }

    // Next vaccine due — soonest due date across the latest entry per vaccine (incl. add-ons)
    if (this.modOn('vaccinations')) {
        const byKey = {};
        [...(this.vaccinationLog || [])]
            .filter(v => v.patientId === this.activePatientId)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .forEach(v => {
                if (v.nextDueDate) {
                    const key = v.vaccineId || v.type;
                    if (!byKey[key]) byKey[key] = { label: v.type || v.vaccineId, due: v.nextDueDate };
                }
                (v.additionals || []).forEach(a => {
                    if (a.nextDueDate && !byKey['addon_' + a.id]) byKey['addon_' + a.id] = { label: a.label, due: a.nextDueDate };
                });
            });
        const soonest = Object.values(byKey).sort((a, b) => new Date(a.due) - new Date(b.due))[0];
        if (soonest) {
            const st = this.getVaccineStatus(soonest.due);
            tiles.push({
                icon: 'fa-syringe', view: 'wellness', label: 'Next vaccine',
                value: st.days < 0 ? Math.abs(st.days) + 'd overdue'
                     : st.days === 0 ? 'Due today'
                     : st.days <= 42 ? st.days + 'd'
                     : new Date(soonest.due).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' }),
                sub: soonest.label,
                state: st.days < 0 ? 'danger' : st.days <= 14 ? 'warn' : 'ok'
            });
        } else {
            tiles.push({ icon: 'fa-syringe', view: 'wellness', label: 'Next vaccine', value: '—', sub: 'no due date logged', state: 'neutral' });
        }
    }

    // Parasite cover — gap count plus the next product due (or overdue)
    if (this.modOn('antiparasitics')) {
        const alerts = this.parasiticAlerts();
        const byProduct = {};
        this.sortedAntiparasiticLog()
            .filter(e => e.nextDueDate)
            .forEach(e => {
                const key = e.productId === 'other' ? (e.productLabel || e.id) : e.productId;
                if (!byProduct[key]) byProduct[key] = e;   // log is newest-first → latest per product
            });
        const soonest = Object.values(byProduct).sort((a, b) => new Date(a.nextDueDate) - new Date(b.nextDueDate))[0];
        const st = soonest ? this.getParasiticStatus(soonest.nextDueDate) : null;
        tiles.push({
            icon: 'fa-shield-dog', view: 'wellness', label: 'Parasite cover',
            value: alerts.length === 0 ? 'Covered' : alerts.length + (alerts.length === 1 ? ' gap' : ' gaps'),
            sub: st ? ('Next: ' + (soonest.productLabel || soonest.productId) + ' '
                      + (st.days < 0 ? Math.abs(st.days) + 'd overdue' : st.days === 0 ? 'due today' : 'in ' + st.days + 'd'))
                    : (alerts.some(a => a.cardiac) ? 'cardiac-relevant gap' : ' '),
            state: (alerts.some(a => a.cardiac) || (st && st.days < 0)) ? 'danger'
                 : (alerts.length || (st && st.days <= 14)) ? 'warn' : 'ok'
        });
    }

    tiles.forEach(t => t.css = this._tileCss(t.state));
    return tiles;
},


// ── Smart Insights engine (rule-based) ─────────────────────────────────
trendsInsights() {
    const out = [];
    if (!this.activePatientId) return out;
    const day = 86400000, now = Date.now();
    const cutoff = parseInt(this.activePatientProfile?.customSrrCutoff) || 30;
    const rows = this._srrForPatient();
    const petName = this.activePatientProfile?.name || 'your pet';
    const win = (from, to) => {
        const v = rows.filter(r => r.t >= from && r.t < to).map(r => r.rate);
        return v.length >= 3 ? { mean: this._meanOf(v), sd: this._sdOf(v), n: v.length } : null;
    };
    const recent = win(now - 7 * day, now + day);
    const prior  = win(now - 14 * day, now - 7 * day);
    // Set by rule 4 so rule 18 stays quiet — "weight stable" must never sit next to a
    // weight-loss or fluid-gain warning.
    let weightFlagged = false;

    // 1. Week-on-week SRR trend (a sustained rise is the classic pre-CHF signal)
    if (recent && prior && prior.mean > 0) {
        const pct = ((recent.mean - prior.mean) / prior.mean) * 100;
        if (pct >= 20) {
            out.push({ severity: 'danger', icon: 'fa-arrow-trend-up', title: 'Sustained rise in resting respiratory rate',
                text: `The 7-day mean has risen ${pct.toFixed(0)}% week-on-week (${prior.mean.toFixed(1)} → ${recent.mean.toFixed(1)} bpm). A sustained rise of this magnitude may precede congestive decompensation; contact your veterinary surgeon.` });
        } else if (pct >= 10) {
            out.push({ severity: 'warn', icon: 'fa-arrow-trend-up', title: 'Upward drift in resting respiratory rate',
                text: `The 7-day mean is ${pct.toFixed(0)}% higher than the preceding week (${prior.mean.toFixed(1)} → ${recent.mean.toFixed(1)} bpm). Continue daily counts and watch for further rises.` });
        } else if (pct <= -15) {
            out.push({ severity: 'ok', icon: 'fa-arrow-trend-down', title: 'Improving respiratory trend',
                text: `The 7-day mean has fallen ${Math.abs(pct).toFixed(0)}% (${prior.mean.toFixed(1)} → ${recent.mean.toFixed(1)} bpm), consistent with a favourable response to current management.` });
        }
    }

    // 2. Mean at or above cutoff
    if (recent && recent.mean >= cutoff) {
        out.push({ severity: 'danger', icon: 'fa-triangle-exclamation', title: 'Mean rate at or above alarm cutoff',
            text: `The mean of the last 7 days is ${recent.mean.toFixed(1)} bpm (n=${recent.n}), at or above the target cutoff of ${cutoff} bpm. This warrants prompt veterinary review.` });
    }

    // 3. Rising variability
    if (recent && prior && prior.sd > 0 && recent.sd >= prior.sd * 1.5 && recent.sd - prior.sd >= 2) {
        out.push({ severity: 'info', icon: 'fa-wave-square', title: 'Increasing reading-to-reading variability',
            text: `The spread of readings has widened (SD ${prior.sd.toFixed(1)} → ${recent.sd.toFixed(1)} bpm). Greater scatter can reflect inconsistent counting conditions or genuine instability; count during settled sleep where possible.` });
    }

    // 4. Weight rules — cachexia and fluid-gain patterns
    if (this.modOn('weightDiet')) {
        const wl = (this.weightLog || []).filter(w => w.patientId === this.activePatientId)
            .sort((a, b) => new Date(a.date) - new Date(b.date));
        if (wl.length >= 2) {
            const latest = wl[wl.length - 1];
            const latestT = new Date(latest.date).getTime();
            const lv = parseFloat(latest.weightValue);
            let ref = wl[0];
            wl.forEach(w => { if (new Date(w.date).getTime() <= latestT - 42 * day) ref = w; });
            const rv = parseFloat(ref.weightValue);
            if (rv > 0 && ref !== latest) {
                const pct = ((lv - rv) / rv) * 100;
                if (pct <= -5) weightFlagged = true;
                if (pct <= -5) out.push({ severity: 'warn', icon: 'fa-weight-scale', title: 'Progressive weight loss',
                    text: `${petName} has lost ${Math.abs(pct).toFixed(1)}% of body weight since ${new Date(ref.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}. In cardiac patients this pattern raises the possibility of cardiac cachexia; discuss nutrition at your next visit.` });
            }
            const recentRef = [...wl].reverse().find(w => {
                const t = new Date(w.date).getTime();
                return t <= latestT - 3 * day && t >= latestT - 14 * day;
            });
            if (recentRef) {
                const rrv = parseFloat(recentRef.weightValue);
                const gpct = rrv > 0 ? ((lv - rrv) / rrv) * 100 : 0;
                if (gpct >= 5) weightFlagged = true;
                if (gpct >= 5) out.push({ severity: 'warn', icon: 'fa-droplet', title: 'Rapid weight gain',
                    text: `Body weight has increased ${gpct.toFixed(1)}% in under two weeks. Rapid gain in a cardiac patient can reflect fluid retention rather than true tissue gain; mention this to your veterinary surgeon, particularly if the breathing rate is also rising.` });
            }
        }
    }

    // 5. Diuretic burden (≥8 mg/kg/day furosemide = an ACVIM Stage D criterion)
    if (this.modOn('medications')) {
        const furo = (this.medLedger || [])
            .filter(m => m.patientId === this.activePatientId && m.drugId === 'furosemide')
            .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
        const lastF = furo[furo.length - 1];
        if (lastF && !lastF.isStopped && lastF.mgPerKg) {
            const dosesPerDay = { SID: 1, BID: 2, TID: 3, QID: 4 }[lastF.frequency] || 0;
            const daily = parseFloat(lastF.mgPerKg) * dosesPerDay;
            if (dosesPerDay && daily >= 8) out.push({ severity: 'warn', icon: 'fa-pills', title: 'High diuretic requirement',
                text: `The current furosemide dose equates to ~${daily.toFixed(1)} mg/kg/day. A requirement of ≥8 mg/kg/day is one ACVIM criterion for advanced (Stage D) disease; this is worth reviewing with your cardiologist.` });
        }
    }

    // 6. Symptom burden trend (fortnight vs preceding fortnight)
    if (this.modOn('coughLog', 'activityLog', 'syncopeLog')) {
        const burden = this._dailyBurdenMap();
        const sum = (from, to) => Object.entries(burden)
            .filter(([d]) => { const t = this.parseDateSafe(d).getTime(); return t >= from && t < to; })
            .reduce((s, [, v]) => s + v, 0);
        const bRecent = sum(now - 14 * day, now + day);
        const bPrior  = sum(now - 28 * day, now - 14 * day);
        if (bPrior >= 3 && bRecent >= bPrior * 1.5) {
            out.push({ severity: 'warn', icon: 'fa-head-side-cough', title: 'Rising symptom burden',
                text: `Combined cough, activity and collapse scores over the last fortnight (${bRecent}) are markedly higher than the preceding fortnight (${bPrior}). Review the symptom calendar and consider a check-up if this continues.` });
        } else if (bPrior >= 3 && bRecent <= bPrior * 0.5) {
            out.push({ severity: 'ok', icon: 'fa-face-smile', title: 'Falling symptom burden',
                text: `Combined symptom scores over the last fortnight (${bRecent}) are substantially lower than the preceding fortnight (${bPrior}) — an encouraging quality-of-life signal.` });
        }
    }

    // 7. Collapse event in the last 7 days
    if (this.modOn('syncopeLog')) {
        const recentSync = (this.syncopeLog || []).filter(s =>
            s.patientId === this.activePatientId && now - this.parseDateSafe(s.date).getTime() <= 7 * day);
        if (recentSync.length) out.push({ severity: 'danger', icon: 'fa-heart-crack', title: 'Recent collapse event',
            text: `${recentSync.length === 1 ? 'A collapse event has' : recentSync.length + ' collapse events have'} been logged within the last 7 days. Episodes of syncope or collapse in a cardiac patient always merit prompt veterinary assessment.` });
    }

    // 8. Monitoring adherence nudge
    if (this.modOn('srr')) {
        const n14 = rows.filter(r => r.t >= now - 14 * day).length;
        if (rows.length && n14 < 4) out.push({ severity: 'info', icon: 'fa-calendar-check', title: 'Sparse recent monitoring',
            text: `Only ${n14} resting rate ${n14 === 1 ? 'reading has' : 'readings have'} been logged in the last fortnight. Trends are far more reliable with regular counts — ideally once daily during settled sleep.` });
    }

    // ── Rules 10+ ───────────────────────────────────────────────────────────
    // Ported from the iOS app. Rules 1–9 compare weekly AVERAGES; these add day-level
    // patterns, mine fields already captured but never analysed (breathing effort, rest
    // state, activity minutes, cough context), and give the panel something positive to say
    // when the owner is doing everything right. Descriptive throughout — never diagnostic.

    // 10. Consecutive DAYS with the daily mean at/above cutoff. The classic action point:
    // a two-day run can hide inside a weekly average that still looks acceptable.
    if (this.modOn('srr')) {
        const daily = this._srrDailyMeans(rows);
        const lastDay = daily[daily.length - 1];
        if (lastDay && lastDay.t >= now - 3 * day) {
            let streak = 0, expected = lastDay.t;
            for (let i = daily.length - 1; i >= 0; i--) {
                if (daily[i].mean < cutoff || Math.abs(daily[i].t - expected) > day / 2) break;
                streak++;
                expected -= day;
            }
            if (streak >= 2) out.push({ severity: 'danger', icon: 'fa-calendar-xmark',
                title: `${streak} consecutive days at or above cutoff`,
                text: `The daily average resting rate has been at or above ${cutoff} bpm for ${streak} days in a row. Two or more consecutive days above the threshold is the standard point at which to contact your veterinary surgeon, even if ${petName} seems otherwise well.` });
        }
    }

    // 11. Intermittent highs despite an acceptable average (a wide upper tail).
    if (this.modOn('srr')) {
        const v30 = rows.filter(r => r.t >= now - 30 * day).map(r => r.rate);
        if (v30.length >= 8) {
            const m = this._meanOf(v30);
            const above = v30.filter(r => r >= cutoff).length;
            if (m < cutoff && above / v30.length >= 0.25) out.push({ severity: 'info', icon: 'fa-chart-scatter',
                title: 'Intermittent readings above cutoff',
                text: `The average rate is within target, but ${above} of the last ${v30.length} readings (${Math.round((above / v30.length) * 100)}%) reached ${cutoff} bpm or more. Occasional highs can reflect dreaming, warmth or excitement — note the circumstances of high counts so genuine change stands out.` });
        }
    }

    // 12. Activity level, fortnight vs preceding fortnight (mean minutes per LOGGED day).
    if (this.modOn('activityLog')) {
        const actDays = (this.activityLog || [])
            .filter(a => a.patientId === this.activePatientId && parseFloat(a.durationMins) > 0)
            .map(a => ({ t: this.parseDateSafe(a.date).getTime(), mins: parseFloat(a.durationMins) }));
        const actWindow = (from, to) => {
            const byDay = {};
            actDays.filter(a => a.t >= from && a.t < to)
                   .forEach(a => { byDay[a.t] = (byDay[a.t] || 0) + a.mins; });
            return Object.values(byDay);
        };
        const aRecent = actWindow(now - 14 * day, now + day);
        const aPrior  = actWindow(now - 28 * day, now - 14 * day);
        if (aRecent.length >= 3 && aPrior.length >= 3) {
            const rm = this._meanOf(aRecent), pm = this._meanOf(aPrior);
            if (pm > 0) {
                const pct = ((rm - pm) / pm) * 100;
                if (pct <= -30) out.push({ severity: 'warn', icon: 'fa-person-walking-arrow-right',
                    title: 'Falling activity levels',
                    text: `Average logged activity has fallen ${Math.abs(pct).toFixed(0)}% fortnight-on-fortnight (${pm.toFixed(0)} → ${rm.toFixed(0)} min per logged day). Reduced exercise tolerance is an important observation in cardiac patients — mention it at your next visit, particularly alongside any breathing changes.` });
                else if (pct >= 30) out.push({ severity: 'ok', icon: 'fa-person-walking',
                    title: 'Rising activity levels',
                    text: `Average logged activity is up ${pct.toFixed(0)}% fortnight-on-fortnight (${pm.toFixed(0)} → ${rm.toFixed(0)} min per logged day) — an encouraging sign of exercise tolerance and quality of life.` });
            }
        }
    }

    // 13. Breathing effort drifting upward (the 1–5 score saved with a count).
    if (this.modOn('srr')) {
        const full = this._srrRowsFull().filter(r => r.effort != null);
        const eRecent = full.filter(r => r.t >= now - 7 * day).map(r => r.effort);
        const ePrior  = full.filter(r => r.t >= now - 14 * day && r.t < now - 7 * day).map(r => r.effort);
        if (eRecent.length >= 3 && ePrior.length >= 3) {
            const rm = this._meanOf(eRecent), pm = this._meanOf(ePrior);
            if (rm - pm >= 0.8) out.push({ severity: 'warn', icon: 'fa-lungs',
                title: 'Breathing appears more effortful',
                text: `The average breathing-effort score has risen from ${pm.toFixed(1)} to ${rm.toFixed(1)} out of 5 week-on-week. Increased visible effort matters as much as the rate itself — if this persists, arrange a veterinary check.` });
        }
    }

    // 14. Counting-condition shift (asleep vs merely resting) that could explain a moved trend.
    if (this.modOn('srr')) {
        const full = this._srrRowsFull().filter(r => r.restState);
        const sRecent = full.filter(r => r.t >= now - 7 * day);
        const sPrior  = full.filter(r => r.t >= now - 14 * day && r.t < now - 7 * day);
        if (sRecent.length >= 3 && sPrior.length >= 3) {
            const share = arr => arr.filter(r => r.restState === 'asleep').length / arr.length;
            const rShare = share(sRecent), pShare = share(sPrior);
            if (Math.abs(rShare - pShare) >= 0.4) out.push({ severity: 'info', icon: 'fa-moon',
                title: 'Change in counting conditions',
                text: `${Math.round(rShare * 100)}% of this week's counts were taken during sleep, compared with ${Math.round(pShare * 100)}% the week before. Rates counted while merely resting typically run a little higher than true sleeping rates, so a shift like this can move the trend without any real change in ${petName}.` });
        }
    }

    // 15. More coughing at rest / overnight — a more meaningful pattern than excitement cough.
    if (this.modOn('coughLog')) {
        const atRest = (this.coughLog || [])
            .filter(c => c.patientId === this.activePatientId && /rest|night/i.test(c.context || ''))
            .map(c => this.parseDateSafe(c.date).getTime());
        const cRecent = atRest.filter(t => t >= now - 14 * day && t < now + day).length;
        const cPrior  = atRest.filter(t => t >= now - 28 * day && t < now - 14 * day).length;
        if (cRecent >= 3 && cRecent >= Math.max(cPrior, 1) * 2) out.push({ severity: 'info', icon: 'fa-bed',
            title: 'More coughing at rest',
            text: `${cRecent} coughing entries at rest or overnight have been logged this fortnight, up from ${cPrior} in the previous one. Cough occurring at rest is a more useful observation than cough on excitement — keep noting the context and share this pattern with your veterinary surgeon.` });
    }

    // 16. Response to the most recent medication change (7 days either side).
    if (this.modOn('medications') && this.modOn('srr')) {
        const changes = (this.medLedger || [])
            .filter(m => m.patientId === this.activePatientId && !m.isStopped)
            .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
        const last = changes[changes.length - 1];
        const t = last ? this.parseDateSafe(last.eventDate).getTime() : null;
        if (t && t <= now - 7 * day && t >= now - 35 * day) {
            const pre  = rows.filter(r => r.t >= t - 7 * day && r.t < t).map(r => r.rate);
            const post = rows.filter(r => r.t > t && r.t <= t + 7 * day).map(r => r.rate);
            if (pre.length >= 3 && post.length >= 3) {
                const preM = this._meanOf(pre), postM = this._meanOf(post);
                const delta = postM - preM;
                const name = this.medDisplayName(last);
                const when = new Date(t).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
                if (delta <= -2) out.push({ severity: 'ok', icon: 'fa-pills',
                    title: 'Favourable response to medication change',
                    text: `Since ${name} was changed on ${when}, the mean resting rate has fallen from ${preM.toFixed(1)} to ${postM.toFixed(1)} bpm — consistent with a favourable response to the adjustment.` });
                else if (delta >= 2) out.push({ severity: 'info', icon: 'fa-pills',
                    title: 'No fall in breathing rate since medication change',
                    text: `The mean resting rate has moved from ${preM.toFixed(1)} to ${postM.toFixed(1)} bpm since ${name} was changed on ${when}. Responses can take time and doses often need titration — this before/after comparison is exactly what your veterinary surgeon will want to see at review.` });
            }
        }
    }

    // 17. Monitoring-consistency praise (the inverse of rule 8's nudge).
    if (this.modOn('srr')) {
        const daysLogged = new Set(rows.filter(r => r.t >= now - 14 * day)
            .map(r => { const d = new Date(r.t); return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()); })).size;
        if (daysLogged >= 10) out.push({ severity: 'ok', icon: 'fa-award',
            title: 'Excellent monitoring consistency',
            text: `Readings have been logged on ${daysLogged} of the last 14 days. Regular counts like this are what make every trend on this screen trustworthy — keep it up.` });
    }

    // 18. Stable weight — only when neither weight warning above fired.
    if (this.modOn('weightDiet') && !weightFlagged) {
        const wl = (this.weightLog || []).filter(w => w.patientId === this.activePatientId)
            .sort((a, b) => new Date(a.date) - new Date(b.date));
        const first = wl[0], latest = wl[wl.length - 1];
        if (first && latest && parseFloat(first.weightValue) > 0 &&
            new Date(latest.date).getTime() - new Date(first.date).getTime() >= 42 * day) {
            const latestT = new Date(latest.date).getTime();
            let ref = first;
            wl.forEach(w => { if (new Date(w.date).getTime() <= latestT - 42 * day) ref = w; });
            const rv = parseFloat(ref.weightValue), lv = parseFloat(latest.weightValue);
            const pct = rv > 0 ? ((lv - rv) / rv) * 100 : 0;
            if (rv > 0 && Math.abs(pct) < 2) out.push({ severity: 'ok', icon: 'fa-weight-scale',
                title: 'Weight stable',
                text: `${petName}'s weight has held within 2% since ${new Date(ref.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} — a reassuring sign for appetite and nutrition, and a solid baseline for spotting future change.` });
        }
    }

    // 9. All clear — runs last so every rule above has had its say.
    if (!out.some(o => o.severity === 'danger' || o.severity === 'warn')) {
        out.unshift({ severity: 'ok', icon: 'fa-circle-check', title: 'No adverse trends detected',
            text: 'The current data show no concerning patterns in respiratory rate, weight, medication burden or symptom scores. Continue routine monitoring.' });
    }

    const css = {
        danger: 'background:#fef2f2;border-color:#fca5a5;color:#7f1d1d;',
        warn:   'background:#fffbeb;border-color:#fde68a;color:#92400e;',
        info:   'background:#eff6ff;border-color:#bfdbfe;color:#1e40af;',
        ok:     'background:#f0fdf4;border-color:#bbf7d0;color:#166534;'
    };
    const order = { danger: 0, warn: 1, info: 2, ok: 3 };
    out.sort((a, b) => order[a.severity] - order[b.severity]);
    out.forEach(i => i.css = css[i.severity]);
    return out;
},


// ── Week in review ──────────────────────────────────────────────────────
// A plain-English summary of the last 7 days, compared with the week before it. Ported from
// the iOS app, where it doubles as the body of a weekly notification; here it is the card at
// the top of the Trends screen. Descriptive, never diagnostic — same rule as trendsInsights.
trendsWeeklyDigest() {
    if (!this.activePatientId) return null;
    const day = 86400000, now = Date.now();
    const weekAgo = now - 7 * day, fortnightAgo = now - 14 * day;
    const cutoff = parseInt(this.activePatientProfile?.customSrrCutoff) || 30;
    const petName = this.activePatientProfile?.name || 'your pet';
    const gb = t => new Date(t).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    const lines = [];
    // Ignore wobble smaller than `deadband` so trivial change doesn't read as a trend.
    const dir = (delta, deadband) => Math.abs(delta) < deadband ? null : (delta > 0 ? 'up' : 'down');
    let anyData = false;

    // ── Breathing rate ──
    if (this.modOn('srr')) {
        const rows = this._srrForPatient();
        const week  = rows.filter(r => r.t >= weekAgo);
        const prior = rows.filter(r => r.t >= fortnightAgo && r.t < weekAgo);
        if (week.length) {
            anyData = true;
            const mean = this._meanOf(week.map(r => r.rate));
            const above = week.filter(r => r.rate >= cutoff).length;
            let text = `${week.length} breathing count${week.length === 1 ? '' : 's'} logged, averaging ${mean.toFixed(1)} bpm`;
            if (prior.length >= 3) {
                const pm = this._meanOf(prior.map(r => r.rate));
                const d = dir(mean - pm, 1);
                text += d ? ` — ${d} ${Math.abs(mean - pm).toFixed(1)} on last week's ${pm.toFixed(1)}`
                          : ' — in line with last week';
            }
            lines.push({ icon: 'fa-lungs', text: text + '.', tone: above > 0 ? 'caution' : 'good' });
            if (above > 0) lines.push({ icon: 'fa-triangle-exclamation',
                text: `${above} of those ${above === 1 ? 'was' : 'were'} at or above the ${cutoff} bpm cutoff — worth mentioning to your vet if it continues.`,
                tone: 'caution' });
        } else {
            lines.push({ icon: 'fa-lungs',
                text: 'No breathing counts logged this week. A count during settled sleep, most days, is what makes every trend here reliable.',
                tone: 'neutral' });
        }
    }

    // ── Weight ──
    if (this.modOn('weightDiet')) {
        const wl = (this.weightLog || []).filter(w => w.patientId === this.activePatientId)
            .sort((a, b) => new Date(a.date) - new Date(b.date));
        const latest = [...wl].reverse().find(w => new Date(w.date).getTime() >= weekAgo);
        if (latest) {
            anyData = true;
            const unit = this.activePatientProfile?.weightUnit || 'kg';
            const lv = parseFloat(latest.weightValue);
            let text = `Weight ${lv} ${unit}`, tone = 'neutral';
            const ref = [...wl].reverse().find(w => new Date(w.date).getTime() < weekAgo);
            if (ref && parseFloat(ref.weightValue) > 0) {
                const pct = ((lv - parseFloat(ref.weightValue)) / parseFloat(ref.weightValue)) * 100;
                const d = dir(pct, 1);
                if (d) { text += `, ${d} ${Math.abs(pct).toFixed(1)}% on ${gb(new Date(ref.date).getTime())}`;
                         tone = Math.abs(pct) >= 5 ? 'caution' : 'neutral'; }
                else   { text += `, steady since ${gb(new Date(ref.date).getTime())}`; tone = 'good'; }
            }
            lines.push({ icon: 'fa-weight-scale', text: text + '.', tone });
        }
    }

    // ── Activity (mean minutes per logged day) ──
    if (this.modOn('activityLog')) {
        const sumDays = (from, to) => {
            const byDay = {};
            (this.activityLog || [])
                .filter(a => a.patientId === this.activePatientId && parseFloat(a.durationMins) > 0)
                .forEach(a => {
                    const t = this.parseDateSafe(a.date).getTime();
                    if (t >= from && t < to) byDay[a.date] = (byDay[a.date] || 0) + parseFloat(a.durationMins);
                });
            return Object.values(byDay);
        };
        const week = sumDays(weekAgo, now + day);
        if (week.length) {
            anyData = true;
            const avg = this._meanOf(week);
            let text = `Active on ${week.length} day${week.length === 1 ? '' : 's'}, averaging ${avg.toFixed(0)} minutes`;
            let tone = 'good';
            const prior = sumDays(fortnightAgo, weekAgo);
            if (prior.length >= 2 && week.length >= 2) {
                const pm = this._meanOf(prior);
                const d = pm > 0 ? dir(((avg - pm) / pm) * 100, 10) : null;
                if (d) { text += ` — ${d} ${Math.abs(((avg - pm) / pm) * 100).toFixed(0)}% on last week`;
                         tone = d === 'down' ? 'caution' : 'good'; }
            }
            lines.push({ icon: 'fa-person-walking', text: text + '.', tone });
        }
    }

    // ── Symptoms ──
    if (this.modOn('coughLog')) {
        const coughs = (this.coughLog || []).filter(c => c.patientId === this.activePatientId)
            .map(c => this.parseDateSafe(c.date).getTime());
        const week  = coughs.filter(t => t >= weekAgo).length;
        const prior = coughs.filter(t => t >= fortnightAgo && t < weekAgo).length;
        if (week > 0 || prior > 0) {
            anyData = true;
            lines.push({ icon: 'fa-head-side-cough',
                text: week === 0 ? `No coughing logged this week (${prior} last week).`
                                 : `${week} coughing ${week === 1 ? 'entry' : 'entries'} logged` +
                                   (prior > 0 ? ` (${prior} last week).` : ' this week.'),
                tone: week === 0 ? 'good' : week > prior ? 'caution' : 'neutral' });
        }
    }

    if (this.modOn('syncopeLog')) {
        const week = (this.syncopeLog || [])
            .filter(s => s.patientId === this.activePatientId && this.parseDateSafe(s.date).getTime() >= weekAgo).length;
        if (week > 0) {
            anyData = true;
            lines.push({ icon: 'fa-heart-crack',
                text: `${week} collapse ${week === 1 ? 'event' : 'events'} logged this week. Collapse episodes always merit prompt veterinary assessment.`,
                tone: 'caution' });
        }
    }

    // ── Coming up (soonest two within a fortnight) ──
    const due = [];
    if (this.modOn('medications')) {
        this.currentMedStock().filter(r => r.status).forEach(r => {
            due.push({ label: r.name, days: r.status.days, kind: 'stock' });
        });
    }
    if (this.modOn('vaccinations')) {
        const byKey = {};
        [...(this.vaccinationLog || [])]
            .filter(v => v.patientId === this.activePatientId)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .forEach(v => {
                if (v.nextDueDate) {
                    const key = v.vaccineId || v.type;
                    if (!byKey[key]) byKey[key] = { label: v.type || v.vaccineId, due: v.nextDueDate };
                }
                (v.additionals || []).forEach(a => {
                    if (a.nextDueDate && !byKey['addon_' + a.id]) byKey['addon_' + a.id] = { label: a.label, due: a.nextDueDate };
                });
            });
        Object.values(byKey).forEach(v => {
            const st = this.getVaccineStatus(v.due);
            if (st) due.push({ label: v.label, days: st.days, kind: 'due' });
        });
    }
    if (this.modOn('antiparasitics')) {
        const byProduct = {};
        this.sortedAntiparasiticLog().filter(e => e.nextDueDate).forEach(e => {
            const key = e.productId === 'other' ? (e.productLabel || e.id) : e.productId;
            if (!byProduct[key]) byProduct[key] = e;
        });
        Object.values(byProduct).forEach(e => {
            const st = this.getParasiticStatus(e.nextDueDate);
            if (st) due.push({ label: e.productLabel || e.productId, days: st.days, kind: 'due' });
        });
    }
    due.filter(d => d.days <= 14).sort((a, b) => a.days - b.days).slice(0, 2).forEach(item => {
        const n = Math.abs(item.days), plural = n === 1 ? '' : 's';
        const text = item.kind === 'stock'
            ? (item.days < 0 ? `${item.label} ran out ${n} day${plural} ago.`
               : item.days === 0 ? `${item.label} runs out today.` : `${item.label} runs out in ${n} day${plural}.`)
            : (item.days < 0 ? `${item.label} is overdue by ${n} day${plural}.`
               : item.days === 0 ? `${item.label} is due today.` : `${item.label} is due in ${n} day${plural}.`);
        lines.push({ icon: item.kind === 'stock' ? 'fa-prescription-bottle-medical' : 'fa-calendar-day',
                     text, tone: item.days <= 0 ? 'caution' : 'neutral' });
    });

    if (!lines.length) lines.push({ icon: 'fa-pen-to-square',
        text: 'Nothing logged this week yet — a breathing count during settled sleep is the single most useful thing to record.',
        tone: 'neutral' });

    const toneCss = {
        good:    'color:#15803d;',
        caution: 'color:#b45309;',
        neutral: 'color:#64748b;'
    };
    lines.forEach(l => l.css = toneCss[l.tone] || toneCss.neutral);

    return {
        headline: `${petName}'s week · ${gb(weekAgo)}–${gb(now)}`,
        lines,
        hasData: anyData
    };
},


// ── Medication Response panel ───────────────────────────────────────────
// Mean SRR 7 days before vs 7 days after each medication event.
medResponsePanel() {
    if (!Array.isArray(this.medLedger) || !this.activePatientId) return [];
    const day = 86400000;
    const rows = this._srrForPatient();
    const meds = this.medLedger
        .filter(m => m.patientId === this.activePatientId)
        .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
    const seen = {};
    const out = [];
    meds.forEach(m => {
        const key = this._drugKey(m);
        const action = m.isStopped ? 'Stopped' : (seen[key] ? 'Adjusted' : 'Started');
        seen[key] = true;
        const t = this.parseDateSafe(m.eventDate).getTime();
        const pre  = rows.filter(r => r.t >= t - 7 * day && r.t < t).map(r => r.rate);
        const post = rows.filter(r => r.t > t && r.t <= t + 7 * day).map(r => r.rate);
        if (pre.length < 3 || post.length < 3) return;
        const preM = this._meanOf(pre), postM = this._meanOf(post);
        const delta = postM - preM;
        const name = this.medDisplayName(m);
        out.push({
            id: m.id,
            dateLabel: new Date(t).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' }),
            name, action,
            doseLabel: m.doseMg ? `${m.doseMg} mg ${m.frequency || ''}`.trim() : '',
            pre: preM.toFixed(1), post: postM.toFixed(1),
            delta: (delta > 0 ? '+' : '') + delta.toFixed(1),
            state: delta <= -2 ? 'ok' : delta >= 2 ? 'danger' : 'neutral',
            n: `${pre.length}/${post.length}`
        });
    });
    return out.reverse();   // newest first
},

// ── SRR distribution histogram (synced to the active date filter) ──────
srrHistogram() {
    const data = this.getFilteredReadings().map(d => d.rate);
    if (data.length < 5) return null;
    const cutoff = parseInt(this.activePatientProfile?.customSrrCutoff) || 30;
    const lo = Math.floor(Math.min(...data) / 5) * 5;
    const hi = Math.max(...data);
    const bins = [];
    for (let b = lo; b <= hi; b += 5) {
        bins.push({
            label: `${b}–${b + 4}`,
            count: data.filter(r => r >= b && r < b + 5).length,
            color: b + 5 <= cutoff ? '#16a34a' : b >= cutoff + 10 ? '#dc2626' : '#d97706'
        });
    }
    const maxCount = Math.max(...bins.map(b => b.count));
    bins.forEach(b => b.pct = maxCount ? Math.round(b.count / maxCount * 100) : 0);
    const inNormal = data.filter(r => r < cutoff).length;
    return { bins, total: data.length, normalPct: Math.round(inNormal / data.length * 100) };
},

// ── Symptom calendar heatmap (last 16 weeks, GitHub-style) ─────────────
symptomHeatmap() {
    const day = 86400000, weeks = 16;
    const burden = this._dailyBurdenMap();
    const today = new Date(); today.setHours(12, 0, 0, 0);
    const monday = new Date(today.getTime() - ((today.getDay() + 6) % 7) * day);
    const cols = [];
    for (let w = weeks - 1; w >= 0; w--) {
        const colStart = new Date(monday.getTime() - w * 7 * day);
        const cells = [];
        for (let d = 0; d < 7; d++) {
            const dt = new Date(colStart.getTime() + d * day);
            const key = dt.toISOString().split('T')[0];
            const future = dt.getTime() > today.getTime();
            const score = burden[key] || 0;
            cells.push({
                key,
                color: future ? 'transparent'
                     : score === 0 ? '#e8edf3'
                     : score <= 2 ? '#fde68a'
                     : score <= 4 ? '#f59e0b' : '#dc2626',
                title: dt.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
                       + (score ? ` — burden ${score}` : ' — no entries')
            });
        }
        cols.push({
            key: colStart.getTime(),
            monthLabel: colStart.getDate() <= 7 ? colStart.toLocaleDateString('en-GB', { month: 'short' }) : '',
            cells
        });
    }
    return { cols, hasData: Object.keys(burden).length > 0 };
},
        
         // --- MED CHART FUNCTIONS ---       
        
        
hasAnyMedData() {
    if (!Array.isArray(this.medLedger) || !this.activePatientId) return false;
    return this.medLedger.some(m => m.patientId === this.activePatientId);
},
        
        
// Validates custom date ranges strictly to protect Chart.js
            validateCustomDates(startRaw, endRaw) {
                // 1. Must not be null or empty
                if (!startRaw || !endRaw) return false;

                const startTimestamp = this.parseDateSafe(startRaw).getTime();
                const endTimestamp = this.parseDateSafe(endRaw).getTime();

                // 2. Must resolve to valid numbers (not NaN)
                if (isNaN(startTimestamp) || isNaN(endTimestamp)) return false;

                // 3. Start date must be before or equal to the end date
                if (startTimestamp > endTimestamp) return false;

                return true;
            },
            
            
        // Duplicate Date Range logic specifically for the Medication Chart
getMedDateRange() {
    const now = new Date();
    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    let startDate = null;
    let endDate = endOfToday;

    const dayOfWeek = startOfToday.getDay();
    const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    const getEarliestFallback = () => {
        // Earliest of the pet's meds AND injectables, so an injectables-only patient still gets a
        // sensible range instead of the epoch (1970).
        const petMedDates = this.medLedger
            .filter(m => m.patientId === this.activePatientId)
            .map(m => this.parseDateSafe(m.eventDate).getTime());
        const petInjDates = this.injectionLog
            .filter(a => a.patientId === this.activePatientId)
            .map(a => this.parseDateSafe(a.date).getTime());
        const stamps = [...petMedDates, ...petInjDates].filter(t => !isNaN(t));
        if (stamps.length > 0) {
            return new Date(Math.min(...stamps) - (14 * 24 * 60 * 60 * 1000));
        }
        return new Date(0);
    };

    // Use global timeScale here
    switch (this.timeScale) {
        case 'thisWeek':
            startDate = new Date(startOfToday);
            startDate.setDate(startDate.getDate() + daysToMonday);
            break;
        case 'lastWeek':
            startDate = new Date(startOfToday);
            startDate.setDate(startDate.getDate() + daysToMonday - 7);
            endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + 6);
            endDate.setHours(23, 59, 59);
            break;
        case 'thisMonth':
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
        case 'lastMonth':
            startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            endDate = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
            break;
        case '60d':
            startDate = new Date(startOfToday.getTime() - (60 * 24 * 60 * 60 * 1000));
            break;
        case '90d':
            startDate = new Date(startOfToday.getTime() - (90 * 24 * 60 * 60 * 1000));
            break;
        case '180d':
            startDate = new Date(startOfToday.getTime() - (180 * 24 * 60 * 60 * 1000));
            break;
        case 'custom':
            // Route through global custom start/end dates
            if (this.customStartDate && this.customEndDate) {
                const s = new Date(this.customStartDate + 'T00:00:00');
                const e = new Date(this.customEndDate + 'T23:59:59');
                
                if (!isNaN(s.getTime()) && !isNaN(e.getTime()) && s <= e) {
                    startDate = s;
                    endDate = e;
                } else {
                    startDate = getEarliestFallback(); 
                }
            } else {
                startDate = getEarliestFallback(); 
            }
            break;
        case 'all':
        default:
            startDate = getEarliestFallback();
            break;
    }
    return { startDate, endDate };
},        
        
        
        
        // Converts point-in-time entries into solid blocks of duration (Epochs)
generateMedEpochs() {
    // Force array check
    if (!Array.isArray(this.medLedger) || !this.activePatientId) return [];
    
    const petMeds = this.medLedger
        .filter(m => m.patientId === this.activePatientId)
        .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
            const epochs = [];
            const activeMeds = {}; // Tracks currently "open" medication blocks by drugId

            petMeds.forEach(med => {
                const eventTs = new Date(med.eventDate + 'T12:00:00').getTime(); // Force midday safety
                const drugKey = med.drugId === 'other' ? med.customName : med.drugId;

                const computedAction = this.getComputedAction(med);
                if (computedAction === 'Started' || computedAction === 'Adjusted') {
                    // If the drug was already running, close its previous dose block
                    if (activeMeds[drugKey]) {
                        activeMeds[drugKey].endTime = eventTs;
                        epochs.push({...activeMeds[drugKey]});
                    }
                    
                    // Open a new continuous block with the new dose
                    activeMeds[drugKey] = {
                        drugId: med.drugId,
                        customName: med.customName,
                        brand: med.brand,        // carried so the chart tooltip can show "Brand (Generic)"
                        doseMg: med.doseMg,
                        frequency: med.frequency,
                        mgPerKg: med.mgPerKg,
                        startTime: eventTs,
                        endTime: null // Stays open-ended until stopped or adjusted
                    };
                } else if (computedAction === 'Stopped') {
                    // Close the block
                    if (activeMeds[drugKey]) {
                        activeMeds[drugKey].endTime = eventTs;
                        epochs.push({...activeMeds[drugKey]});
                        delete activeMeds[drugKey];
                    }
                }
            });

            // Close all remaining open blocks to "Today"
            const nowTs = new Date().getTime();
            Object.values(activeMeds).forEach(activeMed => {
                activeMed.endTime = nowTs;
                epochs.push(activeMed);
            });

            return epochs;
        },




        // The Dedicated Chart.js Renderer
renderMedChart() {
    if (this.medChartRenderTimeout) clearTimeout(this.medChartRenderTimeout);

    this.medChartRenderTimeout = setTimeout(() => {
        const canvas = this.$refs.medChartCanvas;
        
        // GATEKEEPER: Stop Chart.js from crashing if canvas is display: none
        if (!canvas || canvas.offsetParent === null) return;

        if (this.timeScale === 'custom') {
            if (!this.validateCustomDates(this.customStartDate, this.customEndDate)) {
                return; 
            }
        }

        const epochs = this.generateMedEpochs();
        const suppEpochs = this.generateSuppEpochs();

        // --- Long-acting injectables: one row per product, a coverage bar of length intervalDays
        //     from each administration (gaps show missed re-doses) + a "given" dot per dose. Mirrors
        //     the iOS MedTimelineView. ---
        const injectableColor = '#0d9488';
        const injToMs = (d) => new Date((d || '').length <= 10 ? (d + 'T12:00:00') : d).getTime();
        const injGroups = {};
        this.injectionLog
            .filter(a => a.patientId === this.activePatientId && (a.customName || '').trim())
            .forEach(a => { const k = a.customName.trim(); (injGroups[k] = injGroups[k] || []).push(a); });
        const injNames = Object.keys(injGroups).sort((x, y) =>
            Math.min(...injGroups[x].map(a => injToMs(a.date))) - Math.min(...injGroups[y].map(a => injToMs(a.date))));

        if (epochs.length === 0 && suppEpochs.length === 0 && injNames.length === 0) return;

        const { startDate, endDate } = this.getMedDateRange();
        const uniqueDrugs = [...new Set(epochs.map(e => e.drugId === 'other' ? e.customName : (this.formulary[e.drugId]?.generic || e.drugId)))];
        const uniqueSupps = [...new Set(suppEpochs.map(e => e.name))];
        
        const ctx = this.$refs.medChartCanvas.getContext('2d');
        if (this.medChartInstance) {
            this.medChartInstance.destroy();
        }

        // Evaluate Min/Max Dose across the pet's ENTIRE lifetime history
        const doseRanges = {};
        const allPetMeds = this.medLedger.filter(m => m.patientId === this.activePatientId);
        allPetMeds.forEach(m => {
            const key = m.drugId === 'other' ? m.customName : m.drugId;
            if (!doseRanges[key]) {
                doseRanges[key] = { min: m.doseMg, max: m.doseMg };
            } else {
                if (m.doseMg < doseRanges[key].min) doseRanges[key].min = m.doseMg;
                if (m.doseMg > doseRanges[key].max) doseRanges[key].max = m.doseMg;
            }
        });

        const hex2rgb = (hex) => {
            const v = parseInt(hex.replace('#', ''), 16);
            return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
        };

        // Create ONE Dataset per Epoch to force unique bar thicknesses
        const dynamicDatasets = epochs.map((e, index) => {
            const genericName = e.drugId === 'other' ? e.customName : (this.formulary[e.drugId]?.generic || e.drugId);
            const isDiuretic = ['furosemide', 'torasemide'].includes(e.drugId);
            const baseColor = this.drugColor(this.formulary[e.drugId]);   // colour-by-class
            const rgb = hex2rgb(baseColor);
            
            const key = e.drugId === 'other' ? e.customName : e.drugId;
            const range = doseRanges[key];
            
            let opacity = 0.5;
            let calculatedThickness = 24; // Base baseline

            if (isDiuretic) {
                opacity = 0.85; // Solid visibility for diuretics
                if (range && range.max > range.min) {
                    const ratio = (e.doseMg - range.min) / (range.max - range.min);
                    calculatedThickness = 12 + (28 * ratio); // Scales perfectly from 12px to 40px
                }
            } else {
                if (range && range.max > range.min) {
                    const ratio = (e.doseMg - range.min) / (range.max - range.min);
                    opacity = 0.3 + (0.7 * ratio); // Scales 30% to 100% solid based on dose
                }
            }

            return {
                label: `Epoch_${index}`, // Internal tracker
                data: [{
                    x: [e.startTime, e.endTime],
                    y: genericName,
                    _rawEpoch: e 
                }],
                backgroundColor: `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`,
                borderColor: baseColor,
                borderWidth: 2,
                borderSkipped: false,
                borderRadius: 4,
                barThickness: calculatedThickness // Now explicitly applied to this specific block!
            };
        });
        
        // Supplement rows — fixed thin bars, no dose scaling
        const suppDatasets = suppEpochs.map((e, index) => {
            const rgb = hex2rgb(e.color);
            return {
                label: `Supp_${index}`,
                data: [{ x: [e.startTime, e.endTime], y: e.name, _rawEpoch: e }],
                backgroundColor: `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.35)`,
                borderColor: e.color,
                borderWidth: 1.5,
                borderSkipped: false,
                borderRadius: 4,
                barThickness: 12
            };
        });
        
        // Injectable coverage bars (one per administration) + a solid "given" tick at each dose.
        // Both use the same bar mechanism as the drug epochs (proven to render on this category axis).
        const injRgb = hex2rgb(injectableColor);
        const injDatasets = [];
        injNames.forEach(name => {
            const evs = injGroups[name].slice().sort((a, b) => injToMs(a.date) - injToMs(b.date));
            evs.forEach((a, i) => {
                const start = injToMs(a.date);
                const days = Number(a.intervalDays) || 30;
                const end = start + days * 86400000;
                // Coverage: translucent bar of length intervalDays — a longer real gap leaves a blank.
                injDatasets.push({
                    label: `Inj_${name}_${i}`,
                    data: [{ x: [start, end], y: name,
                             _rawEpoch: { _isInjectable: true, name, startTime: start, endTime: end, intervalDays: days, dose: a.dose } }],
                    backgroundColor: `rgba(${injRgb[0]}, ${injRgb[1]}, ${injRgb[2]}, 0.28)`,
                    borderColor: injectableColor,
                    borderWidth: 1.5,
                    borderSkipped: false,
                    borderRadius: 4,
                    barThickness: 10
                });
                // "Given" tick: a short solid, thicker bar at the administration date, so each dose
                // actually given stands out from the faded coverage span.
                injDatasets.push({
                    label: `InjMark_${name}_${i}`,
                    data: [{ x: [start, start + 2 * 86400000], y: name,
                             _rawEpoch: { _isInjectable: true, _isMarker: true, name, startTime: start, dose: a.dose } }],
                    backgroundColor: injectableColor,
                    borderColor: injectableColor,
                    borderWidth: 0,
                    borderSkipped: false,
                    borderRadius: 2,
                    barThickness: 16
                });
            });
        });

        const rowHeight = 72; // px per unique drug
        const chartHeight = Math.max(180, (uniqueDrugs.length + (uniqueSupps.length + injNames.length) * 0.6) * rowHeight + 60);
        if (canvas.parentElement) {
            canvas.parentElement.style.height = chartHeight + 'px';
        }

        this.medChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                datasets: [...dynamicDatasets, ...suppDatasets, ...injDatasets]
            },
            options: {
                indexAxis: 'y', 
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            title: (context) => {
                                const e = context[0].raw._rawEpoch;
                                if (e._isInjectable) return `${e.name} (injectable)`;
                                if (e._isSupp) return `${e.name} (supplement)`;
                                return this.medDisplayName(e);
                            },
                            label: (context) => {
                                const e = context.raw._rawEpoch;
                                const fmt = (t) => new Date(t).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
                                const sDate = fmt(e.startTime);

                                if (e._isInjectable) {
                                    if (e._isMarker) {
                                        return [`Given: ${sDate}`, e.dose ? `Dose: ${e.dose}` : null].filter(Boolean);
                                    }
                                    return [
                                        `Given: ${sDate}`,
                                        `Covers ~${e.intervalDays} days (to ${fmt(e.endTime)})`,
                                        e.dose ? `Dose: ${e.dose}` : null
                                    ].filter(Boolean);
                                }

                                const todayTs = new Date().getTime();
                                const diff = Math.abs(e.endTime - todayTs);
                                const eDate = diff < 1000 ? 'Present' : fmt(e.endTime);

                                if (e._isSupp) {
                                    return [
                                        e.doseLabel ? `Dose: ${e.doseLabel}` : 'Dose not recorded',
                                        `Duration: ${sDate} to ${eDate}`
                                    ];
                                }
                                return [
                                    `Dose: ${e.doseMg}mg ${e.frequency}`,
                                    `Duration: ${sDate} to ${eDate}`
                                ];
                            }
                        }
                    }
                },
                zoom: {
                    pan: { enabled: true, mode: 'x' },
                    zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: 'x' }
                },
                scales: {
                    x: {
                        type: 'time',
                        stacked: false,
                        time: { tooltipFormat: 'dd MMM yyyy' },
                        //  Explicitly check for valid numbers to prevent Uncaught Type Errors
                        min: (startDate && !isNaN(startDate.getTime())) ? startDate.getTime() : undefined,
                        max: (endDate && !isNaN(endDate.getTime())) ? endDate.getTime() : undefined,
                        grid: { color: '#e2e8f0' }
                    },
                    y: {
                        type: 'category',
                        stacked: true,
                        labels: [...uniqueDrugs, ...uniqueSupps, ...injNames],
                        grid: { display: false }
                    }
                }
            }
        });
    }, 50);
},        
        
        // --- EXPORT FUNCTIONS ---
        
        // Export Functionality
exportData() {
            const filtered = this.getFilteredReadings();
            if (!filtered.length) return;
            
            let csvContent = "data:text/csv;charset=utf-8,Date,Rate,Notes\n";
            filtered.forEach(row => {
                csvContent += `${row.date},${row.rate},${row.notes || ''}\n`;
            });
            
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `RRR_Export_${this.timeScale}.csv`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        },
        
// Updated Export to include Pet Name
// Filename fragment for the selected pet, e.g. "_Bella" (per-pet CSV exports). Empty if no name.
_csvPetSuffix(pet) {
    const raw = (pet && pet.name) ? pet.name : '';
    const safe = raw.replace(/[^a-z0-9]+/gi, '_').replace(/^_+|_+$/g, '');
    return safe ? `_${safe}` : '';
},

exportCSV() {
    const pid = this.activePatientId;
    if (!pid) return alert("Select a patient first.");
    const pet = this.patients.find(p => p.id === pid);
    const source = (this.srrHistory || []).filter(log => log.patientId === pid);
    if (source.length === 0) return alert("No respiratory-rate data to export for this pet.");

    const headers = "Date,Time,Rate(bpm),PatientName,Species,Comment,Effort\n";
    const rows = source.map(log => {
        const pName = pet ? pet.name : 'Unknown';
        const pSpecies = pet ? pet.species : 'dog';
        const comment = (log.comment || '').replace(/"/g, '""');

        return `${log.date},${log.time},${log.rate},"${pName}",${pSpecies},"${comment}",${log.breathingEffort ?? ''}`;
    }).join("\n");

            const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(headers + rows);
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `SRR_Export${this._csvPetSuffix(pet)}_${new Date().toISOString().split('T')[0]}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
        
importCSV(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const text = e.target.result;
        const lines = text.split("\n");
        
        let importedCount = 0;
        let lastImportedPatientId = null; // FIX: Track the ID, not the name

        // Start at index 1 to skip headers
        for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue;
            
            const cols = lines[i].split(",");
            if (cols.length >= 3) {
                const date = cols[0].trim();
                const time = cols[1].trim();
                const rate = parseInt(cols[2].trim());
                
                // The CSV only contains the string NAME of the pet
                const csvPetName = cols[3] ? cols[3].trim() : 'Imported Patient';
                const species = cols[4] ? cols[4].trim() : 'dog';
                const comment = cols[5] ? cols[5].trim().replace(/^"|"$/g, '').replace(/""/g, '"') : '';
                
                // 1. Look up the pet by name, or Auto-generate Profile WITH A UUID
                let existingPet = this.patients.find(p => p.name.toLowerCase() === csvPetName.toLowerCase());
                
                if (!existingPet) {
                    existingPet = { 
                        id: this.generateId(),
                        name: csvPetName, 
                        species: species, 
                        age: null,
                        weight: null,
                        weightUnit: 'kg',
                        customSrrCutoff: 30,
                        modules: { ...this.defaultModules }
                    };
                    this.patients.push(existingPet);
                }

                // Track the ID to switch the UI to this patient later
                lastImportedPatientId = existingPet.id;

                // 2. Push to history using the UUID
                this.srrHistory.push({
                    id: this.generateId(), // Use robust ID instead of just Date.now + i
                    date: date,
                    time: time,
                    rate: rate,
                    patientId: existingPet.id, // CRITICAL: Push the UUID, never the string name!
                    species: existingPet.species,
                    comment: comment
                });
                importedCount++;
            }
        }

        if (importedCount > 0) {
            // FIX: Save using the new relational local storage keys
            this.saveToStorage('vch_patients', this.patients);
            this.saveToStorage('vch_srrHistory', this.srrHistory);
            
            // Switch UI to the newly imported pet's UUID
            if (lastImportedPatientId) {
                this.activePatientId = lastImportedPatientId;
            }
            
            this.showAddPet = false; // Note: Ensure this variable still exists in your UI state, or remove it if obsolete
            this.currentPage = 1;
            this.$nextTick(() => { this.renderChart(); });
            alert(`Successfully imported ${importedCount} records.`);
        }
        
        // Clear the input so the same file can be selected again if needed
        event.target.value = ''; 
    };
    reader.readAsText(file);
},

importHeart2HeartData() {
    const text = this.heart2HeartText;
    if (!text || !text.trim()) {
        return alert("Please paste the Heart2Heart PDF data first.");
    }
    
    if (!this.activePatientId) {
        return alert("Clinical Import Error: No patient selected. Please select a patient profile first to import this data into.");
    }

    // Split text by newlines and drop empty lines
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    
    let importedCount = 0;
    let skippedDuplicates = 0;
    let skippedInvalid = 0;

    // Regex Strategy: 
    // [1] Date: 1-2 digits, 3 letters, 4 digits (e.g., 19 Jun 2026)
    // [2] Time: 2 digits, colon, 2 digits (e.g., 18:55)
    // [3] Rate: 1+ digits
    // [4] Notes: Any remaining characters (optional)
    // We use [\s,]+ to aggressively forgive weird PDF copy-paste spacing or missing commas.
    const regex = /^(\d{1,2}\s+[a-zA-Z]{3}\s+\d{4})[\s,]+(\d{2}:\d{2})\s+(\d+)(?:\s+(.*))?$/i;

    lines.forEach(line => {
        // Skip the table headers if the user copied them
        if (line.toLowerCase().includes('date') && line.toLowerCase().includes('bpm')) return;

        const match = line.match(regex);
        if (!match) {
            skippedInvalid++;
            return;
        }

        const dateStrRaw = match[1]; // e.g., "19 Jun 2026"
        const timeStr = match[2];    // e.g., "18:55"
        const rate = parseInt(match[3], 10);
        
        // Use the parsed comment, or a default note if blank
        const comment = match[4] ? match[4].trim() : 'Imported from Heart2Heart PDF';

        // Native JS can reliably parse "DD MMM YYYY HH:MM"
        const dateObj = new Date(`${dateStrRaw} ${timeStr}`);
        
        // Validation check
        if (isNaN(dateObj.getTime()) || isNaN(rate) || rate <= 0 || rate > 150) {
            skippedInvalid++;
            return;
        }

        // --- DUPLICATE DETECTION (60-second window) ---
        const isDuplicate = this.srrHistory.some(h =>
            h.patientId === this.activePatientId &&
            Math.abs(new Date(h.date).getTime() - dateObj.getTime()) < 60000
        );

        if (isDuplicate) {
            skippedDuplicates++;
            return;
        }

        // Apply fallback clinical logic for Equivocal rates 
        const isEquivocal = rate >= 30 && rate < 40;

        // --- PUSH TO HISTORY ---
        this.srrHistory.push({
            id: this.generateId(),
            date: dateObj.toISOString(),
            time: dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            rate: rate,
            patientId: this.activePatientId,
            isEquivocal: isEquivocal,
            comment: comment,
            isManual: false
        });

        importedCount++;
    });

    // --- COMMIT & REFRESH ---
    if (importedCount === 0) {
        const detail = skippedDuplicates > 0
            ? `${skippedDuplicates} duplicate(s) were already in the log.`
            : skippedInvalid > 0
                ? `${skippedInvalid} lines had unrecognized formats.`
                : "No valid Heart2Heart data found.";
        return alert(`No new readings imported.\n\n${detail}`);
    }

    // Ensure array order is maintained
    this.srrHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
    this.saveToStorage('vch_srrHistory', this.srrHistory);
    
    // UI Reset
    this.heart2HeartText = '';
    this.showHeart2HeartImport = false;
    this.currentPage = 1;
    this.$nextTick(() => { this.renderChart(); });

    const petName = this.activePatientProfile?.name || 'this patient';
    const dupNote = skippedDuplicates > 0 ? `, ${skippedDuplicates} duplicate(s) skipped` : '';
    const invalidNote = skippedInvalid > 0 ? `, ${skippedInvalid} invalid line(s) ignored` : '';
    
    alert(`Successfully imported ${importedCount} reading(s) for ${petName}${dupNote}${invalidNote}.`);
},

importCardalisEmail() {
    const text = this.cardalisEmailText;
    if (!text || !text.trim())
        return alert("Please paste the Cardalis export content first.");

    // ── 1. PATIENT RESOLUTION (name label → active patient fallback) ───────────────────────────
    let petName = null;
    const nameRegexes = [
        /breathing\s+rate\s+for\s+([A-Za-z0-9 _'\-]+?)(?:\s+More\b|\n|$)/i, // Legacy header (stops at "More")
        /Name\s*:\s*([A-Za-z0-9 _'\-]+)/i,                                  // Reworked app: explicit label
        /Patient\s*:\s*([A-Za-z0-9 _'\-]+)/i                                // Generic fallback
    ];
    for (const rx of nameRegexes) {
        const match = text.match(rx);
        if (match && match[1].trim()) { petName = match[1].trim(); break; }
    }

    let resolvedPatientId = null;
    if (petName) {
        let pet = this.patients.find(p => p.name.toLowerCase() === petName.toLowerCase());
        if (!pet) {
            pet = {
                id: this.generateId(), name: petName, species: 'dog', age: null,
                weight: null, weightUnit: 'kg', customSrrCutoff: 30,
                modules: { ...this.defaultModules }
            };
            this.patients.push(pet);
            this.saveToStorage('vch_patients', this.patients);
        }
        resolvedPatientId = pet.id;
    } else if (this.activePatientId) {
        resolvedPatientId = this.activePatientId;
        const activePet = this.patients.find(p => p.id === resolvedPatientId);
        petName = activePet ? activePet.name : "the active patient";
        if (!confirm(`Could not detect a clear patient name label.\n\nScan this text and import any valid readings for your currently active patient (${petName})?`))
            return;
    } else {
        return alert("Could not identify a patient name in the text, and no patient is selected. Please select a patient first.");
    }

    // ── 2. PARSE — dispatch on format ──────────────────────────────────────────────────────────
    let skippedInvalid = 0;
    const parsedEntries = [];

    const roundRate = (v) => Math.round(parseFloat(v));
    const buildContext = (block) => {
        const parts = [];
        const state  = block.match(/State:\s*([^\n]+)/i);
        const effort = block.match(/Effort:\s*([^\n]+)/i);
        if (state  && state[1].trim().toUpperCase()  !== 'N/A') parts.push(`State: ${state[1].trim()}`);
        if (effort && effort[1].trim().toUpperCase() !== 'N/A') parts.push(`Effort: ${effort[1].trim()}`);
        return parts.length ? parts.join(' | ') : "Imported from Cardalis";
    };

    if (/BreathCount/i.test(text)) {
        // ── LEGACY EMAIL: "BreathCount: N … Date & Time: YYYY-MM-DD HH:mm:ss" blocks ──
        // Pair each count with ITS OWN date (the date-chunking engine would mis-pair these,
        // because the rate line precedes the date line).
        const rx = /BreathCount:\s*(\d+)[\s\S]*?Date\s*&\s*Time:\s*(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2})(?:[\s\S]*?Breathing\s*Effort:\s*([^\n]*))?(?:[\s\S]*?Exercise\s*Abil\w*y:\s*([^\n]*))?(?:[\s\S]*?Alertness:\s*([^\n]*))?(?:[\s\S]*?Comments?:\s*([^\n]*))?/gi;
        let m;
        while ((m = rx.exec(text)) !== null) {
            const rate = roundRate(m[1]);
            const dateObj = new Date(m[2].replace(' ', 'T'));
            if (isNaN(dateObj.getTime()) || !(rate > 0) || rate > 150) { skippedInvalid++; continue; }
            const usable = (s) => (s && s.trim() && s.trim().toUpperCase() !== 'N/A') ? s.trim() : null;
            const parts = [];
            if (usable(m[3])) parts.push(`Effort: ${m[3].trim()}`);
            if (usable(m[4])) parts.push(`Exercise: ${m[4].trim()}`);
            if (usable(m[5])) parts.push(`Alertness: ${m[5].trim()}`);
            if (usable(m[6])) parts.push(m[6].trim());
            parsedEntries.push({ dateObj, rate, comment: parts.length ? parts.join(' | ') : "Imported from Cardalis" });
        }
    } else {
        // ── REWORKED APP: flat "Date: … / Respiratory rate: … / State: …" records ──
        // Split immediately before each date so each reading is isolated.
        const dateLookahead = /(?=\b(?:\d{1,2}[-/]\d{1,2}[-/]\d{2,4}|\d{4}[-/]\d{1,2}[-/]\d{1,2})\b)/;
        for (const block of text.split(dateLookahead)) {
            if (!block.trim()) continue;

            const dm = block.match(/\b(\d{1,4})[-/](\d{1,2})[-/](\d{1,4})\b/);
            if (!dm) continue;
            const [p1, p2, p3] = [dm[1], dm[2], dm[3]];
            let year, month, day;
            if (p1.length === 4)      { year = p1; month = p2; day = p3; }
            else if (p3.length === 4) { if (+p2 > 12) { month = p1; day = p2; } else { day = p1; month = p2; } year = p3; }
            else                      { if (+p2 > 12) { month = p1; day = p2; } else { day = p1; month = p2; } year = `20${p3}`; }

            let timeString = "12:00:00";
            const tm = block.match(/\b(\d{2}):(\d{2})(?::(\d{2}))?\b/);
            if (tm) timeString = tm[0].length === 5 ? `${tm[0]}:00` : tm[0];

            const dateObj = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${timeString}`);
            if (isNaN(dateObj.getTime())) continue;

            // Rate: labelled value first, else the single plausible bare number.
            let rate = null;
            const labelled = block.match(/(?:Respiratory\s+rate|BreathCount|Rate|BPM|Breaths)[\s:]*([\d.]+)/i);
            if (labelled) {
                rate = roundRate(labelled[1]);
            } else {
                const stripped = block.replace(dm[0], ' ').replace(tm ? tm[0] : '', ' ');
                const nums = [...stripped.matchAll(/\b(\d{1,3}(?:\.\d+)?)\b/g)].map(x => parseFloat(x[1])).filter(n => n > 5 && n <= 120);
                if (nums.length === 1) rate = Math.round(nums[0]);
                else if (nums.length > 1) {
                    const bpm = stripped.match(/\b(\d{1,3}(?:\.\d+)?)\s*(?:bpm|br\/m|rpm|breaths)\b/i);
                    if (bpm) rate = roundRate(bpm[1]);
                }
            }
            if (rate === null || !(rate > 0) || rate > 150) { skippedInvalid++; continue; }

            parsedEntries.push({ dateObj, rate, comment: buildContext(block) });
        }
    }

    // ── 3. DEDUP (60-second window) & COMMIT ───────────────────────────────────────────────────
    let importedCount = 0, skippedDuplicates = 0;
    for (const { rate, dateObj, comment } of parsedEntries) {
        const isDup = this.srrHistory.some(h =>
            h.patientId === resolvedPatientId &&
            Math.abs(new Date(h.date).getTime() - dateObj.getTime()) < 60000
        );
        if (isDup) { skippedDuplicates++; continue; }

        this.srrHistory.push({
            id: this.generateId(), date: dateObj.toISOString(),
            time: dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            rate, patientId: resolvedPatientId,
            isEquivocal: rate >= 30 && rate < 40, comment, isManual: false
        });
        importedCount++;
    }

    if (importedCount === 0) {
        const detail = skippedDuplicates > 0
            ? `${skippedDuplicates} duplicate(s) were already in the clinical log.`
            : "Could not detect any valid date and respiratory rate combinations in the pasted text.";
        return alert(`No new readings imported.\n\n${detail}`);
    }

    this.srrHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
    this.saveToStorage('vch_srrHistory', this.srrHistory);

    this.activePatientId    = resolvedPatientId;
    this.cardalisEmailText  = '';
    this.showCardalisImport = false;
    this.currentPage        = 1;
    this.$nextTick(() => { this.renderChart(); });

    const dupNote = skippedDuplicates > 0 ? `\n- ${skippedDuplicates} duplicate(s) skipped` : '';
    const invNote = skippedInvalid > 0 ? `\n- ${skippedInvalid} invalid entry/entries ignored` : '';
    alert(`Successfully imported ${importedCount} reading(s) for ${petName}.${dupNote}${invNote}`);
},

// ==========================================
// --- MEDICATION LOG CSV EXPORT / IMPORT ---
// ==========================================
        
        // --- MEDICATION CSV MANAGEMENT ---
exportMedicationsCSV() {
    const pid = this.activePatientId;
    if (!pid) return alert("Select a patient first.");
    const pet = this.patients.find(p => p.id === pid);
    const meds = (this.medLedger || []).filter(m => m.patientId === pid);
    const supps = (this.suppLedger || []).filter(s => s.patientId === pid);
    if (meds.length === 0 && supps.length === 0)
        return alert("No medication or supplement data to export for this pet.");


    const headers = "Date,PatientName,DrugId,GenericName,CustomName,Dose(mg),Frequency,mg/kg,isStopped,TabletStrengthMg,TabletsPerDose,TabletsInStock,StockDate,Form,OpenedDate,DiscardDays,DoseUnit,Constituents,Brand\n";

    const rows = meds.map(med => {
        const patient = this.patients.find(p => p.id === med.patientId);
        const patientName = this.sanitiseCSV(patient ? patient.name : 'Unknown');
        // The generic: the formulary generic, or the owner's own name for a custom product.
        const genericName = med.drugId === 'other'
            ? (med.customName || 'Custom')
            : (this.formulary[med.drugId]?.generic || med.drugId);

        return [
            med.eventDate,
            `"${patientName}"`,
            med.drugId || 'other',
            `"${this.sanitiseCSV(genericName)}"`,
            `"${this.sanitiseCSV(med.customName || '')}"`,
            med.doseMg != null ? med.doseMg : '',
            med.frequency || '',
            med.mgPerKg != null ? med.mgPerKg : '',
            med.isStopped ? 'true' : 'false',
            med.tabletStrengthMg != null ? med.tabletStrengthMg : '',
            med.tabletsPerDose != null ? med.tabletsPerDose : '',
            med.tabletsInStock != null ? med.tabletsInStock : '',
            med.stockDate || '',
            med.form || 'tablet',
            med.openedDate || '',
            med.discardDays != null ? med.discardDays : '',
            '', '',                                        // DoseUnit, Constituents — n/a for meds
            `"${this.sanitiseCSV(med.brand || '')}"`       // Brand (trade name)
        ].join(',');
    }).join("\n");

    const suppRows = supps.map(s => {
        const patient = this.patients.find(p => p.id === s.patientId);
        const patientName = this.sanitiseCSV(patient ? patient.name : 'Unknown');
        const brand = s.productId === 'other'
            ? 'Other'
            : (this.suppFormulary[s.productId]?.brand || s.productId);
        const constituents = [
            ...(Array.isArray(s.customConstituents) ? s.customConstituents : []),
            ...(Array.isArray(s.customExtras) ? s.customExtras.map(n => 'custom:' + n) : [])
        ].join(';');

        return [
            s.eventDate,
            `"${patientName}"`,
            'supp:' + (s.productId || 'other'),
            `"${this.sanitiseCSV(brand)}"`,
            `"${this.sanitiseCSV(s.customName || '')}"`,
            s.doseAmount != null ? `"${this.sanitiseCSV(String(s.doseAmount))}"` : '',
            s.frequency || '',
            '',                              // mg/kg — n/a
            s.isStopped ? 'true' : 'false',
            '', '', '', '', '', '', '',      // tablet/stock/form/opened/discard — n/a
            `"${this.sanitiseCSV(s.doseUnit || '')}"`,
            `"${this.sanitiseCSV(constituents)}"`,
            ''                                             // Brand — n/a for supplements
        ].join(',');
    }).join("\n");

    const body = [rows, suppRows].filter(Boolean).join("\n");
    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(headers + body);
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", `VCH_Medications${this._csvPetSuffix(pet)}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
},

importMedicationsCSV(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const text = e.target.result;
            const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
            if (lines.length <= 1) return alert("The selected CSV file appears empty.");

            // Strips surrounding quotes and un-escapes doubled quotes
            const clean = (s) => (s || '').replace(/^"|"$/g, '').replace(/""/g, '"').trim();

            let importedCount = 0;
            let importedSupps = 0;
            let skipped = 0;

            for (let i = 1; i < lines.length; i++) {
                const parts = lines[i].match(/(".*?"|[^",]+|(?<=,)(?=,)|(?<=,)$|^(?=,))/g);
                if (!parts || parts.length < 7) { skipped++; continue; }

                const eventDate   = clean(parts[0]);
                const patientName = clean(parts[1]);
                const drugId      = clean(parts[2]) || 'other';
                // ── Supplement rows (DrugId prefixed 'supp:') ──────────────
                if (drugId.startsWith('supp:')) {
                    const rawId = drugId.slice(5) || 'other';
                    const productId = (typeof SUPPLEMENT_FORMULARY !== 'undefined' && SUPPLEMENT_FORMULARY[rawId]) ? rawId : 'other';
                    const suppPatient = this.patients.find(
                        p => p.name.toLowerCase() === patientName.toLowerCase()
                    );
                    if (!suppPatient) { skipped++; continue; }

                    const isStoppedSupp = parts[8] ? clean(parts[8]).toLowerCase() === 'true' : false;
                    const rawConstituents = parts[17] ? clean(parts[17]).split(';').map(t => t.trim()).filter(Boolean) : [];
                    const ticked = rawConstituents.filter(c => !c.startsWith('custom:'));
                    const extras = rawConstituents.filter(c => c.startsWith('custom:')).map(c => c.slice(7));

                    this.suppLedger.push({
                        id: this.generateId(),
                        patientId: suppPatient.id,
                        eventDate,
                        productId,
                        customName: productId === 'other' ? (clean(parts[4]) || clean(parts[3]) || 'Imported supplement') : null,
                        customConstituents: productId === 'other' ? ticked : null,
                        customExtras: productId === 'other' ? extras : null,
                        isStopped: isStoppedSupp,
                        doseAmount: isStoppedSupp ? null : (clean(parts[5]) || null),
                        doseUnit:   isStoppedSupp ? null : (parts[16] ? clean(parts[16]) : null),
                        frequency:  isStoppedSupp ? null : (clean(parts[6]) || 'q24h')
                    });
                    importedSupps++;
                    continue;
                }
                
                // parts[3] = GenericName (display only, not stored)
                const customName  = clean(parts[4]);
                const doseMg      = parseFloat(clean(parts[5]));
                const frequency   = clean(parts[6]);
                const mgPerKg     = parts[7] ? parseFloat(clean(parts[7])) : null;
                const isStopped   = parts[8] ? clean(parts[8]).toLowerCase() === 'true' : false;
                const tabletStrengthMg = parts[9]  ? parseFloat(clean(parts[9]))  : NaN;
                const tabletsPerDose   = parts[10] ? parseFloat(clean(parts[10])) : NaN;
                const tabletsInStock   = parts[11] ? parseFloat(clean(parts[11])) : NaN;
                const stockDate        = parts[12] ? clean(parts[12]) : '';
                const form = parts[13] && clean(parts[13]).toLowerCase() === 'liquid' ? 'liquid' : 'tablet';
                const openedDate  = parts[14] ? clean(parts[14]) : '';
                const discardDays = parts[15] ? parseFloat(clean(parts[15])) : NaN;
                // parts[16] = DoseUnit, parts[17] = Constituents (supplement columns, n/a here)
                const brand       = parts[18] ? clean(parts[18]) : '';   // absent in pre-Brand files → ''
                const derivedDose = (!isNaN(tabletStrengthMg) && !isNaN(tabletsPerDose))
                    ? Math.round(tabletStrengthMg * tabletsPerDose * 1000) / 1000
                    : doseMg;   // fall back to the Dose(mg) column
                
                // Resolve patient by name — do not auto-create for medication imports
                const patient = this.patients.find(
                    p => p.name.toLowerCase() === patientName.toLowerCase()
                );
                if (!patient) { skipped++; continue; }

                // Validate: active entries must have a parseable dose
                if (!isStopped && isNaN(derivedDose)) { skipped++; continue; }

                this.medLedger.push({
                    id: this.generateId(),
                    eventDate,
                    patientId:  patient.id,
                    drugId,
                    customName: customName || '',
                    brand: brand || '',
                    frequency:  isStopped ? null : (frequency || 'q12h'),
                    mgPerKg:    isStopped ? null : (isNaN(mgPerKg) ? null : mgPerKg),
                    isStopped,
                    tabletStrengthMg: isStopped ? null : (isNaN(tabletStrengthMg) ? null : tabletStrengthMg),
                    tabletsPerDose:   isStopped ? null : (isNaN(tabletsPerDose) ? null : tabletsPerDose),
                    doseMg:           isStopped ? null : derivedDose,
                    form: isStopped ? null : form,
                    tabletsInStock: isStopped ? null : (isNaN(tabletsInStock) ? null : tabletsInStock),
                    stockDate:      isStopped ? null : (stockDate || eventDate),
                     openedDate:  isStopped ? null : (openedDate || null),
                    discardDays: isStopped ? null : (isNaN(discardDays) ? null : discardDays),
                });
                importedCount++;
            }

            this.saveToStorage('vch_medLedger', this.medLedger);
            this.saveToStorage('vch_suppLedger', this.suppLedger);
            this.renderMedChart();

            const note = skipped > 0 ? ` (${skipped} row(s) skipped — patient not found or invalid data)` : '';
            alert(`Imported ${importedCount} medication and ${importedSupps} supplement record(s)${note}.`);

        } catch (err) {
            console.error(err);
            alert("Failed to parse Medication CSV. Check the file format.");
        }
        event.target.value = '';
    };
    reader.readAsText(file);
},

// ==========================================
// --- COUGH LOG CSV EXPORT / IMPORT ---
// ==========================================

exportCoughCSV() {
    const pid = this.activePatientId;
    if (!pid) return alert("Select a patient first.");
    const pet = this.patients.find(p => p.id === pid);
    const source = (this.coughLog || []).filter(c => c.patientId === pid);
    if (source.length === 0) return alert("No cough data to export for this pet.");

    const headers = "Date,PatientName,Severity,FrequencyCount,FrequencyPeriod,Description,Context,Notes\n";

    const rows = source.map(c => {
        const patient = this.patients.find(p => p.id === c.patientId);
        const patientName = this.sanitiseCSV(patient ? patient.name : 'Unknown');

        return [
            c.date,
            `"${patientName}"`,
            `"${this.sanitiseCSV(c.severity || '')}"`,
            `"${this.sanitiseCSV(c.frequencyCount || '')}"`,
            `"${this.sanitiseCSV(c.frequencyPeriod || '')}"`,
            `"${this.sanitiseCSV(c.description || '')}"`,
            `"${this.sanitiseCSV(c.context || '')}"`,
            `"${this.sanitiseCSV(c.notes || '')}"`
        ].join(',');
    }).join("\n");

    const BOM = '\uFEFF';
    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(BOM + headers + rows);
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", `VCH_CoughLog${this._csvPetSuffix(pet)}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
},

importCoughCSV(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const lines = e.target.result.split("\n").map(l => l.trim()).filter(Boolean);
            if (lines.length <= 1) return alert("The selected CSV file appears empty.");

            const clean = (s) => (s || '').replace(/^"|"$/g, '').replace(/""/g, '"').trim();
            let importedCount = 0;
            let skipped = 0;

            for (let i = 1; i < lines.length; i++) {
                const parts = lines[i].match(/(".*?"|[^",]+|(?<=,)(?=,)|(?<=,)$|^(?=,))/g);
                if (!parts || parts.length < 8) { skipped++; continue; }

                const patientName = clean(parts[1]);
                const patient = this.patients.find(p => p.name.toLowerCase() === patientName.toLowerCase());
                if (!patient) { skipped++; continue; }

                this.coughLog.push({
                    id: this.generateId(),
                    patientId: patient.id,
                    date: clean(parts[0]),
                    severity: clean(parts[2]),
                    frequencyCount: clean(parts[3]),
                    frequencyPeriod: clean(parts[4]) || 'day',
                    description: clean(parts[5]),
                    context: clean(parts[6]),
                    notes: clean(parts[7])
                });
                importedCount++;
            }

            this.saveToStorage('vch_coughLog', this.coughLog);
            if(this.activePatientId) this.loadCoughForDate();
            this.$nextTick(() => { this.renderChart(); });

            alert(`Imported ${importedCount} cough record(s). ${skipped > 0 ? `(${skipped} skipped)` : ''}`);
        } catch (err) {
            alert("Failed to parse Cough CSV. Check the file format.");
        }
        event.target.value = '';
    };
    reader.readAsText(file);
},

// ==========================================
// --- ACTIVITY LOG CSV EXPORT / IMPORT ---
// ==========================================

exportActivityCSV() {
    const pid = this.activePatientId;
    if (!pid) return alert("Select a patient first.");
    const pet = this.patients.find(p => p.id === pid);
    const source = (this.activityLog || []).filter(a => a.patientId === pid);
    if (source.length === 0) return alert("No activity data to export for this pet.");

    const headers = "Date,PatientName,Status,DurationMins,DistanceValue,DistanceUnit,Notes\n";
    const rows = source.map(a => {
        const patient = this.patients.find(p => p.id === a.patientId);
        const patientName = this.sanitiseCSV(patient ? patient.name : 'Unknown');
        return [
            a.date,
            `"${patientName}"`,
            `"${this.sanitiseCSV(a.status || '')}"`,
            `"${this.sanitiseCSV(a.durationMins || '')}"`,
            `"${this.sanitiseCSV(a.distanceValue ?? '')}"`,
            `"${this.sanitiseCSV(a.distanceUnit || '')}"`,
            `"${this.sanitiseCSV(a.notes || '')}"`
        ].join(',');
    }).join("\n");

    const BOM = '\uFEFF';
    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(BOM + headers + rows);
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", `VCH_ActivityLog${this._csvPetSuffix(pet)}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
},

importActivityCSV(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const lines = e.target.result.split("\n").map(l => l.trim()).filter(Boolean);
            if (lines.length <= 1) return alert("The selected CSV file appears empty.");

            const clean = (s) => (s || '').replace(/^"|"$/g, '').replace(/""/g, '"').trim();
            let importedCount = 0, skipped = 0;

            for (let i = 1; i < lines.length; i++) {
                const parts = lines[i].match(/(".*?"|[^",]+|(?<=,)(?=,)|(?<=,)$|^(?=,))/g);
                if (!parts || parts.length < 6) { skipped++; continue; }

                const patientName = clean(parts[1]);
                const patient = this.patients.find(p => p.name.toLowerCase() === patientName.toLowerCase());
                if (!patient) { skipped++; continue; }

               const rec = {
                    id: this.generateId(),
                    patientId: patient.id,
                    date: clean(parts[0]),
                    status: clean(parts[2]),
                    durationMins: clean(parts[3]),
                    notes: clean(parts[parts.length - 1])
                };
                if (parts.length >= 7) {                     // new format: value + unit
                    const v = parseFloat(clean(parts[4]));
                    rec.distanceValue = isNaN(v) ? '' : v;
                    rec.distanceUnit  = clean(parts[5]) || this.appSettings.distanceUnit;
                } else {                                     // legacy format: single text column
                    const { value, unit } = this._parseDistanceText(clean(parts[4]), this.appSettings.distanceUnit);
                    rec.distanceValue = value;
                    rec.distanceUnit  = value === '' ? null : unit;
                }
                this.activityLog.push(rec);
                importedCount++;
            }

            this.saveToStorage('vch_activityLog', this.activityLog);
            if(this.activePatientId) this.loadActivityForDate();
            this.$nextTick(() => { this.renderChart(); });
            alert(`Imported ${importedCount} activity record(s). ${skipped > 0 ? `(${skipped} skipped)` : ''}`);
        } catch (err) { alert("Failed to parse Activity CSV."); }
        event.target.value = '';
    };
    reader.readAsText(file);
},

// ==========================================
// --- SYNCOPE LOG CSV EXPORT / IMPORT ---
// ==========================================

exportSyncopeCSV() {
    const pid = this.activePatientId;
    if (!pid) return alert("Select a patient first.");
    const pet = this.patients.find(p => p.id === pid);
    const source = (this.syncopeLog || []).filter(s => s.patientId === pid);
    if (source.length === 0) return alert("No syncope data to export for this pet.");

    const headers = "Date,Time,PatientName,Type,Duration,LOC,MuscleTone,ActivityBefore,MMColour,HR,RR,Notes\n";
    const rows = source.map(s => {
        const patient = this.patients.find(p => p.id === s.patientId);
        const patientName = this.sanitiseCSV(patient ? patient.name : 'Unknown');
        return [
            s.date,
            s.time || '',
            `"${patientName}"`,
            `"${this.sanitiseCSV(s.type || '')}"`,
            `"${this.sanitiseCSV(s.duration || '')}"`,
            `"${this.sanitiseCSV(s.loc || '')}"`,
            `"${this.sanitiseCSV(s.muscleTone || '')}"`,
            `"${this.sanitiseCSV(s.activityBefore || '')}"`,
            `"${this.sanitiseCSV(s.mmColour || '')}"`,
            s.hr || '',
            s.rr || '',
            `"${this.sanitiseCSV(s.notes || '')}"`
        ].join(',');
    }).join("\n");

    const BOM = '\uFEFF';
    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(BOM + headers + rows);
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", `VCH_SyncopeLog${this._csvPetSuffix(pet)}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
},

importSyncopeCSV(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const lines = e.target.result.split("\n").map(l => l.trim()).filter(Boolean);
            if (lines.length <= 1) return alert("The selected CSV file appears empty.");

            const clean = (s) => (s || '').replace(/^"|"$/g, '').replace(/""/g, '"').trim();
            let importedCount = 0, skipped = 0;

            for (let i = 1; i < lines.length; i++) {
                const parts = lines[i].match(/(".*?"|[^",]+|(?<=,)(?=,)|(?<=,)$|^(?=,))/g);
                if (!parts || parts.length < 12) { skipped++; continue; }

                const patientName = clean(parts[2]);
                const patient = this.patients.find(p => p.name.toLowerCase() === patientName.toLowerCase());
                if (!patient) { skipped++; continue; }

                this.syncopeLog.push({
                    id: this.generateId(),
                    patientId: patient.id,
                    date: clean(parts[0]),
                    time: clean(parts[1]),
                    type: clean(parts[3]),
                    duration: clean(parts[4]),
                    loc: clean(parts[5]),
                    muscleTone: clean(parts[6]),
                    activityBefore: clean(parts[7]),
                    mmColour: clean(parts[8]),
                    hr: clean(parts[9]) ? parseInt(clean(parts[9])) : null,
                    rr: clean(parts[10]) ? parseInt(clean(parts[10])) : null,
                    notes: clean(parts[11])
                });
                importedCount++;
            }
            
            this.syncopeLog.sort((a, b) => new Date(b.date) - new Date(a.date));
            this.saveToStorage('vch_syncopeLog', this.syncopeLog);
            this.$nextTick(() => { this.renderChart(); });
            alert(`Imported ${importedCount} syncope record(s). ${skipped > 0 ? `(${skipped} skipped)` : ''}`);
        } catch (err) { alert("Failed to parse Syncope CSV."); }
        event.target.value = '';
    };
    reader.readAsText(file);
},

// ==========================================
// --- WEIGHT LOG CSV EXPORT / IMPORT ---
// ==========================================

exportWeightCSV() {
    const pid = this.activePatientId;
    if (!pid) return alert("Select a patient first.");
    const pet = this.patients.find(p => p.id === pid);
    const source = (this.weightLog || []).filter(w => w.patientId === pid);
    if (source.length === 0) return alert("No weight data to export for this pet.");
    const headers = "Date,PatientName,Weight,Unit,Appetite,FoodBrand,PortionSize,Supplements,Notes\n";
    const rows = source.map(w => {
        const patient = this.patients.find(p => p.id === w.patientId);
        const patientName = this.sanitiseCSV(patient ? patient.name : 'Unknown');
        const unit = patient?.weightUnit || 'kg';
        return [
            (w.date || '').split('T')[0],
            `"${patientName}"`,
            w.weightValue != null ? w.weightValue : '',
            unit,
            `"${this.sanitiseCSV(w.appetite || '')}"`,
            `"${this.sanitiseCSV(w.foodBrand || '')}"`,
            `"${this.sanitiseCSV(w.portionSize || '')}"`,
            `"${this.sanitiseCSV(w.supplements || '')}"`,
            `"${this.sanitiseCSV(w.notes || '')}"`
        ].join(',');
    }).join("\n");
    const BOM = '\uFEFF';
    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(BOM + headers + rows);
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", `VCH_WeightLog${this._csvPetSuffix(pet)}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
},

importWeightCSV(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const lines = e.target.result.split("\n").map(l => l.trim()).filter(Boolean);
            if (lines.length <= 1) return alert("The selected CSV file appears empty.");
            const clean = (s) => (s || '').replace(/^"|"$/g, '').replace(/""/g, '"').trim();
            let importedCount = 0, skipped = 0;
            for (let i = 1; i < lines.length; i++) {
                const parts = lines[i].match(/(".*?"|[^",]+|(?<=,)(?=,)|(?<=,)$|^(?=,))/g);
                if (!parts || parts.length < 3) { skipped++; continue; }
                const patientName = clean(parts[1]);
                const patient = this.patients.find(p => p.name.toLowerCase() === patientName.toLowerCase());
                if (!patient) { skipped++; continue; }
                // Weight is optional (diet-only day). A blank/invalid weight imports as null,
                // never 0. Skip only a genuinely empty row (no weight and nothing diet-related).
                const parsedW = parseFloat(clean(parts[2]));
                const weightValue = (!isNaN(parsedW) && parsedW > 0) ? parsedW : null;
                const appetite = clean(parts[4]) || 'Normal';
                const foodBrand = clean(parts[5]) || '';
                const portionSize = clean(parts[6]) || '';
                const notes = clean(parts[8]) || '';
                if (weightValue === null && appetite === 'Normal' && !foodBrand && !portionSize && !notes) {
                    skipped++; continue;
                }
                this.weightLog.push({
                    id: this.generateId(),
                    patientId: patient.id,
                    date: clean(parts[0]),
                    weightValue,
                    appetite,
                    foodBrand,
                    portionSize,
                    supplements: clean(parts[7]) || '',
                    notes
                });
                importedCount++;
            }
            this.saveToStorage('vch_weightLog', this.weightLog);
            this.$nextTick(() => { this.renderWeightChart(); this.renderMedChart(); });
            const note = skipped > 0 ? ` (${skipped} skipped)` : '';
            alert(`Imported ${importedCount} weight record(s)${note}.`);
        } catch (err) { alert("Failed to parse Weight CSV. Check the file format."); }
        event.target.value = '';
    };
    reader.readAsText(file);
},

// ==========================================
// --- VACCINATION LOG CSV EXPORT / IMPORT ---
// ==========================================

exportVaccinationCSV() {
    const pid = this.activePatientId;
    if (!pid) return alert("Select a patient first.");
    const pet = this.patients.find(p => p.id === pid);
    const source = (this.vaccinationLog || []).filter(v => v.patientId === pid);
    if (source.length === 0) return alert("No vaccination data to export for this pet.");
    const headers = "Date,PatientName,VaccineType,Components,BatchNumber,AdministeredBy,NextDueDate,Additionals,Notes\n";
    const rows = source.map(v => {
        const patient = this.patients.find(p => p.id === v.patientId);
        const patientName = this.sanitiseCSV(patient ? patient.name : 'Unknown');
        const components = (v.components || []).join('; ');
        const additionals = (v.additionals || []).map(a => `${a.label}:${a.nextDueDate || ''}`).join('; ');
        return [
            v.date,
            `"${patientName}"`,
            `"${this.sanitiseCSV(v.type || '')}"`,
            `"${this.sanitiseCSV(components)}"`,
            `"${this.sanitiseCSV(v.batchNumber || '')}"`,
            `"${this.sanitiseCSV(v.administeredBy || '')}"`,
            v.nextDueDate || '',
            `"${this.sanitiseCSV(additionals)}"`,
            `"${this.sanitiseCSV(v.notes || '')}"`
        ].join(',');
    }).join("\n");
    const BOM = '\uFEFF';
    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(BOM + headers + rows);
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", `VCH_VaccinationLog${this._csvPetSuffix(pet)}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
},

importVaccinationCSV(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const lines = e.target.result.split("\n").map(l => l.trim()).filter(Boolean);
            if (lines.length <= 1) return alert("The selected CSV file appears empty.");
            const clean = (s) => (s || '').replace(/^"|"$/g, '').replace(/""/g, '"').trim();
            let importedCount = 0, skipped = 0;
            for (let i = 1; i < lines.length; i++) {
                const parts = lines[i].match(/(".*?"|[^",]+|(?<=,)(?=,)|(?<=,)$|^(?=,))/g);
                if (!parts || parts.length < 3) { skipped++; continue; }
                const patientName = clean(parts[1]);
                const patient = this.patients.find(p => p.name.toLowerCase() === patientName.toLowerCase());
                if (!patient) { skipped++; continue; }
                const date = clean(parts[0]);
                if (!date) { skipped++; continue; }
                const additionalsRaw = clean(parts[7]);
                const additionals = additionalsRaw
                    ? additionalsRaw.split(';').map(s => {
                        const colonIdx = s.trim().indexOf(':');
                        const label = colonIdx > -1 ? s.trim().slice(0, colonIdx).trim() : s.trim();
                        const nextDueDate = colonIdx > -1 ? s.trim().slice(colonIdx + 1).trim() : '';
                        return { id: this.generateId(), label, nextDueDate };
                    }).filter(a => a.label)
                    : [];
                this.vaccinationLog.push({
                    id: this.generateId(),
                    patientId: patient.id,
                    date,
                    vaccineId: '',
                    type: clean(parts[2]),
                    isCombi: false,
                    components: clean(parts[3]) ? clean(parts[3]).split(';').map(s => s.trim()).filter(Boolean) : [],
                    additionals,
                    batchNumber: clean(parts[4]) || '',
                    administeredBy: clean(parts[5]) || '',
                    nextDueDate: clean(parts[6]) || '',
                    notes: clean(parts[8]) || ''
                });
                importedCount++;
            }
            this.saveToStorage('vch_vaccinationLog', this.vaccinationLog);
            const note = skipped > 0 ? ` (${skipped} skipped)` : '';
            alert(`Imported ${importedCount} vaccination record(s)${note}.`);
        } catch (err) { alert("Failed to parse Vaccination CSV. Check the file format."); }
        event.target.value = '';
    };
    reader.readAsText(file);
},

// ==========================================
// --- ANTIPARASITIC LOG CSV EXPORT / IMPORT ---
// ==========================================

exportAntiparasiticCSV() {
    const pid = this.activePatientId;
    if (!pid) return alert("Select a patient first.");
    const pet = this.patients.find(p => p.id === pid);
    const source = (this.antiparasiticLog || []).filter(a => a.patientId === pid);
    if (source.length === 0) return alert("No antiparasitic data to export for this pet.");
    const headers = "Date,PatientName,Product,IntervalDays,IntervalLabel,Covers,Partial,BatchNumber,AdministeredBy,NextDueDate,Notes\n";
    const rows = source.map(a => {
        const patient = this.patients.find(p => p.id === a.patientId);
        const patientName = this.sanitiseCSV(patient ? patient.name : 'Unknown');
        const product = a.productId === 'other' ? (a.productLabel || a.customName || 'Custom') : (a.productLabel || a.productId);
        const covers = (a.covers || []).join('; ');
        const partial = (a.partial || []).join('; ');
        return [
            a.date,
            `"${patientName}"`,
            `"${this.sanitiseCSV(product)}"`,
            a.intervalDays != null ? a.intervalDays : '',
            `"${this.sanitiseCSV(a.intervalLabel || '')}"`,
            `"${this.sanitiseCSV(covers)}"`,
            `"${this.sanitiseCSV(partial)}"`,
            `"${this.sanitiseCSV(a.batchNumber || '')}"`,
            `"${this.sanitiseCSV(a.administeredBy || '')}"`,
            a.nextDueDate || '',
            `"${this.sanitiseCSV(a.notes || '')}"`
        ].join(',');
    }).join("\n");
    const BOM = '\uFEFF';
    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(BOM + headers + rows);
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", `VCH_AntiparasiticLog${this._csvPetSuffix(pet)}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
},

importAntiparasiticCSV(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const lines = e.target.result.split("\n").map(l => l.trim()).filter(Boolean);
            if (lines.length <= 1) return alert("The selected CSV file appears empty.");
            const clean = (s) => (s || '').replace(/^"|"$/g, '').replace(/""/g, '"').trim();
            let importedCount = 0, skipped = 0;
            for (let i = 1; i < lines.length; i++) {
                const parts = lines[i].match(/(".*?"|[^",]+|(?<=,)(?=,)|(?<=,)$|^(?=,))/g);
                if (!parts || parts.length < 3) { skipped++; continue; }
                const patientName = clean(parts[1]);
                const patient = this.patients.find(p => p.name.toLowerCase() === patientName.toLowerCase());
                if (!patient) { skipped++; continue; }
                const date = clean(parts[0]);
                if (!date) { skipped++; continue; }
                const productLabel = clean(parts[2]);
                // Try to resolve back to a known catalogue product by brand name; else treat as custom
                const matched = Object.values(this.antiparasiticFormulary).find(p => p.brand.toLowerCase() === productLabel.toLowerCase());
                this.antiparasiticLog.push({
                    id: this.generateId(),
                    patientId: patient.id,
                    date,
                    productId: matched ? matched.id : 'other',
                    productLabel: matched ? matched.brand : (productLabel || 'Custom'),
                    intervalDays: parseInt(clean(parts[3])) || 30,
                    intervalLabel: clean(parts[4]) || 'Monthly',
                    covers: clean(parts[5]) ? clean(parts[5]).split(';').map(s => s.trim()).filter(Boolean) : [],
                    partial: clean(parts[6]) ? clean(parts[6]).split(';').map(s => s.trim()).filter(Boolean) : [],
                    batchNumber: clean(parts[7]) || '',
                    administeredBy: clean(parts[8]) || '',
                    nextDueDate: clean(parts[9]) || '',
                    notes: clean(parts[10]) || ''
                });
                importedCount++;
            }
            this.saveToStorage('vch_antiparasiticLog', this.antiparasiticLog);
            const note = skipped > 0 ? ` (${skipped} skipped)` : '';
            alert(`Imported ${importedCount} antiparasitic record(s)${note}.`);
        } catch (err) { alert("Failed to parse Antiparasitic CSV. Check the file format."); }
        event.target.value = '';
    };
    reader.readAsText(file);
},

// ==========================================
// --- DIAGNOSIS LOG CSV EXPORT / IMPORT ---
// ==========================================

exportDiagnosisCSV() {
    const pid = this.activePatientId;
    if (!pid) return alert("Select a patient first.");
    const pet = this.patients.find(p => p.id === pid);
    const source = (this.diagnosisLog || []).filter(d => d.patientId === pid);
    if (source.length === 0) return alert("No diagnosis data to export for this pet.");

    const headers = "Date,PatientName,Diagnosis,CustomDiagnosis,MurmurGrade,ACVIMStage,ConcurrentDiagnoses,Notes\n";
    const rows = source.map(d => {
        const patient = this.patients.find(p => p.id === d.patientId);
        const patientName = this.sanitiseCSV(patient ? patient.name : 'Unknown');
        // Join concurrent array with a semicolon so it stays in one CSV column
        const concurrentStr = (d.concurrentDiagnoses || []).join(';');

        return [
            d.date,
            `"${patientName}"`,
            `"${this.sanitiseCSV(d.diagnosis || '')}"`,
            `"${this.sanitiseCSV(d.customDiagnosis || '')}"`,
            `"${this.sanitiseCSV(d.murmurGrade || '')}"`,
            `"${this.sanitiseCSV(d.acvimStage || '')}"`,
            `"${this.sanitiseCSV(concurrentStr)}"`,
            `"${this.sanitiseCSV(d.notes || '')}"`
        ].join(',');
    }).join("\n");

    const BOM = '\uFEFF';
    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(BOM + headers + rows);
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", `VCH_DiagnosisLog${this._csvPetSuffix(pet)}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
},

importDiagnosisCSV(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const lines = e.target.result.split("\n").map(l => l.trim()).filter(Boolean);
            if (lines.length <= 1) return alert("The selected CSV file appears empty.");

            const clean = (s) => (s || '').replace(/^"|"$/g, '').replace(/""/g, '"').trim();
            let importedCount = 0, skipped = 0;

            for (let i = 1; i < lines.length; i++) {
                const parts = lines[i].match(/(".*?"|[^",]+|(?<=,)(?=,)|(?<=,)$|^(?=,))/g);
                if (!parts || parts.length < 8) { skipped++; continue; }

                const patientName = clean(parts[1]);
                const patient = this.patients.find(p => p.name.toLowerCase() === patientName.toLowerCase());
                if (!patient) { skipped++; continue; }

                const rawConcurrent = clean(parts[6]);
                const parsedConcurrent = rawConcurrent ? rawConcurrent.split(';').map(s => s.trim()).filter(Boolean) : [];

                this.diagnosisLog.push({
                    id: this.generateId(),
                    patientId: patient.id,
                    date: clean(parts[0]),
                    diagnosis: clean(parts[2]),
                    customDiagnosis: clean(parts[3]),
                    murmurGrade: clean(parts[4]),
                    acvimStage: clean(parts[5]),
                    concurrentDiagnoses: parsedConcurrent,
                    notes: clean(parts[7]),
                    timestamp: Date.now() // required for diagnosis sorting/logic
                });
                importedCount++;
            }

            this.diagnosisLog.sort((a, b) => new Date(b.date) - new Date(a.date));
            this.saveToStorage('vch_diagnosisLog', this.diagnosisLog);
            
            // Update active state variables if viewing the patient
            if (this.diagnosisLog.length > 0 && this.activePatientId) {
                 const recent = this.currentClinicalStatus;
                 if (recent) {
                     this.primaryCardiacDiagnosis = recent.diagnosis;
                     this.acvimStage = recent.acvimStage;
                 }
            }

            this.$nextTick(() => { this.renderChart(); });
            alert(`Imported ${importedCount} diagnosis record(s). ${skipped > 0 ? `(${skipped} skipped)` : ''}`);
        } catch (err) { alert("Failed to parse Diagnosis CSV."); }
        event.target.value = '';
    };
    reader.readAsText(file);
},




        // --- FULL SYSTEM MASTER BACKUP (JSON) ---
        
exportCompleteBackup(patientId = null) {
    const scoped = arr => patientId ? (arr || []).filter(e => e.patientId === patientId) : (arr || []);
    const patients = patientId ? this.patients.filter(p => p.id === patientId) : this.patients;
    
    if (patientId && patients.length === 0) return alert("Patient not found.");

    const backupData = {
        vch_patients: patients,
        vch_weightLog: scoped(this.weightLog),
        vch_srrHistory: scoped(this.srrHistory),
        vch_medLedger: scoped(this.medLedger),
        vch_suppLedger: scoped(this.suppLedger),
        vch_diagnosisLog: scoped(this.diagnosisLog),
        vch_syncopeLog: scoped(this.syncopeLog),
        vch_coughLog: scoped(this.coughLog),
        vch_activityLog: scoped(this.activityLog),
        vch_vaccinationLog: scoped(this.vaccinationLog),
        vch_antiparasiticLog: scoped(this.antiparasiticLog),
        vch_injectionLog: scoped(this.injectionLog),
        vch_medDoseLog: scoped(this.medDoseLog),
        vch_bloodResults: scoped(this.bloodResults),
        vch_echoMeasurements: scoped(this.echoMeasurements),
        vch_procedureLog: scoped(this.procedureLog),
        vch_allergyLog: scoped(this.allergyLog),
        vch_appointmentLog: scoped(this.appointmentLog),
        vch_skinLog: scoped(this.skinLog),
        vch_lumpLog: scoped(this.lumpLog),
        vch_lumpMeasurements: scoped(this.lumpMeasurements),
        vch_orthoConditions: scoped(this.orthoConditions),
        vch_orthoLog: scoped(this.orthoLog),
        exportDate: new Date().toISOString(),
        exportScope: patientId ? 'single' : 'all'
    };

    const label = patientId ? patients[0].name.replace(/[^a-z0-9]/gi, '') : 'Master';
    const fileName = `VCH_${label}Backup_${new Date().toISOString().split('T')[0]}.json`;
    const jsonStr = JSON.stringify(backupData, null, 2);

    // 1. Convert payload to a Blob to bypass data URI string length limitations
    const blob = new Blob([jsonStr], { type: 'application/json' });

    // 2. iOS/Mobile PWA Route: Utilize the Native Web Share API
    if (navigator.canShare && navigator.share) {
        const file = new File([blob], fileName, { type: 'application/json' });
        
        // Verify the system permits sharing this specific file type
        if (navigator.canShare({ files: [file] })) {
            navigator.share({
                title: 'VetCardioHub Clinical Backup',
                files: [file]
            }).then(() => {
                this._updateBackupTimestamp(patientId);
            }).catch(err => {
                // If the user dismisses the share sheet, do nothing. 
                // If it fails for environmental reasons, fall back to the anchor method.
                if (err.name !== 'AbortError') {
                    this._fallbackAnchorDownload(blob, fileName, patientId);
                }
            });
            return; // Halt execution so we don't trigger the desktop fallback
        }
    }

    // 3. Desktop/Legacy Route: Standard Object URL Anchor Drop
    this._fallbackAnchorDownload(blob, fileName, patientId);
},

// Helper method to keep code DRY and handle desktop routing
_fallbackAnchorDownload(blob, fileName, patientId) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    
    // Clean up DOM and release memory
    document.body.removeChild(link);
    URL.revokeObjectURL(url); 
    
    this._updateBackupTimestamp(patientId);
},

// Helper method for timestamp management
_updateBackupTimestamp(patientId) {
    if (!patientId) {
        this.lastBackupAt = Date.now();
        try { 
            localStorage.setItem('vch_lastBackupAt', String(this.lastBackupAt)); 
        } catch (e) {
            console.warn("Storage quota exceeded when saving backup timestamp.");
        }
    }
},

importCompleteBackup(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            if (Array.isArray(data.vch_patients) && Array.isArray(data.vch_srrHistory) && Array.isArray(data.vch_medLedger)) {
                if (data.vch_patients.length === 0) {
                    alert("This backup file contains no patient profiles.");
                } else {
                    this.backupPreview = data;
                    this.backupSelection = data.vch_patients.map(p => p.id); // all selected by default
                    this.showBackupImportModal = true;
                }
            } else {
                alert(
                    "Invalid backup file.\n\n" +
                    "Expected keys: vch_patients, vch_srrHistory, vch_medLedger (all arrays).\n" +
                    "This file may be corrupt or from an incompatible version."
                );
            }
        } catch (err) {
            console.error(err);
            alert("Failed to read JSON backup file.");
        }
        event.target.value = '';
    };
    this.migrateDiagnosisEqualisation();
    reader.readAsText(file);
},

// Entry counts shown in the import preview list
backupLogCount(pid) {
    const d = this.backupPreview;
    if (!d) return 0;
    return ['vch_srrHistory', 'vch_medLedger', 'vch_suppLedger', 'vch_diagnosisLog', 'vch_syncopeLog',
            'vch_coughLog', 'vch_activityLog', 'vch_weightLog', 'vch_vaccinationLog',
            'vch_antiparasiticLog','vch_injectionLog','vch_medDoseLog','vch_bloodResults','vch_echoMeasurements',
            'vch_procedureLog', 'vch_allergyLog', 'vch_appointmentLog',
            'vch_skinLog', 'vch_lumpLog', 'vch_lumpMeasurements',
            'vch_orthoConditions', 'vch_orthoLog']
        .reduce((n, k) => n + (d[k] || []).filter(e => e.patientId === pid).length, 0);
},

toggleBackupSelection(pid) {
    this.backupSelection = this.backupSelection.includes(pid)
        ? this.backupSelection.filter(x => x !== pid)
        : [...this.backupSelection, pid];
},

confirmBackupImport() {
    const data = this.backupPreview;
    if (!data || this.backupSelection.length === 0) return alert("Please select at least one patient to import.");

    const idMap = {};        // original ID -> local ID (re-issued on collision)
    const dupePrompts = [];  // likely duplicates for optional merge
    const importedNames = [];

    data.vch_patients.forEach(p => {
        if (!this.backupSelection.includes(p.id)) return;
        // Backfill identification + insurance so a backup from an older build (or from the iOS app
        // before the web adopted these keys) imports as "not recorded" rather than undefined.
        const incoming = this._backfillPatientIdentity(
            { ...p, modules: { ...this.defaultModules, ...(p.modules || {}) } });

        // Never overwrite: re-issue the UUID if it already exists locally
        idMap[p.id] = this.patients.some(x => x.id === p.id) ? this.generateId() : p.id;
        incoming.id = idMap[p.id];

        // Flag likely duplicates (same name + species) for a post-import merge offer
        const twin = this.patients.find(x =>
            (x.name || '').trim().toLowerCase() === (incoming.name || '').trim().toLowerCase() &&
            x.species === incoming.species
        );
        if (twin) dupePrompts.push({ importedId: incoming.id, existingId: twin.id, name: incoming.name });

        this.patients.push(incoming);
        importedNames.push(incoming.name);
    });

    // Append log entries for selected patients — fresh entry IDs, remapped patient IDs.
    // KEEP IN STEP with `backupLogCount` (the import preview counts these same keys) and with
    // `exportCompleteBackup`. `medDoseLog` was previously missing here while still being counted in
    // the preview and written to the export, so restoring a backup silently discarded every dose
    // tick after promising the user it would import them.
    const logKeys = ['weightLog', 'srrHistory', 'medLedger', 'suppLedger', 'diagnosisLog', 'syncopeLog',
                     'coughLog', 'activityLog', 'vaccinationLog', 'antiparasiticLog', 'injectionLog',
                     'medDoseLog', 'bloodResults', 'echoMeasurements', 'procedureLog', 'allergyLog',
                     'appointmentLog', 'skinLog'];
    // `lumpLog` + `lumpMeasurements` are NOT in that list: the generic loop re-issues every id,
    // which would break the `lumpId` join. They are imported below, together.'
    logKeys.forEach(key => {
        const incoming = (data['vch_' + key] || [])
            .filter(e => idMap[e.patientId] !== undefined)
            .map(e => ({ ...e, id: this.generateId(), patientId: idMap[e.patientId] }));
        this[key] = this[key].concat(incoming);
        if (key === 'diagnosisLog') this[key].sort((a, b) => new Date(b.date) - new Date(a.date));
        this.saveToStorage('vch_' + key, this[key]);
    });
    // Lumps carry their measurements, so the join is rebuilt as they are inserted. Every record
    // gets a fresh local id, and a measurement still holding the FILE's lump id would either
    // dangle or — far worse — collide with an unrelated lump already in the store. A measurement
    // whose lump is not in the map is DROPPED: attaching it to the wrong lump would corrupt that
    // lump's growth history, which is the one number this feature exists to get right.
    const lumpIdMap = {};
    const incomingLumps = (data.vch_lumpLog || [])
        .filter(l => idMap[l.patientId] !== undefined)
        .map(l => {
            const newId = this.generateId();
            lumpIdMap[l.id] = newId;
            return { ...l, id: newId, patientId: idMap[l.patientId] };
        });
    this.lumpLog = (this.lumpLog || []).concat(incomingLumps);
    this.saveToStorage('vch_lumpLog', this.lumpLog);

    const incomingMeasurements = (data.vch_lumpMeasurements || [])
        .filter(m => idMap[m.patientId] !== undefined && lumpIdMap[m.lumpId] !== undefined)
        .map(m => ({ ...m, id: this.generateId(), patientId: idMap[m.patientId],
                     lumpId: lumpIdMap[m.lumpId],
                     // Photos live on the device that took them and cannot ride in a JSON
                     // backup, so an imported measurement never claims to have one.
                     photoFilename: '' }));
    this.lumpMeasurements = (this.lumpMeasurements || []).concat(incomingMeasurements);
    this.saveToStorage('vch_lumpMeasurements', this.lumpMeasurements);

    // Orthopaedics follows the lump rule exactly, and for the same reason: every record gets a
    // fresh local id, so a day's score still holding the FILE's condition id would either dangle
    // or attach itself to an unrelated problem and corrupt that problem's trend. A score whose
    // condition is not in the map is DROPPED.
    const orthoIdMap = {};
    const incomingConditions = (data.vch_orthoConditions || [])
        .filter(c => idMap[c.patientId] !== undefined)
        .map(c => {
            const newId = this.generateId();
            orthoIdMap[c.id] = newId;
            return { ...c, id: newId, patientId: idMap[c.patientId] };
        });
    this.orthoConditions = (this.orthoConditions || []).concat(incomingConditions);
    this.saveToStorage('vch_orthoConditions', this.orthoConditions);

    const incomingOrthoDays = (data.vch_orthoLog || [])
        .filter(e => idMap[e.patientId] !== undefined && orthoIdMap[e.conditionId] !== undefined)
        .map(e => ({ ...e, id: this.generateId(), patientId: idMap[e.patientId],
                     conditionId: orthoIdMap[e.conditionId] }));
    this.orthoLog = (this.orthoLog || []).concat(incomingOrthoDays);
    this.saveToStorage('vch_orthoLog', this.orthoLog);

    this.saveToStorage('vch_patients', this.patients);

    this.showBackupImportModal = false;
    this.backupPreview = null;
    this.activePatientId = Object.values(idMap)[0];
    this.currentPage = 1;
    if (this.showOnboarding) this.showOnboarding = false;  // device-switch onboarding path
    this.$nextTick(() => { this.renderChart(); this.renderMedChart(); });

    alert(`Imported ${importedNames.length} patient(s): ${importedNames.join(', ')}.`);

    // Offer merge via the existing patient manager
    if (dupePrompts.length > 0) {
        const d = dupePrompts[0];
        if (confirm(`"${d.name}" appears to already exist on this device.\n\nOpen the patient editor to review and merge the two profiles?`)) {
            this.openPatientManager(false, d.importedId);
            this.showMergeTools = true;
            this.mergeTargetId = d.existingId;
        }
    }
},

cancelBackupImport() {
    this.showBackupImportModal = false;
    this.backupPreview = null;
    this.backupSelection = [];
},

        
        //Log entries edits and deletes and comments
        
deleteReading(id) {
    if (confirm("Delete this reading? This cannot be undone.")) {
        this.srrHistory = this.srrHistory.filter(log => log.id !== id);
        this.saveToStorage('vch_srrHistory', this.srrHistory);
        this.currentPage = 1;
        this.$nextTick(() => { this.renderChart(); });
    }
},

toggleCommentDisplay(id) {
    this.expandedCommentId = this.expandedCommentId === id ? null : id;
},

openCommentEditor(log) {
    this.editingCommentId = log.id;
    this.commentDraft = log.comment || '';
},

saveComment() {
    const entry = this.srrHistory.find(log => log.id === this.editingCommentId);
    if (entry) {
        const trimmed = this.commentDraft.trim();
        if (trimmed) entry.comment = trimmed;
        else delete entry.comment;
        
        this.saveToStorage('vch_srrHistory', this.srrHistory);
    }
    this.editingCommentId = null;
    this.commentDraft = '';
},

cancelComment() {
    this.editingCommentId = null;
    this.commentDraft = '';
},

// --- EXPORT ENGINE ---

getCanvasWithWhiteBackground(canvas) {
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height;

    const ctx = exportCanvas.getContext('2d');

    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

    // Draw original chart on top
    ctx.drawImage(canvas, 0, 0);

    return exportCanvas.toDataURL('image/jpeg', 1.0);
},

// ── SVG HELPERS (private, not exposed to Alpine template) ─────────────────────
 
// Strips Alpine event/bind attributes that contain characters illegal in XML,
// preventing XMLSerializer from producing a broken or empty data URI.
_sanitiseSvgClone(svgElement) {
    const clone = svgElement.cloneNode(true);
    const bad = /^(@|x-on:|x-bind:|:|x-)/i;
 
    // Clean root element
    [...clone.attributes].forEach(attr => {
        if (bad.test(attr.name)) clone.removeAttribute(attr.name);
    });
    // Remove Alpine-bound :style and replace with a plain static value
    clone.removeAttribute(':style');
    clone.setAttribute('style', 'display:block;');
 
    // Clean every descendant
    clone.querySelectorAll('*').forEach(el => {
        [...el.attributes].forEach(attr => {
            if (bad.test(attr.name)) el.removeAttribute(attr.name);
        });
    });
 
    return clone;
},
 
// Renders a sanitised SVG clone to a JPEG data-URL via an offscreen canvas.
// Uses Blob + createObjectURL — works with non-Latin characters unlike btoa.
async _svgToJpegDataUrl(svgElement, width, height) {
    const clone = this._sanitiseSvgClone(svgElement);
    clone.setAttribute('width', String(width));
    clone.setAttribute('height', String(height));
 
    const svgData = new XMLSerializer().serializeToString(clone);
    const blob    = new Blob([svgData], { type: 'image/svg+xml' });
    const url     = URL.createObjectURL(blob);
 
    try {
        const img = new Image();
        await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = url;
        });
 
        const canvas = document.createElement('canvas');
        canvas.width  = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
 
        return canvas.toDataURL('image/jpeg', 1.0);
    } finally {
        URL.revokeObjectURL(url);
    }
},
 

 
// ── generatePDF ───────────────────────────────────────────────────────────────
async generatePDF() {
    if (!this.activePatientId) return alert("Select a patient first.");
 
    const { jsPDF } = window.jspdf;
    const doc     = new jsPDF();
    const profile = this.activePatientProfile;
    const { startDate, endDate } = this.getVetExportDateRange();
    const mods = this.vetExportModules;
 
    const inRange = (dateStr) => {
        if (!startDate) return true;
        const d = this.parseDateSafe(dateStr);
        return d >= startDate && d <= endDate;
    };
 
    // ── 1. Header ─────────────────────────────────────────────────────────
    doc.setFontSize(20);
    doc.setTextColor(22, 50, 95);
    doc.text(`${this.toTitleCase(profile.name) || 'Unnamed Patient'} — Clinical Report`, 14, 20);
 
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated: ${new Date().toLocaleDateString('en-GB')}  |  Period: ${this.vetExportTimeScaleLabel}`, 14, 28);
    doc.text(
        `Species: ${this.speciesLabel(profile)}  |  Breed: ${this.toTitleCase(profile.breed) || 'N/A'}  |  Age: ${this.computedAgeText}  |  Owner: ${this.toTitleCase(profile.ownerName) || 'N/A'}`,
        14, 34
    );
 
    doc.setDrawColor(200);
    doc.line(14, 37, 196, 37);
 
    let Y = 45; // Flowing Y cursor

    // ── 1b. Allergies & adverse reactions ─────────────────────────────────
    // A boxed banner at the top of page one rather than a section further down. Everything else in
    // this document is history a vet reads at their own pace; this is the one part that has to be
    // seen BEFORE they act, so it gets a red rule rather than the brand navy. Omitted entirely when
    // nothing is recorded — an empty box reading "none" would be a claim the owner never made.
    const pdfAllergies = this.allergyExportOrder();
    if (pdfAllergies.length > 0) {
        const severe = this.hasSevereAllergy(pdfAllergies);
        const wrapped = pdfAllergies.map(a => ({
            severe: a.severity === 'severe',
            lines: doc.splitTextToSize(this.allergyExportLine(a), 172)
        }));
        const bodyH = wrapped.reduce((n, w) => n + w.lines.length, 0) * 4.4 + 5;

        doc.setFillColor(179, 26, 26);
        doc.rect(14, Y, 182, 7, 'F');
        doc.setFontSize(10);
        doc.setTextColor(255, 255, 255);
        doc.text(`ALLERGIES & ADVERSE REACTIONS${severe ? '  —  INCLUDES A SEVERE REACTION' : ''}`, 17, Y + 5);
        Y += 7;

        doc.setFillColor(252, 226, 226);
        doc.rect(14, Y, 182, bodyH, 'F');
        doc.setDrawColor(179, 26, 26);
        doc.rect(14, Y - 7, 182, bodyH + 7, 'S');
        doc.setFontSize(9);
        doc.setTextColor(20, 20, 20);
        let aY = Y + 5;
        wrapped.forEach(w => {
            doc.setFont(undefined, w.severe ? 'bold' : 'normal');
            w.lines.forEach(line => { doc.text(line, 17, aY); aY += 4.4; });
        });
        doc.setFont(undefined, 'normal');
        doc.setDrawColor(200);
        Y += bodyH + 10;
    }

    // Utility: section header with auto page-break
    const sectionHeader = (title, r, g, b) => {
        if (Y > 262) { doc.addPage(); Y = 20; }
        doc.setFontSize(12);
        doc.setTextColor(r ?? 22, g ?? 50, b ?? 95);
        doc.text(title, 14, Y);
        doc.setTextColor(20, 20, 20);
        Y += 4;
    };
 
    // Utility: embed a chart canvas image with auto page-break
    const embedCanvas = (canvas, title) => {
        if (!canvas || !canvas.width || !canvas.height) return;
        const ratio = canvas.height / canvas.width;
        if (!isFinite(ratio) || ratio <= 0) return;
        const imgData   = this.getCanvasWithWhiteBackground(canvas);
        
        const pdfH      = Math.round(180 * ratio);
        if (Y + pdfH > 280) { doc.addPage(); Y = 20; }
        sectionHeader(title);
        doc.addImage(imgData, 'JPEG', 14, Y, 180, pdfH);
        Y += pdfH + 14;
    };
 
    // ── 2. ACVIM Staging Chart ────────────────────────────────────────────
    if (mods.acvimStaging && this.activePathway) {
        try {
            const svgEl = document.getElementById('acvim-svg-export');
            if (svgEl) {
                const SVG_W = 600, SVG_H = 320;
                const PDF_W = 180, PDF_H = Math.round(PDF_W * SVG_H / SVG_W);
 
                const imgData = await this._svgToJpegDataUrl(svgEl, SVG_W, SVG_H);
 
                if (Y + PDF_H > 280) { doc.addPage(); Y = 20; }
                sectionHeader('Disease Progression & ACVIM Staging', 109, 40, 217);
                doc.addImage(imgData, 'JPEG', 14, Y, PDF_W, PDF_H);
                Y += PDF_H + 14;
            }
        } catch (err) {
            console.error('VCH PDF: ACVIM SVG render failed —', err);
        }
    }

    // ── 2b. Murmur Grade Chart ────────────────────────────────────────────
    if (mods.acvimStaging && this.murmurProgression && this.murmurProgression.length > 0) {
        try {
            const murmurSvgEl = document.getElementById('murmur-svg-export');
            if (murmurSvgEl) {
                const SVG_W = 660, SVG_H = 215;
                const PDF_W = 180, PDF_H = Math.round(PDF_W * SVG_H / SVG_W);

                const imgData = await this._svgToJpegDataUrl(murmurSvgEl, SVG_W, SVG_H);

                if (Y + PDF_H > 280) { doc.addPage(); Y = 20; }
                sectionHeader('Murmur Grade Progression (Levine Scale)', 180, 83, 9);
                doc.addImage(imgData, 'JPEG', 14, Y, PDF_W, PDF_H);
                Y += PDF_H + 14;
            } else {
                console.warn('VCH PDF: murmur-svg-export element not found — is the murmur card visible?');
            }
        } catch (err) {
            console.error('VCH PDF: Murmur SVG render failed —', err);
        }
    }
 
    // ── 3. SRR Chart — rendered offscreen against the Vet Export range ────
    if (mods.srr) {
        const srrImg = this._srrChartExportDataUrl(startDate, endDate);
        if (srrImg) {
            const pdfH = Math.round(180 * 480 / 1200);
            if (Y + pdfH > 280) { doc.addPage(); Y = 20; }
            sectionHeader('Sleeping Respiratory Rate (SRR) Chart');
            doc.addImage(srrImg, 'JPEG', 14, Y, 180, pdfH);
            Y += pdfH + 14;
        }
    }
 
    // ── 4. Medication Timeline Chart ──────────────────────────────────────
      if (mods.medications && this.hasAnyMedData()) {
        const medChart = Chart.getChart(this.$refs.medChartCanvas);
        if (medChart?.resetZoom) medChart.resetZoom();
        embedCanvas(this.$refs.medChartCanvas, 'Medication Timeline');
    }
 
    // ── 5. SRR Log Table ──────────────────────────────────────────────────
    const srrData = mods.srr
        ? this.srrHistory
            .filter(r => r.patientId === this.activePatientId && inRange(r.date))
            .sort((a, b) => new Date(b.date) - new Date(a.date)) // newest first
        : [];
    if (srrData.length > 0) {
        if (Y > 240) { doc.addPage(); Y = 20; }
        sectionHeader('Sleeping Respiratory Rate Log', 14, 116, 144);
        doc.autoTable({
            startY: Y,
            head: [['Date', 'Time', 'Rate (bpm)', 'Effort', 'Manual', 'Clinical Notes']],
            body: srrData.map(r => [
                new Date(r.date).toLocaleDateString('en-GB'),
                r.time || new Date(r.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                r.rate,
                r.breathingEffort != null ? String(r.breathingEffort) : '—',
                r.isManual ? 'Yes' : 'No',
                r.comment || '—'
            ]),
            theme: 'striped',
            headStyles: { fillColor: [14, 116, 144] },
            columnStyles: { 0:{cellWidth:26}, 1:{cellWidth:20}, 2:{cellWidth:24}, 3:{cellWidth:18}, 4:{cellWidth:18}, 5:{cellWidth:'auto'} },
            styles: { fontSize: 8 }
        });
        Y = doc.lastAutoTable.finalY + 12;
    }
    
    // ── 5b. Current Medications & Stock ───────────────────────────────────
    if (mods.medications) {
        const stockRows = this.currentMedStock();
        if (stockRows.length > 0) {
            if (Y > 240) { doc.addPage(); Y = 20; }
            sectionHeader('Current Medications & Stock', 217, 119, 6);
            doc.autoTable({
                startY: Y,
                head: [['Drug', 'Regimen', 'Per Dose', 'In Stock', 'Days Left', 'Runs Out / Discard']],
                body: stockRows.map(r => {
                    const p = r.projection;
                    const limit = p
                        ? `${p.emptyDate}${p.reason === 'expiry' ? ' (discard)' : ''}`
                        : (r.entry.frequency === 'PRN' ? 'PRN' : '—');
                    return [
                        r.name,
                        `${r.entry.doseMg != null ? r.entry.doseMg + 'mg ' : ''}${r.entry.frequency || ''}`.trim(),
                        r.entry.tabletsPerDose != null ? `${r.entry.tabletsPerDose} ${r.doseUnit}` : '—',
                        r.entry.tabletsInStock != null ? `${r.entry.tabletsInStock} ${r.doseUnit}` : '—',
                        this.stockDaysLabel(p),
                        limit
                    ];
                }),
                theme: 'striped',
                headStyles: { fillColor: [217, 119, 6] },
                columnStyles: { 0:{cellWidth:36}, 1:{cellWidth:38}, 2:{cellWidth:22}, 3:{cellWidth:22}, 4:{cellWidth:20}, 5:{cellWidth:'auto'} },
                styles: { fontSize: 8 }
            });
            Y = doc.lastAutoTable.finalY + 12;
        }
    }
    
     
    // ── 6. Medication Log Table ───────────────────────────────────────────
    if (mods.medications) {
        const medData = this.medLedger
        .filter(m => m.patientId === this.activePatientId && inRange(m.eventDate))
        .sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));
 
    if (medData.length > 0) {
        if (Y > 240) { doc.addPage(); Y = 20; }
            sectionHeader('Medication Log', 146, 64, 14);
            doc.autoTable({
                startY: Y,
                head: [['Date', 'Drug', 'Action', 'Dose (mg)', 'Frequency', 'mg/kg']],
                body: medData.map(m => {
                    const action  = this.getComputedAction(m);
                    const name    = this.medDisplayName(m);
                    const mgPerKg = (!m.isStopped && m.doseMg)
                        ? this.computeHistoricMgPerKg(m.doseMg, m.patientId, m.eventDate)
                        : null;
                    return [
                        m.eventDate,
                        name,
                        action,
                        m.doseMg != null ? `${m.doseMg} mg` : '—',
                        m.frequency || '—',
                        mgPerKg ? `${mgPerKg} mg/kg` : '—'
                    ];
                }),
                theme: 'striped',
                headStyles: { fillColor: [146, 64, 14] },
                columnStyles: { 0: { cellWidth: 24 }, 1: { cellWidth: 38 }, 2: { cellWidth: 22 }, 3: { cellWidth: 22 }, 4: { cellWidth: 22 }, 5: { cellWidth: 'auto' } },
                styles: { fontSize: 8 }
            });
            Y = doc.lastAutoTable.finalY + 12;
        }
    }

    // ── 6a. Injectable Medications Table ──────────────────────────────────
    if (mods.medications) {
        const injData = (this.injectionLog || [])
            .filter(e => e.patientId === this.activePatientId && inRange(e.date))
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        if (injData.length > 0) {
            if (Y > 240) { doc.addPage(); Y = 20; }
            sectionHeader('Injectable Medications', 99, 102, 241);
            doc.autoTable({
                startY: Y,
                head: [['Date', 'Product', 'Dose', 'Interval', 'Next Due', 'Given By']],
                body: injData.map(e => [
                    e.date,
                    e.customName || 'Injectable',
                    e.dose || '—',
                    e.intervalLabel || (e.intervalDays ? e.intervalDays + 'd' : '—'),
                    e.nextDueDate || '—',
                    e.administeredBy || '—'
                ]),
                theme: 'striped',
                headStyles: { fillColor: [99, 102, 241] },
                columnStyles: { 0: { cellWidth: 24 }, 1: { cellWidth: 38 }, 2: { cellWidth: 24 }, 3: { cellWidth: 24 }, 4: { cellWidth: 24 }, 5: { cellWidth: 'auto' } },
                styles: { fontSize: 8 }
            });
            Y = doc.lastAutoTable.finalY + 12;
        }
    }

    // ── 6b. Supplement Log Table ──────────────────────────────────────────
    if (mods.medications) {
        const suppData = (this.suppLedger || [])
            .filter(s => s.patientId === this.activePatientId && inRange(s.eventDate))
            .sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));

        if (suppData.length > 0) {
            if (Y > 240) { doc.addPage(); Y = 20; }
            sectionHeader('Supplement Log', 16, 185, 129);
            doc.autoTable({
                startY: Y,
                head: [['Date', 'Supplement', 'Action', 'Dose', 'Frequency', 'Contains']],
                body: suppData.map(s => {
                    const action = this.getComputedSuppAction(s);
                    const dose = s.doseAmount ? `${s.doseAmount} ${s.doseUnit || ''}`.trim() : '—';
                    const contains = this.suppConstituentIdsFor(s)
                        .map(cid => this.suppConstituentLabel(cid)).join(', ');
                    return [
                        s.eventDate,
                        this.suppDisplayName(s),
                        action,
                        s.isStopped ? '—' : dose,
                        s.isStopped ? '—' : (s.frequency || '—'),
                        contains || '—'
                    ];
                }),
                theme: 'striped',
                headStyles: { fillColor: [16, 185, 129] },
                columnStyles: { 0: { cellWidth: 24 }, 1: { cellWidth: 40 }, 2: { cellWidth: 20 }, 3: { cellWidth: 24 }, 4: { cellWidth: 20 }, 5: { cellWidth: 'auto' } },
                styles: { fontSize: 8 }
            });
            Y = doc.lastAutoTable.finalY + 12;
        }
    }
 
    // ── 7. Diagnosis & Staging Log ────────────────────────────────────────
    if (mods.acvimStaging) {
            const diagData = this.diagnosisLog
            .filter(d => d.patientId === this.activePatientId)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
     
        if (diagData.length > 0) {
            if (Y > 240) { doc.addPage(); Y = 20; }
            sectionHeader('Diagnosis & Staging Log', 109, 40, 217);
            doc.autoTable({
                startY: Y,
                head: [['Date', 'Diagnosis', 'ACVIM Stage', 'Murmur Grade', 'Concurrent Conditions', 'Notes']],
                body: diagData.map(d => [
                    d.date,
                    this.diagDisplayName(d),                                                  // was: d.diagnosis === 'Other' ? ...
                    d.acvimStage || '—',
                    d.murmurGrade || '—',
                    d.diagnosis === 'Concurrent Conditions Only' ? '—'                        // sentinel: condition already in col 2
                        : ((d.concurrentDiagnoses || []).join(', ') || '—'),
                    d.notes || '—'
                ]),
                theme: 'striped',
                headStyles: { fillColor: [109, 40, 217] },
                columnStyles: { 0: { cellWidth: 22 }, 1: { cellWidth: 32 }, 2: { cellWidth: 20 }, 3: { cellWidth: 20 }, 4: { cellWidth: 34 }, 5: { cellWidth: 'auto' } },
                styles: { fontSize: 8 }
            });
            Y = doc.lastAutoTable.finalY + 12;
        }
    }
 
    // ── 7b. Blood Test Results ────────────────────────────────────────────
    {
        const bloodData = this.patientBloodResults();
        if (bloodData.length > 0) {
            if (Y > 240) { doc.addPage(); Y = 20; }
            sectionHeader('Blood Test Results', 15, 118, 110);
            doc.autoTable({
                startY: Y,
                head: [['Sampled', 'Marker', 'Result', 'Lab range', 'vs range', 'Laboratory']],
                body: bloodData.map(b => {
                    const st = this.bloodStatus(b);
                    return [
                        b.sampleDate,
                        this.bloodDisplayName(b),
                        this.trimBloodNumber(b.value) + (b.unit ? ' ' + b.unit : ''),
                        this.bloodRefText(b) || '—',
                        st === 'unknown' ? '—' : this.bloodStatusShort(st),
                        b.labName || '—'
                    ];
                }),
                theme: 'striped',
                headStyles: { fillColor: [15, 118, 110] },
                columnStyles: { 0: { cellWidth: 22 }, 1: { cellWidth: 36 }, 2: { cellWidth: 28 }, 3: { cellWidth: 32 }, 4: { cellWidth: 18 }, 5: { cellWidth: 'auto' } },
                styles: { fontSize: 8 }
            });
            Y = doc.lastAutoTable.finalY + 12;
        }
    }

    // ── 8. Syncope / Collapse Log ─────────────────────────────────────────
    if (mods.syncopeLog) {
            const syncData = this.syncopeLog
            .filter(s => s.patientId === this.activePatientId && inRange(s.date))
            .sort((a, b) => new Date(b.date) - new Date(a.date));
     
        if (syncData.length > 0) {
            if (Y > 240) { doc.addPage(); Y = 20; }
            sectionHeader('Syncope / Collapse Events', 185, 28, 28);
            doc.autoTable({
                startY: Y,
                head: [['Date', 'Time', 'Type', 'Duration', 'LOC', 'Muscle Tone', 'Activity Before', 'Notes']],
                body: syncData.map(s => [
                    s.date,
                    s.time || '—',
                    s.type || '—',
                    s.duration || '—',
                    s.loc || '—',
                    s.muscleTone || '—',
                    s.activityBefore || '—',
                    s.notes || '—'
                ]),
                theme: 'striped',
                headStyles: { fillColor: [185, 28, 28] },
                columnStyles: { 0: { cellWidth: 20 }, 1: { cellWidth: 14 }, 2: { cellWidth: 20 }, 3: { cellWidth: 18 }, 4: { cellWidth: 12 }, 5: { cellWidth: 20 }, 6: { cellWidth: 22 }, 7: { cellWidth: 'auto' } },
                styles: { fontSize: 8 }
            });
            Y = doc.lastAutoTable.finalY + 12;
        }
    }
 
    // ── 9. Cough Log ──────────────────────────────────────────────────────
    if (mods.coughLog) {
            const coughData = this.coughLog
            .filter(c => c.patientId === this.activePatientId && inRange(c.date))
            .sort((a, b) => new Date(b.date) - new Date(a.date));
     
        if (coughData.length > 0) {
            if (Y > 240) { doc.addPage(); Y = 20; }
            sectionHeader('Cough Log', 161, 98, 7);
            doc.autoTable({
                startY: Y,
                head: [['Date', 'Severity', 'Frequency', 'Period', 'Description', 'Context', 'Notes']],
                body: coughData.map(c => [
                    c.date,
                    c.severity || '—',
                    c.frequencyCount || '—',
                    c.frequencyPeriod || '—',
                    c.description || '—',
                    c.context || '—',
                    c.notes || '—'
                ]),
                theme: 'striped',
                headStyles: { fillColor: [161, 98, 7] },
                columnStyles: { 0: { cellWidth: 22 }, 1: { cellWidth: 18 }, 2: { cellWidth: 16 }, 3: { cellWidth: 14 }, 4: { cellWidth: 30 }, 5: { cellWidth: 24 }, 6: { cellWidth: 'auto' } },
                styles: { fontSize: 8 }
            });
            Y = doc.lastAutoTable.finalY + 12;
        }
    }
 
    // ── 10. Activity Log ──────────────────────────────────────────────────
    if (mods.activityLog) {
            const actData = this.activityLog
            .filter(a => a.patientId === this.activePatientId && inRange(a.date))
            .sort((a, b) => new Date(b.date) - new Date(a.date));
     
        if (actData.length > 0) {
            if (Y > 240) { doc.addPage(); Y = 20; }
            sectionHeader('Activity Log', 5, 150, 105);
            doc.autoTable({
                startY: Y,
                head: [['Date', 'Status', 'Duration (mins)', 'Distance', 'Notes']],
                body: actData.map(a => [
                    a.date,
                    a.status || '—',
                    a.durationMins || '—',
                    (a.distanceValue !== '' && a.distanceValue != null)
                        ? `${a.distanceValue} ${this.distanceLabel(a.distanceUnit || this.appSettings.distanceUnit)}` : '—',
                    a.notes || '—'
                ]),
                theme: 'striped',
                headStyles: { fillColor: [5, 150, 105] },
                columnStyles: { 0: { cellWidth: 26 }, 1: { cellWidth: 26 }, 2: { cellWidth: 28 }, 3: { cellWidth: 26 }, 4: { cellWidth: 'auto' } },
                styles: { fontSize: 8 }
            });
        }
    }
 
 // ── 11. Weight Chart + Weight Log ──────────────────────────────────────
    if (mods.weightDiet) {
        const weightData = this.weightLog
        .filter(w => w.patientId === this.activePatientId && inRange(w.date))
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    
            if (weightData.length > 0) {
            const wImg = this._weightChartExportDataUrl(startDate, endDate);
            if (wImg) {
                const pdfH = Math.round(180 * 480 / 1200);
                if (Y + pdfH > 280) { doc.addPage(); Y = 20; }
                sectionHeader('Weight Trend Chart', 15, 118, 110);
                doc.addImage(wImg, 'JPEG', 14, Y, 180, pdfH);
                Y += pdfH + 14;
            }
            if (Y > 240) { doc.addPage(); Y = 20; }
            sectionHeader('Weight & Diet Log', 15, 118, 110);
            
            const weightUnit = profile.weightUnit || 'kg';
            doc.autoTable({
                startY: Y,
                head: [['Date', `Weight (${weightUnit})`, 'Appetite', 'Food / Diet', 'Portion', 'Notes']],
                body: weightData.map(w => [
                    (w.date || '').split('T')[0],
                    w.weightValue != null ? `${w.weightValue} ${weightUnit}` : '—',
                    w.appetite || '—',
                    w.foodBrand || '—',
                    w.portionSize || '—',
                    w.notes || '—'
                ]),
                theme: 'striped',
                headStyles: { fillColor: [15, 118, 110] },
                columnStyles: { 0: { cellWidth: 20 }, 1: { cellWidth: 20 }, 2: { cellWidth: 18 }, 3: { cellWidth: 30 }, 4: { cellWidth: 22 }, 5: { cellWidth: 22 }, 6: { cellWidth: 'auto' } },
                styles: { fontSize: 8 }
            });
            Y = doc.lastAutoTable.finalY + 12;
        }
    }

    // ── 12. Vaccination Log ────────────────────────────────────────────────
    if (mods.vaccinations) {
            const vaccData = this.vaccinationLog
            .filter(v => v.patientId === this.activePatientId)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    
        if (vaccData.length > 0) {
            if (Y > 240) { doc.addPage(); Y = 20; }
            sectionHeader('Vaccination Log', 124, 58, 237);
            doc.autoTable({
                startY: Y,
                head: [['Date', 'Vaccine', 'Batch No.', 'Administered By', 'Next Due', 'Notes']],
                body: vaccData.map(v => [
                    v.date,
                    v.type || '—',
                    v.batchNumber || '—',
                    v.administeredBy || '—',
                    v.nextDueDate || '—',
                    v.notes || '—'
                ]),
                theme: 'striped',
                headStyles: { fillColor: [124, 58, 237] },
                columnStyles: { 0: { cellWidth: 22 }, 1: { cellWidth: 38 }, 2: { cellWidth: 22 }, 3: { cellWidth: 32 }, 4: { cellWidth: 22 }, 5: { cellWidth: 'auto' } },
                styles: { fontSize: 8 }
            });
            Y = doc.lastAutoTable.finalY + 12;
        }
    }
    
        // ── 13. Antiparasitic Log ──────────────────────────────────────────────
    if (mods.antiparasitics) {
            const apData = this.antiparasiticLog
            .filter(a => a.patientId === this.activePatientId && inRange(a.date))
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    
        if (apData.length > 0) {
            if (Y > 240) { doc.addPage(); Y = 20; }
            sectionHeader('Antiparasitic Log', 15, 118, 110);
            doc.autoTable({
                startY: Y,
                head: [['Date', 'Product', 'Covers', 'Schedule', 'Next Due', 'Notes']],
                body: apData.map(a => [
                    a.date,
                    a.productLabel || a.productId || '—',
                    (a.covers || []).map(cid => PARASITE_TARGETS.find(t => t.id === cid)?.short || cid).join(', ') || '—',
                    a.intervalLabel || '—',
                    a.nextDueDate || '—',
                    a.notes || '—'
                ]),
                theme: 'striped',
                headStyles: { fillColor: [15, 118, 110] },
                columnStyles: { 0: { cellWidth: 20 }, 1: { cellWidth: 32 }, 2: { cellWidth: 38 }, 3: { cellWidth: 22 }, 4: { cellWidth: 20 }, 5: { cellWidth: 'auto' } },
                styles: { fontSize: 8 }
            });
            Y = doc.lastAutoTable.finalY + 12;
        }
    }

    // ── 14. Skin & itch — the yearly pattern first, then the day-by-day record ─────────────
    //
    // Order is the point. A seasonal rhythm is the finding this module exists for and it is what a
    // vet reading this page wants BEFORE the daily rows, which are the working behind it. The
    // monthly chart is computed from the WHOLE record and deliberately ignores the export range —
    // a seasonal read from a 90-day window is not a seasonal read — while the score line honours
    // the range like every other dated chart here. The captions say which is which.
    if (mods.skinLog) {
        const skinAll = this.patientSkinLog();
        const skinRows = skinAll
            .filter(e => inRange(e.date))
            .sort((a, b) => (b.date || '').localeCompare(a.date || ''));

        if (skinAll.length > 0) {
            const pattern = this.skinPattern();
            const monthlyImg = this._skinMonthlyChartExportDataUrl();
            if (monthlyImg) {
                const pdfH = Math.round(180 * 480 / 1200);
                if (Y + pdfH > 265) { doc.addPage(); Y = 20; }
                sectionHeader('Skin — Yearly Pattern (whole record)', 180, 83, 9);
                // The written read travels WITH the bars. The headline alone can sound settled;
                // the detail is where the hedge and the hand-off to the vet live, and the two must
                // never be separated. Mirrors `SkinPatternSummary` on iOS.
                doc.setFontSize(9);
                const headLines = doc.splitTextToSize(pattern.headline, 180);
                headLines.forEach(line => { doc.text(line, 14, Y + 4); Y += 4.4; });
                doc.setFontSize(8);
                doc.setTextColor(90);
                doc.splitTextToSize(pattern.detail, 180).forEach(line => { doc.text(line, 14, Y + 4); Y += 4; });
                doc.setTextColor(20, 20, 20);
                Y += 6;
                if (Y + pdfH > 280) { doc.addPage(); Y = 20; }
                doc.addImage(monthlyImg, 'JPEG', 14, Y, 180, pdfH);
                Y += pdfH + 4;
                doc.setFontSize(7.5);
                doc.setTextColor(120);
                doc.text('Average itch score per calendar month, across every year recorded — not limited to this report\'s date range.', 14, Y);
                doc.setTextColor(20, 20, 20);
                Y += 10;
            }

            const scoreImg = this._skinScoreChartExportDataUrl(startDate, endDate);
            if (scoreImg) {
                const pdfH = Math.round(180 * 420 / 1200);
                if (Y + pdfH > 280) { doc.addPage(); Y = 20; }
                sectionHeader('Skin — Itch Score Over This Period', 180, 83, 9);
                doc.addImage(scoreImg, 'JPEG', 14, Y, 180, pdfH);
                Y += pdfH + 4;
                doc.setFontSize(7.5);
                doc.setTextColor(120);
                doc.text('Days logged without a score are absent rather than plotted as 0.', 14, Y);
                doc.setTextColor(20, 20, 20);
                Y += 10;
            }

            if (skinRows.length > 0) {
                if (Y > 240) { doc.addPage(); Y = 20; }
                sectionHeader('Skin & Itch Log', 180, 83, 9);
                doc.autoTable({
                    startY: Y,
                    head: [['Date', 'Itch', 'Band', 'Where', 'Ears', 'Given', 'Notes']],
                    body: skinRows.map(e => [
                        (e.date || '').split('T')[0],
                        // Empty, not "0", when the day was logged unscored — a nil score is "not
                        // scored", which is a different claim from "no itching", and the two must
                        // stay visibly different on the vet's copy.
                        this._skinIsScored(e) ? String(e.itchScore) : '—',
                        this._skinIsScored(e) ? this.skinScoreBand(e.itchScore) : '—',
                        this.skinSiteList(e.sites) || '—',
                        this.skinEarLabel(e.earStatus) || '—',
                        this.skinTreatmentList(e.treatments) || '—',
                        e.notes || '—'
                    ]),
                    theme: 'striped',
                    headStyles: { fillColor: [180, 83, 9] },
                    columnStyles: { 0: { cellWidth: 20 }, 1: { cellWidth: 12 }, 2: { cellWidth: 20 },
                                    3: { cellWidth: 32 }, 4: { cellWidth: 24 }, 5: { cellWidth: 32 },
                                    6: { cellWidth: 'auto' } },
                    styles: { fontSize: 8 }
                });
                Y = doc.lastAutoTable.finalY + 12;
            }
        }
    }

    // ── 15. Lumps ─────────────────────────────────────────────────────────────────────────
    //
    // The size chart, then one row per lump with its measurement history folded into a column of
    // its own. A row per MEASUREMENT would scatter one lump's readings down the page and make the
    // comparison the vet is actually making — this lump, then versus now — harder, not easier.
    if (mods.lumps) {
        const lumpRows = this.sortedLumps;
        if (lumpRows.length > 0) {
            const lumpImg = this._lumpSizeChartExportDataUrl();
            if (lumpImg) {
                const pdfH = Math.round(180 * 460 / 1200);
                if (Y + pdfH > 280) { doc.addPage(); Y = 20; }
                sectionHeader('Lumps — Size Over Time (whole record)', 71, 85, 105);
                doc.addImage(lumpImg, 'JPEG', 14, Y, 180, pdfH);
                Y += pdfH + 4;
                doc.setFontSize(7.5);
                doc.setTextColor(120);
                doc.text('Longest way across, every measurement ever recorded — not limited to this report\'s date range.', 14, Y);
                doc.setTextColor(20, 20, 20);
                Y += 10;
            }

            if (Y > 235) { doc.addPage(); Y = 20; }
            sectionHeader('Lumps', 71, 85, 105);
            doc.autoTable({
                startY: Y,
                head: [['Lump', 'Location', 'Status', 'With the vet', 'Latest', 'Change', 'History', 'To raise']],
                body: lumpRows.map(l => {
                    const mine = this.lumpMeasurementsFor(l.id);
                    const last = mine.length ? mine[mine.length - 1] : null;
                    const vet = [this.lumpVetStageLabel(l.vetStage), l.vetDiagnosis]
                        .filter(x => x).join('\n');
                    return [
                        this.lumpDisplayName(l),
                        this.lumpLocationLine(l) || '—',
                        this.lumpStatusLabel(l.status),
                        vet || '—',
                        last ? this.lumpSizeText(last) : '—',
                        this.lumpChangeSummary(l),
                        mine.map(m => this.lumpMeasurementReportLine(m)).join(' | ') || '—',
                        this.lumpPrompts(l).map(p => p.text).join(' | ') || '—'
                    ];
                }),
                theme: 'striped',
                headStyles: { fillColor: [71, 85, 105] },
                styles: { fontSize: 7 }
            });
            Y = doc.lastAutoTable.finalY + 6;

            // Printed under the table for the same reason it is on every lump screen: an empty
            // "to raise" column is not a statement that a lump is fine.
            doc.setFontSize(7.5);
            doc.setTextColor(120);
            doc.splitTextToSize(LUMP_STANDING_NOTE, 180).forEach(line => { doc.text(line, 14, Y); Y += 3.6; });
            doc.setTextColor(20, 20, 20);
            Y += 10;
        }
    }

    // ── 16. Lameness & joints ─────────────────────────────────────────────────────────────
    //
    // The 0–4 line first, then one row per PROBLEM with the daily scores folded into a column of
    // their own — the same shape as the lump table, for the same reason: a row per day would
    // scatter one leg's scores down the page and bury the comparison the vet is making.
    if (mods.ortho) {
        const orthoRows = this.sortedOrthoConditions;
        if (orthoRows.length > 0) {
            const orthoImg = this._orthoChartExportDataUrl();
            if (orthoImg) {
                const pdfH = Math.round(180 * 460 / 1200);
                if (Y + pdfH > 280) { doc.addPage(); Y = 20; }
                sectionHeader('Lameness Score Over Time (whole record)', 67, 56, 202);
                doc.addImage(orthoImg, 'JPEG', 14, Y, 180, pdfH);
                Y += pdfH + 4;
                doc.setFontSize(7.5);
                doc.setTextColor(120);
                doc.text('0 = sound, 4 = not using the leg at all. Days logged without a score are absent rather than plotted as 0.', 14, Y);
                doc.setTextColor(20, 20, 20);
                Y += 10;
            }

            if (Y > 235) { doc.addPage(); Y = 20; }
            sectionHeader('Lameness & Joints', 67, 56, 202);
            doc.autoTable({
                startY: Y,
                head: [['Problem', 'Legs', 'How long', 'With the vet', 'Recorded cause',
                        'Latest', 'Last 14 days', 'Pain relief', 'Day by day']],
                body: orthoRows.map(c => {
                    const last = this.orthoLatestEntry(c.id);
                    const vet = [this.orthoVetStageLabel(c.vetStage), c.vetDiagnosis]
                        .filter(Boolean).join('\n');
                    const plan = [c.painReliefPlan, this.orthoManagementList(c.management)]
                        .filter(Boolean).join('\n');
                    return [
                        this.orthoDisplayName(c),
                        this.orthoLegList(c.legs) || '—',
                        this.orthoChronicityLabel(c.chronicity),
                        vet || '—',
                        // Prefixed so a vet cannot mistake it for the app's own conclusion.
                        c.suspectedCause && c.suspectedCause !== 'unknown'
                            ? `Owner told: ${this.orthoCauseLabel(c.suspectedCause)}` : '—',
                        last ? this.orthoLamenessText(this._orthoIsScored(last) ? last.lamenessScore : null) : '—',
                        this.orthoRecentRead(c.id).text,
                        plan || '—',
                        this.orthoEntriesFor(c.id).map(e => this.orthoEntryReportLine(e)).join(' | ') || '—'
                    ];
                }),
                theme: 'striped',
                headStyles: { fillColor: [67, 56, 202] },
                styles: { fontSize: 7 }
            });
            Y = doc.lastAutoTable.finalY + 6;

            // Unconditional, for the same reason the lump note is: a table of scores with no flag
            // on it is not a statement that the animal is comfortable.
            doc.setFontSize(7.5);
            doc.setTextColor(120);
            doc.splitTextToSize(ORTHO_STANDING_NOTE, 180).forEach(line => { doc.text(line, 14, Y); Y += 3.6; });
            doc.setTextColor(20, 20, 20);
            Y += 10;
        }
    }

    doc.save(`${profile.name.replace(/\s+/g, '_')}_Clinical_Report_${new Date().toISOString().split('T')[0]}.pdf`);
},


// ── generateCSV ───────────────────────────────────────────────────────────────
// Single file with clearly labelled sections. UTF-8 BOM prefix ensures
// Excel opens it without mojibake on Windows.
generateCSV() {
    if (!this.activePatientId) return;
    const profile = this.activePatientProfile;
        const { startDate, endDate } = this.getVetExportDateRange();
    const mods = this.vetExportModules;
 
    const inRange = (dateStr) => {
        if (!startDate) return true;
        const d = this.parseDateSafe(dateStr);
        return d >= startDate && d <= endDate;
    };
 
    // Wraps a value in quotes and escapes internal quotes
    const q = (v) => `"${String(v == null ? '' : v).replace(/"/g, '""')}"`;
 
    let csv = '';
 
    // Report metadata preamble (not a data row — purely informational)
    csv += `${q('VetCardioHub Clinical Report')},${q(this.toTitleCase(profile.name))}\n`;
    csv += `${q('Generated')},${q(new Date().toLocaleDateString('en-GB'))}\n`;
    csv += `${q('Period')},${q(this.vetExportTimeScaleLabel)}\n`;
    csv += `${q('Species')},${q(this.speciesLabel(profile))}  ${q('Breed')},${q(this.toTitleCase(profile.breed))}  ${q('Owner')},${q(this.toTitleCase(profile.ownerName))}\n`;
    // Identification (microchip + any registrations) — line omitted when nothing is recorded.
    const csvIdLines = this.patientIdLines(profile);
    if (csvIdLines.length > 0) {
        csv += csvIdLines.map(l => `${q(l.label)},${q(this.sanitiseCSV(l.value))}`).join('  ') + '\n';
    }
    csv += '\n';

    // Insurance sits in its own titled block: a practice making a claim reads all four fields
    // together, and the notes are too long for the preamble's paired-column line.
    const csvInsLines = this.patientInsuranceLines(profile);
    if (csvInsLines.length > 0) {
        csv += 'INSURANCE\n';
        csv += csvInsLines.map(l => `${q(l.label)},${q(this.sanitiseCSV(l.value))}`).join('\n') + '\n\n';
    }
 
    // ── Allergies & adverse reactions ─────────────────────────────────────
    // Leads every clinical section, and is deliberately NOT date-filtered and NOT module-gated: a
    // spreadsheet gets skim-read from the top, and a pet does not stop being allergic to chicken
    // because the report covers the last three months.
    const allergyRows = this.allergyExportOrder();
    if (allergyRows.length > 0) {
        csv += 'ALLERGIES & ADVERSE REACTIONS\n';
        csv += 'Type,Allergen,Severity,How known,Reaction,Diagnosed,Notes\n';
        allergyRows.forEach(a => {
            csv += [
                q(this.allergyTypeLabel(a.type)),
                q(this.sanitiseCSV(this.allergyDisplayName(a))),
                q(this.allergySeverityLabel(a.severity)),
                q(this.allergyCertaintyLabel(a.certainty)),
                q(this.sanitiseCSV(a.reaction || '')),
                q(this.allergyDayText(a.date)),
                q(this.sanitiseCSV(a.notes || ''))
            ].join(',') + '\n';
        });
        csv += '\n';
    }

    // ── SRR Log ───────────────────────────────────────────────────────────
    const srrData = mods.srr
        ? this.srrHistory.filter(r => r.patientId === this.activePatientId && inRange(r.date)).sort((a, b) => new Date(a.date) - new Date(b.date))
        : [];
    if (srrData.length > 0) {
        csv += 'SRR LOG\n';
        csv += 'Date,Time,Rate (bpm),Manual,Clinical Notes,Effort\n';
        srrData.forEach(r => {
            csv += [
                q(new Date(r.date).toLocaleDateString('en-GB')),
                q(r.time || ''),
                r.rate,
                r.isManual ? 'Yes' : 'No',
                q(r.comment || '')
            ].join(',') + '\n';
        });
        csv += '\n';
    }
    
    // ── Current Medications & Stock ───────────────────────────────────────
    const stockRows = !mods.medications ? [] : this.currentMedStock();
    if (stockRows.length > 0) {
        csv += 'CURRENT MEDICATIONS & STOCK\n';
        csv += 'Drug,Form,Dose (mg),Frequency,Per Dose,In Stock,Stock Counted,Per Day,Days Left,Runs Out,Discard Date,Limiting Factor\n';
        stockRows.forEach(r => {
            const p = r.projection;
            csv += [
                q(r.name),
                q(r.isLiquid ? 'Liquid' : 'Tablet'),
                r.entry.doseMg != null ? r.entry.doseMg : '',
                q(r.entry.frequency || ''),
                r.entry.tabletsPerDose != null ? q(`${r.entry.tabletsPerDose} ${r.doseUnit}`) : '',
                r.entry.tabletsInStock != null ? q(`${r.entry.tabletsInStock} ${r.doseUnit}`) : '',
                q(r.entry.stockDate || ''),
                p && p.tabletsPerDay != null ? p.tabletsPerDay : '',
                p ? p.daysLeft : (r.entry.frequency === 'PRN' ? 'PRN' : ''),
                q(p && p.runOutDate  ? p.runOutDate  : ''),
                q(p && p.discardDate ? p.discardDate : ''),
                q(p ? (p.reason === 'expiry' ? 'Discard/expiry' : 'Runs out') : '')
            ].join(',') + '\n';
        });
        csv += '\n';
    }
 
    // ── Medication Log ────────────────────────────────────────────────────
    const medData = !mods.medications ? [] : this.medLedger
        .filter(m => m.patientId === this.activePatientId && inRange(m.eventDate))
        .sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));
 
    if (medData.length > 0) {
        csv += 'MEDICATION LOG\n';
        csv += 'Date,Drug,Action,Dose (mg),Frequency,mg/kg\n';
        medData.forEach(m => {
            const action  = this.getComputedAction(m);
            const name    = this.medDisplayName(m);
            const mgPerKg = (!m.isStopped && m.doseMg)
                ? this.computeHistoricMgPerKg(m.doseMg, m.patientId, m.eventDate)
                : '';
            csv += [
                q(m.eventDate),
                q(name),
                q(action),
                m.doseMg != null ? m.doseMg : '',
                q(m.frequency || ''),
                mgPerKg || ''
            ].join(',') + '\n';
        });
        csv += '\n';
    }

    // ── Injectable Medications ────────────────────────────────────────────
    const injData = !mods.medications ? [] : (this.injectionLog || [])
        .filter(e => e.patientId === this.activePatientId && inRange(e.date))
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    if (injData.length > 0) {
        csv += 'INJECTABLE MEDICATIONS\n';
        csv += 'Date,Product,Dose,Interval,NextDue,Batch,GivenBy,Notes\n';
        injData.forEach(e => {
            csv += [
                q(e.date),
                q(e.customName || ''),
                q(e.dose || ''),
                q(e.intervalLabel || (e.intervalDays ? e.intervalDays + 'd' : '')),
                q(e.nextDueDate || ''),
                q(e.batchNumber || ''),
                q(e.administeredBy || ''),
                q(e.notes || '')
            ].join(',') + '\n';
        });
        csv += '\n';
    }

    // ── Supplement Log ────────────────────────────────────────────────────
    const suppData = !mods.medications ? [] : (this.suppLedger || [])
        .filter(s => s.patientId === this.activePatientId && inRange(s.eventDate))
        .sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));

    if (suppData.length > 0) {
        csv += 'SUPPLEMENT LOG\n';
        csv += 'Date,Supplement,Action,Dose,Frequency,Contains\n';
        suppData.forEach(s => {
            const dose = s.doseAmount ? `${s.doseAmount} ${s.doseUnit || ''}`.trim() : '';
            const contains = this.suppConstituentIdsFor(s)
                .map(cid => this.suppConstituentLabel(cid)).join('; ');
            csv += [
                q(s.eventDate),
                q(this.suppDisplayName(s)),
                q(this.getComputedSuppAction(s)),
                q(s.isStopped ? '' : dose),
                q(s.isStopped ? '' : (s.frequency || '')),
                q(contains)
            ].join(',') + '\n';
        });
        csv += '\n';
    }
 
    // ── Diagnosis & Staging Log (always complete history) ─────────────────
    const diagData = !mods.acvimStaging ? [] : this.diagnosisLog
        .filter(d => d.patientId === this.activePatientId)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
 
    if (diagData.length > 0) {
        csv += 'DIAGNOSIS & STAGING LOG\n';
        csv += 'Date,Diagnosis,ACVIM Stage,Murmur Grade,Concurrent Conditions,Notes\n';
        diagData.forEach(d => {
        csv += [
            q(d.date),
            q(this.diagDisplayName(d)),                                           // was: d.diagnosis === 'Other' ? ...
            q(d.acvimStage || ''),
            q(d.murmurGrade || ''),
            q(d.diagnosis === 'Concurrent Conditions Only' ? ''                   // sentinel: blank, condition is in col 2
                : (d.concurrentDiagnoses || []).join('; ')),
            q(d.notes || '')
        ].join(',') + '\n';
    });
        csv += '\n';
    }
 
    // ── Blood Test Results (always complete history, like diagnosis) ──────
    // Not module-gated: there is no per-pet toggle for lab results. Status is always relative to
    // the range THAT report printed.
    const bloodData = this.patientBloodResults();
    if (bloodData.length > 0) {
        csv += 'BLOOD TEST RESULTS\n';
        csv += 'Sample Date,Marker,Result,Units,Lab Reference Range,vs Range,Laboratory,Notes\n';
        bloodData.forEach(b => {
            const st = this.bloodStatus(b);
            csv += [
                q(b.sampleDate),
                q(this.bloodDisplayName(b)),
                q(this.trimBloodNumber(b.value)),
                q(b.unit || ''),
                q(this.bloodRefText(b)),
                q(st === 'unknown' ? '' : this.bloodStatusShort(st)),
                q(b.labName || ''),
                q(b.notes || '')
            ].join(',') + '\n';
        });
        csv += '\n';
    }

    // ── Surgeries & Procedures (always complete history — a spay from six years ago still
    // matters). Not module-gated, like bloods and echo. BOOKINGS ARE LISTED FIRST AND LABELLED,
    // so a vet reading this meets them as plans rather than as history.
    const procData = this.scheduledProcedures().concat(this.completedProcedures());
    if (procData.length > 0) {
        const species = this.activePatient?.species;
        csv += 'SURGERIES & PROCEDURES\n';
        csv += 'Date,Status,Type,Procedure,Area,Performed By,Anaesthetic,Recovery,Teeth Extracted,Histopathology,Result Date,Notes\n';
        procData.forEach(pr => {
            csv += [
                q(pr.date),
                q(pr.status === 'scheduled' ? 'Scheduled' : 'Completed'),
                q(this.procedureCategoryLabel(pr.category)),
                q(this.procedureTitle(pr)),
                q(this.procedureAreaLabel(pr.area)),
                q(pr.performedBy || ''),
                q(pr.hadGA ? 'General anaesthetic' : ''),
                q(pr.recoveryNotes || ''),
                q(this.extractionSummary(pr.extractions, species)),
                q(this.procedureHistopathLine(pr)),
                q(pr.histopathDate || ''),
                q(pr.notes || '')
            ].join(',') + '\n';
        });
        csv += '\n';
    }

    // ── Appointments (always complete history — "when was she last seen by cardiology, and
    // where?" is not a question about the last three months). Not module-gated. Anything still
    // BOOKED is listed FIRST and labelled, so a vet meets it as a plan rather than as a visit.
    //
    // Cancelled and missed slots are included rather than filtered out: "cancelled — too unwell to
    // travel" is a clinical fact, and the Status column keeps it honest.
    //
    // The owner's own preparation notes and their list of questions are deliberately NOT exported.
    // They are a private aide-mémoire for getting to the appointment; printing them into a clinical
    // report would put half-formed worries in front of a vet as if they were findings.
    const apptData = this.upcomingAppointments().concat(this.appointmentHistory());
    if (apptData.length > 0) {
        csv += 'APPOINTMENTS\n';
        csv += 'Date,Time,Status,Type,Appointment,Practice,Address,Outcome,Notes\n';
        apptData.forEach(a => {
            csv += [
                q(a.date),
                q(a.time || ''),
                q(this.appointmentStatusLabel(a.status)),
                q(this.appointmentTypeLabel(a.type)),
                q(this.appointmentTitle(a)),
                q(this.appointmentPlaceName(a)),
                q(this.appointmentAddressOneLine(a)),
                q(a.outcome || ''),
                q(a.notes || '')
            ].join(',') + '\n';
        });
        csv += '\n';
    }

    // ── Syncope / Collapse Log ────────────────────────────────────────────
        const syncData = !mods.syncopeLog ? [] : this.syncopeLog
        .filter(s => s.patientId === this.activePatientId && inRange(s.date))
        .sort((a, b) => new Date(b.date) - new Date(a.date));
 
    if (syncData.length > 0) {
        csv += 'SYNCOPE / COLLAPSE LOG\n';
        csv += 'Date,Time,Type,Duration,LOC,Muscle Tone,Activity Before,Notes\n';
        syncData.forEach(s => {
            csv += [
                q(s.date),
                q(s.time || ''),
                q(s.type || ''),
                q(s.duration || ''),
                q(s.loc || ''),
                q(s.muscleTone || ''),
                q(s.activityBefore || ''),
                q(s.notes || '')
            ].join(',') + '\n';
        });
        csv += '\n';
    }
 
    // ── Cough Log ─────────────────────────────────────────────────────────
    const coughData = !mods.coughLog ? [] : this.coughLog
        .filter(c => c.patientId === this.activePatientId && inRange(c.date))
        .sort((a, b) => new Date(b.date) - new Date(a.date));
 
    if (coughData.length > 0) {
        csv += 'COUGH LOG\n';
        csv += 'Date,Severity,Frequency Count,Period,Description,Context,Notes\n';
        coughData.forEach(c => {
            csv += [
                q(c.date),
                q(c.severity || ''),
                c.frequencyCount || '',
                q(c.frequencyPeriod || ''),
                q(c.description || ''),
                q(c.context || ''),
                q(c.notes || '')
            ].join(',') + '\n';
        });
        csv += '\n';
    }
 
    // ── Activity Log ──────────────────────────────────────────────────────
    const actData = !mods.activityLog ? [] : this.activityLog
        .filter(a => a.patientId === this.activePatientId && inRange(a.date))
        .sort((a, b) => new Date(b.date) - new Date(a.date));
 
    if (actData.length > 0) {
        csv += 'ACTIVITY LOG\n';
        csv += 'Date,Status,Duration (mins),Distance Value,Distance Unit,Notes\n';
        actData.forEach(a => {
            csv += [
                q(a.date),
                q(a.status || ''),
                a.durationMins || '',
                (a.distanceValue ?? ''),
                q(a.distanceUnit || ''),
                q(a.notes || '')
            ].join(',') + '\n';
        });
        csv += '\n';
    }
    
    // ── Weight & Diet Log ─────────────────────────────────────────────────
    const weightDataCSV = !mods.weightDiet ? [] : this.weightLog
        .filter(w => w.patientId === this.activePatientId && inRange(w.date))
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    if (weightDataCSV.length > 0) {
        const wUnit = profile.weightUnit || 'kg';
        csv += 'WEIGHT & DIET LOG\n';
        csv += `Date,Weight (${wUnit}),Appetite,Food/Diet,Portion Size,Supplements,Notes\n`;
        weightDataCSV.forEach(w => {
            csv += [
                q((w.date || '').split('T')[0]),
                w.weightValue != null ? w.weightValue : '',
                q(w.appetite || ''),
                q(w.foodBrand || ''),
                q(w.portionSize || ''),
                q(w.supplements || ''),
                q(w.notes || '')
            ].join(',') + '\n';
        });
        csv += '\n';
    }

    // ── Vaccination Log ───────────────────────────────────────────────────
    const vaccDataCSV = !mods.vaccinations ? [] : this.vaccinationLog
        .filter(v => v.patientId === this.activePatientId)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    if (vaccDataCSV.length > 0) {
        csv += 'VACCINATION LOG\n';
        csv += 'Date,Vaccine Type,Components,Batch No.,Administered By,Next Due Date,Additionals,Notes\n';
        vaccDataCSV.forEach(v => {
            const components = (v.components || []).join('; ');
            const additionals = (v.additionals || []).map(a => `${a.label}:${a.nextDueDate || ''}`).join('; ');
            csv += [
                q(v.date),
                q(v.type || ''),
                q(components),
                q(v.batchNumber || ''),
                q(v.administeredBy || ''),
                q(v.nextDueDate || ''),
                q(additionals),
                q(v.notes || '')
            ].join(',') + '\n';
        });
        csv += '\n';
    }
    
        // ── Antiparasitic Log ────────────────────────────────────────────────
    const apDataCSV = !mods.antiparasitics ? [] : this.antiparasiticLog
        .filter(a => a.patientId === this.activePatientId && inRange(a.date))
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    if (apDataCSV.length > 0) {
        csv += 'ANTIPARASITIC LOG\n';
        csv += 'Date,Product,Interval,Covers,Partial,Batch No.,Administered By,Next Due Date,Notes\n';
        apDataCSV.forEach(a => {
            const covers = (a.covers || []).join('; ');
            const partial = (a.partial || []).join('; ');
            csv += [
                q(a.date),
                q(a.productLabel || a.productId || ''),
                q(a.intervalLabel || ''),
                q(covers),
                q(partial),
                q(a.batchNumber || ''),
                q(a.administeredBy || ''),
                q(a.nextDueDate || ''),
                q(a.notes || '')
            ].join(',') + '\n';
        });
        csv += '\n';
    }
 
    // ── SKIN & ITCH ────────────────────────────────────────────────────────
    // The per-day rows respect the date range like every other log. The YEARLY PATTERN block
    // below deliberately does NOT: a seasonal read computed from three months of data is not a
    // seasonal read, and the value of the finding is precisely that it spans years.
    const skinAllCSV = !mods.skinLog ? [] : this.patientSkinLog();
    const skinDataCSV = skinAllCSV.filter(e => inRange(e.date))
        .sort((a, b) => (b.date || '').localeCompare(a.date || ''));

    if (skinDataCSV.length > 0) {
        csv += 'SKIN & ITCH LOG\n';
        csv += 'Date,Itch Score (0-10),Band,Where,Signs,Ears,Given,Owner Suspects,Seen By Vet,Notes\n';
        skinDataCSV.forEach(e => {
            csv += [
                q(e.date),
                // Empty, NOT "0", when the day was logged unscored — they are different answers
                // and must stay different in a column a vet reads.
                q(e.itchScore === null || e.itchScore === undefined ? '' : String(e.itchScore)),
                q(this.skinScoreBand(e.itchScore)),
                q(this.skinSiteList(e.sites)),
                q((e.signs || []).map(id => this.skinSignLabel(id)).join('; ')),
                q(this.skinEarLabel(e.earStatus)),
                q(this.skinTreatmentList(e.treatments)),
                q(e.suspectedTrigger && e.suspectedTrigger !== 'unknown' ? this.skinTriggerLabel(e.suspectedTrigger) : ''),
                q(e.vetVisit ? 'Yes' : ''),
                q(e.notes || '')
            ].join(',') + '\n';
        });
        csv += '\n';
    }

    if (skinAllCSV.length > 0) {
        const pattern = this.skinSeasonalPattern(skinAllCSV);
        csv += 'SKIN — YEARLY PATTERN\n';
        csv += `${q('Finding')},${q(pattern.headline)}\n`;
        csv += `${q('Detail')},${q(pattern.detail)}\n`;
        const ears = this.skinEarSummary(skinAllCSV);
        if (ears) csv += `${q('Ears')},${q(ears)}\n`;
        this.skinTreatmentDays(skinAllCSV).forEach(t => {
            csv += `${q('Treatment')},${q(`${this.skinTreatmentLabel(t.treatment)} — ${t.days} day${t.days === 1 ? '' : 's'}`)}\n`;
        });
        csv += '\n';
    }

    // ── LUMPS ──────────────────────────────────────────────────────────────
    // NOT date-filtered, for the same reason allergies are not: a lump the owner has watched for
    // two years does not stop existing because the report covers the last three months, and a vet
    // reading a report that omitted it would be missing the thing the owner most wants looked at.
    const lumpDataCSV = !mods.lumps ? [] : this.sortedLumps;
    if (lumpDataCSV.length > 0) {
        csv += 'LUMPS\n';
        csv += 'Lump,Location,Status,With The Vet,First Noticed,Latest Size,Change,Vet\'s Note,Measurement History,To Raise,Notes\n';
        lumpDataCSV.forEach(l => {
            const mine = this.lumpMeasurementsFor(l.id);
            const last = mine.length ? mine[mine.length - 1] : null;
            const history = mine.map(m => this.lumpMeasurementReportLine(m)).join(' | ');
            csv += [
                q(this.lumpDisplayName(l)),
                q(this.lumpLocationLine(l)),
                q(this.lumpStatusLabel(l.status)),
                q(this.lumpVetStageLabel(l.vetStage)),
                q(l.firstNoticed || ''),
                q(last ? this.lumpSizeText(last) : ''),
                q(this.lumpChangeSummary(l)),
                q(l.vetDiagnosis || ''),
                q(history),
                q(this.lumpPrompts(l).filter(pr => pr.clinical).map(pr => pr.text).join(' ')),
                q(l.notes || '')
            ].join(',') + '\n';
        });
        // Printed under the table for the same reason it is on every lump screen: an empty
        // "to raise" column is not a statement that a lump is fine.
        csv += `${q('Note')},${q(LUMP_STANDING_NOTE)}\n`;
        csv += '\n';
    }

    // ── LAMENESS & JOINTS ───────────────────────────────────────────────────
    // NOT date-filtered, for the same reason lumps are not: a dog that has limped on the same leg
    // for two years does not stop limping because the report covers ninety days, and the daily
    // scores inside each row carry their own dates.
    const orthoDataCSV = !mods.ortho ? [] : this.sortedOrthoConditions;
    if (orthoDataCSV.length > 0) {
        csv += 'LAMENESS & JOINTS\n';
        csv += 'Problem,Legs,Status,How Long,With The Vet,Recorded Cause,Vet\'s Note,First Noticed,Latest Score,Last 14 Days,Pain Relief Plan,Other Management,Day-By-Day,Notes\n';
        orthoDataCSV.forEach(c => {
            const last = this.orthoLatestEntry(c.id);
            const history = this.orthoEntriesFor(c.id)
                .map(e => this.orthoEntryReportLine(e)).join(' | ');
            csv += [
                q(this.orthoDisplayName(c)),
                q(this.orthoLegList(c.legs)),
                q(this.orthoStatusLabel(c.status)),
                q(this.orthoChronicityLabel(c.chronicity)),
                q(this.orthoVetStageLabel(c.vetStage)),
                // Prefixed so a vet reading the column cannot mistake it for the app's own view.
                q(c.suspectedCause && c.suspectedCause !== 'unknown'
                    ? `Owner told: ${this.orthoCauseLabel(c.suspectedCause)}` : ''),
                q(c.vetDiagnosis || ''),
                q(c.firstNoticed || ''),
                q(last ? this.orthoLamenessText(this._orthoIsScored(last) ? last.lamenessScore : null) : ''),
                q(this.orthoRecentRead(c.id).text),
                q(c.painReliefPlan || ''),
                q(this.orthoManagementList(c.management)),
                q(history),
                q(c.notes || '')
            ].join(',') + '\n';
        });
        // Printed under the table for the same reason the lump note is: a table of scores with no
        // flag on it is not a statement that the animal is comfortable.
        csv += `${q('Note')},${q(ORTHO_STANDING_NOTE)}\n`;
        csv += '\n';
    }

    if (!csv.trim()) return alert("No data to export for this patient in the selected date range.");
 
    const BOM  = '\uFEFF'; // UTF-8 BOM — Excel on Windows needs this to open without encoding errors
    const blob = new Blob([BOM + csv], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href     = url;
    link.download = `${profile.name.replace(/\s+/g, '_')}_Report_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
},

emailReportTo(provider) {
    const pet = this.activePatientProfile?.name || 'my pet';
    const subject = `${pet} — VetCardioHub health report`;
    const body =
`Dear ${provider.name || 'Dr'},

Please find a home-monitoring health report for ${pet}, generated with the VetCardioHub Vitals app.

${this._buildReportText()}

Kind regards,
${this.activePatientProfile?.ownerName || ''}

—
This report summarises observations recorded at home by the owner and is intended to support, not replace, veterinary assessment.`;
    window.location.href = `mailto:${encodeURIComponent(provider.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
},

toTitleCase(str) {
  if (!str) return '';
  return String(str)
    .trim()
    .split(/\s+/)                       // split on whitespace, collapse doubles
    .map(word => {
      // If the word already has an uppercase letter after position 0,
      // assume the user meant it (McDonald, O'Brien, DiCaprio, DCM) — leave it.
      if (/[A-Z]/.test(word.slice(1))) return word;
      // Otherwise title-case each hyphen/apostrophe segment.
      return word
        .split(/([-'])/)                // keep the - and ' as separators
        .map(part =>
          /[-']/.test(part)
            ? part
            : part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
        )
        .join('');
    })
    .join(' ');
},

speciesLabel(patient) {
  if (!patient) return '';
  const map = { dog: 'Dog', cat: 'Cat' };
  if (patient.species === 'other') {
    return this.toTitleCase(patient.speciesOther) || 'Other';
  }
  return map[patient.species] ?? this.toTitleCase(patient.species);
},
 
// Builds the full plain-text clinical report string shared by
// copyToClipboard() and shareReport().
_buildReportText() {
    if (!this.activePatientId) return '';
    const profile = this.activePatientProfile;
    const { startDate, endDate } = this.getVetExportDateRange();
    const mods = this.vetExportModules;

    const inRange = (dateStr) => {
        if (!startDate) return true;
        const d = this.parseDateSafe(dateStr);
        return d >= startDate && d <= endDate;
    };

    const rule   = (char = '─') => char.repeat(58);
    const nl     = '\n';
    const indent = '   ';

    let out = '';

    // Report header
    out += `VETCARDIOHUB CLINICAL REPORT — ${(profile.name || 'UNNAMED PATIENT').toUpperCase()}${nl}`;
    out += `Generated : ${new Date().toLocaleDateString('en-GB')}${nl}`;
    out += `Period    : ${this.vetExportTimeScaleLabel}${nl}`;
    out += `Species   : ${this.speciesLabel(profile)}  |  Breed: ${this.toTitleCase(profile.breed) || 'N/A'}  |  Age: ${this.computedAgeText}${nl}`;
    out += `Owner     : ${this.toTitleCase(profile.ownerName) || 'N/A'}${nl}`;
    // Identification — omitted entirely when nothing is recorded, so a pet with no chip number
    // never gains a line of blanks in front of a vet.
    const idLines = this.patientIdLines(profile);
    if (idLines.length > 0) {
        out += `ID        : ${idLines.map(l => `${l.label}: ${l.value}`).join('  |  ')}${nl}`;
    }
    out += rule('═') + nl + nl;

    // ── Allergies & adverse reactions ─────────────────────────────────────
    // FIRST — before insurance, before every log. This is the only block in the report that changes
    // what a vet is about to put into the animal, so it is placed where it cannot be scrolled past,
    // boxed rather than ruled so it does not read as one more section. Omitted entirely when nothing
    // is recorded: silence is honest, whereas printing "no known allergies" would be a clinical
    // claim the app is in no position to make for the owner.
    const allergyLines = this.allergyExportOrder();
    if (allergyLines.length > 0) {
        out += rule('!') + nl;
        out += 'ALLERGIES & ADVERSE REACTIONS';
        out += this.hasSevereAllergy(allergyLines) ? `  —  INCLUDES A SEVERE REACTION${nl}` : nl;
        out += rule('!') + nl;
        allergyLines.forEach(a => {
            out += `${a.severity === 'severe' ? '** ' : indent}${this.allergyExportLine(a)}${nl}`;
        });
        out += rule('!') + nl + nl;
    }

    // ── Insurance ─────────────────────────────────────────────────────────
    // Its own block, before the clinical sections, because it's what a practice asks for first.
    const insLines = this.patientInsuranceLines(profile);
    if (insLines.length > 0) {
        out += `INSURANCE${nl}`;
        out += rule() + nl;
        insLines.forEach(l => { out += `${l.label}: ${l.value}${nl}`; });
        out += nl;
    }

    // ── SRR Log ───────────────────────────────────────────────────────────
    if (mods.srr) {
        const srrData = this.srrHistory
            .filter(r => r.patientId === this.activePatientId && inRange(r.date))
            .sort((a, b) => new Date(a.date) - new Date(b.date));
        if (srrData.length > 0) {
            out += `SLEEPING RESPIRATORY RATE LOG (${srrData.length} reading${srrData.length !== 1 ? 's' : ''})${nl}`;
            out += rule() + nl;
            srrData.forEach(r => {
                const dateStr = new Date(r.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
                const time    = r.time || new Date(r.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                out += `${dateStr}  ${time}  |  ${r.rate} bpm${r.isManual ? '  [manual]' : ''}`;
                if (r.breathingEffort != null) out += `  |  effort ${r.breathingEffort} — ${this.breathingEffortName(r.breathingEffort)}`;
                if (r.comment) out += `${nl}${indent}${r.comment}`;
                out += nl;
            });
            out += nl;
        }
    }
    
// ── Current Medications & Stock ───────────────────────────────────────
    if (mods.medications) {
        const stockRows = this.currentMedStock();
        if (stockRows.length > 0) {
            out += `CURRENT MEDICATIONS & STOCK (${stockRows.length})${nl}`;
            out += rule() + nl;
            stockRows.forEach(r => {
                const p = r.projection;
                out += `${r.name}${r.isLiquid ? ' (liquid)' : ''}`;
                if (r.entry.doseMg)                 out += `  |  ${r.entry.doseMg}mg ${r.entry.frequency || ''}`;
                if (r.entry.tabletsPerDose != null) out += `  |  ${r.entry.tabletsPerDose} ${r.doseUnit}/dose`;
                if (r.entry.tabletsInStock != null) out += `  |  ${r.entry.tabletsInStock} ${r.doseUnit} in stock`;
                if (p) {
                    out += `${nl}${indent}${this.stockDaysLabel(p)} → ${p.reason === 'expiry' ? 'discard' : 'empty'} ${p.emptyDate}`;
                    if (p.runOutDate && p.discardDate) out += ` (runs out ${p.runOutDate}; discard ${p.discardDate})`;
                    if (r.status && r.status.status !== 'ok') out += `  [${r.status.label}]`;
                } else if (r.entry.frequency === 'PRN') {
                    out += `${nl}${indent}PRN — run-out not projected`;
                }
                out += nl;
            });
            out += nl;
        }
    }
    
    // ── Supplement Log ────────────────────────────────────────────────────
    if (mods.medications) {
        const suppData = (this.suppLedger || [])
            .filter(s => s.patientId === this.activePatientId && inRange(s.eventDate))
            .sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));
        if (suppData.length > 0) {
            out += `SUPPLEMENT LOG (${suppData.length} entr${suppData.length !== 1 ? 'ies' : 'y'})${nl}`;
            out += rule() + nl;
            suppData.forEach(s => {
                out += `${s.eventDate}  |  ${this.getComputedSuppAction(s)}: ${this.suppDisplayName(s)}`;
                if (!s.isStopped && s.doseAmount) out += `  |  ${`${s.doseAmount} ${s.doseUnit || ''} ${s.frequency || ''}`.trim()}`;
                const contains = this.suppConstituentIdsFor(s).map(cid => this.suppConstituentLabel(cid)).join(', ');
                if (contains) out += `${nl}${indent}Contains: ${contains}`;
                out += nl;
            });
            out += nl;
        }
    }
    
    // ── Medication Log ────────────────────────────────────────────────────
    if (mods.medications) {
        const medData = this.medLedger
            .filter(m => m.patientId === this.activePatientId && inRange(m.eventDate))
            .sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));
        if (medData.length > 0) {
            out += `MEDICATION LOG (${medData.length} entr${medData.length !== 1 ? 'ies' : 'y'})${nl}`;
            out += rule() + nl;
            medData.forEach(m => {
                const action  = this.getComputedAction(m);
                const name    = this.medDisplayName(m);
                const mgPerKg = (!m.isStopped && m.doseMg) ? this.computeHistoricMgPerKg(m.doseMg, m.patientId, m.eventDate) : '';
                out += `${m.eventDate}  |  ${action}: ${name}`;
                if (m.doseMg) out += `  |  ${m.doseMg}mg ${m.frequency || ''}`;
                if (mgPerKg)  out += `  (${mgPerKg} mg/kg)`;
                if (m.notes)  out += `${nl}${indent}Notes: ${m.notes}`;
                out += nl;
            });
            out += nl;
        }

        // ── Injectable Medications (below the med log) ─────────────────────
        const injData = this.injectionLog
            .filter(e => e.patientId === this.activePatientId && inRange(e.date))
            .sort((a, b) => new Date(b.date) - new Date(a.date));
        if (injData.length > 0) {
            out += `INJECTABLE MEDICATIONS (${injData.length} entr${injData.length !== 1 ? 'ies' : 'y'})${nl}`;
            out += rule() + nl;
            injData.forEach(e => {
                out += `${e.date}  |  ${e.customName || 'Injectable'}`;
                if (e.dose)          out += `  |  ${e.dose}`;
                if (e.intervalLabel || e.intervalDays) out += `  |  ${e.intervalLabel || (e.intervalDays + 'd')}`;
                if (e.nextDueDate)   out += `  |  Next due: ${e.nextDueDate}`;
                if (e.batchNumber)    out += `${nl}${indent}Batch: ${e.batchNumber}`;
                if (e.administeredBy) out += `${e.batchNumber ? '  |  ' : nl + indent}Given by: ${e.administeredBy}`;
                if (e.notes)          out += `${nl}${indent}Notes: ${e.notes}`;
                out += nl;
            });
            out += nl;
        }
    }

    // ── Diagnosis & Staging (ALWAYS full history — no date filter) ─────────
    if (mods.acvimStaging) {
        const diagData = this.diagnosisLog
            .filter(d => d.patientId === this.activePatientId)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
        if (diagData.length > 0) {
            out += `DIAGNOSIS & STAGING LOG (${diagData.length} entr${diagData.length !== 1 ? 'ies' : 'y'}) — Complete History${nl}`;
            out += rule() + nl;
            diagData.forEach(d => {
                const diagName = this.diagDisplayName(d);                                 // was: d.diagnosis === 'Other' ? ...
                out += `${d.date}  |  ${diagName}`;
                if (d.acvimStage && d.acvimStage !== 'N/A') out += `  |  ACVIM: ${d.acvimStage}`;
                if (d.murmurGrade && d.murmurGrade !== 'N/A') out += `  |  Murmur: ${d.murmurGrade}`;
                // Only print a separate "Concurrent:" line for CARDIAC rows that (legacy) still carry a list.
                if (d.diagnosis !== 'Concurrent Conditions Only' && (d.concurrentDiagnoses || []).length > 0)
                    out += `${nl}${indent}Concurrent: ${d.concurrentDiagnoses.join(', ')}`;
                if (d.notes) out += `${nl}${indent}Notes: ${d.notes}`;
                out += nl;
            });
            out += nl;
        }
    }

    // ── Blood Test Results (ALWAYS full history — no date filter) ─────────
    {
        const bloodData = this.patientBloodResults();
        if (bloodData.length > 0) {
            out += `BLOOD TEST RESULTS (${bloodData.length} result${bloodData.length !== 1 ? 's' : ''})${nl}`;
            out += rule() + nl;
            bloodData.forEach(b => {
                const st = this.bloodStatus(b);
                out += `${b.sampleDate}  |  ${this.bloodDisplayName(b)}: ${this.trimBloodNumber(b.value)}`;
                if (b.unit) out += ` ${b.unit}`;
                const ref = this.bloodRefText(b);
                if (ref) out += `  |  Lab range: ${ref}`;
                if (st !== 'unknown') out += `  |  ${this.bloodStatusShort(st)}`;
                if (b.labName) out += `  |  ${b.labName}`;
                if (b.notes) out += `${nl}${indent}Notes: ${b.notes}`;
                out += nl;
            });
            out += nl;
        }
    }

    // ── Surgeries & Procedures (ALWAYS full history — no date filter) ─────
    {
        const procData = this.scheduledProcedures().concat(this.completedProcedures());
        if (procData.length > 0) {
            const species = this.activePatient?.species;
            out += `SURGERIES & PROCEDURES (${procData.length} procedure${procData.length !== 1 ? 's' : ''})${nl}`;
            out += rule() + nl;
            procData.forEach(pr => {
                // SCHEDULED is stated before the procedure name, so a booking can never be
                // skim-read as something the pet has already been through.
                out += `${pr.date}  |  ${pr.status === 'scheduled' ? 'SCHEDULED' : 'COMPLETED'}  |  ${this.procedureTitle(pr)}`;
                const area = this.procedureAreaLabel(pr.area);
                if (area) out += `  |  ${area}`;
                if (pr.performedBy) out += `  |  ${pr.performedBy}`;
                const ga = this.procedureAnaestheticLine(pr);
                if (ga) out += `${nl}${indent}${ga}`;
                this.extractionLines(pr.extractions, species).forEach(line => {
                    out += `${nl}${indent}${line}`;
                });
                const histo = this.procedureHistopathLine(pr);
                if (histo) {
                    out += `${nl}${indent}${histo}`;
                    if (pr.histopathDate) out += ` (${pr.histopathDate})`;
                }
                if (pr.notes) out += `${nl}${indent}Notes: ${pr.notes}`;
                out += nl;
            });
            out += nl;
        }
    }

    // ── Appointments (ALWAYS full history — no date filter) ───────────────
    {
        const apptData = this.upcomingAppointments().concat(this.appointmentHistory());
        if (apptData.length > 0) {
            out += `APPOINTMENTS (${apptData.length} appointment${apptData.length !== 1 ? 's' : ''}) — Complete History${nl}`;
            out += rule() + nl;
            apptData.forEach(a => {
                // The status is stated before the reader takes in what the appointment was, so a
                // booking never reads as a visit that happened and a cancellation never reads as
                // care that was given.
                out += a.date;
                if (a.time) out += ` ${a.time}`;
                out += `  |  ${this.appointmentStatusLabel(a.status).toUpperCase()}  |  ${this.appointmentTitle(a)}`;
                const place = this.appointmentPlaceName(a);
                if (place) out += `  |  ${place}`;
                const address = this.appointmentAddressOneLine(a);
                if (address) out += `${nl}${indent}${address}`;
                if (a.outcome) out += `${nl}${indent}Outcome: ${a.outcome}`;
                if (a.notes)   out += `${nl}${indent}Notes: ${a.notes}`;
                out += nl;
            });
            out += nl;
        }
    }

    // ── Syncope / Collapse Log ────────────────────────────────────────────
    if (mods.syncopeLog) {
        const syncData = this.syncopeLog
            .filter(s => s.patientId === this.activePatientId && inRange(s.date))
            .sort((a, b) => new Date(b.date) - new Date(a.date));
        if (syncData.length > 0) {
            out += `SYNCOPE / COLLAPSE LOG (${syncData.length} event${syncData.length !== 1 ? 's' : ''})${nl}`;
            out += rule() + nl;
            syncData.forEach(s => {
                out += `${s.date} ${s.time || ''}  |  ${s.type || 'Episode'}`;
                if (s.duration)       out += `  |  Duration: ${s.duration}`;
                if (s.loc)            out += `  |  LOC: ${s.loc}`;
                if (s.muscleTone)     out += `  |  Tone: ${s.muscleTone}`;
                if (s.activityBefore) out += `${nl}${indent}Before: ${s.activityBefore}`;
                if (s.notes)          out += `${nl}${indent}Notes: ${s.notes}`;
                out += nl;
            });
            out += nl;
        }
    }

    // ── Cough Log ─────────────────────────────────────────────────────────
    if (mods.coughLog) {
        const coughData = this.coughLog
            .filter(c => c.patientId === this.activePatientId && inRange(c.date))
            .sort((a, b) => new Date(b.date) - new Date(a.date));
        if (coughData.length > 0) {
            out += `COUGH LOG (${coughData.length} entr${coughData.length !== 1 ? 'ies' : 'y'})${nl}`;
            out += rule() + nl;
            coughData.forEach(c => {
                out += `${c.date}  |  ${c.severity || ''}`;
                if (c.frequencyCount) out += `  |  ${c.frequencyCount}x/${c.frequencyPeriod}`;
                if (c.description)    out += `  |  ${c.description}`;
                if (c.context)        out += `  |  ${c.context}`;
                if (c.notes)          out += `${nl}${indent}Notes: ${c.notes}`;
                out += nl;
            });
            out += nl;
        }
    }

    // ── Activity Log ──────────────────────────────────────────────────────
    if (mods.activityLog) {
        const actData = this.activityLog
            .filter(a => a.patientId === this.activePatientId && inRange(a.date))
            .sort((a, b) => new Date(b.date) - new Date(a.date));
        if (actData.length > 0) {
            out += `ACTIVITY LOG (${actData.length} entr${actData.length !== 1 ? 'ies' : 'y'})${nl}`;
            out += rule() + nl;
            actData.forEach(a => {
                out += `${a.date}  |  ${a.status || ''}`;
                if (a.durationMins) out += `  |  ${a.durationMins}m`;
                if (a.distanceValue !== '' && a.distanceValue != null)
                    out += `  |  ${a.distanceValue} ${this.distanceLabel(a.distanceUnit || this.appSettings.distanceUnit)}`;
                if (a.notes)        out += `${nl}${indent}Notes: ${a.notes}`;
                out += nl;
            });
            out += nl;
        }
    }

    // ── Weight & Diet Log ─────────────────────────────────────────────────
    if (mods.weightDiet) {
        const weightData = this.weightLog
            .filter(w => w.patientId === this.activePatientId && inRange(w.date))
            .sort((a, b) => new Date(b.date) - new Date(a.date));
        if (weightData.length > 0) {
            const wUnit = profile.weightUnit || 'kg';
            out += `WEIGHT & DIET LOG (${weightData.length} entr${weightData.length !== 1 ? 'ies' : 'y'})${nl}`;
            out += rule() + nl;
            weightData.forEach(w => {
                const dateStr = (w.date || '').split('T')[0];
                out += `${dateStr}`;
                if (w.weightValue != null) out += `  |  ${w.weightValue} ${wUnit}`;
                if (w.appetite && w.appetite !== 'Normal') out += `  |  Appetite: ${w.appetite}`;
                if (w.foodBrand) out += `  |  ${w.foodBrand}`;
                if (w.portionSize) out += `  |  ${w.portionSize}`;
                if (w.supplements) out += `${nl}${indent}Supplements: ${w.supplements}`;
                if (w.notes) out += `${nl}${indent}Notes: ${w.notes}`;
                out += nl;
            });
            out += nl;
        }
    }

    // ── Vaccination Log (ALWAYS full history — no date filter) ────────────
    if (mods.vaccinations) {
        const vaccData = this.vaccinationLog
            .filter(v => v.patientId === this.activePatientId)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
        if (vaccData.length > 0) {
            out += `VACCINATION LOG (${vaccData.length} record${vaccData.length !== 1 ? 's' : ''}) — Complete History${nl}`;
            out += rule() + nl;
            vaccData.forEach(v => {
                out += `${v.date}  |  ${v.type || v.vaccineId || 'Unknown'}`;
                if (v.batchNumber)    out += `  |  Batch: ${v.batchNumber}`;
                if (v.administeredBy) out += `  |  By: ${v.administeredBy}`;
                if (v.nextDueDate)    out += `  |  Next due: ${v.nextDueDate}`;
                if ((v.additionals || []).length > 0) {
                    out += `${nl}${indent}Also given: ${v.additionals.map(a => `${a.label}${a.nextDueDate ? ' (due ' + a.nextDueDate + ')' : ''}`).join(', ')}`;
                }
                if (v.notes) out += `${nl}${indent}Notes: ${v.notes}`;
                out += nl;
            });
            out += nl;
        }
    }

    // ── Antiparasitic Log ────────────────────────────────────────────────
    if (mods.antiparasitics) {
        const apData = this.antiparasiticLog
            .filter(a => a.patientId === this.activePatientId && inRange(a.date))
            .sort((a, b) => new Date(b.date) - new Date(a.date));
        if (apData.length > 0) {
            out += `ANTIPARASITIC LOG (${apData.length} entr${apData.length !== 1 ? 'ies' : 'y'})${nl}`;
            out += rule() + nl;
            apData.forEach(a => {
                out += `${a.date}  |  ${a.productLabel || a.productId || 'Unknown product'}`;
                if (a.intervalLabel) out += `  |  ${a.intervalLabel}`;
                if (a.nextDueDate)   out += `  |  Next due: ${a.nextDueDate}`;
                if ((a.covers || []).length > 0) {
                    out += `${nl}${indent}Covers: ${a.covers.map(cid => PARASITE_TARGETS.find(t => t.id === cid)?.label || cid).join(', ')}`;
                }
                if (a.notes) out += `${nl}${indent}Notes: ${a.notes}`;
                out += nl;
            });
            out += nl;
        }
    }

    // ── Skin & itch ────────────────────────────────────────────────────────
    if (mods.skinLog) {
        const skinAll = this.patientSkinLog();
        const skinData = skinAll.filter(e => inRange(e.date))
            .sort((a, b) => (b.date || '').localeCompare(a.date || ''));
        if (skinData.length > 0) {
            out += `SKIN & ITCH LOG (${skinData.length} day${skinData.length !== 1 ? 's' : ''})${nl}`;
            out += rule() + nl;
            skinData.forEach(e => {
                out += `${e.date}  |  ${this.skinScoreText(e)}`;
                const sites = this.skinSiteList(e.sites);
                if (sites) out += `  |  ${sites}`;
                if (this.skinEarRank(e.earStatus) > 0) out += `  |  Ears: ${this.skinEarLabel(e.earStatus)}`;
                const given = this.skinTreatmentList((e.treatments || []).filter(t => t !== 'none'));
                if (given) out += `${nl}${indent}Given: ${given}`;
                if (e.vetVisit) out += `${nl}${indent}Seen by a vet about the skin on this day`;
                if (e.notes) out += `${nl}${indent}Notes: ${e.notes}`;
                out += nl;
            });
            out += nl;
        }
        // The pattern block spans everything ever logged, not the report window — see the CSV.
        if (skinAll.length > 0) {
            const pattern = this.skinSeasonalPattern(skinAll);
            out += `SKIN — YEARLY PATTERN${nl}`;
            out += rule() + nl;
            out += `${pattern.headline}${nl}`;
            out += `${indent}${pattern.detail}${nl}`;
            const ears = this.skinEarSummary(skinAll);
            if (ears) out += `${indent}${ears}${nl}`;
            this.skinTreatmentDays(skinAll).forEach(t => {
                out += `${indent}${this.skinTreatmentLabel(t.treatment)} — ${t.days} day${t.days === 1 ? '' : 's'}${nl}`;
            });
            out += nl;
        }
    }

    // ── Lumps (never date-filtered — see the CSV export) ───────────────────
    if (mods.lumps) {
        const lumps = this.sortedLumps;
        if (lumps.length > 0) {
            out += `LUMPS (${lumps.length})${nl}`;
            out += rule() + nl;
            lumps.forEach(l => {
                out += `${this.lumpDisplayName(l)}`;
                const location = this.lumpLocationLine(l);
                if (location) out += `  |  ${location}`;
                out += `  |  ${this.lumpStatusLabel(l.status)}  |  ${this.lumpVetStageLabel(l.vetStage)}${nl}`;
                if (l.firstNoticed) out += `${indent}First noticed: ${this.allergyDayText(l.firstNoticed)}${nl}`;
                out += `${indent}${this.lumpChangeSummary(l)}${nl}`;
                this.lumpMeasurementsFor(l.id).forEach(m => {
                    out += `${indent}${this.allergyDayText(m.date)} — ${this.lumpSizeText(m)}`;
                    if ((m.signs || []).length) out += ` — ${this.lumpSignList(m.signs)}`;
                    out += nl;
                });
                if (l.vetDiagnosis) out += `${indent}Vet's note: ${l.vetDiagnosis}${nl}`;
                this.lumpPrompts(l).filter(pr => pr.clinical).forEach(pr => {
                    out += `${indent}To raise: ${pr.text}${nl}`;
                });
                if (l.notes) out += `${indent}Notes: ${l.notes}${nl}`;
                out += nl;
            });
            // Unconditional. An empty "to raise" list is not a verdict.
            out += `${indent}${LUMP_STANDING_NOTE}${nl}${nl}`;
        }
    }

    // ── Lameness & Joints ─────────────────────────────────────────────────
    // NOT date-filtered, for the same reason lumps are not. Every sentence here is a statement
    // about the RECORD — see the safety rule in the ORTHO_* block near the top of this file.
    if (mods.ortho) {
        const conditions = this.sortedOrthoConditions;
        if (conditions.length > 0) {
            out += `LAMENESS & JOINTS (${conditions.length})${nl}`;
            out += rule() + nl;
            conditions.forEach(c => {
                const name = this.orthoDisplayName(c);
                out += name;
                // Only when the name is NOT already the legs — an unnamed condition falls back to
                // them, and repeating them reads as two different problems on one line.
                const legs = this.orthoLegList(c.legs);
                if (legs && legs !== name) out += `  |  ${legs}`;
                out += `  |  ${this.orthoStatusLabel(c.status)}  |  ${this.orthoChronicityLabel(c.chronicity)}`;
                out += `  |  ${this.orthoVetStageLabel(c.vetStage)}${nl}`;
                if (c.firstNoticed) out += `${indent}First noticed: ${this.allergyDayText(c.firstNoticed)}${nl}`;
                // Worded as what the owner was TOLD, never as the app's conclusion.
                if (c.suspectedCause && c.suspectedCause !== 'unknown') {
                    out += `${indent}Recorded as: ${this.orthoCauseLabel(c.suspectedCause)}${nl}`;
                }
                if (c.vetDiagnosis) out += `${indent}Vet's note: ${c.vetDiagnosis}${nl}`;
                out += `${indent}${this.orthoRecentRead(c.id).text}${nl}`;
                if (c.painReliefPlan) out += `${indent}Pain relief plan: ${c.painReliefPlan}${nl}`;
                if ((c.management || []).length) {
                    out += `${indent}Also: ${this.orthoManagementList(c.management)}${nl}`;
                }
                this.orthoEntriesFor(c.id).forEach(e => {
                    out += `${indent}${this.orthoEntryReportLine(e)}${nl}`;
                });
                if (c.notes) out += `${indent}Notes: ${c.notes}${nl}`;
                out += nl;
            });
            // Unconditional. A table of scores with no flag on it is not a statement that the
            // animal is comfortable.
            out += `${indent}${ORTHO_STANDING_NOTE}${nl}${nl}`;
        }
    }

    // ── Parasite Coverage Gaps (current snapshot) ──────────────────────────
    if (mods.antiparasitics) {
        const gaps = this.parasiticCoverageGaps().filter(g => g.state !== 'covered');
        if (gaps.length > 0) {
            out += `PARASITE COVERAGE GAPS (current)${nl}`;
            out += rule() + nl;
            gaps.forEach(g => {
                out += `${g.label}: ${g.state}${g.cardiac ? '  [cardiac-relevant]' : ''}${nl}`;
            });
            out += nl;
        }
    }

    return out;
},


copyToClipboard() {
    const out = this._buildReportText();
    if (!out.trim()) return alert("No data to copy for this patient in the selected date range.");

    navigator.clipboard.writeText(out)
        .then(() => alert("Clinical report copied to clipboard."))
        .catch(err => {
            console.error("VCH clipboard error:", err);
            alert("Failed to copy to clipboard — check browser permissions.");
        });
},

async shareReport() {
    if (!this.activePatientId) return;
    const out = this._buildReportText();
    if (!out.trim()) return alert("No data to share for this patient in the selected date range.");

    const profile = this.activePatientProfile;

    if (navigator.share) {
        try {
            await navigator.share({
                title: `${this.toTitleCase(profile.name)} — VetCardioHub Clinical Report`,
                text: out,
                url: 'https://vetcardiohub.com/health-tracker'
            });
        } catch (e) {
            // User cancelled the share sheet — no action needed
        }
    } else {
        // Fallback for desktop browsers without Web Share API
        navigator.clipboard.writeText(out)
            .then(() => alert("Full clinical report copied to clipboard (share sheet not available on this browser)."))
            .catch(() => alert("Failed to copy to clipboard — check browser permissions."));
    }
},

emailReportTo(provider) {
    const pet = this.activePatientProfile?.name || 'my pet';
    const subject = `${pet} — VetCardioHub health report`;
    const body =
`Dear ${provider.name || 'Dr'},

Please find a home-monitoring health report for ${pet}, generated with the VetCardioHub Vitals app.

${this._buildReportText()}

Kind regards,
${this.activePatientProfile?.ownerName || ''}

—
This report summarises observations recorded at home by the owner and is intended to support, not replace, veterinary assessment.`;
    window.location.href = `mailto:${encodeURIComponent(provider.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
},
        
        exportPDF() {
            // Web-native PDF generation using the browser's print dialog.
            // Much lighter than adding jsPDF to the clinical stack.
            window.print(); 
        }
    }));
});