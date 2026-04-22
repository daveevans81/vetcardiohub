function showInstructions() {
    const isiOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
    if (isiOS) {
        alert("To save: Tap the 'Share' icon (square with arrow) at the bottom of Safari and select 'Add to Home Screen'.");
    } else {
        alert("To save: Tap the three dots (⋮) and select 'Install app' or 'Add to Home Screen'.");
    }
};

// This function runs on page load to fill the dropdown
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

function updateBreedTable() {
    const selector = document.getElementById('breed-selector');
    const container = document.getElementById('breed-data-container');
    const breedName = selector.value;

    if (!breedName) {
        container.innerHTML = '';
        return;
    }

    const data = breedSpecificReferenceRanges[breedName];
    
    // Access the values entered in your Alpine calculator
    // We use document.querySelector to grab the current text or value
    const pLVIDd = document.querySelector('[x-model="lvidd"]')?.value |

| '—';
    const pLVIDs = document.querySelector('[x-model="lvids"]')?.value |

| '—';
    const pLA = document.querySelector('[x-model="la"]')?.value |

| '—';
    const pAo = document.querySelector('[x-model="ao"]')?.value |

| '—';
    
    // For calculated values, we can grab the text inside your result spans
    // Ensure these selectors match your HTML classes/IDs
    const pLVIDdN = document.querySelector('[x-text="lviddn"]')?.innerText |

| '—';
    const pLAAo = (pLA && pAo && pAo > 0)? (pLA / pAo).toFixed(2) : '—';

    let html = '';

    if (data.is_deviant) {
        html += `<div style="background-color: #fff3cd; border-left: 5px solid #ffc107; padding: 15px; margin-bottom: 15px; color: #856404; font-weight: bold;">
                    ⚠️ CLINICAL ALERT: ${breedName} is a "deviant" breed. Standard multi-breed formulas (Cornell) may lead to misdiagnosis.
                 </div>`;
    }

    html += `<table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 0.9rem; border: 1px solid #dee2e6;">
                <thead style="background-color: #f8f9fa;">
                    <tr>
                        <th style="padding: 10px; border: 1px solid #dee2e6; text-align: left;">Metric</th>
                        <th style="padding: 10px; border: 1px solid #dee2e6; text-align: left;">Patient</th>
                        <th style="padding: 10px; border: 1px solid #dee2e6; text-align: left;">Breed Normal (Upper RI)</th>
                    </tr>
                </thead>
                <tbody>`;

    // Mapping key results for comparison
    const comparisonMetrics =;

    comparisonMetrics.forEach(m => {
        if (data[m.key]) {
            // Fix: using double pipe |

| for fallback
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
        html += `<div style="background-color: #e9ecef; padding: 12px; border-radius: 4px; font-style: italic; margin-top: 10px;">
                    <strong>Note:</strong> ${data.clinical_note}
                 </div>`;
    }

    if (data.pmid) {
        html += `<p style="margin-top:10px;"><a href="https://pubmed.ncbi.nlm.nih.gov/${data.pmid}" target="_blank" style="color: #0056b3; font-size: 0.85rem;">🔗 View Research (PMID: ${data.pmid})</a></p>`;
    }

    container.innerHTML = html;
}