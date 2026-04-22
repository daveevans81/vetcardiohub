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

function updateBreedTable() {
    const selector = document.getElementById('breed-selector');
    const container = document.getElementById('breed-data-container');
    const breedName = selector.value;

    if (!breedName) {
        container.innerHTML = '';
        return;
    }

    const data = breedSpecificReferenceRanges[breedName];
    
    // Access the current patient values from your Alpine.js inputs
    const pLVIDd = document.querySelector('[x-model="lvidd"]')?.value |

| '—';
    const pLVIDs = document.querySelector('[x-model="lvids"]')?.value |

| '—';
    const pLVIDdN = document.querySelector('[x-text="lviddn"]')?.innerText |

| '—';
    const pLAAo = document.querySelector('[x-text="laAo"]')?.innerText |

| '—';
    const pIVS = document.querySelector('[x-model="ivsd"]')?.value |

| '—';

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
                        <th style="padding: 10px; border: 1px solid #dee2e6; text-align: left;">Patient</th>
                        <th style="padding: 10px; border: 1px solid #dee2e6; text-align: left;">Breed Normal (Limit)</th>
                    </tr>
                </thead>
                <tbody>`;

    // Mapping your data keys to labels and patient values
    const metricsToCompare =;

    metricsToCompare.forEach(m => {
        if (data[m.key]) {
            let breedLimit = data[m.key].max |

| data[m.key].median |
| data[m.key].mean |
| '—';
            html += `<tr>
                        <td style="padding: 10px; border: 1px solid #dee2e6;">${m.label}</td>
                        <td style="padding: 10px; border: 1px solid #dee2e6;">${m.patient}</td>
                        <td style="padding: 10px; border: 1px solid #dee2e6;"><strong>${breedLimit}</strong></td>
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