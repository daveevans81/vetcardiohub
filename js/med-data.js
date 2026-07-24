//  med-data.js 

// ── Clinical data review date ─────────────────────────────────────────────
// Bump whenever the medication formulary, vaccine catalogue, or antiparasitic
// product data is reviewed against current licensed-product information.
const VCH_FORMULARY_REVIEWED = '2026-07-23';

const INJECTABLE_FORMULARY = {
  cytopoint: {
    id: 'cytopoint', brand: 'Cytopoint', generic: 'Lokivetmab',
    species: ['dog'], intervalDays: 30, intervalLabel: 'Monthly',
    class: 'Anti-IL-31 monoclonal antibody', indication: 'Atopic dermatitis / itch',
    note: 'Interval may extend to 4–8 weeks in some dogs based on response.'
  },
  librela: {
    id: 'librela', brand: 'Librela', generic: 'Bedinvetmab',
    species: ['dog'], intervalDays: 28, intervalLabel: 'Monthly',
    class: 'Anti-NGF monoclonal antibody', indication: 'Osteoarthritis pain'
  },
  solensia: {
    id: 'solensia', brand: 'Solensia', generic: 'Frunevetmab',
    species: ['cat'], intervalDays: 28, intervalLabel: 'Monthly',
    class: 'Anti-NGF monoclonal antibody', indication: 'Osteoarthritis pain'
  },
  // Candidates to consider: adequan/cartrophen (polysulfated GAG courses),
  // methylprednisolone depot, B12/cobalamin, lantus/insulin is NOT monthly (exclude),
  // recuvyra/long-acting analgesics — vet review each interval before listing.
};

const VET_FORMULARY = {
    // --- DIURETICS (Blues) ---
    furosemide: { id: 'furosemide', generic: 'Furosemide', brands: ['Lasix', 'Salix', 'Dimazon', 'Libeo', 'Frusedale', 'Frusol'], classes: ['Loop Diuretic'], color: '#3b82f6' },
    torasemide: { id: 'torasemide', generic: 'Torasemide', brands: ['UpCard', 'Isemid', 'Demadex'], classes: ['Loop Diuretic'], color: '#2563eb' },
    
    // --- INODILATORS (Reds) ---
    pimobendan: { id: 'pimobendan', generic: 'Pimobendan', brands: ['Vetmedin', 'Cardisure', 'Zelys'], classes: ['Inodilator'], color: '#ef4444' },
    
    // --- RAAS SYSTEM (Purples) ---
    cardalis:   { id: 'cardalis', generic: 'Spironolactone + Benazepril', brands: ['Cardalis'], classes: ['ACE-i', 'Aldosterone Antagonist'], color: '#8b5cf6' },
    benazepril: { id: 'benazepril', generic: 'Benazepril', brands: ['Lotensin', 'Nelio', 'Fortekor', 'Benefortin'],  classes: ['ACE-i'], color: '#8b5cf6'},
    enalapril:  { id: 'enalapril', generic: 'Enalapril', brands: ['Enacard', 'Vasotec'], classes: ['ACE-i'], color: '#8b5cf6'},
    prilactone: { id: 'prilactone', generic: 'Spironolactone', brands: ['Prilactone', 'Aldactone'], classes: ['Aldosterone Antagonist'], color: '#a855f7' },
    
    // --- ANTI-THROMBOTICS (Ambers) ---
    clopidogrel:{ id: 'clopidogrel', generic: 'Clopidogrel', brands: ['Plavix'],  classes: ['Anti-thrombotic'], color: '#f59e0b'},
    rivaroxaban:{ id: 'rivaroxaban', generic: 'Rivaroxaban', brands: ['Xarelto'],  classes: ['Anti-thrombotic'], color: '#f59e0b'},
    
    // --- ANTI-ARRHYTHMICS (Greens) ---
    diltiazem:  { id: 'diltiazem', generic: 'Diltiazem', brands: ['Cardizem', 'Hypercard', 'Dilacor'], classes: ['Calcium Channel Blocker', 'Anti-arrhythmic'], color: '#10b981' },
    digoxin:    { id: 'digoxin', generic: 'Digoxin', brands: ['Lanoxin', 'Cardoxin'], classes: ['Cardiac Glycoside', 'Anti-arrhythmic'], color: '#059669' },
    sotalol:    { id: 'sotalol', generic: 'Sotalol', brands: ['Betapace'], classes: ['Beta Blocker', 'Anti-arrhythmic'], color: '#34d399' },

    // --- VASODILATORS & BP (Pinks) ---
    amlodipine: { id: 'amlodipine', generic: 'Amlodipine', brands: ['Norvasc', 'Amodip'], classes: ['Calcium Channel Blocker', 'Vasodilator'], color: '#ec4899' },
    sildenafil: { id: 'sildenafil', generic: 'Sildenafil', brands: ['Viagra', 'Revatio'], classes: ['PDE5 Inhibitor', 'Vasodilator'], color: '#f43f5e' },

    // --- FALLBACK (Slate) ---
    other:      { id: 'other', generic: 'Custom Medication', brands: [], classes: ['Other/Unspecified'], color: '#64748b' }
};


