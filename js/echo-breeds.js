const breedSpecificReferenceRanges = {
  "Afghan Hound": {
    "is_deviant": true,
    "pmid": "37760386",
    "lvidd_mm": { "min": 33.0, "max": 52.0 },
    "lvids_mm": { "min": 20.0, "max": 37.0 },
    "ivsd_mm": { "min": 8.0, "max": 12.0 },
    "lvfwd_mm": { "min": 7.0, "max": 11.0 },
    "clinical_note": "Sighthound phenotype; naturally larger dimensions than general populations.",
    "reference": "Cerbu et al. (2023)"
  },

  "American Staffordshire Terrier": {
    "is_deviant": true,
    "pmid": "33563862",
    "clinical_note": "Naturally higher LVIDdN (mean 1.62 vs standard 1.53). Heart is more rounded than deep-chested breeds.",
    "reference": "Vezzosi et al. (2021)",
    "lvidd_n": { "mean": 1.62, "min": 1.27, "max": 1.87 },
    "la_ao": { "mean": 1.37, "min": 1.0, "max": 1.75 },
    "ao_vmax": { "mean": 1.77, "min": 1.17, "max": 2.45 },
    "lvidd_mm": { "min": 34.4, "max": 51.2 },
    "lvids_mm": { "min": 17.6, "max": 36.9 },
    "ivsd_mm": { "min": 5.9, "max": 14.3},
    "lvfwd_mm": { "min": 6.2, "max": 12.1 },
    "edvi_smod_m2": { "min": 37.1, "max": 86.7 },
    "esvi_smod_m2": { "min": 9.5, "max": 35.3 },
    "EF_PCT": { "min": 40.5, "max": 82.5 },
    "FS_PCT": { "min": 20.1, "max": 56.4 }
  },

  "Beagle": {
    "is_deviant": false,
    "pmid": "37760386",
    "reference": "Cerbu et al. (2023)",
    "lvidd_mm": { "min": 25.2, "max": 30.0 },
    "lvids_mm": { "min": 12.9, "max": 19.1 },
    "ivsd_mm": { "min": 7.7, "max": 10.5 },
    "lvfwd_mm": { "min": 7.8, "max": 9.2 }
  }, 

  "Border Collie": {
    "is_deviant": true,
    "pmid": "23643817",
    "reference": "Jacobson et al. (2013)", 
    "clinical_note": "Higher than average LVIDd and low FS compared to general population.",   
    "lvidd_mm": { "min": 35.03, "max": 38.32 },
    "lvids_mm": { "min": 25.06, "max": 28.17 },
    "ivsd_mm": { "min": 8.96, "max": 10.41 },
    "lvfwd_mm": { "min": 8.46, "max": 9.49},
    "la_ao": { "min": 1.12, "max": 1.29 }, // Fixed Nesting
    "FS_PCT": { "min": 25.28, "max": 29.73 },
    "ao_vmax": { "min": 1.31, "max": 1.55 }
  },

  "Boxer": {
    "is_deviant": true,
    "sources": [
      {
        "pmid": "37760386",
        "reference": "Cerbu et al. (2023)",
        "metrics": {
          "lvidd_mm": { "min": 29.0, "max": 48.0 },
          "lvids_mm": { "min": 16.7, "max": 33.0 },
          "ivsd_mm": { "min": 8.3, "max": 16.1 },
          "lvfwd_mm": { "min": 9.0, "max": 15.5 }
        }
      },
      {
        "pmid": "24428317",
        "reference": "Smets et al. (2014)",
        "clinical_note": "Aortic velocities up to 2.4 m/s are physiological. ESVI limit for systolic dysfunction is 50 ml/m2, significantly higher than the standard 30 limit.",
        "metrics": {
          "lvidd_mm": { "min": 32.8, "max": 46.4 },
          "lvids_mm": { "min": 19.9, "max": 34.7 },
          "esvi_smod": { "max": 50.0 },
          "ao_vmax": { "min": 1.26, "max": 2.34 },
          "edvi_smod_m2": { "median": 71, "min": 49, "max": 93 },
          "esvi_smod_m2": { "median": 36, "min": 22, "max": 50 },
          "edvi_smod_kg": { "min": 2.42 , "max": 4.38 },
          "esvi_smod_kg": { "min": 0.47 , "max": 2.19 },
          "EF_PCT": { "min": 35, "max": 63 },
          "FS_PCT": { "min": 18.5, "max": 44.1 }
        }
      }
    ]
  },

  "Cavalier King Charles Spaniel": {
    "is_deviant": true,
    "reference": "Cerbu et al. (2023)",
    "pmid": "37760386",
    "clinical_note": "Flatter mitral annulus. Up to 10% of healthy CKCS exceed the standard Stage B2 LVIDdN limit of 1.7. VHS up to 11.9 can be normal.",
    "lvidd_mm": { "min": 21.4, "max": 41.1 },
    "lvids_mm": { "min": 10.9, "max": 24.6 },
    "ivsd_mm": { "min": 4.8, "max": 8.8 },
    "lvfwd_mm": { "min": 4.9, "max": 8.5 }
  },

  "Dachshund": {
    "is_deviant": false,
    "DataCheck": true,
    "sources": [
      {
        "pmid": "30605275", 
        "reference": "Garncarz et al. (2018)", // Fixed Quote
        "metrics": {
          "lvidd_mm": { "min": 17.6, "max": 34.7 },
          "lvids_mm": { "min": 7.2, "max": 22.1 },
          "ivsd_mm": { "min": 4.5, "max": 10.9 },
          "lvfwd_mm": { "min": 3.9, "max": 11.4 }
        }
      },
      {
        "pmid": "27027836",
        "reference": "Lim et al. (2016)",
        "clinical_note": "Narrower PIs than multi-breed standards. Thicker septum and smaller LVIDd than generic dogs of similar weight.",
        "metrics": {
          "lvidd_mm": { "min": 20.8, "max": 34.5 },
          "lvids_mm": { "min": 10.4, "max": 22.2 },
          "ivsd_mm": { "min": 4.8, "max": 7.9 },
          "lvfwd_mm": { "min": 4.9, "max": 8.4 },
          "la_ao": { "min": 1.14, "max": 1.66 }, // Fixed Nesting
          "FS_PCT": { "min": 31.2, "max": 51.6 }
        }
      }
    ]
  },

  "Dogue de Bordeaux": {
    "clinical_note": "Naturally thicker myocardial walls; measurements frequently exceed multi-breed nonsighthound prediction intervals.",
    "reference": "Cerbu et al. (2023)",
    "is_deviant": true,
    "pmid": "37760386",
    "ivsd_mm": { "min": 10.1, "max": 13.1 },
    "lvfwd_mm": { "min": 10.8, "max": 13.2 }
  },

  "Doberman Pinscher": {
    "is_deviant": false,
    "sources": [
      {
        "clinical_note": "SMOD is the gold standard for detecting early eccentric remodelling in this breed. >300 VPCs/24h is diagnostic of occult DCM.",
        "reference": "Wess et al. (2010/2022)",
        "metrics": {
          "EF": { "min": 40.0 },
          "VPC_24h_limit": 300
        }
      },
      {
        "pmid": "35775866",
        "reference": "de Lima et al. (2006)",
        "clinical_note": "Brazilian Police Dog population, limited study population",
        "metrics": {
          "ivsd_mm": { "min": 5.9, "max": 10.7 },
          "lvidd_mm": { "min": 34.8, "max": 48.4 },
          "lvfwd_mm": { "min": 5.3, "max": 10.4 },
          "lvids_mm": { "min": 23.6, "max": 33.6 },
          "la_ao": { "min": 1.0, "max": 1.39 },
          "FS_PCT": { "min": 29.1, "max": 34.4 },
          "EF_PCT": { "min": 66.9, "max": 77.3 }
        }
      }
    ] 
  },

  "German Shepherd": {
    "is_deviant": false,
    "sources": [
      {
        "pmid": "16645347",
        "reference": "Muzzi et al. (2006)",
        "metrics": {
          "lvidd_mm": { "min": 31.7, "max": 51.7 },
          "lvids_mm": { "min": 20.8, "max": 41.2 },
          "FS": { "min": 15.6, "max": 41.6 },
          "ivsd_mm": { "min": 7.8, "max": 11.4 },
          "lvfwd_mm": { "min": 6.6, "max": 11 }
        }
      },
      {
        "pmid": "17009513",
        "reference": "Kayar et al. (2006)",
        "clinical_note": "Dogs split into ages and sexes, overall min and max confidence intervals for whole group quoted here.",
        "metrics": {
          "lvidd_mm": { "min": 40.4, "max": 60.6 },
          "lvids_mm": { "min": 27.1, "max": 42.2 },
          "ivsd_mm": { "min": 6.6, "max": 12.8 },
          "lvfwd_mm": { "min": 6.8, "max": 12.1 }
        }
      },
      {
        "pmid": "35775866",
        "reference": "de Lima et al. (2006)",
        "clinical_note": "Brazilian Police Dog population",
        "metrics": {
          "lvidd_mm": { "min": 32.1, "max": 50.1 },
          "lvids_mm": { "min": 16.8, "max": 36.0 },
          "ivsd_mm": { "min": 7.3, "max": 14.1 },
          "lvfwd_mm": { "min": 7.3, "max": 11.3 }
        }
      }
    ]
  }, 

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
      }
    ]
  },

  "Great Dane": {
    "DataCheck": true,
    "is_deviant": false,
    "pmid": "22882627",
    "reference": "Stephenson et al. (2012)",
    "clinical_note": "ESVI is more reliable for identifying preclinical DCM than FS in this breed.",
    "lvidd_mm": { "min": 42.7, "max": 58.7 },
    "lvids_mm": { "min": 28.8, "max": 41.9 },
    "EF": { "min": 42.1, "max": 63.9 },
    "FS": { "min": 20, "max": 37 },
    "la_ao": { "min": 0.91, "max": 1.41 },
    "esvi_smod_m2": { "min": 21.9, "max": 47.0 },
    "lvidd_n": { "min": 1.3, "max": 1.64 }
  },

  "Labrador Retriever": {
    "reference": "Cerbu et al. (2023)",
    "is_deviant": false,
    "pmid": "37760386",
    "ivsd_mm": { "min": 5.6, "max": 13.5 },
    "lvidd_mm": { "min": 27.0, "max": 45.3 },
    "lvfwd_mm": { "min": 6.8, "max": 11.3 },
    "lvids_mm": { "min": 14.5, "max": 36.8 }
  },

  "Pug": {
    "is_deviant": true,
    "pmid": "35854376",
    "reference": "Wiegel et al. (2022)", 
    "clinical_note": "Thoracic conformation affects windows. Measurements are influenced by intrathoracic pressure fluctuations from BOAS.",
    "la_ao": { "median": 1.30, "min": 0.97, "max": 1.63 },
    "lvidd_mm": { "median": 26.6, "min": 21.1, "max": 32.1 },
    "edvi_smod_m2": { "median": 43.27, "min": 27.57, "max": 57.69 },
    "esvi_smod_m2": { "min": 8.61, "max": 28.46 },
    "lvids_mm": { "min": 14.6, "max": 23.4 },
    "ivsd_mm": { "min": 5.5, "max": 10.9 },
    "lvfwd_mm": { "min": 6.6, "max": 9.9 },
    "FS_PCT": { "min": 18.7, "max": 43.8 },
    "EF_PCT": { "min": 45.4, "max": 75.3 },
    "ao_vmax": { "min": 0.94,"max": 1.75 },
    "edvi_smod_kg": { "min": 1.32 , "max": 2.79 },
    "esvi_smod_kg": { "min": 0.43 , "max": 1.43 }
  },

  "Whippet": {
    "is_deviant": true,
    "sources": [
      {
        "pmid": "36975003",
        "reference": "Stepien et al. (2023)",
        "clinical_note": "Athletic Heart phenotype. Conditioned agility/racing dogs show eccentric hypertrophy; standard multi-breed PIs will over-diagnose DCM.",
        "metrics": {
          "lvidd_mm": { "median": 37.5, "min": 30.2, "max": 44.4 },
          "lvids_mm": { "median": 28.4, "min": 21.0, "max": 36.3 },
          "ivsd_mm": { "median": 10.0, "min": 7.2, "max": 12.8 },
          "lvfwd_mm": { "min": 6.1, "max": 11.3 },
          "la_ao": { "median": 1.27, "min": 0.95, "max": 1.62 },
          "LAD_mm": { "min": 28.1, "max": 41.4 },
          "ao_vmax": { "max": 1.99 },
          "edvi_smod_kg": { "min": 2.42 , "max": 4.38 },
          "esvi_smod_kg": { "min": 0.47 , "max": 2.19 },
          "lvidd_n": { "min": 1.28, "max": 1.77 }
        }
      },
      {
        "pmid": "17508509", // Standardized to String
        "reference": "Bavegems et al. (2007)", 
        "metrics": {
          "lvidd_mm": { "median": 37.3, "min": 29.7, "max": 44.8 },
          "lvids_mm": { "median": 26.9, "min": 19.8, "max": 34.1 },
          "ivsd_mm": { "median": 9.4, "min": 7.0, "max": 11.8 },
          "lvfwd_mm": { "min": 6.6, "max": 10.9 },
          "la_ao": { "median": 1.4, "min": 1.1, "max": 1.7 }, // Fixed Nesting
          "LAD_mm": { "min": 26.5, "max": 37.6 },
          "esvi_smod_m2": { "min": 21.1, "max": 76.6 },
          "EF_PCT": { "min": 45.1, "max": 77.5 },
          "FS_PCT": { "min": 17.4, "max": 38.1 },
          "ao_vmax": { "mean": 1.39, "min": 0.9, "max": 1.89 }
        }
      }
    ]
  },

  "Toy Breeds (<5kg)": {
    "is_deviant": true,
    "reference": "Isayama et al. (2022)",
    "pmid": "35812853",
    "clinical_note": "Standard 1.7 LVIDdN threshold is too high for dogs <5kg. Use 1.6 limit and 0.332 exponent for more accurate MMVD staging.",
    "lviddn": { "max": 1.6 },
    "exponent": 0.332,
    "ivsd_cm": { "median": 0.59 },
    "lvidd_cm": { "median": 1.78 }
  },

  "Maine Coon": {
    "pmid": "15776945",
    "reference": "Drourr et al. (2005)",
    "clinical_note": "Despite larger raw measurements, healthy Maine Coons follow feline allometric scaling. Wall thickness <5mm is typical for average weights.",
    "lvidd_mm": { "min": 18.1, "max": 18.9 },
    "ivsd_mm": { "min": 3.9, "max": 4.1},
    "lvids_mm": { "min": 8.5, "max": 9.3 },
    "lvfwd_mm": { "min": 4.2, "max": 4.4 },
    "la_ao": { "min": 1.2, "max": 1.26 },
    "FS_PCT": { "min": 50.35, "max": 53.35 }
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

  "Healthy Kitten (6-16 weeks)": {
    "is_deviant": true,
    "pmid": "32812464",
    "clinical_note": "TR and low-grade murmurs are common and often benign. Median VHS is 9.5, significantly higher than the adult baseline.",
    "vhs": { "median": 9.5, "min": 8.0, "max": 10.9 },
    "nt_probnp": { "median": 31, "max": 75 },
    "tr_prevalence": "37.5%"
  }
};

const allometricModels = {
    "cornell_canine": {
        label: "Cornell Standard (Canine)",
        species: "dog",
        params: {
            lvidd: { a: 1.53, b: 0.294, limit: 1.7, type: "power" }, // Linear Power: Y = a * BW^b
            lvids: { a: 0.82, b: 0.315, limit: 1.26, type: "power" },
            la:    { a: 0.88, b: 0.355, limit: 1.17, type: "power" },
            lad:   { a: 1.10, b: 0.309, limit: 1.6, type: "power" }
        }
    },
    "esser_non_sighthound": {
        label: "Esser (Non-Sighthound)",
        species: "dog",
        params: {
            lvidd: { a: 1.48, b: 0.31, limit: 1.75, type: "power" },
            // ... add other Esser parameters
        }
    },
    "feline_kitten_visser": {
        label: "Kitten (Visser 2022)",
        species: "cat",
        params: {
            // Note: These use the Log10 coefficients from your previous table
            la:  { a: -0.099, b: 0.275, se: 0.0422, type: "log" }, 
            lad: { a: -0.077, b: 0.289, se: 0.0461, type: "log" },
            ao:  { a: -0.235, b: 0.292, se: 0.037, type: "log" }
        }
    }
};