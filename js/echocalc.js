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

    if (!breedName) {
        container.innerHTML = '';
        return;
    }

    const data = breedSpecificReferenceRanges[breedName];
    
    // Define the tags we want to skip
    const excludedTags = ['is_deviant', 'pmid', 'clinical_note', 'reference'];

    let html = '';

    // 1. Handle Clinical Alert for Deviant Breeds
    if (data.is_deviant) {
        html += `<div style="background-color: #fff3cd; border-left: 5px solid #ffc107; padding: 15px; margin-bottom: 15px; color: #856404; font-weight: bold; border-radius: 4px;">
                    ⚠️ CLINICAL ALERT: ${breedName} is a "deviant" breed.
                 </div>`;
    }

    html += `<table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 0.9rem; border: 1px solid #dee2e6;">
                <thead style="background-color: #f8f9fa;">
                    <tr>
                        <th style="padding: 10px; border: 1px solid #dee2e6; text-align: left;">Metric</th>
                        <th style="padding: 10px; border: 1px solid #dee2e6; text-align: left;">Reference Range / Limit</th>
                    </tr>
                </thead>
                <tbody>`;

    // 2. Loop through every key in the data object dynamically
    Object.keys(data).forEach(key => {
        // Skip the metadata tags
        if (!excludedTags.includes(key)) {
            const val = data[key];
            
            // Format the Label (e.g., "lvidd_mm" -> "LVIDD MM")
            let label = key.replace(/_/g, ' ').toUpperCase();

            // Format the Value string (Median/Min/Max)
            let rangeString = '';
            if (typeof val === 'object') {
                if (val.min !== undefined && val.max !== undefined) {
                    rangeString = `${val.min} – ${val.max}`;
                } else if (val.max !== undefined) {
                    rangeString = `Up to ${val.max}`;
                } else if (val.median !== undefined) {
                    rangeString = `Median: ${val.median}`;
                } else {
                    rangeString = JSON.stringify(val); // Fallback
                }
            } else {
                rangeString = val; // If it's just a number/string
            }

            html += `<tr>
                        <td style="padding: 10px; border: 1px solid #dee2e6; font-weight: 500;">${label}</td>
                        <td style="padding: 10px; border: 1px solid #dee2e6;">${rangeString}</td>
                     </tr>`;
        }
    });

    html += `</tbody></table>`;

    // 3. Add Clinical Note and PubMed link at the bottom
    if (data.clinical_note) {
        html += `<div style="background-color: #f1f5f9; padding: 12px; border-radius: 4px; font-style: italic; margin-top: 15px; border-left: 4px solid #64748b;">
                    <strong>Clinical Note:</strong> ${data.clinical_note}
                 </div>`;
    }

    if (data.pmid) {
        html += `<p style="margin-top:10px;"><a href="https://pubmed.ncbi.nlm.nih.gov/${data.pmid}" target="_blank" style="color: #2563eb; font-size: 0.85rem; text-decoration: underline;">🔗 View Research (PMID: ${data.pmid})</a></p>`;
    }
    
    html += `<div style="background-color: #f9f9f9; padding: 12px; border-radius: 4px;  margin-top: 10px; border-left: 4px solid #999999;">Note: In practice, breed normals serve as starting values; each animal’s weight and context must be considered. Clinicians should integrate multiple indices (e.g. body-size normalized LVID, EF, LA/Ao, etc.) when assessing an individual
</div>`;

    container.innerHTML = html;
}