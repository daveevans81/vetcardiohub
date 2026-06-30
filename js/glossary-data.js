
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
    
    // ==========================================
// GROUP: TRACKER — MODULES & FEATURES
// ==========================================

module_srr: {
    title: "Sleeping Respiratory Rate (SRR) Module",
    group: "Tracker",
    category: "Modules",
    audience: ["vet", "owner"],
    difficulty: 1,
    textOwner: "The SRR module is the heart of the tracker. It lets you record your pet's resting breathing rate in two ways: using the live 30-second tap counter (simply tap the button once with each breath and the app counts and doubles it for you), or by entering a reading manually with any date and time so you can add historical or backdated entries. Every reading is stored in a logbook that you can filter by date range, and you can attach a written note to any entry. A summary panel shows the average rate, upper reference, and full range for whatever period is selected.",
    textClinical: "The SRR module provides two data-entry pathways: a real-time 30-second tap counter (doubles automatically to give breaths/min) and a backdated manual entry with custom datetime. Each reading is stored with date, time, rate, equivocal flag, and an optional free-text clinical note. The paginated logbook supports date-range filtering (preset periods or custom range). A statistical summary panel computes mean, mean+2SD (upper reference), and range for the filtered window — values update dynamically as the date range changes. Individual readings can be deleted."
},

module_syncope: {
    title: "Syncope & Collapse Log",
    group: "Tracker",
    category: "Modules",
    audience: ["vet", "owner"],
    difficulty: 2,
    textOwner: "This module is a diary for any fainting, collapsing, or concerning episodes your pet experiences. For each event you record the date and time, what the episode looked like (syncope, seizure, weakness, or a custom description), how long it lasted, whether they remained conscious, their muscle tone and gum colour during the episode, their heart and breathing rate if you were able to check, what they were doing beforehand, and any additional observations. Having an accurate, timestamped account of these events is extremely valuable for your cardiologist.",
    textClinical: "Structured event diary capturing: datetime, event type (syncope, seizure, weakness, unknown, or custom), duration, level of consciousness, muscle tone, mucous membrane colour, HR, RR, pre-event activity context, and free-text clinical notes. Provides a longitudinal record to distinguish cardiogenic syncope from neurological events, vagally-mediated episodes, or primary myopathy. Critical for triage decisions and for correlating with concurrent Holter or arrhythmia data."
},

module_cough: {
    title: "Cough Quality Log",
    group: "Tracker",
    category: "Modules",
    audience: ["vet", "owner"],
    difficulty: 1,
    textOwner: "This module lets you keep a structured daily diary of your pet's cough. For each entry you select the approximate frequency (e.g., a few times per hour or day), choose the type of cough (chesty, goose honk, reverse sneeze, or terminal retch), rate the severity, note what seemed to trigger it, and add any extra observations. Capturing this information systematically — rather than trying to remember from memory at a vet visit — helps your veterinary team distinguish between cardiac, airway, and other causes much more accurately.",
    textClinical: "Daily summary cough entries capture: date, approximate frequency count with period (per hour/day/week), cough description (chesty/productive, goose honking, reverse sneezing, expiratory reflex/gag), severity grading, trigger context (resting/night, exercise, excitement, drinking, etc.), and free-text notes. Supports edit and delete by date. Cough severity data is available as an optional overlay on the SRR analytics chart, allowing correlation between cough burden and respiratory rate trends."
},

module_activity: {
    title: "Activity & Exercise Log",
    group: "Tracker",
    category: "Modules",
    audience: ["vet", "owner"],
    difficulty: 1,
    textOwner: "A simple daily log of your pet's energy levels and exercise. Each entry records the overall energy/activity status (Normal, Reduced, Lethargic, or Hyperactive), walk duration in minutes, distance covered, and any relevant notes. Tracking activity trends alongside breathing rate helps identify whether exercise tolerance is declining — one of the earliest and most reliable signs of advancing heart disease — before the pet becomes overtly breathless.",
    textClinical: "Daily activity summary entries record: energy/activity status (Normal, Reduced, Lethargic, Hyperactive), walk duration (minutes), distance, and free-text notes. Activity duration and distance are available as optional overlays on the SRR analytics chart. Declining exercise tolerance, increasing fatigue, and behavioural changes often predate measurable changes in resting respiratory rate and are an important component of quality-of-life assessment in cardiology patients."
},

module_diagnosis: {
    title: "Diagnosis, ACVIM Staging & Murmur Tracking",
    group: "Tracker",
    category: "Modules",
    audience: ["vet", "owner"],
    difficulty: 2,
    textOwner: "This module maintains a timestamped record of your pet's cardiac diagnosis, disease stage, and murmur grade as they change over time. Each entry records the primary heart condition (such as MMVD, HCM, or DCM), the ACVIM clinical stage (A through D), and any concurrent non-cardiac conditions. The most recent entry drives the stage badge shown at the top of the patient's profile, so the app always reflects the current clinical picture at a glance. Having a chronological staging history is invaluable for tracking disease progression.",
    textClinical: "Timestamped clinical status log capturing: primary cardiac diagnosis (MMVD, HCM, DCM, PH, ARVC, congenital or custom), ACVIM stage (A through D, with MMVD/HCM/DCM sub-variants), murmur grade (0–VI), and concurrent non-cardiac diagnoses as free-text tags. Multiple entries build a longitudinal staging timeline. The most recent entry populates the patient header stage badge. Staging data is not included in the vet export date range filter — it is captured as point-in-time clinical status records."
},