const VACCINE_CATALOGUE = {
    dog: {
        combis: [
            {
                id: 'DHP', shortLabel: 'DHP',
                label: 'DHP — Distemper, Hepatitis, Parvovirus',
                components: ['Canine Distemper (CDV)', 'Infectious Hepatitis (CAV)', 'Parvovirus (CPV)'],
                wsavaClass: 'core', firstBoosterDays: 365, subsequentDays: 1095,
                suggestedAddons: [
                    { id: 'Leptospirosis', label: 'Leptospirosis (L2/L4)',
                      note: 'Annual — endemic in UK, routinely given with DHP',
                      firstBoosterDays: 365, subsequentDays: 365 },
                    { id: 'Bordetella', label: 'Bordetella / Kennel Cough (KC)',
                      note: 'Annual or 6-monthly for boarding/kennel-risk dogs',
                      firstBoosterDays: 365, subsequentDays: 365 },
                    { id: 'Rabies', label: 'Rabies',
                      note: 'Required for travel — interval varies by product and jurisdiction',
                      firstBoosterDays: 365, subsequentDays: 365 }
                ]
            },
            {
                id: 'DHPPi', shortLabel: 'DHPPi',
                label: 'DHPPi — Distemper, Hepatitis, Parvovirus, Parainfluenza',
                components: ['Canine Distemper (CDV)', 'Infectious Hepatitis (CAV)', 'Parvovirus (CPV)', 'Parainfluenza (CPiV)'],
                wsavaClass: 'core', firstBoosterDays: 365, subsequentDays: 1095,
                suggestedAddons: [
                    { id: 'Leptospirosis', label: 'Leptospirosis (L2/L4)',
                      note: 'Annual — commonly given alongside DHPPi',
                      firstBoosterDays: 365, subsequentDays: 365 },
                    { id: 'Bordetella', label: 'Bordetella / Kennel Cough (KC)',
                      note: 'Annual or 6-monthly for high-risk dogs',
                      firstBoosterDays: 365, subsequentDays: 365 },
                    { id: 'Rabies', label: 'Rabies',
                      note: 'Required for travel — interval varies by product and jurisdiction',
                      firstBoosterDays: 365, subsequentDays: 365 }
                ]
            }
        ],
        nonCore: [
            { id: 'Leptospirosis', label: 'Leptospirosis (L2/L4)', wsavaClass: 'non-core',
              note: 'Annual — high disease pressure in UK; L4 products cover more serovars',
              firstBoosterDays: 365, subsequentDays: 365 },
            { id: 'Bordetella', label: 'Bordetella / Kennel Cough (KC)', wsavaClass: 'non-core',
              note: 'Annual or 6-monthly for boarding/kennel dogs',
              firstBoosterDays: 365, subsequentDays: 365 },
            { id: 'Parainfluenza', label: 'Parainfluenza (CPiV) — standalone', wsavaClass: 'non-core',
              note: 'Annual — often combined in KC protocol; consider DHPPi if also boosting core',
              firstBoosterDays: 365, subsequentDays: 365 },
            { id: 'Rabies', label: 'Rabies', wsavaClass: 'non-core-regional',
              note: 'Required for travel — interval per product licence and destination requirements',
              firstBoosterDays: 365, subsequentDays: 365 }
        ],
        individual: [
            { id: 'CDV', label: 'Distemper (CDV) — monovalent', wsavaClass: 'core',
              note: 'Triennial after primary series — use when sensitivity to other components',
              firstBoosterDays: 1095, subsequentDays: 1095 },
            { id: 'CAV', label: 'Hepatitis / Adenovirus (CAV) — monovalent', wsavaClass: 'core',
              note: 'Triennial after primary series',
              firstBoosterDays: 1095, subsequentDays: 1095 },
            { id: 'CPV', label: 'Parvovirus (CPV) — monovalent', wsavaClass: 'core',
              note: 'Triennial after primary series — consider serological testing in adults',
              firstBoosterDays: 1095, subsequentDays: 1095 }
        ]
    },
    cat: {
        combis: [
            {
                id: 'RCP', shortLabel: 'RCP',
                label: 'RCP — Rhinotracheitis (FHV-1), Calicivirus, Panleukopenia',
                components: ['Feline Herpesvirus / Rhinotracheitis (FHV-1)', 'Calicivirus (FCV)', 'Panleukopenia (FPV)'],
                wsavaClass: 'core', firstBoosterDays: 365, subsequentDays: 1095,
                suggestedAddons: [
                    { id: 'FeLV', label: 'Feline Leukaemia (FeLV)',
                      note: 'Annual — strongly recommended for outdoor or multi-cat household cats',
                      firstBoosterDays: 365, subsequentDays: 365 },
                    { id: 'Chlamydia felis', label: 'Chlamydia felis',
                      note: 'Annual — indicated in multi-cat environments with conjunctivitis/respiratory signs',
                      firstBoosterDays: 365, subsequentDays: 365 },
                    { id: 'Rabies', label: 'Rabies',
                      note: 'Required for travel — interval varies by product and jurisdiction',
                      firstBoosterDays: 365, subsequentDays: 365 }
                ]
            }
        ],
        nonCore: [
            { id: 'FeLV', label: 'Feline Leukaemia (FeLV)', wsavaClass: 'non-core',
              note: 'Annual — risk-based; outdoor access or multi-cat household exposure',
              firstBoosterDays: 365, subsequentDays: 365 },
            { id: 'Chlamydia felis', label: 'Chlamydia felis', wsavaClass: 'non-core',
              note: 'Annual — multi-cat households with chronic ocular/respiratory signs',
              firstBoosterDays: 365, subsequentDays: 365 },
            { id: 'Rabies', label: 'Rabies', wsavaClass: 'non-core-regional',
              note: 'Required for travel — interval per product licence and destination',
              firstBoosterDays: 365, subsequentDays: 365 }
        ],
        individual: [
            { id: 'FHV-1', label: 'Herpesvirus / Rhinotracheitis (FHV-1) — monovalent', wsavaClass: 'core',
              note: 'Triennial after primary series',
              firstBoosterDays: 1095, subsequentDays: 1095 },
            { id: 'FCV', label: 'Calicivirus (FCV) — monovalent', wsavaClass: 'core',
              note: 'Triennial after primary series',
              firstBoosterDays: 1095, subsequentDays: 1095 },
            { id: 'FPV', label: 'Panleukopenia (FPV) — monovalent', wsavaClass: 'core',
              note: 'Triennial after primary series — consider serological testing in adults',
              firstBoosterDays: 1095, subsequentDays: 1095 }
        ]
    }
};

