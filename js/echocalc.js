// Function to show instructions (existing)
function showInstructions() {
    const isiOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
    if (isiOS) {
        alert("To save: Tap the 'Share' icon (square with arrow) at the bottom of Safari and select 'Add to Home Screen'.");
    } else {
        alert("To save: Tap the three dots (⋮) and select 'Install app' or 'Add to Home Screen'.");
    }
}

// 1. Populate the dropdown on load
document.addEventListener('DOMContentLoaded', function() {
    const selector = document.getElementById('breed-selector');
    if (selector && typeof breedSpecificReferenceRanges!== 'undefined') {
        const breedNames = Object.keys(breedSpecificReferenceRanges).sort();
        breedNames.forEach(breed => {
            let option = document.createElement('option');
            option.value = breed;
            option.text = breed;
            selector.appendChild(option);
        });
    }
});

// 2. Build the comparison table
function updateBreedTable() {
    const selector = document.getElementById('breed-selector');
    const container = document.getElementById('breed-data-container');
    const breedName = selector.value;

    if (!breedName) {
        container.innerHTML = '';
        return;
    }

    const data = breedSpecificReferenceRanges[breedName];
    
    // Safety check: Get data from the nearest Alpine component
    const alpineEl = document.querySelector('[x-data]');
    const patientData = alpineEl? alpineEl.__x.$data : {};

    let html = '';

    if (data.is_deviant) {
        html += `<div style="background-color: #fff3cd; border-left: 5px solid #ffc107; padding: 15px; margin-bottom: 15px; color: #856404; font-weight: bold; border-radius: 4px;">
                    ⚠️ CLINICAL ALERT: ${breedName} is a "deviant" breed. Standard multi-breed formulas (Cornell) often result in mis-staging.
                 </div>`;
    }

    html += `<table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 0.9rem; border: 1px solid #dee2e6;">
                <thead style="background-color: #f8f9fa;">
                    <tr>
                        <th style="padding: 10px; border: 1px solid #dee2e6; text-align: left;">Metric</th>
                        <th style="padding: 10px; border: 10px solid #dee2e6; text-align: left;">Patient</th>
                        <th style="padding: 10px; border: 1px solid #dee2e6; text-align: left;">Breed Normal</th>
                    </tr>
                </thead>
                <tbody>`;

    // Map your Alpine variables to the breed data keys
    const metricsToCompare =;

    metricsToCompare.forEach(m => {
        if (data[m.key]) {
            let breedVal = data[m.key].max |

| data[m.key].median |
| data[m.key];
            html += `<tr>
                        <td style="padding: 10px; border: 1px solid #dee2e6;">${m.label}</td>
                        <td style="padding: 10px; border: 1px solid #dee2e6;">${m.patient}</td>
                        <td style="padding: 10px; border: 1px solid #dee2e6;"><strong>${breedVal}</strong></td>
                     </tr>`;
        }
    });

    html += `</tbody></table>`;

    if (data.clinical_note) {
        html += `<div style="background-color: #f1f5f9; padding: 12px; border-radius: 4px; font-style: italic; margin-top: 10px; border-left: 4px solid #64748b;">
                    <strong>Note:</strong> ${data.clinical_note}
                 </div>`;
    }

    if (data.pmid) {
        html += `<p style="margin-top:10px;"><a href="https://pubmed.ncbi.nlm.nih.gov/${data.pmid}" target="_blank" style="color: #2563eb; font-size: 0.85rem; text-decoration: underline;">🔗 View Research (PMID: ${data.pmid})</a></p>`;
    }

    container.innerHTML = html;
}