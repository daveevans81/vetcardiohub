document.addEventListener('alpine:init', () => {
    Alpine.data('rrTracker', () => ({
        // Absorb the Glossary Engine for tooltips 
        ...glossaryEngine, 

// --- CORE STATE ---



    
        showLog: true,
        showMedGraph: true,
        showAnalytics: true,
        srrUseRelationalTime: false,
        
        patients: [],    // Array of patient demographic objects
        weightLog: [],   // Array of weight entries over time
        srrHistory: [],  // Array of respiratory rate records
        medLedger: [],   // Array of medication events
        
        activePatientId: null, // UUID of the selected patient
        showPatientManager: false,
        showManualSrr: false,

        // Form bindings
        editingPatient: {}, 
        manualSrrInput: null,
        manualSrrDate: '',

        isCounting: false,
        timeLeft: 30,
        tapCount: 0,
        finalRate: null,
        timerInterval: null,
        hasSavedCurrentCount: false,

// --- SYMPTOM TRACKING STATE ---
        showSymptomLog: false,
        coughLog: [],
        activityLog: [],
        showCoughForm: false,     
        showActivityForm: false,
        showCoughOverlay: false,      
        showActivityOverlay: false,    
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

        // --- DIAGNOSIS & STAGING ---
primaryCardiacDiagnosis: '',
acvimStage: '', // Easily mutable without changing the primary diagnosis
concurrentDiagnoses: [], // Array to hold non-cardiac issues
newConcurrentDiagnosis: '', // v-model for the input field
        
newDiagnosis: {
    date: new Date().toISOString().split('T')[0],
    diagnosis: '',
    customDiagnosis: '', //  field for Other/Congenital
    murmurGrade: 'N/A',  //  field for Murmur Tracker
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

        // --- CHART & CONTROLS ---
        timeScale: '180d', // Default to 6 months
        customStartDate: '',
        customEndDate: '',
        showMedications: true,
        chartInstance: null,
        chartRenderTimeout: null,
        isChartExpanded: false,
        
        // Medication Module State
 
showMedLog: false, // Accordion toggle state
formulary: VET_FORMULARY, // Expose the global object to Alpine
newMed: {
    eventDate: new Date().toISOString().split('T')[0],
    drugId: '',
    customName: '',
    isStopped: false,   // replaces the action dropdown
    doseMg: '',
    frequency: 'q12h'
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
    // 1. ROBUST DATA LOAD: Prevents the "filter of undefined" crash
    try {
                this.patients = JSON.parse(localStorage.getItem('vch_patients')) || [];
                this.weightLog = JSON.parse(localStorage.getItem('vch_weightLog')) || [];
                this.srrHistory = JSON.parse(localStorage.getItem('vch_srrHistory')) || [];
                this.medLedger = JSON.parse(localStorage.getItem('vch_medLedger')) || [];
                this.diagnosisLog = JSON.parse(localStorage.getItem('vch_diagnosisLog')) || [];
                this.syncopeLog = JSON.parse(localStorage.getItem('vch_syncopeLog')) || [];
                this.coughLog = JSON.parse(localStorage.getItem('vch_coughLog')) || [];       
                this.activityLog = JSON.parse(localStorage.getItem('vch_activityLog')) || [];

            } catch(e) {
                this.patients = []; this.weightLog = []; this.srrHistory = []; this.medLedger = [];
                this.diagnosisLog = []; this.syncopeLog = []; this.coughLog = [];  this.activityLog = [];
            }

    // Set initial active patient safely
    if (this.patients.length > 0) {
        this.activePatientId = this.patients[0].id;
    } else {
        this.openPatientManager(true);
    }

    // 2. ACCORDION WATCHERS: Forces Chart.js to redraw *only* after Alpine makes the canvas visible
    this.$watch('showAnalytics', (isVisible) => { 
        if (isVisible) this.$nextTick(() => { this.renderChart(); }); 
    });
    this.$watch('showMedGraph', (isVisible) => { 
        if (isVisible) this.$nextTick(() => { this.renderMedChart(); }); 
    });

    // Existing watchers
    this.$watch('activePatientId', () => { this.currentPage = 1; this.renderChart(); this.renderMedChart(); });
    this.$watch('timeScale', () => { this.currentPage = 1; this.renderChart(); this.renderMedChart(); });
    this.$watch('srrUseRelationalTime', () => { this.renderChart(); });
    this.$watch('showCoughOverlay', () => { this.renderChart(); });
    this.$watch('showActivityOverlay', () => { this.renderChart(); });
    this.$watch('showMedications', () => { this.renderChart(); });
    this.$watch('activityPlotType', () => { this.renderChart(); });
    this.$watch('showSyncopeOverlay', () => { this.renderChart(); });
    this.$watch('showDiagnosisOverlay', () => { this.renderChart(); });
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
    
    this.$nextTick(() => { if (this.patients.length > 0) { this.renderChart(); this.renderMedChart(); } });
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
                                    
            this.coughLog = [];  this.activityLog = [];

            // 2. Persist the flushed arrays to local storage
            this.saveToStorage('vch_patients', this.patients);
            this.saveToStorage('vch_srrHistory', this.srrHistory);
            this.saveToStorage('vch_medLedger', this.medLedger);
            this.saveToStorage('vch_weightLog', this.weightLog);
            this.saveToStorage('vch_diagnosisLog', this.diagnosisLog);
            this.saveToStorage('vch_syncopeLog', this.syncopeLog);
            this.saveToStorage('vch_coughLog', this.coughLog);
            this.saveToStorage('vch_activityLog', this.activityLog);

            // 3. Reset application state
            if (this.patients.length > 0) {
                this.activePatientId = this.patients[0].id;
            } else {
                this.activePatientId = null;
                // Leave them in the creation screen if database is empty
                this.editingPatient = { id: this.generateId(), name: '', species: 'dog', weightUnit: 'kg', customSrrCutoff: 30 };
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
            const diffMs = Date.now() - dob.getTime();
            const ageDate = new Date(diffMs);
            const years = Math.abs(ageDate.getUTCFullYear() - 1970);
            return years > 0 ? `${years}y` : `< 1y`;
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

    // Destructure weight OUT before spreading to the patients array.
    // This avoids mutating editingPatient in place (which caused Alpine reactivity side-effects)
    // and ensures the transient weight field never persists on the patient demographic object.
    const { weight, ...patientData } = this.editingPatient;
    const currentWeightValue = parseFloat(weight);
    const patientIdToSave = patientData.id;

    const existingIndex = this.patients.findIndex(p => p.id === patientIdToSave);
    if (existingIndex > -1) {
        this.patients[existingIndex] = { ...patientData };
    } else {
        this.patients.push({ ...patientData });
    }

    if (!isNaN(currentWeightValue) && currentWeightValue > 0) {
        this.logWeight(patientIdToSave, currentWeightValue);
    }

    this.saveToStorage('vch_patients', this.patients);
    this.activePatientId = patientIdToSave;
    this.closePatientManager();
},
        
        logWeight(patientId, value) {
            // Only add a new log entry if the weight actually changed today
            const today = new Date().toISOString().split('T')[0];
            const recent = this.weightLog.find(w => w.patientId === patientId && w.date.startsWith(today));
            
            if (recent) {
                recent.weightValue = value; // Update today's entry
            } else {
                this.weightLog.push({ id: this.generateId(), patientId, date: new Date().toISOString(), weightValue: value });
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
            this.saveToStorage('vch_patients', this.patients);
            

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
                    customSrrCutoff: 30
                };
            } else {
                const target = this.patients.find(p => p.id === patientId);
                // Extract latest weight for the form
                const weights = this.weightLog.filter(w => w.patientId === patientId).sort((a, b) => new Date(b.date) - new Date(a.date));
                this.editingPatient = { ...target, weight: weights.length > 0 ? weights[0].weightValue : null };
            }
        },
        
        closePatientManager() {
            this.showPatientManager = false;
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
        // Getters dor diagnosis and syncope logic
        
        get currentClinicalStatus() {
            if (!this.activePatientId) return null;
            const history = this.diagnosisLog
                .filter(d => d.patientId === this.activePatientId)
                .sort((a, b) => new Date(b.date) - new Date(a.date));
            return history.length > 0 ? history[0] : null;
        },

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
        
saveDiagnosis() {
    if (!this.newDiagnosis.diagnosis || this.newDiagnosis.diagnosis.trim() === '') {
        alert("Primary Cardiac Diagnosis is required.");
        return;
    }

    const entryToSave = {
        id: this.editingDiagnosisId || crypto.randomUUID(),
        patientId: this.activePatientId, // CRITICAL BUG FIX
        date: this.newDiagnosis.date,
        diagnosis: this.newDiagnosis.diagnosis,
        customDiagnosis: this.newDiagnosis.customDiagnosis, // Save the new field
        murmurGrade: this.newDiagnosis.murmurGrade,         // Save the new field
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

    this.diagnosisLog.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    if (this.diagnosisLog.length > 0) {
        this.primaryCardiacDiagnosis = this.diagnosisLog[0].diagnosis;
        this.acvimStage = this.diagnosisLog[0].acvimStage;
    }

    this.saveToStorage('vch_diagnosisLog', this.diagnosisLog);
    this.showDiagnosisForm = false;
},

// --- DIAGNOSIS LOGIC ---
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

addConcurrentDiagnosis() {
    if (this.newConcurrentDiagnosis && this.newConcurrentDiagnosis.trim() !== '') {
        if (!this.newDiagnosis.concurrentDiagnoses) this.newDiagnosis.concurrentDiagnoses = [];
        this.newDiagnosis.concurrentDiagnoses.push(this.newConcurrentDiagnosis.trim());
        this.newConcurrentDiagnosis = ''; // Clear input after adding
    }
},

removeConcurrentDiagnosis(index) {
    if (this.newDiagnosis.concurrentDiagnoses) {
        this.newDiagnosis.concurrentDiagnoses.splice(index, 1);
    }
},

deleteDiagnosis(id) {
    if (confirm("Are you sure you want to delete this diagnosis entry?")) {
        this.diagnosisLog = this.diagnosisLog.filter(d => d.id !== id);
        this.saveToStorage('vch_diagnosisLog', this.diagnosisLog);
    }
},
        
        //ACVIM Staging Logic
        
                // Computed property to determine if staging is clinically relevant
isStagingApplicable() {
    if (!this.primaryCardiacDiagnosis) return false;
    const diag = this.primaryCardiacDiagnosis.toLowerCase();
    return diag.includes('mmvd') || diag.includes('mitral') || diag.includes('degenerative')|| diag.includes('DMVD')|| 
           diag.includes('hcm') || diag.includes('dcm');
},

get currentDiagnosis() {

    const entries = this.diagnosisLog
        .filter(d => d.petName === this.selectedPet?.name)
        .sort((a,b) =>
            new Date(b.date) - new Date(a.date)
        );

    return entries.length
        ? entries[0].diagnosis
        : null;
},

addConcurrentDiagnosis() {
    if (this.newConcurrentDiagnosis.trim() !== '') {
        this.concurrentDiagnoses.push(this.newConcurrentDiagnosis.trim());
        this.newConcurrentDiagnosis = '';
    }
},

removeConcurrentDiagnosis(index) {
    this.concurrentDiagnoses.splice(index, 1);
},

        get stageProgression() {
    const history = this.diagnosisLog
        .filter(d => d.patientId === this.activePatientId && d.acvimStage && d.acvimStage !== 'N/A')
        .sort((a,b) => new Date(a.date) - new Date(b.date));
    return history.map(entry => ({
        stage: entry.acvimStage,
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

    const diagnosis = this.primaryCardiacDiagnosis;

    if (!diagnosis) return null;

    if (diagnosis.startsWith('MMVD')) {
        return ACVIM_PATHWAYS.MMVD;
    }

    if (diagnosis.startsWith('HCM')) {
        return ACVIM_PATHWAYS.HCM;
    }

    if (diagnosis.startsWith('DCM')) {
        return ACVIM_PATHWAYS.DCM;
    }

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
    let html = '';
    // 1. CONNECTING ARROW
    html += `
        <line x1="110" y1="90" x2="890" y2="90" stroke="#cbd5e1" stroke-width="10" stroke-linecap="round" />
        <polygon points="890,75 930,90 890,105" fill="#cbd5e1" />
    `;
    // 2. STAGES
    this.activePathway.stages.forEach(stage => {
        const x = this.stageX(stage.id);
        const isCurrent = this.isCurrentStage(stage.id);
        
        let fill = '#dc2626'; // default
        if(stage.id === 'Normal') fill = '#65a30d';
        else if(stage.id === 'B1') fill = '#84cc16';
        else if(stage.id === 'B2') fill = '#ca8a04';
        else if(stage.id === 'C') fill = '#d97706';
        
        const stroke = isCurrent ? '#2563eb' : 'white';
        const strokeWidth = isCurrent ? 8 : 2;
        html += `
            <g>
                <circle cx="${x}" cy="90" r="60" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" />
                <text x="${x}" y="80" text-anchor="middle" fill="white" font-size="32" font-weight="bold">${stage.label}</text>
                <text x="${x}" y="110" text-anchor="middle" fill="white" font-size="14">
                    <tspan>${stage.subtitle || ''}</tspan>
                </text>
            </g>
        `;
    });
    // 3. TRANSITION DATE MARKERS
    this.stageProgression.forEach(transition => {
        const x = this.stageX(transition.stage);
        // Avoid "Invalid Date" errors
        if(transition.date) {
            const dateStr = new Date(transition.date).toLocaleDateString();
            html += `
                <g>
                    <line x1="${x}" y1="150" x2="${x}" y2="175" stroke="#2563eb" stroke-width="3" />
                    <circle cx="${x}" cy="150" r="6" fill="#2563eb" />
                    <text x="${x}" y="195" text-anchor="middle" font-size="12" fill="#475569">${dateStr}</text>
                </g>
            `;
        }
    });
    // 4. CURRENT STAGE INDICATOR
    const current = this.currentStage;
    if (current) {
        const cx = this.stageX(current.stage);
        html += `
            <g>
                <polygon points="${cx-30},10 ${cx+30},10 ${cx},35" fill="#2563eb" />
                <text x="${cx}" y="23" text-anchor="middle" font-size="11" fill="white" font-weight="bold">CURRENT</text>
            </g>
        `;
    }
    // 5. TREATMENT BANDS
    const bands = this.activePathway.treatmentBands || [];
    bands.forEach(band => {
        const startX = this.stageX(band.startStage);
        const yBase = band.label.includes('Vetmedin') ? 215 : 245;
        const width = 930 - startX;
        html += `
            <g>
                <rect x="${startX}" y="${yBase}" width="${width}" height="24" rx="12" fill="#dbeafe" stroke="#93c5fd" />
                <text x="${startX + 20}" y="${yBase + 16}" font-size="12" fill="#1e3a8a" font-weight="bold">${band.label}</text>
            </g>
        `;
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

const entryToSave = {
    id: this.editingSyncopeId || crypto.randomUUID(),
    patientId: this.activePatientId, // Binds event to the current patient
    date: this.newSyncope.date,
    time: this.newSyncope.time,

    if (this.editingSyncopeId) {
        const index = this.syncopeLog.findIndex(s => s.id === this.editingSyncopeId);
        if (index !== -1) this.syncopeLog[index] = entryToSave;
    } else {
        this.syncopeLog.push(entryToSave);
    }

    this.syncopeLog.sort((a, b) => new Date(b.date) - new Date(a.date));
    this.saveToStorage('vch_syncopeLog', this.syncopeLog);
    this.showSyncopeForm = false;
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
        
// Dynamic mg/kg Calculator (with strict null/clinical safety checks)
calculatedMgPerKg() {
    const profile = this.activePatientProfile;  // fix: was activePetProfile
    if (!profile) return null;

    const weights = this.weightLog
        .filter(w => w.patientId === this.activePatientId)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const latestWeight = weights.length > 0 ? parseFloat(weights[0].weightValue) : null;
    const dose = parseFloat(this.newMed.doseMg);

    if (!latestWeight || isNaN(dose) || latestWeight <= 0 || isNaN(latestWeight)) return null;

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
            return new Date(); // Absolute fallback
        },
        
startCount() {
            if (!this.activePatientId) return alert("Please establish or select a patient profile first.");
            this.isCounting = true;
            this.tapCount = 0;
            this.timeLeft = 30;
            this.finalRate = null;
            this.hasSavedCurrentCount = false; // Reset the save state

            this.timerInterval = setInterval(() => {
                this.timeLeft--;
                if (this.timeLeft <= 0) this.finishCount();
            }, 1000);
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
    if (!this.newMed.isStopped && (this.newMed.doseMg === '' || this.newMed.doseMg === null || this.newMed.doseMg === undefined)) {
        return alert("Clinical Entry Error: Please specify the dose.");
    }

    const entry = {
        id: this.generateId(),
        patientId: this.activePatientId,
        eventDate: this.newMed.eventDate,
        drugId: this.newMed.drugId,
        customName: this.newMed.drugId === 'other' ? this.newMed.customName : null,
        isStopped: this.newMed.isStopped,                                    // raw intent stored
        doseMg: this.newMed.isStopped ? null : parseFloat(this.newMed.doseMg),
        frequency: this.newMed.isStopped ? null : this.newMed.frequency,
        mgPerKg: this.newMed.isStopped ? null : this.calculatedMgPerKg(),
    };

    this.medLedger.push(entry);
    this.saveToStorage('vch_medLedger', this.medLedger);
    this.renderMedChart();

    this.newMed = {
        eventDate: this.newMed.eventDate,
        drugId: '',
        customName: '',
        isStopped: false,
        doseMg: '',
        frequency: 'q12h'
    };
},

getComputedAction(entry) {
    if (entry.isStopped) return 'Stopped';

    // Get all non-stopped entries for this drug+patient, sorted oldest first
    const priorEntries = this.medLedger
        .filter(m =>
            m.patientId === entry.patientId &&
            m.drugId === entry.drugId &&
            !m.isStopped &&
            new Date(m.eventDate) < new Date(entry.eventDate)
        );

    // Was there a 'Stopped' entry between the last dose entry and this one?
    const lastStop = this.medLedger
        .filter(m =>
            m.patientId === entry.patientId &&
            m.drugId === entry.drugId &&
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

            const isEquivocal = profile.species === 'cat' 
                ? (rate >= 30 && rate < 40) 
                : (rate >= 30 && rate < 40);

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
        
        
getFilteredMedications() {
    if (!this.medLedger || this.medLedger.length === 0) return [];
    const { startDate, endDate } = this.getDateRange();
    
    return this.medLedger.filter(med => {
        if (!startDate) return true;
        const medDate = this.parseDateSafe(med.eventDate); // Fixed property name
        return medDate >= startDate && medDate <= endDate;
    });
},
        
        
        // --- DATA MANAGEMENT ---
        
resetData() {
            if (window.confirm("CRITICAL WARNING: This action permanently clears ALL local data. Proceed?")) {
                // ... your storage clearing logic ...
                
                // Native destroy calls
                const rrrChart = Chart.getChart(this.$refs.rrrChartCanvas);
                if (rrrChart) rrrChart.destroy();
                
                const medChart = Chart.getChart(this.$refs.medChartCanvas);
                if (medChart) medChart.destroy();
                
                alert("Database completely flushed.");
            }
        },
        
        get filteredStats() {
    const data = this.getFilteredReadings();
    if (data.length < 2) return null;
    return this.calculateStats(data);
},
        
        calculateStats(data) {
            if (!data || data.length === 0) return { mean: 0, upperCI: 0, lowerCI: 0 };
            
            const n = data.length;
            const mean = data.reduce((sum, val) => sum + val.rate, 0) / n;
            
            // Calculate Standard Deviation
            const variance = data.reduce((sum, val) => sum + Math.pow(val.rate - mean, 2), 0) / (n - 1 || 1);
            const sd = Math.sqrt(variance);
            
            // Standard Error
            const se = sd / Math.sqrt(n);
            const marginOfError = 1.96 * se;

            return {
                mean: mean,
                upperCI: mean + marginOfError,
                lowerCI: mean - marginOfError
            };
        },
        
                // --- CHARTING FUNCTIONS ---
                
toggleChartExpansion() {
            this.isChartExpanded = !this.isChartExpanded;
            
            this.$nextTick(() => {
                // Grab the chart directly from the DOM element to resize it
                const chart = Chart.getChart(this.$refs.rrrChartCanvas);
                if (chart) chart.resize();
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

        // --- 5. EXTRACT CHART DATASETS ---
        const labels = [];
        const srrDataPoints = [], srrTooltips = [];
        const medDataPoints = [], medColors = [], medTooltips = [];
        const coughDataPoints = [], coughColors = [], coughTooltips = [];
        const activityDataPoints = [], activityTooltips = [];
        const syncDataPoints = [], syncTooltips = [];
        const diagDataPoints = [], diagTooltips = [];

        let lastSrrRate = null; 
        const srrValuesForStats = []; 

        combinedEvents.forEach(ev => {
            const dObj = new Date(ev.timestamp);
            let label = '';
            if (combinedEvents.length <= 14) label = dObj.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' });
            else if (combinedEvents.length <= 60) label = dObj.toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
            else label = dObj.toLocaleDateString(undefined, { month: 'short', year: '2-digit' });
            
            labels.push(this.srrUseRelationalTime ? ev.timestamp : label);

            // Initialize empty states
            let srrVal = null, sTip = null;
            let medVal = null, mCol = 'transparent', mTip = [];
            let coughVal = null, cCol = 'transparent', cTip = '';
            let actVal = null, aTip = '';
            let syncVal = null, syTip = '';
            let diagVal = null, dTip = '';

            if (ev.type === 'srr') {
                srrVal = ev.data.rate;
                srrValuesForStats.push(ev.data);
                lastSrrRate = ev.data.rate;
                sTip = `Rate: ${srrVal} bpm${ev.data.readingCount > 1 ? ` (Mean of ${ev.data.readingCount})` : ''}`;
            } 
            else if (ev.type === 'med') {
                medVal = lastSrrRate !== null ? lastSrrRate : 30; 
                mCol = this.formulary[ev.data[0].drugId]?.color || '#f59e0b';
                mTip = ev.data.map(m => `💊 ${m.action}: ${m.drugId === 'other' ? m.customName : (this.formulary[m.drugId]?.generic || m.drugId)} (${m.doseMg ? m.doseMg+'mg' : '?'})`);
            }
            else if (ev.type === 'syncope') {
                syncVal = lastSrrRate !== null ? lastSrrRate : 30;
                syTip = `⚠️ Syncope Episode\nNotes: ${ev.data.notes || ev.data.context || 'Recorded collapse/fainting'}`;
            }
            else if (ev.type === 'diagnosis') {
                diagVal = lastSrrRate !== null ? lastSrrRate : 30;
                const diagName = ev.data.diagnosis || ev.data.stage || ev.data.title || 'Status Update';
                dTip = `🩺 Clinical Update: ${diagName}\n${ev.data.notes ? 'Notes: ' + ev.data.notes : ''}`;
            }
            else if (ev.type === 'cough') {
                const c = ev.data;
                let cpd = parseFloat(c.frequencyCount);
                if (!isNaN(cpd)) {
                    if (c.frequencyPeriod === 'hour') cpd *= 24;
                    if (c.frequencyPeriod === 'week') cpd /= 7;
                    coughVal = Math.round(cpd * 10) / 10;
                } else { coughVal = 1; } 
                
                if (c.severity === 'Severe') cCol = 'rgba(239, 68, 68, 0.85)';
                else if (c.severity === 'Moderate') cCol = 'rgba(245, 158, 11, 0.85)';
                else cCol = 'rgba(253, 224, 71, 0.85)';
                
                cTip = `Cough (${c.severity}): ${isNaN(parseFloat(c.frequencyCount)) ? 'Freq Unknown' : c.frequencyCount+'x/'+c.frequencyPeriod} - ${c.description}`;
            }
            else if (ev.type === 'activity') {
                const a = ev.data;
                if (this.activityPlotType === 'durationMins' && a.durationMins) actVal = parseFloat(a.durationMins);
                else if (this.activityPlotType === 'distance' && a.distance) {
                    const parsed = parseFloat(a.distance.replace(/[^\d.]/g, ''));
                    if (!isNaN(parsed)) actVal = parsed;
                }
                if (actVal !== null) aTip = `Activity (${a.status}): ${this.activityPlotType === 'durationMins' ? a.durationMins+'m' : a.distance}`;
            }

            srrDataPoints.push(srrVal); srrTooltips.push(sTip);
            medDataPoints.push(medVal); medColors.push(mCol); medTooltips.push(mTip);
            coughDataPoints.push(coughVal); coughColors.push(cCol); coughTooltips.push(cTip);
            activityDataPoints.push(actVal); activityTooltips.push(aTip);
            syncDataPoints.push(syncVal); syncTooltips.push(syTip);
            diagDataPoints.push(diagVal); diagTooltips.push(dTip);
        });

        const stats = this.calculateStats(srrValuesForStats);
        
        let annotations = {
            thresholdLine: { type: 'line', yMin: 30, yMax: 30, scaleID: 'y', borderColor: 'rgb(220, 38, 38)', borderWidth: 2, borderDash: [5, 5], label: { display: true, content: 'Cutoff (30)', position: 'end', backgroundColor: 'rgba(220,38,38,0.8)', color: '#fff' } },
            meanLine: { type: 'line', yMin: stats.mean, yMax: stats.mean, scaleID: 'y', borderColor: 'rgb(59, 130, 246)', borderWidth: 1.5, label: { display: true, content: `Mean: ${stats.mean.toFixed(1)}`, position: 'start' } }
        };

        const datasets = [
            {
                label: `${this.activePatientProfile?.name ?? 'Patient'}'s Respiratory Rate (bpm)`,
                data: srrDataPoints, srrTooltips: srrTooltips,
                borderColor: 'rgb(14, 165, 233)', backgroundColor: 'rgba(14, 165, 233, 0.08)',
                tension: 0.25, pointRadius: combinedEvents.length > 30 ? 2 : 5,
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
                        id: this.generateId(), // CRITICAL: Generate the relational UUID
                        name: csvPetName, 
                        species: species, 
                        age: null,
                        weight: null,
                        weightUnit: 'kg',
                        customSrrCutoff: 30
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
            species: 'dog',       // Default — owner can edit profile afterwards
            age: null,
            weight: null,
            weightUnit: 'kg',
            customSrrCutoff: 30
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

        
        // --- MEDICATION CSV MANAGEMENT ---
exportMedicationsCSV() {
    if (!this.medLedger || this.medLedger.length === 0) 
        return alert("No medication data to export.");

    const headers = "Date,PatientName,DrugId,GenericName,CustomName,Dose(mg),Frequency,mg/kg,isStopped\n";
    
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
            med.isStopped ? 'true' : 'false'
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

                // Resolve patient by name — do not auto-create for medication imports
                const patient = this.patients.find(
                    p => p.name.toLowerCase() === patientName.toLowerCase()
                );
                if (!patient) { skipped++; continue; }

                // Validate: active entries must have a parseable dose
                if (!isStopped && isNaN(doseMg)) { skipped++; continue; }

                this.medLedger.push({
                    id: this.generateId(),
                    eventDate,
                    patientId:  patient.id,
                    drugId,
                    customName: customName || '',
                    doseMg:     isStopped ? null : doseMg,
                    frequency:  isStopped ? null : (frequency || 'q12h'),
                    mgPerKg:    isStopped ? null : (isNaN(mgPerKg) ? null : mgPerKg),
                    isStopped
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
                    this.srrHistory = data.vch_srrHistory;
                    this.medLedger = data.vch_medLedger;
                    this.diagnosisLog = data.vch_diagnosisLog;
                    this.syncopeLog = data.vch_syncopeLog;
                    this.coughLog = data.vch_coughLog;
                    this.activityLog = data.vch_activityLog;
                    this.weightLog = data.vch_weightLog || [];

                    this.saveToStorage('vch_patients', this.patients);
                    this.saveToStorage('vch_srrHistory', this.srrHistory);
                    this.saveToStorage('vch_medLedger', this.medLedger);
                    this.saveToStorage('vch_diagnosisLog', this.diagnosisLog);
                    this.saveToStorage('vch_syncopeLog', this.syncopeLog);
                    this.saveToStorage('vch_coughLog', this.coughLog);
                    this.saveToStorage('vch_activityLog', this.activityLog);
                    this.saveToStorage('vch_weightLog', this.weightLog);
                    

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


    generatePDF() {
        if (!this.activePatientId) return alert("Select a patient first.");
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const profile = this.activePatientProfile;
        const timeline = this.compiledTimeline;
    
        // 1. Header
        doc.setFontSize(20);
        doc.text(`${profile.name}'s Clinical Report`, 14, 20);
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`Generated: ${new Date().toLocaleDateString()} | Timescale: ${this.timeScale.toUpperCase()}`, 14, 28);
        doc.text(`Species: ${profile.species} | Breed: ${profile.breed || 'N/A'} | Age: ${this.computedAgeText}`, 14, 34);
    
        // 2. Embed the Respiratory Chart
        const rrrCanvas = this.$refs.rrrChartCanvas;
        if (rrrCanvas) {
            const rrrImgData = this.getCanvasWithWhiteBackground(rrrCanvas);
            doc.addImage(rrrImgData, 'JPEG', 14, 45, 180, 70); 
        }
    
        // 3. Embed the Medication Chart (Only if data exists and is visible)
        const medCanvas = this.$refs.medChartCanvas;
        if (this.hasAnyMedData() && medCanvas) {
            const medImgData = this.getCanvasWithWhiteBackground(medCanvas);
            // Position it below the first chart
            doc.addImage(medImgData, 'JPEG', 14, 120, 180, 50); 
        }
    
        // 4. Generate the Data Table
        // Adjust startY so the table doesn't overlap the new chart
        const tableBody = timeline.map(ev => [
            ev.displayDate,
            ev.type,
            ev.summary,
            ev.notes
        ]);
    
        doc.autoTable({
            startY: 175, // Moved down to accommodate both charts
            head: [['Date', 'Category', 'Summary', 'Clinical Notes']],
            body: tableBody,
            theme: 'striped',
            headStyles: { fillColor: [22, 50, 95] },
            columnStyles: {
                0: { cellWidth: 30 },
                1: { cellWidth: 25 },
                2: { cellWidth: 45 },
                3: { cellWidth: 'auto' }
            },
            styles: { fontSize: 9 }
        });
    
        doc.save(`${profile.name}_Cardio_Report.pdf`);
    },

        generateCSV() {
            if (!this.activePatientId) return;
            const timeline = this.compiledTimeline;
            
            let csvContent = "data:text/csv;charset=utf-8,";
            csvContent += "Date,Category,Summary,Notes\n";
            
            timeline.forEach(ev => {
                // Escape commas and quotes for safe CSV output
                const safeNotes = ev.notes ? `"${ev.notes.replace(/"/g, '""')}"` : "";
                const safeSummary = ev.summary ? `"${ev.summary.replace(/"/g, '""')}"` : "";
                csvContent += `${ev.displayDate},${ev.type},${safeSummary},${safeNotes}\n`;
            });

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `${this.activePatientProfile.name}_Report.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },

        copyToClipboard() {
            if (!this.activePatientId) return;
            const timeline = this.compiledTimeline;
            
            let textOutput = `CLINICAL REPORT: ${this.activePatientProfile.name}\n`;
            textOutput += `Generated: ${new Date().toLocaleDateString()}\n`;
            textOutput += `-------------------------------------------\n\n`;

            timeline.forEach(ev => {
                textOutput += `[${ev.displayDate}] ${ev.type.toUpperCase()}: ${ev.summary}\n`;
                if (ev.notes) textOutput += `   Notes: ${ev.notes}\n`;
                textOutput += `\n`;
            });

            navigator.clipboard.writeText(textOutput).then(() => {
                alert("Clinical timeline copied to clipboard!");
            }).catch(err => {
                console.error("Could not copy text: ", err);
                alert("Failed to copy to clipboard.");
            });
        },
        
        exportPDF() {
            // Web-native PDF generation using the browser's print dialog.
            // Much lighter than adding jsPDF to the clinical stack.
            window.print(); 
        }
    }));
});