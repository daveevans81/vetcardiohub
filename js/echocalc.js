function showInstructions() {
    const isiOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
    if (isiOS) {
        alert("To save: Tap the 'Share' icon (square with arrow) at the bottom of Safari and select 'Add to Home Screen'.");
    } else {
        alert("To save: Tap the three dots (⋮) and select 'Install app' or 'Add to Home Screen'.");
    }
};

// This function runs on page load to fill the dropdown
document.addEventListener('DOMContentLoaded', function() {
    const selector = document.getElementById('breed-selector');
    
    // Sort breeds alphabetically and populate
    const breedNames = Object.keys(breedSpecificReferenceRanges).sort();
    
    breedNames.forEach(breed => {
        let option = document.createElement('option');
        option.value = breed;
        option.text = breed;
        selector.appendChild(option);
    });
});

function updateBreedTable() {
    const selector = document.getElementById('breed-selector');
    const container = document.getElementById('breed-data-container');
    const selectedBreed = selector.value;

    if (!selectedBreed) {
        container.innerHTML = '';
        return;
    }

    const data = breedSpecificReferenceRanges;
    let html = '';

    // 1. Add Deviant Alert if applicable
    if (data.is_deviant) {
        html += `<div class="deviant-alert">⚠️ CLINICAL ALERT: ${selectedBreed} is a known "deviant" breed. Standard multi-breed formulas (Cornell) often result in mis-staging.</div>`;
    }

    // 2. Build the Normals Table
    html += `<table class="breed-table">
                <thead>
                    <tr>
                        <th>Metric</th>
                        <th>Reference Range (Upper Limit)</th>
                    </tr>
                </thead>
                <tbody>`;

    // Mapping key names to user-friendly labels
    const labels = {
        'lvidd_mm': 'LVIDd (mm)',
        'lvids_mm': 'LVIDs (mm)',
        'lvidd_cm': 'LVIDd (cm)',
        'lvids_cm': 'LVIDs (cm)',
        'ivsd_mm': 'IVSd (mm)',
        'ivsd_cm': 'IVSd (cm)',
        'lvfwd_mm': 'LVFWd (mm)',
        'lvfwd_cm': 'LVFWd (cm)',
        'la_ao': 'LA:Ao Ratio',
        'la_ao_sax': 'LA:Ao (Short Axis)',
        'lvidd_n': 'LVIDdN (Normalized)',
        'edvi_smod': 'EDVI (SMOD ml/m²)',
        'esvi_smod': 'ESVI (SMOD ml/m²)',
        'ef_smod': 'Ejection Fraction (%)',
        'ao_vmax': 'Aortic Velocity (m/s)',
        'vhs_limit': 'VHS Upper Limit',
        'nt_probnp': 'NT-proBNP (pmol/l)'
    };

    for (let key in labels) {
        if (data[key]) {
            let val = data[key].max |

| data[key].median |
| data[key].limit_upper |
| data[key].mean |
| data[key];
            // If the data is an object with a range string
            if (data[key].range) val = `${data[key].range} (Median: ${data[key].median})`;
            
            html += `<tr><td>${labels[key]}</td><td><strong>${val}</strong></td></tr>`;
        }
    }

    html += `</tbody></table>`;

    // 3. Add Clinical Note and Reference
    if (data.clinical_note) {
        html += `<div class="clinical-note"><strong>Clinical Note:</strong> ${data.clinical_note}</div>`;
    }

    if (data.pmid) {
        html += `<a href="https://pubmed.ncbi.nlm.nih.gov/${data.pmid}" target="_blank" class="pubmed-link">🔗 View Primary Research (PMID: ${data.pmid})</a>`;
    }

    container.innerHTML = html;
}