//  med-data.js 
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
    { id: 'fleas',     label: 'Fleas',                short: 'Fleas', category: 'ecto',            cardiac: false },
    { id: 'ticks',     label: 'Ticks',                short: 'Ticks', category: 'ecto',            cardiac: false,
      note: 'Vector for Lyme, babesiosis, ehrlichiosis, anaplasmosis.' },
    { id: 'roundworm', label: 'Roundworm (ascarids)', short: 'Round', category: 'endo',            cardiac: false,
      note: 'Zoonotic (Toxocara).' },
    { id: 'hookworm',  label: 'Hookworm',             short: 'Hook',  category: 'endo',            cardiac: false,
      note: 'Zoonotic.' },
    { id: 'whipworm',  label: 'Whipworm',             short: 'Whip',  category: 'endo',            cardiac: false },
    { id: 'tapeworm',  label: 'Tapeworm',             short: 'Tape',  category: 'endo',            cardiac: false },
    { id: 'lungworm',  label: 'Lungworm (A. vasorum)', short: 'Lung', category: 'cardiopulmonary', cardiac: true,
      note: 'Raises respiratory rate & cough — can mimic or mask cardiac decline.' },
    { id: 'heartworm', label: 'Heartworm (D. immitis)', short: 'Heart', category: 'cardiopulmonary', cardiac: true,
      note: 'Pulmonary hypertension & right-heart disease. Endemic in mainland Europe & US, not the UK.' },
    { id: 'mites',     label: 'Mites (ear / mange)',  short: 'Mites', category: 'ecto',            cardiac: false }
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
    }
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

    /* ---- CUSTOM ---- */
    other: {
        id: 'other', brand: 'Custom Product', generic: 'User-defined',
        species: 'both', form: 'other', group: 'custom',
        covers: [], partial: [], intervalDays: 30, intervalLabel: 'Custom',
        prescription: false, regions: ['uk', 'europe', 'us'], color: '#64748b',
        note: 'Define coverage manually.'
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