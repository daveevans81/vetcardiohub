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

        init() {
            const saved = localStorage.getItem('vch_rrHistory');
            if (saved) this.history = JSON.parse(saved);
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

        // --- EXPORT FUNCTIONS ---
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