/* ============================================================================
   ANTIPARASITIC MODULE DATA
   - PARASITE_TARGETS          : the 9 trackable parasites (matrix columns)
   - PARASITE_REGION_DEFAULTS  : seeded priority sets per region
   - ANTIPARASITIC_FORMULARY   : product catalogue + coverage matrix
   Coverage model: `covers` = full label claim; `partial` = treats/controls
   only or limited spectrum (engine flags these with a caveat).
   ⚠ Coverage cells are a clinical seed — verify against current SPCs pre-release.
   ============================================================================ */

const PARASITE_TARGETS = [
    { id: 'fleas',     label: 'Fleas',                 short: 'Fleas', category: 'ecto',            cardiac: false, glossaryKey: 'parasite_fleas',
      note: '' },
    { id: 'ticks',     label: 'Ticks',                 short: 'Ticks', category: 'ecto',            cardiac: false, glossaryKey: 'parasite_ticks',
      note: 'Vector for Lyme, babesiosis, ehrlichiosis, anaplasmosis.' },
    { id: 'roundworm', label: 'Roundworm (ascarids)',  short: 'Round', category: 'endo',            cardiac: false, glossaryKey: 'parasite_roundworm',
      note: 'Zoonotic (Toxocara).' },
    { id: 'hookworm',  label: 'Hookworm',              short: 'Hook',  category: 'endo',            cardiac: false, glossaryKey: 'parasite_hookworm',
      note: 'Zoonotic.' },
    { id: 'whipworm',  label: 'Whipworm',              short: 'Whip',  category: 'endo',            cardiac: false, glossaryKey: 'parasite_whipworm' },
    { id: 'tapeworm',  label: 'Tapeworm',              short: 'Tape',  category: 'endo',            cardiac: false, glossaryKey: 'parasite_tapeworm' },
    { id: 'lungworm',  label: 'Lungworm (A. vasorum)', short: 'Lung',  category: 'cardiopulmonary', cardiac: true,  glossaryKey: 'lungworm_av',
      note: 'Raises respiratory rate & cough — can mimic or mask cardiac decline.' },
    { id: 'heartworm', label: 'Heartworm (D. immitis)', short: 'Heart', category: 'cardiopulmonary', cardiac: true, glossaryKey: 'heartworm_dirofilaria',
      note: 'Pulmonary hypertension & right-heart disease. Endemic in mainland Europe & US, not the UK.' },
    { id: 'mites',     label: 'Mites (ear / mange)',   short: 'Mites', category: 'ecto',            cardiac: false, glossaryKey: 'parasite_mites' }
];

const PARASITE_REGION_DEFAULTS = {
    uk: {
        label: 'United Kingdom & Ireland',
        priorities: ['fleas', 'ticks', 'roundworm', 'tapeworm', 'lungworm'],
        travelAdds: ['heartworm'],
        note: 'Heartworm is not endemic in the UK but becomes essential on travel to southern/eastern Europe.'
    },
    europe: {
        label: 'Continental Europe',
        priorities: ['fleas', 'ticks', 'roundworm', 'tapeworm', 'lungworm', 'heartworm'],
        travelAdds: [],
        note: 'Heartworm endemic across southern & eastern Europe. In sandfly regions, prioritise a repellent product (collar / pyrethroid spot-on) for leishmaniasis vector control.'
    },
    us: {
        label: 'United States & Canada',
        priorities: ['fleas', 'ticks', 'roundworm', 'hookworm', 'whipworm', 'tapeworm', 'heartworm'],
        travelAdds: [],
        note: 'CAPC/AHS advise year-round heartworm + broad-spectrum control. A. vasorum lungworm is not endemic (US lungworm species differ).'
    },
    asia:    { label: 'Asia',                priorities: [], travelAdds: [],
           note: 'Highly variable by country — build the plan manually with local veterinary advice.' },
    oceania: { label: 'Oceania',             priorities: [], travelAdds: [],
           note: 'Regionally specific risks (e.g. Australian paralysis tick, Spirometra) — confirm locally before seeding.' },
    row:     { label: 'Other / Rest of world', priorities: [], travelAdds: [],
           note: 'No seeded defaults — use manual toggles and custom parasites.' }
};

