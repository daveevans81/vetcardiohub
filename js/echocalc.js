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
    // Check if the data object exists from your external file
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

    // 1. Helper to fetch live calculator values
    const getVal = (selector, isText = false) => {
        const el = document.querySelector(selector);
        if (!el) return '—';
        let val = isText ? el.innerText : el.value;
        if (typeof val === 'string') val = val.replace('%', '').trim();
        return (val === '' || val === '0' || val === '0.0' || val === 0) ? '—' : val;
    };

    // 2. Mapping of keys
    const patientValues = {
        "lvidd_mm": getVal('[x-model="lvidd"]'),
        "lvids_mm": getVal('[x-model="lvids"]'),
        "ivsd_mm":  getVal('[x-model="ivsd"]'),
        "lvpwd_mm": getVal('[x-model="lvpwd"]'),
        "la_mm":    getVal('[x-model="la"]'),
        "ao_mm":    getVal('[x-model="ao"]'),
        "lad_mm":   getVal('[x-model="lad"]'),
        "lvidd_n":  getVal('[x-text="lviddn"]', true),
        "lvids_n":  getVal('[x-text="lvidsn"]', true),
        "la_ao":    getVal('[x-text="laAo"]', true),
        "la_n":     getVal('[x-text="lan"]', true),
        "lad_n":    getVal('[x-text="ladn"]', true),
        "fs_pct":   getVal('[x-text="fs"]', true),
        "ef_pct":   getVal('[x-text="ef"]', true),
        "edvi_smod_kg": getVal('[x-text="lvedvbw"]', true),
        "esvi_smod_kg": getVal('[x-text="lvesvbw"]', true),
        "ao_vmax":  getVal('[x-model="vmax"]') // Added in case you have Vmax input
    };

    // 3. NEW: Formatting helper for labels
    const formatLabel = (key) => {
        let label = key.toUpperCase().replace(/_/g, ' ');
        
        // Custom formatting replacements
        label = label.replace(/\bMM\b/g, '(mm)');
        label = label.replace(/\bLA AO\b/g, 'LA:Ao');
        label = label.replace(/\bSMOD KG\b/g, '(smod)/kg');
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
                const label = formatLabel(key);
                
                let rangeString = '—';
                if (typeof val === 'object' && val !== null) {
                    if (val.min !== undefined && val.max !== undefined) rangeString = `${val.min}–${val.max}`;
                    else if (val.max !== undefined) rangeString = `< ${val.max}`;
                    else if (val.median !== undefined) rangeString = `~${val.median}`;
                } else {
                    rangeString = val || '—';
                }

                const pVal = patientValues[key] || '—';
                
                // Abnormal check: Only trigger if pVal and val.max are valid numbers
                let abnormalStyle = '';
                if (pVal !== '—' && val.max !== undefined) {
                    if (parseFloat(pVal) > parseFloat(val.max)) {
                        abnormalStyle = 'background-color: #fef2f2; color: #ef4444; font-weight: bold;';
                    }
                }

                blockHtml += `<tr>
                                <td style="padding: 10px; border: 1px solid #dee2e6; font-weight: 500; background-color: #f9fafb;">${label}</td>
                                <td style="padding: 10px; border: 1px solid #dee2e6; ${abnormalStyle}">${pVal}</td>
                                <td style="padding: 10px; border: 1px solid #dee2e6; font-weight: bold;">${rangeString}</td>
                             </tr>`;
            }
        });

        blockHtml += `</tbody></table>`;
        if (dataObj.clinical_note) blockHtml += `<div style="background-color: #f1f5f9; padding: 12px; border-radius: 4px; font-style: italic; margin-top: 15px; border-left: 4px solid #64748b; font-size: 0.9rem;"><strong>Clinical Note:</strong> ${dataObj.clinical_note}</div>`;
        if (dataObj.pmid) blockHtml += `<p style="margin-top:10px;"><a href="https://pubmed.ncbi.nlm.nih.gov/${dataObj.pmid}" target="_blank" style="color: #2563eb; font-size: 0.85rem; text-decoration: underline;">🔗 View Research (PMID: ${dataObj.pmid})</a></p>`;

        return blockHtml;
    };

    let finalHtml = '';
    if (breedData.sources && Array.isArray(breedData.sources)) {
        breedData.sources.forEach((source, index) => {
            finalHtml += renderSourceBlock(source, source.reference || `Source ${index + 1}`);
        });
    } else {
        finalHtml += renderSourceBlock(breedData);
    }



    
    html += `<div style="background-color: #f9f9f9; padding: 12px; border-radius: 4px;  margin-top: 10px; border-left: 4px solid #999999;"><strong>Caveat:</strong> In practice, breed normals serve as starting values; each animal’s weight and context must be considered. Clinicians should integrate multiple indices (e.g. body-size normalized LVID, EF, LA/Ao, etc.) when assessing an individual
</div>`;

    container.innerHTML = html;
}