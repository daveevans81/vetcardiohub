document.addEventListener('alpine:init', () => {
    Alpine.data('rrTracker', () => ({
        // Absorb the Glossary Engine for tooltips 
        ...glossaryEngine, 

        species: 'dog',
        isCounting: false,
        timeLeft: 30,
        tapCount: 0,
        finalRate: null,
        timerInterval: null,
        history: [],
        petName: '', // For the current counting session
        filterPet: 'all', // For the chart/history view
        // Core Data Arrays
        readings: [], // e.g., { date: '2026-06-15T08:00:00', rate: 24, asleep: true }
        medications: [], // e.g., { date: '2026-06-12T10:00:00', drug: 'Furosemide', dose: '40mg BID', action: 'Increased' }
        
        // UI Controls
        showMedications: true,
        chartInstance: null,
        timeScale: 'thisMonth', // Updated default
        customStartDate: '',
        customEndDate: '',
        chartRenderTimeout: null,

init() {
            const saved = localStorage.getItem('vch_rrHistory');
            if (saved) this.history = JSON.parse(saved);
            
            this.$watch('timeScale', () => this.renderChart());
            this.$watch('showMedications', () => this.renderChart());
            this.$watch('customStartDate', () => this.renderChart());
            this.$watch('customEndDate', () => this.renderChart());
            this.$watch('filterPet', () => this.renderChart()); // Re-render when pet changes
            
            this.$nextTick(() => { this.renderChart(); });
        },
        
        get uniquePets() {
            if (!this.history.length) return [];
            const pets = this.history.map(entry => entry.petName).filter(Boolean);
            return [...new Set(pets)]; // Returns unique names only
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
            // Prevent saving without a name to keep data clean
            const finalName = this.petName.trim() || 'Unnamed Pet'; 
            
            const entry = {
                id: Date.now(),
                date: new Date().toISOString(),
                time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                rate: this.finalRate,
                species: this.species,
                petName: finalName, // NEW FIELD
                isEquivocal: this.clinicalInterpretation.status === 'equivocal'
            };
            this.history.unshift(entry);
            
            // Increased storage limit since they might track multiple pets over months
            if (this.history.length > 500) this.history.pop(); 
            localStorage.setItem('vch_rrHistory', JSON.stringify(this.history));
            
            // Auto-set the filter to the pet they just logged
            this.filterPet = finalName;
        },

        get clinicalInterpretation() {
            if (this.finalRate === null || isNaN(this.finalRate)) return null;
            let rate = this.finalRate;

            if (rate > 40) {
                return { status: 'danger', title: 'Action Required', text: 'Resting rate is significantly elevated. Contact your veterinary surgeon.' };
            }
            if (this.species === 'dog' && rate >= 30 && rate <= 35) {
                return { status: 'equivocal', title: 'Equivocal (Borderline)', text: 'This rate is borderline high. Please recount in 2-4 hours while the dog is in deep sleep.' };
            }
            if (this.species === 'cat' && rate >= 35 && rate <= 40) {
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
        
// --- UPDATED FILTER (Respects Pet Selection) ---
        getFilteredReadings() {
            if (!this.history || this.history.length === 0) return [];
            let filtered = [...this.history];
            
            // 1. Filter by Pet Name First
            if (this.filterPet !== 'all') {
                filtered = filtered.filter(item => item.petName === this.filterPet);
            }

            // 2. Then Filter by Date (Using your existing getDateRange logic)
            const { startDate, endDate } = this.getDateRange();
            if (startDate) {
                filtered = filtered.filter(item => {
                    const itemDate = this.parseDateSafe(item.date);
                    return itemDate >= startDate && itemDate <= endDate;
                });
            }

            return filtered.reverse(); 
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
            const confirmed = window.confirm("Are you sure you want to delete ALL respiratory data? This cannot be undone unless you have a backup CSV.");
            if (confirmed) {
                this.history = [];
                localStorage.removeItem('vch_rrHistory');
                this.petName = '';
                this.filterPet = 'all';
                this.renderChart();
                alert("Data successfully erased.");
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
            // 1. Debounce to prevent Alpine watcher race conditions
            if (this.chartRenderTimeout) clearTimeout(this.chartRenderTimeout);
            
            this.chartRenderTimeout = setTimeout(() => {
                if (!this.$refs.rrrChartCanvas) return;
                
                const dataToPlot = this.getFilteredReadings();
                const ctx = this.$refs.rrrChartCanvas.getContext('2d');

                // Cleanly destroy old chart
                if (this.chartInstance) {
                    this.chartInstance.destroy();
                    this.chartInstance = null;
                }

                const hasData = dataToPlot.length > 0;
                const stats = hasData ? this.calculateStats(dataToPlot) : { mean: 0, upperCI: 0, lowerCI: 0 };
                let annotations = {};

                if (hasData) {
                    annotations = {
		                thresholdLine: {
		                    type: 'line',
		                    yMin: 30,
		                    yMax: 30,
		                    borderColor: 'rgb(220, 38, 38)', // Red
		                    borderWidth: 2,
		                    borderDash: [5, 5],
		                    label: { display: true, content: 'Clinical Cutoff (30)', position: 'end' }
		                },
		                meanLine: {
		                    type: 'line',
		                    yMin: stats.mean,
		                    yMax: stats.mean,
		                    borderColor: 'rgb(59, 130, 246)', // Blue
		                    borderWidth: 1,
		                    label: { display: true, content: 'Mean', position: 'start' }
		                },
		                upperCILine: {
		                    type: 'line',
		                    yMin: stats.upperCI,
		                    yMax: stats.upperCI,
		                    borderColor: 'rgba(59, 130, 246, 0.5)',
		                    borderWidth: 1,
		                    borderDash: [3, 3]
		                },
		                lowerCILine: {
		                    type: 'line',
		                    yMin: stats.lowerCI,
		                    yMax: stats.lowerCI,
		                    borderColor: 'rgba(59, 130, 246, 0.5)',
		                    borderWidth: 1,
		                    borderDash: [3, 3]
		                }
                    };

                    // Safe Medication Mapping
                    if (this.showMedications) {
                        const meds = this.getFilteredMedications();
                        meds.forEach((med, index) => {
                            const medDateObj = this.parseDateSafe(med.date).getTime();
                            let closestIndex = 0;
                            let minDiff = Infinity;
                            
                            // Find the closest recorded reading to the medication date
                            dataToPlot.forEach((d, i) => {
                                const diff = Math.abs(this.parseDateSafe(d.date).getTime() - medDateObj);
                                if (diff < minDiff) {
                                    minDiff = diff;
                                    closestIndex = i;
                                }
                            });

                            // Attach annotation to a guaranteed existing X-axis label
                            annotations[`med_${index}`] = {
                                type: 'line',
                                scaleID: 'x',
                                value: dataToPlot[closestIndex].date, 
                                borderColor: 'rgb(16, 185, 129)',
                                borderWidth: 2,
                                label: {
                                    display: true,
                                    content: `${med.action} ${med.drug}`,
                                    position: 'start', rotation: -90, yAdjust: 20
                                }
                            };
                        });
                    }
                }

                // Initialize new chart
                this.chartInstance = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: dataToPlot.map(d => d.date), // Raw string to ensure annotation matching
                        datasets: [{
                            label: 'Resting Respiratory Rate',
                            data: dataToPlot.map(d => d.rate),
                            borderColor: 'rgb(14, 165, 233)',
                            backgroundColor: 'rgba(14, 165, 233, 0.1)',
                            tension: 0.3,
                            pointRadius: dataToPlot.length > 30 ? 2 : 5,
                            fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            annotation: { annotations: annotations },
                            tooltip: { callbacks: { title: (context) => context[0].label } }
                        },
                        scales: {
                            y: { beginAtZero: true, suggestedMax: 50 },
                            x: {
                                ticks: {
                                    maxTicksLimit: 12,
                                    maxRotation: 45,
                                    minRotation: 0,
									callback: (val, index) => {
                                        if (!dataToPlot[index]) return '';
                                        const dateObj = this.parseDateSafe(dataToPlot[index].date);
                                        const totalPoints = dataToPlot.length;

                                        // passing 'undefined' automatically uses the user's device locale
                                        if (totalPoints <= 14) return dateObj.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' });
                                        if (totalPoints <= 60) return dateObj.toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
                                        return dateObj.toLocaleDateString(undefined, { month: 'short', year: '2-digit' });
                                    }
                                }
                            }
                        }
                    }
                });

            }, 50); // Execute 50ms after Alpine finishes its reactive updates
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
            if (!this.history.length) return alert("No data to export");
            // Standardized Header
            let csvContent = "data:text/csv;charset=utf-8,Date_ISO,Time,PetName,Species,Rate,Status\n";
            
            this.history.forEach(row => {
                let status = row.isEquivocal ? "Equivocal" : (row.rate > 40 ? "High" : "Normal");
                // Escape commas in names just in case
                let safeName = `"${row.petName || 'Unknown'}"`; 
                csvContent += `${row.date},${row.time},${safeName},${row.species},${row.rate},${status}\n`;
            });
            
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `VCH_RRR_Backup_${new Date().toISOString().split('T')[0]}.csv`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        },
        
        importCSV(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const text = e.target.result;
                    const lines = text.split('\n').filter(line => line.trim() !== '');
                    
                    // Skip the header row
                    const dataLines = lines.slice(1);
                    let importedCount = 0;

                    dataLines.forEach((line, index) => {
                        // Handle CSV parsing (accounting for quoted pet names)
                        const regex = /(".*?"|[^",\s]+)(?=\s*,|\s*$)/g;
                        const parts = line.match(regex);
                        
                        if (parts && parts.length >= 5) {
                            const entry = {
                                id: Date.now() + index, // Ensure unique IDs
                                date: parts[0].replace(/"/g, ''),
                                time: parts[1].replace(/"/g, ''),
                                petName: parts[2].replace(/"/g, ''),
                                species: parts[3].replace(/"/g, '').toLowerCase(),
                                rate: parseInt(parts[4].replace(/"/g, ''), 10),
                                isEquivocal: parts[5] ? parts[5].replace(/"/g, '').includes('Equivocal') : false
                            };
                            
                            // Only add if it's a valid number
                            if (!isNaN(entry.rate)) {
                                this.history.push(entry);
                                importedCount++;
                            }
                        }
                    });

                    // Sort history newest first to match our structure
                    this.history.sort((a, b) => new Date(b.date) - new Date(a.date));
                    
                    // Save and refresh
                    localStorage.setItem('vch_rrHistory', JSON.stringify(this.history));
                    this.renderChart();
                    alert(`Successfully imported ${importedCount} readings.`);
                    
                } catch (error) {
                    console.error("Import failed:", error);
                    alert("Failed to read CSV. Please ensure it is a valid VetCardioHub backup file.");
                }
                
                // Clear the input so the same file can be imported again if needed
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