const ANTIPARASITIC_FORMULARY = {

    /* ---- BROAD-SPECTRUM (ecto + endo endectocides) ---- */
    advocate: {
        id: 'advocate', brand: 'Advocate / Advantage Multi', generic: 'Imidacloprid + Moxidectin',
        species: 'both', form: 'spot-on', group: 'broad',
        covers: ['fleas', 'roundworm', 'hookworm', 'lungworm', 'heartworm', 'mites'], partial: [],
        intervalDays: 30, intervalLabel: 'Monthly', prescription: true,
        regions: ['uk', 'europe', 'us'], color: '#6366f1',
        note: 'No tick or tapeworm cover. Prinovox is the generic equivalent.'
    },
    nexgard_spectra: {
        id: 'nexgard_spectra', brand: 'NexGard Spectra', generic: 'Afoxolaner + Milbemycin oxime',
        species: 'dog', form: 'oral', group: 'broad',
        covers: ['fleas', 'ticks', 'roundworm', 'hookworm', 'whipworm', 'lungworm', 'heartworm'], partial: [],
        intervalDays: 30, intervalLabel: 'Monthly', prescription: true,
        regions: ['uk', 'europe'], color: '#6366f1', note: 'No tapeworm cover.'
    },
    nexgard_combo: {
        id: 'nexgard_combo', brand: 'NexGard Combo', generic: 'Esafoxolaner + Eprinomectin + Praziquantel',
        species: 'cat', form: 'spot-on', group: 'broad',
        covers: ['fleas', 'ticks', 'roundworm', 'hookworm', 'tapeworm', 'lungworm', 'heartworm'], partial: [],
        intervalDays: 30, intervalLabel: 'Monthly', prescription: true,
        regions: ['uk', 'europe', 'us'], color: '#6366f1', note: 'Broad-spectrum feline spot-on.'
    },
    simparica_trio: {
        id: 'simparica_trio', brand: 'Simparica Trio', generic: 'Sarolaner + Moxidectin + Pyrantel',
        species: 'dog', form: 'oral', group: 'broad',
        covers: ['fleas', 'ticks', 'roundworm', 'hookworm', 'lungworm', 'heartworm'], partial: [],
        intervalDays: 30, intervalLabel: 'Monthly', prescription: true,
        regions: ['uk', 'europe', 'us'], color: '#6366f1',
        note: 'EU label includes A. vasorum; no tapeworm cover.'
    },
    credelio_plus: {
        id: 'credelio_plus', brand: 'Credelio Plus', generic: 'Lotilaner + Milbemycin oxime',
        species: 'dog', form: 'oral', group: 'broad',
        covers: ['fleas', 'ticks', 'roundworm', 'hookworm', 'whipworm', 'lungworm', 'heartworm'], partial: [],
        intervalDays: 30, intervalLabel: 'Monthly', prescription: true,
        regions: ['uk', 'europe'], color: '#6366f1', note: 'No tapeworm cover.'
    },
    credelio_quattro: {
        id: 'credelio_quattro', brand: 'Credelio Quattro', generic: 'Lotilaner + Moxidectin + Praziquantel + Pyrantel',
        species: 'dog', form: 'oral', group: 'broad',
        covers: ['fleas', 'ticks', 'roundworm', 'hookworm', 'tapeworm', 'heartworm'], partial: [],
        intervalDays: 30, intervalLabel: 'Monthly', prescription: true,
        regions: ['us'], color: '#6366f1', note: '6-in-1 chewable. No labelled A. vasorum lungworm claim.'
    },
    broadline: {
        id: 'broadline', brand: 'Broadline', generic: 'Fipronil + (S)-methoprene + Eprinomectin + Praziquantel',
        species: 'cat', form: 'spot-on', group: 'broad',
        covers: ['fleas', 'ticks', 'roundworm', 'hookworm', 'tapeworm', 'lungworm', 'heartworm'], partial: [],
        intervalDays: 30, intervalLabel: 'Monthly', prescription: true,
        regions: ['uk', 'europe'], color: '#6366f1', note: 'Broad-spectrum feline spot-on.'
    },
    felpreva: {
        id: 'felpreva', brand: 'Felpreva', generic: 'Tigolaner + Emodepside + Praziquantel',
        species: 'cat', form: 'spot-on', group: 'broad',
        covers: ['fleas', 'ticks', 'roundworm', 'hookworm', 'tapeworm', 'lungworm', 'mites'], partial: [],
        intervalDays: 91, intervalLabel: '3-monthly (13 weeks)', prescription: true,
        regions: ['uk', 'europe'], color: '#0d9488', note: 'No heartworm cover. 13-week dosing interval.'
    },
    bravecto_plus: {
        id: 'bravecto_plus', brand: 'Bravecto Plus', generic: 'Fluralaner + Moxidectin',
        species: 'cat', form: 'spot-on', group: 'broad',
        covers: ['fleas', 'ticks', 'roundworm', 'hookworm', 'lungworm', 'heartworm', 'mites'], partial: [],
        intervalDays: 60, intervalLabel: '2-monthly', prescription: true,
        regions: ['uk', 'europe', 'us'], color: '#0d9488', note: 'Feline. No tapeworm cover.'
    },
    stronghold: {
        id: 'stronghold', brand: 'Stronghold / Revolution', generic: 'Selamectin',
        species: 'both', form: 'spot-on', group: 'broad',
        covers: ['fleas', 'roundworm', 'heartworm', 'mites'], partial: ['ticks'],
        intervalDays: 30, intervalLabel: 'Monthly', prescription: true,
        regions: ['uk', 'europe', 'us'], color: '#6366f1',
        note: 'Limited tick activity only. Also treats sarcoptic mange in dogs.'
    },
    stronghold_plus: {
        id: 'stronghold_plus', brand: 'Stronghold Plus / Revolution Plus', generic: 'Selamectin + Sarolaner',
        species: 'cat', form: 'spot-on', group: 'broad',
        covers: ['fleas', 'ticks', 'roundworm', 'heartworm', 'mites'], partial: [],
        intervalDays: 30, intervalLabel: 'Monthly', prescription: true,
        regions: ['uk', 'europe', 'us'], color: '#6366f1', note: 'Feline. No tapeworm cover.'
    },

    /* ---- ECTOPARASITE-ONLY (flea / tick) ---- */
    nexgard: {
        id: 'nexgard', brand: 'NexGard', generic: 'Afoxolaner',
        species: 'dog', form: 'oral', group: 'ecto',
        covers: ['fleas', 'ticks'], partial: [], intervalDays: 30, intervalLabel: 'Monthly',
        prescription: true, regions: ['uk', 'europe', 'us'], color: '#f59e0b', note: 'Flea & tick only.'
    },
    bravecto: {
        id: 'bravecto', brand: 'Bravecto', generic: 'Fluralaner',
        species: 'both', form: 'oral / spot-on', group: 'ecto',
        covers: ['fleas', 'ticks'], partial: ['mites'], intervalDays: 84, intervalLabel: '12-weekly',
        prescription: true, regions: ['uk', 'europe', 'us'], color: '#f59e0b',
        note: 'Oral (dog) lasts 12 weeks; cat spot-on also treats ear mites.'
    },
    bravecto_quantum: {
        id: 'bravecto_quantum', brand: 'Bravecto Quantum', generic: 'Fluralaner (injectable)',
        species: 'dog', form: 'injectable', group: 'ecto',
        covers: ['fleas', 'ticks'], partial: [], intervalDays: 365, intervalLabel: 'Annual (12 months)',
        prescription: true, regions: ['uk', 'europe', 'us'], color: '#f59e0b',
        note: 'Single annual injection — flea & tick only.'
    },
    bravecto_truno: {
    id: 'bravecto_truno', brand: 'Bravecto TriUNO', generic: 'Fluralaner + Moxidectin + Pyrantel',
    species: 'dog', form: 'oral', group: 'broad',
    covers: ['fleas', 'ticks', 'roundworm', 'hookworm', 'whipworm', 'heartworm'], partial: [],
    intervalDays: 84, intervalLabel: '12-weekly (ticks/fleas); monthly (heartworm/worm)',
    prescription: true,
    regions: ['uk', 'europe', 'us'], color: '#6366f1',
    note: 'Mixed interval product — 12-week ectoparasite cover, monthly macrocyclic lactone dose for heartworm/worm prevention. No A. vasorum lungworm label claim.'
},
    simparica: {
        id: 'simparica', brand: 'Simparica', generic: 'Sarolaner',
        species: 'dog', form: 'oral', group: 'ecto',
        covers: ['fleas', 'ticks'], partial: [], intervalDays: 30, intervalLabel: 'Monthly',
        prescription: true, regions: ['uk', 'europe', 'us'], color: '#f59e0b', note: 'Flea & tick only.'
    },
    credelio: {
        id: 'credelio', brand: 'Credelio', generic: 'Lotilaner',
        species: 'both', form: 'oral', group: 'ecto',
        covers: ['fleas', 'ticks'], partial: [], intervalDays: 30, intervalLabel: 'Monthly',
        prescription: true, regions: ['uk', 'europe', 'us'], color: '#f59e0b', note: 'Flea & tick only.'
    },
    seresto: {
        id: 'seresto', brand: 'Seresto', generic: 'Imidacloprid + Flumethrin (collar)',
        species: 'both', form: 'collar', group: 'ecto',
        covers: ['fleas', 'ticks'], partial: [], intervalDays: 240, intervalLabel: '7–8 monthly',
        prescription: false, regions: ['uk', 'europe', 'us'], color: '#f59e0b',
        note: 'Collar — repels, useful as a leishmaniasis vector measure in sandfly regions.'
    },
    frontline: {
        id: 'frontline', brand: 'Frontline Spot On', generic: 'Fipronil',
        species: 'both', form: 'spot-on', group: 'ecto',
        covers: ['fleas', 'ticks'], partial: [], intervalDays: 30, intervalLabel: 'Monthly',
        prescription: false, regions: ['uk', 'europe', 'us'], color: '#f59e0b',
        note: 'Documented flea resistance concerns — many vets now prefer isoxazolines.'
    },
    frontline_plus: {
        id: 'frontline_plus', brand: 'Frontline Plus / Combo', generic: 'Fipronil + (S)-methoprene',
        species: 'both', form: 'spot-on', group: 'ecto',
        covers: ['fleas', 'ticks'], partial: [], intervalDays: 30, intervalLabel: 'Monthly',
        prescription: false, regions: ['uk', 'europe', 'us'], color: '#f59e0b',
        note: 'Adds flea egg/larval control. Resistance concerns as above.'
    },
    advantage: {
        id: 'advantage', brand: 'Advantage', generic: 'Imidacloprid',
        species: 'both', form: 'spot-on', group: 'ecto',
        covers: ['fleas'], partial: [], intervalDays: 30, intervalLabel: 'Monthly',
        prescription: false, regions: ['uk', 'europe', 'us'], color: '#f59e0b',
        note: 'Fleas only — no tick or worm cover.'
    },
    vectra_3d: {
        id: 'vectra_3d', brand: 'Vectra 3D', generic: 'Dinotefuran + Pyriproxyfen + Permethrin',
        species: 'dog', form: 'spot-on', group: 'ecto',
        covers: ['fleas', 'ticks'], partial: [], intervalDays: 30, intervalLabel: 'Monthly',
        prescription: false, regions: ['uk', 'europe', 'us'], color: '#f59e0b',
        note: 'DOG ONLY — permethrin is toxic to cats. Repels mosquitoes & sandflies (leishmaniasis vector cover).'
    },
    vectra_felis: {
        id: 'vectra_felis', brand: 'Vectra Felis', generic: 'Dinotefuran + Pyriproxyfen',
        species: 'cat', form: 'spot-on', group: 'ecto',
        covers: ['fleas'], partial: [], intervalDays: 30, intervalLabel: 'Monthly',
        prescription: false, regions: ['uk', 'europe', 'us'], color: '#f59e0b', note: 'Feline — fleas only.'
    },

    /* ---- ENDOPARASITE-ONLY (wormers / heartworm preventives) ---- */
    milbemax: {
        id: 'milbemax', brand: 'Milbemax', generic: 'Milbemycin oxime + Praziquantel',
        species: 'both', form: 'oral', group: 'endo',
        covers: ['roundworm', 'hookworm', 'whipworm', 'tapeworm', 'lungworm', 'heartworm'], partial: [],
        intervalDays: 30, intervalLabel: 'Monthly (worming)', prescription: true,
        regions: ['uk', 'europe', 'us'], color: '#10b981', note: 'No flea or tick cover.'
    },
    drontal: {
        id: 'drontal', brand: 'Drontal', generic: 'Praziquantel + Pyrantel + Febantel',
        species: 'both', form: 'oral', group: 'endo',
        covers: ['roundworm', 'hookworm', 'whipworm', 'tapeworm'], partial: [],
        intervalDays: 90, intervalLabel: '3-monthly (or as advised)', prescription: false,
        regions: ['uk', 'europe', 'us'], color: '#10b981',
        note: 'All-wormer — no lungworm, heartworm, flea or tick cover.'
    },
    droncit: {
        id: 'droncit', brand: 'Droncit', generic: 'Praziquantel',
        species: 'both', form: 'oral / spot-on', group: 'endo',
        covers: ['tapeworm'], partial: [], intervalDays: 90, intervalLabel: 'As advised',
        prescription: false, regions: ['uk', 'europe', 'us'], color: '#10b981', note: 'Tapeworm only.'
    },
    panacur: {
        id: 'panacur', brand: 'Panacur', generic: 'Fenbendazole',
        species: 'both', form: 'oral', group: 'endo',
        covers: ['roundworm', 'hookworm', 'whipworm', 'lungworm'], partial: ['tapeworm'],
        intervalDays: 90, intervalLabel: 'Course-based / as advised', prescription: false,
        regions: ['uk', 'europe', 'us'], color: '#10b981',
        note: 'Multi-day course. Also used for Giardia. Taenia tapeworm only.'
    },
    heartgard: {
        id: 'heartgard', brand: 'Heartgard Plus', generic: 'Ivermectin + Pyrantel',
        species: 'dog', form: 'oral', group: 'endo',
        covers: ['heartworm', 'roundworm', 'hookworm'], partial: [],
        intervalDays: 30, intervalLabel: 'Monthly', prescription: true,
        regions: ['us'], color: '#10b981', note: 'Heartworm preventive with intestinal cover. No flea/tick.'
    },
    
    profender: {
    id: 'profender', brand: 'Profender', generic: 'Emodepside + Praziquantel',
    species: 'cat', form: 'spot-on', group: 'endo',
    covers: ['roundworm', 'hookworm', 'tapeworm'], partial: [],
    intervalDays: 90, intervalLabel: 'As advised / 3-monthly',
    prescription: true,
    regions: ['uk', 'europe', 'us'], color: '#10b981',
    note: 'Feline topical endoparasiticide. No flea, tick, or heartworm cover. ⚠ Pregnant women should avoid skin contact — emodepside may impair fetal development.'
},

    /* ---- CUSTOM ---- */
    other: {
        id: 'other', brand: 'Custom Product', generic: 'User-defined',
        species: 'both', form: 'other', group: 'custom',
        covers: [], partial: [], intervalDays: 30, intervalLabel: 'Custom',
        prescription: false, regions: ['uk', 'europe', 'us'], color: '#64748b',
        note: 'Define coverage manually.'
    }
};

