document.addEventListener('alpine:init', () => {
    Alpine.data('rrTracker', () => ({
        // Absorb the Glossary Engine for tooltips 
        ...glossaryEngine, 

// --- CORE STATE ---
        patients: [],
        activePatientId: '',
        showAddPet: false, showPatientManagement: false, showManualEntry: false,
        newPatient: { id: '', name: '', species: 'dog', breed: '', sex: 'MN', dob: '', weight: '', weightUnit: 'kg', ownerName: '', customSRRCutoff: 30 },
        manualEntry: { date: new Date().toISOString().split('T')[0], time: '12:00', rate: '', comment: '' },
        mergeSelection: { primaryId: '', secondaryId: '' },
        showWeightLog: false,
        weightLedger: [],
        showLog: true,
        showMedGraph: true,
        showAnalytics: true,
        


        isCounting: false,
        timeLeft: 30,
        tapCount: 0,
        finalRate: null,
        timerInterval: null,
        history: [],
        
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
medLedger: [], 
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

init() {
            // Load Profiles
            const savedPets = localStorage.getItem('vch_patients');
            if (savedPets) this.patients = JSON.parse(savedPets);

            // Load History
			const savedHistory = localStorage.getItem('vch_srrLogs');
			
			if (savedHistory) {
			    this.history = JSON.parse(savedHistory).map(log => ({
			        comment: '',
			        ...log
			    }));
			}
            
            // Load Medications
            const savedMeds = localStorage.getItem('vch_medLogs');
            const savedWeights = localStorage.getItem('vch_weightLogs');
            if (savedWeights) this.weightLedger = JSON.parse(savedWeights);
            if (savedMeds) this.medLedger = JSON.parse(savedMeds);

            // Set default active pet
            if (this.patients.length > 0) {
                this.activePatientId = this.patients[0].id;
            } else {
                this.showAddPet = true;
            }

            // Watchers: Re-render chart and reset pagination if they change the pet or timescale
            this.$watch('activePatientId', () => { this.currentPage = 1; this.renderChart(); });
            this.$watch('timeScale', () => { this.currentPage = 1; this.renderChart(); });
            this.$watch('showMedications', () => this.renderChart());
            this.$watch('customStartDate', () => this.renderChart());
            this.$watch('customEndDate', () => this.renderChart());
            this.$watch('activePatientId', () => { this.currentPage = 1; this.renderChart(); this.renderMedChart(); });
            
            this.$nextTick(() => { this.renderChart(); this.renderMedChart(); });
        },
        
        // --- PET MANAGEMENT ---

        get activePatientProfile() {
            return this.patients.find(p => p.id === this.activePatientId) || null;
        },
        
        currentAge(patientId) {
            const p = this.patients.find(p => p.id === patientId);
            if (!p || !p.dob) return null;
            const dob = new Date(p.dob);
            const diff = Date.now() - dob.getTime();
            return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        },
        
        currentWeight(patientId) {
            const weights = this.weightLedger.filter(w => w.patientId === patientId).sort((a,b) => new Date(b.date) - new Date(a.date));
            if (weights.length > 0) return weights[0];
            const p = this.patients.find(p => p.id === patientId);
            if (p && p.weight) return { weight: p.weight, unit: p.weightUnit };
            return null;
        },

        saveNewPatient() {
            const cleanName = this.newPatient.name.trim();
            if (!cleanName) return alert("A valid patient name is required.");

            let isNew = !this.newPatient.id;
            
            if (isNew) {
                this.newPatient.id = crypto.randomUUID();
                this.patients.push({ ...this.newPatient });
                
                // Add initial weight to ledger if provided
                if (this.newPatient.weight) {
                    this.weightLedger.push({
                        id: crypto.randomUUID(),
                        patientId: this.newPatient.id,
                        date: new Date().toISOString().split('T')[0],
                        weight: parseFloat(this.newPatient.weight),
                        unit: this.newPatient.weightUnit
                    });
                    localStorage.setItem('vch_weightLogs', JSON.stringify(this.weightLedger));
                }
            } else {
                const idx = this.patients.findIndex(p => p.id === this.newPatient.id);
                if (idx !== -1) {
                    this.patients[idx] = { ...this.newPatient };
                }
            }

            localStorage.setItem('vch_patients', JSON.stringify(this.patients));
            this.activePatientId = this.newPatient.id;
            
            this.newPatient = { id: '', name: '', species: 'dog', breed: '', sex: 'MN', dob: '', weight: '', weightUnit: 'kg', ownerName: '', customSRRCutoff: 30 };
            this.showAddPet = false;
        },
        
        editPatient(patientId) {
            const p = this.patients.find(p => p.id === patientId);
            if(p) {
                this.newPatient = { ...p };
                this.showAddPet = true;
                this.showPatientManagement = false;
            }
        },

        deletePatient(patientId) {
            if(confirm("Are you sure you want to delete this patient and all associated records?")) {
                this.patients = this.patients.filter(p => p.id !== patientId);
                this.history = this.history.filter(h => h.patientId !== patientId);
                this.medLedger = this.medLedger.filter(m => m.patientId !== patientId);
                this.weightLedger = this.weightLedger.filter(w => w.patientId !== patientId);
                
                localStorage.setItem('vch_patients', JSON.stringify(this.patients));
                localStorage.setItem('vch_srrLogs', JSON.stringify(this.history));
                localStorage.setItem('vch_medLogs', JSON.stringify(this.medLedger));
                localStorage.setItem('vch_weightLogs', JSON.stringify(this.weightLedger));
                
                if (this.activePatientId === patientId) {
                    this.activePatientId = this.patients.length > 0 ? this.patients[0].id : '';
                }
            }
        },
        
        mergePatients() {
            if(!this.mergeSelection.primaryId || !this.mergeSelection.secondaryId || this.mergeSelection.primaryId === this.mergeSelection.secondaryId) {
                return alert("Please select two different patients to merge.");
            }
            if(confirm("This will merge the secondary patient's records into the primary and delete the secondary profile. Proceed?")) {
                const pId = this.mergeSelection.primaryId;
                const sId = this.mergeSelection.secondaryId;
                
                this.history.forEach(h => { if(h.patientId === sId) h.patientId = pId; });
                this.medLedger.forEach(m => { if(m.patientId === sId) m.patientId = pId; });
                this.weightLedger.forEach(w => { if(w.patientId === sId) w.patientId = pId; });
                
                this.patients = this.patients.filter(p => p.id !== sId);
                
                localStorage.setItem('vch_patients', JSON.stringify(this.patients));
                localStorage.setItem('vch_srrLogs', JSON.stringify(this.history));
                localStorage.setItem('vch_medLogs', JSON.stringify(this.medLedger));
                localStorage.setItem('vch_weightLogs', JSON.stringify(this.weightLedger));
                
                this.mergeSelection = { primaryId: '', secondaryId: '' };
                alert("Patients merged successfully.");
                this.activePatientId = pId;
            }
        },
        
        saveManualEntry() {
            if (!this.activePatientId) return alert("Please select a patient.");
            if (!this.manualEntry.rate || isNaN(this.manualEntry.rate)) return alert("Please enter a valid rate.");
            
            const p = this.activePatientProfile;
            const cutoff = p.customSRRCutoff || 30;
            const rate = parseInt(this.manualEntry.rate);
            
            const newLog = {
                id: crypto.randomUUID(),
                date: new Date(this.manualEntry.date + 'T' + this.manualEntry.time).toISOString(),
                time: this.manualEntry.time,
                rate: rate,
                patientId: this.activePatientId,
                species: p.species,
                comment: this.manualEntry.comment,
                isEquivocal: rate >= (cutoff - 5) && rate < cutoff
            };
            
            this.history.unshift(newLog);
            localStorage.setItem('vch_srrLogs', JSON.stringify(this.history));
            
            this.manualEntry = { date: new Date().toISOString().split('T')[0], time: '12:00', rate: '', comment: '' };
            this.showManualEntry = false;
            this.currentPage = 1;
            this.$nextTick(() => { this.renderChart(); });
        },

        

get currentSpecies() {
            if (!this.activePatientId) return 'dog';
            const profile = this.patients.find(p => p.id === this.activePatientId);
            return profile ? profile.species : 'dog';
        },
        
        get uniquePatients() {
            return this.patients;
        },
        
        get hasAnyDataForActivePatient() {
            if (!this.history || !this.activePatientId) return false;
            return this.history.some(item => item.patientId === this.activePatientId);
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
    
    const cw = this.currentWeight(this.activePatientId);
    if (!cw || !cw.weight || !this.newMed.doseMg) return null;
    let weight = parseFloat(cw.weight);

    let dose = parseFloat(this.newMed.doseMg);
    
    // Prevent division by zero or NaN cascade
    if (isNaN(weight) || isNaN(dose) || weight <= 0) return null;

    let weightInKg = cw.unit === 'lbs' ? weight / 2.2046 : weight;
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
            // Null safety: Ensure a pet is actually selected
            if (!this.activePatientId) {
                alert("Clinical Entry Error: No patient selected.");
                return;
            }

            if (!this.newMed.drugId || !this.newMed.doseMg) {
                alert("Clinical Entry Error: Please select a medication and specify the dose in mg.");
                return;
            }

            const isMajor = ['Started', 'Stopped'].includes(this.newMed.action);

            const entry = {
                id: Date.now(), 
                patientId: this.activePatientId, // FIXED: Uses the safe string, not the getter object
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
            localStorage.setItem('vch_medLogs', JSON.stringify(this.medLedger));
            this.renderMedChart();

            // Reset the form but keep the current date
            this.newMed = {
                eventDate: this.newMed.eventDate, 
                drugId: '',
                customName: '',
                action: 'Started',
                doseMg: '',
                frequency: 'q12h'
            };
        },



        
// Sort ledger chronologically (newest first) to avoid Alpine array freezing
sortedMedLedger() {
    return [...this.medLedger].sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));
},

deleteMedication(id) {
    if(confirm("Delete this medication entry? This will remove it from the patient's historical chart.")) {
        this.medLedger = this.medLedger.filter(med => med.id !== id);
        localStorage.setItem('vch_medLogs', JSON.stringify(this.medLedger));
        this.renderMedChart();
    }
},

saveToHistory() {
            // Null safety check: ensure a patient is selected
            if (!this.activePatientId) {
                alert("Please select or create a patient profile before saving.");
                return;
            }

            const newLog = {
                id: Date.now(), // Unique identifier for key binding
                date: new Date().toISOString(),
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                rate: this.finalRate,
                patientId: this.activePatientId,
                species: this.currentSpecies,
                // Optional: Flag equivocal rates dynamically based on species
                isEquivocal: this.finalRate >= ((this.activePatientProfile?.customSRRCutoff || 30) - 5) && this.finalRate < (this.activePatientProfile?.customSRRCutoff || 30)
            };

            // Unshift places newest records at the top of the raw array
            this.history.unshift(newLog);
            localStorage.setItem('vch_srrLogs', JSON.stringify(this.history));

            // Reset UI state for the next count
            this.finalRate = null;
            this.tapCount = 0;
            this.currentPage = 1; // Snap back to page 1 to see the new entry
            
            // Re-render chart with the new data point
            this.$nextTick(() => {
                this.renderChart();
            });
        },
        
        
		get clinicalInterpretation() {
            if (this.finalRate === null || isNaN(this.finalRate)) return null;
            let rate = this.finalRate;
            const species = this.currentSpecies; // FIXED: Pull dynamically from active patient context

            const cutoff = this.activePatientProfile?.customSRRCutoff || 30;
            if (rate >= cutoff + 10) {
                return { status: 'danger', title: 'Action Required', text: 'Resting rate is significantly elevated. Contact your veterinary surgeon.' };
            }
            if (rate >= cutoff && rate < cutoff + 10) {
                return { status: 'danger', title: 'Action Required', text: 'Resting rate is elevated.' };
            }
            if (rate >= cutoff - 5 && rate < cutoff) {
                return { status: 'equivocal', title: 'Equivocal (Borderline)', text: 'This rate is borderline high. Please recount in 2-4 hours while the dog is in deep sleep.' };
            }
            if (false) { // Handled above
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
            if (!this.history || this.history.length === 0 || !this.activePatientId) return [];
            
            let filtered = this.history.filter(item => item.patientId === this.activePatientId);

            // 2. Filter by Date
            const { startDate, endDate } = this.getDateRange();
            if (startDate) {
                filtered = filtered.filter(item => {
                    const itemDate = this.parseDateSafe(item.date);
                    return itemDate >= startDate && itemDate <= endDate;
                });
            }
            
            // Sort via a timestamp calculation rather than using destructive inline reversing
            return filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        },
        
        
getFilteredMedications() {
            if (!this.medications || this.medications.length === 0) return [];
            const { startDate, endDate } = this.getDateRange();
            
            return this.medications.filter(med => {
                if (!startDate) return true;
                const medDate = this.parseDateSafe(med.date);
                return medDate >= startDate && medDate <= endDate;
            });
        },
        
        
        // --- DATA MANAGEMENT ---
        
resetData() {
            if (window.confirm("CRITICAL WARNING: This action permanently clears ALL local patient profiles, logs, and tracking history. Proceed?")) {
                this.history = [];
                this.patients = [];
                this.activePatientId = '';
                this.showAddPet = true;
                localStorage.removeItem('vch_rrHistory');
                localStorage.removeItem('vch_patients');
                if (this.chartInstance) this.chartInstance.destroy();
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
                        label: `${this.activePatientProfile?.name || 'Patient'}'s Respiratory Rate (bpm)`,
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
            if (!this.history || this.history.length === 0) return alert("No clinical data to export.");

			const headers = "Date,Time,Rate(bpm),PetName,Species,Comment\n";
			const rows = this.history.map(log => {
			    const pName = this.patients.find(p => p.id === log.patientId)?.name || 'Unknown';
			    const pSpecies = log.species || 'dog';
			    const comment = (log.comment || '').replace(/"/g, '""'); // escape quotes
			    return `${log.date},${log.time},${log.rate},${pName},${pSpecies},"${comment}"`;
			}).join("\n");

            const csvContent = "data:text/csv;charset=utf-8," + headers + rows;
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
                let lastImportedPet = null;

                // Start at index 1 to skip headers
                for (let i = 1; i < lines.length; i++) {
                    if (!lines[i].trim()) continue;
                    
                    const cols = lines[i].split(",");
                    if (cols.length >= 3) {
                        const date = cols[0].trim();
                        const time = cols[1].trim();
                        const rate = parseInt(cols[2].trim());
                        const petName = cols[3] ? cols[3].trim() : 'Imported Patient';
                        const species = cols[4] ? cols[4].trim() : 'dog';
                        const comment = cols[5] ? cols[5].trim().replace(/^"|"$/g, '').replace(/""/g, '"') : '';
                        
                        // 1. Auto-generate Pet Profile if missing
                        let existingPet = this.patients.find(p => p.name.toLowerCase() === petName.toLowerCase());
                        if (!existingPet) {
                            existingPet = { id: crypto.randomUUID(), name: petName, species: species, dob: null, customSRRCutoff: 30 };
                            this.patients.push(existingPet);
                            lastImportedPet = existingPet.id;
                        }

                        // 2. Push to history
                        this.history.push({
                            id: Date.now() + i, // Offset to prevent ID collisions
                            date: date,
                            time: time,
                            rate: rate,
                            patientId: existingPet.id,
                            species: species,
                            comment: comment
                        });
                        importedCount++;
                    }
                }

                if (importedCount > 0) {
                    // Save both arrays to localStorage
                    localStorage.setItem('vch_patients', JSON.stringify(this.patients));
                    localStorage.setItem('vch_srrLogs', JSON.stringify(this.history));
                    
                    // Switch UI to the newly imported pet if one was created
                    if (lastImportedPet) {
                        this.activePatientId = lastImportedPet;
                    }
                    this.showAddPet = false;
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
    const petName = nameMatch ? nameMatch[1].trim() : null;

    if (!petName) {
        return alert("Could not identify a pet name from the email.\n\nExpected format: 'breathing rate for [Name]'");
    }

    // --- 2. AUTO-CREATE PET PROFILE if not already registered ---
    const existingPet = this.pets.find(p => p.name.toLowerCase() === petName.toLowerCase());
    if (!existingPet) {
        this.pets.push({ 
            name: petName, 
            species: 'dog',    // Cardalis is primarily a canine app
            age: null, 
            weight: null, 
            weightUnit: 'kg' 
        });
        localStorage.setItem('vch_patients', JSON.stringify(this.patients));
    }

    const resolvedSpecies = existingPet ? existingPet.species : 'dog';

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
        const isDuplicate = this.history.some(h =>
            h.patientId === existingPet.id &&
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

        this.history.push({
            id: dateObj.getTime() + importedCount,   // Unique ID from timestamp + offset
            date: dateObj.toISOString(),
            time: dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            rate: rate,
            patientId: existingPet.id,
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

    localStorage.setItem('vch_srrLogs', JSON.stringify(this.history));
    this.activePatientId = existingPet.id;
    this.cardalisEmailText = '';
    this.showCardalisImport = false;
    this.currentPage = 1;

    this.$nextTick(() => { this.renderChart(); });

    const dupNote = skippedDuplicates > 0 ? ` (${skippedDuplicates} duplicate(s) skipped)` : '';
    alert(`Successfully imported ${importedCount} reading(s) for ${petName}${dupNote}.`);
},
        
        // --- MEDICATION CSV MANAGEMENT ---
        exportMedicationsCSV() {
            if (!this.medLedger || this.medLedger.length === 0) return alert("No medication data to export.");

            const headers = "Date,PetName,Action,Drug,CustomName,Dose(mg),Frequency,mg/kg\n";
            const rows = this.medLedger.map(med => {
                const drugName = med.drugId === 'other' ? 'Other' : (this.formulary[med.drugId]?.generic || med.drugId);
                return `${med.eventDate},"${this.patients.find(p => p.id === med.patientId)?.name || 'Unknown'}",${med.action},"${drugName}","${med.customName || ''}",${med.doseMg},${med.frequency},${med.mgPerKg || ''}`;
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
                                patientId: (() => { const n = parts[1].replace(/"/g, ''); let ep = this.patients.find(p=>p.name===n); if(!ep){ep={id:crypto.randomUUID(), name:n, customSRRCutoff:30}; this.patients.push(ep); localStorage.setItem('vch_patients', JSON.stringify(this.patients));} return ep.id; })(),
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
                    localStorage.setItem('vch_medLogs', JSON.stringify(this.medLedger));
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
                vch_srrLogs: this.history,
                vch_medLogs: this.medLedger,
                vch_weightLogs: this.weightLedger,
                exportDate: new Date().toISOString()
            };

            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
            const link = document.createElement("a");
            link.setAttribute("href", dataStr);
            link.setAttribute("download", `VCH_MasterBackup_${new Date().toISOString().split('T')[0]}.json`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },

        importCompleteBackup(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    
                    if (data.vch_patients && data.vch_srrLogs && data.vch_medLogs) {
                        if (confirm("This will replace all current data with the backup file. Proceed?")) {
                            this.patients = data.vch_patients;
                            this.history = data.vch_srrLogs;
                            this.medLedger = data.vch_medLogs;
                            if(data.vch_weightLogs) this.weightLedger = data.vch_weightLogs;

                            localStorage.setItem('vch_patients', JSON.stringify(this.patients));
                            localStorage.setItem('vch_srrLogs', JSON.stringify(this.history));
                            localStorage.setItem('vch_medLogs', JSON.stringify(this.medLedger));

                            if (this.patients.length > 0) this.activePatientId = this.patients[0].id;
                            this.currentPage = 1;
                            this.$nextTick(() => { this.renderChart(); });
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
        this.history = this.history.filter(log => log.id !== id);
        localStorage.setItem('vch_srrLogs', JSON.stringify(this.history));
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
    const entry = this.history.find(log => log.id === this.editingCommentId);
    if (entry) {
        const trimmed = this.commentDraft.trim();
        if (trimmed) {
            entry.comment = trimmed;
        } else {
            delete entry.comment; // Clean removal rather than storing ""
        }
        localStorage.setItem('vch_srrLogs', JSON.stringify(this.history));
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