//  med-data.js 
const VET_FORMULARY = {
    furosemide: { id: 'furosemide', generic: 'Furosemide', brands: ['Lasix', 'Dimazon', 'Libromide'], classes: ['Loop Diuretic'], color: '#3b82f6' },
    torasemide: { id: 'torasemide', generic: 'Torasemide', brands: ['UpCard', 'Isemid'], classes: ['Loop Diuretic'], color: '#2563eb' },
    pimobendan: { id: 'pimobendan', generic: 'Pimobendan', brands: ['Vetmedin', 'Cardisure'], classes: ['Inodilator'], color: '#ef4444' },
    cardalis:   { id: 'cardalis', generic: 'Spironolactone + Benazepril', brands: ['Cardalis'], classes: ['ACE-i', 'Aldosterone Antagonist'], color: '#8b5cf6' },
    prilactone: { id: 'prilactone', generic: 'Spironolactone', brands: ['Prilactone'], classes: ['Aldosterone Antagonist'], color: '#a855f7' },
    other:      { id: 'other', generic: 'Custom Medication', brands: [], classes: ['Other/Unspecified'], color: '#64748b' }
};