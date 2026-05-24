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
// --- Chang 2026 PH Score Variables ---
showChangScore: false, // Toggles the UI section
ivsFlatteningChang: '0', // 0=Normal, 2=Subtle, 4=Moderate/Severe
rvotNotching: false, // 0=Normal, 1=Abnormal

    
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


 
/* ACVIM Pulmonary Hypertension (PHT) Probability Algorithm */
/* ACVIM Pulmonary Hypertension (PHT) Probability Algorithm */
get phClassification() {
    if (!this.isDog) return null;

    let evaluatedCount = 0;
    let breakdown = [];
    
    // ACVIM Anatomic Site Trackers
    let siteVentricle = false;
    let sitePA = false;
    let siteRA = false;

    // --- 1. Evaluate TR Velocity Vector ---
    const tr = parseFloat(this.trMax) || 0;
    if (tr > 0) {
        evaluatedCount++;
        let label = tr > 3.4 ? 'Severe / High Velocity' : (tr >= 2.9 ? 'Moderate / Intermediate Velocity' : 'Normal / Low Velocity');
        let pg = (4 * (tr * tr)).toFixed(1);
        breakdown.push({
            name: 'TR Peak Velocity',
            category: 'Primary Doppler Hemodynamics',
            val: `${tr} m/s`,
            threshold: tr > 3.4 ? '> 3.4 m/s' : (tr >= 2.9 ? '2.9 - 3.4 m/s' : '< 2.9 m/s'),
            grade: label,
            isTrigger: tr >= 2.9
        });
    }

    // --- 2. Evaluate ACVIM Site 1: Ventricles ---
    let rvSigns = [];
    
    // Geometry & Size
    if (this.lvei >= 1.2) { siteVentricle = true; rvSigns.push('Septal Flattening (LVEI ≥ 1.2)'); }
    if (this.rveda && this.rightAllometricResults?.rveda?.max && parseFloat(this.rveda) > this.rightAllometricResults.rveda.max) { siteVentricle = true; rvSigns.push('RV Dilation (Allometric)'); }
    
    // Hypertrophy (Checks both Allometric Max and Sankisov Ratio)
    if (this.rvwt && this.rightAllometricResults?.rvwt?.max && parseFloat(this.rvwt) > this.rightAllometricResults.rvwt.max) { 
        siteVentricle = true; rvSigns.push('RV Hypertrophy (Allometric)'); 
    } else if (this.rvwtlvpwd && parseFloat(this.rvwtlvpwd) > 1.0) {
        siteVentricle = true; rvSigns.push('RVWT > LVPWd');
    }

    if (rvSigns.length > 0) {
        breakdown.push({
            name: 'Ventricles (Site 1)',
            category: 'Right Ventricular Structure',
            val: rvSigns.join(', '),
            threshold: 'ACVIM Anatomic Criteria Met',
            grade: 'Positive Site',
            isTrigger: true
        });
    }

    // --- 3. Evaluate ACVIM Site 2: Pulmonary Artery ---
    let paSigns = [];
    
    // Standard and Internal Scalar Ratios
    if (this.mpaAo && parseFloat(this.mpaAo) > 1.0) { sitePA = true; paSigns.push('MPA:Ao > 1.0'); }
    if (this.paaola && parseFloat(this.paaola) > 1.0) { sitePA = true; paSigns.push('PA:Ao > 1.0'); }
    
    // Grosso/Vezzosi RPA Indexing
    if (this.rpaIndex && this.rpaIndex >= 3.0) { 
        sitePA = true; paSigns.push(`RPA Index (${this.rpaIndex}) ≥ 3.0`); 
    }
    
    // Grosso Allometric Maximums
    if (this.mpamin && this.rightAllometricResults?.mpamin?.max && parseFloat(this.mpamin) > this.rightAllometricResults.mpamin.max) {
        sitePA = true; paSigns.push('MPA > Allometric Max');
    }
    if (this.rpamin && this.rightAllometricResults?.rpamin?.max && parseFloat(this.rpamin) > this.rightAllometricResults.rpamin.max) {
        sitePA = true; paSigns.push('RPAmin > Allometric Max');
    }

    if (paSigns.length > 0) {
        breakdown.push({
            name: 'Pulmonary Artery (Site 2)',
            category: 'Vascular Dimensions',
            val: paSigns.join(', '),
            threshold: 'ACVIM Anatomic Criteria Met',
            grade: 'Positive Site',
            isTrigger: true
        });
    }

    // --- 4. Evaluate ACVIM Site 3: Right Atrium ---
    if (this.rad && this.rightAllometricResults?.rad?.max && parseFloat(this.rad) > this.rightAllometricResults.rad.max) { 
        siteRA = true;
        breakdown.push({
            name: 'Right Atrium (Site 3)',
            category: 'Atrial Dimensions',
            val: `${this.rad} mm`,
            threshold: `> ${this.rightAllometricResults.rad.max} mm`,
            grade: 'RA Enlargement',
            isTrigger: true
        });
    }
    
    const anatomicSites = (siteVentricle ? 1 : 0) + (sitePA ? 1 : 0) + (siteRA ? 1 : 0);
    if (tr === 0 && anatomicSites === 0 && (!this.changScoreResults || this.changScoreResults.total === 0)) return null; 
    
    // --- 5. Fetch Chang 2026 Score for Evaluation ---
    const chang = this.changScoreResults;
    const hasChangWarning = (chang && chang.total >= 4);

    // --- 6. Determine Final ACVIM Probability Matrix (With Chang Integration) ---
    let probability = 'Low Probability';
    let stepIndex = 0;
    let riskClass = 'normal'; // normal, warning, abnormal
    
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
            // THE CHANG OVERRIDE: ACVIM is technically "Low", but Chang predicts severe/moderate PH
            probability = "Intermediate Probability (Chang Score Override)";
            stepIndex = 1;
            riskClass = 'warning';
            
            // Push the Chang trigger into the visual audit table
            breakdown.push({
                name: 'Chang PH Score Alert',
                category: '2026 Predictive Override',
                val: `${chang.total} / 25 Pts`,
                threshold: '≥ 4 Points',
                grade: 'Elevated Pre-Capillary Risk',
                isTrigger: true
            });
        } else {
            probability = "Low Probability";
            stepIndex = 0;
            riskClass = 'normal';
        }
    }
    
    return { 
        probability, 
        stepIndex, 
        riskClass, 
        breakdown, 
        anatomicSites,
        siteDetails: { siteVentricle, sitePA, siteRA },
        changScore: chang // Passes the full Chang object to the UI if needed separately
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
    if (!this.weight || this.weight <= 0 || typeof rightHeartModels === 'undefined') return results;
    
    const modelData = rightHeartModels[this.selectedRightModel];
    if (!modelData) return results;

    const targets = ['tapse', 'rvwt', 'rveda', 'rvesa', 'rvd1', 'rad', 'rvedv', 'rvesv', 'rvSPrime','mpamin', 'rpamax', 'rpamin'];
    
    targets.forEach(param => {
        const formula = modelData.params?.[param];
        if (!formula) {
            results[param] = { min: null, max: null, mean: null, available: false };
            return;
        }

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

        // --- APPLY UNIT SCALING FACTOR ---
        // If the database has a multiplier (like 10 for cm to mm), apply it. Otherwise, default to 1.
        const scale = formula.multiplier || 1;
        mean *= scale;
        lower *= scale;
        upper *= scale;

        // Enforce safe mathematical floors for lower bounds
        if (lower < 0) lower = 0;

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

get calculatedMineScore() {
    if (!this.isDog || typeof mineModels === 'undefined') return null;
    const model = mineModels[this.selectedMineModel];
    if (!model) return null;
    
    let totalPoints = 0;
    let missingFields = [];
    let breakdown = [];

    model.variables.forEach(v => {
        // Map keys to clean clinical display names
        const displayName = v === 'laAo' ? 'LA:Ao' : 
                            v === 'lviddn' ? 'LVIDdn' : 
                            v === 'fs' ? 'FS' : 
                            v === 'eVel' ? 'E-wave Vel' : v.toUpperCase();

        const val = parseFloat(this[v]);
        
        // If data is missing or un-entered yet
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
        
        // Find matching score tier
        const ranges = model.ranges[v];
        const matchRule = ranges.find(r => val <= r.max);
        const ptsAwarded = matchRule ? matchRule.pts : 0;
        totalPoints += ptsAwarded;

        // Calculate text representation of the triggered cutoff bracket
        const matchIndex = ranges.indexOf(matchRule);
        let thresholdText = '';
        if (matchIndex === 0) {
            thresholdText = `≤ ${matchRule.max}`;
        } else if (matchRule.max === Infinity) {
            thresholdText = `> ${ranges[matchIndex - 1].max}`;
        } else {
            thresholdText = `${ranges[matchIndex - 1].max} – ${matchRule.max}`;
        }

        // Format values with correct clinical units for the audit trail
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
            status: 'Awaiting inputs for complete assessment', 
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
        text += `Weight: ${this.weight}kg | BSA: ${this.bsa}m² | Model: ${modelLabel} \n`;
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
        if (this.ladn > 0)   text += `LADN: ${this.ladn} (Ref: <1.60)${this.getTag(this.ladn, null, 1.60)}\n`;
        if (this.ladao > 0)  text += `LAD:Ao Ratio: ${this.ladao} (Ref: <2.10)${this.getTag(this.ladao, null, 2.10)}\n`;
        

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
    text += `E:Eprime Ratio: ${this.eePrime} (Ref: 0.95-1.6)${this.ear >= 12 ? ' [HIGH FILLING PRESSURE]' : ''}\n`;
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
    text += `RVOT diameter: ${this.lvotd} \n`;
}
if (this.lvotvti > 0) {
    text += `LVOT VTI: ${this.lvotd} \n`;
}
if (this.rvotvti > 0) {
    text += `RVOT VTI: ${this.lvotd} \n`;
}
if (this.vtir > 0) {
    text += `VTI Ratio P:S: ${this.vtir} (Ref: 0.9-1.1)${this.vtir >= 1.1 ? ' [High]' :  ''}\n`;
}
if (this.qpqs > 0) {
    text += `Qp:Qs Ratio: ${this.qpqs} (Ref: 0.9-1.1)${this.qpqs >= 1.1 ? ' [High]' :  ''}\n`;
}

// --- RIGHT HEART
if (this.trMax > 0 || this.rvotd > 0 || this.lvotvti || this.rvotvti) {
        text += `\nRight Heart:\n`;
}
if (this.trMax > 0) {
    text += `TR Vel: ${this.trMax} (Ref: <2.7)${this.trMax > 2.7 ? ' [High]' :  ''}\n`;
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
        this.ivsFlattening = true;
    }

    // --- 5. UI NOTIFICATION FEEDBACK ---
    this.parseMessage = matchCount > 0 ? `Success: Auto-filled ${matchCount} parameters!` : 'No recognizable measurements found.';
    this.rawEchoText = '';
    setTimeout(() => this.parseMessage = '', 4000);
},

// The Clinical Reference Database
glossaryDatabase: {
// --- RIGHT HEART  ---
    tapse: {
        title: "TAPSE (Tricuspid Annular Plane Systolic Excursion)",
        view: "Left Apical 4-Chamber (RV Optimized)",
        description: "Assesses longitudinal right ventricular systolic function.",
        method: "Place the M-mode cursor directly through the lateral aspect of the tricuspid valve annulus. Measure the total vertical displacement from end-diastole (lowest point) to peak systole (highest point).",
        imgPlaceholder: "/images/tapse-reference.jpg"
    },
    tapsen: {
        title: "TAPSEn (Tricuspid Annular Plane Systolic Excursion - Normalised)",
        view: "Left Apical 4-Chamber (RV Optimized)",
        description: "Assesses longitudinal right ventricular systolic function - normalised for body weight.",
        method: "Measure TAPSE as the vertical displacement of the tricuspid valve annulus, then normalised to body weight. Calculated as: (TAPSE in mm) / (Body Weight in kg)^0.285. A value < 4.5 is a primary criteria for right ventricular systolic dysfunction",
        reference: "Feldhütter et al. Echocardiographic reference intervals for right ventricular indices, including 3‐dimensional volume and 2‐dimensional strain measurements in healthy dogs",
        pmid: "34874066"
    },
    rvwt: {
        title: "RVWT (Right Ventricular Wall Thickness)",
        view: "Right Parasternal Long or Short Axis",
        description: "Evaluates right ventricular concentric hypertrophy secondary to pressure overload.",
        method: "Measure the free wall thickness at end-diastole using 2D or M-mode, avoiding papillary muscles and trabeculae.",
        imgPlaceholder: "/images/rvwt-reference.jpg"
    },
    rveda: {
        title: "RVEDA (RV End-Diastolic Area)",
        view: "Left Apical 4-Chamber (RV Optimized)",
        description: "Quantifies global right ventricular dilation.",
        method: "Trace the endocardial border of the RV at end-diastole (maximum volume). Exclude the trabeculae and papillary muscles from the trace line. Close the trace flat across the tricuspid annulus.",
        imgPlaceholder: "/images/rveda-reference.jpg"
    },
    rvesan: {
        title: "RVESAn (RV End-Systolic Area - Normalised)",
        view: "Left Apical 4-Chamber (RV Optimized)",
        description: "Quantifies RV systolic failure and volume retention - normalised for body weight.",
        method: "Trace the endocardial border at end-systole (minimum volume), then normalised to body weight. Calculated as: (RVESA in cm2) / (Body Weight in kg)^0.695. A value > 0.8 is a primary criteria for right ventricular systolic dysfunction",
        reference: "Feldhütter et al. Echocardiographic reference intervals for right ventricular indices, including 3‐dimensional volume and 2‐dimensional strain measurements in healthy dogs",
        pmid: "34874066"
    },
    rvedan: {
        title: "RVEDAn (RV End-Diastolic Area - Normalised)",
        view: "Left Apical 4-Chamber (RV Optimized)",
        description: "Quantifies global right ventricular dilation - normalised for body weight.",
        method: "Trace the endocardial border at end-systole (minimum volume), then normalised to body weight. Calculated as: (RVEDA in cm2) / (Body Weight in kg)^0.665. A value > 1.4 is a primary criteria for right ventricular dilation",
        reference: "Feldhütter et al. Echocardiographic reference intervals for right ventricular indices, including 3‐dimensional volume and 2‐dimensional strain measurements in healthy dogs",
        pmid: "34874066"
    },
    rvesa: {
        title: "RVESA (RV End-Systolic Area)",
        view: "Left Apical 4-Chamber (RV Optimized)",
        description: "Quantifies RV systolic failure and volume retention.",
        method: "Trace the endocardial border at end-systole (minimum volume), following the same exclusion rules as RVEDA.",
        imgPlaceholder: "/images/rvesa-reference.jpg"
    },
    rvd1: {
        title: "RVD1 (Basal RV Diameter)",
        view: "Left Apical 4-Chamber (RV Optimized)",
        description: "Assesses basal segment right ventricular dilation.",
        method: "Measure the maximal transverse diameter of the RV basal third at end-diastole, typically just above the level of the tricuspid valve leaflets.",
        imgPlaceholder: "/images/rvd1-reference.jpg"
    },
    rad: {
        title: "RAD (Right Atrial Diameter - Apical 4 Chamber View)",
        view: "Left Apical 4-Chamber - optimised to see right heart",
        description: "Evaluates right atrial dilation secondary to volume/pressure overload.",
        method: "Measure the maximal right atrial major dimension (base to apex) at end-systole (when the atrium is maximally full), parallel to the interatrial septum.",
        imgPlaceholder: "/images/rad-reference.jpg"
    },
    rad2: {
        title: "RAD RPLA (Right Atrial Diameter - Right Parasternal Long Axis view)",
        view: "Right Parasternal Long Axis view - optimised to see right heart",
        description: "Evaluates right atrial dilation secondary to volume/pressure overload.",
        method: "Measure the maximal right atrial major dimension (base to apex) at end-systole (when the atrium is maximally full), parallel to the interatrial septum.",
        imgPlaceholder: "/images/rad2-reference.jpg"
    },

// --- INTERNAL SCALAR INDICES (SANKISOV 2024) ---
    tapseaola: {
        title: "TAPSE:Ao Ratio",
        view: "Derived Index",
        description: "Evaluates right ventricular longitudinal systolic function normalized to the patient's internal aortic dimension, bypassing the need for body-weight scaling.",
        method: "Calculated as: TAPSE / Aorta.",
        reference: "Sankisov et al. Echocardiographic reference intervals for right heart indices normalized to aortic diameter in healthy dogs.",
        pmid: "39350563"
    },
    radaola: {
        title: "RAD:Ao Ratio (RA Major Axis)",
        view: "Derived Index",
        description: "Indexes the maximal (longitudinal) right atrial diameter to the aortic root. A rapid, body-weight-independent marker for right atrial dilation.",
        method: "Calculated as: RAD / Aorta.",
        reference: "Sankisov et al. Echocardiographic reference intervals for right heart indices normalized to aortic diameter in healthy dogs.",
        pmid: "39350563"
    },
    rad2aola: {
        title: "RAD2:Ao Ratio (RA RPLA Axis)",
        view: "Derived Index",
        description: "Indexes the right atrial dimension to the aorta both measured in RPLA 4 chamber view. Evaluates lateral stretching of the right atrium secondary to pressure/volume overload.",
        method: "Calculated as: RAD2  / Aorta.",
        reference: "Sankisov et al. Echocardiographic reference intervals for right heart indices normalized to aortic diameter in healthy dogs.",
        pmid: "39350563"
    },
    rad2lad: {
        title: "RAD2:LAD Ratio (Right to Left Atrial Ratio)",
        view: "Derived Index",
        description: "Directly compares the size of the right atrium to the left atrium both measured in RPLA 4 chamber view. Highly useful for identifying asymmetrical right-sided volume overload (e.g., Tricuspid Regurgitation) versus generalized bi-atrial enlargement.",
        method: "Calculated as: RAD2 (RA RPLA) / LAD (LA Dimension).",
        reference: "Sankisov et al. Echocardiographic reference intervals for right heart indices normalized to aortic diameter in healthy dogs.",
        pmid: "39350563"
    },
    rvd1aola: {
        title: "RVD1:Ao Ratio (RV Basal Diameter)",
        view: "Derived Index",
        description: "Indexes the basal diameter of the right ventricle to the aortic root. A quick clinical surrogate for identifying RV dilation without regression tables.",
        method: "Calculated as: RVD1 / Aorta.",
        reference: "Sankisov et al. Echocardiographic reference intervals for right heart indices normalized to aortic diameter in healthy dogs.",
        pmid: "39350563"
    },
    rvwtaola: {
        title: "RVWT:Ao Ratio",
        view: "Derived Index",
        description: "Indexes right ventricular free wall thickness to the aortic dimension. Used to identify right-sided concentric hypertrophy (e.g., secondary to Pulmonic Stenosis or Pulmonary Hypertension).",
        method: "Calculated as: RVWT / Aorta.",
        reference: "Sankisov et al. Echocardiographic reference intervals for right heart indices normalized to aortic diameter in healthy dogs.",
        pmid: "39350563"
    },
    rvwtlvpwd: {
        title: "RVWT:LVPWd Ratio (Wall Thickness Ratio)",
        view: "Derived Index",
        description: "Directly compares the right ventricular free wall to the left ventricular free wall. The RV free wall is normally about 1/3 the thickness of the LV wall; an elevated ratio highlights disproportionate right-sided hypertrophy.",
        method: "Calculated as: RVWT / LVPWd.",
        reference: "Sankisov et al. Echocardiographic reference intervals for right heart indices normalized to aortic diameter in healthy dogs.",
        pmid: "39350563"
    },
    paaola: {
        title: "PA:Ao Ratio (Pulmonary Artery to Aorta)",
        view: "Derived Index",
        description: "Compares the size of the pulmonary outflow tract/artery directly to the aorta. Values > 1.0 strongly suggest pulmonary hypertension or post-stenotic dilation.",
        method: "Calculated as: RVOTd (PA) / Aorta.",
        reference: "Sankisov et al. Echocardiographic reference intervals for right heart indices normalized to aortic diameter in healthy dogs.",
        pmid: "39350563"
    },


    lvidd2: {
        title: "LVIDd₂ (Perpendicular Eccentricity)",
        view: "Right Parasternal Short Axis (Papillary Level)",
        description: "Quantifies septal flattening (D-shape) to calculate the LV Eccentricity Index.",
        method: "Measure the LV internal diameter at end-diastole perpendicular to the normal vertical LVIDd. If the septum is flattened by RV pressure, this horizontal measurement will be significantly larger than the vertical one.",
        imgPlaceholder: "/images/lvidd2-reference.jpg"
    },
radn: {
        title: "RADn (Normalized Right Atrial Diameter)",
        view: "Derived Index (Allometric Scaling)",
        description: "Scales the right atrial major dimension directly to body weight. Provides a rapid, size-independent metric to identify right atrial enlargement secondary to volume or pressure overload (e.g., Pulmonary Hypertension, Tricuspid Valve Dysplasia).",
        method: "Calculated as: (RAD in cm) / (Body Weight in kg)^0.4. Clinical limits suggest normal values remain < 0.90."
    },
    rvd1n: {
        title: "RVD1n (Normalized RV Basal Diameter)",
        view: "Derived Index (Allometric Scaling)",
        description: "Scales the basal diameter of the right ventricle to body weight. A robust, fast-math clinical index to assess right ventricular dilation without needing complex log-regression lookup tables.",
        method: "Calculated as: (RVD1 in cm) / (Body Weight in kg)^0.33. Clinical limits suggest normal values remain < 0.94."
    },
// --- LEFT HEART STRUCTURAL ---
    lvidd: {
        title: "LVIDd (LV Internal Diameter - Diastole)",
        view: "Right Parasternal Short Axis (Papillary Level)",
        description: "Primary metric for assessing left ventricular volume overload (eccentric hypertrophy) commonly seen in MMVD or PDA.",
        method: "Measure the maximal internal diameter of the left ventricle at end-diastole (peak R wave). Ensure the cursor is perpendicular to the septum and free wall.",
        imgPlaceholder: "/images/lvidd-reference.jpg"
    },
    lvids: {
        title: "LVIDs (LV Internal Diameter - Systole)",
        view: "Right Parasternal Short Axis (Papillary Level)",
        description: "Assesses left ventricular systolic function and contractility.",
        method: "Measure the minimal internal diameter of the left ventricle at peak systole (end of the T wave or maximal septal deviation).",
        imgPlaceholder: "/images/lvids-reference.jpg"
    },
lviddn: {
        title: "LVIDdn (Normalized LVID Diastole)",
        view: "Derived Index (Allometric Scaling)",
        description: "Scales the left ventricular diastolic diameter to the patient's body weight. This is the gold-standard metric for diagnosing eccentric hypertrophy (e.g., MMVD, DCM) across vastly different canine body sizes.",
        method: "Calculated as: (LVIDd in cm) / (Body Weight in kg)^0.294. A value > 1.70 is a primary criteria for ACVIM Stage B2 MMVD.",

        reference: "Cornell et al. Allometric scaling of M-mode cardiac measurements in normal adult dogs.",
        pmid: "15188817"
    },
    lvidsn: {
        title: "LVIDsn (Normalized LVID Systole)",
        view: "Derived Index (Allometric Scaling)",
        description: "Scales the systolic diameter to body weight to accurately assess myocardial contractility and systolic function independently of the dog's size.",
        method: "Calculated as: (LVIDs in cm) / (Body Weight in kg)^0.315. Normal range is typically 0.71 to 1.26."
    },
    lan: {
        title: "LAn (Normalized LA Short Axis)",
        view: "Derived Index (Allometric Scaling)",
        description: "Scales the short-axis left atrial dimension directly to body weight. Useful when the aortic root size is abnormal or difficult to measure, throwing off the standard LA:Ao ratio.",
        method: "Calculated as: (LA in cm) / (Body Weight in kg)^0.355."
    },
    ladn: {
        title: "LADn (Normalized LA Long Axis)",
        view: "Derived Index (Allometric Scaling)",
        description: "Scales the long-axis (or apical) left atrial dimension to body weight. Provides a comprehensive assessment of 3D atrial remodeling.",
        method: "Calculated as: (LAD in cm) / (Body Weight in kg)^0.309.",
        reference: "Marchesotti et al (2019). Echocardiographic reference intervals of the dimensions of the main pulmonary artery and the right pulmonary artery: a prospective study in 269 healthy dogs.",
        pmid: "31611490"
    },
    ladao: {
        title: "LAD:Ao Ratio (Long Axis to Aorta)",
        view: "Derived Index",
        description: "Scales the long-axis (or apical) left atrial dimension to the aortic root. Aortic measurement is made in short axis for using these cut-offs. If measuring aorta in short axis view cut off is 2.1.",
        method: "Calculated dynamically as: LAD (mm) / Ao (mm)."
    },
    ladaola: {
        title: "LAD:Ao Ratio (Long Axis to Aorta long axis)",
        view: "Derived Index",
        description: "Scales the long-axis (or apical) left atrial dimension to the aortic root measured in right parasternal long axis view. Aortic measurement is made in long axis 5 chamber view for using these cut-offs. If measuring aorta in long axis view cut off is 2.4.",
        method: "Calculated dynamically as: LAD (mm) / Ao (mm)."
    },
    RWT: { // Capitalized to match your exact state getter
        title: "Relative Wall Thickness (RWT)",
        view: "Derived Index",
        description: "Classifies LV geometry as normal, concentric hypertrophy (high RWT, e.g., HCM or systemic hypertension), or eccentric hypertrophy (low RWT, e.g., volume overload).",
        method: "Calculated as: (2 × LV Posterior Wall) / LVIDd."
    },

    // --- VOLUME INDICES (WEIGHT & BSA) ---
    lvedvbw: {
        title: "LVEDV/BW (Diastolic Volume Index - Weight)",
        view: "Derived Index",
        description: "Indexes the maximal diastolic volume directly to body weight (ml/kg). Simpson's volumetric assessments are more sensitive for early volume overload states than 1D linear measurements.",
        method: "Calculated as: LVEDV (ml) / Body Weight (kg). Normal is typically 1.25 – 3.00 ml/kg."
    },
    lvesvbw: {
        title: "LVESV/BW (Systolic Volume Index - Weight)",
        view: "Derived Index",
        description: "Indexes the minimum systolic volume to body weight (ml/kg) to evaluate myocardial failure. Elevated values indicate the heart is struggling to eject its volume.",
        method: "Calculated as: LVESV (ml) / Body Weight (kg)."
    },
    edvim2: {
        title: "EDVI (End-Diastolic Volume Index - BSA)",
        view: "Derived Index",
        description: "Indexes LV diastolic volume to Body Surface Area (BSA) rather than raw weight. Standard in human medicine and increasingly utilized in advanced veterinary research to account for varying canine body condition scores.",
        method: "Calculated as: LVEDV (ml) / BSA (m²). BSA is derived using standard canine conversion constants."
    },
    esvim2: {
        title: "ESVI (End-Systolic Volume Index - BSA)",
        view: "Derived Index",
        description: "Indexes LV systolic volume to Body Surface Area (BSA) to standardize contractility and failure assessments across vastly different body shapes (e.g., Greyhounds vs. Bulldogs).",
        method: "Calculated as: LVESV (ml) / BSA (m²)."
    },
    la: {
        title: "LA (Left Atrium Dimension)",
        view: "Right Parasternal Short Axis (Heart Base)",
        description: "Evaluates left atrial enlargement, the primary structural indicator of elevated left-sided filling pressures.",
        method: "Measure the internal diameter of the LA at end-systole (when maximally filled), extending from the center of the aortic valve commissure to the dorsal LA wall.",
        imgPlaceholder: "/images/la-reference.jpg"
    },
    lad: {
        title: "LA diameter - long axis (Left Atrium Dimension)",
        view: "Right Parasternal Long Axis (4 chamber)",
        description: "Evaluates left atrial enlargement, the primary structural indicator of elevated left-sided filling pressures.",
        method: "Measure the internal diameter of the LA at end-systole (when maximally filled, the frame just before mitral valve opening), at the widest point, extending from the center of the interatrial septum to the inner wall of the posterior free wall, parallel to the mitral valve annulus.",
        imgPlaceholder: "/images/LADmeasure.jpg",
        reference: "Marchesotti et al (2019). Echocardiographic reference intervals of the dimensions of the main pulmonary artery and the right pulmonary artery: a prospective study in 269 healthy dogs.",
        pmid: "31611490"
    },
    ao: {
        title: "Ao (Aortic Root Dimension)",
        view: "Right Parasternal Short Axis (Heart Base)",
        description: "Serves as a patient-specific internal baseline to normalize left atrial size.",
        method: "Measure the internal diameter of the aortic root at end-diastole (when closed), along the commissure of the non-coronary and right coronary cusps.",
        imgPlaceholder: "/images/ao-reference.jpg"
    },
    aola: {
        title: "Ao (Aortic Root Dimension) - Long Axis",
        view: "Right Parasternal Long Axis (5-Chamber)",
        description: "Serves as a patient-specific internal baseline to normalize several parameters - chiefly Right sided heart and LAD - as described by Lance Visser's publications.",
        method: "Measure the aortic valve diameter (AoD) in early to midsystole measured between the hinge points of the maximally opened aortic valve cusps from a right parasternal long-axis view optimized for the left ventricular outflow tract and ascending aorta",
        imgPlaceholder: "/images/aola-reference.jpg"
    },
    ivsd: {
        title: "IVSd (Interventricular Septum - Diastole)",
        view: "Right Parasternal Short Axis (Papillary Level)",
        description: "Assesses septal thickness for signs of concentric hypertrophy (e.g., HCM, Subaortic Stenosis).",
        method: "Measure the thickness of the septum at end-diastole, excluding the right ventricular trabeculae.",
        imgPlaceholder: "/images/ivsd-reference.jpg"
    },

    // --- LEFT HEART DOPPLER ---
    eVel: {
        title: "Transmitral E-Wave Velocity",
        view: "Left Apical 4-Chamber",
        description: "Represents early, passive left ventricular diastolic filling. Highly dependent on Left Atrial Pressure (LAP) and myocardial relaxation.",
        method: "Place the Pulsed Wave (PW) Doppler sample volume exactly at the tips of the open mitral valve leaflets during diastole.",
        imgPlaceholder: "/images/ewave-reference.jpg"
    },
    aVel: {
        title: "Transmitral A-Wave Velocity",
        view: "Left Apical 4-Chamber",
        description: "Represents late, active diastolic filling driven by atrial contraction (the 'atrial kick').",
        method: "Measured from the same PW Doppler trace as the E-wave. Occurs immediately following the P-wave on the concurrent ECG.",
        imgPlaceholder: "/images/awave-reference.jpg"
    },

    // --- CALCULATED INDICES ---
    fs: {
        title: "Fractional Shortening (FS%)",
        view: "Derived Index",
        description: "A functional index representing the percentage change in the left ventricular diameter during systole. Normal in dogs is typically > 25%.",
        method: "Calculated automatically as: ((LVIDd - LVIDs) / LVIDd) × 100. Note: FS% can be falsely elevated in severe mitral regurgitation due to the low-resistance left atrium."
    },
    laAo: {
        title: "LA:Ao Ratio",
        view: "Derived Index",
        description: "An objective, body-weight independent metric for staging left atrial enlargement. A ratio ≥ 1.6 is a primary criterion for ACVIM Stage B2 MMVD.",
        method: "Calculated automatically by dividing the LA dimension by the Ao dimension measured at the heart base.",
        imgPlaceholder: "/images/laao-reference.jpg"
    },
    ear: {
        title: "E:A Ratio",
        view: "Derived Index",
        description: "The primary initial assessment for diastolic function and left atrial pressure.",
        method: "Normal physiologic filling results in an E > A pattern (Ratio > 1.0). An E:A ratio < 1.0 indicates impaired relaxation (Grade 1), while a ratio > 2.0 suggests restrictive filling (Grade 3).",
        imgPlaceholder: "/images/earatio-reference.jpg"
    },
// --- LEFT HEART VOLUMES & WALLS ---
    lvpwd: {
        title: "LVPWd (LV Posterior/Free Wall - Diastole)",
        view: "Right Parasternal Short/Long Axis",
        description: "Assesses left ventricular free wall thickness for signs of concentric hypertrophy.",
        method: "Measure the thickness of the LV free wall at end-diastole, placing calipers from the endocardial border to the epicardial border. Exclude papillary muscles.",
        imgPlaceholder: "/images/lvpwd-reference.jpg"
    },
    lvedv: {
        title: "LVEDV (LV End-Diastolic Volume)",
        view: "Right Parasternal Long Axis / Apical 4-Chamber",
        description: "Quantifies the maximal diastolic blood volume in the left ventricle. More accurate than 1D linear measurements for assessing eccentric hypertrophy.",
        method: "Typically calculated using the Simpson's Method of Discs (SMOD) or Area-Length method by tracing the endocardial border at maximum diastole.",
        imgPlaceholder: "/images/lvedv-reference.jpg"
    },
    lvesv: {
        title: "LVESV (LV End-Systolic Volume)",
        view: "Right Parasternal Long Axis / Apical 4-Chamber",
        description: "Quantifies the minimal systolic blood volume. Elevated volumes indicate myocardial systolic failure.",
        method: "Trace the endocardial border at maximum systole (minimum chamber size).",
        imgPlaceholder: "/images/lvesv-reference.jpg"
    },

    // --- OUTFLOW TRACTS & TISSUE DOPPLER ---
    lvotd: {
        title: "LVOTd (LV Outflow Tract Diameter)",
        view: "Right Parasternal Long Axis (5-Chamber)",
        description: "Crucial for calculating forward systemic stroke volume (Qs) and evaluating left-to-right shunts.",
        method: "Measure the internal diameter of the left ventricular outflow tract in mid-systole, positioned just below the aortic valve insertion points. Very similar measurement to Aortic valve (long axis) measurement.",
        imgPlaceholder: "/images/lvotd-reference.jpg"
    },
    rvotd: {
        title: "RVOTd (RV Outflow Tract Diameter)",
        view: "Right Parasternal Short Axis (Heart Base)",
        description: "Used alongside LVOTd to calculate Qp:Qs shunt ratios (e.g., PDA, VSD).",
        method: "Measure the internal diameter of the RVOT just proximal to the pulmonic valve annulus during mid-systole.",
        imgPlaceholder: "/images/rvotd-reference.jpg"
    },
    lvotvti: {
        title: "LVOT VTI (Velocity-Time Integral)",
        view: "Subcostal or Left Apical 5-Chamber",
        description: "Represents the stroke distance of blood ejected from the left ventricle. Combines with LVOT area to calculate systemic stroke volume.",
        method: "Trace the envelope of the Pulsed Wave (PW) Doppler spectral signal obtained from the center of the LVOT.",
        imgPlaceholder: "/images/lvotvti-reference.jpg"
    },
    rvotvti: {
        title: "RVOT VTI (Velocity-Time Integral)",
        view: "Right Parasternal Short Axis (Heart Base)",
        description: "Represents the stroke distance of blood ejected into the pulmonary circulation.",
        method: "Trace the envelope of the PW Doppler signal obtained from the center of the RVOT, just proximal to the pulmonic valve.",
        imgPlaceholder: "/images/rvotvti-reference.jpg"
    },
    ePrime: {
        title: "e' (Mitral Annular Early Diastolic Velocity)",
        view: "Left Apical 4-Chamber",
        description: "A Tissue Doppler Imaging (TDI) metric representing true myocardial active relaxation.",
        method: "Place the TDI sample volume over the lateral mitral annulus. Measure the peak of the first negative (moving away) diastolic wave.",
        imgPlaceholder: "/images/eprime-reference.jpg"
    },

    // --- PULMONARY & TRICUSPID DOPPLER / TIMING ---
    mdt: {
        title: "MDT (Mitral Deceleration Time)",
        view: "Left Apical 4-Chamber",
        description: "Measures the rate of pressure equalization between the LA and LV. Shortened times (<60ms) strongly suggest restrictive filling.",
        method: "Measure the time interval from the peak of the transmitral E-wave down the deceleration slope to the baseline (0 m/s).",
        imgPlaceholder: "/images/mdt-reference.jpg"
    },
    ivrt: {
        title: "IVRT (Isovolumic Relaxation Time)",
        view: "Left Apical 5-Chamber",
        description: "The time required for the LV to relax and drop pressure below LA pressure before the mitral valve opens. Prolonged in impaired relaxation; shortened in high LAP.",
        method: "Place PW Doppler between the LVOT and Mitral inflow to capture both. Measure the time from aortic valve closure (end of ejection) to mitral valve opening (start of E-wave).",
        imgPlaceholder: "/images/ivrt-reference.jpg"
    },
    trMax: {
        title: "TR Vmax (Tricuspid Regurgitation Peak Velocity)",
        view: "Left Apical 4-Chamber (RV Optimized) / Right Parasternal",
        description: "The gold standard surrogate for estimating Right Ventricular Systolic Pressure (RVSP) and diagnosing pulmonary hypertension.",
        method: "Align a Continuous Wave (CW) Doppler beam parallel to the TR jet. Measure the maximum peak velocity of the spectral envelope.",
        imgPlaceholder: "/images/trmax-reference.jpg"
    },
    prMax: {
        title: "PR Vmax (Pulmonic Regurgitation Peak Velocity)",
        view: "Right Parasternal Short Axis",
        description: "Used to estimate diastolic pulmonary artery pressures.",
        method: "Align CW Doppler with the diastolic regurgitant jet across the pulmonic valve. Measure the peak early diastolic velocity.",
        imgPlaceholder: "/images/prmax-reference.jpg"
    },
    aovmax: {
        title: "Ao Vmax (Aortic Peak Velocity)",
        view: "Subcostal / Left Apical 5-Chamber",
        description: "Evaluates left ventricular outflow tract obstruction (e.g., Subaortic Stenosis).",
        method: "Use CW Doppler aligned with the aortic outflow. Measure the peak systolic velocity.",
        imgPlaceholder: "/images/aovmax-reference.jpg"
    },
    pavmax: {
        title: "PA Vmax (Pulmonic Peak Velocity)",
        view: "Right Parasternal Short Axis",
        description: "Evaluates right ventricular outflow tract obstruction (e.g., Pulmonic Stenosis).",
        method: "Use CW Doppler aligned with the pulmonic outflow. Measure the peak systolic velocity.",
        imgPlaceholder: "/images/pavmax-reference.jpg"
    },

    // --- PULMONARY ARTERY BRANCHES ---
    mpamin: {
        title: "MPA min (Main Pulmonary Artery Minimum)",
        view: "Right Parasternal Short Axis (Heart Base)",
        description: "Used to assess pulmonary artery dilation, a hallmark of precapillary pulmonary hypertension.",
        method: "Measure the minimal internal diameter of the main pulmonary artery at end-diastole (just before pulmonic valve opening).",
        imgPlaceholder: "/images/reference-mpamin.jpg",
        reference: "Grosso et al (2023). Echocardiographic reference intervals of the dimensions of the main pulmonary artery and the right pulmonary artery: a prospective study in 269 healthy dogs.",
        pmid: "37918089"
    },
    mpaAo: {
        title: "MPA : Ao index (Main Pulmonary Artery to Aorta Sax Index)",
        view: "Right Parasternal Short Axis (Heart Base)",
        description: "Used to assess pulmonary artery dilation, a hallmark of precapillary pulmonary hypertension.",
        method: "Measure the minimal internal diameter of the main pulmonary artery at end-diastole (just before pulmonic valve opening). Index to the aortic valve in short axis. Calculated as MPAmin / Ao. A value under 1.01 is considered normal.",
        reference: "Grosso et al (2023). Echocardiographic reference intervals of the dimensions of the main pulmonary artery and the right pulmonary artery: a prospective study in 269 healthy dogs.",
        pmid: "37918089"
    },
    rpaminao: {
        title: "RPAmin : Ao index (Right Pulmonary Artery minimum to Aorta Sax Index)",
        view: "Right Parasternal Short Axis (Heart Base), using M-mode through the RPA",
        description: "Used to assess pulmonary artery dilation, a hallmark of precapillary pulmonary hypertension.",
        method: "Measure the minimal internal diameter of the right pulmonary artery at end-diastole (just before pulmonic valve opening). Index to the aortic valve in short axis. Calculated as RPAmin / Ao. A value under 0.61 is considered normal.",
        reference: "Grosso et al (2023). Echocardiographic reference intervals of the dimensions of the main pulmonary artery and the right pulmonary artery: a prospective study in 269 healthy dogs.",
        pmid: "37918089"
    },
    rpamaxao: {
        title: "MPA : Ao index (Right Pulmonary Artery maximum to Aorta Sax Index)",
        view: "Right Parasternal Short Axis (Heart Base), using M-mode through the RPA",
        description: "Used to assess pulmonary artery dilation, a hallmark of precapillary pulmonary hypertension.",
        method: "Measure the maximum internal diameter of the right pulmonary artery at end-diastole (just before pulmonic valve opening). Index to the aortic valve in short axis. Calculated as RPAmax / Ao. A value under 0.98 is considered normal.",
        reference: "Grosso et al (2023). Echocardiographic reference intervals of the dimensions of the main pulmonary artery and the right pulmonary artery: a prospective study in 269 healthy dogs.",
        pmid: "37918089"
    },
    rpamin: {
        title: "RPA min (Right Pulmonary Artery Minimum)",
        view: "Right Parasternal Short Axis, using M-mode through the RPA",
        description: "A highly sensitive, body-weight indexed marker for pulmonary hypertension (Vezzosi/Grosso criteria).",
        method: "Measure the internal diameter of the right pulmonary artery branch at end-diastole.",
        imgPlaceholder: "/images/reference-rpa.jpg",
        reference: "Grosso et al (2023). Echocardiographic reference intervals of the dimensions of the main pulmonary artery and the right pulmonary artery: a prospective study in 269 healthy dogs.",
        pmid: "37918089"
    },
    rpamax: {
        title: "RPA max (Right Pulmonary Artery Maximum)",
        view: "Right Parasternal Short Axis, using M-mode through the RPA",
        description: "Evaluates the maximum distension of the RPA during peak systole.",
        method: "Measure the maximal internal diameter of the right pulmonary artery branch during peak systole.",
        imgPlaceholder: "/images/reference-rpa.jpg",
        reference: "Grosso et al (2023). Echocardiographic reference intervals of the dimensions of the main pulmonary artery and the right pulmonary artery: a prospective study in 269 healthy dogs.",
        pmid: "37918089"
    },
    rpadi: {
        title: "RPAD index",
        view: "Derived Index",
        description: "The percentage change in diameter of the right pulmonary artery throughout a singe cardiac cycle.",
        method: "Calculated as: RPAD index = [(RPAmax  RPAmin) / RPAmax] x 100. A value over 31.2% is considered normal.",
        reference: "Grosso et al (2023). Echocardiographic reference intervals of the dimensions of the main pulmonary artery and the right pulmonary artery: a prospective study in 269 healthy dogs.",
        pmid: "37918089"
    },

    // --- DERIVED CLINICAL INDICES ---
    sv: {
        title: "Stroke Volume (SV)",
        view: "Derived Index",
        description: "The total volume of blood ejected by the ventricle per beat.",
        method: "Calculated automatically by subtracting End-Systolic Volume (ESV) from End-Diastolic Volume (EDV)."
    },
    ef: {
        title: "Ejection Fraction (EF%)",
        view: "Derived Index",
        description: "The percentage of diastolic volume ejected per beat. A key indicator of systolic function.",
        method: "Calculated as: (Stroke Volume / LVEDV) × 100."
    },
    rwt: {
        title: "Relative Wall Thickness (RWT)",
        view: "Derived Index",
        description: "Classifies LV geometry as normal, concentric hypertrophy (high RWT), or eccentric hypertrophy (low RWT).",
        method: "Calculated as: (2 × LV Posterior Wall) / LVIDd.",
        imgPlaceholder: "/images/rwt-reference.jpg"
    },
    eivrt: {
        title: "E:IVRT Ratio",
        view: "Derived Index",
        description: "An excellent hybrid predictor of left atrial pressure, combining early filling velocity with the relaxation time interval.",
        method: "Calculated as: (E-wave velocity × 100) / IVRT. Ratios > 2.5 strongly correlate with elevated Left Atrial Pressure."
    },
    lveio: {
        title: "LVEIO (E:LVOT VTI)",
        view: "Derived Index",
        description: "Compares diastolic filling velocity against forward stroke distance. High ratios indicate the ventricle requires massive filling pressures to drive normal forward flow.",
        method: "Calculated as: E-wave velocity / LVOT VTI."
    },
    eePrime: {
        title: "E:e' Ratio",
        view: "Derived Index",
        description: "The gold-standard non-invasive surrogate for left atrial filling pressure.",
        method: "Calculated as: Transmitral E-wave velocity / TDI e' velocity. Normalizes blood flow against muscle relaxation speed."
    },
    eplar: {
        title: "ePLAR (Echocardiographic Pulmonary to Left Atrial Ratio)",
        view: "Derived Index",
        description: "Differentiates pre-capillary from post-capillary pulmonary hypertension.",
        method: "Calculated as: TR Vmax / E:e' Ratio. A high value (>0.28) points to primary lung vascular disease; a low value (<0.23) points to left heart failure backing up into the lungs."
    },
    vtir: {
        title: "VTI Ratio (P:S / Qp:Qs)",
        view: "Derived Index",
        description: "Assesses the balance between pulmonary (Qp) and systemic (Qs) flow volumes. Used to quantify the severity of shunts (e.g., PDA, VSD).",
        method: "Calculated as: RVOT VTI / LVOT VTI (or cross-sectional areas for true volumetric Qp:Qs). Normal is roughly 1.0."
    },
    rfac: {
        title: "RV FAC% (Right Ventricular Fractional Area Change)",
        view: "Derived Index",
        description: "A robust 2D estimation of global right ventricular systolic function. Preferred over TAPSE as it accounts for both longitudinal and radial contraction.",
        method: "Calculated as: ((RVEDA - RVESA) / RVEDA) × 100."
    },
    trPG: {
        title: "Pressure Gradient (TR PG)",
        view: "Derived Index",
        description: "Estimates the pressure difference between the right ventricle and right atrium during systole.",
        method: "Calculated using the modified Bernoulli equation: 4 × (Velocity²). When added to estimated Right Atrial Pressure (RAP), it yields Right Ventricular Systolic Pressure (RVSP).",
        imgPlaceholder: "/images/bernoulli-reference.jpg"
    },
    mrFraction: {
        title: "Regurgitant Fraction (MR%)",
        view: "Derived Index",
        description: "Quantifies the percentage of the total LV stroke volume that leaks backward into the left atrium rather than going out the aorta.",
        method: "Calculated as: (Mitral Regurgitant Volume / Total LV Stroke Volume) × 100."
    },
    lvei: {
        title: "LVEI (LV Eccentricity Index)",
        view: "Derived Index",
        description: "Quantifies septal flattening (D-shape) caused by right ventricular volume or pressure overload.",
        method: "Calculated as: Perpendicular LVIDd₂ / Standard LVIDd. An index > 1.2 indicates significant geometric distortion.",
        imgPlaceholder: "/images/lvei-reference.jpg"
    },
cvcAo: {
        title: "CVC:Ao Ratio (Caudal Vena Cava to Aorta)",
        view: "Derived Index",
        description: "Compares the Caudal Vena Cava maximal diameter to the Aorta. A strong, objective indicator of right-sided congestive heart failure and elevated Central Venous Pressure (CVP).",
        method: "Calculated dynamically as: CVC (mm) / Ao (mm). A ratio > 1.3 combined with less than a 10% collapse during the respiratory cycle strongly suggests right heart failure.",
        reference: "Darnis et al. Establishment of reference values of the caudal vena cava by fast-stroke echocardiography.",
        pmid: "15632009" // Note: This is for general CVC ultrasound reference
    },
    cvcCollapse: {
        title: "CVC Collapsibility Index",
        view: "Subxiphoid / Right Hepatic View",
        description: "Evaluates the respiratory variation in the Caudal Vena Cava. A lack of collapse during inspiration indicates right atrial pressure is severely elevated.",
        method: "Calculated as: ((CVC max - CVC min) / CVC max) × 100. Normal dogs should show > 50% collapse during a normal inspiratory effort.",
        reference: "Darnis et al. Establishment of reference values of the caudal vena cava by fast-stroke echocardiography.",
        pmid: "15632009"
    },
    changScore: {
        title: "Chang (2026) PH Predictive Score",
        view: "Derived Multi-parametric Index",
        description: "A 25-point echocardiographic scoring system designed to assess the probability of moderate-to-severe pulmonary hypertension in dogs lacking a measurable tricuspid regurgitation (TR) jet. It integrates right and left heart structural ratios with subjective visual findings.",
        method: "Calculates cumulative risk using: RV:LV dilation (0-6 pts), RVWT:LVPWd ratio (0-2 pts), RA:LA ratio (0-6 pts), PA:Ao ratio (0-6 pts), IVS flattening severity (0-4 pts), and RVOT mid-systolic notching (0-1 pt). Scores ≥ 4 predict pTRV ≥ 3.4 m/s; Scores ≥ 9 predict pTRV ≥ 4.3 m/s.",
        reference: "Chang et al. (2026) Development and evaluation of a composite echocardiographic score for predicting pulmonary hypertension severity in dogs.",
        pmid: "41742574",
        imgPlaceholder: "/images/reference-phtscoring.jpg"
    },
ivsFlattening: {
        title: "Interventricular Septal (IVS) Flattening",
        view: "Right Parasternal Short Axis",
        description: "A key structural marker of right ventricular pressure or volume overload. As RV pressures equalize with or exceed LV pressures, the normally circular left ventricle becomes compressed into a 'D' shape.",
        method: "Evaluated subjectively or objectively via the Eccentricity Index (LVEI). Graded as Normal (circular), Subtle-Mild (deviated but not completely flat), or Moderate-Severe (visibly flattened or convex into the LV chamber).",
        reference: "Chang et al. (2026) Development and evaluation of a composite echocardiographic score for predicting pulmonary hypertension severity in dogs.",
        pmid: "41742574",
        imgPlaceholder: "/images/reference-ivsflattening.jpg"
    },
    rvotNotching: {
        title: "RVOT Mid-Systolic Notching",
        view: "Right Parasternal Short Axis (Heart Base)",
        description: "A highly specific Doppler finding indicating severely elevated pulmonary vascular resistance and pre-capillary pulmonary hypertension. It is caused by a premature reflection of pressure waves from the stiffened pulmonary arterial tree.",
        method: "Obtain a Pulsed Wave (PW) Doppler profile of the Right Ventricular Outflow Tract (RVOT). Look for a characteristic 'W-shape' or a distinct notch on the deceleration slope of the forward systolic waveform.",
        reference: "Chang et al. (2026) Development and evaluation of a composite echocardiographic score for predicting pulmonary hypertension severity in dogs.",
        pmid: "41742574",
        imgPlaceholder: "/images/reference-rvotnotch.jpg"
    }
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

document.addEventListener('DOMContentLoaded', function() {
    const selector = document.getElementById('breed-selector');
    if (selector && typeof breedSpecificReferenceRanges !== 'undefined') {
        const breedNames = Object.keys(breedSpecificReferenceRanges).sort();
        breedNames.forEach(breed => {
            let option = document.createElement('option');
            option.value = breed;
            option.text = breed;
            selector.appendChild(option);
        });
    }
});

function updateBreedTable() {
    const selector = document.getElementById('breed-selector');
    const container = document.getElementById('breed-data-container');
    const breedName = selector.value;

    if (!breedName) { container.innerHTML = ''; return; }

    const breedData = breedSpecificReferenceRanges[breedName];
    const excludedTags = ['is_deviant', 'pmid', 'clinical_note', 'reference', 'sources'];

    // Helper to get text or value from the DOM
    const getVal = (selector, isText = false) => {
        const el = document.querySelector(selector);
        if (!el) return '—';
        let val = isText ? el.innerText : el.value;
        if (typeof val === 'string') val = val.replace('%', '').trim();
        return (val === '0' || val === '0.0' || val === '' || val === 0) ? '—' : val;
    };

    // Mapping: Data File Key -> Live Calculator Value
    const patientValues = {
        "lvidd_mm": getVal('[x-model="lvidd"]'),
        "lvids_mm": getVal('[x-model="lvids"]'),
        "lvidd_n":  getVal('[x-text="lviddn"]', true),
        "lvids_n":  getVal('[x-text="lvidsn"]', true),
        "la_ao":    getVal('[x-text="laAo"]', true),
        "la_n":     getVal('[x-text="lan"]', true),
        "lad_n":    getVal('[x-text="ladn"]', true),
        "fs_pct":   getVal('[x-text="fs"]', true),
        "ef_pct":   getVal('[x-text="ef"]', true),
        "ivsd_mm":  getVal('[x-model="ivsd"]'),
        "lvpwd_mm": getVal('[x-model="lvpwd"]'),
        "lad_mm":   getVal('[x-model="lad"]'),
        "edvi_smod_kg": getVal('[x-text="lvedvbw"]', true),
        "esvi_smod_kg": getVal('[x-text="lvesvbw"]', true),
        "edvi_smod_m2": getVal('[x-text="edvim2"]', true),
        "esvi_smod_m2": getVal('[x-text="esvim2"]', true)
};

    const formatLabel = (key) => {
        let label = key.toUpperCase().replace(/_/g, ' ');
        label = label.replace(/\bMM\b/g, '(mm)');
        label = label.replace(/\bLA AO\b/g, 'LA:Ao');
        label = label.replace(/\bSMOD KG\b/g, '(smod)/kg');
        label = label.replace(/\bSMOD M2\b/g, '(smod)/m²');
        label = label.replace(/\bVMAX\b/g, '(Vmax)');
        label = label.replace(/\bPCT\b/g, '%');
        label = label.replace(/\bLVIDD N\b/g, 'LVIDdn');
        label = label.replace(/\bLVIDS N\b/g, 'LVIDsn');
        return label;
    };

    const renderSourceBlock = (dataObj, title = null) => {
        let blockHtml = '';
        if (title) blockHtml += `<h4 style="margin: 25px 0 10px 0; color: #1e40af; border-bottom: 2px solid #e2e8f0; padding-bottom: 5px;">${title}</h4>`;

        const metricsSource = dataObj.metrics || dataObj;

        blockHtml += `<table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 0.9rem; border: 1px solid #dee2e6;">
                        <thead style="background-color: #f8f9fa;">
                            <tr>
                                <th style="padding: 10px; border: 1px solid #dee2e6; text-align: left;">Metric</th>
                                <th style="padding: 10px; border: 1px solid #dee2e6; text-align: left;">Patient</th>
                                <th style="padding: 10px; border: 1px solid #dee2e6; text-align: left;">Breed Ref</th>
                            </tr>
                        </thead>
                        <tbody>`;

        Object.keys(metricsSource).forEach(key => {
            if (!excludedTags.includes(key)) {
                const val = metricsSource[key];
                const label = formatLabel(key); // Variable redeclaration error fixed here
                
                let rangeString = '—';
                if (typeof val === 'object' && val !== null) {
                    if (val.min !== undefined && val.max !== undefined) rangeString = `${val.min}–${val.max}`;
                    else if (val.max !== undefined) rangeString = `< ${val.max}`;
                    else if (val.median !== undefined) rangeString = `~${val.median}`;
                } else {
                    rangeString = val || '—';
                }

                const pVal = patientValues[key] || '—';
                const isAbnormal = (pVal !== '—' && val.max && parseFloat(pVal) > parseFloat(val.max));

                blockHtml += `<tr>
                                <td style="padding: 10px; border: 1px solid #dee2e6; font-weight: 500; background-color: #f9fafb;">${label}</td>
                                <td style="padding: 10px; border: 1px solid #dee2e6; ${isAbnormal ? 'background-color: #fef2f2; color: #ef4444; font-weight: bold;' : ''}">${pVal}</td>
                                <td style="padding: 10px; border: 1px solid #dee2e6; font-weight: bold;">${rangeString}</td>
                             </tr>`;
            }
        });

        blockHtml += `</tbody></table>`;
        if (dataObj.clinical_note) blockHtml += `<div style="background-color: #f1f5f9; padding: 12px; border-radius: 4px; font-style: italic; margin-top: 15px; border-left: 4px solid #64748b; font-size: 0.9rem;"><strong>Note:</strong> ${dataObj.clinical_note}</div>`;
        if (dataObj.pmid) blockHtml += `<p style="margin-top:10px;"><a href="https://pubmed.ncbi.nlm.nih.gov/${dataObj.pmid}" target="_blank" style="color: #2563eb; font-size: 0.85rem; text-decoration: underline;">🔗 View Research (PMID: ${dataObj.pmid})</a></p>`;

        return blockHtml;
    };

    let html = '';

    // Deviant Breed Alert
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

    container.innerHTML = html;
}