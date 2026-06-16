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