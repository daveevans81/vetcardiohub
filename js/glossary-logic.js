const glossaryEngine = {
    
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
get glossaryArray() {
    if (!this.glossaryDatabase) return [];
    
    return Object.entries(this.glossaryDatabase)
        .map(([key, value]) => ({ key, ...value }))
        
        .filter(item => {
            const groupName = item.group ? item.group.toLowerCase() : 'echo';
            return groupName === 'echo'; 
        })
        
        .sort((a, b) => {
            // Primary Sort: By Difficulty Level (1 -> 4)
            const diffA = a.difficulty || 1; // Defaults to 1 if you forget to add a level
            const diffB = b.difficulty || 1;
            
            if (diffA !== diffB) {
                return diffA - diffB; 
            }
            
            // Secondary Sort: Alphabetical A-Z (if difficulty levels match)
            const titleA = a.title || '';
            const titleB = b.title || '';
            return titleA.localeCompare(titleB);
        });
},

get dynamicGlossaryFields() {
            if (!this.activeGlossaryTerm) return [];

            // 1. Fields we handle explicitly elsewhere (like images) or want to hide
            const hiddenFields = ['title', 'category', 'group', 'difficulty', 'audience', 'key', 'imgPlaceholder', 'imgAttribution', 'pmid'];
            const fields = [];

            // 2. Map specific database keys to their UI aesthetics (Icons & Colors)
            const fieldConfig = {
                description:  { label: "Clinical Purpose", icon: "fa-stethoscope", color: "#10b981" },
                view:         { label: "Optimal View / Source", icon: "fa-satellite-dish", color: "#0ea5e9" },
                method:       { label: "Technique / Formula", icon: "fa-ruler-combined", color: "#8b5cf6" },
                textOwner:    { label: "Owner Overview", icon: "fa-comments", color: "#f43f5e" },
                textClinical: { label: "Clinical Details", icon: "fa-user-doctor", color: "#0284c7" },
                reference:    { label: "Evidence & Literature", icon: "fa-book-open-reader", color: "#475569" }
            };

            // 3. Process the data
            Object.entries(this.activeGlossaryTerm).forEach(([key, value]) => {
                if (!hiddenFields.includes(key) && value !== null && value !== undefined && value !== '') {
                    
                    // Grab the predefined config, or create a default one for brand new fields
                    const conf = fieldConfig[key] || {
                        label: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                        icon: "fa-circle-info",
                        color: "#94a3b8" // Default grey
                    };

                    // Auto-append PMID to the reference field if it exists
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

            // 4. Force logical sorting so the narrative flows correctly
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

// Moves to the next card
nextQuizCard() {
    if (this.currentQuizIndex < this.quizDeck.length - 1) {
        this.currentQuizIndex++;
        this.quizRevealed = false;
    } else {
        // Automatically reshuffle if they hit the end
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
    
    // Fallback to the whole array if their filter resulted in 0 cards.
    const deckToUse = this.filteredGlossary.length > 0 ? this.filteredGlossary : this.glossaryArray;
    
    this.quizDeck = [...deckToUse].sort(() => Math.random() - 0.5);
    this.currentQuizIndex = 0;
    this.quizRevealed = false;
    this.sessionScore = { correct: 0, review: 0 };
    
    // Ensure we generate the first question if we are in MCQ mode
    if (this.quizMode === 'mcq' && this.quizDeck.length > 0) {
        this.generateMCQ();
    }
},

// --- INITIALIZATION ---
initLearningHub() {
    // 1. Grab the parameters from the URL (e.g., ?mode=quiz&type=flashcard)
    const urlParams = new URLSearchParams(window.location.search);
    const requestedMode = urlParams.get('mode');
    const requestedType = urlParams.get('type');

    // 2. Set the main learning mode (Defaults to 'quiz' if nothing is in the URL)
    if (requestedMode === 'glossary') {
        this.learningMode = 'glossary';
    } else {
        this.learningMode = 'quiz';
    }

    // 3. Set the specific quiz type (Defaults to 'mcq' if nothing is in the URL)
    if (requestedType === 'flashcard') {
        this.quizMode = 'flashcard';
    } else {
        this.quizMode = 'mcq';
    }

    // 4. Start the engine if the user landed on the quiz
    if (this.learningMode === 'quiz') {
        this.startQuiz();
    }
},

// Update the filtered list
get filteredGlossary() {
    let list = this.glossaryArray;
    
    // 1. Filter by Category
    if (this.selectedCategory !== 'All') {
        list = list.filter(item => item.category === this.selectedCategory);
    }
    
    // 2. Filter by Difficulty
    if (this.selectedDifficulty !== 'All') {
        // Convert to integer since select dropdowns often return strings
        list = list.filter(item => item.difficulty === parseInt(this.selectedDifficulty));
    }
    
    // 3. Filter by Search Query
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
    
    // 1. Filter out the correct card AND any cards with the exact same description
    let uniquePool = this.glossaryArray.filter(item => 
        item.key !== correctCard.key && 
        item.description && // Ensure it actually has a description
        item.description.trim() !== correctCard.description.trim()
    );
    
    // 2. Prevent duplicate descriptions from appearing alongside each other
    const seenDescriptions = new Set();
    uniquePool = uniquePool.filter(item => {
        if (seenDescriptions.has(item.description)) return false;
        seenDescriptions.add(item.description);
        return true;
    });
    
    // 3. Try to pull distractors from the same category to make the quiz tricky
    let categoryPool = uniquePool.filter(item => item.category === correctCard.category);
    
    // 4. If we don't have at least 3 unique distractors in the same category, broaden the search
    let finalPool = categoryPool.length >= 3 ? categoryPool : uniquePool;
    
    // 5. Shuffle the pool and slice the top 3
    const selectedDistractors = finalPool.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    // 6. Safely build the options array (This prevents crashes if your database is very small)
    let options = [
        { text: correctCard.description, isCorrect: true }
    ];
    
    selectedDistractors.forEach(dist => {
        options.push({ text: dist.description, isCorrect: false });
    });
    
    // 7. Shuffle the final output so 'A' isn't always the right answer
    this.mcqOptions = options.sort(() => 0.5 - Math.random());
    this.mcqAnswered = false;
    this.mcqSelectedIndex = null;
},

selectMCQAnswer(index) {
    if (this.mcqAnswered) return; // Prevent double guessing
    this.mcqSelectedIndex = index;
    this.mcqAnswered = true;
    
    // Score it
    if (this.mcqOptions[index].isCorrect) {
        this.sessionScore.correct++;
    } else {
        this.sessionScore.review++;
    }
},

nextQuestion() {
    this.currentQuizIndex++;
    if (this.currentQuizIndex >= this.quizDeck.length) {
        this.startQuiz(); // Reshuffle if at the end
    } else {
        // Generate the next format based on current toggle
        if (this.quizMode === 'mcq') this.generateMCQ();
        else this.quizRevealed = false;
    }
},

openGlossary(termKey) {
            // This looks up the term in the database and sets it as the active term
            if (this.glossaryDatabase[termKey]) {
                this.activeGlossaryTerm = this.glossaryDatabase[termKey];
                this.glossaryOpen = true;
            } else {
                console.warn("Glossary term not found:", termKey);
            }
        },
        
closeGlossary() {
            this.glossaryOpen = false;
            // The slight delay allows the fade-out animation to finish before clearing the data
            setTimeout(() => { 
                this.activeGlossaryTerm = null; 
            }, 300); 
}

};
}