module_medications: {
    title: "Pharmacological Ledger",
    group: "Tracker",
    category: "Modules",
    audience: ["vet", "owner"],
    difficulty: 2,
    textOwner: "The medication ledger is a complete log of every drug your pet has been prescribed throughout their cardiac journey. Each entry records the date, drug name (chosen from the built-in cardiac formulary or entered as a custom drug), dose in milligrams, frequency, and whether the drug has been stopped. The ledger automatically calculates whether the dose per kilogram is still appropriate if your pet's weight has changed since the entry was made, and flags this with a warning. A separate medication timeline chart visualises how the protocol has evolved over time.",
    textClinical: "Structured medication event log recording: date, drug (from built-in cardiac formulary or custom entry), dose (mg), frequency (SID/BID/TID/QID/PRN), and stopped boolean. Action label (Started / Adjusted / Stopped / Ongoing) is computed dynamically. Dynamic mg/kg is calculated against the patient's most recent weight entry and flagged if the weight has changed materially since the entry date. All medication entries are plotted on a separate timeline chart with annotation support. Medication change events are available as annotations on the main SRR analytics chart, providing direct correlation between therapeutic adjustments and respiratory rate response."
},

module_diet_weight: {
    title: "Diet & Weight Log",
    group: "Tracker",
    category: "Modules",
    audience: ["vet", "owner"],
    difficulty: 1,
    textOwner: "This module tracks your pet's weight over time, with support for entries in kilograms or pounds. Weight is stored as a time series rather than a single number, so you can see the full trend rather than just the most recent value. Monitoring weight is important in heart disease for two reasons: unintentional weight loss (cardiac cachexia) is a sign of advanced disease, while unintentional weight gain — especially if the tummy looks bloated — can suggest fluid is accumulating. The current weight drives the automatic mg/kg dose checks in the medication ledger.",
    textClinical: "Weight recorded as a longitudinal time series with unit support (kg/lbs). The most recent entry drives dynamic mg/kg recalculation across the pharmacological ledger, generating warnings if weight has drifted materially from the dose-entry date. Weight trend monitoring is clinically valuable for detecting cardiac cachexia (muscle wasting, hyporexia, loss of lean body mass in advanced CHF) and for identifying occult fluid retention (ascites, pleural effusion) presenting as weight gain."
},

module_vaccination: {
    title: "Vaccination Record",
    group: "Tracker",
    category: "Modules",
    audience: ["vet", "owner"],
    difficulty: 1,
    textOwner: "A simple log of your pet's vaccinations — recording the vaccine given, the date administered, the batch number, and the next due date. The module can generate a reminder export so you don't miss booster dates. Keeping vaccination records alongside cardiac data in one place means your vet always has a complete picture of your pet's preventive healthcare, especially useful when multiple clinicians are involved in a complex cardiac case.",
    textClinical: "Structured vaccination record capturing: vaccine name, date administered, batch/lot number, next due date, and clinician notes. Supports export of all upcoming due dates as a reminder list. Vaccination data is not included in the standard vet export date-range report — records are maintained separately as a persistent health certificate. Ensuring cardiac patients remain up to date with vaccinations is important, particularly if they are prescribed immunomodulatory agents or attend specialist referral centres."
},

module_antiparasitics: {
    title: "Antiparasitic Protection Module",
    group: "Tracker",
    category: "Modules",
    audience: ["vet", "owner"],
    difficulty: 1,
    textOwner: "This module helps you set up and maintain a structured parasite prevention plan for your pet. You choose your region (UK, Europe, or US), select which parasites are a priority based on your pet's lifestyle, and the app helps identify which products in the formulary close all the gaps — including any cardiac-relevant parasites like lungworm or heartworm. Each product is logged with its dose date and next due date, and the module can generate reminders so you never miss a treatment.",
    textClinical: "Structured antiparasitic management system comprising: regional risk profiling (UK / Europe / US defaults with travel add-ons), a 9-target parasite priority selector (fleas, ticks, roundworm, hookworm, whipworm, tapeworm, lungworm, heartworm, mites), a gap-analysis engine that identifies uncovered parasites against the active product list, and a formulary of 28+ products tagged with coverage arrays, intervals, and regional availability. Cardiopulmonary parasites (Angiostrongylus vasorum, Dirofilaria immitis) are flagged with a cardiac icon given their direct relevance to respiratory rate monitoring and right heart disease. Product due dates drive a reminder export function."
},

analytics_chart: {
    title: "SRR Analytics Chart",
    group: "Tracker",
    category: "App Features",
    audience: ["vet", "owner"],
    difficulty: 2,
    textOwner: "The analytics chart displays all of your pet's sleeping breathing rate readings plotted over time as a line graph. What makes it particularly useful are the optional overlays you can add on top: medication changes appear as vertical annotation lines so you can see exactly when a drug was started or adjusted; cough severity entries appear as coloured markers; and activity duration or distance can be plotted alongside. The x-axis can be set to True Time (which spreads readings out to reflect real months passing, averaging multiple readings on the same day) or Sequential (which shows each reading individually side by side). The chart supports pinch-to-zoom, pan, and full-screen expansion.",
    textClinical: "Chart.js time-series visualisation of SRR readings with multiple optional overlay layers: medication change annotations (vertical event markers with drug labels), cough severity plot, activity duration or distance overlay. X-axis supports two modes — True Time (real-calendar axis; same-day readings averaged) and Sequential (each reading plotted individually, preserving intra-day variation). Supports zoom and pan (mouse wheel and pinch), and full-screen modal expansion for detailed review. Zoom is resettable via button. The chart redraws automatically when new data is added, the date range filter is changed, or an overlay is toggled."
},