/* ============================================================================
   SUPPLEMENT MODULE DATA
   - SUPPLEMENT_CONSTITUENTS : the active-ingredient taxonomy (warning engine)
   - SUPPLEMENT_FORMULARY    : brand catalogue with constituent mapping
   Constituent overlap between two active products triggers a double-dosing
   caution; `medCaution` entries cross-check against the medication ledger.
   ⚠ Constituent lists are a clinical seed — formulations change; verify
   against current product datasheets before release.
   ============================================================================ */

const SUPPLEMENT_CONSTITUENTS = {
    omega3:      { id: 'omega3',      label: 'Omega-3 (EPA/DHA)',   color: '#0ea5e9',
                   note: 'Count every source — fish oils, joint chews with green-lipped mussel, and senior/cognitive blends all contribute.' },
    taurine:     { id: 'taurine',     label: 'Taurine',             color: '#ef4444' },
    lcarnitine:  { id: 'lcarnitine',  label: 'L-Carnitine',         color: '#f97316' },
    coq10:       { id: 'coq10',       label: 'Coenzyme Q10',        color: '#8b5cf6' },
    potassium:   { id: 'potassium',   label: 'Potassium',           color: '#10b981',
                   medCaution: {
                       drugs: ['cardalis', 'prilactone', 'benazepril', 'enalapril'],
                       text: 'Potassium supplementation alongside spironolactone or an ACE inhibitor increases the risk of hyperkalaemia — confirm this combination with the prescribing veterinary surgeon.'
                   } },
    magnesium:   { id: 'magnesium',   label: 'Magnesium',           color: '#14b8a6' },
    hawthorn:    { id: 'hawthorn',    label: 'Hawthorn',            color: '#e11d48',
                   medCaution: {
                       drugs: ['digoxin'],
                       text: 'Hawthorn may potentiate the effects of digoxin — this combination should only be used under direct veterinary guidance.'
                   } },
    vitamin_e:   { id: 'vitamin_e',   label: 'Vitamin E',           color: '#eab308' },
    glucosamine: { id: 'glucosamine', label: 'Glucosamine',         color: '#f59e0b' },
    chondroitin: { id: 'chondroitin', label: 'Chondroitin',         color: '#d97706' },
    glm:         { id: 'glm',         label: 'Green-Lipped Mussel', color: '#06b6d4',
                   note: 'Also a source of omega-3 fatty acids.' },
    msm:         { id: 'msm',         label: 'MSM',                 color: '#a3a3a3' },
    same:        { id: 'same',        label: 'SAMe',                color: '#a16207' },
    silybin:     { id: 'silybin',     label: 'Silybin (Milk Thistle)', color: '#84cc16' },
    b_vitamins:  { id: 'b_vitamins',  label: 'B Vitamins',          color: '#6366f1' },
    phos_serine: { id: 'phos_serine', label: 'Phosphatidylserine',  color: '#c084fc' },
    probiotic:   { id: 'probiotic',   label: 'Probiotic',           color: '#22c55e' }
};

