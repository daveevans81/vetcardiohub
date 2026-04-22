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
    const breed = selector.value;

    if (!breed) {
        container.innerHTML = '';
        return;
    }

    const data = breedSpecificReferenceRanges[breed];
    // This part accesses your Alpine.js data to get entered values
    const patientLVIDd = document.querySelector('[x-model="lvidd"]')?.value |

| '—';
    const patientLVIDs = document.querySelector('[x-model="lvids"]')?.value |

| '—';
    const patientLA = document.querySelector('[x-model="la"]')?.value |

| '—';
    const patientAo = document.querySelector('[x-model="ao"]')?.value |

| '—';

    let html = '';

    if (data.is_deviant) {
        html += `<div class="deviant-alert">⚠️ CLINICAL ALERT: ${breed} is a "deviant" breed. Standard PIs (Cornell) may lead to misdiagnosis.</div>`;
    }

    html += `<table class="breed-table">
                <thead>
                    <tr>
                        <th>Metric</th>
                        <th>Patient Value</th>
                        <th>Breed Normal (Upper RI)</th>
                    </tr>
                </thead>
                <tbody>`;

    const metrics =;

    metrics.forEach(m => {
        if (data[m.breedKey]) {
            const breedVal = data[m.breedKey].max |

| data[m.breedKey].median |
| data[m.breedKey];
            const displayVal = typeof breedVal === 'object'? breedVal.max : breedVal;
            html += `<tr>
                        <td>${m.label}</td>
                        <td>${m.patient}</td>
                        <td><strong>${displayVal}</strong></td>
                     </tr>`;
        }
    });

    html += `</tbody></table>`;

    if (data.clinical_note) {
        html += `<div class="clinical-note"><strong>Clinical Takeaway:</strong> ${data.clinical_note}</div>`;
    }

    if (data.pmid) {
        html += `<a href="https://pubmed.ncbi.nlm.nih.gov/${data.pmid}" target="_blank" class="pubmed-link">🔗 View Research (PMID: ${data.pmid})</a>`;
    }

    container.innerHTML = html;
}