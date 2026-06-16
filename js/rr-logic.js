document.addEventListener('alpine:init', () => {
    Alpine.data('rrTracker', () => ({
        // Absorb the Glossary Engine for tooltips 
        ...glossaryEngine, 

// --- CORE STATE ---



    
        showLog: true,
        showMedGraph: true,
        showAnalytics: true,
        
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
    eventDate: new Date().toISOString().split('T')[0], // Defaults to today YYYY-MM-DD
    drugId: '',
    customName: '',
    action: 'Started', // 'Started', 'Adjusted', 'Stopped'
    doseMg: '',
    frequency: 'q12h'
},

        // Medication Chart State
        medTimeScale: '180d', 
        medChartInstance: null,
        medCustomStartDate: '',
        medCustomEndDate: '',
        medChartRenderTimeout: null,


// Generate robust UUID (Fallback for older browsers just in case)
        generateId() {
            if (window.crypto && window.crypto.randomUUID) return crypto.randomUUID();
            return 'vch-' + Date.now().toString(36) + Math.random().toString(36).substr(2);
        },
        
init() {
            // Load Relational DB
            this.patients = JSON.parse(localStorage.getItem('vch_patients') || '[]');
            this.weightLog = JSON.parse(localStorage.getItem('vch_weightLog') || '[]');
            this.srrHistory = JSON.parse(localStorage.getItem('vch_srrHistory') || '[]');
            this.medLedger = JSON.parse(localStorage.getItem('vch_medLedger') || '[]');

            // Set initial active patient safely
            if (this.patients.length > 0) {
                this.activePatientId = this.patients[0].id;
            } else {
                this.openPatientManager(true);
            }

            // Watchers: Watch activePatientId instead of name
            this.$watch('activePatientId', () => { this.currentPage = 1; this.renderChart(); this.renderMedChart(); });
            this.$watch('timeScale', () => { this.currentPage = 1; this.renderChart(); });
            
            this.$nextTick(() => { if (this.patients.length > 0) { this.renderChart(); this.renderMedChart(); } });
        },
        
        // --- PET MANAGEMENT ---
        
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

            // Find if existing
            const existingIndex = this.patients.findIndex(p => p.id === this.editingPatient.id);
            
            // Extract the weight before saving demographics
            const currentWeightValue = parseFloat(this.editingPatient.weight);
            delete this.editingPatient.weight; // We don't store weight directly on the patient object anymore

            if (existingIndex > -1) {
                this.patients[existingIndex] = { ...this.editingPatient };
            } else {
                this.patients.push({ ...this.editingPatient });
            }

            // Log weight if changed
            if (!isNaN(currentWeightValue)) {
                this.logWeight(this.editingPatient.id, currentWeightValue);
            }

            localStorage.setItem('vch_patients', JSON.stringify(this.patients));
            this.activePatientId = this.editingPatient.id;
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
            localStorage.setItem('vch_weightLog', JSON.stringify(this.weightLog));
        },
        
        // --- DATA MERGING ALGORITHM ---
        
        mergePatients(targetId, sourceId) {
            if (!confirm("CRITICAL: Merge all clinical logs from the source patient into the target patient? The source profile will be deleted. This cannot be undone.")) return;

            // Reassign IDs across all normalized arrays
            this.weightLog = this.weightLog.map(w => w.patientId === sourceId ? { ...w, patientId: targetId } : w);
            this.srrHistory = this.srrHistory.map(s => s.patientId === sourceId ? { ...s, patientId: targetId } : s);
            this.medLedger = this.medLedger.map(m => m.patientId === sourceId ? { ...m, patientId: targetId } : m);

            // Delete Source Patient
            this.patients = this.patients.filter(p => p.id !== sourceId);

            // Save state
            localStorage.setItem('vch_weightLog', JSON.stringify(this.weightLog));
            localStorage.setItem('vch_srrHistory', JSON.stringify(this.srrHistory));
            localStorage.setItem('vch_medLedger', JSON.stringify(this.medLedger));
            localStorage.setItem('vch_patients', JSON.stringify(this.patients));

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
    if (!this.activePetProfile || !this.activePetProfile.weight || !this.newMed.doseMg) return null;
    
    let weight = parseFloat(this.activePetProfile.weight);
    let dose = parseFloat(this.newMed.doseMg);
    
    // Prevent division by zero or NaN cascade
    if (isNaN(weight) || isNaN(dose) || weight <= 0) return null;

    let weightInKg = this.activePetProfile.weightUnit === 'lbs' ? weight / 2.2046 : weight;
    return (dose / weightInKg).toFixed(2);
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
            this.saveToHistory();
        },
        
        // Save function for the Ledger
addMedication() {
    if (!this.activePatientId) return alert("Clinical Entry Error: No patient selected.");
    if (!this.newMed.drugId || !this.newMed.doseMg) return alert("Clinical Entry Error: Please select a medication and specify the dose.");

    const isMajor = ['Started', 'Stopped'].includes(this.newMed.action);

    const entry = {
        id: this.generateId(), 
        patientId: this.activePatientId, // UPDATED to relational ID
        eventDate: this.newMed.eventDate,
        drugId: this.newMed.drugId,
        customName: this.newMed.drugId === 'other' ? this.newMed.customName : null,
        action: this.newMed.action,
        doseMg: parseFloat(this.newMed.doseMg),
        frequency: this.newMed.frequency,
        mgPerKg: this.calculatedMgPerKg(), 
        isMajorChange: isMajor
    };

    this.medLedger.push(entry);
    localStorage.setItem('vch_medLedger', JSON.stringify(this.medLedger));
    this.renderMedChart();

    this.newMed = { eventDate: this.newMed.eventDate, drugId: '', customName: '', action: 'Started', doseMg: '', frequency: 'q12h' };
},



        
// Sort ledger chronologically (newest first) to avoid Alpine array freezing
sortedMedLedger() {
    return [...this.medLedger].sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));
},

deleteMedication(id) {
    if(confirm("Delete this medication entry? This will remove it from the patient's historical chart.")) {
        this.medLedger = this.medLedger.filter(med => med.id !== id);
        localStorage.setItem('vch_medLedger', JSON.stringify(this.medLedger));
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
            if (isNaN(dateObj.getTime())) dateObj = new Date(); // Fallback

            // Determine equivocal status based on patient species
            const isEquivocal = profile.species === 'cat' 
                ? (rate >= 30 && rate < 40) 
                : (rate >= 25 && rate < 35);

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

            this.srrHistory.unshift(newLog); // Newest first
            localStorage.setItem('vch_srrHistory', JSON.stringify(this.srrHistory));

            this.finalRate = null;
            this.tapCount = 0;
            this.currentPage = 1;
            
            this.$nextTick(() => { this.renderChart(); });
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
            let rate = this.finalRate;
            const species = this.currentSpecies; // FIXED: Pull dynamically from active patient context

            if (rate >= 40) {
                return { status: 'danger', title: 'Action Required', text: 'Resting rate is significantly elevated. Contact your veterinary surgeon.' };
            }
            if (species === 'dog' && rate >= 30 && rate < 40) {
                return { status: 'equivocal', title: 'Equivocal (Borderline)', text: 'This rate is borderline high. Please recount in 2-4 hours while the dog is in deep sleep.' };
            }
            if (species === 'cat' && rate >= 35 && rate < 40) {
                return { status: 'equivocal', title: 'Equivocal (Borderline)', text: 'Cats can occasionally rest at this rate, but it is borderline. Recount in 2 hours.' };
            }
            return { status: 'normal', title: 'Normal Range', text: 'Resting respiratory rate is within normal expected limits.' };
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
        get paginatedHistory() {
            // We reverse the filtered readings back to Newest-First for the list view
            const listData = [...this.getFilteredReadings()].reverse(); 
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
            if (!this.srrHistory || this.srrHistory.length === 0 || !this.activePatientId) return [];
            
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
    if (window.confirm("CRITICAL WARNING: This action permanently clears ALL local patient profiles, logs, and tracking history. Proceed?")) {
        this.srrHistory = [];
        this.patients = [];
        this.medLedger = [];
        this.weightLog = [];
        this.activePatientId = null;
        
        localStorage.removeItem('vch_patients');
        localStorage.removeItem('vch_srrHistory');
        localStorage.removeItem('vch_medLedger');
        localStorage.removeItem('vch_weightLog');
        
        if (this.chartInstance) this.chartInstance.destroy();
        if (this.medChartInstance) this.medChartInstance.destroy();
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
            
            // We must wait for Alpine to apply the fullscreen CSS class, 
            // then explicitly tell Chart.js to redraw to fit the new massive container.
            this.$nextTick(() => {
                if (this.chartInstance) {
                    this.chartInstance.resize();
                }
            });
        },
                
renderChart() {
            if (this.chartRenderTimeout) clearTimeout(this.chartRenderTimeout);

            this.chartRenderTimeout = setTimeout(() => {
                if (!this.$refs.rrrChartCanvas) return;

                const rawSrrData = this.getFilteredReadings();
                const ctx = this.$refs.rrrChartCanvas.getContext('2d');

                if (this.chartInstance) {
                    this.chartInstance.destroy();
                    this.chartInstance = null;
                }

                if (rawSrrData.length === 0) return;

                // --- 1. ROBUST DATE NORMALIZATION ---
                // Defeats the UTC Midnight Timezone drop by forcing pure dates to local Midday
                const safeTimestamp = (dateStr) => {
                    if (!dateStr) return new Date().getTime();
                    // If it's a pure YYYY-MM-DD from the Med Input form
                    if (typeof dateStr === 'string' && dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
                        return new Date(`${dateStr}T12:00:00`).getTime(); 
                    }
                    // Otherwise rely on your existing safe parser
                    return this.parseDateSafe(dateStr).getTime();
                };

                // --- 2. BUILD UNIFIED CHRONOLOGICAL TIMELINE ---
                const combinedEvents = [];

                // Push all breathing readings into the timeline
                rawSrrData.forEach(r => {
                    combinedEvents.push({ type: 'srr', timestamp: safeTimestamp(r.date), data: r });
                });

                // Push all medication events into the timeline
                if (this.showMedications && this.medLedger) {
                    const petMeds = this.medLedger.filter(m => m.patientId === this.activePatientId);
                    const { startDate, endDate } = this.getDateRange();
                    
                    // Group meds by exact date to prevent stacking overlaps
                    const medsByDate = {};
                    petMeds.forEach(m => {
                        const ts = safeTimestamp(m.eventDate);
                        // Filter dynamically by the currently active chart date range
                        if (!startDate || (ts >= startDate.getTime() && ts <= endDate.getTime())) {
                            const dStr = new Date(ts).toISOString().split('T')[0]; 
                            if (!medsByDate[dStr]) medsByDate[dStr] = [];
                            medsByDate[dStr].push(m);
                        }
                    });

                    // Add the grouped meds to the timeline bucket
                    Object.keys(medsByDate).forEach(dStr => {
                        combinedEvents.push({ 
                            type: 'med', 
                            timestamp: new Date(`${dStr}T12:00:00`).getTime(), 
                            data: medsByDate[dStr] 
                        });
                    });
                }

                // Sort the entire mixed bucket chronologically
                combinedEvents.sort((a, b) => a.timestamp - b.timestamp);

                // --- 3. EXTRACT CHART DATASETS ---
                const labels = [];
                const srrDataPoints = [];
                const medDataPoints = [];
                const medColors = [];
                const medTooltips = [];

                let lastSrrRate = null; // Used to pin the med arrow close to the breathing line
                const srrValuesForStats = []; 

                combinedEvents.forEach(ev => {
                    const dObj = new Date(ev.timestamp);
                    let label = '';
                    
                    // Scale X-Axis labelling based on dataset density
                    if (combinedEvents.length <= 14) label = dObj.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' });
                    else if (combinedEvents.length <= 60) label = dObj.toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
                    else label = dObj.toLocaleDateString(undefined, { month: 'short', year: '2-digit' });
                    
                    labels.push(label);

                    if (ev.type === 'srr') {
                        srrDataPoints.push(ev.data.rate);
                        srrValuesForStats.push(ev.data);
                        lastSrrRate = ev.data.rate;
                        
                        medDataPoints.push(null); // Blank for med layer
                        medColors.push('transparent');
                        medTooltips.push([]);
                    } else if (ev.type === 'med') {
                        srrDataPoints.push(null); // Chart.js bridges this gap automatically via spanGaps
                        
                        // Position the arrow dynamically at the most recent SRR rate, or default to 30
                        medDataPoints.push(lastSrrRate !== null ? lastSrrRate : 30); 
                        
                        const primaryMed = ev.data[0]; // Drives the triangle color
                        medColors.push(this.formulary[primaryMed.drugId]?.color || '#f59e0b');

                        // Build a multi-line tooltip string if multiple meds were changed today
                        const medDetails = ev.data.map(m => {
                            const drugName = m.drugId === 'other' ? m.customName : (this.formulary[m.drugId]?.generic || m.drugId);
                            const doseText = m.doseMg ? `${m.doseMg}mg` : 'Dose unspec.';
                            return `💊 ${m.action}: ${drugName} (${doseText})`;
                        });
                        medTooltips.push(medDetails);
                    }
                });

                const stats = this.calculateStats(srrValuesForStats);
                
                // Construct standard clinical annotations
                let annotations = {
                    thresholdLine: {
                        type: 'line', yMin: 30, yMax: 30,
                        borderColor: 'rgb(220, 38, 38)', borderWidth: 2, borderDash: [5, 5],
                        label: { display: true, content: 'Cutoff (30)', position: 'end', backgroundColor: 'rgba(220,38,38,0.8)', color: '#fff' }
                    },
                    meanLine: {
                        type: 'line', yMin: stats.mean, yMax: stats.mean,
                        borderColor: 'rgb(59, 130, 246)', borderWidth: 1.5,
                        label: { display: true, content: `Mean: ${stats.mean.toFixed(1)}`, position: 'start' }
                    }
                };

                if (srrValuesForStats.length >= 2 && stats.upperCI !== stats.lowerCI) {
                    annotations.upperCILine = { type: 'line', yMin: stats.upperCI, yMax: stats.upperCI, borderColor: 'rgba(59, 130, 246, 0.4)', borderWidth: 1, borderDash: [3, 3] };
                    annotations.lowerCILine = { type: 'line', yMin: stats.lowerCI, yMax: stats.lowerCI, borderColor: 'rgba(59, 130, 246, 0.4)', borderWidth: 1, borderDash: [3, 3] };
                }

                const datasets = [
                    {
                        label: `${this.activePatientId}'s Respiratory Rate (bpm)`,
                        data: srrDataPoints,
                        borderColor: 'rgb(14, 165, 233)',
                        backgroundColor: 'rgba(14, 165, 233, 0.08)',
                        tension: 0.25,
                        pointRadius: combinedEvents.length > 30 ? 2 : 5,
                        spanGaps: true, // CRITICAL: Connects the blue line securely through empty medication nodes
                        fill: true,
                        order: 2
                    }
                ];

                if (this.showMedications && medDataPoints.some(d => d !== null)) {
                    datasets.push({
                        label: 'Medication Change',
                        type: 'scatter',
                        data: medDataPoints,
                        backgroundColor: medColors,
                        borderColor: '#ffffff', 
                        borderWidth: 2,
                        pointStyle: 'triangle',
                        rotation: 180, // Points downwards at the node
                        radius: 10,
                        hoverRadius: 13,
                        order: 1, 
                        medTooltips: medTooltips 
                    });
                }

                this.chartInstance = new Chart(ctx, {
                    type: 'line',
                    data: { labels: labels, datasets: datasets },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        interaction: { mode: 'index', intersect: false }, // Allows stacked tooltips
                        plugins: {
                            annotation: { annotations: annotations },
                            tooltip: { 
                                callbacks: { 
                                    title: (context) => context[0].label,
                                    label: (context) => {
                                        if (context.dataset.label === 'Medication Change') {
                                            return context.dataset.medTooltips[context.dataIndex];
                                        }
                                        // Ignore drawing a tooltip for the blue line if the line is just spanning a gap
                                        if (context.raw === null) return null;
                                        return `Rate: ${context.parsed.y} bpm`;
                                    }
                                } 
                            },
                            zoom: {
                                pan: { enabled: true, mode: 'x' },
                                zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: 'x' }
                            }
                        },     
                        scales: {
                            y: { beginAtZero: true, suggestedMax: 45, title: { display: true, text: 'Breaths / Min' } },
                            x: { ticks: { maxTicksLimit: 10, maxRotation: 0 } }
                        }
                    }
                });
            }, 50);
        },
        
         // --- MED CHART FUNCTIONS ---       
        
        
        hasAnyMedData() {
            if (!this.medLedger || !this.activePatientId) return false;
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

            // Safe fallback calculator for 'All Time' or 'Incomplete Custom Dates'
            
 const getEarliestFallback = () => {
                const petMeds = this.medLedger.filter(m => m.patientId === this.activePatientId);
                if(petMeds.length > 0) {
                     // Use parseDateSafe to handle legacy UK/US dates, avoiding Invalid Date NaNs
                     const earliest = petMeds.reduce((min, p) => 
                         this.parseDateSafe(p.eventDate) < this.parseDateSafe(min.eventDate) ? p : min
                     , petMeds[0]);
                     
                     const safeTimestamp = this.parseDateSafe(earliest.eventDate).getTime();
                     
                     // If it's a valid number, pad it by 14 days. Otherwise default to 0.
                     if (!isNaN(safeTimestamp)) {
                         return new Date(safeTimestamp - (14 * 24 * 60 * 60 * 1000));
                     }
                }
                return new Date(0);
            };

            switch (this.medTimeScale) {
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
                    // Check if both fields contain data
                    if (this.medCustomStartDate && this.medCustomEndDate) {
                        // Force strict midnight/end-of-day boundaries to negate UK/US timezone drifting
                        const s = new Date(this.medCustomStartDate + 'T00:00:00');
                        const e = new Date(this.medCustomEndDate + 'T23:59:59');
                        
                        // Verify they are valid dates AND logically ordered
                        if (!isNaN(s.getTime()) && !isNaN(e.getTime()) && s <= e) {
                            startDate = s;
                            endDate = e;
                        } else {
                            startDate = getEarliestFallback(); // Safe fallback if dates are reversed
                        }
                    } else {
                        startDate = getEarliestFallback(); // Safe fallback while they are typing
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
            if (!this.medLedger || !this.activePatientId) return [];
            
            // 1. Isolate the current pet and sort STRICTLY chronologically (oldest first)
            const petMeds = this.medLedger
                .filter(m => m.patientId === this.activePatientId)
                .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());

            const epochs = [];
            const activeMeds = {}; // Tracks currently "open" medication blocks by drugId

            petMeds.forEach(med => {
                const eventTs = new Date(med.eventDate + 'T12:00:00').getTime(); // Force midday safety
                const drugKey = med.drugId === 'other' ? med.customName : med.drugId;

                if (med.action === 'Started' || med.action === 'Adjusted') {
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
                } else if (med.action === 'Stopped') {
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
        if (!this.$refs.medChartCanvas) return;

        // GATEKEEPER: Intercept execution if custom dates are invalid or incomplete
        if (this.medTimeScale === 'custom') {
            if (!this.validateCustomDates(this.medCustomStartDate, this.medCustomEndDate)) {
                console.warn("VetCardioHub: Awaiting valid custom date range...");
                return; // Abort silently; do not destroy the existing chart yet
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
            localStorage.setItem('vch_patients', JSON.stringify(this.patients));
            localStorage.setItem('vch_srrHistory', JSON.stringify(this.srrHistory));
            
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
    if (!text || !text.trim()) return alert("Please paste the Cardalis email content first.");

    // --- 1. EXTRACT PET NAME ---
    const nameMatch = text.match(/breathing\s+rate\s+for\s+([A-Za-z0-9 _'\-]+?)(?:\s*More|\s*\n|\s*$)/i);
    const patientId = nameMatch ? nameMatch[1].trim() : null;

    if (!patientId) {
        return alert("Could not identify a pet name from the email.\n\nExpected format: 'breathing rate for [Name]'");
    }

    // --- 2. AUTO-CREATE PET PROFILE if not already registered ---
let existingPet = this.patients.find(p => p.name.toLowerCase() === petName.toLowerCase());
    if (!existingPet) {
        existingPet = { 
            id: this.generateId(), // MUST HAVE THIS
            name: petName, 
            species: 'dog', 
            age: null, 
            weight: null, 
            weightUnit: 'kg' 
        };
        this.patients.push(existingPet);
        localStorage.setItem('vch_patients', JSON.stringify(this.patients)); // NEW KEY
    }

    const resolvedSpecies = existingPet.species;
    const resolvedPatientId = existingPet.id; // Grab the UUID for the log


    // --- 3. EXTRACT ALL BREATHCOUNT + DATE-TIME PAIRS ---
    // Uses a lazy wildcard between the two fields to handle any intervening whitespace
    const entryRegex = /BreathCount:\s*(\d+)[\s\S]*?Date\s*&\s*Time:\s*(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2})/gi;
    
    let match;
    let importedCount = 0;
    let skippedDuplicates = 0;

    while ((match = entryRegex.exec(text)) !== null) {
        const rate = parseInt(match[1], 10);
        const dateTimeRaw = match[2].trim();

        // Force ISO parse by replacing the space separator
        const dateObj = new Date(dateTimeRaw.replace(' ', 'T'));

        if (isNaN(dateObj.getTime()) || isNaN(rate) || rate <= 0) continue;

        // --- 4. DUPLICATE DETECTION ---
        // Flag if an entry for this pet exists within a 60-second window of this timestamp
        const isDuplicate = this.srrHistory.some(h =>
            h.patientId === patientId &&
            Math.abs(new Date(h.date).getTime() - dateObj.getTime()) < 60000
        );

        if (isDuplicate) {
            skippedDuplicates++;
            continue;
        }

        // --- 5. MAP TO VCH HISTORY FORMAT ---
        const isEquivocal = resolvedSpecies === 'cat'
            ? (rate >= 30 && rate < 40)
            : (rate >= 25 && rate < 35);

 this.srrHistory.push({
            id: dateObj.getTime() + importedCount,   
            date: dateObj.toISOString(),
            time: dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            rate: rate,
            patientId: resolvedPatientId, // MUST BE THE UUID, NOT THE NAME
            species: resolvedSpecies,
            comment: 'Imported from Cardalis app',
            isEquivocal: isEquivocal
        });

        importedCount++;
    }

    // --- 6. COMMIT & REFRESH ---
    if (importedCount === 0) {
        const msg = skippedDuplicates > 0
            ? `No new readings imported — ${skippedDuplicates} duplicate(s) already exist in the log.`
            : "No valid readings found. Please check the email format matches Cardalis export output.";
        return alert(msg);
    }

localStorage.setItem('vch_srrHistory', JSON.stringify(this.srrHistory)); // NEW KEY
    this.activePatientId = resolvedPatientId;
    this.cardalisEmailText = '';
    this.showCardalisImport = false;
    this.currentPage = 1;

    this.$nextTick(() => { this.renderChart(); });

    const dupNote = skippedDuplicates > 0 ? ` (${skippedDuplicates} duplicate(s) skipped)` : '';
    alert(`Successfully imported ${importedCount} reading(s) for ${patientId}${dupNote}.`);
},
        
        // --- MEDICATION CSV MANAGEMENT ---
        exportMedicationsCSV() {
            if (!this.medLedger || this.medLedger.length === 0) return alert("No medication data to export.");

            const headers = "Date,PetName,Action,Drug,CustomName,Dose(mg),Frequency,mg/kg\n";
            const rows = this.medLedger.map(med => {
                const drugName = med.drugId === 'other' ? 'Other' : (this.formulary[med.drugId]?.generic || med.drugId);
                return `${med.eventDate},"${med.patientId}",${med.action},"${drugName}","${med.customName || ''}",${med.doseMg},${med.frequency},${med.mgPerKg || ''}`;
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

                    let importedCount = 0;
                    for (let i = 1; i < lines.length; i++) {
                        const regex = /(".*?"|[^",\s]+)(?=\s*,|\s*$)/g;
                        const parts = lines[i].match(regex);
                        
                        if (parts && parts.length >= 7) {
                            const entry = {
                                id: Date.now() + i, // Unique ID
                                eventDate: parts[0].replace(/"/g, ''),
                                patientId: parts[1].replace(/"/g, ''),
                                action: parts[2].replace(/"/g, ''),
                                drugId: 'other', // Safest fallback for imported raw text
                                customName: parts[3].replace(/"/g, ''),
                                doseMg: parseFloat(parts[5].replace(/"/g, '')),
                                frequency: parts[6].replace(/"/g, ''),
                                mgPerKg: parts[7] ? parseFloat(parts[7].replace(/"/g, '')) : null,
                                isMajorChange: ['Started', 'Stopped'].includes(parts[2].replace(/"/g, ''))
                            };
                            
                            if (!isNaN(entry.doseMg)) {
                                this.medLedger.push(entry);
                                importedCount++;
                            }
                        }
                    }
                    localStorage.setItem('vch_medLedger', JSON.stringify(this.medLedger));
                    alert(`Imported ${importedCount} medication records.`);
                } catch (err) {
                    console.error(err);
                    alert("Failed to parse Medication CSV.");
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
            if (data.vch_patients && data.vch_srrHistory && data.vch_medLedger) {
                if (confirm("This will replace all current data with the backup file. Proceed?")) {
                    this.patients = data.vch_patients;
                    this.srrHistory = data.vch_srrHistory;
                    this.medLedger = data.vch_medLedger;
                    this.weightLog = data.vch_weightLog || [];

                    localStorage.setItem('vch_patients', JSON.stringify(this.patients));
                    localStorage.setItem('vch_srrHistory', JSON.stringify(this.srrHistory));
                    localStorage.setItem('vch_medLedger', JSON.stringify(this.medLedger));
                    localStorage.setItem('vch_weightLog', JSON.stringify(this.weightLog));

                    // FIX: Set to ID, not name
                    if (this.patients.length > 0) this.activePatientId = this.patients[0].id; 
                    this.currentPage = 1;
                    this.$nextTick(() => { this.renderChart(); this.renderMedChart(); });
                    alert("Master Backup successfully restored!");
                }
            } else {
                alert("Invalid backup file. Missing required VCH datasets.");
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
        localStorage.setItem('vch_srrHistory', JSON.stringify(this.srrHistory));
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
        
        localStorage.setItem('vch_srrHistory', JSON.stringify(this.srrHistory));
    }
    this.editingCommentId = null;
    this.commentDraft = '';
},

cancelComment() {
    this.editingCommentId = null;
    this.commentDraft = '';
},
        
        exportPDF() {
            // Web-native PDF generation using the browser's print dialog.
            // Much lighter than adding jsPDF to the clinical stack.
            window.print(); 
        }
    }));
});