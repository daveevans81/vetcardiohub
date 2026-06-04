function advancedEchoSuite() {
    return {
    /* 1. STATE VARIABLES */
    weight: '', 
    lvidd: '', 
    lvids: '', 
    la: '', 
    ao: '',
    lad: '',
    lvpwd: '',
    ivsd: '',
    selectedBreed: '',
    selectedModel: 'cornell_standard',
    lvedv: '',
    lvesv: '',
    eVel: '',
    aVel: '',
    ivrt: '',
    lvotd: '', 
    rvotd: '',
    lvotvti: '',
    rvotvti: '',
    ePrime: '',
    aola: '',
    mdt: '',   // Mitral Deceleration Time (ms)
    trMax: '', // Tricuspid Regurgitation Max Velocity (m/s)
    aovmax: '',  // Aortic Valve / SAS Max Velocity (m/s)
    pavmax: '', // Pulmonary Artery / PS Max Velocity (m/s)
    tapse: '',
    rvwt: '',
    rveda: '',
    rvesa: '',
    rvd1: '',     // Basal RV Diameter (AP4Ch)
    rvd2: '',     // Mid-cavity RV Diameter (AP4Ch)
    rad: '',     // RA Minor Axis (Width/Diameter) Ap4Ch
    rad2: '',     // RA Minor Axis (Width/Diameter) rPLA
    prMax: '',    // Pulmonic Regurgitation Max Velocity (m/s)
    mpamin: '',    // Main Pulmonary Artery minimum
    rpamin: '',    // Right Pulmonary Artery min
    rpamax: '',    // Right Pulmonary Artery max
    lvidd2:'',
    selectedRightModel: 'feldhutter_2022', // Default right heart validation framework
    selectedMineModel: 'mine_1',
    showVolumes: false,
    showDoppler: false,
    showRightHeart: false,
    showShunt: false,
    rawEchoText: '',
    parseMessage: '',
    activeGlossaryTerm: null,
        glossaryOpen: false,
   copySuccess: false,
    showComments: false,
    clinicalComments: '',
    isStandaloneMode: false, // For use with standalone calculator pages
    mineInputMode: 'raw', // 'raw' or 'calculated' values for MINE scoring page
        manualLaAo: '',
        manualLviddn: '',
        manualFs: '',
    reportDate: new Date().toLocaleDateString('en-GB', { 
       day: 'numeric', 
       month: 'long', 
       year: 'numeric' 
    }    ),

// --- Chang 2026 PH Score Variables ---
showChangScore: false, // Toggles the UI section
ivsFlatteningChang: '0', // 0=Normal, 2=Subtle, 4=Moderate/Severe
rvotNotching: false, // 0=Normal, 1=Abnormal

// --- Patient & Clinical Metadata ---
showPatientDetails: false, // Toggles the concertina
patientName: '',
ownerName: '',
breed: '',

sessionScore: { correct: 0, review: 0 },

    
    /* 2. GETTERS */
    get lviddn() {
        if(!this.weight || !this.lvidd) return 0;
        return ((this.lvidd / 10) / Math.pow(this.weight, 0.294)).toFixed(2);
    },
    get lvidsn() {
        if(!this.weight || !this.lvids) return 0;
        return ((this.lvids / 10) / Math.pow(this.weight, 0.315)).toFixed(2);
    },
    get lvedvbw() {
        if(!this.weight || !this.lvedv) return 0;
        return (this.lvedv / this.weight).toFixed(2);
    },
    get lvesvbw() {
        if(!this.weight || !this.lvesv) return 0;
        return (this.lvesv / this.weight).toFixed(2);
    },
    get fs() {
        if(!this.lvidd || !this.lvids || parseFloat(this.lvidd) === 0) return 0;
        return (((this.lvidd - this.lvids) / this.lvidd) * 100).toFixed(1);
    },
    get ef() {
        if(!this.lvedv || !this.lvesv || parseFloat(this.lvedv) === 0) return 0;
        return (((this.lvedv - this.lvesv) / this.lvedv) * 100).toFixed(1);
    },
    get sv() {
        if(!this.lvedv || !this.lvesv || parseFloat(this.lvedv) === 0) return 0;
        return (this.lvedv - this.lvesv).toFixed(1);
    },
    get laAo() {
        if(!this.la || !this.ao || parseFloat(this.ao) === 0) return 0;
        return (this.la / this.ao).toFixed(2);
    },
    get lan() {
        if(!this.weight || !this.la) return 0;
        return ((this.la / 10) / Math.pow(this.weight, 0.355)).toFixed(2);
    },
    get ladn() {
        if(!this.weight || !this.lad) return 0;
        return ((this.lad / 10) / Math.pow(this.weight, 0.309)).toFixed(2);
    },
    get RWT() {
        if(!this.lvpwd || !this.lvidd || parseFloat(this.lvidd) === 0) return 0;
        return ((2 * this.lvpwd) / this.lvidd).toFixed(2);
    },
    get ladao() {
        if(!this.lad || !this.ao || parseFloat(this.ao) === 0) return 0;
        return (this.lad / this.ao).toFixed(3);
    },
    get ladaola() {
        if(!this.lad || !this.aola || parseFloat(this.aola) === 0) return 0;
        return (this.lad / this.aola).toFixed(3);
    },
    get bsa() {
        if (!this.weight || parseFloat(this.weight) <= 0) return 0;
        return (0.101 * Math.pow(this.weight, 0.6667)).toFixed(3);
    },
    get edvim2() {
        if (!this.lvedv || !this.bsa || parseFloat(this.bsa) === 0) return 0;
        return (this.lvedv / this.bsa).toFixed(2);
    },
    get esvim2() {
        if (!this.lvesv || !this.bsa || parseFloat(this.bsa) === 0) return 0;
        return (this.lvesv / this.bsa).toFixed(2);
    },
    get ear() {
        if (!this.eVel || !this.aVel || parseFloat(this.aVel) === 0) return 0;
        return (this.eVel / this.aVel).toFixed(2);
    },
    get eivrt() {
      if (!this.eVel || !this.ivrt || parseFloat(this.ivrt) === 0) return 0;
      return parseFloat(((parseFloat(this.eVel) * 100) / parseFloat(this.ivrt)).toFixed(2));
    },
    get vtir() {
        if (!this.lvotvti || !this.rvotvti || parseFloat(this.rvotvti) === 0) return 0;
        return (this.lvotvti / this.rvotvti).toFixed(2);
    },
    get qp() {
        if (!this.rvotvti || !this.rvotd || parseFloat(this.rvotvti) === 0) return 0;
        return parseFloat((this.rvotvti * Math.PI * ((this.rvotd / 20) ** 2)).toFixed(2));
    },
    get qs() {
        if (!this.lvotvti || !this.lvotd || parseFloat(this.lvotvti) === 0) return 0;
        return parseFloat((this.lvotvti * Math.PI * ((this.lvotd / 20) ** 2)).toFixed(2));
    },
    get qpqs() {
        if (!this.qp || !this.qs|| parseFloat(this.qs) === 0) return 0;
    return parseFloat((this.qp / this.qs).toFixed(2));
    },
    get lveio() {
    if (!this.eVel || !this.lvotvti || parseFloat(this.lvotvti) === 0) return 0;
    return parseFloat((parseFloat(this.eVel) / parseFloat(this.lvotvti)).toFixed(2));
    },
    get eePrime() {
    if (!this.eVel || !this.ePrime || parseFloat(this.ePrime) === 0) return 0;
    // Converts ePrime from cm/s to m/s to match E wave scale
    return parseFloat((parseFloat(this.eVel) / (parseFloat(this.ePrime) / 100)).toFixed(2));
    },
    get eplar() {
    if (!this.trMax || !this.eePrime || parseFloat(this.eePrime) === 0) return 0;
    // ePLAR = TR Vmax (m/s) / trans-mitral E / TDI e' ratio
    return parseFloat((parseFloat(this.trMax) / this.eePrime).toFixed(2));
    },
    get mpaAo() {
        if(!this.mpamin || !this.ao || parseFloat(this.ao) === 0) return 0;
        return (this.mpamin / this.ao).toFixed(2);
    },
    get rpaminao() {
        if(!this.rpamin || !this.ao || parseFloat(this.ao) === 0) return 0;
        return (this.rpamin / this.ao).toFixed(2);
    },

    get rpamaxao() {
        if(!this.rpamax || !this.ao || parseFloat(this.ao) === 0) return 0;
        return (this.rpamax / this.ao).toFixed(2);
    },
    get rvedan() {
        if(!this.weight || ! this.rveda) return 0;
        return ((this.rveda) / Math.pow(this.weight, 0.665)).toFixed(2);
    },
    get rvesan() {
        if(!this.weight || ! this.rvesa) return 0;
        return ((this.rvesa) / Math.pow(this.weight, 0.695)).toFixed(2);
    },
    get rfac() {
        if(!this.rveda || !this.rvesa || parseFloat(this.rveda) === 0) return 0;
        return (((this.rveda - this.rvesa) / this.rveda) * 100).toFixed(1);
    },
    get trPG() {
    if (!this.trMax || parseFloat(this.trMax) === 0) return 0;
    return parseFloat((Math.pow(this.trMax, 2) * 4).toFixed(2));
    },
    get prPG() {
    if (!this.prMax || parseFloat(this.prMax) === 0) return 0;
    return parseFloat((Math.pow(this.prMax, 2) * 4).toFixed(2));
    },
    get tapsen() {
        if(!this.weight || !this.tapse) return 0;
        return ((this.tapse) / Math.pow(this.weight, 0.285)).toFixed(2);
    },
    get tapseaola() {
        if(!this.tapse || !this.aola || parseFloat(this.aola) === 0) return 0;
        return (this.tapse / this.aola).toFixed(3);
    },
    get radn() {
        if (!this.weight || !this.rad || parseFloat(this.weight) <= 0) return 0;
        // Convert input from mm to cm, then scale to BW^0.4
        return ((parseFloat(this.rad) / 10) / Math.pow(parseFloat(this.weight), 0.4)).toFixed(2);
    },
    get rvd1n() {
        if (!this.weight || !this.rvd1 || parseFloat(this.weight) <= 0) return 0;
        // Convert input from mm to cm, then scale to BW^0.33
        return ((parseFloat(this.rvd1) / 10) / Math.pow(parseFloat(this.weight), 0.33)).toFixed(2);
    },
    get rad2aola() {
        if(!this.rad2 || !this.aola || parseFloat(this.aola) === 0) return 0;
        return (this.rad2 / this.aola).toFixed(3);
    },
    get radaola() {
        if(!this.rad || !this.aola || parseFloat(this.aola) === 0) return 0;
        return (this.rad / this.aola).toFixed(3);
    },
    get rad2lad() {
        if(!this.rad2 || !this.lad ||  parseFloat(this.lad) === 0) return 0;
        return (this.rad2 / this.lad).toFixed(3);
    },
    get rvd1aola() {
        if(!this.rvd1 || !this.aola || parseFloat(this.aola) === 0) return 0;
        return (this.rvd1 / this.aola).toFixed(3);
    },
    get rvwtaola() {
        if(!this.rvwt || !this.aola || parseFloat(this.aola) === 0) return 0;
        return (this.rvwt / this.aola).toFixed(3);
    },
    get rvwtlvpwd() {
        if(!this.rvwt || !this.lvpwd || parseFloat(this.lvpwd) === 0) return 0;
        return (this.rvwt / this.lvpwd).toFixed(3);
    },
    get rpadi() {
        if(!this.rpamax || !this.rpamin|| parseFloat(this.rpamax) === 0) return 0;
        return ((this.rpamax - this.rpamin ) / this.rpamax).toFixed(3);
    },
    get paaola() {
        if(!this.rvotd || !this.aola || parseFloat(this.aola) === 0) return 0;
        return (this.rvotd / this.aola).toFixed(3);
    },
    get mrVol() {
    // Requires both total stroke volume and systemic stroke volume (Qs)
    if (!this.sv || !this.qs) return 0;
    const vol = this.sv - this.qs;
    // Guard against negative numbers caused by slight measurement errors
    return vol > 0 ? parseFloat(vol.toFixed(2)) : 0;
    },
    get mrFraction() {
    if (!this.sv || !this.mrVol) return 0;
    const fraction = (this.mrVol / this.sv) * 100;
    return parseFloat(fraction.toFixed(1));
    },
    get aoGradient() {
    const v = parseFloat(this.aovmax);
    return v > 0 ? parseFloat((4 * (v ** 2)).toFixed(1)) : 0;
    },
    get aoStenosisGrade() {
    const v = parseFloat(this.aovmax);
    if (!v || v < 1.8) return { label: 'Normal', class: 'normal' };
    if (v >= 1.8 && v <= 2.5) return { label: 'Mild Elevation', class: 'abnormal' };
    if (v >= 2.5 && v <= 3.5) return { label: 'Mild Stenosis', class: 'abnormal' };
    if (v > 3.5 && v <= 4.5) return { label: 'Moderate Stenosis', class: 'abnormal' };
    return { label: 'Severe Stenosis', class: 'abnormal' }; // > 4.5 m/s (> 81 mmHg)
    },
get paGradient() {
    const v = parseFloat(this.pavmax);
    return v > 0 ? parseFloat((4 * (v ** 2)).toFixed(1)) : 0;
},
get paStenosisGrade() {
    const v = parseFloat(this.pavmax);
    if (!v || v < 1.6) return { label: 'Normal', class: 'normal' }; // Pulmonic is slightly lower
    if (v >= 1.6 && v <= 2.5) return { label: 'Mild Elevation', class: 'abnormal' };
    if (v >= 2.5 && v <= 3.5) return { label: 'Mild Stenosis', class: 'abnormal' };
    if (v > 3.5 && v <= 4.5) return { label: 'Moderate Stenosis', class: 'abnormal' };
    return { label: 'Severe Stenosis', class: 'abnormal' }; // > 4.5 m/s (> 81 mmHg)
},
get felineLvotoAssessment() {
    if (!this.isCat || !this.aovmax) return null;
    const v = parseFloat(this.aovmax);
    
    if (v > 1.9) {
        return {
            label: 'Elevated Velocity (Probable LVOTO)',
            class: 'abnormal',
            note: 'Velocity > 1.9 m/s. Closely evaluate CW Doppler envelope for a late-systolic peaking, scimitar-shaped (dagger) curve indicative of dynamic obstruction (e.g., SAM).'
        };
    }
    return { label: 'Normal Outflow Velocity', class: 'normal', note: '' };
},

/* Left Ventricular Eccentricity Index (LVEI) */
get lvei() {
    const d1 = parseFloat(this.lvidd);  // Standard LVIDd
    const d2 = parseFloat(this.lvidd2); // Perpendicular LVIDd2
    if (!d1 || !d2 || d1 === 0) return 0;
    
    // LVEI = Perpendicular Diameter / Standard Short-Axis Diameter
    return parseFloat((d2 / d1).toFixed(2));
},

get lveiAssessment() {
    const score = this.lvei;
    if (score === 0) return null;
    // An eccentricity index > 1.1 - 1.2 indicates pathological septal flattening
    if (score >= 1.2) {
        return { label: 'Abnormal (Severe Septal Flattening / D-Shape Geometry)', class: 'abnormal', active: true };
    }
    if (score > 1.1 && score < 1.2) {
        return { label: 'Equivocal (Mild/Diastolic Septal Flattening)', class: 'abnormal', active: true };
    }
    return { label: 'Normal Circular Geometry', class: 'normal', active: false };
},

/* Chang 2026 Pre-Capillary PH Score (For TR-Negative Patients) */
get changScoreResults() {
    // Only calculate if we have baseline left and right comparators
    if (!this.rvd1 || !this.lvidd || !this.rvwt || !this.lvpwd || !this.rad || !this.lad) return null;

    let score = 0;
    let breakdown = [];

    // 1. RV Dilatation (RVID vs LVID)
    const rvRatio = parseFloat(this.rvd1) / parseFloat(this.lvidd);
    let rvPts = 0;
    if (rvRatio >= 1.0) rvPts = 6;
    else if (rvRatio >= 0.75) rvPts = 4;
    else if (rvRatio > 0.50) rvPts = 2;
    score += rvPts;
    breakdown.push({ name: 'RV Dilatation', val: rvPts, desc: rvPts === 0 ? '≤ 50% of LV' : `> ${(rvRatio*100).toFixed(0)}% of LV` });

    // 2. RV Wall Thickening (RVWT vs LVPWd)
    const wallRatio = parseFloat(this.rvwt) / parseFloat(this.lvpwd);
    let wallPts = 0;
    // Note: Due to measurement variance, we treat 0.9 to 1.1 as "Equal"
    if (wallRatio > 1.1) wallPts = 2;
    else if (wallRatio >= 0.9) wallPts = 1;
    score += wallPts;
    breakdown.push({ name: 'RV Wall Thickness', val: wallPts, desc: wallPts === 2 ? 'Thicker than LV' : (wallPts === 1 ? 'Equal to LV' : 'Thinner than LV') });

    // 3. RA Enlargement (RAD vs LAD)
    const raRatio = parseFloat(this.rad) / parseFloat(this.lad);
    let raPts = 0;
    if (raRatio >= 1.5) raPts = 6;
    else if (raRatio > 1.1) raPts = 4;
    else if (raRatio >= 0.9) raPts = 2; // Equal
    score += raPts;
    breakdown.push({ name: 'RA Enlargement', val: raPts, desc: raPts === 6 ? '≥ 1.5x LA' : (raPts === 4 ? '> LA' : (raPts === 2 ? 'Equal to LA' : 'Normal')) });

    // 4. IVS Flattening (Subjective Input)
    const ivsPts = parseInt(this.ivsFlatteningChang) || 0;
    score += ivsPts;
    breakdown.push({ name: 'IVS Flattening', val: ivsPts, desc: ivsPts === 4 ? 'Moderate-Severe' : (ivsPts === 2 ? 'Subtle-Mild' : 'Normal') });

    // 5. PA Enlargement (PA/Ao) -> Fallback to mpaAo if paaola not set
    const paRatio = parseFloat( this.mpaAo || 0);
    let paPts = 0;
    if (paRatio >= 2.0) paPts = 6;
    else if (paRatio >= 1.5) paPts = 4;
    else if (paRatio > 1.0) paPts = 2;
    score += paPts;
    breakdown.push({ name: 'PA Enlargement', val: paPts, desc: paPts > 0 ? `Ratio: ${paRatio}` : 'Normal' });

    // 6. RVOT Flow Profile (Notching)
    const notchingPts = this.rvotNotching ? 1 : 0;
    score += notchingPts;
    breakdown.push({ name: 'RVOT Notching', val: notchingPts, desc: this.rvotNotching ? 'Present' : 'Absent' });

    // Determine Prediction Status based on Youden index cutoffs
    let prediction = "Low Risk of Severe PH";
    let alertClass = "normal";
    if (score >= 9) {
        prediction = "Predicts pTRV ≥ 4.3 m/s (Severe Pre-Capillary PH)";
        alertClass = "abnormal"; // Deep Red
    } else if (score >= 4) {
        prediction = "Predicts pTRV ≥ 3.4 m/s (Moderate-Severe Pre-Capillary PH)";
        alertClass = "warning"; // Orange
    }

    return { total: score, breakdown, prediction, alertClass };
},



//BREED SPECIFIC RANGES LOGIC


// Dynamic toast state
    showModelChangeToast: false,
    toastTitle: '',
    toastMessage: '',

 handleBreedSelection() {
        // Sync the text box with the dropdown (used for your PDF report generator)
        if (this.selectedBreed) {
            this.breed = this.selectedBreed;
        }

        // Safely exit if the breed data isn't loaded or nothing is selected
        if (!this.selectedBreed || typeof breedSpecificReferenceRanges === 'undefined') {
            return; // Alpine automatically clears the table, no manual DOM update needed!
        }

        const breedData = breedSpecificReferenceRanges[this.selectedBreed];
        if (!breedData) return;

        let targetModel = null;
        let title = '';
        let message = '';

        // Check for Sighthound flag
        if (breedData.isSighthound && this.selectedModel !== 'stepien_sighthound') {
            targetModel = 'stepien_sighthound';
            title = 'Model Updated: Sighthound';
            message = 'We automatically switched the allometric model to the Sighthound/Whippet references.';
        } 
        // Check for Feline flag
        else if (breedData.isFeline && this.selectedModel !== 'karsten_adult_cat') {
            targetModel = 'karsten_adult_cat'; 
            title = 'Model Updated: Feline';
            message = 'We automatically switched the allometric model to the standard feline references.';
        }
        // Check for Toy Breed flag
        else if (breedData.isToy && this.selectedModel !== 'isayama_toy_breed_2022') {
            targetModel = 'isayama_toy_breed_2022'; 
            title = 'Model Updated: Toy Breed';
            message = 'We automatically switched the allometric model to the Isayama Toy Breed references.';
        }
        // Check for Kitten flag
        else if (breedData.isKitten && this.selectedModel !== 'visser_kitten') {
            targetModel = 'visser_kitten'; 
            title = 'Model Updated: Pediatric Feline';
            message = 'We automatically switched the allometric model to the Visser kitten references.';
        }

        // If a change is needed, update state and trigger the dynamic toast
        if (targetModel) {
            this.selectedModel = targetModel;
            this.toastTitle = title;
            this.toastMessage = message;
            this.showModelChangeToast = true;
            
            // Hide the toast after 5 seconds
            setTimeout(() => {
                this.showModelChangeToast = false;
            }, 5000);
        }

    },
    
get availableBreeds() {
    return typeof breedSpecificReferenceRanges !== 'undefined' 
        ? Object.keys(breedSpecificReferenceRanges).sort() 
        : [];
},

get breedTableHtml() {
        const breedName = this.selectedBreed;
        if (!breedName || typeof breedSpecificReferenceRanges === 'undefined') return '';

        const breedData = breedSpecificReferenceRanges[breedName];
        if (!breedData) return '';

        const excludedTags = ['is_deviant', 'isSighthound', 'isFeline', 'isToy', 'isKitten', 'pmid', 'clinical_note', 'reference', 'sources'];

        // Helper to format values cleanly
        const getVal = (val) => {
            if (val === null || val === undefined || val === '' || val === 0 || val === '0' || val === '0.00' || isNaN(val)) {
                return '—';
            }
            return val;
        };

        // Live patient mapping
        const patientValues = {
            "lvidd_mm": getVal(this.lvidd),
            "lvids_mm": getVal(this.lvids),
            "ivsd_mm":  getVal(this.ivsd),
            "lvpwd_mm": getVal(this.lvpwd),
            "lvfwd_mm": getVal(this.lvpwd), 
            "lad_mm":   getVal(this.lad),
            "lad":      getVal(this.lad),   
            "TAPSE_mm": getVal(this.tapse),
            "lvidd_n":  getVal(this.lviddn),
            "lvids_n":  getVal(this.lvidsn),
            "la_ao":    getVal(this.laAo),
            "la_n":     getVal(this.lan),
            "lad_n":    getVal(this.ladn),
            "TAPSE_Ao": getVal(this.tapseaola),
            "eivrt":    getVal(this.eivrt),
            "fs_pct":   getVal(this.fs),
            "ef_pct":   getVal(this.ef),
            "FS_PCT":   getVal(this.fs),
            "EF_PCT":   getVal(this.ef), 
            "FS":       getVal(this.fs), 
            "EF":       getVal(this.ef), 
            "edvi_smod_kg": getVal(this.lvedvbw),
            "esvi_smod_kg": getVal(this.lvesvbw),
            "edvi_smod_m2": getVal(this.edvim2),
            "esvi_smod_m2": getVal(this.esvim2),
            "esv_smod":     getVal(this.lvesv),
            "edv_smod":     getVal(this.lvedv),
            "ao_vmax":  getVal(this.aovmax)
        };

        // --- NEW: GLOSSARY MAPPER ---
        // Maps the breed data keys to your exact glossary database keys
        const glossaryKeyMap = {
            "lvidd_mm": "lvidd",
            "lvids_mm": "lvids",
            "ivsd_mm":  "ivsd",
            "lvpwd_mm": "lvpwd",
            "lvfwd_mm": "lvpwd",
            "lad_mm":   "lad",
            "lad":      "lad",
            "TAPSE_mm": "tapse",
            "lvidd_n":  "lviddn",
            "lvids_n":  "lvidsn",
            "la_ao":    "laAo",
            "la_n":     "lan",
            "lad_n":    "ladn",
            "TAPSE_Ao": "tapseaola",
            "eivrt":    "eivrt",
            "fs_pct":   "fs",
            "ef_pct":   "ef",
            "FS_PCT":   "fs",
            "EF_PCT":   "ef",
            "FS":       "fs",
            "EF":       "ef",
            "edvi_smod_kg": "lvedv_wess", // Pointing to the new wess descriptions we wrote
            "esvi_smod_kg": "lvesv_wess",
            "edvi_smod_m2": "edvim2",
            "esvi_smod_m2": "esvim2",
            "esv_smod":     "lvesv",
            "edv_smod":     "lvedv",
            "ao_vmax":  "aovmax"
        };

        const formatLabel = (key) => {
            let label = key.toUpperCase().replace(/_/g, ' ');
            label = label.replace(/\bMM\b/g, '(mm)');
            label = label.replace(/\bLA AO\b/g, 'LA:Ao');
            label = label.replace(/\bTAPSE AO\b/g, 'TAPSE:Ao');
            label = label.replace(/\bLVFWD\b/g, 'LVFWd');
            label = label.replace(/\bSMOD KG\b/g, '(smod)/kg');
            label = label.replace(/\bSMOD M2\b/g, '(smod)/m²');
            label = label.replace(/\bESV SMOD\b/g, 'ESV (smod)');
            label = label.replace(/\bEDV SMOD\b/g, 'EDV (smod)');
            label = label.replace(/\bVMAX\b/g, '(Vmax)');
            label = label.replace(/\bPCT\b/g, '%');
            label = label.replace(/\bLVIDD N\b/g, 'LVIDdn');
            label = label.replace(/\bLVIDS N\b/g, 'LVIDsn');
            return label;
        };

    const renderSourceBlock = (dataObj, title = null) => {
            let metrics = dataObj.metrics || dataObj;
            let blockHtml = title ? `<h4 style="margin: 25px 0 10px 0; color: #1e40af; border-bottom: 2px solid #e2e8f0; padding-bottom: 5px;">${title}</h4>` : '';
            
            let usesCalculatedSd = false; // Reactivated!
            
            // 1. Check our flag
            const showPatient = !this.isStandaloneMode;
            
            // 2. Conditionally inject the Table Header
            blockHtml += `<table style="width: 100%; border-collapse: collapse; font-size: 0.9rem; border: 1px solid #dee2e6;">
                     <thead style="background-color: #f8f9fa;">
                        <tr>
                            <th style="padding: 10px; border: 1px solid #dee2e6; text-align: left;">Metric</th>
                            ${showPatient ? '<th style="padding: 10px; border: 1px solid #dee2e6; text-align: left;">Patient</th>' : ''}
                            <th style="padding: 10px; border: 1px solid #dee2e6; text-align: left;">Breed Ref</th>
                        </tr>
                     </thead><tbody>`;
            
            Object.keys(metrics).forEach(key => {
                if (excludedTags.includes(key)) return;
                let val = metrics[key], label = formatLabel(key);
                let infoIcon = glossaryKeyMap[key] ? ` <i class="fa-solid fa-circle-info" style="color: #94a3b8; cursor: pointer; margin-left: 6px; transition: color 0.2s;" onmouseover="this.style.color='#0ea5e9'" onmouseout="this.style.color='#94a3b8'" @click="openGlossary('${glossaryKeyMap[key]}')"></i>` : '';
                
                let rangeString = '—';
                if (typeof val === 'object' && val !== null) {
                    
                    // --- SD CONVERSION LOGIC REACTIVATED ---
                    if (val.median !== undefined && val.sd !== undefined && val.min === undefined && val.max === undefined) {
                        usesCalculatedSd = true;
                        val.min = (val.median - (1.96 * val.sd)).toFixed(2);
                        val.max = (val.median + (1.96 * val.sd)).toFixed(2);
                    }

                    if (val.min !== undefined && val.max !== undefined) rangeString = `${val.min}–${val.max}`;
                    else if (val.max !== undefined) rangeString = `< ${val.max}`;
                    else if (val.median !== undefined) rangeString = `~${val.median}`;
                } else {
                    rangeString = val || '—';
                }
                
                let pVal = patientValues[key] || '—';
                const isAbnormal = (pVal !== '—' && val && val.max && parseFloat(pVal) > parseFloat(val.max));
                
                // 3. Conditionally inject the Table Cell
                let patientCellHtml = showPatient 
                    ? `<td style="padding: 10px; border: 1px solid #dee2e6; ${isAbnormal ? 'background-color: #fef2f2; color: #ef4444; font-weight: bold;' : ''}">${pVal}</td>` 
                    : '';

                blockHtml += `<tr>
                            <td style="padding: 10px; border: 1px solid #dee2e6; font-weight: 500; background-color: #f9fafb;">${label}${infoIcon}</td>
                            ${patientCellHtml}
                            <td style="padding: 10px; border: 1px solid #dee2e6; font-weight: bold;">${rangeString}</td>
                         </tr>`;
            });
            
            // Notice this is an append (+=), NOT an early return!
            blockHtml += `</tbody></table>`;
      
            
            if (usesCalculatedSd) {
                blockHtml += `
                    <div style="background-color: #f0fdf4; padding: 10px 12px; border-radius: 4px; color: #166534; border: 1px solid #bbf7d0; font-size: 0.8rem; margin-top: 10px; display: flex; align-items: flex-start; gap: 8px;">
                        <i class="fa-solid fa-calculator" style="margin-top: 2px;"></i>
                        <div>
                            <strong>Statistical Derivation Note:</strong> This study originally published data as Median ± SD. 
                            The reference intervals shown above were programmatically derived using a standard two-sided 95% confidence interval 
                            where <code>Reference Range = Median ± (1.96 × SD)</code>.
                        </div>
                    </div>`;
            }
        
            if (dataObj.clinical_note) blockHtml += `<div style="background-color: #f1f5f9; padding: 12px; border-radius: 4px; font-style: italic; margin-top: 15px; border-left: 4px solid #64748b; font-size: 0.9rem;"><strong>Note:</strong> ${dataObj.clinical_note}</div>`;
            if (dataObj.pmid) blockHtml += `<p style="margin-top:10px;"><a href="https://pubmed.ncbi.nlm.nih.gov/${dataObj.pmid}" target="_blank" style="color: #2563eb; font-size: 0.85rem; text-decoration: underline;">🔗 View Research (PMID: ${dataObj.pmid})</a></p>`;

            return blockHtml;
        };

        let html = '';

        if (breedData.is_deviant) {
            html += `<div style="background-color: #fff3cd; border-left: 5px solid #ffc107; padding: 15px; margin-bottom: 15px; color: #856404; font-weight: bold; border-radius: 4px;">
                        ⚠️ CLINICAL ALERT: ${breedName} is a "deviant" breed.
                     </div>`;
        }

        if (breedData.sources && Array.isArray(breedData.sources)) {
            breedData.sources.forEach((source, index) => {
                html += renderSourceBlock(source, source.reference || `Source ${index + 1}`);
            });
        } else {
            html += renderSourceBlock(breedData);
        }

        html += `<div style="background-color: #f9f9f9; padding: 12px; border-radius: 4px; margin-top: 20px; border-left: 4px solid #999999; font-size: 0.85rem;">
                    <strong>Caveat:</strong> In practice, breed normals serve as starting values; each animal’s weight and context must be considered. Clinicians should integrate multiple indices (e.g. body-size normalized LVID, EF, LA/Ao, etc.) when assessing an individual.
                 </div>`;

        return html;
    },
    
    
    
    
    
 /* ACVIM Pulmonary Hypertension (PHT) Probability Algorithm */
get phClassification() {
    if (!this.isDog) return null;

    let evaluatedCount = 0;
    
    // We will build a structured audit for the UI to group by site
    let auditGroups = {
        doppler: { title: 'Primary Doppler', isActive: false, items: [] },
        site1: { title: 'Site 1: Ventricles', isActive: false, items: [] },
        site2: { title: 'Site 2: Pulm. Artery', isActive: false, items: [] },
        site3: { title: 'Site 3: Right Atrium', isActive: false, items: [] },
        chang: { title: '2026 Predictive Score', isActive: false, items: [] }
    };

    // SINGLE, CORRECTED HELPER: Evaluates, pushes to audit, and attaches Glossary Key
    const addMetric = (groupKey, name, valStr, isAbnormal, thresholdStr, glossaryKey = null) => {
        evaluatedCount++;
        auditGroups[groupKey].items.push({
            name,
            val: valStr,
            isAbnormal,
            threshold: thresholdStr,
            statusLabel: isAbnormal ? 'Abnormal' : 'Normal',
            glossaryKey // Passes the key to the UI
        });
        if (isAbnormal && groupKey !== 'chang') {
            auditGroups[groupKey].isActive = true;
        }
    };

    // --- 1. Evaluate TR Velocity Vector ---
    const tr = parseFloat(this.trMax) || 0;
    if (tr > 0) {
        let isAbnormal = tr >= 2.9;
        let thresholdStr = tr > 3.4 ? '> 3.4 m/s (Severe)' : (tr >= 2.9 ? '2.9-3.4 m/s (Mod)' : '< 2.9 m/s (Normal)');
        addMetric('doppler', 'TR Peak Velocity', `${tr} m/s`, isAbnormal, thresholdStr, 'trMax');
    }

    // --- 2. Evaluate ACVIM Site 1: Ventricles ---
    if (this.lvei > 0) addMetric('site1', 'LVEI (Septal Flattening)', this.lvei, this.lvei >= 1.2, '≥ 1.2', 'lvei');
    if (this.rveda > 0 && this.rightAllometricResults?.rveda?.available) {
        addMetric('site1', 'RVEDA', `${this.rveda} cm²`, parseFloat(this.rveda) > this.rightAllometricResults.rveda.max, `> ${this.rightAllometricResults.rveda.max} (Allo Max)`, 'rveda');
    }
    if (this.rvwt > 0 && this.rightAllometricResults?.rvwt?.available) {
        addMetric('site1', 'RVWT', `${this.rvwt} mm`, parseFloat(this.rvwt) > this.rightAllometricResults.rvwt.max, `> ${this.rightAllometricResults.rvwt.max} (Allo Max)`, 'rvwt');
    }
    if (this.rvwtlvpwd > 0) addMetric('site1', 'RVWT:LVPWd', this.rvwtlvpwd, parseFloat(this.rvwtlvpwd) > 1.0, '> 1.0', 'rvwtlvpwd');


// --- 3. Evaluate ACVIM Site 2: Pulmonary Artery ---
    if (this.mpaAo > 0) addMetric('site2', 'MPA:Ao', this.mpaAo, parseFloat(this.mpaAo) > 1.0, '> 1.0', 'mpaAo');
    if (this.paaola > 0) addMetric('site2', 'PA:Ao(LA)', this.paaola, parseFloat(this.paaola) > 1.0, '> 1.0', 'paaola');
    if (this.rpaIndex > 0) addMetric('site2', 'RPA Index', this.rpaIndex, this.rpaIndex >= 3.0, '≥ 3.0', 'rpadi');
    
    if (this.mpamin > 0 && this.rightAllometricResults?.mpamin?.available) {
        addMetric('site2', 'MPA min', `${this.mpamin} mm`, parseFloat(this.mpamin) > this.rightAllometricResults.mpamin.max, `> ${this.rightAllometricResults.mpamin.max} (Allo Max)`, 'mpamin');
    }
    if (this.rpamin > 0 && this.rightAllometricResults?.rpamin?.available) {
        addMetric('site2', 'RPA min', `${this.rpamin} mm`, parseFloat(this.rpamin) > this.rightAllometricResults.rpamin.max, `> ${this.rightAllometricResults.rpamin.max} (Allo Max)`, 'rpamin');
    }

    //  PR Velocity Evaluation (ACVIM Site 2 Criteria)
    const pr = parseFloat(this.prMax) || 0;
    if (pr > 0) {
        let isAbnormal = pr >= 2.5;
        let thresholdStr = pr >= 2.5 ? '≥ 2.5 m/s (High)' : (pr >= 2.0 ? '2.0-2.5 m/s (Borderline)' : '< 2.0 m/s (Normal)');
        addMetric('site2', 'PR Peak Velocity', `${pr} m/s`, isAbnormal, thresholdStr, 'prMax');
    }

    // --- 4. Evaluate ACVIM Site 3: Right Atrium ---
    if (this.rad > 0 && this.rightAllometricResults?.rad?.available) {
        addMetric('site3', 'RAD (Ap4Ch)', `${this.rad} mm`, parseFloat(this.rad) > this.rightAllometricResults.rad.max, `> ${this.rightAllometricResults.rad.max} (Allo Max)`, 'rad');
    }

    // Determine Anatomic Sites Count
    let siteVentricle = auditGroups.site1.isActive;
    let sitePA = auditGroups.site2.isActive;
    let siteRA = auditGroups.site3.isActive;
    const anatomicSites = (siteVentricle ? 1 : 0) + (sitePA ? 1 : 0) + (siteRA ? 1 : 0);

    // --- 5. Fetch Chang 2026 Score ---
    const chang = this.changScoreResults;
    const hasChangWarning = (chang && chang.total >= 4);
    if (chang && chang.total > 0) {
        // We leave glossaryKey null here because we have a separate link to the paper in the UI
        addMetric('chang', 'Total Score', `${chang.total} / 25`, hasChangWarning, '≥ 4 Points');
        if (hasChangWarning) auditGroups.chang.isActive = true;
    }

    // If absolutely no PH data exists, return null
    if (evaluatedCount === 0) return null; 

    // --- 6. Determine Final ACVIM Probability Matrix ---
    let probability = 'Low Probability';
    let stepIndex = 0;
    let riskClass = 'normal'; 
    
    if (tr > 3.4) {
        probability = 'High Probability';
        stepIndex = 2;
        riskClass = "abnormal";
    } else if (tr >= 2.9 && tr <= 3.4) {
        if (anatomicSites >= 2) {
            probability = 'High Probability';
            stepIndex = 2;
            riskClass = 'abnormal';
        } else {
            probability = 'Intermediate Probability';
            stepIndex = 1;
            riskClass = 'warning';
        }
    } else {
        // TR < 2.9 or unmeasurable
        if (anatomicSites >= 2) {
            probability = "Intermediate Probability";
            stepIndex = 1;
            riskClass = 'warning';
        } else if (hasChangWarning) {
            probability = "Intermediate Probability (Chang Score Override)";
            stepIndex = 1;
            riskClass = 'warning';
        } else {
            probability = "Low Probability";
            stepIndex = 0;
            riskClass = 'normal';
        }
    }
    
    // Convert the auditGroups object into an array for easier Alpine rendering
    const comprehensiveAudit = Object.values(auditGroups).filter(group => group.items.length > 0);

    return { 
        probability, 
        stepIndex, 
        riskClass, 
        comprehensiveAudit, 
        anatomicSites,
        siteDetails: { siteVentricle, sitePA, siteRA },
        changScore: chang 
    };
},







/* Specialized Decoupled Right Heart Allometric Evaluator */
get availableRightModels() {
    if (typeof rightHeartModels === 'undefined') return [];
    return Object.keys(rightHeartModels).map(key => ({
        id: key,
        label: rightHeartModels[key].label
    }));
},

/* Specialized Decoupled Right Heart Allometric Evaluator */
get rightAllometricResults() {
    const results = {};
    // List all possible right heart parameters
    const targets = ['tapse', 'rvwt', 'rveda', 'rvesa', 'rvd1', 'rad', 'rvedv', 'rvesv', 'rvSPrime','mpamin', 'rpamax', 'rpamin'];

    // 1. PRE-FILL SAFE DEFAULTS (This prevents the HTML crash!)
    targets.forEach(t => {
        results[t] = { min: '—', max: '—', mean: '—', available: false };
    });

    // 2. Abort if no weight or models, but return the padded object!
    if (!this.weight || this.weight <= 0 || typeof rightHeartModels === 'undefined') {
        return results; 
    }
    
    const modelData = rightHeartModels[this.selectedRightModel];
    if (!modelData) return results;

    // 3. Calculate actual values if data exists
    targets.forEach(param => {
        const formula = modelData.params?.[param];
        if (!formula) return; // Keep the default we set in Step 1

        let mean, lower, upper;

        if (formula.type === 'log_direct') {
            // FELDHÜTTER MATH
            const logMean = formula.a + (formula.b * Math.log10(this.weight));
            mean = Math.pow(10, logMean); 
            const see = formula.see || 0; 
            lower = Math.pow(10, logMean - (1.96 * see));
            upper = Math.pow(10, logMean + (1.96 * see));
        } else {
            // VISSER & GENTILE MATH
            mean = formula.a * Math.pow(this.weight, formula.b);
            lower = formula.minMultiplier ? formula.minMultiplier * mean : mean - (1.96 * (formula.see || 0));
            upper = formula.maxMultiplier ? formula.maxMultiplier * mean : mean + (1.96 * (formula.see || 0));
        }

        const scale = formula.multiplier || 1;
        mean *= scale;
        lower *= scale;
        upper *= scale;

        if (lower < 0) lower = 0;

        // Overwrite the defaults with the real numbers
        results[param] = {
            min: parseFloat(lower.toFixed(2)),
            max: parseFloat(upper.toFixed(2)),
            mean: parseFloat(mean.toFixed(2)),
            available: true
        };
    });

    return results;
},





    /* Diastolic Scorer */
get diastolicClassification() {
    if (!this.isDog) return null;
    
    const inputs = {
        ear: parseFloat(this.ear),
        eivrt: parseFloat(this.eivrt),
        eePrime: parseFloat(this.eePrime),
        lveio: parseFloat(this.lveio),
        laAo: parseFloat(this.laAo),
        ivrt: parseFloat(this.ivrt), 
        mdt: parseFloat(this.mdt),
        trMax: parseFloat(this.trMax)
    };

    let evaluatedCount = 0;
    let rawBreakdown = [];
    
    // Disease severity tracking trackers
    let grade1Points = 0;
    let grade2Points = 0;
    let grade3Points = 0;

    const metaMapping = {
        ear: { name: 'E:A Ratio', unit: '' },
        eivrt: { name: 'E:IVRT Ratio', unit: '' },
        eePrime: { name: 'E:E\' Ratio', unit: '' },
        lveio: { name: 'LVEIO (E:LVOT VTI)', unit: '' },
        laAo: { name: 'LA:Ao Ratio', unit: '' },
        ivrt: { name: 'Raw IVRT', unit: ' ms' },
        mdt: { name: 'Mitral Deceleration Time (MDT)', unit: ' ms' },
        trMax: { name: 'TR Max Velocity', unit: ' m/s' }
    };

    // Step 1: Accumulate Pathological Points
    Object.keys(inputs).forEach(key => {
        const val = inputs[key];
        const rules = diastolicRules[key];
        
        if (val && !isNaN(val) && val > 0 && rules) {
            const match = rules.find(r => val >= r.min && val <= r.max);
            if (match) {
                evaluatedCount++;
                
                if (match.grade === 'Grade I') grade1Points += match.points;
                if (match.grade === 'Grade II') grade2Points += match.points;
                if (match.grade === 'Grade III') grade3Points += match.points;

                const threshIdx = rules.indexOf(match);
                let thresholdText = threshIdx === 0 ? `≤ ${match.max}` : match.max === Infinity ? `> ${rules[threshIdx-1].max}` : `${rules[threshIdx-1].max} – ${match.max}`;

                rawBreakdown.push({
                    key: key,
                    name: metaMapping[key].name,
                    val: `${val}${metaMapping[key].unit}`,
                    threshold: thresholdText,
                    category: match.category,
                    grade: match.grade,
                    points: match.points
                });
            }
        }
    });

    if (evaluatedCount < 2) {
        return { grade: 'Awaiting Metrics', stepIndex: -1, label: 'Enter at least 2 parameters.', class: 'normal', evaluatedCount: evaluatedCount, breakdown: [] };
    }

    // Step 2: Determine Final Staging via Cluster Weights
    let finalGrade = 'Normal';
    let stepIndex = 0;
    let label = 'Normal Diastologic Performance';
    let className = 'normal';

    const highLAPPoints = grade2Points + grade3Points;

    if (highLAPPoints === 0 && grade1Points === 0) {
        // Patient is perfectly normal - zero accumulated pathology points
        finalGrade = 'Normal';
        stepIndex = 0;
        label = 'Normal Diastologic Performance';
        className = 'normal';
    } else if (highLAPPoints === 0 && grade1Points > 0) {
        // Relaxation is delayed, but filling pressures (LAP) remain entirely normal
        finalGrade = 'Grade I';
        stepIndex = 1;
        label = 'Impaired Relaxation Pattern (Normal LAP)';
        className = 'normal'; 
    } else {
        // High LAP pressure markers are active. Balance Grade II vs Grade III
        if (grade3Points >= grade2Points || grade3Points >= 5) {
            finalGrade = 'Grade III';
            stepIndex = 3;
            label = 'Restrictive Filling Profile (High Risk Acute CHF)';
            className = 'abnormal';
        } else {
            finalGrade = 'Grade II';
            stepIndex = 2;
            label = 'Pseudonormal Pattern (Elevated LAP Suspected)';
            className = 'abnormal';
        }
    }

    // Step 3: Identify Discordant Values (Conflict Checker Matrix)
    const finalizedBreakdown = rawBreakdown.map(item => {
        let conflicts = false;
        
        if (finalGrade === 'Normal' && item.points > 0) conflicts = true;
        if (finalGrade === 'Grade I' && item.grade !== 'Grade I' && item.points > 0) conflicts = true;
        if ((finalGrade === 'Grade II' || finalGrade === 'Grade III') && item.grade === 'Grade I') conflicts = true;
        
        // Flag row if a high-pressure marker shows a "Normal" state while final status is elevated
        if ((finalGrade === 'Grade II' || finalGrade === 'Grade III') && item.grade === 'Normal') {
            // Note: ear, ivrt, and mdt naturally pseudo-normalize back to baseline limits.
            // Their normal status isn't a conflict; it is an intrinsic part of the Grade II profile.
            if (item.key !== 'ear' && item.key !== 'ivrt' && item.key !== 'mdt') {
                conflicts = true;
            }
        }
        return { ...item, conflicts: conflicts };
    });

     const conflictCount = finalizedBreakdown.filter(i => i.conflicts).length;
    let confidenceLabel = 'Robust Alignment';
    if (conflictCount > 0) confidenceLabel = 'Mixed Profile (Minor Discrepancy)';
    if (conflictCount >= evaluatedCount / 2) confidenceLabel = 'Equivocal (High Contradiction)';

    return {
        grade: finalGrade,
        stepIndex: stepIndex,
        label: label,
        class: className,
        evaluatedCount: evaluatedCount,
        breakdown: finalizedBreakdown,
        pointsSummary: { I: grade1Points, II: grade2Points, III: grade3Points },
        confidence: confidenceLabel
    };
},

hasSectionData(fieldsArray) {
    for (const field of fieldsArray) {
        const val = parseFloat(this[field]);
        if (val && !isNaN(val) && val !== 0) {
            return true;
        }
    }
    return false;
},

    /* 3. ALLOMETRIC GETTERS */
    get allometricResults() {
        const results = {};
        const params = ['lvidd', 'lvids', 'ivsd', 'lvpwd', 'la', 'ao', 'lad'];
        params.forEach(p => {
            results[p] = this.calculateRef(p) || { min: 0, max: 0, mean: 0 };
        });
        return results;
    },
    get isDog() { 
        if (typeof allometricModels === 'undefined') return false;
        return allometricModels[this.selectedModel]?.species?.toLowerCase() === 'canine'; 
    },
    get isCat() { 
        if (typeof allometricModels === 'undefined') return false;
        return allometricModels[this.selectedModel]?.species?.toLowerCase() === 'feline'; 
    },
    get isSighthound() {
        return this.selectedModel === 'stepien_sighthound';
    },
    
    calculateRef(paramKey) {
    if (!this.weight || this.weight <= 0 || typeof allometricModels === 'undefined') {
        return { min: 0, max: 0, mean: 0, available: false };
    }
    const modelData = allometricModels[this.selectedModel];
    const model = modelData?.params?.[paramKey];
    if (!model) return { min: null, max: null, mean: null, available: false };

    const scaleFactor = modelData.isCm ? 10 : 1;
    const multiplier = modelData.multiplier || 1.96;
    let lower, upper, mean;

    if (model.type === 'log_direct' || model.type === 'log') {
        const logMean = (model.type === 'log_direct') 
            ? model.a + (model.b * Math.log10(this.weight))
            : Math.log10(model.a) + (model.b * Math.log10(this.weight));
        mean = Math.pow(10, logMean);
        lower = Math.pow(10, logMean - (multiplier * model.see));
        upper = Math.pow(10, logMean + (multiplier * model.see));
    } else {
        const bwPower = Math.pow(this.weight, model.b);
        mean = model.a * bwPower;
        lower = (model.normMin || model.a) * bwPower;
        upper = (model.normMax || model.a) * bwPower;
    }

    return {
        min: parseFloat((lower * scaleFactor).toFixed(1)),
        max: parseFloat((upper * scaleFactor).toFixed(1)),
        mean: parseFloat((mean * scaleFactor).toFixed(1)),
        available: true
    };
},


calculateVolumetricRef(paramKey) {
        // paramKey should be 'edv' or 'esv'
        
        if (!this.weight || this.weight <= 0 || typeof leftHeartModels === 'undefined') {
            return { min: 0, max: 0, available: false };
        }

        // Feline data is not yet available for this model
        if (this.isCat) {
            return { min: 0, max: 0, available: false };
        }

        // Route to the correct array based on the selected linear model
        const isSighthound = this.selectedModel === 'stepien_sighthound';
        const modelKey = isSighthound ? 'wess_2021_smod_sighthound' : 'wess_2021_smod_nonsighthound';
        const modelData = leftHeartModels[modelKey]?.data;

        if (!modelData) return { min: 0, max: 0, available: false };

        const minProp = `${paramKey}Min`; // e.g., 'edvMin'
        const maxProp = `${paramKey}Max`; // e.g., 'edvMax'

        // Inline interpolation helper
        const interpolate = (prop) => {
            const wt = this.weight;
            
            // Handle extremes outside the published table
            if (wt <= modelData[0].weight) return modelData[0][prop];
            if (wt >= modelData[modelData.length - 1].weight) return modelData[modelData.length - 1][prop];

            // Find upper and lower brackets
            let lowerObj = modelData[0];
            let upperObj = modelData[1];

            for (let i = 0; i < modelData.length - 1; i++) {
                if (wt >= modelData[i].weight && wt <= modelData[i + 1].weight) {
                    lowerObj = modelData[i];
                    upperObj = modelData[i + 1];
                    break;
                }
            }

            const weightDiff = upperObj.weight - lowerObj.weight;
            const paramDiff = upperObj[prop] - lowerObj[prop];
            const weightOffset = wt - lowerObj.weight;

            return lowerObj[prop] + (weightOffset * paramDiff / weightDiff);
        };

        const lowerVal = interpolate(minProp);
        const upperVal = interpolate(maxProp);

        return {
            min: parseFloat(lowerVal.toFixed(1)),
            max: parseFloat(upperVal.toFixed(1)),
            available: true
        };
    },

    get volumetricResults() {
        return {
            edv: this.calculateVolumetricRef('edv'),
            esv: this.calculateVolumetricRef('esv')
        };
    },


      // MINE SCORE LOGIC
      
get calculatedMineScore() {
    if (!this.isDog || typeof mineModels === 'undefined') return null;
    const model = mineModels[this.selectedMineModel];
    if (!model) return null;
    
    let totalPoints = 0;
    let missingFields = [];
    let breakdown = [];

    model.variables.forEach(v => {
        // Smart fetcher for the toggle mode
        let val;
        if (this.mineInputMode === 'calculated' && v !== 'eVel') {
            if (v === 'laAo') val = parseFloat(this.manualLaAo);
            else if (v === 'lviddn') val = parseFloat(this.manualLviddn);
            else if (v === 'fs') val = parseFloat(this.manualFs);
        } else {
            val = parseFloat(this[v]);
        }
        
        const displayName = v === 'laAo' ? 'LA:Ao' : 
                            v === 'lviddn' ? 'LVIDdn' : 
                            v === 'fs' ? 'FS' : 
                            v === 'eVel' ? 'E-wave Vel' : v.toUpperCase();
                            
        // Check for missing data
        if (!val || isNaN(val) || val <= 0) {
            missingFields.push(displayName);
            breakdown.push({
                name: displayName,
                val: '—',
                threshold: 'Awaiting entry',
                pts: 0
            });
            return; 
        }
        
        const ranges = model.ranges[v];
        const matchRule = ranges.find(r => val <= r.max);
        const ptsAwarded = matchRule ? matchRule.pts : 0;
        totalPoints += ptsAwarded;

        const matchIndex = ranges.indexOf(matchRule);
        let thresholdText = '';
        if (matchIndex === 0) {
            thresholdText = `≤ ${matchRule.max}`;
        } else if (matchRule.max === Infinity) {
            thresholdText = `> ${ranges[matchIndex - 1].max}`;
        } else {
            thresholdText = `${ranges[matchIndex - 1].max} – ${matchRule.max}`;
        }

        const unitSuffix = v === 'fs' ? '%' : v === 'eVel' ? ' m/s' : '';

        breakdown.push({
            name: displayName,
            val: `${val}${unitSuffix}`,
            threshold: thresholdText,
            pts: ptsAwarded
        });
    });

    if (missingFields.length > 0) {
        return { 
            score: null, 
            tier: null, 
            mst: null, 
            status: 'Awaiting inputs', 
            breakdown: breakdown 
        };
    }

    const activeTier = model.tiers.find(t => totalPoints >= t.min && totalPoints <= t.max);
    return {
        score: totalPoints,
        tier: activeTier ? activeTier.label : 'Unclassified',
        mst: activeTier ? activeTier.mst : 'N/A',
        class: activeTier ? activeTier.class : 'normal',
        status: 'Complete',
        breakdown: breakdown
    };
},

    /* 4. METHODS */

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
},


    calculateRef(paramKey) {
        if (!this.weight || this.weight <= 0 || typeof allometricModels === 'undefined') {
            return { min: 0, max: 0, mean: 0, available: false };
        }
        const modelData = allometricModels[this.selectedModel];
        const model = modelData?.params?.[paramKey];
        if (!model) return { min: null, max: null, mean: null, available: false };

        const scaleFactor = modelData.isCm ? 10 : 1;
        const multiplier = modelData.multiplier || 1.96;
        let lower, upper, mean;

        if (model.type === 'log_direct' || model.type === 'log') {
            const logMean = (model.type === 'log_direct') 
                ? model.a + (model.b * Math.log10(this.weight))
                : Math.log10(model.a) + (model.b * Math.log10(this.weight));
            mean = Math.pow(10, logMean);
            lower = Math.pow(10, logMean - (multiplier * model.see));
            upper = Math.pow(10, logMean + (multiplier * model.see));
        } else {
            const bwPower = Math.pow(this.weight, model.b);
            mean = model.a * bwPower;
            lower = (model.normMin || model.a) * bwPower;
            upper = (model.normMax || model.a) * bwPower;
        }

        return {
            min: parseFloat((lower * scaleFactor).toFixed(1)),
            max: parseFloat((upper * scaleFactor).toFixed(1)),
            mean: parseFloat((mean * scaleFactor).toFixed(1)),
            available: true
        };
    },

    getTag(val, minOrObj, max, high = '[ENLARGED]', low = '[SMALL]') {
        const n = parseFloat(val);
        if (isNaN(n) || n === 0) return '';
        let minVal, maxVal;
        if (typeof minOrObj === 'object' && minOrObj !== null) {
            if (!minOrObj.available) return '';
            minVal = minOrObj.min;
            maxVal = minOrObj.max;
        } else {
            minVal = minOrObj;
            maxVal = max;
        }
        if (maxVal !== null && n > maxVal) return ` ${high}`;
        if (minVal !== null && n < minVal) return ` ${low}`;
        return '';
    },

    generateReportText() {
        if (typeof allometricModels === 'undefined') return 'Error: Reference models missing.';
        const model = allometricModels[this.selectedModel];
       const modelLabel = allometricModels[this.selectedModel].label;
        const results = this.allometricResults;
        const species = (model.species || 'VETERINARY').toUpperCase();
        
        let text = `${species} ECHOCARDIOGRAPHY REPORT\n`;
        text += `Date: ${this.reportDate} \n`;
        text += `Weight: ${this.weight}kg | BSA: ${this.bsa}m² | Model: ${modelLabel} \n`;
        text += `Patient Name: ${this.patientName} | Owner Name: ${this.ownerName} | Breed: ${this.breed} \n`;
        text += `--------------------------------------------------\n\n`;

        text += `LEFT VENTRICLE:\n`;
        const lvParams = [
            { key: 'lvidd', label: 'LVIDd' }, { key: 'lvids', label: 'LVIDs' },
            { key: 'ivsd', label: 'IVSd' }, { key: 'lvpwd', label: 'LVFWd' }
        ];
        
        lvParams.forEach(p => {
            const val = this[p.key];
            const res = results[p.key];
            if (val) {
                let line = `${p.label}: ${val}mm`; 
                if (res && res.available) {
                    const tag = this.getTag(val, res, null, 
                        (p.key.includes('ivs') || p.key.includes('pwd') ? '[THICKENED]' : '[ENLARGED]'), 
                        (p.key.includes('ivs') || p.key.includes('pwd') ? '[THIN]' : '[SMALL]'));
                    line += ` (Ref: ${res.min}-${res.max}mm)${tag}`;
                } else {
                    line += ` (No ref)`;
                }
                text += line + `\n`;
            }
        });
        if (this.lvedv > 0)   text += `LVEDV (Total): ${this.lvedv}ml\n`;
        if (this.lvesv > 0)   text += `LVESV (Total): ${this.lvesv}ml\n`;
        if (this.fs > 0) text += `Fractional Shortening: ${this.fs}% (Ref: >25%)${this.getTag(this.fs, 25, 999, '', '[ABNORMAL]')}\n`;
        if (this.ef > 0) text += `Ejection Fraction: ${this.ef}% (Ref: >50%)${this.getTag(this.ef, 50, 999, '', '[ABNORMAL]')}\n`;

        if (this.isDog) {
            if (this.RWT > 0) text += `Relative Wall Thickness: ${this.RWT} (Ref: 0.32-0.42)${this.getTag(this.RWT, 0.32, 0.42, '[THICK WALLS]', '[THIN WALLS]')}\n`;
            if (this.lviddn > 0) text += `LVIDdn: ${this.lviddn} (Ref: 1.27-1.70)${this.getTag(this.lviddn, 1.27, 1.70)}\n`;
            if (this.lvidsn > 0) text += `LVIDsn: ${this.lvidsn} (Ref: 0.71-1.26)${this.getTag(this.lvidsn, 0.71, 1.26)}\n`;
            if (this.lvedvbw > 0) text += `LVEDV/BW: ${this.lvedvbw} (Ref: 1.25-3.00)${this.getTag(this.lvedvbw, 1.25, 3.00)}\n`;
            if (this.lvesvbw > 0) text += `LVESV/BW: ${this.lvesvbw} (Ref: 0.30-1.35)${this.getTag(this.lvesvbw, 0.30, 1.35)}\n`;
        if (this.edvim2 > 0)  text += `LVEDV/m²: ${this.edvim2} (Ref: <100)${this.getTag(this.edvim2, null, 100)}\n`;
        if (this.esvim2 > 0)  text += `LVESV/m²: ${this.esvim2} (Ref: <30)${this.getTag(this.esvim2, null, 30)}\n`;

// --- QUANTITATIVE VALVULAR ASSESSMENT ---
if (this.mrFraction > 0) {
    text += `\nQUANTITATIVE VALVULAR ASSESSMENT:\n`;
    text += `Total LV Stroke Volume (Simpsons): ${this.sv}ml\n`;
    text += `Systemic Stroke Volume (Qs): ${this.qs}ml\n`;
    text += `Mitral Regurgitant Volume: ${this.mrVol}ml\n`;
    text += `Mitral Regurgitant Fraction: ${this.mrFraction}%\n`;
}
}

        

        text += `\nLEFT ATRIUM:\n`;
        const laParams = [{ key: 'la', label: 'LA' }, { key: 'ao', label: 'Ao' }, { key: 'lad', label: 'LAD' }];
        laParams.forEach(p => {
            const val = this[p.key];
            const res = results[p.key];
            if (val) {
                let line = `${p.label}: ${val}mm`; 
                if (res && res.available) {
                    line += ` (Ref: ${res.min}-${res.max}mm)${this.getTag(val, res)}`;
                } else {
                    line += ` (No ref)`;
                }
                text += line + `\n`;
            }
        });

        if (this.laAo > 0) text += `LA:Ao Ratio: ${this.laAo} (Ref: <1.65)${this.getTag(this.laAo, null, 1.65)}\n`;

if (this.isDog) {
        if (this.lan > 0)    text += `LA Normalized: ${this.lan} (Ref: <1.17)${this.getTag(this.lan, null, 1.17)}\n`;
        if (this.ladao > 0)  text += `LAD:Ao Ratio: ${this.ladao} (Ref: <2.10)${this.getTag(this.ladao, null, 2.10)}\n`;
        if (this.ladaola > 0)  text += `LAD:Ao(lax) Ratio: ${this.ladao} (Ref: <2.40)${this.getTag(this.ladaola, null, 2.40)}\n`;        
        if (this.ladn > 0)   text += `LADN: ${this.ladn} (Ref: <1.60)${this.getTag(this.ladn, null, 1.60)}\n`;
    }

        text += `\nSPECTRAL DOPPLER:\n`;
if (this.eVel > 0) {
    text += `E Vel: ${this.eVel} m/s (Ref: 0.6-1.0)\n`;
}
if (this.aVel > 0) {
    text += `A Vel: ${this.aVel} m/s (Ref: 0.3-0.8)\n`;
}
if (this.ivrt > 0) {
    text += `IVRT: ${this.ivrt} ms (Ref: 50-80)\n`;
}
if (this.mdt > 0) {
    text += `E wave DT: ${this.mdt} m/s (Ref: 60-100)\n`;
}
if (this.ear > 0) {
    text += `E:A Ratio: ${this.ear} (Ref: 0.95-1.6)${this.ear >= 1.6 ? ' [HIGH FILLING PRESSURE]' : ''}\n`;
}
if (this.eivrt > 0) {
    text += `E:IVRT Ratio: ${this.eivrt} (Ref: <2.5)${this.eivrt >= 2.5 ? ' [HIGH FILLING PRESSURE]' : ''}\n`;
}
if (this.ePrime > 0) {
    text += `Eprime: ${this.ePrime} (Ref: 0.95-1.6)${this.ear >= 1.6 ? ' [HIGH FILLING PRESSURE]' : ''}\n`;
}
if (this.eePrime > 0) {
    text += `E:Eprime Ratio: ${this.eePrime} (Ref: <12)${this.ear >= 12 ? ' [HIGH FILLING PRESSURE]' : ''}\n`;
}
if (this.lveio > 0) {
    text += `LVEIO: ${this.lveio} (Ref: <11.85)${this.ear >= 11.85 ? ' [HIGH FILLING PRESSURE]' : ''}\n`;
}

// --- OUTFLOW TRACT & STENOSIS EVALUATION ---
if (this.aovmax || this.pavmax) {
    if (this.aovmax)   text += `Ao Vmax: ${this.aovmax} m/s | PG: ${this.aoGradient} mmHg | ${this.aoStenosisGrade.label.toUpperCase()}\n`;
    if (this.pavmax)  text += `PA Vmax: ${this.pavmax} m/s | PG: ${this.paGradient} mmHg | ${this.paStenosisGrade.label.toUpperCase()}\n`;
}


// --- SHUNT RATIOS ---
if (this.lvotd > 0 || this.rvotd > 0 || this.lvotvti || this.rvotvti) {
        text += `\nShunt Ratios (Qp:Qs):\n`;
}
if (this.lvotd > 0) {
    text += `LVOT diameter: ${this.lvotd} \n`;
}
if (this.rvotd > 0) {
    text += `RVOT diameter: ${this.rvotd} \n`;
}
if (this.lvotvti > 0) {
    text += `LVOT VTI: ${this.lvotvti} \n`;
}
if (this.rvotvti > 0) {
    text += `RVOT VTI: ${this.rvotvti} \n`;
}
if (this.vtir > 0) {
    text += `VTI Ratio P:S: ${this.vtir} (Ref: 0.9-1.1)${this.vtir >= 1.1 ? ' [High]' :  ''}\n`;
}
if (this.qpqs > 0) {
    text += `Qp:Qs Ratio: ${this.qpqs} (Ref: 0.9-1.1)${this.qpqs >= 1.1 ? ' [High]' :  ''}\n`;
}

// --- RIGHT HEART
if (this.trMax > 0 || this.prMax > 0 || this.tapse > 0  || this.rvwt || this.rveda > 0 || this.rvesa > 0 || this.rvd1 > 0 || this.rad > 0 || this.rad2 > 0  || this.mpamin > 0 || this.rpamax > 0 || this.rpamin > 0 || this.lvei > 0) {
        text += `\nRight Heart:\n`;
}
if (this.trMax > 0) {
    text += `TR Vel: ${this.trMax} (Ref: <2.7)${this.trMax > 2.7 ? ' [High]' :  ''}\n`;
}
if (this.trPG > 0) {
    text += `TR PG: ${this.trPG} (Ref: <30)${this.trPG > 30 ? ' [High]' :  ''}\n`;
}
if (this.prMax > 0) {
    text += `PR Vel: ${this.prMax} (Ref: <2.0)${this.prMax > 2 ? ' [High]' :  ''}\n`;
}
if (this.prPG > 0) {
    text += `PR PG: ${this.prPG} (Ref: <16)${this.prPG > 16 ? ' [High]' :  ''}\n`;
}

const addMeasure = (label, val, refKey, unit = '', isHighOnly = false) => {
        if (!val || val <= 0) return;
        let note = '';
        if (refKey && this.rightAllometricResults[refKey]?.available) {
            const { min, max } = this.rightAllometricResults[refKey];
            if (val > max) note = ' [High]';
            else if (val < min) note = ' [Low]';
            else note = ' (Normal)';
            note += ` (Ref: ${min}-${max})`;
        }
        text += `${label}: ${val}${unit}${note}\n`;
    };

// 2. RV Dimensions & TAPSE
    addMeasure('TAPSE', this.tapse, 'tapse', ' mm');
    if (this.tapsen) text += `TAPSEn: ${this.tapsen} ${this.tapsen < 4.5 ? '[Low]' : '(Normal)'}\n`;
    if (this.tapseaola) text += `TAPSE:Ao(LA): ${this.tapseaola} (Ref: 0.47-1.2)${this.tapseaola < 0.47 ? ' [Low]' :  ''}\n`;
    
    addMeasure('RVWT', this.rvwt, 'rvwt', ' mm');
    if (this.rvwtaola) text += `RVWT:Ao(LA): ${this.rvwtaola} (Ref: 0.24-0.58)${this.rvwtaola > 0.58 ? ' [Thick]' :  ''}\n`;
    if (this.rvwtlvpwd) text += `RVWT:LVPWd: ${this.rvwtlvpwd}(Ref: 0.44-0.88)${this.rvwtlvpwd > 0.88 ? ' [Thick]' :  ''}\n`;

    // 3. Right Atrium & RV Area
    addMeasure('RVEDA', this.rveda, 'rveda', ' cm²');
    if (this.rvedan) text += `RVEDAn: ${this.rvedan} (Ref: <1.4)${this.rvedan > 1.4 ? ' [Dilated]' :  ''}\n`;

    addMeasure('RVESA', this.rvesa, 'rvesa', ' cm²');
    if (this.rvesan) text += `RVESAn: ${this.rvesan} (Ref: <0.8)${this.rvesan > 0.8 ? ' [Dilated]' :  ''}\n`;
    if (this.rfac) text += `RV FAC: ${this.rfac}% ${this.rfac < 25 ? '[Low]' : '(Normal)'}\n`;

    addMeasure('RVD Basal', this.rvd1, 'rvd1', ' mm');
    if (this.rvd1n) text += `RVD1n: ${this.rvd1n} (Ref: <0.94)${this.rvd1n > 0.94 ? ' [Dilated]' :  ''}\n`;
    if (this.rvd1aola) text += `RVD1:Ao(LA): ${this.rvd1aola} (Ref: 0.81-1.94)${this.rvd1aola > 1.94 ? ' [Dilated]' :  ''}\n`;

    addMeasure('RAD (Ap4Ch)', this.rad, 'rad', ' mm');
    if (this.radn) text += `RADn (Ap4Ch): ${this.radn} (Ref: <0.9)${this.radn > 0.9 ? ' [Dilated]' :  ''}\n`;
    if (this.radaola) text += `RAD:Ao(LA): ${this.radaola}(Ref: 0.79-2.02)${this.radaola > 2.02 ? ' [Dilated]' :  ''}\n`;

    addMeasure('RAD (RPLA)', this.rad2, 'rad2', ' mm');
    if (this.rad2lad) text += `RAD2:LAD: ${this.rad2lad} (Ref: 0.51-0.99)${this.rad2lad > 0.99 ? ' [Dilated]' :  ''}\n`;
    if (this.rad2aola) text += `RAD2:Ao(LA): ${this.rad2aola}(Ref: 0.97-2.07)${this.rad2aola > 2.07 ? ' [Dilated]' :  ''}\n`;

    // 4. Pulmonary Artery
    addMeasure('MPA min', this.mpamin, 'mpamin', ' mm');
    if (this.mpaAo) text += `MPA:Ao: ${this.mpaAo}(Ref: 0.78-1.01)${this.mpaAo > 1.01 ? ' [Dilated]' :  ''}\n`;
    addMeasure('RPA max', this.rpamax, 'rpamax', ' mm');
  if (this.rpamaxao) text += `RPA:Ao: ${this.rpamaxao}(Ref: 0.53-0.98)${this.rpamaxao > 0.98 ? ' [Dilated]' :  ''}\n`;
    addMeasure('RPA min', this.rpamin, 'rpamin', ' mm');
    if (this.rpaminao) text += `RPA:Ao: ${this.rpaminao}(Ref: 0.29-0.61)${this.rpaminao > 0.61 ? ' [Dilated]' :  ''}\n`;
    if (this.rpadi) text += `RPAD Index: ${this.rpadi}(Ref: 31.2-54.2)${this.rpadi < 31 ? ' [Reduced]' :  ''}\n`;

    // 5. Advanced PHT Metrics
    if (this.lvei) text += `LVEI: ${this.lvei}\n`;
   if (this.IVSFlatteningChang > 0) text += `IVS flattening seen\n`;
     if (this.rvotNotching) text += `RVOT notch seen\n`;
    if (this.eplar > 0) text += `ePLAR: ${this.eplar} ${this.eplar >= 0.28 ? '[Pre-Capillary PH Pattern]' : '[Post-Capillary Backup]'}\n`;

    // --- SUMMARY ---
    if (this.changScoreResults) {
        text += `\nChang (2026) PHT Score: ${this.changScoreResults.total}/25 - ${this.changScoreResults.prediction}\n`;
    }
    if (this.phClassification) {
        text += `ACVIM PH Probability: ${this.phClassification.probability} (${this.phClassification.anatomicSites}/3 sites)\n`;
    }
        if (this.isDog && this.lviddn > 0 && this.laAo > 0) {
            text += `\nCANINE CLINICAL ASSESSMENT (EPIC B2):\n`;
            const meetsLA = this.laAo >= 1.65;
            const meetsLV = this.lviddn >= 1.7;
            text += `LV Size: ${meetsLV ? 'ENLARGED' : 'NORMAL'}\n`;
            text += `LA Size: ${meetsLA ? 'ENLARGED' : 'NORMAL'}\n`;
            text += `EPIC RESULT: ${ (meetsLA && meetsLV) ? 'MEETS CRITERIA FOR STAGE B2' : 'DOES NOT MEET CRITERIA'}\n`;
        }


// ---  CANINE MINE PROGNOSTIC SCORING ---
if (this.isDog && this.calculatedMineScore && this.calculatedMineScore.score !== null) {
    const mineModelLabel = mineModels[this.selectedMineModel]?.label || 'MINE Score';
    
    text += `\nPROGNOSTIC RISK STRATIFICATION:\n`;
text += `\n (Applicable to Degenerative Mitral Valve Disease Cases Only)\n`;
    text += `Scoring System: ${mineModelLabel}\n`;
    text += `Total MINE Score: ${this.calculatedMineScore.score}\n`;
    text += `Risk Category: ${this.calculatedMineScore.tier.toUpperCase()}\n`;
    text += `Median Survival Time (MST): ${this.calculatedMineScore.mst}\n`;
}

// --- DIASTOLIC FUNCTION REPORT LINE ---
if (this.diastolicClassification && this.diastolicClassification.evaluatedCount >= 2) {
    text += `\nDIASTOLIC FUNCTIONAL PROFILE:\n`;
    text += `Classification: ${this.diastolicClassification.grade} (${this.diastolicClassification.label})\n`;
    text += `Analysis Confidence: ${this.diastolicClassification.confidence}\n`;
}

        if (this.isCat) {
        text += `\nFELINE CLINICAL ASSESSMENT:\n`;
        
        // HCM Phenotype Check
        const maxWall = Math.max(parseFloat(this.ivsd) || 0, parseFloat(this.lvpwd) || 0);
        if (maxWall >= 6) {
            text += `HCM CHECK: Wall thickening (>= 6mm). Phenotype consistent with HCM.\n`;
        } else if (maxWall >= 5 && maxWall < 6) {
            text += `HCM CHECK: Equivocal wall thickness (5-6mm). Monitor closely.\n`;
        }

        // ATE Risk Check
        const ladVal = parseFloat(this.lad) || 0;
        if (ladVal >= 20) {
            text += `ATE RISK: Severe LA enlargement (LAD >= 20mm). High risk for ATE.\n`;
        } else if (ladVal >= 16.5) {
            text += `ATE RISK: Moderate LA enlargement. Risk of thrombus formation present.\n`;
        }
        if (this.felineLvotoAssessment && parseFloat(this.aovmax) > 1.9) {
            text += `OUTFLOW TRACT: ${this.felineLvotoAssessment.label}\n`;
            text += `NOTE: ${this.felineLvotoAssessment.note}\n`;
        }
    }
// --- SECTION 4: CLINICAL OBSERVATIONS ---
if (this.clinicalComments && this.clinicalComments.trim() !== '') {
    text += `\nCLINICAL OBSERVATIONS & PLAN:\n`;
    text += `${this.clinicalComments.trim()}\n`;
}

        text += `\n--------------------------------------------------\nGenerated via VetCardioHub.com`;
        return text;
    },

shareReport() {
    const reportText = this.generateReportText();
    
    // 1. Check for the real window.navigator.share
    if (window.navigator && window.navigator.share) {
        // 2. Use .call() to ensure the 'this' context is the real navigator
        window.navigator.share.call(window.navigator, { 
            title: 'Echo Report', 
            text: reportText 
        }).catch((error) => {
            // 3. Handle cases where the user cancels the share
            if (error.name !== 'AbortError') {
                console.error('Share failed:', error);
            }
        });
    } else {
        // Fallback for browsers that don't support sharing (like Chrome on Windows)
        this.exportToClipboard();
        alert('Copied to clipboard.');
    }
},

parseRawText() {
    if (!this.rawEchoText) return;

    let matchCount = 0;
    const lines = this.rawEchoText.split(/\r?\n/);
    const filled = new Set();

// --- 0. EXTRACT PATIENT METADATA (Header Scan) ---
const headerMarkers = /\b(Patient|Name|Owner|Breed|Species|Client):\s*(.*)/i;
const namePattern = /\b(Name|Patient|Owner)\b[:\s]*([A-Za-z]+)\s+([A-Za-z]+)/i;

for (const line of lines.slice(0, 5)) { // Only scan the first 5 lines of the report
    
    // 1. Explicit Label Match (e.g., "Patient: Buster Smith")
    if (line.match(/Patient|Name/i) && !this.patientName) {
        const parts = line.replace(/Patient|Name|:|Owner/gi, '').trim().split(/\s+/);
        if (parts.length >= 2) {
            this.patientName = parts[0];
            this.ownerName = parts[1];
        }
        const dateMatch = line.match(/\bDate\s+([\d\/.-]+)/i);
            if (dateMatch && dateMatch[1]) {
        this.reportDate = dateMatch[1].trim();
        }
    }
    
    // 2. Breed Scan
    if (/\b(Breed|Canine|Feline|Dog|Cat)\b/i.test(line)) {
        const breedMatch = line.match(/\b(Breed|Canine|Feline|Dog|Cat)\b[:\s]*([A-Za-z\s]+)/i);
        if (breedMatch && breedMatch[2]) this.breed = breedMatch[2].trim();
    }
}

    // --- 0. EXTRACT CLINICAL COMMENTS (If Empty) ---
    // Look for keywords common in echo reports that signal clinical prose
    if (!this.clinicalComments || this.clinicalComments.trim() === '') {
        const commentMarkers = /\b(Impression|Conclusion|Summary|Comments|Interpretation):/i;
        let foundComments = [];
        let capturing = false;

        for (const line of lines) {
            if (commentMarkers.test(line)) {
                capturing = true;
                foundComments.push(line.replace(commentMarkers, '').trim());
            } else if (capturing && line.trim().length > 0) {
                // Keep capturing until we hit a line that looks like a measurement (has a number)
                if (!/[0-9]/.test(line)) {
                    foundComments.push(line.trim());
                } else {
                    capturing = false;
                }
            }
        }
        if (foundComments.length > 0) {
            this.clinicalComments = foundComments.join('\n');
        }
    }

    // --- 1. THE EXTRACTION MAP ---
    // (Moved to the top so everything below can access it safely)
    const extractionMap = [
        // PATIENT
        { key: 'weight',  patterns: [/\bweight\b/i, /\bwt\b/i, /\bbody\s+wt\b/i, /\bbody\s+weight\b/i] },

        // LEFT VENTRICLE
        { key: 'lvidd2',  patterns: [/\blvidd2\b/i, /\blvidd\s+perp\b/i] },
        { key: 'lvidd',   patterns: [/\blvidd\b/i, /\blvid\s*d\b/i, /\blvid\s*\(d\)\b/i, /\blvdd\b/i] },
        { key: 'lvids',   patterns: [/\blvids\b/i, /\blvid\s*s\b/i, /\blvid\s*\(s\)\b/i, /\blvds\b/i] },
        { key: 'ivsd',    patterns: [/\bivsd\b/i, /\bivs\s*\(d\)\b/i, /\bivs\b/i] },
        { key: 'lvpwd',   patterns: [/\blvpwd\b/i, /\blvfw\s*d\b/i, /\blvpw\s*\(d\)\b/i, /\blvpwd\b/i] },

        // LEFT ATRIUM (LAD listed before LA to prevent LA stealing the value)
        { key: 'lad',     patterns: [/\blad\b/i, /\bla\s+long\s+axis\b/i, /\bla\s+lax\b/i] },
        { key: 'la',      patterns: [/\bla\s+diam\b/i, /\bla\s+s[- ]?ax\b/i, /\bla\s+short\b/i, /\bla\s*\(s\)\b/i, /\bla\b/i] },
        { key: 'ao',      patterns: [/\bao\s+diam\b/i, /\bao\s+root\b/i, /\baorta\b/i, /\bao\b/i] },

        // VOLUMETRICS
        { key: 'lvedv',   patterns: [/\blvedv\s+mod\s+a4c\b/i, /\blvedv\s+mod\b/i, /\blvedv\b/i, /\bedv\b/i] },
        { key: 'lvesv',   patterns: [/\blvesv\s+mod\s+a4c\b/i, /\blvesv\s+mod\b/i, /\blvesv\b/i, /\besv\b/i] },

        // DOPPLER
        { key: 'eVel',    patterns: [/\bmv\s+e\s+vel\b/i, /\bmv\s+e\s+vmax\b/i, /\be\s+wave\b/i, /\be\s+vel\b/i, /\be\s+peak\b/i, /\bmv\s+e\b/i] },
        { key: 'aVel',    patterns: [/\bmv\s+a\s+vel\b/i, /\bmv\s+a\s+vmax\b/i, /\ba\s+wave\b/i, /\ba\s+vel\b/i, /\ba\s+peak\b/i, /\bmv\s+a\b/i] },
        { key: 'ivrt',    patterns: [/\bivrt\b/i] },
        { key: 'mdt',     patterns: [/\bmv\s+dect\b/i, /\bdect\b/i, /\bmdt\b/i, /\be\s+wave\s+dt\b/i, /\be\s+dt\b/i, /\bmv\s+dt\b/i] },
        { key: 'ePrime',  patterns: [/\bmv\s+e'\b/i, /\be'\b/i, /\be\s+prime\b/i, /\bmitral\s+e'\b/i, /\blat\s+e'\b/i, /\bsep\s+e'\b/i, /\bmedial\s+e'\b/i] },

        // OUTFLOW TRACTS
        { key: 'lvotd',   patterns: [/\blvot\s+diam\b/i, /\blvotd\b/i, /\blvot\s+d\b/i, /\blvot\s+diameter\b/i] },
        { key: 'rvotd',   patterns: [/\brvot\s+diam\b/i, /\brvotd\b/i, /\brvot\s+d\b/i, /\brvot\s+diameter\b/i] },
        { key: 'lvotvti', patterns: [/\blvot\s+vti\b/i, /\blvotvti\b/i] },
        { key: 'rvotvti', patterns: [/\brvot\s+vti\b/i, /\brvotvti\b/i] },
        { key: 'aovmax',  patterns: [/\bav\s+vmax\b/i, /\bao\s+vmax\b/i, /\baov\s+vmax\b/i, /\baovmax\b/i, /\bav\s+max\b/i, /\bav\s+vel\b/i, /\blvot\s+vmax\b/i] },
        { key: 'pavmax',  patterns: [/\bpv\s+vmax\b/i, /\bpa\s+vmax\b/i, /\bpav\s+vmax\b/i, /\bpvmax\b/i, /\bpv\s+max\b/i, /\bpv\s+vel\b/i, /\brvot\s+vmax\b/i] },

        // RIGHT HEART
        { key: 'tapse',   patterns: [/\btapse\b/i] },
        { key: 'trMax',   patterns: [/\btr\s+vmax\b/i, /\btr\s+vel\b/i, /\btr\s+max\b/i, /\btr\b/i] },
        { key: 'prMax',   patterns: [/\bpr\s+vmax\b/i, /\bpr\s+vel\b/i, /\bpr\s+max\b/i, /\bpi\s+vmax\b/i, /\bpi\s+vel\b/i, /\bpi\s+max\b/i] },
        { key: 'rvwt',    patterns: [/\brvw\b/i, /\brvfw\b/i, /\brv\s+wall\b/i, /\brvwt\b/i, /\brvfwd\b/i] },
        { key: 'rveda',   patterns: [/\brveda\b/i, /\brvad\s+a4c\b/i, /\brvad\b/i, /\brv\s+ad\b/i, /\brv\s+area\s+diastole\b/i] },
        { key: 'rvesa',   patterns: [/\brvesa\b/i, /\brvas\s+a4c\b/i, /\brvas\b/i, /\brv\s+as\b/i, /\brv\s+area\s+systole\b/i] },
        { key: 'rvd1',    patterns: [/\brvd1\b/i, /\brv\s+basal\b/i, /\brv\s+base\b/i, /\brvd\s+basal\b/i] },
        { key: 'rad',     patterns: [/\brad\b/i, /\bra\s+diam\b/i, /\bra\s+minor\b/i, /\bra\s+width\b/i] },

        // PULMONARY ARTERY
        { key: 'mpamin',  patterns: [/\bmpa\s+min\b/i, /\bmpad\b/i, /\bmain\s+pa\b/i] },
        { key: 'rpamin',  patterns: [/\brpa\s+min\b/i, /\brpa\s+d\b/i, /\brpa\s+diastole\b/i] },
        { key: 'rpamax',  patterns: [/\brpa\s+max\b/i, /\brpa\s+s\b/i, /\brpa\s+systole\b/i] },
    ];

    // --- 2. INTELLIGENT LABEL-ONLY SKIP LIST ---
    const skipLabelPatterns = [
        /ratio/i, /RPLA/i, /\bDDN\b/i, /\bDSN\b/i, /\bEF\b/i, /\bFS\b/i, /\bFAC\b/i, 
        /\bRWT\b/i, /\bNorm\b/i, /\bnLA\b/i, /Cornell/i, /2D/i,
        /^(Referral|Chambers|Valves|Additional|Interpretation|Name|Age|Date)/i
    ];

    // PRE-SEED ACTION: Locks fields that contain user adjustments before parsing text
    for (const rule of extractionMap) {
        if (this[rule.key] !== '' && this[rule.key] !== null && this[rule.key] !== undefined) {
            filled.add(rule.key);
        }
    }

// --- 3. THE PARSING ENGINE LOOP ---
    for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine) continue;

        // Skip lines that are likely part of the clinical comments we already grabbed
        if (this.clinicalComments && this.clinicalComments.includes(trimmedLine)) continue;

        for (const rule of extractionMap) {
            if (filled.has(rule.key)) continue;

            for (const pattern of rule.patterns) {
                if (pattern.test(trimmedLine)) {
                    const matchObj = trimmedLine.match(pattern);
                    if (matchObj) {
                        const labelSegment = trimmedLine.substring(0, trimmedLine.indexOf(matchObj[0]) + matchObj[0].length);
                        
                        if (labelSegment.includes(':') || labelSegment.includes('/') || skipLabelPatterns.some(p => p.test(labelSegment))) {
                            continue; 
                        }

                        const remainder = trimmedLine.substring(labelSegment.length);
                        const numMatch = remainder.match(/-?[0-9]+(?:\.[0-9]+)?/);

                        if (numMatch) {
                            const numericValue = parseFloat(numMatch[0]);
                            
                            if (!isNaN(numericValue)) {
                                this[rule.key] = numericValue;
                                filled.add(rule.key); 
                                matchCount++;
                                break; 
                            }
                        }
                    }
                }
            }
        }
    }

    // --- 4. TEXTUAL CLINICAL SCANNERS ---
    if (/\b(?:flattening|flattened|D-shape|D-shaped|D shape)\b/i.test(this.rawEchoText)) {
        this.ivsFlatteningChang = '4'; // Set to 4 (Moderate-Severe) if found in text
    }

    // --- 5. UI NOTIFICATION FEEDBACK ---
    this.parseMessage = matchCount > 0 ? `Success: Auto-filled ${matchCount} parameters!` : 'No recognizable measurements found.';
    this.rawEchoText = '';
    setTimeout(() => this.parseMessage = '', 4000);
},

