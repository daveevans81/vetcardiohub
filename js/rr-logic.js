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
        // Core Data Arrays
        readings: [], // e.g., { date: '2026-06-15T08:00:00', rate: 24, asleep: true }
        medications: [], // e.g., { date: '2026-06-12T10:00:00', drug: 'Furosemide', dose: '40mg BID', action: 'Increased' }
        
        // UI Controls
        timeScale: 'all', // '7d', '60d', 'all'
        showMedications: true,
        chartInstance: null,

init() {
            const saved = localStorage.getItem('vch_rrHistory');
            if (saved) this.history = JSON.parse(saved);
           
            this.$watch('timeScale', () => this.renderChart());
            this.$watch('showMedications', () => this.renderChart());
            
            // Use Alpine's native DOM ready check instead of arbitrary timeouts
            this.$nextTick(() => {
                this.renderChart();
            });
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
            const entry = {
                id: Date.now(),
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                rate: this.finalRate,
                species: this.species,
                isEquivocal: this.clinicalInterpretation.status === 'equivocal'
            };
            this.history.unshift(entry);
            if (this.history.length > 100) this.history.pop();
            localStorage.setItem('vch_rrHistory', JSON.stringify(this.history));
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
        
        getFilteredReadings() {
            if (!this.history || this.history.length === 0) return [];
            
            // Create a copy of history so we don't mutate the original array
            let filtered = [...this.history];
            const now = new Date();

            if (this.timeScale === '7d') {
                const cutoff = new Date(now.setDate(now.getDate() - 7));
                filtered = filtered.filter(item => new Date(item.date) >= cutoff);
            } else if (this.timeScale === '60d') {
                const cutoff = new Date(now.setDate(now.getDate() - 60));
                filtered = filtered.filter(item => new Date(item.date) >= cutoff);
            }

            // History is saved newest-first. For a chart, we want oldest on the left, newest on the right.
            return filtered.reverse(); 
        },

        getFilteredMedications() {
            // Placeholder: Returns the medications array if it exists, safely preventing crashes 
            // before we build the medication entry UI.
            return this.medications || [];
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

            const dataToPlot = this.getFilteredReadings();
            const stats = this.calculateStats(dataToPlot);
            if (!this.$refs.rrrChartCanvas) return;
            
  			  
 			const ctx = this.$refs.rrrChartCanvas.getContext('2d'); 			  

            // Dynamically generate vertical line annotations for medications
            let annotations = {
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

            // Add medication markers if toggled on
            if (this.showMedications) {
                const meds = this.getFilteredMedications();
                meds.forEach((med, index) => {
                    annotations[`med_${index}`] = {
                        type: 'line',
                        scaleID: 'x',
                        value: med.date,
                        borderColor: 'rgb(16, 185, 129)', // Green
                        borderWidth: 2,
                        label: {
                            display: true,
                            content: `${med.action} ${med.drug} (${med.dose})`,
                            position: 'start',
                            rotation: -90,
                            yAdjust: 20
                        }
                    };
                });
            }

            if (this.chartInstance) this.chartInstance.destroy();

            this.chartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dataToPlot.map(d => new Date(d.date).toLocaleDateString()),
                    datasets: [{
                        label: 'Resting Respiratory Rate',
                        data: dataToPlot.map(d => d.rate),
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.3,
                        pointRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        annotation: { annotations: annotations }
                    },
                    scales: {
                        y: { beginAtZero: true, suggestedMax: 50 }
                    }
                }
            });
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
        
        exportCSV() {
            if (!this.history.length) return alert("No data to export");
            let csvContent = "data:text/csv;charset=utf-8,Date,Time,Rate(bpm),Species,Status\n";
            this.history.forEach(row => {
                let status = row.isEquivocal ? "Equivocal" : (row.rate > 40 ? "High" : "Normal");
                csvContent += `${row.date},${row.time},${row.rate},${row.species},${status}\n`;
            });
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "VetCardioHub_RRR_Log.csv");
            document.body.appendChild(link);
            link.click();
            link.remove();
        },

        exportPDF() {
            // Web-native PDF generation using the browser's print dialog.
            // Much lighter than adding jsPDF to the clinical stack.
            window.print(); 
        }
    }));
});