vet_export: {
    title: "Vet Export — Clinical Summary Report",
    group: "Tracker",
    category: "Export & Sharing",
    audience: ["vet", "owner"],
    difficulty: 2,
    textOwner: "The Vet Export feature generates a formatted PDF summary of your pet's monitoring data — ready to share at a cardiology appointment or send ahead of a consultation. You choose the time period you want to include (last 30 days, 90 days, 6 months, a year, or a custom date range), then tick which sections of the tracker to include. Any section that has been disabled for this patient in the patient settings screen won't be available to export — only the modules you have turned on are included. If a chart is available for a selected module and the module is ticked, the chart is rendered directly into the PDF. The export is a single printable document covering your pet's complete monitored history for the selected period.",
    textClinical: "Generates a paginated PDF clinical summary report. Date range is configurable: preset options (30/90 days, 6/12 months) or custom start/end dates. Module selection covers: SRR logbook + statistics, pharmacological ledger, cough log, activity log, syncope log, weight/diet trend, and antiparasitic record. A module must be both enabled in the patient's profile (via Edit Patient) and ticked in the export panel to appear in the output. Disabled modules are greyed out and unselectable. Diagnosis/staging history and vaccination records are excluded from the date-range export model. Where a chart is available for a selected module and that module is selected, the chart is rendered inline into the PDF — providing the cardiology team with the full visual trend rather than raw data tables alone."
},

cardalis_import: {
    title: "Cardalis App — Email Import",
    group: "Tracker",
    category: "Data & Import",
    audience: ["vet", "owner"],
    difficulty: 2,
    textOwner: "Cardalis is a third-party cardiac monitoring app that allows owners to record their pet's resting breathing rate. If your pet's previous monitoring was done in the Cardalis app, you can transfer all that data into this tracker in one step. Cardalis sends a summary email for each monitoring session — simply copy the full body of that email and paste it into the Cardalis import box. The tracker will extract every breathing rate reading with its date and time, automatically create the patient profile if one doesn't already exist, and add all the readings to the logbook. Any reading already in the system within 60 seconds of an imported one is detected as a duplicate and skipped, so it is safe to import the same email more than once.",
    textClinical: "Parses pasted Cardalis email export text. The parser extracts: BreathCount (mandatory), Date & Time in YYYY-MM-DD HH:MM:SS format (mandatory), plus optional clinical fields — Breathing Effort, Exercise Ability (parser handles the 'Abilty' typo present in the Cardalis app), Alertness, and Comments. Non-N/A clinical fields are assembled into a composite clinical note attached to each reading. Patient name is extracted from the 'breathing rate for [Name]' header — if no matching patient profile exists, one is auto-created with default settings. Duplicate detection uses a 60-second timestamp window to prevent re-importing the same readings. Imported readings are flagged as non-manual entries."
},

heart2heart_import: {
    title: "Heart2Heart App — PDF Import",
    group: "Tracker",
    category: "Data & Import",
    audience: ["vet", "owner"],
    difficulty: 2,
    textOwner: "Heart2Heart is another third-party cardiac monitoring app. If your pet's previous breathing rate data was recorded in Heart2Heart, you can bring it into this tracker by opening the Heart2Heart app, exporting or viewing your pet's reading history as a PDF, selecting all the data, and pasting it into the Heart2Heart import box. The tracker reads each line of the pasted text, extracts the date, time, breathing rate, and any notes, and imports them directly into the current patient's logbook. Any reading already in the system within 60 seconds of an imported one is skipped automatically, so it's safe to paste the same data more than once without creating duplicates.",
    textClinical: "Parses pasted Heart2Heart PDF text (copy from the app's reading history export). Each line is expected to follow the format: DD MMM YYYY HH:MM [rate] [optional note] — e.g., '19 Jun 2026 18:55 24 Sleeping deeply'. The parser uses an aggressive regex that tolerates variable whitespace and comma separators introduced by PDF copy-paste artefacts. Readings outside the valid range (1–150 bpm) are discarded. Duplicate detection uses a 60-second timestamp window. Unlike the Cardalis import, patient profile auto-creation is not performed — data is imported into the currently active patient. Imported readings carry the optional note field as their clinical comment."
},

system_backup: {
    title: "Master System Backup",
    group: "Tracker",
    category: "Data & Import",
    audience: ["vet", "owner"],
    difficulty: 1,
    textOwner: "The master backup exports everything in the tracker — all patients and all their data across every module — as a single JSON file that you save to your device. If you ever switch phones, clear your browser data, or something goes wrong with the app, restoring from this backup file brings everything back instantly. It is strongly recommended to export a fresh backup after every significant clinical event, and routinely every few weeks. The tracker will warn you if a previous save may not have completed successfully, and prompt you to export a backup immediately.",
    textClinical: "Full system export: serialises all patients and associated data arrays (SRR history, medication ledger, cough log, activity log, syncope log, weight/diet entries, vaccination records, antiparasitic records, diagnosis/staging entries) to a single JSON file. Restore imports the JSON and overwrites all current data. The tracker includes a save-integrity check on load — if the last localStorage write did not complete (e.g., storage quota exceeded, browser crash), a warning is displayed and immediate backup export is prompted. All data is stored client-side in localStorage; there is no cloud backup. Regular manual exports are the sole data protection mechanism."
},