const SUPPLEMENT_FORMULARY = {

    /* ---- CARDIAC COMBINATION PRODUCTS (category: cardiac) ---- */
    cardiovet: {
        id: 'cardiovet', brand: 'CardioVet', maker: 'Vet Expert',
        species: 'dog', category: 'cardiac', regions: ['uk', 'europe'], color: '#e11d48',
        constituents: ['lcarnitine', 'taurine', 'coq10', 'vitamin_e'],
        note: 'Tablet. L-carnitine, taurine, CoQ10 and vitamin E per tablet.'
    },
    nutricarevet_cardiac: {
        id: 'nutricarevet_cardiac', brand: 'NutriCareVet Cardiac Support', maker: 'Covetrus',
        species: 'both', category: 'cardiac', regions: ['uk'], color: '#e11d48',
        constituents: ['omega3', 'taurine', 'lcarnitine', 'hawthorn', 'potassium'],
        note: 'Chewable tablet; separate canine and feline presentations. Contains salmon oil (omega-3), hawthorn and potassium chloride.'
    },
    maxxicardio: {
        id: 'maxxicardio', brand: 'maxxicardio', maker: 'maxxipaws',
        species: 'dog', category: 'cardiac', regions: ['uk', 'us'], color: '#e11d48',
        constituents: ['lcarnitine', 'taurine', 'hawthorn', 'coq10', 'magnesium', 'potassium', 'vitamin_e'],
        note: 'Powder. Also contains ginkgo biloba.'
    },
    vetriscience_cardio: {
        id: 'vetriscience_cardio', brand: 'Cardio-Strength', maker: 'VetriScience',
        species: 'both', category: 'cardiac', regions: ['us'], color: '#e11d48',
        constituents: ['taurine', 'lcarnitine', 'coq10', 'hawthorn', 'magnesium', 'potassium', 'vitamin_e'],
        note: 'Capsule. Broad multi-constituent cardiac blend.'
    },
    rx_formula_cv: {
        id: 'rx_formula_cv', brand: 'Formula CV', maker: 'Rx Vitamins',
        species: 'both', category: 'cardiac', regions: ['us'], color: '#e11d48',
        constituents: ['taurine', 'lcarnitine', 'coq10', 'hawthorn', 'magnesium', 'vitamin_e'],
        note: 'Capsule. Veterinary cardiologist-formulated blend.'
    },
    thorne_heart: {
        id: 'thorne_heart', brand: 'Heart Health Formula (Bio-Cardio)', maker: 'Thorne Vet',
        species: 'both', category: 'cardiac', regions: ['us'], color: '#e11d48',
        constituents: ['taurine', 'lcarnitine', 'coq10', 'hawthorn'],
        note: 'Capsule. Formerly marketed as Bio-Cardio.'
    },

    /* ---- OMEGA-3 / FISH OILS (category: omega) ---- */
    fish_oil_generic: {
        id: 'fish_oil_generic', brand: 'Fish / Salmon / Krill Oil (generic)', maker: '',
        species: 'both', category: 'omega', regions: ['uk', 'europe', 'us'], color: '#0ea5e9',
        constituents: ['omega3'],
        note: 'Any unbranded EPA/DHA oil. EPA/DHA content per pump or capsule varies widely between products.'
    },
    welactin: {
        id: 'welactin', brand: 'Welactin', maker: 'Nutramax',
        species: 'both', category: 'omega', regions: ['uk', 'us'], color: '#0ea5e9',
        constituents: ['omega3'],
        note: 'Salmon oil liquid or softgel.'
    },
    nordic_omega3_pet: {
        id: 'nordic_omega3_pet', brand: 'Omega-3 Pet', maker: 'Nordic Naturals',
        species: 'both', category: 'omega', regions: ['us', 'uk'], color: '#0ea5e9',
        constituents: ['omega3'],
        note: 'Triglyceride-form fish oil, high EPA/DHA per ml.'
    },
    grizzly_salmon: {
        id: 'grizzly_salmon', brand: 'Grizzly Salmon Plus', maker: 'Grizzly Pet Products',
        species: 'both', category: 'omega', regions: ['us', 'europe'], color: '#0ea5e9',
        constituents: ['omega3'],
        note: 'Wild salmon oil pump bottle.'
    },

    /* ---- SINGLE-AGENT SUPPLEMENTS (category: single) ---- */
    taurine_pure: {
        id: 'taurine_pure', brand: 'Taurine (plain powder / capsule)', maker: '',
        species: 'both', category: 'single', regions: ['uk', 'europe', 'us'], color: '#ef4444',
        constituents: ['taurine'],
        note: 'Frequently prescribed for diet-associated DCM and feline taurine deficiency.'
    },
    lcarnitine_pure: {
        id: 'lcarnitine_pure', brand: 'L-Carnitine (plain powder / capsule)', maker: '',
        species: 'both', category: 'single', regions: ['uk', 'europe', 'us'], color: '#f97316',
        constituents: ['lcarnitine'],
        note: 'Adjunct in DCM, particularly Boxers and Dobermanns.'
    },
    coq10_pure: {
        id: 'coq10_pure', brand: 'Coenzyme Q10 (plain capsule)', maker: '',
        species: 'both', category: 'single', regions: ['uk', 'europe', 'us'], color: '#8b5cf6',
        constituents: ['coq10'],
        note: 'Often a human product given at veterinary direction.'
    },
    vitamin_e_pure: {
        id: 'vitamin_e_pure', brand: 'Vitamin E (plain capsule)', maker: '',
        species: 'both', category: 'single', regions: ['uk', 'europe', 'us'], color: '#eab308',
        constituents: ['vitamin_e'],
        note: ''
    },

    /* ---- POTASSIUM & ELECTROLYTES (category: electrolyte) ---- */
    kaminox: {
        id: 'kaminox', brand: 'Kaminox', maker: 'VetPlus',
        species: 'both', category: 'electrolyte', regions: ['uk', 'europe'], color: '#10b981',
        constituents: ['potassium', 'b_vitamins'],
        note: 'Liquid potassium gluconate with B vitamins, iron and amino acids — commonly used in CKD cats.'
    },
    tumil_k: {
        id: 'tumil_k', brand: 'Tumil-K', maker: 'Virbac',
        species: 'both', category: 'electrolyte', regions: ['us'], color: '#10b981',
        constituents: ['potassium'],
        note: 'Potassium gluconate tablets, gel or powder.'
    },

    /* ---- JOINT SUPPORT (category: joint) ---- */
    yumove: {
        id: 'yumove', brand: 'YuMOVE Joint Care', maker: 'Lintbells',
        species: 'both', category: 'joint', regions: ['uk'], color: '#f59e0b',
        constituents: ['glucosamine', 'chondroitin', 'glm', 'omega3'],
        note: 'Green-lipped mussel base — an easily missed omega-3 source when a fish oil is also given.'
    },
    cosequin: {
        id: 'cosequin', brand: 'Cosequin', maker: 'Nutramax',
        species: 'both', category: 'joint', regions: ['us', 'uk'], color: '#f59e0b',
        constituents: ['glucosamine', 'chondroitin', 'msm'],
        note: 'MSM present in the DS Plus MSM presentation only.'
    },
    dasuquin: {
        id: 'dasuquin', brand: 'Dasuquin', maker: 'Nutramax',
        species: 'both', category: 'joint', regions: ['us'], color: '#f59e0b',
        constituents: ['glucosamine', 'chondroitin'],
        note: 'Adds avocado/soybean unsaponifiables (ASU) to the Cosequin base.'
    },
    synoquin: {
        id: 'synoquin', brand: 'Synoquin EFA', maker: 'VetPlus',
        species: 'both', category: 'joint', regions: ['uk', 'europe'], color: '#f59e0b',
        constituents: ['glucosamine', 'chondroitin', 'omega3'],
        note: 'Krill-derived EFA content — contributes omega-3.'
    },
    seraquin: {
        id: 'seraquin', brand: 'Seraquin', maker: 'Boehringer Ingelheim',
        species: 'both', category: 'joint', regions: ['uk', 'europe'], color: '#f59e0b',
        constituents: ['glucosamine', 'chondroitin'],
        note: 'Adds curcumin (turmeric extract).'
    },

    /* ---- LIVER SUPPORT (category: liver) ---- */
    denamarin: {
        id: 'denamarin', brand: 'Denamarin', maker: 'Nutramax / Protexin',
        species: 'both', category: 'liver', regions: ['uk', 'europe', 'us'], color: '#a16207',
        constituents: ['same', 'silybin'],
        note: 'SAMe + silybin-phosphatidylcholine complex.'
    },
    samylin: {
        id: 'samylin', brand: 'Samylin', maker: 'VetPlus',
        species: 'both', category: 'liver', regions: ['uk', 'europe'], color: '#a16207',
        constituents: ['same', 'silybin', 'vitamin_e', 'b_vitamins'],
        note: 'SAMe, silybin, vitamin E and B vitamins.'
    },
    hepatosyl: {
        id: 'hepatosyl', brand: 'Hepatosyl Plus', maker: 'CEVA',
        species: 'both', category: 'liver', regions: ['uk', 'europe'], color: '#a16207',
        constituents: ['same', 'silybin', 'vitamin_e'],
        note: 'Also contains vitamin K.'
    },

    /* ---- SENIOR / COGNITIVE (category: senior) ---- */
    aktivait: {
        id: 'aktivait', brand: 'Aktivait', maker: 'VetPlus',
        species: 'both', category: 'senior', regions: ['uk', 'europe'], color: '#8b5cf6',
        constituents: ['omega3', 'lcarnitine', 'coq10', 'vitamin_e', 'phos_serine'],
        note: 'Cognitive blend that quietly duplicates several cardiac constituents (omega-3, L-carnitine, CoQ10). Species-specific presentations — the canine capsule contains alpha-lipoic acid and must never be given to cats.'
    },
    senilife: {
        id: 'senilife', brand: 'Senilife', maker: 'CEVA',
        species: 'both', category: 'senior', regions: ['uk', 'europe', 'us'], color: '#8b5cf6',
        constituents: ['phos_serine', 'vitamin_e'],
        note: 'Also contains ginkgo biloba, resveratrol and pyridoxine.'
    },

    /* ---- OTHER (category: other) ---- */
    probiotic_generic: {
        id: 'probiotic_generic', brand: 'Probiotic (e.g. FortiFlora, Pro-Kolin)', maker: '',
        species: 'both', category: 'other', regions: ['uk', 'europe', 'us'], color: '#22c55e',
        constituents: ['probiotic'],
        note: ''
    },
    multivitamin_generic: {
        id: 'multivitamin_generic', brand: 'Multivitamin (general)', maker: '',
        species: 'both', category: 'other', regions: ['uk', 'europe', 'us'], color: '#6366f1',
        constituents: ['b_vitamins', 'vitamin_e'],
        note: 'Formulations vary — check the label; many include omega-3 or minerals as well.'
    },
    other: {
        id: 'other', brand: 'Other / Custom Supplement', maker: '',
        species: 'both', category: 'custom', regions: ['uk', 'europe', 'us'], color: '#64748b',
        constituents: [],
        note: 'User-defined — constituents ticked manually.'
    }
};

