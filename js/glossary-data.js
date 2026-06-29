const ACVIM_PATHWAYS = {

    MMVD: {
        treatmentBands: [
        {
            label: "Pimobendan Helpful",
            startStage: "B2"
        },
        {
            label: "Diuretics Helpful",
            startStage: "C"
        }
        ],
        stages: [
            {
                id: "Normal",
                label: "Normal",
                subtitle: ""
            },
            {
                id: "B1",
                label: "B1",
                subtitle: "Heart murmur"
            },
            {
                id: "B2",
                label: "B2",
                subtitle: "Heart murmur + remodelling"
            },
            {
                id: "C",
                label: "C",
                subtitle: "CHF present"
            },
            {
                id: "D",
                label: "D",
                subtitle: "Refractory CHF"
            }
        ]
    },

    HCM: {
         treatmentBands: [
        {
            label: "Clopidogrel Helpful",
            startStage: "B2"
        },
        {
            label: "Diuretics Helpful",
            startStage: "C"
        }
        ],
        stages: [
            {
                id: "Normal",
                label: "Normal"
            },
            {
                id: "B1",
                label: "B1",
                subtitle: "Normal LA"
            },
            {
                id: "B2",
                label: "B2",
                subtitle: "LA enlargement"
            },
            {
                id: "C",
                label: "C",
                subtitle: "CHF / ATE"
            },
            {
                id: "D",
                label: "D",
                subtitle: "Refractory disease"
            }
        ]
    },

    DCM: {
            treatmentBands: [
                    {
            label: "Anti-arrhythmics may be Helpful",
            startStage: "B1"
        },
        {
            label: "Pimobendan Helpful",
            startStage: "B2"
        },
        {
            label: "Diuretics Helpful",
            startStage: "C"
        }
        ],
        stages: [
            {
                id: "Normal",
                label: "Normal"
            },
            {
                id: "B1",
                label: "B1",
                subtitle: "Arrhythmia only"
            },
            {
                id: "B2",
                label: "B2",
                subtitle: "Structural changes"
            },
            {
                id: "C",
                label: "C",
                subtitle: "CHF"
            },
            {
                id: "D",
                label: "D",
                subtitle: "Refractory CHF"
            }
        ]
    }
};

