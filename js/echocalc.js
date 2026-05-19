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
    copySuccess: false,
    showComments: false,
    clinicalComments: '',
    eVel: '',
    aVel: '',
    ivrt: '',
    lvotd: '', 
    rvotd: '',
    lvotvti: '',
    rvotvti: '',
    ePrime: '',
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
    rad: '',     // RA Minor Axis (Width/Diameter)
    prMax: '',    // Pulmonic Regurgitation Max Velocity (m/s)
    mpamin: '',    // Main Pulmonary Artery minimum
    rpamin: '',    // Right Pulmonary Artery min
    rpamax: '',    // Right Pulmonary Artery max
    ivsFlattening: false, // UI Boolean for "D-shaped" Septum
    lvidd2:'',
    selectedRightModel: 'visser_2015', // Default right heart validation framework
    selectedMineModel: 'mine_1',
    showVolumes: false,
    showDoppler: false,
    showRightHeart: false,
    showShunt: false,
    rawEchoText: '',
    parseMessage: '',
    
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
        if(!this.la || !this.lad || !this.ao || parseFloat(this.ao) === 0) return 0;
        return (this.lad / this.ao).toFixed(3);
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
    get ref() {
        if(!this.rveda || !this.rvesa || parseFloat(this.rveda) === 0) return 0;
        return (((this.rveda - this.rvesa) / this.rveda) * 100).toFixed(1);
    },
    get trPG() {
    if (!this.trMax || parseFloat(this.trMax) === 0) return 0;
    return parseFloat((Math.pow(this.trMax, 2) * 4).toFixed(2));
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
    if (this.lvei >= 1.2) { siteVentricle = true; rvSigns.push('Septal Flattening'); }
    if (this.rvwt && this.rightAllometricResults?.rvwt?.max && parseFloat(this.rvwt) > this.rightAllometricResults.rvwt.max) { siteVentricle = true; rvSigns.push('RV Hypertrophy'); }
    if (this.rveda && this.rightAllometricResults?.rveda?.max && parseFloat(this.rveda) > this.rightAllometricResults.rveda.max) { siteVentricle = true; rvSigns.push('RV Dilation'); }

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
    if (parseFloat(this.mpaAo) > 1.0) { sitePA = true; paSigns.push('MPA:Ao > 1.0'); }
    
    // NOTE: Insert your specific RPAmin allometric logic here once you pull the formula
    if (this.rpamin && parseFloat(this.rpamin) > 3.0 /* Replace with strict allometric formula logic */) { 
        sitePA = true; 
        paSigns.push('RPAmin Enlargement'); 
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
    if (tr === 0 && anatomicSites === 0) return null; // Nothing to show yet
    
    // --- 5. Determine Final ACVIM Probability Matrix ---
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
        siteDetails: { siteVentricle, sitePA, siteRA }
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

get rightAllometricResults() {
    const results = {};
    if (!this.weight || this.weight <= 0 || typeof rightHeartModels === 'undefined') return results;
    
    const modelData = rightHeartModels[this.selectedRightModel];
    if (!modelData) return results;

    const targets = ['tapse', 'rvwt', 'rveda', 'rvesa', 'rvd1', 'rad', 'rpamin'];
    
    targets.forEach(param => {
        const formula = modelData.params?.[param];
        if (!formula) {
            results[param] = { min: null, max: null, mean: null, available: false };
            return;
        }

        // Standard allometric computation curve: Y = a * (BW ^ b)
        const mean = formula.a * Math.pow(this.weight, formula.b);
        
        // Handle models that provide fixed prediction intervals vs standard deviations
        let lower = formula.minMultiplier ? formula.minMultiplier * mean : mean - (1.96 * (formula.see || 0));
        let upper = formula.maxMultiplier ? formula.maxMultiplier * mean : mean + (1.96 * (formula.see || 0));

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

    // --- EXTRACTION MAP ---
    // Each entry: { key: stateVariable, patterns: [regex for label column] }
    // Order matters for ambiguous labels — put more specific patterns first.
  
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

    // --- SKIP LIST: label fragments that indicate a calculated ratio or index ---
    // If the label column matches any of these, skip the line entirely.
    const skipPatterns = [
        /ratio/i, /[:,/]/,       // explicit ratio labels or separator chars in label
        /RPLA/i,                  // normalized-by-BW variants
        /\/BW/i, /\/Ao/i, /\/kg/i, /\/m/i,
        /N\s*\(/i,               // e.g. "LADN (< 1.730)"
        /\bDDN\b/i, /\bDSN\b/i, // LVD normalized labels
        /\bEF\b/i, /\bFS\b/i, /\bFAC\b/i, /\bRWT\b/i,  // derived indices
        /\bNorm\b/i, /\bnLA\b/i,
        /Cornell/i, /2D/i,       // composite labels like "LVDDN 2D" or "LVDDN (Cornell)"
        /\bN\b.*[<>]/,           // anything with N followed by a reference bracket
        /^(Referral|Chambers|Valves|Additional|Interpretation)/i,
    ];

    // --- FIRST-MATCH WINS SET: once a key is filled, ignore subsequent lines ---
    const filled = new Set();

for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine) continue;

        // 1. Garbage filter: Skip headers and calculated ratios
        if (skipPatterns.some(p => p.test(trimmedLine))) continue;

        // 2. Search for data
        for (const rule of extractionMap) {
            for (const pattern of rule.patterns) {
                if (pattern.test(trimmedLine)) {
                    // Look for a number that appears AFTER the pattern match
                    const regex = new RegExp(pattern.source + "[^0-9-]*(-?[0-9]+(?:\\.[0-9]+)?)", "i");
                    const match = trimmedLine.match(regex);

                    if (match && match[1]) {
                        const numericValue = parseFloat(match[1]);
                        
                        if (!isNaN(numericValue)) {
                            this[rule.key] = numericValue;
                            
                            if (!filled.has(rule.key)) {
                                filled.add(rule.key);
                                matchCount++;
                            }
                        }
                    }
                }
            }
        }
    }

    // Boolean check for D-shape / septal flattening in full text
    if (/\b(?:flattening|flattened|D-shape|D-shaped|D shape)\b/i.test(this.rawEchoText)) {
        this.ivsFlattening = true;
        matchCount++;
    }

    if (matchCount > 0) {
        this.parseMessage = `Success: Auto-filled ${matchCount} parameters!`;
        this.rawEchoText = '';
        setTimeout(() => this.parseMessage = '', 4000);
    } else {
        this.parseMessage = 'Could not find recognizable measurements.';
        setTimeout(() => this.parseMessage = '', 4000);
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