const ACVIM_PATHWAYS = {

    MMVD: {
        treatmentBands: [
        {
            label: "Pimobendan Helpful",
            startStage: "B2"
        },
        {
            label: "Diuretics Helpful",
            startStage: "C"
        }
        ],
        stages: [
            {
                id: "Normal",
                label: "Normal",
                subtitle: ""
            },
            {
                id: "B1",
                label: "B1",
                subtitle: "Heart murmur"
            },
            {
                id: "B2",
                label: "B2",
                subtitle: "Heart murmur + remodelling"
            },
            {
                id: "C",
                label: "C",
                subtitle: "CHF present"
            },
            {
                id: "D",
                label: "D",
                subtitle: "Refractory CHF"
            }
        ]
    },

    HCM: {
         treatmentBands: [
        {
            label: "Clopidogrel Helpful",
            startStage: "B2"
        },
        {
            label: "Diuretics Helpful",
            startStage: "C"
        }
        ],
        stages: [
            {
                id: "Normal",
                label: "Normal"
            },
            {
                id: "B1",
                label: "B1",
                subtitle: "Normal LA"
            },
            {
                id: "B2",
                label: "B2",
                subtitle: "LA enlargement"
            },
            {
                id: "C",
                label: "C",
                subtitle: "CHF / ATE"
            },
            {
                id: "D",
                label: "D",
                subtitle: "Refractory disease"
            }
        ]
    },

    DCM: {
            treatmentBands: [
                    {
            label: "Anti-arrhythmics may be Helpful",
            startStage: "B1"
        },
        {
            label: "Pimobendan Helpful",
            startStage: "B2"
        },
        {
            label: "Diuretics Helpful",
            startStage: "C"
        }
        ],
        stages: [
            {
                id: "Normal",
                label: "Normal"
            },
            {
                id: "B1",
                label: "B1",
                subtitle: "Arrhythmia only"
            },
            {
                id: "B2",
                label: "B2",
                subtitle: "Structural changes"
            },
            {
                id: "C",
                label: "C",
                subtitle: "CHF"
            },
            {
                id: "D",
                label: "D",
                subtitle: "Refractory CHF"
            }
        ]
    }
};