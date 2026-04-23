const breedSpecificReferenceRanges = {
  // --- CANINE: "DEVIANT" OR HIGH-PRIORITY BREEDS ---
  "Golden Retriever": {
    "is_deviant": true,
    "sources": [
    {
    	"pmid": "39938895",
    	"clinical_note": "Naturally larger ventricular volumes and higher aortic velocities. Classed as a deviant breed compared to multi-breed nonsighthound PIs.",
        "reference": "Bagardi et al. (2025)",
        "metrics": {
    	"lvidd_mm": { "median": 42.45, "min": 34.6, "max": 50.8 },
    	"lvids_mm": { "median": 28.75, "min": 20.2, "max": 36.3 },
    	"la_ao": { "median": 1.35, "min": 1.03, "max": 1.63 },
    	"lvidd_n": { "median": 1.56, "min": 1.28, "max": 1.82 },
    	"edvi_smod_m2": { "median": 66.81, "min": 45.14, "max": 97.04 },
    	"esvi_smod_m2": { "median": 26.10, "min": 12.09, "max": 45.05 },
    	"edvi_smod_kg": { "median": 1.8, "min": 0.5 , "max": 3.1 },
    	"esvi_smod_kg": { "median": 0.7, "min": 0.3 , "max": 1.6 },
    	"ef": { "median": 59.55, "min": 38.64, "max": 78.11 },
    	"ao_vmax": { "median": 0.66, "max": 2.2 }
        }
    },
    {
      "reference": "Stepien et al. 2000",
      "pmid": "10647155",
      "clinical_note": "Earlier M-mode study with slightly different limits.",
      "metrics": {
        "lvidd_mm": { "min": 35.0, "max": 52.0 },
        "fs": { "min": 28, "max": 45 }
      }
    }
  ]
},
  "Boxer": {
    "is_deviant": true,
    "pmid": "24266948",
    "clinical_note": "Aortic velocities up to 2.4 m/s are physiological. ESVI limit for systolic dysfunction is 50 ml/m2, significantly higher than the standard 30 limit.",
    "lvidd_mm": { "min": 29.0, "max": 48.0 },
    "lvids_mm": { "min": 16.7, "max": 33.0 },
    "esvi_smod": { "max": 50.0 },
    "ao_vmax": { "max": 2.4 }
  },
  "Whippet": {
    "is_deviant": true,
    "pmid": "17491146",
    "clinical_note": "Athletic Heart phenotype. Conditioned agility/racing dogs show eccentric hypertrophy; standard multi-breed PIs will over-diagnose DCM.",
    "lvidd_cm": { "median": 3.75, "min": 3.02, "max": 4.44 },
    "lvids_cm": { "median": 2.84, "min": 2.10, "max": 3.63 },
    "ivsd_cm": { "median": 1.00, "min": 0.72, "max": 1.28 },
    "la_ao": { "median": 1.27, "min": 0.95, "max": 1.62 }
  },
"Newfoundland": {
    "is_deviant": true,
    "pmid": "33009675",
    "clinical_note": "Significant deviant in nonsighthound populations. AoVmax limit for screening is 2.0 m/s.",
    "ao_vmax": { "max": 2.0 }
  },
  "Cavalier King Charles Spaniel": {
    "is_deviant": true,
    "pmid": "31794915",
    "clinical_note": "Flatter mitral annulus. Up to 10% of healthy CKCS exceed the standard Stage B2 LVIDdN limit of 1.7. VHS up to 11.9 can be normal.",
    "la_ao": { "median": 1.03, "sd": 0.09 },
    "vhs_limit": 11.9
  },

  // --- DOG BREEDS: CERBU (2023) M-MODE DATASET ---
"Afghan Hound": {
    "is_deviant": true,
    "pmid": "37760386",
    "lvidd_mm": { "min": 33.0, "max": 52.0 },
    "lvids_mm": { "min": 20.0, "max": 37.0 },
    "ivsd_mm": { "min": 8.0, "max": 12.0 },
    "lvfwd_mm": { "min": 7.0, "max": 11.0 },
    "la_ao": { "max": 1.6 },
    "clinical_note": "Sighthound phenotype; naturally larger dimensions than general populations.",
    "reference": "Cerbu et al. (2023)"
  },
  "American Staffordshire Terrier": {
    "is_deviant": true,
    "pmid": "33559132",
    "clinical_note": "Naturally higher LVIDdN (mean 1.62 vs standard 1.53). Heart is more rounded than deep-chested breeds.",
    "lvidd_n": { "mean": 1.62 },
    "la_ao": { "mean": 1.37 },
    "ao_vmax": { "mean": 1.77 },
    "lvidd_mm": { "min": 34.4, "max": 51.2 },
    "lvids_mm": { "min": 17.6, "max": 36.9 },
    "ivsd_mm": { "min": 5.9, "max": 14.3},
    "lvfwd_mm": { "min": 6.2, "max": 12.1 }
  },
"Beagle": {
    "is_deviant": false,
    "pmid": "37760386",
    "lvidd_mm": { "min": 25.2, "max": 30.0 },
    "lvids_mm": { "min": 12.9, "max": 19.1 },
    "ivsd_mm": { "min": 7.7, "max": 10.5 },
    "lvfwd_mm": { "min": 7.8, "max": 9.2 }
  },
 "Great Dane": {
    "is_deviant": false,
    "pmid": "22882627",
    "clinical_note": "ESVI is more reliable for identifying preclinical DCM than FS in this breed.",
    "esvi_smod": { "note": "Breed-specific RI often lower than general giant breed expectations" }
  },
  "Dogue de Bordeaux": {
    "is_deviant": true,
    "pmid": "21414006",
    "clinical_note": "Naturally thicker myocardial walls; measurements frequently exceed multi-breed nonsighthound prediction intervals.",
    "ivsd_mm": { "min": 10.1, "max": 13.1 },
    "lvfwd_mm": { "min": 10.8, "max": 13.2 }
  },
  "Doberman Pinscher": {
    "is_deviant": false,
    "clinical_focus": "DCM occult stage",
    "LVIDd_mm": { "mean": 41.6, "sd": 3.4 },
    "LVIDs_mm": { "mean": 28.6, "sd": 2.5 },
    "EF": { "limit_lower": 40.0 },
    "VPC_24h_limit": 300,
    "clinical_note": "SMOD is the gold standard for detecting early eccentric remodelling in this breed. >300 VPCs/24h is diagnostic of occult DCM.",
    "reference": "Wess et al. (2010/2022)"
  },
  "Border Collie": {
    "is_deviant": false,
    "pmid": "37760386",
    "lvidd_mm": { "min": 24.3, "max": 41.4 },
    "lvids_mm": { "min": 17.9, "max": 31.6 },
    "ivsd_mm": { "min": 7.0, "max": 12.7 }
  },

  // --- CANINE: SMALL & TOY BREEDS ---
  "Toy Breeds (<5kg)": {
    "is_deviant": true,
    "pmid": "35813010",
    "clinical_note": "Standard 1.7 LVIDdN threshold is too high for dogs <5kg. Use 1.6 limit and 0.332 exponent for more accurate MMVD staging.",
    "lviddn": 1.6,
    "exponent": 0.332,
    "ivsd_cm": { "median": 0.59 },
    "lvidd_cm": { "median": 1.78 }
  },
  "Dachshund": {
    "is_deviant": false,
    "pmid": "27074212",
    "clinical_note": "Narrower PIs than multi-breed standards. Thicker septum and smaller LVIDd than generic dogs of similar weight.",
    "la_ao": { "mean": 1.40, "sd": 0.13 },
    "ivsd_mm": { "min": 4.6, "max": 7.8 },
    "lvidd_mm": { "min": 21.6, "max": 34.5 }
  },
  "Pug": {
    "is_deviant": true,
    "pmid": "35859155",
    "clinical_note": "Thoracic conformation affects windows. Measurements are influenced by intrathoracic pressure fluctuations from BOAS.",
    "la_ao": { "median": 1.30, "min": 0.97, "max": 1.63 },
    "lvidd_mm": { "median": 26.6, "min": 21.1, "max": 32.1 },
    "edvi_smod": { "median": 43.27, "min": 27.57, "max": 57.69 }
  },

  // --- FELINE BREEDS ---
  "Maine Coon": {
    "is_deviant": false,
    "pmid": "18274020",
    "clinical_note": "Despite larger raw measurements, healthy Maine Coons follow feline allometric scaling. Wall thickness <5mm is typical for average weights.",
    "lvidd_mm": { "min": 11.8, "max": 17.0 },
    "ivsd_mm": { "min": 3.7, "max": 5.8 }
  },
  "Sphynx": {
    "is_deviant": true,
    "pmid": "23131204",
    "clinical_note": "Naturally higher LA dimensions and LA:Ao ratios compared to DSH. High prevalence of MVD and HCM reported.",
    "la_ao": { "max": 1.45 },
    "lvidd_mm": { "min": 10.1, "max": 18.7 }
  },
  "Bengal": {
    "is_deviant": false,
    "pmid": "26526189",
    "clinical_note": "Higher raw LVIDd than DSH but aligns with allometry. Unique sex-based reference intervals are recommended.",
    "la_ao": { "mean": 1.18 }
  },

  // --- PEDIATRIC DATA ---
  "Healthy Kitten (6-16 weeks)": {
    "is_deviant": true,
    "pmid": "32812464",
    "clinical_note": "TR and low-grade murmurs are common and often benign. Median VHS is 9.5, significantly higher than the adult baseline.",
    "vhs": { "median": 9.5, "min": 8.0, "max": 10.9 },
    "nt_probnp": { "median": 31, "max": 75 },
    "tr_prevalence": "37.5%"
  }
};


