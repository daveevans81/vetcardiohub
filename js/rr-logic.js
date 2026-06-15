document.addEventListener('alpine:init', () => {
    Alpine.data('rrTracker', () => ({
        // Absorb the Glossary Engine for tooltips 
        ...glossaryEngine, 

// --- CORE STATE ---
        pets: [], // Array of { name: 'Bella', species: 'dog', age: 8 }
        activePetName: '', // The currently selected pet
        showAddPet: false, // Toggles the setup modal
        newPet: { name: '', species: 'dog', age: '' },

        isCounting: false,
        timeLeft: 30,
        tapCount: 0,
        finalRate: null,
        timerInterval: null,
        history: [],
        
        // --- PAGINATION STATE ---
        currentPage: 1,
        itemsPerPage: 20,

        // --- CHART & CONTROLS ---
        timeScale: '180d', // Default to 6 months
        customStartDate: '',
        customEndDate: '',
        medications: [],
        showMedications: true,
        chartInstance: null,
        chartRenderTimeout: null,
        

init() {
            // Load Profiles
            const savedPets = localStorage.getItem('vch_rrPets');
            if (savedPets) this.pets = JSON.parse(savedPets);

            // Load History
const savedHistory = localStorage.getItem('vch_rrHistory');
            if (savedHistory) this.history = JSON.parse(savedHistory);

            // Set default active pet
            if (this.pets.length > 0) {
                this.activePetName = this.pets[0].name;
            } else {
                // If brand new user, force them to set up a pet
                this.showAddPet = true;
            }

            // Watchers: Re-render chart and reset pagination if they change the pet or timescale
            this.$watch('activePetName', () => { this.currentPage = 1; this.renderChart(); });
            this.$watch('timeScale', () => { this.currentPage = 1; this.renderChart(); });
            this.$watch('showMedications', () => this.renderChart());
            this.$watch('customStartDate', () => this.renderChart());
            this.$watch('customEndDate', () => this.renderChart());
            
            this.$nextTick(() => { this.renderChart(); });
        },
        
        // --- PET MANAGEMENT ---
saveNewPet() {
            const cleanName = this.newPet.name.trim();
            if (!cleanName) return alert("A valid pet name is required.");

            // Enforce strict duplicate safety boundaries
            if (this.pets.find(p => p.name.toLowerCase() === cleanName.toLowerCase())) {
                return alert("A patient profile with this name already exists.");
            }

            this.pets.push({
                name: cleanName,
                species: this.newPet.species,
                age: this.newPet.age ? parseInt(this.newPet.age, 10) : null
            });

            localStorage.setItem('vch_rrPets', JSON.stringify(this.pets));
            this.activePetName = cleanName;
            this.newPet = { name: '', species: 'dog', age: '' };
            this.showAddPet = false;
        },

get currentSpecies() {
            if (!this.activePetName) return 'dog';
            const profile = this.pets.find(p => p.name === this.activePetName);
            return profile ? profile.species : 'dog';
        },
        
        get uniquePets() {
            return this.pets.map(p => p.name);
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
            if (!this.activePetName) return alert("Please establish or select a patient profile first.");
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

saveToHistory() {
            // Null safety check: ensure a patient is selected
            if (!this.activePetName) {
                alert("Please select or create a patient profile before saving.");
                return;
            }

            const newLog = {
                id: Date.now(), // Unique identifier for key binding
                date: new Date().toISOString(),
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                rate: this.finalRate,
                petName: this.activePetName,
                species: this.currentSpecies,
                // Optional: Flag equivocal rates dynamically based on species
                isEquivocal: this.currentSpecies === 'cat' 
                    ? (this.finalRate >= 30 && this.finalRate < 40) 
                    : (this.finalRate >= 25 && this.finalRate < 35)
            };

            // Unshift places newest records at the top of the raw array
            this.history.unshift(newLog);
            localStorage.setItem('vch_rrHistory', JSON.stringify(this.history));

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
            if (!this.history || this.history.length === 0 || !this.activePetName) return [];
            
            // 1. Strict Filter by Active Pet
            let filtered = this.history.filter(item => item.petName === this.activePetName);

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
                this.pets = [];
                this.activePetName = '';
                this.showAddPet = true;
                localStorage.removeItem('vch_rrHistory');
                localStorage.removeItem('vch_rrPets');
                if (this.chartInstance) this.chartInstance.destroy();
                alert("Database completely flushed.");
            }
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
                
 renderChart() {
            if (this.chartRenderTimeout) clearTimeout(this.chartRenderTimeout);

            this.chartRenderTimeout = setTimeout(() => {
                if (!this.$refs.rrrChartCanvas) return;

                const dataToPlot = this.getFilteredReadings();
                const ctx = this.$refs.rrrChartCanvas.getContext('2d');

                if (this.chartInstance) {
                    this.chartInstance.destroy();
                    this.chartInstance = null;
                }

                if (dataToPlot.length === 0) return;

                const stats = this.calculateStats(dataToPlot);
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

                // Draw 95% Confidence Interval boundaries if there is sufficient data
                if (dataToPlot.length >= 2 && stats.upperCI !== stats.lowerCI) {
                    annotations.upperCILine = {
                        type: 'line', yMin: stats.upperCI, yMax: stats.upperCI,
                        borderColor: 'rgba(59, 130, 246, 0.4)', borderWidth: 1, borderDash: [3, 3]
                    };
                    annotations.lowerCILine = {
                        type: 'line', yMin: stats.lowerCI, yMax: stats.lowerCI,
                        borderColor: 'rgba(59, 130, 246, 0.4)', borderWidth: 1, borderDash: [3, 3]
                    };
                }

                // Standardized X-Axis label strings derived directly from user's localized settings
                const formattedLabels = dataToPlot.map(d => {
                    const dObj = this.parseDateSafe(d.date);
                    if (dataToPlot.length <= 14) return dObj.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' });
                    if (dataToPlot.length <= 60) return dObj.toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
                    return dObj.toLocaleDateString(undefined, { month: 'short', year: '2-digit' });
                });

                this.chartInstance = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: formattedLabels,
                        datasets: [{
                            label: `${this.activePetName}'s Respiratory Rate (bpm)`,
                            data: dataToPlot.map(d => d.rate),
                            borderColor: 'rgb(14, 165, 233)',
                            backgroundColor: 'rgba(14, 165, 233, 0.08)',
                            tension: 0.25,
                            pointRadius: dataToPlot.length > 30 ? 2 : 5,
                            fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { annotation: { annotations: annotations } },
                        scales: {
                            y: { beginAtZero: true, suggestedMax: 45, title: { display: true, text: 'Breaths / Min' } },
                            x: { ticks: { maxTicksLimit: 10, maxRotation: 0 } }
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

            const headers = "Date,Time,Rate(bpm),PetName,Species\n";
            const rows = this.history.map(log => {
                // Provide fallbacks in case of legacy data lacking pet names
                const pName = log.petName || 'Unknown';
                const pSpecies = log.species || 'dog';
                return `${log.date},${log.time},${log.rate},${pName},${pSpecies}`;
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

                        // 1. Auto-generate Pet Profile if missing
                        const existingPet = this.pets.find(p => p.name.toLowerCase() === petName.toLowerCase());
                        if (!existingPet) {
                            this.pets.push({ name: petName, species: species, age: null });
                            lastImportedPet = petName;
                        }

                        // 2. Push to history
                        this.history.push({
                            id: Date.now() + i, // Offset to prevent ID collisions
                            date: date,
                            time: time,
                            rate: rate,
                            petName: petName,
                            species: species
                        });
                        importedCount++;
                    }
                }

                if (importedCount > 0) {
                    // Save both arrays to localStorage
                    localStorage.setItem('vch_rrPets', JSON.stringify(this.pets));
                    localStorage.setItem('vch_rrHistory', JSON.stringify(this.history));
                    
                    // Switch UI to the newly imported pet if one was created
                    if (lastImportedPet) {
                        this.activePetName = lastImportedPet;
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
        exportPDF() {
            // Web-native PDF generation using the browser's print dialog.
            // Much lighter than adding jsPDF to the clinical stack.
            window.print(); 
        }
    }));
});