copyPHTAudit() {
    if (!this.phClassification) return;
    
    let text = `--- PULMONARY HYPERTENSION CLINICAL AUDIT ---\n`;
    text += `Date: ${this.reportDate || new Date().toLocaleDateString('en-GB')}\n`;
    text += `Patient: ${this.patientName || 'Not specified'} | Species: ${this.species}\n\n`;

    // ACVIM Topline
    text += `[ ACVIM (2020) PROBABILITY ]\n`;
    text += `Assessment: ${this.phClassification.probability}\n`;
    text += `Anatomic Sites Positive: ${this.phClassification.anatomicSites}/3\n\n`;

    // Granular Evidence Grouping
    text += `[ CLINICAL EVIDENCE BREAKDOWN ]\n`;
    this.phClassification.comprehensiveAudit.forEach(group => {
        text += `${group.title.toUpperCase()}${group.isActive && group.title !== 'Primary Doppler' ? ' (*SITE POSITIVE*)' : ''}:\n`;
        group.items.forEach(item => {
            text += `  • ${item.name}: ${item.val} ${item.isAbnormal ? '[ABNORMAL]' : '(Normal)'}\n`;
        });
        text += '\n';
    });

    // ePLAR Differentiator
    if (this.eplar > 0 && this.phClassification.stepIndex >= 1) {
        text += `[ ETIOLOGY DIFFERENTIATION ]\n`;
        text += `ePLAR: ${this.eplar} -> `;
        if (this.eplar >= 0.28) text += `Pre-Capillary PH Pattern\n\n`;
        else if (this.eplar <= 0.23) text += `Post-Capillary (Left Heart Backup)\n\n`;
        else text += `Borderline Zone\n\n`;
    }

    // Chang Score
    if (this.changScoreResults) {
        text += `[ CHANG (2026) PREDICTIVE SCORE ]\n`;
        text += `Total Score: ${this.changScoreResults.total}/25\n`;
        text += `Prediction: ${this.changScoreResults.prediction}\n`;
        const breakdownStr = this.changScoreResults.breakdown.map(item => `${item.name} (+${item.val})`).join(', ');
        text += `Breakdown: ${breakdownStr}\n\n`;
    }

    text += `Generated via VetCardioHub.com`;

    // Execute Clipboard Copy
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            alert('PHT Clinical Audit copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            this.fallbackCopy(text);
        });
    } else {
        this.fallbackCopy(text);
    }
},

// Simple fallback for older browsers / non-HTTPS local testing
fallbackCopy(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed"; 
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        alert('PHT Clinical Audit copied to clipboard!');
    } catch (err) {
        console.error('Fallback copy failed', err);
    }
    document.body.removeChild(textArea);
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





glossaryDatabase: typeof VET_GLOSSARY_DB !== 'undefined' ? VET_GLOSSARY_DB : {},



zoomImage(url) {
    window.dispatchEvent(new CustomEvent('image-zoom', { detail: url }));
},

exportToClipboard() {
navigator.clipboard.writeText(this.generateReportText()).then(() => {
this.copySuccess = true;
setTimeout(() => { this.copySuccess = false; }, 2500);
});
}
};
}



// Function to show instructions (existing)
function showInstructions() {
    const isiOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
    if (isiOS) {
        alert("To save: Tap the 'Share' icon (square with arrow) at the bottom of Safari and select 'Add to Home Screen'.");
    } else {
        alert("To save: Tap the three dots (⋮) and select 'Install app' or 'Add to Home Screen'.");
    }
}