const VET_GLOSSARY_DB = {
    
    // ==========================================
    // GROUP: DISEASES & CONDITIONS
    // ==========================================
    hcm: {
        title: "Hypertrophic Cardiomyopathy (HCM)",
        group: "Diseases",
        category: "Feline Cardiology",
        audience: ["vet", "owner"],
        difficulty: 2,
        textOwner: "The most common heart disease in cats. The heart muscle becomes abnormally thick and stiff, making it harder for the heart to relax and fill with blood properly.",
        textClinical: "A primary myocardial disease characterized by concentric hypertrophy of the left ventricle in the absence of other systemic causes (e.g., hyperthyroidism, hypertension). It results in severe diastolic dysfunction and left atrial enlargement.",
        pmid: "32243654", // ACVIM Feline Cardiomyopathy Guidelines
        article: "/blog-posts/post10.html"
    },
    murmur: {
        title: "Heart Murmur",
        group: "Clinical Concepts",
        category: "Physical Exam",
        audience: ["vet", "owner"],
        difficulty: 1,
        textOwner: "An extra 'whooshing' sound your vet hears through the stethoscope. It happens when blood flows in a turbulent or swishing way through the heart, often due to a leaky valve.",
        textClinical: "Audible turbulent blood flow detected on auscultation. Pathologic murmurs are typically caused by valvular regurgitation, stenotic lesions, or congenital shunts.",
    },
    murmurGrade: {
        title: "Murmur Grading (1 to 6)",
        group: "Clinical Concepts",
        category: "Physical Exam",
        audience: ["vet", "owner"],
        difficulty: 2,
        textOwner: "A scale from 1 to 6 that vets use to describe how loud a murmur is. Grade 1 is very quiet, while Grade 6 is so loud you can sometimes feel it buzzing against the chest.",
        textClinical: "The Levine grading system for murmur intensity, modified by veterinary cardiologists. Ranges from I/VI (barely audible in a quiet room) to VI/VI (audible with the stethoscope lifted off the chest wall, accompanied by a precordial thrill).",
        pmid: "30017853"
    },
    
    mmvd: {
        title: "Myxomatous Mitral Valve Disease (MMVD)",
        category: "Canine Cardiology",
        audience: ["vet", "owner"], // Shows up for both
        difficulty: 1, // Useful for the vet quiz
        group: "diseases",
        // The Pet Owner Translation
        textOwner: "This is the most common heart disease in dogs, especially small breeds. The valve on the left side of the heart becomes thickened and leaky over time, causing a heart murmur.",
        
        // The Clinical GP Translation
        textClinical: "A progressive, degenerative valvular disease characterized by myxomatous degeneration of the mitral valve apparatus. It is the leading cause of left-sided congestive heart failure in small breed dogs.",
        article: "/blog-posts/post6.html",
        pmid: "30974015" // Vets get the paper, owners ignore it
    },
// ==========================================\n    
    // GROUP: MONITORING & AT-HOME CARE - TRACKER GLOSSARY
    // ==========================================\n    
    
    trueTime: {
        title: "True Time vs Separate Out SRR readings",
        group: "Tracker",
        category: "Home Care",
        audience: ["vet", "owner"],
        difficulty: 1,
        textOwner: "Spreads the time axis out so it reflects real months going by, as opposed to showing each SRR reading individually next to each other. Displays on the chart an average of all readings if multiple readings taken on same day. Best to select 'True Time' if you want a real life overview of the breathing data as the months go by, and deselect it if you want to see each reading separately."
    },
    
    
    rrr_guidelines: {
        title: "Resting Respiratory Rate (RRR) Guidelines",
        group: "Monitoring",
        category: "Home Care",
        audience: ["vet", "owner"],
        difficulty: 1,
        textOwner: "Counting your pet's breathing rate while they are deeply asleep or fully resting is one of the most reliable ways to monitor for heart failure. One breath equals one complete in-and-out movement of the chest. A normal sleeping rate for dogs and cats is consistently under 30 breaths per minute.",
        textClinical: "Resting Respiratory Rate (RRR) or Sleeping Respiratory Rate (SRR) is a highly sensitive, non-invasive indicator of left-sided congestive heart failure (CHF). An SRR consistently > 30 breaths/minute in a patient with known at-risk cardiac disease strongly warrants investigation for pulmonary venous congestion or edema.",
        method: "Ensure the patient is in a thermally neutral environment and completely at rest (ideally deep sleep). Observe the chest wall from a distance to avoid waking them. Count the number of full respiratory cycles (inspiration + expiration = 1 breath) over 30 seconds and multiply by 2."
    },

    equivocal_rrr: {
        title: "Equivocal (Borderline) Breathing Rates",
        group: "Monitoring",
        category: "Home Care",
        audience: ["vet", "owner"],
        difficulty: 2,
        textOwner: "Sometimes a pet may breathe slightly faster (30-40 breaths per minute) because they are dreaming, too warm, or just settling down. This is considered 'equivocal' or borderline. There is no need to panic—simply wait for them to settle into a deeper sleep and count again in 1 to 2 hours. You can tell the difference because if its a concern the breathing rate tends to stay persistently high or climb higher, and tends to be deeper and more laboured. If you get more than one consecutive readinge in this range consider seeking a veterinary opinion.",
        textClinical: "An equivocal RRR (typically 30-40 bpm) represents a diagnostic grey zone. Elevations in this range may be physiological artifacts caused by REM sleep, thermoregulation, anxiety, or primary respiratory disease, rather than pathological cardiogenic pulmonary edema. Standard clinical protocol requires reassessing the SRR after 2-4 hours of acclimatization to establish a true baseline before initiating or adjusting diuretic therapy."
    },
    
    cough_types: {
        title: "Understanding Your Dog's Cough",
        group: "Symptoms",
        category: "Monitoring",
        audience: ["vet", "owner"],
        difficulty: 1,
        textOwner: "Dogs cough for many different reasons, and distinguishing the exact sound is incredibly helpful for your vet. In dogs with heart murmurs, a cough is often caused by a massively enlarged heart physically pressing upwards and squashing the main windpipe (airway compression). Less commonly, it can be a sign of fluid building up in the lungs (heart failure). However, many older dogs have concurrent airway diseases like chronic bronchitis or a collapsing trachea. Because the treatments for 'heart coughs' and 'lung/airway coughs' are completely different, capturing a video of the cough on your phone and noting the specific sound, triggers, and frequency is the best way to help your cardiology team.",
        article: "/blog-posts/post4.html"
    },

    "chesty/productive": {
        title: "Chesty / Productive Cough",
        group: "Symptoms",
        category: "Monitoring",
        audience: ["vet", "owner"],
        difficulty: 2,
        textOwner: "A chesty or productive cough sounds 'wet', bubbly, or gurgling, as if the dog has phlegm stuck in their chest. You may hear them cough something up into the back of their throat and immediately swallow it. In a dog with heart disease, a newly developing wet cough—especially if accompanied by an increased resting breathing rate (>30 bpm)—is a major red flag for pulmonary oedema (fluid in the lungs). It can also indicate pneumonia or a severe respiratory infection. This type of cough should always prompt a veterinary check.",
        article: "/blog-posts/post4.html"
    },

    "goose honking": {
        title: "Goose Honking Cough",
        group: "Symptoms",
        category: "Monitoring",
        audience: ["vet", "owner"],
        difficulty: 2,
        textOwner: "This cough sounds exactly like a goose honking. It is the classic hallmark of 'Tracheal Collapse', a condition where the cartilage rings of the windpipe weaken and flatten. It is extremely common in small breeds (like Yorkies, Pomeranians, and Chihuahuas). It is typically triggered by excitement, pulling on a collar, drinking water, or picking the dog up under the chest. While it sounds alarming, a goose honk is an airway mechanical issue, not a sign of heart failure—though older small dogs frequently suffer from both conditions at the same time.",
        article: "/blog-posts/post4.html"
    },

    "reverse sneezing": {
        title: "Reverse Sneezing",
        group: "Symptoms",
        category: "Monitoring",
        audience: ["vet", "owner"],
        difficulty: 1,
        textOwner: "Despite how scary it looks, reverse sneezing is entirely harmless and is not actually a cough. The dog will stand still, extend their neck, and take rapid, incredibly forceful inhalations through their nose, making a loud snorting, honking, or gagging sound. It is caused by a mild spasm or irritation of the soft palate at the back of the throat (from dust, allergies, or excitement). It has absolutely no relation to heart disease or lung failure. Episodes usually stop on their own, but gently stroking the dog's throat or briefly covering their nostrils to make them swallow can help clear the spasm.",
        article: "/blog-posts/post4.html"
    },

    "expiratory reflex (gag)": {
        title: "Terminal Retch / Gagging",
        group: "Symptoms",
        category: "Monitoring",
        audience: ["vet", "owner"],
        difficulty: 2,
        textOwner: "This typically starts as a harsh, dry cough that ends with a sudden, forceful gagging or retching sound (the 'terminal retch'). The dog may even bring up a small spot of white foam or saliva. Owners frequently mistake this for vomiting or choking on something stuck in their throat. In reality, it is a respiratory reflex designed to clear mucus from the vocal cords. It is very common in dogs with chronic airway inflammation (bronchitis) or when a massively enlarged heart is irritating the main airways.",
        article: "/blog-posts/post4.html"
    },

    "dry/harsh": {
        title: "Dry / Harsh Cough",
        group: "Symptoms",
        category: "Monitoring",
        audience: ["vet", "owner"],
        difficulty: 2,
        textOwner: "A dry, harsh, or hacking cough sounds sharp and has no 'wet' or fluid-like noise behind it. It often sounds like the dog is trying to clear their throat. In cardiac patients, this is very frequently caused by the left atrium of the heart expanding like a balloon and physically pushing up against the main bronchi (the tubes leading into the lungs), irritating the nerve endings there. It is usually worse at night, first thing in the morning, or immediately after periods of exercise.",
        article: "/blog-posts/post4.html"
    },
    
    // ==========================================
    // GROUP: MURMUR STAGING
    // ==========================================  
    
    murmurGrade_0: {
    title: "Murmur Grade 0 (No Murmur)",
    group: "Cardiology",
    category: "Auscultation",
    audience: ["vet", "owner"],
    difficulty: 3,
    textOwner: "No murmur was heard during this examination. This is a normal finding and means no abnormal turbulent blood flow was detected through the heart valves at this visit.",
    textClinical: "No cardiac murmur auscultated. Normal heart sounds. Does not exclude subclinical structural disease — echocardiography required for definitive assessment in at-risk breeds.",
},
murmurGrade_1: {
    title: "Murmur Grade I/VI",
    group: "Cardiology",
    category: "Auscultation",
    audience: ["vet", "owner"],
    difficulty: 3,
    textOwner: "A very faint murmur was detected. It is so quiet it can only be heard in a very still room after listening carefully for a short time. Grade I murmurs are the softest possible and are often monitored rather than treated immediately.",
    textClinical: "Barely audible murmur; heard only after careful auscultation in a quiet environment. Localised to a small area. No thrill. Significance depends on signalment, breed risk, and echocardiographic findings.",
},
murmurGrade_2: {
    title: "Murmur Grade II/VI",
    group: "Cardiology",
    category: "Auscultation",
    audience: ["vet", "owner"],
    difficulty: 3,
    textOwner: "A soft but easily heard murmur was found. Grade II murmurs are quiet but detectable immediately when a vet listens to the heart. Your vet will likely want to recheck this periodically. Large breed dogs are more likely to have concerning disease with a soft murmur (eg DCM).",
    textClinical: "Soft murmur, immediately audible. No precordial thrill. Often represents early mitral valve disease in small-breed dogs. Echocardiography recommended to characterise and stage. Large breed dogs are more likely to have concerning disease with a soft murmur (eg DCM).",
},
murmurGrade_3: {
    title: "Murmur Grade III/VI",
    group: "Cardiology",
    category: "Auscultation",
    audience: ["vet", "owner"],
    difficulty: 3,
    textOwner: "A moderate murmur was heard - typically the same level of sound as the heart sounds. This is louder than a faint murmur and is a firm finding. Your vet will use additional tests - usually an ultrasound of the heart - to understand what is causing it and how significant it is.",
    textClinical: "Moderate intensity murmur - typically the same level of sound as the heart sounds. No precordial thrill. The threshold at which echocardiographic assessment is strongly indicated to evaluate chamber dimensions and valve morphology. Correlates with haemodynamically significant regurgitation in many cases.",
},
murmurGrade_4: {
    title: "Murmur Grade IV/VI",
    group: "Cardiology",
    category: "Auscultation",
    audience: ["vet", "owner"],
    difficulty: 3,
    textOwner: "A loud murmur was detected during the examination - typically described as louder than the heart sounds or obscuring them. Echocardiography and monitoring are important at this stage.",
    textClinical: "Loud murmur - typically described as louder than the heart sounds or obscuring them. Usually without a precordial thrill. If mitral valve disease suspected, likely consistent with significant regurgitant fraction. Echocardiographic evaluation and ACVIM staging are indicated. Resting SRR monitoring is clinically valuable.",
},
murmurGrade_5: {
    title: "Murmur Grade V/VI",
    group: "Cardiology",
    category: "Auscultation",
    audience: ["vet", "owner"],
    difficulty: 3,
textOwner: "A very loud murmur was found — loud enough that the vibration can be felt by placing a hand gently on the chest. This grade indicates significant heart valve disease and close monitoring of symptoms and breathing rate is important.",
    textClinical: "Very loud murmur with a palpable precordial thrill. Audible with stethoscope lightly touching chest. Suggests severe regurgitation. Clinical staging, echocardiography, and symptomatic monitoring are all indicated.",
},
murmurGrade_6: {
    title: "Murmur Grade VI/VI",
    group: "Cardiology",
    category: "Auscultation",
    audience: ["vet", "owner"],
    difficulty: 3,
    textOwner: "The loudest possible murmur was recorded. At Grade VI, the murmur is so powerful it can be detected even when the stethoscope is held slightly off the chest. This indicates severe turbulent blood flow and requires close veterinary management.",
    textClinical: "Maximum intensity murmur audible without direct chest contact. Precordial thrill always present. Indicates severe valvular insufficiency. Usually associated with significant haemodynamic burden — full clinical staging, echocardiography, and optimised medical management are essential. But some very loud musical murmurs can occur without severe regurgitant fractions due to resonance effects.",
},
    
    // ==========================================
    // GROUP: ACVIM MMVD STAGING
    // ==========================================
    acvim_MMVD_A: {
        title: "ACVIM Stage A (MMVD)",
        group: "Guidelines",
        category: "Staging",
        audience: ["vet", "owner"],
        difficulty: 1,
        textOwner: "Dogs in Stage A are completely healthy right now, but they are a breed (like a Cavalier King Charles Spaniel) that is at high risk of developing heart disease in the future.",
        textClinical: "Patients at high risk for developing MMVD but with no current identifiable structural disorder of the heart (e.g., normal auscultation, normal echocardiogram).",
        pmid: "30974015",
        article: "/blog-posts/post7.html"
    },
    acvim_MMVD_B1: {
        title: "ACVIM Stage B1 (MMVD)",
        group: "Guidelines",
        category: "Staging",
        audience: ["vet", "owner"],
        difficulty: 2,
        textOwner: "Your dog has a heart murmur and a leaky valve, but the heart hasn't stretched out yet. No medications are needed at this stage, just monitoring.",
        textClinical: "Asymptomatic patients with a structural abnormality (murmur of mitral regurgitation) but no radiographic or echocardiographic evidence of cardiac remodeling that meets the criteria for initiating therapy.",
        pmid: "30974015",
        article: "/blog-posts/post7.html"
    },
    acvim_MMVD_B2: {
        title: "ACVIM Stage B2 (MMVD)",
        group: "Guidelines",
        category: "Staging",
        audience: ["vet", "owner"],
        difficulty: 2,
        textOwner: "The leaky valve has caused the heart to stretch and enlarge significantly, though your dog still feels fine. Starting medication (Pimobendan) now delays the onset of heart failure.",
        textClinical: "Asymptomatic patients with hemodynamically significant mitral regurgitation causing left-sided cardiomegaly (LA:Ao ≥ 1.6, LVIDdn ≥ 1.7) that meet the EPIC trial criteria for initiating pimobendan.",
        pmid: "30974015",
        article: "/blog-posts/post7.html"
    },
    acvim_MMVD_C: {
        title: "ACVIM Stage C (MMVD)",
        group: "Guidelines",
        category: "Staging",
        audience: ["vet", "owner"],
        difficulty: 3,
        textOwner: "The heart can no longer compensate for the leaky valve, causing fluid to build up in the lungs (heart failure). Dogs need multiple daily medications (like diuretics) to breathe comfortably.",
        textClinical: "Patients with past or current clinical signs of congestive heart failure (CHF) secondary to MMVD. Requires standard quadruple therapy (Furosemide, Pimobendan, ACEi, Spironolactone).",
        pmid: "30974015",
        article: "/blog-posts/post7.html"
    },
    acvim_MMVD_D: {
        title: "ACVIM Stage D (MMVD)",
        group: "Guidelines",
        category: "Staging",
        audience: ["vet", "owner"],
        difficulty: 3,
        textOwner: "Advanced or 'end-stage' heart failure. The standard medications are no longer keeping the fluid out of the lungs, requiring specialized drug adjustments or hospital visits.",
        textClinical: "Refractory congestive heart failure. Patients require advanced diuretic strategies (Torsemide, sequential nephron blockade), afterload reduction, and frequent monitoring to manage clinical signs.",
        pmid: "30974015",
        article: "/blog-posts/post7.html"
    },
    
    
    // ==========================================
    // GROUP: ACVIM HCM STAGING
    // ==========================================
    
    
    acvim_HCM_A: {
        title: "Feline CM - Stage A",
        difficulty: 1,
        group: "Guidelines",
        category: "Staging",
        audience: ["vet", "owner"],
        description: "Cats with a known genetic predisposition to hypertrophic cardiomyopathy (e.g., Ragdoll, Maine Coon, Sphynx, Persian) but no current echocardiographic evidence of structural heart disease. Or possibly a sibling or parent with the disease. As genetic screening advances this group is likely to expand but at the moment it's not very clinically relevant.",
        textOwner: "Your cat belongs to a breed—such as a Ragdoll or Maine Coon—that is known to carry a higher risk for heart muscle disease. Currently, their heart looks completely normal on an ultrasound scan, but we recommend regular screening as they grow."
    },
    acvim_HCM_B1: {
        title: "Feline CM - Stage B1",
        difficulty: 1,
        group: "Guidelines",
        category: "Staging",
        audience: ["vet", "owner"],
        description: "Subclinical cardiomyopathy with normal or mildly enlarged left atrium. Patients have a low short-term risk for developing congestive heart failure (CHF) or arterial thromboembolism (ATE).",
        textOwner: "Your cat has some thickening of the heart muscle, but the heart chambers are not significantly stretched. The current risk of fluid build-up or blood clots is low, and usually, no medication is needed at this stage."
    },
    acvim_HCM_B2: {
        title: "Feline CM - Stage B2",
        difficulty: 1,
        group: "Guidelines",
        category: "Staging",
        audience: ["vet", "owner"],
        description: "Subclinical cardiomyopathy with moderate to severe left atrial enlargement. Patient is at higher risk for CHF or ATE. Clopidogrel and/or other antithrombotic therapy is typically indicated.",
        textOwner: "The thickening of your cat's heart muscle has caused the top chamber of the heart to stretch significantly. While they aren't showing outward symptoms yet, they are at a higher risk for fluid build-up or blood clots, and we will likely start preventative medications."
    },
    acvim_HCM_C: {
        title: "Feline CM - Stage C",
        difficulty: 1,
        group: "Guidelines",
        category: "Staging",
        audience: ["vet", "owner"],
        description: "Patients with current or past clinical signs of congestive heart failure (CHF) or arterial thromboembolism (ATE) secondary to cardiomyopathy. Requires active pharmacological management.",
        textOwner: "Your cat has developed symptoms of heart disease, which may include fluid in or around the lungs, or a blood clot. They will need daily medications to help their heart pump effectively, prevent fluid build-up, and reduce the risk of future clots."
    },
    acvim_HCM_D: {
        title: "Feline CM - Stage D",
        difficulty: 1,
        group: "Guidelines",
        category: "Staging",
        audience: ["vet", "owner"],
        description: "Refractory congestive heart failure requiring advanced, specialized, and often escalating therapies (e.g., torasemide, higher dose pimobendan, dual diuretic therapy) to manage clinical signs.",
        textOwner: "Your cat's heart condition is advanced and becoming resistant to standard treatments. We will need to continuously adjust and likely increase their medication protocol to keep them as comfortable as possible and maintain their quality of life."
    },
    
    
    acvim_DCM_A: {
        title: "Canine DCM - Stage A",
        difficulty: 1,
        group: "Guidelines",
        category: "Staging",
        audience: ["vet", "owner"],
        description: "No ACVIM consensus yet for DCM, but currently adapted from MMVD guidelines: Dogs with a known genetic predisposition to dilated cardiomyopathy (e.g., Doberman Pinscher, Great Dane, Irish Wolfhound) but no current structural or electrical abnormalities. Annual echocardiographic and Holter screening is indicated from adulthood. Consult breed society or cardiologists about the best age to start exactly.",
        textOwner: "Your dog is a breed known to have a higher risk of developing heart muscle weakness (Dilated Cardiomyopathy). Their heart is currently normal in size, function, and rhythm, but annual screening is highly recommended to catch any early changes."
    },
    
    acvim_DCM_B1: {
        title: "Canine DCM - Stage B1",
        difficulty: 1,
        group: "Guidelines",
        category: "Staging",
        audience: ["vet", "owner"],
        description: "No ACVIM consensus yet for DCM, but currently adapted from MMVD guidelines: Occult or preclinical 'arrhythmogenic' DCM with no structural changes. The patient is asymptomatic with a normal heart structurally, but arrhythmias/electrical abnormalities are detectable (e.g., VPCs on Holter monitor). Preclinical therapy (e.g., antiarrhythmics) may be initiated to delay progression.",
        textOwner: "Your dog has an 'occult' or hidden stage of heart disease. While their heart muscle still looks normal on an ultrasound, we are detecting abnormal electrical rhythms (extra heartbeats). They act completely normal, but we may need to monitor them closely or start medication to stabilize the rhythm."
    },
    
    acvim_DCM_B2: {
        title: "Canine DCM - Stage B",
        category: "ACVIM Staging",
        difficulty: 3,
        group: "Cardiology",
        description: "Occult or preclinical DCM with structural abnormalities. The patient is asymptomatic but demonstrates morphological changes on echocardiography (e.g., increased LVIDs, reduced fractional shortening/ejection fraction), with or without concurrent arrhythmias. Preclinical therapy (e.g., pimobendan) is indicated to delay the onset of heart failure.",
        textOwner: "Your dog is in a preclinical stage of heart disease. They look completely normal and active on the outside, but their ultrasound shows early signs of heart muscle weakness and stretching. Starting heart support medication now has been proven to significantly delay the onset of outward symptoms."
    },
    
    acvim_DCM_C: {
        title: "Canine DCM - Stage C",
        difficulty: 1,
        group: "Guidelines",
        category: "Staging",
        audience: ["vet", "owner"],
        description: "No ACVIM consensus yet for DCM, but currently adapted from MMVD guidelines: Overt DCM. Patients with past or current clinical signs of congestive heart failure (CHF) (e.g., pulmonary edema, ascites) or significant clinical signs related to arrhythmias (e.g., syncope). Requires standard quadruple therapy and potentially targeted antiarrhythmic management.",
        textOwner: "Your dog has overt heart disease and has developed signs of heart failure, such as fluid in the lungs or abdomen, or fainting spells. They require a combination of medications to clear the fluid, support the heart muscle, and potentially control abnormal heart rhythms."
    },
    
    acvim_DCM_D: {
        title: "Canine DCM - Stage D",
        difficulty: 1,
        group: "Guidelines",
        category: "Staging",
        audience: ["vet", "owner"],
        description: "No ACVIM consensus yet for DCM, but currently adapted from MMVD guidelines: Refractory overt DCM. End-stage clinical signs of heart failure or life-threatening arrhythmias that are poorly responsive to standard heart failure therapy. Requires specialized rescue protocols and intensive management.",
        textOwner: "Your dog's heart condition has reached an advanced stage and is no longer responding well to standard doses of medication. We are now relying on advanced drug combinations to manage their symptoms and prioritize their comfort and quality of life."
    },
    
    
    
    

    // ==========================================
    // GROUP: PHARMACOLOGY & THERAPY
    // ==========================================
    diuretic: {
        title: "Diuretic",
        group: "Pharmacology",
        category: "Drug Classes",
        audience: ["vet", "owner"],
        difficulty: 1,
        textOwner: "Often called a 'water pill.' It helps the kidneys pull excess fluid out of the body and lungs so your dog can breathe easier, which will make them pee more often.",
        textClinical: "A class of agents that promote diuresis. In cardiology, they are the cornerstone of resolving pulmonary edema, ascites, and pleural effusion by reducing systemic and pulmonary venous hydrostatic pressure.",
    },
    loopDiuretic: {
        title: "Loop Diuretic",
        group: "Pharmacology",
        category: "Drug Classes",
        audience: ["vet"], // Hidden from owners, too technical
        difficulty: 3,
        textClinical: "The most potent class of diuretics (e.g., Furosemide, Torsemide). They inhibit the Na+/K+/2Cl- symporter in the thick ascending limb of the loop of Henle, leading to profound sodium and water excretion.",
    },
    furosemide: {
        title: "Furosemide",
        group: "Pharmacology",
        category: "Medications",
        audience: ["vet", "owner"],
        difficulty: 2,
        textOwner: "The most commonly prescribed 'water pill' used to clear fluid from the lungs in dogs and cats with heart failure. It acts quickly and is a lifesaver.",
        textClinical: "A short-acting loop diuretic. It is the first-line emergency and chronic maintenance drug for treating congestive heart failure, titratable to the patient's Sleeping Respiratory Rate (SRR).",
    },
    pimobendan: {
        title: "Pimobendan",
        group: "Pharmacology",
        category: "Medications",
        audience: ["vet", "owner"],
        difficulty: 2,
        textOwner: "A highly effective heart medication that does two things: it opens up blood vessels to lower blood pressure, and it helps the heart muscle squeeze much harder.",
        textClinical: "An 'inodilator' (inotropic mixed vasodilator) that acts via phosphodiesterase III (PDE3) inhibition and calcium sensitization. Proven to prolong the preclinical phase in Stage B2 MMVD and improve survival in Stage C.",
        reference: "Boswood et al (2016) Effect of Pimobendan in Dogs with Preclinical Myxomatous Mitral Valve Disease and Cardiomegaly: The EPIC Study-A Randomized Clinical Trial",
        pmid: "27678080" // EPIC Trial
    },
    rapamycin: {
        title: "Rapamycin",
        group: "Pharmacology",
        category: "Experimental / Research",
        audience: ["vet", "owner"],
        difficulty: 4,
        textOwner: "An experimental drug currently being studied in veterinary medicine for its potential anti-hypertrophy effects and ability to protect heart muscle over time.",
        textClinical: "An mTOR inhibitor with potent immunomodulatory and anti-proliferative properties. Currently under investigation in veterinary cardiology for its potential to reverse or slow myocardial remodeling and hypertrophy - for example in HCM and aortic stenosis. The RAPACAT trial has shown some early signs it might be helpful in slowing wall thickening in HCM.",
        reference: "Kaplan et al (2023). Delayed-release rapamycin halts progression of left ventricular hypertrophy in subclinical feline hypertrophic cardiomyopathy: results of the RAPACAT trial",
        pmid: "37495229",
        article: "/blog-posts/post5.html"
    },
    oxygen: {
        title: "Oxygen Therapy",
        group: "Therapy",
        category: "Emergency",
        audience: ["vet", "owner"],
        difficulty: 1,
        textOwner: "Placing a pet in an oxygen-rich cage to immediately ease their breathing. It is the most important first step when a pet arrives at the clinic in respiratory distress.",
        textClinical: "First-line stabilization for cardiogenic pulmonary edema or severe pulmonary hypertension. Typically provided via oxygen cage (FiO2 40-60%) to relieve hypoxemia and reduce myocardial work while awaiting diuretic onset.",
    },

    // ==========================================
    // GROUP: SUPPLEMENTS & NUTRITION
    // ==========================================
    omega3: {
        title: "Omega-3 Fatty Acids",
        group: "Supplements",
        category: "Nutraceuticals",
        audience: ["vet", "owner"],
        difficulty: 1,
        textOwner: "Healthy fats (often from fish oil) that help reduce inflammation in the body and can help prevent dangerous weight loss in pets with severe heart disease.",
        textClinical: "EPA and DHA supplementation provides anti-inflammatory effects, may reduce arrhythmogenesis, and is specifically indicated to combat cardiac cachexia in advanced heart failure patients.",
    },
    coq10: {
        title: "Co-Enzyme Q10 (CoQ10)",
        group: "Supplements",
        category: "Nutraceuticals",
        audience: ["vet", "owner"],
        difficulty: 2,
        textOwner: "An antioxidant supplement that helps cells produce energy. It is sometimes recommended to support the heart muscle, though clinical proof of its benefit is still limited.",
        textClinical: "An essential cofactor in the mitochondrial electron transport chain. Often supplemented as an antioxidant in myocardial diseases (like DCM), though robust randomized controlled trials demonstrating efficacy in veterinary patients are lacking.",
    },
    potassium: {
        title: "Potassium (K+)",
        group: "Supplements",
        category: "Electrolytes",
        audience: ["vet", "owner"],
        difficulty: 2,
        textOwner: "An essential mineral that helps the heart beat properly. Pets on heavy doses of 'water pills' often lose too much potassium in their urine and need a supplement.",
        textClinical: "An intracellular cation critical for myocardial resting membrane potential. Hypokalemia is a frequent complication of chronic loop diuretic therapy and significantly increases the risk of ventricular tachyarrhythmias.",
    },
    magnesium: {
        title: "Magnesium (Mg2+)",
        group: "Supplements",
        category: "Electrolytes",
        audience: ["vet", "owner"],
        difficulty: 3,
        textOwner: "A mineral that works closely with potassium to keep the heart rhythm stable. Vets will sometimes check this level if your pet is having irregular heartbeats.",
        textClinical: "An essential cofactor for the Na+/K+-ATPase pump. Hypomagnesemia can lead to refractory hypokalemia and promotes arrhythmogenesis. It is often depleted by chronic diuresis.",
    },

    // ==========================================
    // GROUP: HOME MONITORING & DEVICES
    // ==========================================
    srr: {
        title: "Sleeping Respiratory Rate (SRR)",
        group: "Monitoring",
        category: "Home Care",
        audience: ["vet", "owner"],
        difficulty: 1,
        textOwner: "Counting how many breaths your pet takes in one minute while they are deeply asleep. A rate consistently over 30 breaths per minute is an early warning sign of fluid in the lungs.",
        textClinical: "The most sensitive and specific at-home monitoring tool for predicting the onset of left-sided congestive heart failure. An SRR consistently >30 breaths/min indicates rising left atrial pressures and impending pulmonary edema. In Schober's paper of 2010, a count of the breathing rate performed equally well alongside complex doppler echocardiographic techniques, demonstrating it's clinical importance.",
        pmid: "20840304",
        reference: "Schober et al (2010). Detection of congestive heart failure in dogs by Doppler echocardiography.",
        article: "/blog-posts/post2.html"
    },
    smartCollar: {
        title: "Smart Collars (Wearable Tech)",
        group: "Monitoring",
        category: "Technology",
        audience: ["vet", "owner"],
        difficulty: 1,
        textOwner: "Special collars (like PetPace) that act like an Apple Watch for your dog. They track heart rate, breathing rate, and activity levels while you are away from home.",
        textClinical: "Wearable biometric sensors that provide continuous remote monitoring of heart rate, heart rate variability (HRV), and respiratory rate. Increasingly used to monitor treatment efficacy in pre-clinical and clinical heart failure patients remotely."
    }, 
    
    // ==========================================
    // GROUP: Interventions and procedures
    // ==========================================
    
        vclamp: {
        title: "V-Clamp Device",
        group: "Procedures",
        category: "Procedures",
        audience: ["vet", "owner"],
        difficulty: 3,
        textOwner: "The V clamp is small device about 8mm in size that can clamp together the anterior and posterior mitral valve leaflets, bridging the leaflets and reducing the regurgitation. It evolved from the 'MitraClip' human device, used in a similar procedure via in atrial septal puncture technique, but in this case delivered through the heart apex itself. It is made of nitinol alloy, which is a mixture of nickel and titanium, and has a very high shape memory. This allows it to reform its shape after passing through the catheter.",
        textClinical: "The V clamp is small device about 8mm in size that is used in a surgical procedure to clamp the mitral valve leaflets together and reduce the leakage (regurgitation) with MMVD.",
        imgPlaceholder: "/images/vclamp.jpg",
        reference: "Potter et al (2024)",
        pmid: "39717788",
        imgAttribution: "CC-BY 4.0"
    }, 
        teer: {
        title: "Trans-Catheter Edge to Edge Repair (TEER) Procedure",
        group: "Procedures",
        category: "Procedures",
        audience: ["vet", "owner"],
        difficulty: 3,
        textOwner: "The TEER procedure uses a small 'V-clamp' device to clamp together the 2 leaflets of the mitral valve to reduce the amount of regurgitation through the valve and improve the clinical outcome of degenerative mitral valve disease. It is passed via a surgical procedure into the chest and delivered into the heart using a catheter. The bridging of the valve is effective in stopping backwards leakage but still allows blood to pass in a normal direction.",
        textClinical: "The TEER procedure uses a small 'V-clamp' device to clamp together the 2 leaflets of the mitral valve to reduce the amount of regurgitation through the valve and improve the clinical outcome of MMVD. It is passed via a surgical procedure into the chest and delivered into the heart using a catheter. The bridging of the valve is effective in stopping mitral regurgitation but still allows blood to pass in a normal direction.",
        article: "/blog-posts/post26.html",
        imgPlaceholder: "/images/TEER.jpg",
        pmid: "39717788",
        reference: "Potter et al (2024)"
    }, 
    
    // ==========================================
    // GROUP: Rhythm
    // ==========================================
    
        af: {
        title: "Atrial Fibrillation",
        group: "Arrhythmia",
        category: "Arrhythmia",
        audience: ["vet", "owner"],
        difficulty: 3,
        textOwner: "Atrial fibrillation is a fluttering, uncoordinated electrical signal that affects the atria and causes the ventricles of the heart to beat very irregularly, and sometimes too fast. In dogs it is typically irreversible although electrical conversion is occasionally attempted. Usually it is managed using rate slowing medication like digoxin or diltiazem, or occasionally if the rate is slow - known as 'lone AF' it is not treated at all.",
        textClinical: "Atrial fibrillation is a fluttering, uncoordinated electrical signal that affects the atria and causes the ventricles of the heart to beat very irregularly, and sometimes too fast. It is characterised by a chaotic rhythm on auscultation. ECG shows no P-waves, only very fine F-waves, and a completely random R-R interval. In dogs it is typically irreversible although electrical conversion is occasionally attempted. Usually it is managed using rate slowing medication like digoxin or diltiazem, or occasionally if the rate is slow - known as 'lone AF' it is not treated at all.",
        imgPlaceholder: "/images/reference-af.jpg"
    }, 
    

     
    
    
      // ==========================================
    // GROUP: The Clinical ECHO Reference Database
    // ==========================================
// The Clinical ECHO Reference Database

// Anatomy
        flail: {
        title: "Flail Leaflet",
        group: "echo",
        category: "anatomy",       
        audience: ["vet"],
        difficulty: 3,
        view: "Left Apical 4-Chamber or Right parasternal long axis",
        description: "The chordae attach to the valve in multiple locations, like the strings of a parachute. They gradually weaken with the degenerative change involved in DMVD. When an already weakened chordae string completely tears, the valve leaflet loses its anchor. During the contraction of the heart, the force of the blood pushing back on the valve flips the unsupported tip backward (like a sail blowing in the wind), billowing directly into the left atrium. It can happen in multiple places along the valve orifice and 3D trans-oesophagel echo is the best way to assess it properly.",
        imgPlaceholder: "/images/reference-flail.jpg"
    }, 
        annulusdiam: {
        title: "Mitral Valve Annulus Diameter",
        group: "echo",
        category: "anatomy",
        audience: ["vet"],
        difficulty: 3,
        view: "Left Apical 5-Chamber",
        description: "The mitral valve annulus diameter is very important in judging whether repair of the valve is possible using a V-Clamp device in a TEER procedure. It is measured across the valve in an A-P direction from the aortic valve to the lateral annulus, taking care not to include the aorto-mitral curtain in the measurement. Measurements on 2D transthoracic echo are only approximate, as the valve is a complex 3D shape and best assessed via 3D trans-oesophageal echocardiography",
        imgPlaceholder: "/images/reference-annulus.jpg"
    }, 
    
// --- RIGHT HEART  ---
    tapse: {
        audience: ["vet"], 
        title: "TAPSE (Tricuspid Annular Plane Systolic Excursion)",
        view: "Left Apical 4-Chamber (RV Optimized)",
        description: "Assesses longitudinal right ventricular systolic function.",
        group: "echo", 
        method: "Place the M-mode cursor directly through the lateral aspect of the tricuspid valve annulus. Measure the total vertical displacement from end-diastole (lowest point) to peak systole (highest point).",
        imgPlaceholder: "/images/tapse-reference.jpg",
        category: "Right Heart",
        difficulty: 3
    },
    tapsen: {
        audience: ["vet"], 
        title: "TAPSEn (Tricuspid Annular Plane Systolic Excursion - Normalised)",
        view: "Left Apical 4-Chamber (RV Optimized)",
        description: "Assesses longitudinal right ventricular systolic function - normalised for body weight.",
        group: "echo", 
        method: "Measure TAPSE as the vertical displacement of the tricuspid valve annulus, then normalised to body weight. Calculated as: (TAPSE in mm) / (Body Weight in kg)^0.285. A value < 4.5 is a primary criteria for right ventricular systolic dysfunction",
        reference: "Feldhütter et al. Echocardiographic reference intervals for right ventricular indices, including 3‐dimensional volume and 2‐dimensional strain measurements in healthy dogs",
        pmid: "34874066",
        category: "Right Heart",
        difficulty: 3
    },
    rvwt: {
        audience: ["vet"], 
        title: "RVWT (Right Ventricular Wall Thickness)",
        view: "Right Parasternal Long or Short Axis",
        description: "Evaluates right ventricular concentric hypertrophy secondary to pressure overload.",
        group: "echo", 
        method: "Measure the free wall thickness at end-diastole using 2D or M-mode, avoiding papillary muscles and trabeculae.",
        imgPlaceholder: "/images/rvwt-reference.jpg",
        category: "Right Heart",
        difficulty: 2
    },
    rveda: {
        audience: ["vet"], 
        title: "RVEDA (RV End-Diastolic Area)",
        view: "Left Apical 4-Chamber (RV Optimized)",
        description: "Quantifies global right ventricular dilation.",
        group: "echo", 
        method: "Trace the endocardial border of the RV at end-diastole (maximum volume). Exclude the trabeculae and papillary muscles from the trace line. Close the trace flat across the tricuspid annulus.",
        imgPlaceholder: "/images/rveda-reference.jpg",
        category: "Right Heart",
        difficulty: 3
    },
    rvesan: {
        audience: ["vet"], 
        title: "RVESAn (RV End-Systolic Area - Normalised)",
        view: "Left Apical 4-Chamber (RV Optimized)",
        description: "Quantifies RV systolic failure and volume retention - normalised for body weight.",
        group: "echo", 
        method: "Trace the endocardial border at end-systole (minimum volume), then normalised to body weight. Calculated as: (RVESA in cm2) / (Body Weight in kg)^0.695. A value > 0.8 is a primary criteria for right ventricular systolic dysfunction",
        reference: "Feldhütter et al. Echocardiographic reference intervals for right ventricular indices, including 3‐dimensional volume and 2‐dimensional strain measurements in healthy dogs",
        pmid: "34874066",
        category: "Right Heart",
        difficulty: 3
    },
    rvedan: {
        audience: ["vet"], 
        title: "RVEDAn (RV End-Diastolic Area - Normalised)",
        view: "Left Apical 4-Chamber (RV Optimized)",
        description: "Quantifies global right ventricular dilation - normalised for body weight.",
        group: "echo", 
        method: "Trace the endocardial border at end-systole (minimum volume), then normalised to body weight. Calculated as: (RVEDA in cm2) / (Body Weight in kg)^0.665. A value > 1.4 is a primary criteria for right ventricular dilation",
        reference: "Feldhütter et al. Echocardiographic reference intervals for right ventricular indices, including 3‐dimensional volume and 2‐dimensional strain measurements in healthy dogs",
        pmid: "34874066",
        category: "Right Heart",
        difficulty: 3
    },
    rvesa: {
        audience: ["vet"], 
        title: "RVESA (RV End-Systolic Area)",
        view: "Left Apical 4-Chamber (RV Optimized)",
        description: "Quantifies RV systolic failure and volume retention.",
        group: "echo", 
        method: "Trace the endocardial border at end-systole (minimum volume), following the same exclusion rules as RVEDA.",
        imgPlaceholder: "/images/rvesa-reference.jpg",
        category: "Right Heart",
        difficulty: 3
    },
    rvd1: {
        audience: ["vet"], 
        title: "RVD1 (Basal RV Diameter)",
        view: "Left Apical 4-Chamber (RV Optimized)",
        description: "Assesses basal segment right ventricular dilation.",
        group: "echo", 
        method: "Measure the maximal transverse diameter of the RV basal third at end-diastole, typically just above the level of the tricuspid valve leaflets.",
        imgPlaceholder: "/images/rvd1-reference.jpg",
        category: "Right Heart",
        difficulty: 3
    },
    rad: {
        audience: ["vet"], 
        title: "RAD (Right Atrial Diameter - Apical 4 Chamber View)",
        view: "Left Apical 4-Chamber - optimised to see right heart",
        description: "Evaluates right atrial dilation secondary to volume/pressure overload.",
        group: "echo", 
        method: "Measure the maximal right atrial major dimension (base to apex) at end-systole (when the atrium is maximally full), parallel to the interatrial septum.",
        imgPlaceholder: "/images/rad-reference.jpg",
        category: "Right Heart",
        difficulty: 3
    },
    rad2: {
        audience: ["vet"], 
        title: "RAD RPLA (Right Atrial Diameter - Right Parasternal Long Axis view)",
        view: "Right Parasternal Long Axis view - optimised to see right heart",
        description: "Evaluates right atrial dilation secondary to volume/pressure overload.",
        group: "echo", 
        method: "Measure the maximal right atrial major dimension (base to apex) at end-systole (when the atrium is maximally full), parallel to the interatrial septum.",
        imgPlaceholder: "/images/rad2-reference.jpg",
        category: "Right Heart",
        difficulty: 3
    },

// --- INTERNAL SCALAR INDICES (SANKISOV 2024) ---
    tapseaola: {
        audience: ["vet"], 
        title: "TAPSE:Ao Ratio",
        view: "Derived Index",
        description: "Evaluates right ventricular longitudinal systolic function normalized to the patient's internal aortic dimension, bypassing the need for body-weight scaling.",
        group: "echo", 
        method: "Calculated as: TAPSE / Aorta.",
        reference: "Sankisov et al. Echocardiographic reference intervals for right heart indices normalized to aortic diameter in healthy dogs.",
        pmid: "39350563",
        category: "Right Heart",
        difficulty: 3
    },
    radaola: {
        audience: ["vet"], 
        title: "RAD:Ao Ratio (RA Major Axis)",
        view: "Derived Index",
        description: "Indexes the maximal (longitudinal) right atrial diameter to the aortic root. A rapid, body-weight-independent marker for right atrial dilation.",
        group: "echo", 
        method: "Calculated as: RAD / Aorta.",
        reference: "Sankisov et al. Echocardiographic reference intervals for right heart indices normalized to aortic diameter in healthy dogs.",
        pmid: "39350563",
        category: "Right Heart",
        difficulty: 3
    },
    rad2aola: {
        audience: ["vet"], 
        title: "RAD2:Ao Ratio (RA RPLA Axis)",
        view: "Derived Index",
        description: "Indexes the right atrial dimension to the aorta both measured in RPLA 4 chamber view. Evaluates lateral stretching of the right atrium secondary to pressure/volume overload.",
        group: "echo", 
        method: "Calculated as: RAD2  / Aorta.",
        reference: "Sankisov et al. Echocardiographic reference intervals for right heart indices normalized to aortic diameter in healthy dogs.",
        pmid: "39350563",
        category: "Right Heart",
        difficulty: 3
    },
    rad2lad: {
        audience: ["vet"], 
        title: "RAD2:LAD Ratio (Right to Left Atrial Ratio)",
        view: "Derived Index",
        description: "Directly compares the size of the right atrium to the left atrium both measured in RPLA 4 chamber view. Highly useful for identifying asymmetrical right-sided volume overload (e.g., Tricuspid Regurgitation) versus generalized bi-atrial enlargement.",
        group: "echo",
        method: "Calculated as: RAD2 (RA RPLA) / LAD (LA Dimension).",
        reference: "Sankisov et al. Echocardiographic reference intervals for right heart indices normalized to aortic diameter in healthy dogs.",
        pmid: "39350563",
        category: "Right Heart",
        difficulty: 3
    },
    rvd1aola: {
        audience: ["vet"], 
        title: "RVD1:Ao Ratio (RV Basal Diameter)",
        view: "Derived Index",
        description: "Indexes the basal diameter of the right ventricle to the aortic root. A quick clinical surrogate for identifying RV dilation without regression tables.",
        group: "echo", 
        method: "Calculated as: RVD1 / Aorta.",
        reference: "Sankisov et al. Echocardiographic reference intervals for right heart indices normalized to aortic diameter in healthy dogs.",
        pmid: "39350563",
        category: "Right Heart",
        difficulty: 3
    },
    rvwtaola: {
        audience: ["vet"], 
        title: "RVWT:Ao Ratio",
        view: "Derived Index",
        description: "Indexes right ventricular free wall thickness to the aortic dimension. Used to identify right-sided concentric hypertrophy (e.g., secondary to Pulmonic Stenosis or Pulmonary Hypertension).",
        group: "echo", 
        method: "Calculated as: RVWT / Aorta.",
        reference: "Sankisov et al. Echocardiographic reference intervals for right heart indices normalized to aortic diameter in healthy dogs.",
        pmid: "39350563",
        category: "Right Heart",
        difficulty: 3
    },
    rvwtlvpwd: {
        audience: ["vet"], 
        title: "RVWT:LVPWd Ratio (Wall Thickness Ratio)",
        view: "Derived Index",
        description: "Directly compares the right ventricular free wall to the left ventricular free wall. The RV free wall is normally about 1/3 the thickness of the LV wall; an elevated ratio highlights disproportionate right-sided hypertrophy.",
        group: "echo", 
        method: "Calculated as: RVWT / LVPWd.",
        reference: "Sankisov et al. Echocardiographic reference intervals for right heart indices normalized to aortic diameter in healthy dogs.",
        pmid: "39350563",
        category: "Right Heart",
        difficulty: 3
    },
    paaola: {
        audience: ["vet"], 
        title: "PA:Ao Ratio (Pulmonary Artery to Aorta)",
        view: "Derived Index",
        description: "Compares the size of the pulmonary outflow tract/artery directly to the aorta. Values > 1.0 strongly suggest pulmonary hypertension or post-stenotic dilation.",
        group: "echo", 
        method: "Calculated as: RVOTd (PA) / Aorta.",
        reference: "Sankisov et al. Echocardiographic reference intervals for right heart indices normalized to aortic diameter in healthy dogs.",
        pmid: "39350563",
        category: "Right Heart",
        difficulty: 3
    },


    lvidd2: {
        audience: ["vet"], 
        title: "LVIDd₂ (Perpendicular Eccentricity)",
        view: "Right Parasternal Short Axis (Papillary Level)",
        description: "Quantifies septal flattening (D-shape) to calculate the LV Eccentricity Index.",
        group: "echo", 
        method: "Measure the LV internal diameter at end-diastole perpendicular to the normal vertical LVIDd. If the septum is flattened by RV pressure, this horizontal measurement will be significantly larger than the vertical one.",
        imgPlaceholder: "/images/lvidd2-reference.jpg",
        category: "Right Heart",
        difficulty: 3
    },
radn: {
        audience: ["vet"], 
        title: "RADn (Normalized Right Atrial Diameter)",
        view: "Derived Index (Allometric Scaling)",
        description: "Scales the right atrial major dimension directly to body weight. Provides a rapid, size-independent metric to identify right atrial enlargement secondary to volume or pressure overload (e.g., Pulmonary Hypertension, Tricuspid Valve Dysplasia).",
        group: "echo", 
        method: "Calculated as: (RAD in cm) / (Body Weight in kg)^0.4. Clinical limits suggest normal values remain < 0.90.",
        category: "Right Heart",
        difficulty: 3
    },
    rvd1n: {
        audience: ["vet"], 
        title: "RVD1n (Normalized RV Basal Diameter)",
        view: "Derived Index (Allometric Scaling)",
        description: "Scales the basal diameter of the right ventricle to body weight. A robust, fast-math clinical index to assess right ventricular dilation without needing complex log-regression lookup tables.",
        group: "echo", 
        method: "Calculated as: (RVD1 in cm) / (Body Weight in kg)^0.33. Clinical limits suggest normal values remain < 0.94.",
        category: "Right Heart",
        difficulty: 3
    },
// --- LEFT HEART STRUCTURAL ---
    lvidd: {
        audience: ["vet"], 
        title: "LVIDd (LV Internal Diameter - Diastole)",
        view: "Right Parasternal Short Axis (Papillary Level)",
        description: "Primary metric for assessing left ventricular volume overload (eccentric hypertrophy) commonly seen in MMVD or PDA.",
        group: "echo", 
        method: "Measure the maximal internal diameter of the left ventricle at end-diastole (peak R wave). Ensure the cursor is perpendicular to the septum and free wall.",
        imgPlaceholder: "/images/lvidd-reference.jpg",
        category: "Left Heart",
        difficulty: 1
    },
    lvids: {
        audience: ["vet"], 
        title: "LVIDs (LV Internal Diameter - Systole)",
        view: "Right Parasternal Short Axis (Papillary Level)",
        description: "Assesses left ventricular systolic function and contractility.",
        group: "echo", 
        method: "Measure the minimal internal diameter of the left ventricle at peak systole (end of the T wave or maximal septal deviation).",
        imgPlaceholder: "/images/lvids-reference.jpg",
        category: "Left Heart",
        difficulty: 1
    },
lviddn: {
        audience: ["vet"], 
        title: "LVIDdn (Normalized LVID Diastole)",
        view: "Derived Index (Allometric Scaling)",
        description: "Scales the left ventricular diastolic diameter to the patient's body weight. This is the gold-standard metric for diagnosing eccentric hypertrophy (e.g., MMVD, DCM) across vastly different canine body sizes.",
        group: "echo", 
        method: "Calculated as: (LVIDd in cm) / (Body Weight in kg)^0.294. A value > 1.70 is a primary criteria for ACVIM Stage B2 MMVD.",

        reference: "Cornell et al. Allometric scaling of M-mode cardiac measurements in normal adult dogs.",
        pmid: "15188817",
        category: "Left Heart",
        difficulty: 2
    },
    lvidsn: {
        audience: ["vet"], 
        title: "LVIDsn (Normalized LVID Systole)",
        view: "Derived Index (Allometric Scaling)",
        description: "Scales the systolic diameter to body weight to accurately assess myocardial contractility and systolic function independently of the dog's size.",
        group: "echo", 
        method: "Calculated as: (LVIDs in cm) / (Body Weight in kg)^0.315. Normal range is typically 0.71 to 1.26.",
        category: "Left Heart",
        difficulty: 2
    },
    lan: {
        audience: ["vet"], 
        title: "LAn (Normalized LA Short Axis)",
        view: "Derived Index (Allometric Scaling)",
        description: "Scales the short-axis left atrial dimension directly to body weight. Useful when the aortic root size is abnormal or difficult to measure, throwing off the standard LA:Ao ratio.",
        group: "echo", 
        method: "Calculated as: (LA in cm) / (Body Weight in kg)^0.355.",
        category: "Left Heart",
        difficulty: 2
    },
    ladn: {
        audience: ["vet"], 
        title: "LADn (Normalized LA Long Axis)",
        view: "Derived Index (Allometric Scaling)",
        description: "Scales the long-axis (or apical) left atrial dimension to body weight. Provides a comprehensive assessment of 3D atrial remodeling.",
        group: "echo", 
        method: "Calculated as: (LAD in cm) / (Body Weight in kg)^0.309.",
        reference: "Marchesotti et al (2019). Echocardiographic reference intervals of the dimensions of the main pulmonary artery and the right pulmonary artery: a prospective study in 269 healthy dogs.",
        pmid: "31611490",
        category: "Left Heart",
        difficulty: 2
    },
    ladao: {
        audience: ["vet"], 
        title: "LAD:Ao Ratio (Long Axis to Aorta)",
        view: "Derived Index",
        description: "Scales the long-axis (or apical) left atrial dimension to the aortic root. Aortic measurement is made in short axis for using these cut-offs. If measuring aorta in short axis view cut off is 2.1.",
        group: "echo", 
        method: "Calculated dynamically as: LAD (mm) / Ao (mm).",
        category: "Left Heart",
        difficulty: 2
    },
    ladaola: {
        audience: ["vet"], 
        title: "LAD:AoD Ratio (Long Axis to Aorta long axis)",
        view: "Derived Index",
        description: "Scales the long-axis (or apical) left atrial dimension to the aortic root measured in right parasternal long axis view. Aortic measurement is made in long axis 5 chamber view for using these cut-offs. If measuring aorta in long axis view cut off is 2.4.",
        group: "echo", 
        method: "Calculated dynamically as: LAD (mm) / AoD (mm).",
        category: "Left Heart",
        difficulty: 2,
        reference: "Visser et al (2019). Echocardiographic quantitation of left heart size and function in 122 healthy dogs: A prospective study proposing reference intervals and assessing repeatability",
        pmid: "31313382"
   
    },
    RWT: { // Capitalized to match your exact state getter
        audience: ["vet"], 
        title: "Relative Wall Thickness (RWT)",
        view: "Derived Index",
        description: "Classifies LV geometry as normal, concentric hypertrophy (high RWT, e.g., HCM or systemic hypertension), or eccentric hypertrophy (low RWT, e.g., volume overload).",
        group: "echo", 
        method: "Calculated as: (2 × LV Posterior Wall) / LVIDd.",
        category: "Left Heart",
        difficulty: 2
    },

    // --- VOLUME INDICES (WEIGHT & BSA) ---
    lvedvbw: {
        audience: ["vet"], 
        title: "LVEDV/BW (Diastolic Volume Index - Weight)",
        view: "Derived Index",
        description: "Indexes the maximal diastolic volume directly to body weight (ml/kg). Simpson's volumetric assessments are more sensitive for early volume overload states than 1D linear measurements.",
        group: "echo", 
        method: "Calculated as: LVEDV (ml) / Body Weight (kg). Normal is variously described but using Wess's data we have listed 1.25 – 3.27 ml/kg for non-sighthound dogs, and 1.92-4.17 for sighthound breeds.",
        category: "Left Heart",
        difficulty: 3,
        reference: "Wess et al (2021). Echocardiographic reference intervals for volumetric measurements of the left ventricle using the Simpson's method of discs in 1331 dogs",
        pmid: "33675121"
    },
    lvesvbw: {
        audience: ["vet"], 
        title: "LVESV/BW (Systolic Volume Index - Weight)",
        view: "Derived Index",
        description: "Indexes the minimum systolic volume to body weight (ml/kg) to evaluate myocardial failure. Elevated values indicate the heart is struggling to eject its volume.",
        group: "echo", 
        method: "Calculated as: LVESV (ml) / Body Weight (kg). Normal is variously described but using Wess's data we have listed 0.3 – 1.54 ml/kg for non-sighthound dogs, and 0.72-2.11 for sighthound breeds.",
        category: "Left Heart",
        difficulty: 3,
        reference: "Wess et al (2021). Echocardiographic reference intervals for volumetric measurements of the left ventricle using the Simpson's method of discs in 1331 dogs",
        pmid: "33675121"
    },
    
  edvwess: {
        audience: ["vet"], 
        title: "LVEDV (Left Ventricular End-Diastolic Volume) - Wess Model",
        view: "Simpson's Method of Discs (SMOD) - Tabulated Data",
        description: "Measures the maximum volume of the left ventricle right before contraction. Volumetric assessment gives us a much clearer picture of overall diastolic loading and early chamber enlargement compared to standard 1D linear measurements.",
        group: "echo", 
        method: "Calculated via LVEDV interpolation table. Wess deliberately avoided a single formula because simple scaling breaks down at the extremes of body weight. The calculator interpolates the patient's exact weight against a tabulated data array to find the true upper and lower bounds. Sighthounds have a dedicated reference array due to their naturally larger athletic heart phenotype.",
        category: "Left Heart",
        difficulty: 3,
        reference: "Wess et al (2021). Echocardiographic reference intervals for volumetric measurements of the left ventricle using the Simpson's method of discs in 1331 dogs.",
        pmid: "33675121"
    },
    esvwess: {
        audience: ["vet"], 
        title: "LVESV (Left Ventricular End-Systolic Volume) - Wess Model",
        view: "Simpson's Method of Discs (SMOD) - Tabulated Data",
        description: "Measures the residual volume in the left ventricle at the end of contraction. An elevated LVESV indicates the heart is struggling to eject its volume forward. This is a critical marker for declining myocardial systolic function.",
        group: "echo", 
        method: "Calculated via LVESV interpolation table. Similar to LVEDV, this avoids simple ml/kg division in favour of an additive statistical model mapped to specific body weight brackets. The calculator automatically routes standard breeds and sighthounds to their respective data tables to find the exact upper and lower reference limits.",
        category: "Left Heart",
        difficulty: 3,
        reference: "Wess et al (2021). Echocardiographic reference intervals for volumetric measurements of the left ventricle using the Simpson's method of discs in 1331 dogs.",
        pmid: "33675121"
    },
    
    edvim2: {
        audience: ["vet"], 
        title: "EDVI (End-Diastolic Volume Index - BSA)",
        view: "Derived Index",
        description: "Indexes LV diastolic volume to Body Surface Area (BSA) rather than raw weight. Standard in human medicine and increasingly utilized in advanced veterinary research to account for varying canine body condition scores.",
        group: "echo", 
        method: "Calculated as: LVEDV (ml) / BSA (m²). BSA is derived using standard canine conversion constants.",
        category: "Left Heart",
        difficulty: 3
    },
    esvim2: {
        audience: ["vet"], 
        title: "ESVI (End-Systolic Volume Index - BSA)",
        view: "Derived Index",
        description: "Indexes LV systolic volume to Body Surface Area (BSA) to standardize contractility and failure assessments across vastly different body shapes (e.g., Greyhounds vs. Bulldogs).",
        group: "echo", 
        method: "Calculated as: LVESV (ml) / BSA (m²).",
        category: "Left Heart",
        difficulty: 3
    },
    la: {
        audience: ["vet"], 
        title: "LA (Left Atrium Dimension)",
        view: "Right Parasternal Short Axis (Heart Base)",
        description: "Evaluates left atrial enlargement, the primary structural indicator of elevated left-sided filling pressures.",
        group: "echo", 
        method: "Measure the internal diameter of the LA at end-systole (when maximally filled), extending from the center of the aortic valve commissure to the dorsal LA wall.",
        imgPlaceholder: "/images/la-reference.jpg",
        category: "Left Heart",
        difficulty: 1
    },
    lad: {
        audience: ["vet"], 
        title: "LA diameter - long axis (Left Atrium Dimension)",
        view: "Right Parasternal Long Axis (4 chamber)",
        description: "Evaluates left atrial enlargement, the primary structural indicator of elevated left-sided filling pressures.",
        group: "echo", 
        method: "Measure the internal diameter of the LA at end-systole (when maximally filled, the frame just before mitral valve opening), at the widest point, extending from the center of the interatrial septum to the inner wall of the posterior free wall, parallel to the mitral valve annulus.",
        imgPlaceholder: "/images/LADmeasure.jpg",
        reference: "Marchesotti et al (2019). Echocardiographic reference intervals of the dimensions of the main pulmonary artery and the right pulmonary artery: a prospective study in 269 healthy dogs.",
        pmid: "31611490",
        category: "Left Heart",
        difficulty: 1
    },
    ao: {
        audience: ["vet"], 
        title: "Ao (Aortic Root Dimension)",
        view: "Right Parasternal Short Axis (Heart Base)",
        description: "Serves as a patient-specific internal baseline to normalize left atrial size.",
        group: "echo", 
        method: "Measure the internal diameter of the aortic root at end-diastole (when closed), along the commissure of the non-coronary and right coronary cusps.",
        imgPlaceholder: "/images/ao-reference.jpg",
        category: "Left Heart",
        difficulty: 1
    },
    aola: {
        audience: ["vet"], 
        title: "Ao (Aortic Root Dimension) - Long Axis",
        view: "Right Parasternal Long Axis (5-Chamber)",
        description: "Serves as a patient-specific internal baseline to normalize several parameters - chiefly Right sided heart and LAD - as described by Lance Visser's publications.",
        group: "echo", 
        method: "Measure the aortic valve diameter (AoD) in early to midsystole measured between the hinge points of the maximally opened aortic valve cusps from a right parasternal long-axis view optimized for the left ventricular outflow tract and ascending aorta",
        imgPlaceholder: "/images/aola-reference.jpg",
        category: "Left Heart",
        difficulty: 2,
        reference: "Visser et al (2019). Echocardiographic quantitation of left heart size and function in 122 healthy dogs: A prospective study proposing reference intervals and assessing repeatability",
        pmid: "31313382"
        
    },
    ivsd: {
        audience: ["vet"], 
        title: "IVSd (Interventricular Septum - Diastole)",
        view: "Right Parasternal Short Axis (Papillary Level)",
        description: "Assesses septal thickness for signs of concentric hypertrophy (e.g., HCM, Subaortic Stenosis).",
        group: "echo", 
        method: "Measure the thickness of the septum at end-diastole, excluding the right ventricular trabeculae.",
        imgPlaceholder: "/images/ivsd-reference.jpg",
        category: "Left Heart",
        difficulty: 1
    },

    // --- LEFT HEART DOPPLER ---
    eVel: {
        audience: ["vet"], 
        title: "Transmitral E-Wave Velocity",
        view: "Left Apical 4-Chamber",
        description: "Represents early, passive left ventricular diastolic filling. Highly dependent on Left Atrial Pressure (LAP) and myocardial relaxation.",
        group: "echo", 
        method: "Place the Pulsed Wave (PW) Doppler sample volume exactly at the tips of the open mitral valve leaflets during diastole.",
        imgPlaceholder: "/images/ewave-reference.jpg",
        category: "Doppler",
        difficulty: 3
    },
    aVel: {
        audience: ["vet"], 
        title: "Transmitral A-Wave Velocity",
        view: "Left Apical 4-Chamber",
        description: "Represents late, active diastolic filling driven by atrial contraction (the 'atrial kick').",
        group: "echo", 
        method: "Measured from the same PW Doppler trace as the E-wave. Occurs immediately following the P-wave on the concurrent ECG.",
        imgPlaceholder: "/images/awave-reference.jpg",
        category: "Doppler",
        difficulty: 3
    },

    // --- CALCULATED INDICES ---
    fs: {
        audience: ["vet"], 
        title: "Fractional Shortening (FS%)",
        view: "Derived Index",
        description: "A functional index representing the percentage change in the left ventricular diameter during systole. Normal in dogs is typically > 25%.",
        group: "echo", 
        method: "Calculated automatically as: ((LVIDd - LVIDs) / LVIDd) × 100. Note: FS% can be falsely elevated in severe mitral regurgitation due to the low-resistance left atrium.",
        category: "Left Heart",
        difficulty: 1
    },
    laAo: {
        audience: ["vet"], 
        title: "LA:Ao Ratio",
        view: "Derived Index",
        description: "An objective, body-weight independent metric for staging left atrial enlargement. A ratio ≥ 1.6 is a primary criterion for ACVIM Stage B2 MMVD.",
        group: "echo", 
        method: "Calculated automatically by dividing the LA dimension by the Ao dimension measured at the heart base.",
        imgPlaceholder: "/images/laao-reference.jpg",
        category: "Left Heart",
        difficulty: 1
    },
    ear: {
        audience: ["vet"], 
        title: "E:A Ratio",
        view: "Derived Index",
        description: "The primary initial assessment for diastolic function and left atrial pressure.",
        group: "echo", 
        method: "Normal physiologic filling results in an E > A pattern (Ratio > 1.0). An E:A ratio < 1.0 indicates impaired relaxation (Grade 1), while a ratio > 2.0 suggests restrictive filling (Grade 3).",
        imgPlaceholder: "/images/earatio-reference.jpg",
        category: "Doppler",
        difficulty: 3
    },
// --- LEFT HEART VOLUMES & WALLS ---
    lvpwd: {
        audience: ["vet"], 
        title: "LVPWd (LV Posterior/Free Wall - Diastole)",
        view: "Right Parasternal Short/Long Axis",
        description: "Assesses left ventricular free wall thickness for signs of concentric hypertrophy.",
        group: "echo", 
        method: "Measure the thickness of the LV free wall at end-diastole, placing calipers from the endocardial border to the epicardial border. Exclude papillary muscles.",
        imgPlaceholder: "/images/lvpwd-reference.jpg",
        category: "Left Heart",
        difficulty: 1
    },
    lvedv: {
        audience: ["vet"], 
        title: "LVEDV (LV End-Diastolic Volume)",
        view: "Right Parasternal Long Axis / Apical 4-Chamber",
        description: "Quantifies the maximal diastolic blood volume in the left ventricle. More accurate than 1D linear measurements for assessing eccentric hypertrophy.",
        group: "echo", 
        method: "Typically calculated using the Simpson's Method of Discs (SMOD) or Area-Length method by tracing the endocardial border at maximum diastole.",
        imgPlaceholder: "/images/lvedv-reference.jpg",
        category: "Left Heart",
        difficulty: 3
    },
    lvesv: {
        audience: ["vet"], 
        title: "LVESV (LV End-Systolic Volume)",
        view: "Right Parasternal Long Axis / Apical 4-Chamber",
        description: "Quantifies the minimal systolic blood volume. Elevated volumes indicate myocardial systolic failure.",
        group: "echo", 
        method: "Trace the endocardial border at maximum systole (minimum chamber size).",
        imgPlaceholder: "/images/lvesv-reference.jpg",
        category: "Left Heart",
        difficulty: 3
    },

    // --- OUTFLOW TRACTS & TISSUE DOPPLER ---
    lvotd: {
        audience: ["vet"], 
        title: "LVOTd (LV Outflow Tract Diameter)",
        view: "Right Parasternal Long Axis (5-Chamber)",
        description: "Crucial for calculating forward systemic stroke volume (Qs) and evaluating left-to-right shunts.",
        group: "echo", 
        method: "Measure the internal diameter of the left ventricular outflow tract in mid-systole, positioned just below the aortic valve insertion points. Very similar measurement to Aortic valve (long axis) measurement.",
        imgPlaceholder: "/images/lvotd-reference.jpg",
        category: "Left Heart",
        difficulty: 3
    },
    rvotd: {
        audience: ["vet"], 
        title: "RVOTd (RV Outflow Tract Diameter)",
        view: "Right Parasternal Short Axis (Heart Base)",
        description: "Used alongside LVOTd to calculate Qp:Qs shunt ratios (e.g., PDA, VSD).",
        group: "echo", 
        method: "Measure the internal diameter of the RVOT just proximal to the pulmonic valve annulus during mid-systole.",
        imgPlaceholder: "/images/rvotd-reference.jpg",
        category: "Right Heart",
        difficulty: 3
    },
    lvotvti: {
        audience: ["vet"], 
        title: "LVOT VTI (Velocity-Time Integral)",
        view: "Subcostal or Left Apical 5-Chamber",
        description: "Represents the stroke distance of blood ejected from the left ventricle. Combines with LVOT area to calculate systemic stroke volume.",
        group: "echo", 
        method: "Trace the envelope of the Pulsed Wave (PW) Doppler spectral signal obtained from the center of the LVOT.",
        imgPlaceholder: "/images/lvotvti-reference.jpg",
        category: "Left Heart",
        difficulty: 3
    },
    rvotvti: {
        audience: ["vet"], 
        title: "RVOT VTI (Velocity-Time Integral)",
        view: "Right Parasternal Short Axis (Heart Base)",
        description: "Represents the stroke distance of blood ejected into the pulmonary circulation.",
        group: "echo", 
        method: "Trace the envelope of the PW Doppler signal obtained from the center of the RVOT, just proximal to the pulmonic valve.",
        imgPlaceholder: "/images/rvotvti-reference.jpg",
        category: "Right Heart",
        difficulty: 3
    },
    ePrime: {
        audience: ["vet"], 
        title: "e' (Mitral Annular Early Diastolic Velocity)",
        view: "Left Apical 4-Chamber",
        description: "A Tissue Doppler Imaging (TDI) metric representing true myocardial active relaxation.",
        group: "echo", 
        method: "Place the TDI sample volume over the lateral mitral annulus. Measure the peak of the first negative (moving away) diastolic wave.",
        imgPlaceholder: "/images/eprime-reference.jpg",
        category: "Doppler",
        difficulty: 3
    },

    // --- PULMONARY & TRICUSPID DOPPLER / TIMING ---
    mdt: {
        audience: ["vet"], 
        title: "MDT (Mitral Deceleration Time)",
        view: "Left Apical 4-Chamber",
        description: "Measures the rate of pressure equalization between the LA and LV. Shortened times (<60ms) strongly suggest restrictive filling.",
        group: "echo", 
        method: "Measure the time interval from the peak of the transmitral E-wave down the deceleration slope to the baseline (0 m/s).",
        imgPlaceholder: "/images/mdt-reference.jpg",
        category: "Doppler",
        difficulty: 3
    },
    ivrt: {
        audience: ["vet"], 
        title: "IVRT (Isovolumic Relaxation Time)",
        view: "Left Apical 5-Chamber",
        description: "The time required for the LV to relax and drop pressure below LA pressure before the mitral valve opens. Prolonged in impaired relaxation; shortened in high LAP.",
        group: "echo", 
        method: "Place PW Doppler between the LVOT and Mitral inflow to capture both. Measure the time from aortic valve closure (end of ejection) to mitral valve opening (start of E-wave).",
        imgPlaceholder: "/images/ivrt-reference.jpg",
        category: "Doppler",
        difficulty: 3
    },
    trMax: {
        audience: ["vet"], 
        title: "TR Vmax (Tricuspid Regurgitation Peak Velocity)",
        view: "Left Apical 4-Chamber (RV Optimized) / Right Parasternal",
        description: "The gold standard surrogate for estimating Right Ventricular Systolic Pressure (RVSP) and diagnosing pulmonary hypertension.",
        group: "echo", 
        method: "Align a Continuous Wave (CW) Doppler beam parallel to the TR jet. Measure the maximum peak velocity of the spectral envelope.",
        imgPlaceholder: "/images/trmax-reference.jpg",
        category: "Doppler",
        difficulty: 3
    },
    prMax: {
        audience: ["vet"], 
        title: "PR Vmax (Pulmonic Regurgitation Peak Velocity)",
        view: "Right Parasternal Short Axis",
        description: "Used to estimate diastolic pulmonary artery pressures.",
        group: "echo", 
        method: "Align CW Doppler with the diastolic regurgitant jet across the pulmonic valve. Measure the peak early diastolic velocity.",
        imgPlaceholder: "/images/prmax-reference.jpg",
        category: "Doppler",
        difficulty: 3
    },
    aovmax: {
        audience: ["vet"], 
        title: "Ao Vmax (Aortic Peak Velocity)",
        view: "Subcostal / Left Apical 5-Chamber",
        description: "Evaluates left ventricular outflow tract obstruction (e.g., Subaortic Stenosis).",
        group: "echo", 
        method: "Use CW Doppler aligned with the aortic outflow. Measure the peak systolic velocity.",
        imgPlaceholder: "/images/aovmax-reference.jpg",
        category: "Doppler",
        difficulty: 3
    },
    pavmax: {
        audience: ["vet"], 
        title: "PA Vmax (Pulmonic Peak Velocity)",
        view: "Right Parasternal Short Axis",
        description: "Evaluates right ventricular outflow tract obstruction (e.g., Pulmonic Stenosis).",
        group: "echo", 
        method: "Use CW Doppler aligned with the pulmonic outflow. Measure the peak systolic velocity.",
        imgPlaceholder: "/images/pavmax-reference.jpg",
        category: "Doppler",
        difficulty: 3
    },

    // --- PULMONARY ARTERY BRANCHES ---
    mpamin: {
        audience: ["vet"], 
        title: "MPA min (Main Pulmonary Artery Minimum)",
        view: "Right Parasternal Short Axis (Heart Base)",
        description: "Used to assess pulmonary artery dilation, a hallmark of precapillary pulmonary hypertension.",
        group: "echo", 
        method: "Measure the minimal internal diameter of the main pulmonary artery at end-diastole (just before pulmonic valve opening).",
        imgPlaceholder: "/images/reference-mpamin.jpg",
        reference: "Grosso et al (2023). Echocardiographic reference intervals of the dimensions of the main pulmonary artery and the right pulmonary artery: a prospective study in 269 healthy dogs.",
        pmid: "37918089",
        category: "Right Heart",
        difficulty: 3
    },
    mpaAo: {
        audience: ["vet"], 
        title: "MPA : Ao index (Main Pulmonary Artery to Aorta Sax Index)",
        view: "Right Parasternal Short Axis (Heart Base)",
        description: "Used to assess pulmonary artery dilation, a hallmark of precapillary pulmonary hypertension.",
        group: "echo", 
        method: "Measure the minimal internal diameter of the main pulmonary artery at end-diastole (just before pulmonic valve opening). Index to the aortic valve in short axis. Calculated as MPAmin / Ao. A value under 1.01 is considered normal.",
        reference: "Grosso et al (2023). Echocardiographic reference intervals of the dimensions of the main pulmonary artery and the right pulmonary artery: a prospective study in 269 healthy dogs.",
        pmid: "37918089",
        category: "Right Heart",
        difficulty: 3
    },
    rpaminao: {
        audience: ["vet"], 
        title: "RPAmin : Ao index (Right Pulmonary Artery minimum to Aorta Sax Index)",
        view: "Right Parasternal Short Axis (Heart Base), using M-mode through the RPA",
        description: "Used to assess pulmonary artery dilation, a hallmark of precapillary pulmonary hypertension.",
        group: "echo", 
        method: "Measure the minimal internal diameter of the right pulmonary artery at end-diastole (just before pulmonic valve opening). Index to the aortic valve in short axis. Calculated as RPAmin / Ao. A value under 0.61 is considered normal.",
        reference: "Grosso et al (2023). Echocardiographic reference intervals of the dimensions of the main pulmonary artery and the right pulmonary artery: a prospective study in 269 healthy dogs.",
        pmid: "37918089",
        category: "Right Heart",
        difficulty: 3
    },
    rpamaxao: {
        audience: ["vet"], 
        title: "MPA : Ao index (Right Pulmonary Artery maximum to Aorta Sax Index)",
        view: "Right Parasternal Short Axis (Heart Base), using M-mode through the RPA",
        description: "Used to assess pulmonary artery dilation, a hallmark of precapillary pulmonary hypertension.",
        group: "echo", 
        method: "Measure the maximum internal diameter of the right pulmonary artery at end-diastole (just before pulmonic valve opening). Index to the aortic valve in short axis. Calculated as RPAmax / Ao. A value under 0.98 is considered normal.",
        reference: "Grosso et al (2023). Echocardiographic reference intervals of the dimensions of the main pulmonary artery and the right pulmonary artery: a prospective study in 269 healthy dogs.",
        pmid: "37918089",
        imgAttribution: "CC-BY 4.0",
        category: "Right Heart",
        difficulty: 3
    },
    rpamin: {
        audience: ["vet"], 
        title: "RPA min (Right Pulmonary Artery Minimum)",
        view: "Right Parasternal Short Axis, using M-mode through the RPA",
        description: "A highly sensitive, body-weight indexed marker for pulmonary hypertension (Vezzosi/Grosso criteria).",
        group: "echo", 
        method: "Measure the internal diameter of the right pulmonary artery branch at end-diastole.",
        imgPlaceholder: "/images/reference-rpa.jpg",
        reference: "Grosso et al (2023). Echocardiographic reference intervals of the dimensions of the main pulmonary artery and the right pulmonary artery: a prospective study in 269 healthy dogs.",
        pmid: "37918089",
        imgAttribution: "CC-BY 4.0",
        category: "Right Heart",
        difficulty: 3
    },
    rpamax: {
        audience: ["vet"], 
        title: "RPA max (Right Pulmonary Artery Maximum)",
        view: "Right Parasternal Short Axis, using M-mode through the RPA",
        description: "Evaluates the maximum distension of the RPA during peak systole.",
        group: "echo", 
        method: "Measure the maximal internal diameter of the right pulmonary artery branch during peak systole.",
        imgPlaceholder: "/images/reference-rpa.jpg",
        reference: "Grosso et al (2023). Echocardiographic reference intervals of the dimensions of the main pulmonary artery and the right pulmonary artery: a prospective study in 269 healthy dogs.",
        pmid: "37918089",
        imgAttribution: "CC-BY 4.0",
        category: "Right Heart",
        difficulty: 3
    },
    rpadi: {
        audience: ["vet"], 
        title: "RPAD index",
        view: "Derived Index",
        description: "The percentage change in diameter of the right pulmonary artery throughout a singe cardiac cycle.",
        group: "echo", 
        method: "Calculated as: RPAD index = [(RPAmax  RPAmin) / RPAmax] x 100. A value over 31.2% is considered normal.",
        reference: "Grosso et al (2023). Echocardiographic reference intervals of the dimensions of the main pulmonary artery and the right pulmonary artery: a prospective study in 269 healthy dogs.",
        pmid: "37918089",
        category: "Right Heart",
        difficulty: 3
    },

    // --- DERIVED CLINICAL INDICES ---
    sv: {
        audience: ["vet"], 
        title: "Stroke Volume (SV)",
        view: "Derived Index",
        description: "The total volume of blood ejected by the ventricle per beat.",
        group: "echo", 
        method: "Calculated automatically by subtracting End-Systolic Volume (ESV) from End-Diastolic Volume (EDV).",
        category: "Haemodynamics",
        difficulty: 3
    },
    ef: {
        audience: ["vet"], 
        title: "Ejection Fraction (EF%)",
        view: "Derived Index",
        description: "The percentage of diastolic volume ejected per beat. A key indicator of systolic function.",
        group: "echo", 
        method: "Calculated as: (Stroke Volume / LVEDV) × 100.",
        category: "Left Heart",
        difficulty: 3
    },
    rwt: {
        audience: ["vet"], 
        title: "Relative Wall Thickness (RWT)",
        view: "Derived Index",
        description: "Classifies LV geometry as normal, concentric hypertrophy (high RWT), or eccentric hypertrophy (low RWT).",
        group: "echo", 
        method: "Calculated as: (2 × LV Posterior Wall) / LVIDd.",
        imgPlaceholder: "/images/rwt-reference.jpg",
        category: "Left Heart",
        difficulty: 2
    },
    eivrt: {
        audience: ["vet"], 
        title: "E:IVRT Ratio",
        view: "Derived Index",
        description: "An excellent hybrid predictor of left atrial pressure, combining early filling velocity with the relaxation time interval.",
        group: "echo", 
        method: "Calculated as: (E-wave velocity × 100) / IVRT. Ratios > 2.5 strongly correlate with elevated Left Atrial Pressure.",
        category: "Doppler",
        difficulty: 3,
        pmid: "20840304",
        reference: "Schober et al (2010). Detection of congestive heart failure in dogs by Doppler echocardiography."
    },
    lveio: {
        audience: ["vet"], 
        title: "LVEIO (E:LVOT VTI)",
        view: "Derived Index",
        description: "Compares diastolic filling velocity against forward stroke distance. High ratios indicate the ventricle requires massive filling pressures to drive normal forward flow.",
        group: "echo", 
        method: "Calculated as: E-wave velocity / LVOT VTI.",
        category: "Doppler",
        difficulty: 3,
        pmid: "32928487",
        reference: "Morgan et al (2020). Echocardiographic parameters for the assessment of congestive heart failure in dogs with myxomatous mitral valve disease and moderate to severe mitral regurgitation"
    },
    eePrime: {
        audience: ["vet"], 
        title: "E:e' Ratio",
        view: "Derived Index",
        description: "The gold-standard non-invasive surrogate for left atrial filling pressure.",
        group: "echo", 
        method: "Calculated as: Transmitral E-wave velocity / TDI e' velocity. Normalizes blood flow against muscle relaxation speed.",
        category: "Doppler",
        difficulty: 3
    },
    eplar: {
        audience: ["vet"], 
        title: "ePLAR (Echocardiographic Pulmonary to Left Atrial Ratio)",
        view: "Derived Index",
        description: "Differentiates pre-capillary from post-capillary pulmonary hypertension.",
        group: "echo", 
        method: "Calculated as: TR Vmax / E:e' Ratio. A high value (>0.28) points to primary lung vascular disease; a low value (<0.23) points to left heart failure backing up into the lungs.",
        category: "Doppler",
        difficulty: 4
    },
    vtir: {
        audience: ["vet"], 
        title: "VTI Ratio (P:S / Qp:Qs)",
        view: "Derived Index",
        description: "Assesses the balance between pulmonary (Qp) and systemic (Qs) flow volumes. Used to quantify the severity of shunts (e.g., PDA, VSD).",
        group: "echo", 
        method: "Calculated as: RVOT VTI / LVOT VTI (or cross-sectional areas for true volumetric Qp:Qs). Normal is roughly 1.0.",
        category: "Doppler",
        difficulty: 4
    },
    rfac: {
        audience: ["vet"], 
        title: "RV FAC% (Right Ventricular Fractional Area Change)",
        view: "Derived Index",
        description: "A robust 2D estimation of global right ventricular systolic function. Preferred over TAPSE as it accounts for both longitudinal and radial contraction.",
        group: "echo", 
        method: "Calculated as: ((RVEDA - RVESA) / RVEDA) × 100.",
        category: "Right Heart",
        difficulty: 3
    },
    trPG: {
        audience: ["vet"], 
        title: "Pressure Gradient (TR PG)",
        view: "Derived Index",
        description: "Estimates the pressure difference between the right ventricle and right atrium during systole.",
        group: "echo", 
        method: "Calculated using the modified Bernoulli equation: 4 × (Velocity²). When added to estimated Right Atrial Pressure (RAP), it yields Right Ventricular Systolic Pressure (RVSP).",
        imgPlaceholder: "/images/bernoulli-reference.jpg",
        category: "Doppler",
        difficulty: 2
    },
    mrFraction: {
        audience: ["vet"], 
        title: "Regurgitant Fraction (MR%)",
        view: "Derived Index",
        description: "Quantifies the percentage of the total LV stroke volume that leaks backward into the left atrium rather than going out the aorta.",
        group: "echo", 
        method: "Calculated as: (Mitral Regurgitant Volume / Total LV Stroke Volume) × 100.",
        category: "Left Heart",
        difficulty: 4
    },
    lvei: {
        audience: ["vet"], 
        title: "LVEI (LV Eccentricity Index)",
        view: "Derived Index",
        description: "Quantifies septal flattening (D-shape) caused by right ventricular volume or pressure overload.",
        group: "echo", 
        method: "Calculated as: Perpendicular LVIDd₂ / Standard LVIDd. An index > 1.2 indicates significant geometric distortion.",
        imgPlaceholder: "/images/lvei-reference.jpg",
        category: "Right Heart",
        difficulty: 3
    },
cvcAo: {
        audience: ["vet"], 
        title: "CVC:Ao Ratio (Caudal Vena Cava to Aorta)",
        view: "Derived Index",
        description: "Compares the Caudal Vena Cava maximal diameter to the Aorta. A strong, objective indicator of right-sided congestive heart failure and elevated Central Venous Pressure (CVP).",
        group: "echo", 
        method: "Calculated dynamically as: CVC (mm) / Ao (mm). A ratio > 1.3 combined with less than a 10% collapse during the respiratory cycle strongly suggests right heart failure.",
        reference: "Darnis et al. Establishment of reference values of the caudal vena cava by fast-stroke echocardiography.",
        pmid: "15632009", // Note: This is for general CVC ultrasound reference,
        category: "Right Heart",
        difficulty: 4
    },
    cvcCollapse: {
        audience: ["vet"], 
        title: "CVC Collapsibility Index",
        view: "Subxiphoid / Right Hepatic View",
        description: "Evaluates the respiratory variation in the Caudal Vena Cava. A lack of collapse during inspiration indicates right atrial pressure is severely elevated.",
        group: "echo", 
        method: "Calculated as: ((CVC max - CVC min) / CVC max) × 100. Normal dogs should show > 50% collapse during a normal inspiratory effort.",
        reference: "Darnis et al. Establishment of reference values of the caudal vena cava by fast-stroke echocardiography.",
        pmid: "15632009",
        category: "Right Heart",
        difficulty: 4
    },
    changScore: {
        audience: ["vet"], 
        title: "Chang (2026) PH Predictive Score",
        view: "Derived Multi-parametric Index",
        description: "A 25-point echocardiographic scoring system designed to assess the probability of moderate-to-severe pulmonary hypertension in dogs lacking a measurable tricuspid regurgitation (TR) jet. It integrates right and left heart structural ratios with subjective visual findings.",
        group: "echo", 
        method: "Calculates cumulative risk using: RV:LV dilation (0-6 pts), RVWT:LVPWd ratio (0-2 pts), RA:LA ratio (0-6 pts), PA:Ao ratio (0-6 pts), IVS flattening severity (0-4 pts), and RVOT mid-systolic notching (0-1 pt). Scores ≥ 4 predict pTRV ≥ 3.4 m/s; Scores ≥ 9 predict pTRV ≥ 4.3 m/s.",
        reference: "Chang et al. (2026) Development and evaluation of a composite echocardiographic score for predicting pulmonary hypertension severity in dogs.",
        pmid: "41742574",
        imgPlaceholder: "/images/reference-phtscoring.jpg",
        imgAttribution: "CC-BY-NC 4.0",
        category: "Calculations",
        difficulty: 4
    },
ivsFlattening: {
        audience: ["vet"], 
        title: "Interventricular Septal (IVS) Flattening",
        view: "Right Parasternal Short Axis",
        description: "A key structural marker of right ventricular pressure or volume overload. As RV pressures equalize with or exceed LV pressures, the normally circular left ventricle becomes compressed into a 'D' shape.",
        group: "echo", 
        method: "Evaluated subjectively or objectively via the Eccentricity Index (LVEI). Graded as Normal (circular), Subtle-Mild (deviated but not completely flat), or Moderate-Severe (visibly flattened or convex into the LV chamber).",
        reference: "Chang et al. (2026) Development and evaluation of a composite echocardiographic score for predicting pulmonary hypertension severity in dogs.",
        pmid: "41742574",
        imgPlaceholder: "/images/reference-ivsflattening.jpg",
        imgAttribution: "CC-BY-NC 4.0",
        category: "Right Heart",
        difficulty: 3
    },
    rvotNotching: {
        audience: ["vet"], 
        title: "RVOT Mid-Systolic Notching",
        view: "Right Parasternal Short Axis (Heart Base)",
        description: "A highly specific Doppler finding indicating severely elevated pulmonary vascular resistance and pre-capillary pulmonary hypertension. It is caused by a premature reflection of pressure waves from the stiffened pulmonary arterial tree.",
        group: "echo", 
        method: "Obtain a Pulsed Wave (PW) Doppler profile of the Right Ventricular Outflow Tract (RVOT). Look for a characteristic 'W-shape' or a distinct notch on the deceleration slope of the forward systolic waveform.",
        reference: "Chang et al. (2026) Development and evaluation of a composite echocardiographic score for predicting pulmonary hypertension severity in dogs.",
        pmid: "41742574",
        imgPlaceholder: "/images/reference-rvotnotch.jpg",
        imgAttribution: "CC-BY-NC 4.0",
        category: "Doppler",
        difficulty: 4
    },


// --- PROGNOSTIC SCORING ---

mine1: {
    audience: ["vet"], 
    title: "MINE Score (Original 4-Parameter)",
    category: "Calculations",
    difficulty: 3,
    description: "The Mitral INsufficiency Echocardiographic (MINE) score is an objective classification system used to grade the severity of preclinical myxomatous mitral valve disease (MMVD). A score >8 is highly predictive of cardiac death.",
    view: "Multiple (RPSAX & Ap4Ch)",
    group: "echo", 
    method: "Summates severity scores (1-4) across four parameters: LA:Ao ratio, LVIDdn, Fractional Shortening (FS%), and transmitral E-wave peak velocity.",
    reference: "Vezzosi et al. (2021)",
    pmid: "33951235"
},

mine2: {
    audience: ["vet"], 
    title: "MINE 2 Score (Simplified)",
    category: "Calculations",
    difficulty: 3,
    description: "A revised and simplified version of the original MINE score. Researchers found that Fractional Shortening (FS%) did not show independent association with cardiac outcomes, so it was removed to streamline the staging process.",
    view: "Right Parasternal Short Axis & Left Apical",
    group: "echo", 
    method: "Calculates an MMVD severity score using only three independent predictors of survival: LA:Ao ratio, LVIDdn, and transmitral E-wave velocity. Used to identify 'advanced B2' patients.",
    reference: "Vezzosi et al. (2025)",
    pmid: "40865020"
},

// --- ACVIM CONSENSUS GUIDELINES ---

acvimPht: {
    audience: ["vet"], 
    title: "ACVIM Guidelines: Pulmonary Hypertension",
    category: "Guidelines",
    difficulty: 3,
    description: "The standardized veterinary algorithm for diagnosing and classifying pulmonary hypertension (PHT) into probability tiers (Low, Intermediate, High) based on tricuspid regurgitation and anatomic remodeling.",
    view: "Multiple Right & Left Parasternal Views",
    group: "echo", 
    method: "Assess Peak TR Velocity (m/s). If TR is unmeasurable or <3.4 m/s, evaluate three anatomic sites (Ventricles, Pulmonary Artery, Right Atrium) for signs of chronic pressure overload.",
    reference: "Reinero et al. (2020)",
    pmid: "32065428"
},

acvimMmvd: {
    title: "ACVIM Guidelines: MMVD (EPIC Criteria)",
    group: "Guidelines",
    category: "Staging",
    audience: ["vet", "owner"],
    difficulty: 2,
    description: "The global staging system (Stages A through D) for classifying canine myxomatous mitral valve disease (MMVD) and dictating pharmaceutical management, heavily reliant on the findings of the EPIC trial. B1 patients have no cardiac remodelling. B2 patients have cardiac remodelling evident on echo. Stage C patients have current or previous congestive heart failure (CHF), while stage D represents end stage refractory heart failure.",
    view: "Right Parasternal Short Axis",
    method: "To classify a preclinical patient as Stage B2 (warranting the initiation of pimobendan), there must be a murmur ≥3/6 and echocardiographic cardiomegaly defined strictly as an LA:Ao ≥ 1.6 AND an LVIDdn ≥ 1.7.",
    reference: "Keene et al. (2019)",
    pmid: "30974015",
    imgPlaceholder: "/images/acvim_stages.png"
},

acvimHcm: {

    title: "ACVIM Guidelines: HCM",
    group: "Guidelines",
    category: "Staging",
    audience: ["vet", "owner"],
    difficulty: 2,
    description: "The global staging system (Stages A through D) for classifying feline cardiomyopathy. B1 patients have no atrial remodelling but may have LV hypertrophy. B2 patients have atrial remodelling evident on echo. Stage C patients have current or previous congestive heart failure (CHF), while stage D represents end stage refractory heart failure.",
    view: "Right Parasternal Short Axis",
    method: "B1 cats are at low risk of CHF and aortic thromboembolism (ATE), while B2 cats are at high risk for both of these. It differs from MMVD classification. To classify a preclinical patient as Stage B2 (warranting the initiation of anti-thrombotics like clopidogrel and careful monitoring for CHF), the main factor is left atrial enlargement. But in addition LA and LV systolic function, the level of LV hypertrophy and LAA flow are all significant.",
    reference: "Fuentes et al. (2020)",
    pmid: "32243654",
    imgPlaceholder: "/images/acvim_stages_hcm.png"
},

acvimDcm: {
 
    title: "ACVIM Staging: DCM ",
    group: "Guidelines",
    category: "Staging",
    audience: ["vet", "owner"],
    difficulty: 2,
    description: "The global staging system (Stages A through D) for classifying canine dilated cardiomyopathy. ACVIM guidelines are not yet published, so there is no universally agreed method, but typically follow the method described by Gerhard Wess: Stage B is split into B1 (arrhythmogenic phase with normal cardiac structure but documented ventricular premature complexes [VPCs] or atrial fibrillation) and B2 (structural phase showing echocardiographic left ventricular dilation or systolic dysfunction with or without concurrent arrhythmias). Stage C patients have current or previous congestive heart failure (CHF), while stage D represents end stage refractory heart failure.",
    method: "Stage B1 is diagnosed by having a normal echo, but electrical abnormalities seen on holter monitoring. To classify a preclinical patient as Stage B2 (warranting the initiation of pimobendan), echocardiographic cardiomegaly must be defined strictly using breed-specific reference intervals or allometric scaling studies, typically requiring an increased left ventricular internal diameter in diastole normalized to body weight (LVIDdn) alongside an increased left ventricular internal diameter in systole normalized to body weight (LVIDsn), or ideally via volume based techniques such as end-diastolic and systolic volume indicies and reduced ejection fraction.",
    reference: "Wess (2022)",
    pmid: "34732313",
    imgPlaceholder: "/images/acvim_stages_dcm.png"
}

};
