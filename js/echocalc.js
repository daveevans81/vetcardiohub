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
    let html = '';

    // Deviant Alert
    if (breedData.is_deviant) {
        html += `<div style="background-color: #fff3cd; border-left: 5px solid #ffc107; padding: 15px; margin-bottom: 15px; color: #856404; font-weight: bold;">
                    ⚠️ CLINICAL ALERT: ${breedName} is a deviant breed.
                 </div>`;
    }

    // Function to build a table from a metrics object
    const buildTable = (metrics) => {
        let tableHtml = `<table style="width: 100%; border-collapse: collapse; margin-bottom: 15px; font-size: 0.85rem; border: 1px solid #dee2e6;">
            <thead style="background-color: #f1f5f9;">
                <tr><th style="padding: 8px; border: 1px solid #dee2e6; text-align: left;">Metric</th>
                <th style="padding: 8px; border: 1px solid #dee2e6; text-align: left;">Range/Limit</th></tr>
            </thead><tbody>`;
        
        Object.keys(metrics).forEach(key => {
            const val = metrics[key];
            let label = key.replace(/_/g, ' ').toUpperCase();
            let range = (typeof val === 'object') ? 
                (val.min !== undefined ? `${val.min}-${val.max}` : `Up to ${val.max}`) : val;
            
            tableHtml += `<tr><td style="padding: 8px; border: 1px solid #dee2e6; font-weight: 500;">${label}</td>
                          <td style="padding: 8px; border: 1px solid #dee2e6;">${range}</td></tr>`;
        });
        return tableHtml + `</tbody></table>`;
    };

    // LOGIC: Check if multiple sources exist, otherwise fallback to single object mode
    if (breedData.sources && Array.isArray(breedData.sources)) {
        breedData.sources.forEach((source, index) => {
            html += `<div class="source-section" style="margin-top: 20px; border-top: 2px solid #e2e8f0; padding-top: 10px;">
                        <h4 style="margin-bottom: 5px; color: #1e40af;">Source ${index + 1}: ${source.reference}</h4>`;
            
            html += buildTable(source.metrics);

            if (source.clinical_note) {
                html += `<p style="font-size: 0.8rem; font-style: italic; color: #475569;">Note: ${source.clinical_note}</p>`;
            }
            if (source.pmid) {
                html += `<a href="https://pubmed.ncbi.nlm.nih.gov/${source.pmid}" target="_blank" style="font-size: 0.75rem; color: #2563eb;">🔗 PMID: ${source.pmid}</a>`;
            }
            html += `</div>`;
        });
    } else {
        // Fallback for your existing single-source breeds
        html += buildTable(breedData); 
    }


    
    html += `<div style="background-color: #f9f9f9; padding: 12px; border-radius: 4px;  margin-top: 10px; border-left: 4px solid #999999;"><strong>Caveat:</strong> In practice, breed normals serve as starting values; each animal’s weight and context must be considered. Clinicians should integrate multiple indices (e.g. body-size normalized LVID, EF, LA/Ao, etc.) when assessing an individual
</div>`;

    container.innerHTML = html;
}