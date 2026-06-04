const glossaryEngine = {
    
    // --- CORE GLOSSARY STATE ---
    // Connect to the global database from glossary-data.js
    glossaryDatabase: typeof VET_GLOSSARY_DB !== 'undefined' ? VET_GLOSSARY_DB : {},
    activeGlossaryTerm: null,
    glossaryOpen: false,
    
    zoomImage(url) {
        window.dispatchEvent(new CustomEvent('image-zoom', { detail: url }));
    },

    // --- LEARNING HUB STATE ---
    learningMode: 'quiz', // Toggles between 'glossary' and 'quiz'
    searchQuery: '',
    quizDeck: [],
    currentQuizIndex: 0,
    quizRevealed: false,

    // Category Filter for quiz
    selectedCategory: 'All',
    availableCategories: ['All', 'Doppler', 'Left Heart', 'Right Heart', 'Haemodynamics', 'Anatomy', 'Calculations', 'Guidelines'],
    quizMode: 'mcq', // 'flashcard' or 'mcq'
    mcqOptions: [],
    mcqAnswered: false,
    mcqSelectedIndex: null,
    selectedDifficulty: 'All',
    availableDifficulties: ['All', 1, 2, 3, 4],
    userMode: 'vet',

    // --- LEARNING HUB METHODS ---
    // Converts your glossary object into an array for easy mapping and searching
glossaryArray() {
        if (!this.glossaryDatabase) return [];
        
        return Object.entries(this.glossaryDatabase)
            .map(([key, value]) => ({ key, ...value }))
            .filter(item => {
                const groupName = item.group ? item.group.toLowerCase() : 'echo';
                return groupName === 'echo'; 
            })
            .sort((a, b) => {
                // Primary Sort: By Difficulty Level (1 -> 4)
                const diffA = a.difficulty || 1; 
                const diffB = b.difficulty || 1;
                
                if (diffA !== diffB) {
                    return diffA - diffB; 
                }
                
                // Secondary Sort: Alphabetical A-Z
                const titleA = a.title || '';
                const titleB = b.title || '';
                return titleA.localeCompare(titleB);
            });
    },

dynamicGlossaryFields() {
        if (!this.activeGlossaryTerm) return [];

        const hiddenFields = ['title', 'category', 'group', 'difficulty', 'audience', 'key', 'imgPlaceholder', 'imgAttribution', 'pmid'];
        const fields = [];

        const fieldConfig = {
            description:  { label: "Clinical Purpose", icon: "fa-stethoscope", color: "#10b981" },
            view:         { label: "Optimal View / Source", icon: "fa-satellite-dish", color: "#0ea5e9" },
            method:       { label: "Technique / Formula", icon: "fa-ruler-combined", color: "#8b5cf6" },
            textOwner:    { label: "Owner Overview", icon: "fa-comments", color: "#f43f5e" },
            textClinical: { label: "Clinical Details", icon: "fa-user-doctor", color: "#0284c7" },
            reference:    { label: "Evidence & Literature", icon: "fa-book-open-reader", color: "#475569" }
        };

        Object.entries(this.activeGlossaryTerm).forEach(([key, value]) => {
            if (!hiddenFields.includes(key) && value !== null && value !== undefined && value !== '') {
                
                const conf = fieldConfig[key] || {
                    label: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                    icon: "fa-circle-info",
                    color: "#94a3b8"
                };

                let formattedValue = value;
                if (key === 'reference' && this.activeGlossaryTerm.pmid) {
                    formattedValue += ` <a href="https://pubmed.ncbi.nlm.nih.gov/${this.activeGlossaryTerm.pmid}/" target="_blank" rel="noopener noreferrer" style="color: #0ea5e9; font-weight: bold; text-decoration: underline; margin-left: 5px;">[PMID: ${this.activeGlossaryTerm.pmid}] <i class="fa-solid fa-arrow-up-right-from-square"></i></a>`;
                }

                fields.push({
                    id: key,
                    label: conf.label,
                    icon: conf.icon,
                    color: conf.color,
                    value: formattedValue
                });
            }
        });

        const sortOrder = ['description', 'textOwner', 'textClinical', 'view', 'method', 'reference'];
        fields.sort((a, b) => {
            let indexA = sortOrder.indexOf(a.id);
            let indexB = sortOrder.indexOf(b.id);
            if (indexA === -1) indexA = 999;
            if (indexB === -1) indexB = 999;
            return indexA - indexB;
        });

        return fields;
    },

    nextQuizCard() {
        if (this.currentQuizIndex < this.quizDeck.length - 1) {
            this.currentQuizIndex++;
            this.quizRevealed = false;
        } else {
            this.startQuiz(); 
        }
    },

    markCard(status) {
        if (status === 'correct') {
            this.sessionScore.correct++;
        } else {
            this.sessionScore.review++;
        }
        this.nextQuizCard();
    },

    startQuiz() {
        this.learningMode = 'quiz';
        
        const deckToUse = this.filteredGlossary().length > 0 ? this.filteredGlossary() : this.glossaryArray;
        
        this.quizDeck = [...deckToUse].sort(() => Math.random() - 0.5);
        this.currentQuizIndex = 0;
        this.quizRevealed = false;
        this.sessionScore = { correct: 0, review: 0 };
        
        if (this.quizMode === 'mcq' && this.quizDeck.length > 0) {
            this.generateMCQ();
        }
    },

    initLearningHub() {
        const urlParams = new URLSearchParams(window.location.search);
        const requestedMode = urlParams.get('mode');
        const requestedType = urlParams.get('type');

        if (requestedMode === 'glossary') {
            this.learningMode = 'glossary';
        } else {
            this.learningMode = 'quiz';
        }

        if (requestedType === 'flashcard') {
            this.quizMode = 'flashcard';
        } else {
            this.quizMode = 'mcq';
        }

        if (this.learningMode === 'quiz') {
            this.startQuiz();
        }
    },

filteredGlossary() {
        let list = this.glossaryArray();
        
        if (this.selectedCategory !== 'All') {
            list = list.filter(item => item.category === this.selectedCategory);
        }
        
        if (this.selectedDifficulty !== 'All') {
            list = list.filter(item => item.difficulty === parseInt(this.selectedDifficulty));
        }
        
        if (this.searchQuery.trim() !== '') {
            const q = this.searchQuery.toLowerCase();
            list = list.filter(item => 
                (item.title && item.title.toLowerCase().includes(q)) || 
                (item.description && item.description.toLowerCase().includes(q))
            );
        }
        return list;
    },

    generateMCQ() {
        const correctCard = this.quizDeck[this.currentQuizIndex];
        
        let uniquePool = this.glossaryArray().filter(item => 
            item.key !== correctCard.key && 
            item.description && 
            item.description.trim() !== correctCard.description.trim()
        );
        
        const seenDescriptions = new Set();
        uniquePool = uniquePool.filter(item => {
            if (seenDescriptions.has(item.description)) return false;
            seenDescriptions.add(item.description);
            return true;
        });
        
        let categoryPool = uniquePool.filter(item => item.category === correctCard.category);
        let finalPool = categoryPool.length >= 3 ? categoryPool : uniquePool;
        
        const selectedDistractors = finalPool.sort(() => 0.5 - Math.random()).slice(0, 3);
        
        let options = [
            { text: correctCard.description, isCorrect: true }
        ];
        
        selectedDistractors.forEach(dist => {
            options.push({ text: dist.description, isCorrect: false });
        });
        
        this.mcqOptions = options.sort(() => 0.5 - Math.random());
        this.mcqAnswered = false;
        this.mcqSelectedIndex = null;
    },

    selectMCQAnswer(index) {
        if (this.mcqAnswered) return; 
        this.mcqSelectedIndex = index;
        this.mcqAnswered = true;
        
        if (this.mcqOptions[index].isCorrect) {
            this.sessionScore.correct++;
        } else {
            this.sessionScore.review++;
        }
    },

    nextQuestion() {
        this.currentQuizIndex++;
        if (this.currentQuizIndex >= this.quizDeck.length) {
            this.startQuiz(); 
        } else {
            if (this.quizMode === 'mcq') this.generateMCQ();
            else this.quizRevealed = false;
        }
    },

    openGlossary(termKey) {
        if (this.glossaryDatabase[termKey]) {
            this.activeGlossaryTerm = this.glossaryDatabase[termKey];
            this.glossaryOpen = true;
        } else {
            console.warn("Glossary term not found:", termKey);
        }
    },
        
    closeGlossary() {
        this.glossaryOpen = false;
        setTimeout(() => { 
            this.activeGlossaryTerm = null; 
        }, 300); 
    }

};