parasite_protection_plan: {
    title: "Parasite Protection Plan",
    group: "Antiparasitics",
    category: "Clinical Concepts",
    audience: ["vet", "owner"],
    difficulty: 1,
    textOwner: "Your pet's parasite protection plan is a personalised schedule of treatments designed to keep them covered against the parasites that matter most in your area and based on their lifestyle. It takes into account where you live (UK, Europe, or US), whether your pet travels internationally, what kind of environment they're in (urban vs rural, hunting dog vs indoor cat), and any health conditions that affect which products can be used. A good plan is the simplest protocol that leaves no dangerous gaps — particularly for cardiac-relevant parasites like lungworm and heartworm, which can directly mimic or mask the signs of heart disease.",
    textClinical: "A structured, risk-stratified antiparasitic protocol personalised to the individual patient. Key inputs: geographic region and endemic parasite pressure, lifestyle risk factors (travel, hunting, raw feeding, multi-pet household, access to slugs/snails/wild prey), species and weight, concurrent medications (drug interactions, e.g., macrocyclic lactones in MDR1 breeds), and pre-existing health conditions. The plan outputs: a prioritised target parasite list, a gap analysis against current products, a selected product or combination, and a treatment calendar with due-date reminders. Review triggers include: international travel, change of residence, lifestyle change, emergence of new product resistance data, or introduction of a new concurrent medication."
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
// GROUP: ANTIPARASITICS & PARASITE PROTECTION
// ==========================================

parasite_coverage_principle: {
    title: "Just Enough Coverage — Targeted Antiparasitic Selection",
    group: "Antiparasitics",
    category: "Clinical Concepts",
    audience: ["vet", "owner"],
    difficulty: 2,
    textOwner: "More is not always better when it comes to parasite prevention. The goal is to choose a product — or a simple combination of products — that covers the specific parasites your pet is genuinely at risk from, based on where you live, where you travel, and their lifestyle. Convenient 'all-in-one' products are great, but they sometimes include ingredients your pet doesn't need, or can miss something critical — like lungworm — that a basic flea product doesn't cover. Your vet can map out exactly which parasites matter for your pet and find the simplest protocol that closes every gap without over-prescribing.",
    textClinical: "Rational antiparasitic prescribing is risk-stratified rather than maximally broad. Region-specific endemic pressure, lifestyle (rural vs urban, hunting, travel abroad, raw feeding), and the patient's concurrent medications and medical history should all inform product selection. Over-prescribing combination products exposes patients to unnecessary active ingredients with attendant adverse-event profiles, adds cost, and may contribute to selection pressure for resistance. Under-prescribing leaves genuine clinical gaps — most commonly Angiostrongylus vasorum cover in UK dogs, heartworm prevention in patients travelling to continental Europe or the US, and taeniid/Dipylidium tapeworm cover in hunting or raw-fed animals. A systematic gap analysis against the patient's active parasite risk profile is the most defensible clinical approach."
},

isoxazolines: {
    title: "Isoxazolines (Ectoparasiticide Drug Class)",
    group: "Antiparasitics",
    category: "Drug Classes",
    audience: ["vet", "owner"],
    difficulty: 2,
    textOwner: "Isoxazolines are a modern class of flea and tick treatment given as an oral chew or spot-on. They work by spreading through your pet's bloodstream so that when a flea or tick bites, it is rapidly killed. Products in this class include NexGard (afoxolaner), Bravecto (fluralaner), Simparica (sarolaner), and Credelio (lotilaner). They are highly effective and are now the most commonly recommended class for ectoparasite control in dogs and cats. As a class, they have been associated with a small risk of neurological side effects — tremors, wobbliness, or very rarely seizures. This is rare, but pets with a known history of seizures should be prescribed with extra care.",
    textClinical: "Isoxazolines are potent antagonists of invertebrate GABA-gated chloride channels (and glutamate-gated chloride channels in some species), producing rapid neurotoxicity in target ectoparasites with a broad safety margin in mammals. Active members include afoxolaner (NexGard, NexGard Spectra), fluralaner (Bravecto, Bravecto Plus, Bravecto TriUNO), sarolaner (Simparica, Simparica Trio, Stronghold Plus), and lotilaner (Credelio, Credelio Plus). Both the FDA and EMA have issued class-wide safety communications regarding potential neurological adverse events (tremors, ataxia, seizures); the absolute incidence at labeled doses is low, but the class warrants caution in patients with pre-existing seizure disorders or neurological disease."
},

macrocyclic_lactones: {
    title: "Macrocyclic Lactones (Heartworm Preventive Drug Class)",
    group: "Antiparasitics",
    category: "Drug Classes",
    audience: ["vet", "owner"],
    difficulty: 3,
    textOwner: "Macrocyclic lactones are the family of drugs that underpin most heartworm prevention products — including ivermectin (Heartgard), milbemycin oxime (Milbemax, Interceptor), moxidectin (Advocate, ProHeart), and selamectin (Stronghold). They also treat many intestinal worms. In most pets, they are extremely safe at the doses used in licensed products. However, certain breeds — particularly Collies and related herding breeds — carry a genetic mutation (MDR1/ABCB1) that means these drugs can reach dangerously high levels in the brain, so this is always worth mentioning to your vet when starting a new product.",
    textClinical: "Macrocyclic lactones comprise two structural subfamilies: avermectins (ivermectin, selamectin, eprinomectin, doramectin) and milbemycins (milbemycin oxime, moxidectin). Their mechanism is potentiation of GABA-gated chloride channels at invertebrate neuromuscular junctions, producing flaccid paralysis of target helminths and arthropods. At licensed preventive doses they are safe across the vast majority of patients. The MDR1/ABCB1 efflux pump normally excludes these lipophilic compounds from the CNS; dogs carrying the ABCB1-1Δ loss-of-function mutation are at significant risk of CNS toxicity at extra-label or elevated doses. Pre-treatment screening for adult Dirofilaria immitis antigen is mandatory before initiating or switching preventives in endemic regions — administering a macrocyclic lactone to a microfilaraemic patient may trigger a severe systemic inflammatory reaction."
},

mdr1_sensitivity: {
    title: "MDR1 / ABCB1 Mutation (Multi-Drug Sensitivity)",
    group: "Antiparasitics",
    category: "Drug Safety",
    audience: ["vet", "owner"],
    difficulty: 3,
    textOwner: "Some herding breeds — most notably Rough and Smooth Collies, Shetland Sheepdogs, Australian Shepherds, and their crosses — carry a faulty gene called MDR1 (also known as ABCB1). Normally this gene produces a protein that acts as a 'bouncer' at the brain's natural barrier, pumping certain drugs back out before they can accumulate. Dogs with the mutation lack this protection. This means that certain antiparasitic drugs, sedatives, and some chemotherapy agents can reach toxic levels in the brain if given at high or extra-label doses. Licensed, label-dose heartworm preventives are safe even in affected breeds. If your dog is one of the at-risk breeds, always tell your vet — and ask about DNA testing if you're unsure.",
    textClinical: "The ABCB1-1Δ frameshift deletion produces a truncated, non-functional P-glycoprotein (Pgp) efflux pump. Pgp is expressed on the luminal surface of blood-brain barrier endothelial cells and actively extrudes lipophilic substrates — including macrocyclic lactones, loperamide, digoxin, and certain chemotherapy agents — from the CNS. Homozygous mutant (mut/mut) dogs are at high risk of CNS toxicity from extra-label macrocyclic lactone doses; heterozygotes (norm/mut) have intermediate sensitivity. Critically, licensed heartworm preventive doses are below the safety threshold and are considered safe in mut/mut individuals. DNA testing via validated commercial laboratories is recommended for Collie, Shetland Sheepdog, Australian Shepherd, Border Collie, Old English Sheepdog, McNab, and related breeds or crosses.",
    pmid: "11108649"
},

lungworm_av: {
    title: "Lungworm (Angiostrongylus vasorum)",
    group: "Antiparasitics",
    category: "Cardiopulmonary Parasites",
    audience: ["vet", "owner"],
    difficulty: 2,
    textOwner: "Lungworm (Angiostrongylus vasorum) is a parasitic worm that lives in the pulmonary artery and right side of the heart. Dogs become infected by eating slugs or snails — even accidentally while sniffing around the garden or in grass. The larvae migrate to the lungs and heart, causing inflammation, coughing, breathing difficulties, and problems with blood clotting. Critically for dogs with heart disease, an active lungworm infection can directly raise the resting breathing rate — in exactly the same way that early congestive heart failure does. This means a dog whose SRR suddenly climbs should have lungworm ruled out, not just assumed to be cardiac. Lungworm is now endemic across much of the UK and is easily preventable with monthly treatments like Advocate or NexGard Spectra.",
    textClinical: "Angiostrongylus vasorum (French Heartworm) is a metastrongyloid nematode; adults reside in the right ventricle and pulmonary arteries and shed first-stage larvae (L1) in faeces. Intermediate hosts are gastropod molluscs (slugs/snails). Clinical spectrum ranges from subclinical to severe: coughing, dyspnoea, exercise intolerance, pulmonary hypertension, right heart failure, and coagulopathy (thrombocytopenia, DIC-like picture). Of direct clinical relevance in cardiology monitoring: active A. vasorum infection elevates resting respiratory rate through pulmonary inflammation and hypertension, independently of left-sided congestion. An unexplained SRR rise in a cardiac patient in an endemic area should prompt lungworm testing before attributing the change to cardiac decompensation. Diagnosis: Baermann faecal technique, faecal PCR, or Angio Detect rapid antigen test. Prevention: moxidectin/imidacloprid (Advocate), milbemycin-containing products (Milbemax, NexGard Spectra, Credelio Plus), or fenbendazole (Panacur) — all monthly.",
    pmid: "16820247"
},

heartworm_dirofilaria: {
    title: "Heartworm (Dirofilaria immitis)",
    group: "Antiparasitics",
    category: "Cardiopulmonary Parasites",
    audience: ["vet", "owner"],
    difficulty: 2,
    textOwner: "Heartworm is a serious disease caused by a worm (Dirofilaria immitis) that lives in the heart and major blood vessels leading to the lungs. It is spread by mosquito bites — it cannot pass directly between pets. In the UK, heartworm is not normally present, but it is widespread across mainland Europe (especially southern and eastern Europe) and throughout the United States. Any dog or cat travelling abroad needs heartworm prevention before and during their trip. Without prevention, adult worms — which can reach 30cm in length — cause severe right-sided heart disease, pulmonary hypertension, and can be fatal.",
    textClinical: "Dirofilaria immitis is a filarial nematode transmitted by Culicidae mosquitoes. Adults reside in the pulmonary arteries and right heart, producing endarteritis, pulmonary vascular remodelling, pulmonary hypertension, and progressive right ventricular dysfunction. Caval syndrome — worm burden occluding the right atrium and causing haemolytic anaemia and circulatory collapse — is a surgical emergency. Not endemic in the UK but endemic throughout continental Europe (hyperendemic: Iberian Peninsula, Italy, southern France, Balkans) and across much of the US. Mandatory pre-treatment antigen testing for adult D. immitis before initiating macrocyclic lactone preventives in endemic regions or returning travel patients. Prevention: monthly macrocyclic lactones (ivermectin, milbemycin oxime, moxidectin, selamectin) or injectable moxidectin (ProHeart, 6- or 12-month duration in the US).",
    pmid: "20723921"
},

parasite_fleas: {
    title: "Fleas (Ctenocephalides spp.)",
    group: "Antiparasitics",
    category: "Parasites",
    audience: ["vet", "owner"],
    difficulty: 1,
    textOwner: "Fleas are the most common external parasite in cats and dogs. The cat flea (Ctenocephalides felis) is responsible for the vast majority of infestations in both species — despite the name, it happily lives on dogs too. Fleas cause intense itching, and some pets develop a severe allergic reaction to flea saliva (Flea Allergy Dermatitis) from even a single bite. Fleas also carry tapeworm larvae: a pet that grooms and swallows a flea can end up with a tapeworm infection. In severe infestations — particularly in kittens or puppies — the blood loss can be significant enough to cause anaemia. Crucially, fleas can also bite humans. The most important thing to remember is that only 5% of a flea problem lives on your pet; the other 95% — eggs, larvae, and pupae — live in the home environment, so treating the house is just as important as treating the animal.",
    textClinical: "Ctenocephalides felis is the predominant flea species infesting both dogs and cats globally. C. canis is comparatively rare. Key clinical implications: (1) Flea Allergy Dermatitis (FAD) — IgE-mediated hypersensitivity to flea salivary antigens; a single bite can precipitate a severe pruritic dermatitis in sensitised individuals; (2) Dipylidium caninum transmission — flea larvae ingest tapeworm eggs; grooming and swallowing adult fleas completes the cycle; (3) Haematophagic burden — clinically significant anaemia in neonates and debilitated adults; (4) Zoonotic risk — C. felis bites humans and is a vector for Bartonella henselae (cat scratch disease) and murine typhus (Rickettsia typhi). Environmental persistence is a critical treatment consideration: adult fleas represent only ~5% of the total population; eggs, larvae, and cocoons comprise the remainder and must be targeted with insect growth regulators alongside adulticides."
},

parasite_ticks: {
    title: "Ticks",
    group: "Antiparasitics",
    category: "Parasites",
    audience: ["vet", "owner"],
    difficulty: 2,
    textOwner: "Ticks are small spider-like parasites that attach to the skin and feed on blood, most commonly picked up in woodland, long grass, or moorland. In the UK, the sheep tick (Ixodes ricinus) is the most important species. Ticks themselves are usually easy to spot — they swell as they feed and may look like a small grey-brown wart or lump. The main danger is not the tick itself but the infections it can transmit, including Lyme disease (caused by a bacteria called Borrelia). Ticks should be removed with a proper tick removal tool, grasped as close to the skin as possible and twisted out — never squeezed, burned, or smothered, as this can increase the risk of disease transmission. Prevention with an effective tick product is far safer than relying on prompt removal.",
    textClinical: "Principal tick species in the UK and Europe: Ixodes ricinus (sheep tick; main vector for Borrelia burgdorferi sensu lato [Lyme borreliosis], Anaplasma phagocytophilum, and tick-borne encephalitis virus); Dermacentor reticulatus (meadow tick; vector for Babesia canis — notifiable in UK); Rhipicephalus sanguineus (brown dog tick; tropical/subtropical, vector for Ehrlichia canis, Babesia vogeli). In the US: Ixodes scapularis (deer tick; Lyme, Anaplasmosis, Ehrlichiosis), Amblyomma americanum (lone star tick; Ehrlichia chaffeensis), Dermacentor variabilis (American dog tick; Rocky Mountain Spotted Fever). Disease transmission typically requires ≥24–48 hours of attachment for Borrelia; Babesia transmission may be faster. Correct removal technique (twist-out, never squeeze) and consistent use of acaricides are the primary preventive strategies."
},

parasite_roundworm: {
    title: "Roundworm (Toxocara / Ascarids)",
    group: "Antiparasitics",
    category: "Parasites",
    audience: ["vet", "owner"],
    difficulty: 1,
    textOwner: "Roundworms are the most common intestinal worm in dogs and cats, especially in puppies and kittens. Adult roundworms look like spaghetti and live in the small intestine. In puppies, they can cause a pot-bellied appearance, diarrhoea, vomiting, poor growth, and a dull coat. In adult pets, infections are often subclinical but the worms still shed eggs into the environment in faeces. This matters for human health — Toxocara eggs in soil or sandpits can accidentally be swallowed by children, and while rare, this can cause a serious condition called Visceral Larva Migrans where larvae migrate through the body, occasionally reaching the eyes. Regular deworming and prompt faecal clearance are the main ways to prevent this.",
    textClinical: "Toxocara canis (dogs) and T. cati (cats) are the principal ascarid species. Unique transmission routes for T. canis: trans-placental (all pups from infected bitches born with larval burdens) and lactogenic (larvae mobilised from somatic arrested stages in early lactation) — deworming the bitch does not prevent pup infection. Hepatic and pulmonary larval migration ('roundworm pneumonia') in young or heavy infestations. Adult worms cause villous atrophy, malabsorption, and in heavy burdens: intussusception, intestinal obstruction. Zoonotic OLM (Ocular Larva Migrans) and VLM (Visceral Larva Migrans) in children via ingestion of embryonated eggs from soil; eggs require 2–4 weeks in the environment to become infective. Pyrethrin, fenbendazole, milbemycin oxime, and macrocyclic lactones all provide nematocidal activity."
},

parasite_hookworm: {
    title: "Hookworm (Ancylostoma / Uncinaria)",
    group: "Antiparasitics",
    category: "Parasites",
    audience: ["vet", "owner"],
    difficulty: 2,
    textOwner: "Hookworms are blood-sucking intestinal worms. They are smaller than roundworms and attach themselves to the lining of the small intestine, feeding on blood. In puppies and kittens, heavy infections can cause life-threatening anaemia — the gums may appear pale and the pet becomes very weak. In adult pets, smaller burdens may cause chronic loose stools, weight loss, and a dull coat. Hookworm larvae in soil can also penetrate human skin — particularly if you walk barefoot on contaminated ground — causing a red, intensely itchy, creeping rash called Cutaneous Larva Migrans. Good faecal hygiene and regular deworming are the key preventive measures.",
    textClinical: "Ancylostoma caninum (dogs; tropical/subtropical), A. tubaeforme (cats), and Uncinaria stenocephala (dogs and cats; temperate climates including UK) are the principal species. A. caninum is strongly haematophagous; individual adult worms consume ~0.1ml blood/day. Severe anaemia, hypoproteinaemia, and melena are the hallmarks of heavy infection — neonatal hookworm disease can be rapidly fatal. Transcutaneous and trans-colostral transmission occurs. Zoonotic Cutaneous Larva Migrans (CLM) in humans via skin penetration of third-stage larvae (L3) from contaminated sandy/warm soil. Eosinophilic enteritis in humans from aberrant A. caninum migration. Drugs of choice: fenbendazole, milbemycin oxime, moxidectin, pyrantel, febantel."
},

parasite_whipworm: {
    title: "Whipworm (Trichuris vulpis)",
    group: "Antiparasitics",
    category: "Parasites",
    audience: ["vet", "owner"],
    difficulty: 2,
    textOwner: "Whipworms are intestinal parasites that affect dogs (not cats). They live in the caecum and large bowel, where they burrow into the gut lining. The classic sign is a chronic large bowel diarrhoea — typically mucousy or bloody, and often occurring at the end of a walk or when your dog is excited. Intermittent diarrhoea that keeps coming back despite treatment for other causes should always prompt whipworm testing. Diagnosis can be tricky as whipworms produce relatively few eggs, so a single faecal test can miss them — sometimes multiple tests on different days are needed. Whipworm eggs are remarkably tough and can survive in the environment for years.",
    textClinical: "Trichuris vulpis (dogs only; T. campanula in cats — rare). Adults reside in the caecum and proximal colon, embedded in the mucosa. Clinical signs: chronic large-bowel diarrhoea (mucoid, haemorrhagic), tenesmus, haematochezia; heavy burdens may cause hypoproteinaemia and electrolyte abnormalities including a pseudo-hypoadrenocorticism syndrome (hyperkalemia, hyponatraemia). Diagnosis by faecal flotation is unreliable due to low, intermittent egg shedding — multiple samples (3 on consecutive days) recommended. Eggs are extremely environmentally robust, surviving 5+ years in soil. Not zoonotic. Efficacious drugs: fenbendazole (5-day course), milbemycin oxime (in combination products), febantel/pyrantel/praziquantel (Drontal Plus). Ivermectin and praziquantel alone lack efficacy."
},

parasite_tapeworm: {
    title: "Tapeworm (Dipylidium / Taenia / Echinococcus)",
    group: "Antiparasitics",
    category: "Parasites",
    audience: ["vet", "owner"],
    difficulty: 2,
    textOwner: "Tapeworms are flat, segmented worms that live in the small intestine. There are two main types that affect dogs and cats. The most common — Dipylidium caninum — is spread by fleas: a pet grooms itself, swallows a flea carrying tapeworm larvae, and a tapeworm develops. The tell-tale sign is small, white, rice-grain-sized segments around the back end or in the pet's bedding. The other type — Taenia species — is acquired by eating raw meat, offal, or catching and eating prey (rabbits, mice, livestock). Tapeworms rarely cause serious illness in pets but are unpleasant and can cause irritation. Praziquantel is the most effective treatment. Controlling fleas is the key to preventing Dipylidium — a fleas-and-tapeworm cycle will keep repeating until the flea infestation is resolved.",
    textClinical: "Key cestode species: Dipylidium caninum — acquired via ingestion of flea larvae containing cysticercoid stages; resolving flea infestation is therefore essential to breaking the life cycle. Taenia taeniaeformis (cats; via rodents), T. pisiformis (dogs; via rabbits), T. ovis/hydatigena (dogs; via livestock offal) — important in rural and raw-fed animals. Echinococcus granulosus (dogs; via raw sheep offal in endemic areas) — causes cystic hydatid disease in intermediate hosts including humans; notifiable and of significant public health importance in certain regions. E. multilocularis (not yet in UK but endemic in continental Europe) — causes alveolar echinococcosis. Drug of choice: praziquantel (at least 5mg/kg PO/SC). Milbemycin oxime, fenbendazole (Taenia only, not Dipylidium), and macrocyclic lactones lack cestocidal activity."
},

parasite_mites: {
    title: "Mites (Ear Mites, Mange & Demodex)",
    group: "Antiparasitics",
    category: "Parasites",
    audience: ["vet", "owner"],
    difficulty: 2,
    textOwner: "Mites are microscopic spider-like parasites. There are three types commonly seen in pets, each behaving quite differently. Ear mites (Otodectes cynotis) live in the ear canal and cause intense itching and a dark, coffee-ground-like discharge in the ears — they are highly contagious between pets. Sarcoptic mange mites (Sarcoptes scabiei) burrow into the skin and cause an intensely itchy rash, often starting on the ears, elbows, and belly — they can also spread to humans, causing a temporary but very itchy rash. Demodex mites live in hair follicles and are actually a normal part of skin flora in healthy dogs; they only cause disease (demodicosis — patchy hair loss, often without much itching) when the immune system isn't functioning properly. Isoxazoline products have transformed the treatment of all three mite types.",
    textClinical: "Three clinically distinct genera: (1) Otodectes cynotis — superficial aural mite; causes intense pruritus, dark ceruminous discharge ('coffee grounds'), head shaking, and aural haematoma secondary to self-trauma; highly contagious between in-contact cats and dogs; must treat all in-contact animals simultaneously. (2) Sarcoptes scabiei var. canis — obligate burrowing mite; intense, often generalised pruritus (disproportionate to lesion severity); diagnostic pinnal-pedal reflex; zoonotic (temporary self-limiting infestation in humans). Serology (ELISA) supports diagnosis but cross-reacts with house dust mites. (3) Demodex canis / D. injai / D. gatoi (cats) — commensal follicular mite; demodicosis represents a failure of T-cell-mediated immune surveillance rather than primary parasite acquisition; localised (benign) vs generalised (requires investigation for underlying immunosuppression, endocrinopathy, neoplasia). Treatment: isoxazolines (afoxolaner, fluralaner, sarolaner, lotilaner) are now first-line for all three genera; selamectin and moxidectin (topical/injectable) for Otodectes and Sarcoptes. Doramectin (injectable) for refractory demodicosis."
},

zoonotic_parasites: {
    title: "Zoonotic Parasites (Human Health Implications)",
    group: "Antiparasitics",
    category: "Public Health",
    audience: ["vet", "owner"],
    difficulty: 2,
    textOwner: "Several common pet parasites can also infect humans — these are called 'zoonotic' parasites. The most important are roundworms (Toxocara canis in dogs, T. cati in cats), which can cause a rare but serious condition in children called Visceral Larva Migrans, where the larvae migrate through the body and can even damage the eyes. Hookworms can cause a skin rash called Cutaneous Larva Migrans. These risks are exactly why regular deworming is a genuine public health priority, not just about keeping your pet comfortable. Toxocara eggs passed in faeces take 2–4 weeks in the environment to become infectious, so clearing up faeces promptly is the simplest way to protect your family.",
    textClinical: "Principal zoonotic helminths in companion animal practice: Toxocara canis / T. cati — visceral, ocular (OLM), or neural larva migrans following ingestion of embryonated eggs from contaminated soil, particularly in children and the immunocompromised; Ancylostoma caninum / A. braziliense — cutaneous larva migrans (CLM) via percutaneous larval penetration, and eosinophilic enteritis in humans; Echinococcus granulosus / E. multilocularis — cystic or alveolar hydatid disease in peri-rural patients or raw-offal-fed dogs. Regular, evidence-based anthelmintic protocols (praziquantel for Taenia/Echinococcus, broad-spectrum nematocidal cover for Toxocara and Ancylostoma), prompt faecal disposal, and hand hygiene represent the combined public health strategy. These zoonotic considerations are a strong argument for maintaining structured, predictable deworming schedules rather than ad hoc prescribing."
},

ectoparasite_resistance: {
    title: "Ectoparasite Resistance (Flea & Tick Treatment Failures)",
    group: "Antiparasitics",
    category: "Drug Safety",
    audience: ["vet", "owner"],
    difficulty: 3,
    textOwner: "Just as bacteria can become resistant to antibiotics, flea and tick populations can develop resistance to the drugs designed to kill them. In the UK and across Europe, there is well-documented evidence that flea populations in some areas have become partially resistant to older products containing fipronil (such as Frontline). This means some pets treated correctly with these products may still have fleas — not due to user error, but because the local flea population has evolved to tolerate the drug. This is one reason many vets now recommend switching to a newer isoxazoline-class product when flea control appears to be failing despite correct application.",
    textClinical: "Phenotypic and molecular resistance to fipronil (a phenylpyrazole targeting the GABA-gated chloride channel) has been documented in Ctenocephalides felis populations in the UK, France, and several other European countries. Resistance mechanisms include upregulated cytochrome P450-mediated metabolic detoxification and target-site mutations. Clinical presentation: persistent flea burden on a compliant patient with a licensed fipronil product and no evidence of product failure or re-infestation from an untreated environment or in-contact animal. Management: switch to an isoxazoline-class product (class-wide resistance not yet clinically documented), treat all in-contact animals simultaneously, and implement environmental decontamination — spinosad or permethrin-based household sprays target larvae and pupae that no adulticide alone will kill. Permethrin resistance in Rhipicephalus sanguineus tick populations is an emerging concern in some endemic regions."
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


