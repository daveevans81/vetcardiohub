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