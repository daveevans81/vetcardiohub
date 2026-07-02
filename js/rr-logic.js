document.addEventListener('alpine:init', () => {
    Alpine.data('rrTracker', () => ({
        // Absorb the Glossary Engine for tooltips 
        ...glossaryEngine, 

// Onboarding State
showOnboarding: false,
onboardingStep: 0, // 0 = Welcome, 1 = Demographics, 2 = Clinical, 3 = Recommendations
isExistingPatientEdit: false, // Flag to bypass wizard when editing later

onboardingData: {
    hasCardiacIssue: 'no',
    murmurGrade: '',
    diagnosis: '',
    acvimStage: ''
},

// --- Terms gate (hard, first-use, versioned) ---
termsVersion: '2026-07-01',   // bump this string when terms materially change
termsAgreed: false,
showTermsModal: false,
showPrivacyModal: false,
showTermsGate: false,         // returning-user re-acceptance only
    showDisclaimerModal: false,



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
    antiparasitics: true
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
    antiparasitics: true
},


// --- SYMPTOM TRACKING STATE ---
        showSymptomLog: false,
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
            distance: '', // e.g., "2 miles", "3 km"
            notes: ''
        },

        // --- Syncope and Diagnosis objects ---
        showDiagnosisLog: false,
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
        
        // --- PAGINATION STATE ---
        currentPage: 1,
        itemsPerPage: 20,
        editingCommentId: null,
		commentDraft: '',
		expandedCommentId: null,
		
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
 
showMedLog: false, // Accordion toggle state
formulary: VET_FORMULARY, // Expose the global object to Alpine
newMed: {
    eventDate: new Date().toISOString().split('T')[0],
    drugId: '',
    customName: '',
    isStopped: false,
        openedDate: '',     // NEW — date liquid bottle was opened
    discardDays: '', 
    form: 'tablet',           // NEW — 'tablet' | 'liquid'
    tabletStrengthMg: '',     // tablet: mg/tablet   | liquid: mg/ml (concentration)
    tabletsPerDose: '',       // tablet: tablets/dose | liquid: ml/dose
    frequency: 'q12h',
    tabletsInStock: '',       // tablet: tablets      | liquid: total ml
    stockDate: new Date().toISOString().split('T')[0]
},

        // Medication Chart State
      //  medTimeScale: '180d', 
        medChartInstance: null,
     //   medCustomStartDate: '',
      //  medCustomEndDate: '',
        medChartRenderTimeout: null,
        
        // State for the Merge UI
        showMergeTools: false,
        mergeTargetId: '',
        
        // ===================== VIEW NAVIGATION (activeView) =====================
activeView: 'all',            // ← default to the full scroll

navItems: [
    { id: 'all',      label: 'All',      icon: 'fa-layer-group', modules: null },
    { id: 'count',    label: 'Count',    icon: 'fa-lungs',       modules: ['srr'] },
    { id: 'trends',   label: 'Trends',   icon: 'fa-chart-line',  modules: ['srr','medications','acvimStaging'] },
    { id: 'meds',     label: 'Meds',     icon: 'fa-pills',       modules: ['medications','acvimStaging'] },
    { id: 'wellness', label: 'Wellness', icon: 'fa-heart-pulse', modules: ['coughLog','activityLog','weightDiet','syncopeLog','vaccinations','antiparasitics'] },
    { id: 'data',     label: 'Data',     icon: 'fa-database',     modules: null }
],


// True if ANY of the given modules is enabled for the active patient.
// Legacy profiles without a modules object show everything.
modOn(...keys) {
    const mods = this.activePatientProfile?.modules;
    if (!mods) return true;
    return keys.some(k => mods[k]);
},

// 'all' shows every section; otherwise exact match
isView(v) { return this.activeView === 'all' || this.activeView === v; },

// Tabs whose required modules are all disabled get hidden
visibleNavItems() {
    const mods = this.activePatientProfile?.modules || {};
    return this.navItems.filter(item => !item.modules || item.modules.some(m => mods[m]));
},

get currentViewLabel() {
    return (this.navItems.find(n => n.id === this.activeView) || {}).label || '';
},

// Focused tabs auto-expand their accordions; 'all' keeps the compact scroll
_expandForView(v) {
    if (v === 'meds')     { this.showMedLog = true; this.showDiagnosisLog = true; }
    if (v === 'wellness') { this.showSymptomLog = true; this.showWeightLogPanel = true;
                            this.showSyncopeLog = true; this.showVaccinationLogPanel = true;
                            this.showAntiparasiticPanel = true; }
    if (v === 'trends')   { this.showAnalytics = true; }
    if (v === 'count')   { this.showLog = true; }
},

setView(v) {
    const sameTab = this.activeView === v;
    this.activeView = v;
    this._expandForView(v);
    try { localStorage.setItem('vch_activeView', v); } catch (e) {}
    // Tapping the active tab again scrolls back to top; switching jumps to top
    window.scrollTo({ top: 0, behavior: sameTab ? 'smooth' : 'auto' });
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

sanitiseCSV(val) {
    const s = String(val == null ? '' : val);
    // Prefix formula-injection characters to prevent spreadsheet execution
    return /^[=+\-@\t\r]/.test(s) ? `'${s}` : s;
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
    this.diagnosisLog     = loadKey('vch_diagnosisLog');
    this.syncopeLog       = loadKey('vch_syncopeLog');
    this.coughLog         = loadKey('vch_coughLog');
    this.activityLog      = loadKey('vch_activityLog');
    this.vaccinationLog   = loadKey('vch_vaccinationLog');
    this.antiparasiticLog = loadKey('vch_antiparasiticLog');

    // Backfill module flags for legacy / restored profiles
    this.patients.forEach(p => { p.modules = { ...this.defaultModules, ...(p.modules || {}) }; });
    this._syncVetExportModules();
   
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
        this.activePatientId = this.patients[0].id;
    } else {
        this.startNewPatientOnboarding();
    }

    if (this.paginatedHistory.length > 0) {
        this.showHeroHeader = false;
    } else {
        this.showHeroHeader = true;
    }
    
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

    // Existing watchers
    this.$watch('activePatientId', () => { this.currentPage = 1; this.renderChart(); this.renderMedChart(); this.renderWeightChart(); if (!this.visibleNavItems().some(i => i.id === this.activeView)) this.activeView = 'all'; this._syncVetExportModules(); });
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
    try {
        const savedView = localStorage.getItem('vch_activeView');
        if (savedView) this.activeView = savedView;
        if (!this.visibleNavItems().some(i => i.id === this.activeView)) this.activeView = 'all';
        this._expandForView(this.activeView);
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
        name: '', ownerName: '', species: 'dog', breed: '', sex: '', dob: '', weight: '', weightUnit: '',customSrrCutoff: 30,
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
    
    this.onboardingData = { hasCardiacIssue: 'no' }; 
    this.isExistingPatientEdit = false;
    this.onboardingStep = this.patients.length === 0 ? 0 : 1; 
    this.showOnboarding = true;
},

generateModuleRecommendations() {
    // Reset to baseline
    let recs = { srr: false, medications: false, coughLog: false, activityLog: false, syncopeLog: false, acvimStaging: false, vaccinations: true, weightDiet: true, antiparasitics: true };
    
    if (this.onboardingData.hasCardiacIssue === 'yes') {
        recs.srr = true;
        recs.acvimStaging = true;
        
        // If they specify Stage B2, C, or D in the actual diagnosis object
        if (['Stage B2', 'Stage C', 'Stage D'].includes(this.newDiagnosis.acvimStage)) {
            recs.medications = true;
            recs.coughLog = true;      
            recs.activityLog = true; 
        }
    } else if (this.onboardingData.hasCardiacIssue === 'seizure') {
        recs.syncopeLog = true;
        recs.activityLog = true;
        recs.srr = true; // useful for collapse context
    } else {
        // General wellness
        recs.coughLog = true;     
        recs.activityLog = true; 
    }

    this.editingPatient.modules = { ...recs };
    this.onboardingStep = 3;
},

saveOnboardedPatient() {
    const { weight, ...patientData } = this.editingPatient;
    const patientIdToSave = patientData.id;

    this.patients.push({ ...patientData });
    this.activePatientId = patientIdToSave;

    const weightValue = parseFloat(weight);
    if (!isNaN(weightValue) && weightValue > 0) {
        this.logWeight(patientIdToSave, weightValue);
    }

    if (this.onboardingData.hasCardiacIssue === 'yes' && this.newDiagnosis.diagnosis) {
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
            this.weightLog = this.weightLog.filter(w => w.patientId !== patientId);
            this.diagnosisLog = this.diagnosisLog.filter(d => d.patientId !== patientId);
            this.syncopeLog = this.syncopeLog.filter(s => s.patientId !== patientId);
            this.coughLog = this.coughLog.filter(s => s.patientId !== patientId);
            this.activityLog = this.activityLog.filter(s => s.patientId !== patientId);
            this.vaccinationLog = this.vaccinationLog.filter(v => v.patientId !== patientId);   
            this.antiparasiticLog = this.antiparasiticLog.filter(a => a.patientId !== patientId);                   
  

            // 2. Persist the flushed arrays to local storage
            this.saveToStorage('vch_patients', this.patients);
            this.saveToStorage('vch_srrHistory', this.srrHistory);
            this.saveToStorage('vch_medLedger', this.medLedger);
            this.saveToStorage('vch_weightLog', this.weightLog);
            this.saveToStorage('vch_diagnosisLog', this.diagnosisLog);
            this.saveToStorage('vch_syncopeLog', this.syncopeLog);
            this.saveToStorage('vch_coughLog', this.coughLog);
            this.saveToStorage('vch_activityLog', this.activityLog);
            this.saveToStorage('vch_vaccinationLog', this.vaccinationLog); 
            this.saveToStorage('vch_antiparasiticLog', this.antiparasiticLog); 

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
            const weights = this.weightLog
                .filter(w => w.patientId === this.activePatientId)
                .sort((a, b) => new Date(b.date) - new Date(a.date));
            if (weights.length === 0) return 'No weight logged';
            const unit = this.activePatientProfile?.weightUnit || 'kg';
            return `${weights[0].weightValue} ${unit}`;
        },
        
savePatient() {
    const cleanName = (this.editingPatient.name || '').trim();
    if (!cleanName) return alert("Patient Name is clinically required.");

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
            this.diagnosisLog = this.diagnosisLog.map(m => m.patientId === sourceId ? { ...m, patientId: targetId } : m);
            this.syncopeLog = this.syncopeLog.map(m => m.patientId === sourceId ? { ...m, patientId: targetId } : m);
            this.coughLog = this.coughLog.map(c => c.patientId === sourceId ? { ...c, patientId: targetId } : c);
            this.activityLog = this.activityLog.map(c => c.patientId === sourceId ? { ...c, patientId: targetId } : c);
            this.vaccinationLog = this.vaccinationLog.map(v => v.patientId === sourceId ? { ...v, patientId: targetId } : v);
            this.antiparasiticLog = this.antiparasiticLog.map(a => a.patientId === sourceId ? { ...a, patientId: targetId } : a);


            // Delete Source Patient
            this.patients = this.patients.filter(p => p.id !== sourceId);

            // Save state
            this.saveToStorage('vch_weightLog', this.weightLog);
            this.saveToStorage('vch_srrHistory', this.srrHistory);
            this.saveToStorage('vch_medLedger', this.medLedger);
            this.saveToStorage('vch_diagnosisLog', this.diagnosisLog);
            this.saveToStorage('vch_syncopeLog', this.syncopeLog);
            this.saveToStorage('vch_coughLog', this.coughLog);
            this.saveToStorage('vch_activityLog', this.activityLog);
            this.saveToStorage('vch_vaccinationLog', this.vaccinationLog);
            this.saveToStorage('vch_patients', this.patients);
            this.saveToStorage('vch_antiparasiticLog', this.antiparasiticLog);
            
            

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
            modules: { ...this.defaultModules }
        };
    } else {
        const target = this.patients.find(p => p.id === patientId);
        const weights = this.weightLog
            .filter(w => w.patientId === patientId)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
        this.editingPatient = {
            ...target,
            weight: null,
            // CRITICAL FIX: backfill modules for patients created before this feature
            modules: target.modules
                ? { ...this.defaultModules, ...target.modules }  // merge: defaults fill any new keys
                : { ...this.defaultModules }
        };
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
        
        // ===================== ANTIPARASITIC LOGIC =====================

_defaultRegion() {
    return 'uk';   // project home base; could later derive from locale
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
        : (PARASITE_REGION_DEFAULTS[region]?.priorities || []).slice();
    if (p?.parasiteTravel) {
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
        if (prod.species !== 'both' && prod.species !== species) continue;
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

    this.prioritiesDraft = {
        region,
        travel: !!src?.parasiteTravel,
        priorities: explicit
            ? src.parasitePriorities.slice()
            : (PARASITE_REGION_DEFAULTS[region]?.priorities || []).slice()
    };
    this.showPrioritiesModal = true;
},

applyRegionDefaults(region) {
    this.prioritiesDraft.region = region;
    this.prioritiesDraft.priorities = (PARASITE_REGION_DEFAULTS[region]?.priorities || []).slice();
},

togglePriority(parasiteId) {
    const arr = this.prioritiesDraft.priorities;
    const i = arr.indexOf(parasiteId);
    if (i === -1) arr.push(parasiteId); else arr.splice(i, 1);
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

openWeightForm(logEntry = null) {
    if (logEntry) {
        this.newWeightEntry = { ...logEntry };
        this.editingWeightId = logEntry.id;
        // Format ISO date to standard YYYY-MM-DD for the HTML input
        this.newWeightEntry.date = logEntry.date.split('T')[0]; 
    } else {
        this.newWeightEntry = {
            date: new Date().toISOString().split('T')[0],
            weightValue: '',
            appetite: 'Normal',
            foodBrand: '',
            portionSize: '',
            supplements: '',
            notes: ''
        };
        this.editingWeightId = null;
    }
    this.showWeightForm = true;
},

saveWeightEntry() {
    if (!this.activePatientId) return alert("Select a patient first.");
    const val = parseFloat(this.newWeightEntry.weightValue);
    if (isNaN(val) || val <= 0) return alert("A valid weight is required.");

    const entryToSave = {
        ...this.newWeightEntry,
        id: this.editingWeightId || this.generateId(),
        patientId: this.activePatientId,
        weightValue: val,
        // Ensure date is stored cleanly
        date: this.newWeightEntry.date.includes('T') ? this.newWeightEntry.date : `${this.newWeightEntry.date}T12:00:00.000Z` 
    };

    if (this.editingWeightId) {
        const index = this.weightLog.findIndex(w => w.id === this.editingWeightId);
        if (index !== -1) this.weightLog[index] = entryToSave;
    } else {
        this.weightLog.push(entryToSave);
    }

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
            this._saveDiagnosisLogEntry();
            this.showCardiacForm = false;
        },
        
saveConcurrentDiagnosis() {
    // Parse textarea: split on newlines, trim, drop blanks
    const lines = (this.newConcurrentDiagnosis || '')
        .split('\n')
        .map(s => s.trim())
        .filter(Boolean);

    if (lines.length === 0 && !this.newDiagnosis.notes) {
        return alert("Please add at least one condition or a clinical note.");
    }

    this.newDiagnosis.concurrentDiagnoses = lines;
    this.newDiagnosis.diagnosis = 'Concurrent Conditions Only';
    this._saveDiagnosisLogEntry();
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
                    notes: ''
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
        this.newConcurrentDiagnosis = (logEntry.concurrentDiagnoses || []).join('\n');
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
            // Get the most recent primary cardiac diagnosis (ignoring concurrent-only logs)
            return history.find(d => d.diagnosis && d.diagnosis !== 'Concurrent Conditions Only') || null;
        },
        
get primaryCardiacDiagnosis() {
            return this.currentClinicalStatus?.diagnosis || '';
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

    const history = this.stageProgression;

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
                    status: 'Normal', durationMins: '', distance: '', notes: ''
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

    const weights = this.weightLog
        .filter(w => w.patientId === this.activePatientId)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    
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

    const sorted = this.weightLog
        .filter(w => w.patientId === patientId && new Date(w.date) <= targetDate)
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
        
startCount() {
    if (!this.activePatientId) return alert("Please establish or select a patient profile first.");
    clearInterval(this.timerInterval);   // ← guard: restarting mid-count must kill the old timer
    this.isCounting = true;
    this.tapCount = 0;
    this.timeLeft = 30;
    this.finalRate = null;
    this.hasSavedCurrentCount = false; // Reset the save state
    this._countStart = Date.now();     // ← anchor the 30s window to wall-clock time
    this.timerInterval = setInterval(() => {
        this.timeLeft = Math.max(0, 30 - Math.round((Date.now() - this._countStart) / 1000));
        if (this.timeLeft <= 0) this.finishCount();
    }, 250);
},

cancelCount() {
    // Abort the current count without producing a reading
    clearInterval(this.timerInterval);
    this.isCounting = false;
    this.tapCount = 0;
    this.timeLeft = 30;
    this.finalRate = null;
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
            this.isCounting = false;
            this.finalRate = this.tapCount * 2; // Extrapolate 30s to 60s
            
        },
        
nudgeToSymptom(type) {
            this.showSymptomLog = true;
            this.closeResult();
            
            if (type === 'cough') {
                this.openCoughForm();
            } else if (type === 'activity') {
                this.openActivityForm();
            }
            
            this.$nextTick(() => {
                const el = document.getElementById('symptomSection');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        },
        
closeResult() {
            // Manually closes the results panel and returns to the start screen
            this.finalRate = null;
            this.tapCount = 0;
            this.hasSavedCurrentCount = false;
        },
        
        // Save function for the Ledger
addMedication() {
    if (!this.activePatientId) return alert("Clinical Entry Error: No patient selected.");
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
        stockDate:      this.newMed.isStopped ? null : (this.newMed.stockDate || this.newMed.eventDate),
    };

    this.medLedger.push(entry);
    this.saveToStorage('vch_medLedger', this.medLedger);
    this.renderMedChart();

    this.newMed = {
        eventDate: this.newMed.eventDate,
        drugId: '', customName: '', isStopped: false,
        tabletStrengthMg: '', tabletsPerDose: '',
        frequency: 'q12h',
        form: 'tablet',
        tabletsInStock: '', 
        stockDate: new Date().toISOString().split('T')[0]
    };
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
    return          { status: 'ok',              days, label: `~${days}d left`,                                    color:'#15803d', bg:'#f0fdf4', border:'#bbf7d0' };
},

get allAlerts() {
    const list = [];
    const mods = this.activePatientProfile?.modules || {};
    if (mods.medications !== false) (this.medStockAlerts || []).forEach(a => list.push({
        id: 'stock-' + a.id, kind: 'Medication stock', view: 'meds',
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
            const name = m.drugId === 'other' ? (m.customName || 'Custom') : (this.formulary[m.drugId]?.generic || m.drugId);
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
                comment: isManual ? 'Manually recorded' : ''
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

    const keys = ['vch_patients','vch_weightLog','vch_srrHistory','vch_medLedger',
                  'vch_diagnosisLog','vch_syncopeLog','vch_coughLog','vch_activityLog',
                  'vch_vaccinationLog','vch_antiparasiticLog'];
    keys.forEach(k => localStorage.removeItem(k));

    this.patients = []; this.weightLog = []; this.srrHistory = []; this.medLedger = [];
    this.diagnosisLog = []; this.syncopeLog = []; this.coughLog = []; this.activityLog = [];
    this.vaccinationLog = []; this.antiparasiticLog = [];
    this.activePatientId = null;

    [this.$refs.rrrChartCanvas, this.$refs.medChartCanvas, this.$refs.weightChartCanvas]
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
                        const drugName = m.drugId === 'other' ? m.customName : (this.formulary[m.drugId]?.generic || m.drugId);
                        combinedEvents.push({ type: 'Medication', dateObj: new Date(m.eventDate), displayDate: new Date(m.eventDate).toLocaleDateString(), summary: `${m.action.toUpperCase()}: ${drugName} (${m.doseMg ? m.doseMg+'mg' : '?'})`, notes: m.notes || '' });
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
                        let metric = a.durationMins ? `${a.durationMins}m` : (a.distance || '');
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
                medTooltips[i] = ev.data.map(m => `💊 ${m.action}: ${m.drugId === 'other' ? m.customName : (this.formulary[m.drugId]?.generic || m.drugId)} (${m.doseMg ? m.doseMg + 'mg' : '?'})`);
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
                else if (this.activityPlotType === 'distance' && a.distance) {
                    const parsed = parseFloat(a.distance.replace(/[^\d.]/g, ''));
                    if (!isNaN(parsed)) actVal = parsed;
                }
                if (actVal !== null) {
                    activityDataPoints[i] = actVal;
                    activityTooltips[i] = `Activity (${a.status}): ${this.activityPlotType === 'durationMins' ? a.durationMins + 'm' : a.distance}`;
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
        const canvas = this.$refs.weightChartCanvas;
        if (!canvas || canvas.offsetParent === null) return;

        const existingChart = Chart.getChart(canvas);
        if (existingChart) existingChart.destroy();

        const data = this.weightLog
            .filter(w => w.patientId === this.activePatientId)
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        if (data.length < 2) return;

        const unit = this.activePatientProfile?.weightUnit || 'kg';
        const labels = data.map(w =>
            new Date(w.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' })
        );
        const values = data.map(w => parseFloat(w.weightValue));

        const ctx = canvas.getContext('2d');
        new Chart(ctx, {
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
                    y: {
                        beginAtZero: false,
                        title: { display: true, text: `Weight (${unit})` }
                    }
                }
            }
        });
    }, 100);
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
        const petMeds = this.medLedger.filter(m => m.patientId === this.activePatientId);
        if(petMeds.length > 0) {
             const earliest = petMeds.reduce((min, p) => 
                 this.parseDateSafe(p.eventDate) < this.parseDateSafe(min.eventDate) ? p : min
             , petMeds[0]);
             
             const safeTimestamp = this.parseDateSafe(earliest.eventDate).getTime();
             
             if (!isNaN(safeTimestamp)) {
                 return new Date(safeTimestamp - (14 * 24 * 60 * 60 * 1000));
             }
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
        if (epochs.length === 0) return;

        const { startDate, endDate } = this.getMedDateRange();
        const uniqueDrugs = [...new Set(epochs.map(e => e.drugId === 'other' ? e.customName : (this.formulary[e.drugId]?.generic || e.drugId)))];

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
            const baseColor = this.formulary[e.drugId]?.color || '#64748b';
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
        
        const rowHeight = 72; // px per unique drug
        const chartHeight = Math.max(180, uniqueDrugs.length * rowHeight + 60);
        if (canvas.parentElement) {
            canvas.parentElement.style.height = chartHeight + 'px';
        }

        this.medChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                datasets: dynamicDatasets
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
                                return e.drugId === 'other' ? e.customName : (this.formulary[e.drugId]?.generic || e.drugId);
                            },
                            label: (context) => {
                                const e = context.raw._rawEpoch;
                                const sDate = new Date(e.startTime).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
                                const todayTs = new Date().getTime();
                                const diff = Math.abs(e.endTime - todayTs);
                                const eDate = diff < 1000 ? 'Present' : new Date(e.endTime).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
                                
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
                        labels: uniqueDrugs,
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
exportCSV() {
    if (!this.srrHistory || this.srrHistory.length === 0) return alert("No clinical data to export.");

    const headers = "Date,Time,Rate(bpm),PatientName,Species,Comment\n";
    const rows = this.srrHistory.map(log => {
        const targetPatient = this.patients.find(p => p.id === log.patientId);
        const pName = targetPatient ? targetPatient.name : 'Unknown';
        const pSpecies = targetPatient ? targetPatient.species : 'dog';
        const comment = (log.comment || '').replace(/"/g, '""'); 
        
        return `${log.date},${log.time},${log.rate},"${pName}",${pSpecies},"${comment}"`;
    }).join("\n");

            const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(headers + rows);
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `SRR_Export_${new Date().toISOString().split('T')[0]}.csv`);
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
        return alert("Please paste the Cardalis email content first.");

    // --- 1. EXTRACT PET NAME ---
    // Format: "breathing rate for Bella More details..." or "breathing rate for Bella\n"
    const nameMatch = text.match(
        /breathing\s+rate\s+for\s+([A-Za-z0-9 _'\-]+?)(?:\s*More|\s*\n|\s*$)/i
    );
    const petName = nameMatch ? nameMatch[1].trim() : null;

    if (!petName) {
        return alert(
            "Could not identify a pet name from the email.\n\n" +
            "Expected format: 'breathing rate for [Name]'\n\n" +
            "Check that you have pasted the full email body."
        );
    }

    // --- 2. RESOLVE OR AUTO-CREATE PET PROFILE ---
    let existingPet = this.patients.find(
        p => p.name.toLowerCase() === petName.toLowerCase()
    );
    if (!existingPet) {
        existingPet = {
            id: this.generateId(),
            name: petName,
            species: 'dog',
            age: null,
            weight: null,
            weightUnit: 'kg',
            customSrrCutoff: 30,
            modules: { ...this.defaultModules }
        };
        this.patients.push(existingPet);
        this.saveToStorage('vch_patients', this.patients);
    }

    const resolvedSpecies   = existingPet.species;
    const resolvedPatientId = existingPet.id;

    // --- 3. PARSE ENTRY BLOCKS ---
    // Each block in Cardalis email format:
    //   BreathCount: 24
    //   Date & Time: 2025-08-26 19:01:08
    //   Breathing Effort: N/A          (optional)
    //   Exercise Abilty: N/A           (typo in Cardalis app — handle both spellings)
    //   Alertness: N/A                 (optional)
    //   Comments: some note here       (optional)
    //
    // Strategy: capture the two mandatory fields, then optionally consume
    // the four clinical fields that follow before the next BreathCount.

    const entryRegex = new RegExp(
        'BreathCount:\\s*(\\d+)' +                              // [1] rate
        '[\\s\\S]*?' +
        'Date\\s*&\\s*Time:\\s*(\\d{4}-\\d{2}-\\d{2}\\s+\\d{2}:\\d{2}:\\d{2})' + // [2] datetime
        '(?:[\\s\\S]*?Breathing\\s*Effort:\\s*([^\\n]*))?'  +  // [3] effort (optional)
        '(?:[\\s\\S]*?Exercise\\s*Abilit?y:\\s*([^\\n]*))?'  + // [4] exercise (optional, handles typo)
        '(?:[\\s\\S]*?Alertness:\\s*([^\\n]*))?'             +  // [5] alertness (optional)
        '(?:[\\s\\S]*?Comments?:\\s*([^\\n]*))?',               // [6] comment (optional)
        'gi'
    );

    let match;
    let importedCount    = 0;
    let skippedDuplicates = 0;
    let skippedInvalid   = 0;

    while ((match = entryRegex.exec(text)) !== null) {
        const rate        = parseInt(match[1], 10);
        const dateTimeRaw = match[2].trim();

        // Sanitise optional clinical fields — discard N/A and whitespace-only values
        const isUsable = (s) => s && s.trim() && s.trim().toUpperCase() !== 'N/A';
        const effort   = isUsable(match[3]) ? match[3].trim() : null;
        const exercise = isUsable(match[4]) ? match[4].trim() : null;
        const alertness = isUsable(match[5]) ? match[5].trim() : null;
        const rawNote  = isUsable(match[6]) ? match[6].trim() : null;

        // Parse the datetime (space separator → ISO T separator)
        const dateObj = new Date(dateTimeRaw.replace(' ', 'T'));

        if (isNaN(dateObj.getTime()) || isNaN(rate) || rate <= 0 || rate > 120) {
            skippedInvalid++;
            continue;
        }

        // --- 4. DUPLICATE DETECTION (60-second window) ---
        const isDuplicate = this.srrHistory.some(h =>
            h.patientId === resolvedPatientId &&
            Math.abs(new Date(h.date).getTime() - dateObj.getTime()) < 60000
        );
        if (isDuplicate) { skippedDuplicates++; continue; }

        // --- 5. BUILD COMPOSITE COMMENT ---
        // Assembles clinical fields into a readable note string.
        // Only non-N/A values are included. Falls back to a plain import note.
        const clinicalParts = [];
        if (effort)    clinicalParts.push(`Effort: ${effort}`);
        if (exercise)  clinicalParts.push(`Exercise: ${exercise}`);
        if (alertness) clinicalParts.push(`Alertness: ${alertness}`);
        if (rawNote)   clinicalParts.push(rawNote);

        const compositeComment = clinicalParts.length > 0
            ? clinicalParts.join(' | ')
            : 'Imported from Cardalis app';

        // --- 6. EQUIVOCAL STATUS (consistent with clinicalInterpretation getter) ---
        const isEquivocal = rate >= 30 && rate < 40;

        // --- 7. PUSH TO HISTORY ---
        this.srrHistory.push({
            id:          this.generateId(),    // Always a UUID — never timestamp integer
            date:        dateObj.toISOString(),
            time:        dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            rate,
            patientId:   resolvedPatientId,    // Always the UUID — never the name string
            isEquivocal,
            comment:     compositeComment,
            isManual:    false
        });

        importedCount++;
    }

    // --- 8. COMMIT & REFRESH ---
    if (importedCount === 0) {
        const detail = skippedDuplicates > 0
            ? `${skippedDuplicates} duplicate(s) were already in the log.`
            : skippedInvalid > 0
                ? `${skippedInvalid} entry/entries had invalid data.`
                : "No BreathCount / Date & Time pairs found. Check the email format.";
        return alert(`No new readings imported.\n\n${detail}`);
    }

    this.saveToStorage('vch_srrHistory', this.srrHistory);
    this.activePatientId   = resolvedPatientId;
    this.cardalisEmailText = '';
    this.showCardalisImport = false;
    this.currentPage       = 1;

    this.$nextTick(() => { this.renderChart(); });

    const dupNote     = skippedDuplicates > 0 ? `, ${skippedDuplicates} duplicate(s) skipped` : '';
    const invalidNote = skippedInvalid > 0    ? `, ${skippedInvalid} invalid entry/entries ignored` : '';
    alert(`Successfully imported ${importedCount} reading(s) for ${petName}${dupNote}${invalidNote}.`);
},


// ==========================================
// --- MEDICATION LOG CSV EXPORT / IMPORT ---
// ==========================================
        
        // --- MEDICATION CSV MANAGEMENT ---
exportMedicationsCSV() {
    if (!this.medLedger || this.medLedger.length === 0) 
        return alert("No medication data to export.");

    const headers = "Date,PatientName,DrugId,GenericName,CustomName,Dose(mg),Frequency,mg/kg,isStopped,TabletStrengthMg,TabletsPerDose,TabletsInStock,StockDate,Form,OpenedDate,DiscardDays\n";
    
    const rows = this.medLedger.map(med => {
        const patient = this.patients.find(p => p.id === med.patientId);
        const patientName = this.sanitiseCSV(patient ? patient.name : 'Unknown');
        const genericName = med.drugId === 'other'
            ? 'Other'
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
            med.discardDays != null ? med.discardDays : ''
        ].join(',');
    }).join("\n");

    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(headers + rows);
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", `VCH_Medications_${new Date().toISOString().split('T')[0]}.csv`);
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
            let skipped = 0;

            for (let i = 1; i < lines.length; i++) {
                const parts = lines[i].match(/(".*?"|[^",]+|(?<=,)(?=,)|(?<=,)$|^(?=,))/g);
                if (!parts || parts.length < 7) { skipped++; continue; }

                const eventDate   = clean(parts[0]);
                const patientName = clean(parts[1]);
                const drugId      = clean(parts[2]) || 'other';
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
            this.renderMedChart();

            const note = skipped > 0 ? ` (${skipped} row(s) skipped — patient not found or invalid data)` : '';
            alert(`Imported ${importedCount} medication record(s)${note}.`);

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
    if (!this.coughLog || this.coughLog.length === 0) 
        return alert("No cough data to export.");

    const headers = "Date,PatientName,Severity,FrequencyCount,FrequencyPeriod,Description,Context,Notes\n";
    
    const rows = this.coughLog.map(c => {
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
    link.setAttribute("download", `VCH_CoughLog_${new Date().toISOString().split('T')[0]}.csv`);
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
    if (!this.activityLog || this.activityLog.length === 0) return alert("No activity data to export.");

    const headers = "Date,PatientName,Status,DurationMins,Distance,Notes\n";
    const rows = this.activityLog.map(a => {
        const patient = this.patients.find(p => p.id === a.patientId);
        const patientName = this.sanitiseCSV(patient ? patient.name : 'Unknown');
        return [
            a.date,
            `"${patientName}"`,
            `"${this.sanitiseCSV(a.status || '')}"`,
            `"${this.sanitiseCSV(a.durationMins || '')}"`,
            `"${this.sanitiseCSV(a.distance || '')}"`,
            `"${this.sanitiseCSV(a.notes || '')}"`
        ].join(',');
    }).join("\n");

    const BOM = '\uFEFF';
    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(BOM + headers + rows);
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", `VCH_ActivityLog_${new Date().toISOString().split('T')[0]}.csv`);
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

                this.activityLog.push({
                    id: this.generateId(),
                    patientId: patient.id,
                    date: clean(parts[0]),
                    status: clean(parts[2]),
                    durationMins: clean(parts[3]),
                    distance: clean(parts[4]),
                    notes: clean(parts[5])
                });
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
    if (!this.syncopeLog || this.syncopeLog.length === 0) return alert("No syncope data to export.");

    const headers = "Date,Time,PatientName,Type,Duration,LOC,MuscleTone,ActivityBefore,MMColour,HR,RR,Notes\n";
    const rows = this.syncopeLog.map(s => {
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
    link.setAttribute("download", `VCH_SyncopeLog_${new Date().toISOString().split('T')[0]}.csv`);
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
    if (!this.weightLog || this.weightLog.length === 0) return alert("No weight data to export.");
    const headers = "Date,PatientName,Weight,Unit,Appetite,FoodBrand,PortionSize,Supplements,Notes\n";
    const rows = this.weightLog.map(w => {
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
    link.setAttribute("download", `VCH_WeightLog_${new Date().toISOString().split('T')[0]}.csv`);
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
                const weightValue = parseFloat(clean(parts[2]));
                if (isNaN(weightValue) || weightValue <= 0) { skipped++; continue; }
                this.weightLog.push({
                    id: this.generateId(),
                    patientId: patient.id,
                    date: clean(parts[0]),
                    weightValue,
                    appetite: clean(parts[4]) || 'Normal',
                    foodBrand: clean(parts[5]) || '',
                    portionSize: clean(parts[6]) || '',
                    supplements: clean(parts[7]) || '',
                    notes: clean(parts[8]) || ''
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
    if (!this.vaccinationLog || this.vaccinationLog.length === 0) return alert("No vaccination data to export.");
    const headers = "Date,PatientName,VaccineType,Components,BatchNumber,AdministeredBy,NextDueDate,Additionals,Notes\n";
    const rows = this.vaccinationLog.map(v => {
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
    link.setAttribute("download", `VCH_VaccinationLog_${new Date().toISOString().split('T')[0]}.csv`);
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
    if (!this.antiparasiticLog || this.antiparasiticLog.length === 0) return alert("No antiparasitic data to export.");
    const headers = "Date,PatientName,Product,IntervalDays,IntervalLabel,Covers,Partial,BatchNumber,AdministeredBy,NextDueDate,Notes\n";
    const rows = this.antiparasiticLog.map(a => {
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
    link.setAttribute("download", `VCH_AntiparasiticLog_${new Date().toISOString().split('T')[0]}.csv`);
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
    if (!this.diagnosisLog || this.diagnosisLog.length === 0) return alert("No diagnosis data to export.");

    const headers = "Date,PatientName,Diagnosis,CustomDiagnosis,MurmurGrade,ACVIMStage,ConcurrentDiagnoses,Notes\n";
    const rows = this.diagnosisLog.map(d => {
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
    link.setAttribute("download", `VCH_DiagnosisLog_${new Date().toISOString().split('T')[0]}.csv`);
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
        
exportCompleteBackup() {
const backupData = {
                vch_patients: this.patients,
                vch_weightLog: this.weightLog,
                vch_srrHistory: this.srrHistory,
                vch_medLedger: this.medLedger,
                vch_diagnosisLog: this.diagnosisLog,
                vch_syncopeLog: this.syncopeLog,
                vch_coughLog: this.coughLog,
                vch_activityLog: this.activityLog,
                vch_vaccinationLog: this.vaccinationLog,
                vch_antiparasiticLog: this.antiparasiticLog,
                exportDate: new Date().toISOString()
            };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const link = document.createElement("a");
    link.setAttribute("href", dataStr);
    link.setAttribute("download", `VCH_MasterBackup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    link.remove();
},


importCompleteBackup(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            
            // Check for the NEW keys matching your export
            if (
    Array.isArray(data.vch_patients) &&
    Array.isArray(data.vch_srrHistory) &&
    Array.isArray(data.vch_medLedger)
) {
                if (confirm("This will replace all current data with the backup file. Proceed?")) {
                    this.patients = data.vch_patients;
                    // Backfill module flags for legacy / restored profiles
                    this.patients.forEach(p => { p.modules = { ...this.defaultModules, ...(p.modules || {}) }; });
                    this.srrHistory = data.vch_srrHistory;
                    this.medLedger = data.vch_medLedger;
                    this.diagnosisLog = data.vch_diagnosisLog || [];
                    this.syncopeLog = data.vch_syncopeLog || [];
                    this.coughLog = data.vch_coughLog || [];
                    this.activityLog = data.vch_activityLog || [];
                    this.weightLog = data.vch_weightLog || [];
                    this.vaccinationLog = data.vch_vaccinationLog || [];
                    this.antiparasiticLog = data.vch_antiparasiticLog || [];

                    this.saveToStorage('vch_patients', this.patients);
                    this.saveToStorage('vch_srrHistory', this.srrHistory);
                    this.saveToStorage('vch_medLedger', this.medLedger);
                    this.saveToStorage('vch_diagnosisLog', this.diagnosisLog);
                    this.saveToStorage('vch_syncopeLog', this.syncopeLog);
                    this.saveToStorage('vch_coughLog', this.coughLog);
                    this.saveToStorage('vch_activityLog', this.activityLog);
                    this.saveToStorage('vch_weightLog', this.weightLog);
                    this.saveToStorage('vch_vaccinationLog', this.vaccinationLog);
                    this.saveToStorage('vch_antiparasiticLog', this.antiparasiticLog);
                    

                    if (this.patients.length > 0) this.activePatientId = this.patients[0].id; 
                    this.currentPage = 1;
                    this.$nextTick(() => { this.renderChart(); this.renderMedChart(); });
                    alert("Master Backup successfully restored!");
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
    reader.readAsText(file);
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
    doc.text(`${profile.name} — Clinical Report`, 14, 20);
 
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated: ${new Date().toLocaleDateString('en-GB')}  |  Period: ${this.vetExportTimeScaleLabel}`, 14, 28);
    doc.text(
        `Species: ${profile.species}  |  Breed: ${profile.breed || 'N/A'}  |  Age: ${this.computedAgeText}  |  Owner: ${profile.ownerName || 'N/A'}`,
        14, 34
    );
 
    doc.setDrawColor(200);
    doc.line(14, 37, 196, 37);
 
    let Y = 45; // Flowing Y cursor
 
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
        if (!canvas) return;
        const imgData   = this.getCanvasWithWhiteBackground(canvas);
        const ratio     = canvas.height / canvas.width;
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
            head: [['Date', 'Time', 'Rate (bpm)', 'Manual', 'Clinical Notes']],
            body: srrData.map(r => [
                new Date(r.date).toLocaleDateString('en-GB'),
                r.time || new Date(r.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                r.rate,
                r.isManual ? 'Yes' : 'No',
                r.comment || '—'
            ]),
            theme: 'striped',
            headStyles: { fillColor: [14, 116, 144] },
            columnStyles: { 0: { cellWidth: 26 }, 1: { cellWidth: 20 }, 2: { cellWidth: 24 }, 3: { cellWidth: 18 }, 4: { cellWidth: 'auto' } },
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
                        p ? `${p.daysLeft} d` : '—',
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
                    const name    = m.drugId === 'other' ? (m.customName || 'Custom') : (this.formulary[m.drugId]?.generic || m.drugId);
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
                    d.diagnosis === 'Other' ? (d.customDiagnosis || 'Other') : (d.diagnosis || '—'),
                    d.acvimStage || '—',
                    d.murmurGrade || '—',
                    (d.concurrentDiagnoses || []).join(', ') || '—',
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
                    a.distance || '—',
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
            embedCanvas(this.$refs.weightChartCanvas, 'Weight Trend Chart');
            if (Y > 240) { doc.addPage(); Y = 20; }
            sectionHeader('Weight & Diet Log', 15, 118, 110);
            const weightUnit = profile.weightUnit || 'kg';
            doc.autoTable({
                startY: Y,
                head: [['Date', `Weight (${weightUnit})`, 'Appetite', 'Food / Diet', 'Portion', 'Supplements', 'Notes']],
                body: weightData.map(w => [
                    (w.date || '').split('T')[0],
                    w.weightValue != null ? `${w.weightValue} ${weightUnit}` : '—',
                    w.appetite || '—',
                    w.foodBrand || '—',
                    w.portionSize || '—',
                    w.supplements || '—',
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
    csv += `${q('VetCardioHub Clinical Report')},${q(profile.name)}\n`;
    csv += `${q('Generated')},${q(new Date().toLocaleDateString('en-GB'))}\n`;
    csv += `${q('Period')},${q(this.vetExportTimeScaleLabel)}\n`;
    csv += `${q('Species')},${q(profile.species)}  ${q('Breed')},${q(profile.breed || '')}  ${q('Owner')},${q(profile.ownerName || '')}\n`;
    csv += '\n';
 
    // ── SRR Log ───────────────────────────────────────────────────────────
    const srrData = mods.srr
        ? this.srrHistory.filter(r => r.patientId === this.activePatientId && inRange(r.date)).sort((a, b) => new Date(a.date) - new Date(b.date))
        : [];
    if (srrData.length > 0) {
        csv += 'SRR LOG\n';
        csv += 'Date,Time,Rate (bpm),Manual,Clinical Notes\n';
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
            const name    = m.drugId === 'other' ? (m.customName || 'Custom') : (this.formulary[m.drugId]?.generic || m.drugId);
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
                q(d.diagnosis === 'Other' ? (d.customDiagnosis || 'Other') : (d.diagnosis || '')),
                q(d.acvimStage || ''),
                q(d.murmurGrade || ''),
                q((d.concurrentDiagnoses || []).join('; ')),
                q(d.notes || '')
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
        csv += 'Date,Status,Duration (mins),Distance,Notes\n';
        actData.forEach(a => {
            csv += [
                q(a.date),
                q(a.status || ''),
                a.durationMins || '',
                q(a.distance || ''),
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
    out += `VETCARDIOHUB CLINICAL REPORT — ${profile.name.toUpperCase()}${nl}`;
    out += `Generated : ${new Date().toLocaleDateString('en-GB')}${nl}`;
    out += `Period    : ${this.vetExportTimeScaleLabel}${nl}`;
    out += `Species   : ${profile.species}  |  Breed: ${profile.breed || 'N/A'}  |  Age: ${this.computedAgeText}${nl}`;
    out += `Owner     : ${profile.ownerName || 'N/A'}${nl}`;
    out += rule('═') + nl + nl;

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
                    out += `${nl}${indent}~${p.daysLeft}d left → ${p.reason === 'expiry' ? 'discard' : 'empty'} ${p.emptyDate}`;
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
                const name    = m.drugId === 'other' ? (m.customName || 'Custom') : (this.formulary[m.drugId]?.generic || m.drugId);
                const mgPerKg = (!m.isStopped && m.doseMg) ? this.computeHistoricMgPerKg(m.doseMg, m.patientId, m.eventDate) : '';
                out += `${m.eventDate}  |  ${action}: ${name}`;
                if (m.doseMg) out += `  |  ${m.doseMg}mg ${m.frequency || ''}`;
                if (mgPerKg)  out += `  (${mgPerKg} mg/kg)`;
                if (m.notes)  out += `${nl}${indent}Notes: ${m.notes}`;
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
                const diagName = d.diagnosis === 'Other' ? (d.customDiagnosis || 'Other') : (d.diagnosis || '');
                out += `${d.date}  |  ${diagName}`;
                if (d.acvimStage && d.acvimStage !== 'N/A') out += `  |  ACVIM: ${d.acvimStage}`;
                if (d.murmurGrade && d.murmurGrade !== 'N/A') out += `  |  Murmur: ${d.murmurGrade}`;
                if ((d.concurrentDiagnoses || []).length > 0) out += `${nl}${indent}Concurrent: ${d.concurrentDiagnoses.join(', ')}`;
                if (d.notes) out += `${nl}${indent}Notes: ${d.notes}`;
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
                if (a.distance)     out += `  |  ${a.distance}`;
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
                title: `${profile.name} — VetCardioHub Clinical Report`,
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


        
        exportPDF() {
            // Web-native PDF generation using the browser's print dialog.
            // Much lighter than adding jsPDF to the clinical stack.
            window.print(); 
        }
    }));
});