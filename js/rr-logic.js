document.addEventListener('alpine:init', () => {
    Alpine.data('rrTracker', () => ({
        // State
        species: 'dog', // 'dog' or 'cat'
        status: 'sleeping', // 'sleeping' or 'resting'
        hasHeartDisease: false,
        
        // Timer & Counter
        isCounting: false,
        timeLeft: 30, // Count for 30s, multiply by 2
        tapCount: 0,
        finalRate: null,
        timerInterval: null,
        wakeLock: null,

        // History
        history: [],

        init() {
            // Load history on mount
            const saved = localStorage.getItem('vetCardioHub_rrHistory');
            if (saved) {
                this.history = JSON.parse(saved);
            }
        },

        async startCount() {
            this.isCounting = true;
            this.tapCount = 0;
            this.timeLeft = 30;
            this.finalRate = null;

            // Prevent screen from sleeping
            if ('wakeLock' in navigator) {
                try {
                    this.wakeLock = await navigator.wakeLock.request('screen');
                } catch (err) {
                    console.warn('Wake Lock not supported/allowed');
                }
            }

            this.timerInterval = setInterval(() => {
                this.timeLeft--;
                if (this.timeLeft <= 0) {
                    this.finishCount();
                }
            }, 1000);
        },

        registerTap() {
            if (!this.isCounting) return;
            this.tapCount++;
            
            // Haptic feedback (supported on Android, ignored silently on iOS/Desktop)
            if (navigator.vibrate) navigator.vibrate(40);
        },

        finishCount() {
            clearInterval(this.timerInterval);
            this.isCounting = false;
            
            // Release Wake Lock
            if (this.wakeLock) {
                this.wakeLock.release();
                this.wakeLock = null;
            }

            // Calculate per minute (30s count * 2)
            this.finalRate = this.tapCount * 2;
            this.saveToHistory();
        },

        saveToHistory() {
            const entry = {
                id: Date.now(),
                date: new Date().toISOString(),
                rate: this.finalRate,
                species: this.species,
                status: this.status
            };
            
            this.history.unshift(entry); // Add to beginning
            // Keep only last 50 to prevent localStorage bloat
            if (this.history.length > 50) this.history.pop(); 
            
            localStorage.setItem('vetCardioHub_rrHistory', JSON.stringify(this.history));
        },

        // --- Clinical Logic ---
        get interpretation() {
            if (this.finalRate === null) return null;
            
            // Hard Cutoffs
            if (this.finalRate >= 40) return { level: 'danger', text: 'Seek immediate veterinary attention.' };
            if (this.finalRate >= 30) return { level: 'warning', text: 'Elevated. Monitor closely or contact vet.' };
            
            // Baseline logic could be injected here based on this.history
            
            return { level: 'normal', text: 'Normal resting rate.' };
        }
    }));
});