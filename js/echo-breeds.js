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
    "la_ao": { "min": 1.12, "max": 1.29 }, 
    "FS_PCT": { "min": 25.28, "max": 29.73 },
    "ao_vmax": { "min": 1.31, "max": 1.55 }
  },
  "Borzoi": {
    "is_deviant": false,
    "sources": [
      {
        "pmid": "38154250", 
        "reference": "Wesselowski et al. (2024) Male dogs",
        "metrics": {
          "lvidd_mm": { "min": 38.7, "max": 51.2 },
          "lvids_mm": { "min": 26.5, "max": 38.3 },
          "ivsd_mm": { "min": 8.3, "max": 13.3 },
          "lvfwd_mm": { "min": 8.8, "max": 14.9 },
          "ao_vmax": { "min": 0.85, "max": 2.07 },
          "edvi_smod_kg": { "min": 1.16 , "max": 3.33 },
          "esvi_smod_kg": { "min": 0.3 , "max": 1.55 },
          "EF_PCT": { "min": 47.95, "max": 83.95 },
          "FS_PCT": { "min": 20.85, "max": 35.95 },
          "TAPSE_mm": {  "min": 9.8, "max": 22.4 },
	  "la_ao": { "min": 1.1, "max": 1.44 },
	  "lad": { "min": 36.2, "max": 52.1 }
        }
      },
      {
        "pmid": "38154250",
        "reference": "Wesselowski et al. (2024) Female dogs",
        "clinical_note": "Echocardiographic screening for DCM in Borzoi should be considered",
        "metrics": {
          "lvidd_mm": { "min": 37.0, "max": 50.6 },
          "lvids_mm": { "min": 24.6, "max": 37.5 },
          "ivsd_mm": { "min": 7.1, "max": 12.4 },
          "lvfwd_mm": { "min": 7.1, "max": 13.3 },
          "ao_vmax": { "min": 0.9, "max": 2.09 },
          "edvi_smod_kg": { "min": 1.1 , "max": 3.42 },
          "esvi_smod_kg": { "min": 0.36 , "max": 1.60 },
          "EF_PCT": { "min": 50.02, "max": 76.8 },
          "FS_PCT": { "min": 21.12, "max": 36.61 },
          "TAPSE_mm": {  "min": 9.7, "max": 18.7 },
	  "la_ao": { "min": 1.06, "max": 1.51 },
	  "lad": { "min": 34.4, "max": 48.5}
        }
      }
    ]
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
          "esv_smod": { "max": 50.0 },
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
    "reference": "Misbach et al. (2013)",
    "pmid": "24834861",
    "clinical_note": "Flatter mitral annulus. Up to 10% of healthy CKCS exceed the standard Stage B2 LVIDdN limit of 1.7. VHS up to 11.9 can be normal.",
    "lvidd_mm": { "min": 21.4, "max": 41.1 },
    "lvids_mm": { "min": 10.9, "max": 24.6 },
    "ivsd_mm": { "min": 4.8, "max": 8.8 },
    "lvfwd_mm": { "min": 4.9, "max": 8.5 },
    "FS_PCT": { "min": 31, "max": 50.8 },
    "ao_vmax": { "min": 0.8, "max": 1.62 },
  },

  "Dachshund": {
    "is_deviant": false,
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
  
      "English Setter": {
    "is_deviant": true,
    "pmid": "34517274",
    "reference": "Vatne et al. (2021)", 
    "clinical_note": "The upper limits of the intervals for left-atrial-to-aortic ratios and normalised left ventricular volumes exceeded those of various, previously published studies of other breeds.",
    "la_ao": {  "min": 1.2, "max": 1.7 },
    "lvidd_mm": { "min": 32.7, "max": 55.6 },
    "edvi_smod_m2": { "min": 64.9, "max": 136.5 },
    "esvi_smod_m2": { "min": 23.1, "max": 71.9},
    "edvi_smod_kg": { "min": 2.4, "max": 4.8 },
    "esvi_smod_kg": { "min": 0.8, "max": 2.7},
    "lvids_mm": { "min": 21.6, "max": 40.5 },
    "ivsd_mm": { "min": 7, "max": 12.5 },
    "lvfwd_mm": { "min": 7.1, "max": 11.2 },
    "FS_PCT": { "min": 15.9, "max": 34.5 },
    "EF_PCT": { "min": 36.2, "max": 68.7 },
    "ao_vmax": { "min": 1.1,"max": 2.1 },    
    "lad": { "min": 30.2, "max": 47.9},
    "lad_n": { "min": 1.3, "max": 1.8},
    "lvidd_n": {  "min": 1.4, "max": 2.0 },
    "lvids_n": {  "min": 0.9, "max": 1.5 },
    "TAPSE_mm": {  "min": 13.9, "max": 23.7 },
    "TAPSE_Ao": {  "min": 0.6, "max": 1 },
    "eivrt": {  "min": 0.4, "max": 1.4 }
},
 
    "English Springer Spaniel": {
    "is_deviant": true,
    "pmid": "27492994",
    "reference": "Dickson et al. (2016)", 
    "clinical_note": "Large globoid heart and low resting FS and EF mean that DCM is potentially overdiagnosed in the breed.",
    "la_ao": {  "min": 1.06, "max": 1.65 },
    "lvidd_mm": { "median": 43.8, "min": 35, "max": 47.8 },
    "edvi_smod_m2": { "median": 77.7, "min": 58.1, "max": 114 },
    "esvi_smod_m2": { "min": 20.6, "max": 68.1 },
    "lvids_mm": { "min": 22.6, "max": 39 },
    "ivsd_mm": { "min": 7.7, "max": 12.2 },
    "lvfwd_mm": { "min": 6.5, "max": 10.9 },
    "FS_PCT": { "min": 16, "max": 35.9 },
    "EF_PCT": { "min": 36, "max": 68.2 },
    "ao_vmax": { "min": 1.05,"max": 1.87 },    
    "lad": { "min": 30.7, "max": 42.5 }
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
  
    "Hungarian Vizsla": {
    "is_deviant": false,
    "pmid": "19584035",
    "reference": "Vörös et al. (2009)", 
    "la_ao": { "median": 1.2, "sd": 0.1 },
    "lvidd_mm": { "median": 42.9, "sd": 4.9 },
    "lvids_mm": { "median": 26.7, "sd": 4.3 },
    "ivsd_mm": { "median":10.6, "sd": 1.4 },
    "lvfwd_mm": { "median": 11.1, "sd": 1.6 },
    "FS_PCT": { "median": 38.6, "sd": 5.1 },
    "EF_PCT": { "median": 68.8, "sd": 6.5 },
    "lad": { "median": 36.8, "sd": 4.4 }
  },
      "Hungarian Mudi": {
    "is_deviant": false,
    "pmid": "19584035",
    "reference": "Vörös et al. (2009)", 
    "la_ao": { "median": 1.3, "sd": 0.1 },
    "lvidd_mm": { "median": 33.6, "sd": 2.8 },
    "lvids_mm": { "median": 21.4, "sd": 2.1 },
    "ivsd_mm": { "median":8.4, "sd": 1 },
    "lvfwd_mm": { "median": 9.2, "sd": 1.1 },
    "FS_PCT": { "median": 36.3, "sd": 4.6 },
    "EF_PCT": { "median": 67, "sd": 5.8 },
    "lad": { "median": 27.4, "sd": 3.0 }
  },
    "Hungarian Greyhound": {
    "is_deviant": true,
    "pmid": "19584035",
    "reference": "Vörös et al. (2009)", 
    "la_ao": { "median": 1.2, "sd": 0.1 },
    "lvidd_mm": { "median": 45.3, "sd": 3 },
    "lvids_mm": { "median": 28.9, "sd": 3.8 },
    "ivsd_mm": { "median":11.8, "sd": 1.7 },
    "lvfwd_mm": { "median": 12.3, "sd": 1.5 },
    "FS_PCT": { "median": 36.8, "sd": 6.3 },
    "EF_PCT": { "median": 65.8, "sd": 8.3 },
    "lad": { "median": 41.7, "sd": 2.7 }
  },
  
    "Irish Wolfhound": {
    "reference": "Tyrrell et al. (2020)",
    "is_deviant": false,
    "pmid": "32112595",
    "ivsd_mm": { "min": 5.6, "max": 13.5 },
    "lvidd_mm": { "min": 44.4, "max": 60.1 },
    "FS": { "min": 26.8, "max": 48.8 },
    "la_ao": { "min": 0.88, "max": 1.36  },
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
        "pmid": "17508509", 
        "reference": "Bavegems et al. (2007)", 
        "metrics": {
          "lvidd_mm": { "median": 37.3, "min": 29.7, "max": 44.8 },
          "lvids_mm": { "median": 26.9, "min": 19.8, "max": 34.1 },
          "ivsd_mm": { "median": 9.4, "min": 7.0, "max": 11.8 },
          "lvfwd_mm": { "min": 6.6, "max": 10.9 },
          "la_ao": { "median": 1.4, "min": 1.1, "max": 1.7 }, 
          "LAD_mm": { "min": 26.5, "max": 37.6 },
          "esvi_smod_m2": { "min": 21.1, "max": 76.6 },
          "EF_PCT": { "min": 45.1, "max": 77.5 },
          "FS_PCT": { "min": 17.4, "max": 38.1 },
          "ao_vmax": { "mean": 1.39, "min": 0.9, "max": 1.89 }
        }
      },
      { 
           "pmid": "26476964", 
        "reference": "Seckerdieck et al. (2015)", 
        "metrics": {
          "lvidd_mm": { "median": 35, "min": 28.2, "max": 41.5 },
          "lvids_mm": { "median": 25.5, "min": 18, "max": 32.6 },
          "ivsd_mm": { "median": 9.4, "min": 6.7, "max": 12.2 },
          "lvfwd_mm": { "median": 9.1, "min": 6.6, "max": 10.9 },
          "la_ao": { "median": 1.35, "min": 1.15, "max": 1.64 },        
          "FS_PCT": { "min": 16, "max": 38 },
          "ao_vmax": { "mean": 1.72, "min": 1.2, "max": 2.23 },
          "edv_smod": {  "min": 27, "max": 67 },
          "esv_smod": { "min": 7, "max": 33 },
          "edvi_smod_m2": {  "min": 59, "max": 109 },
          "esvi_smod_m2": { "min": 16, "max": 55 },
          "EF_PCT": { "min": 45, "max": 70 }
      }
      }
    ]
  },
  "Saluki": {
    "is_deviant": true,
        "pmid": "26476964", 
        "reference": "Seckerdieck et al. (2015)", 
          "lvidd_mm": { "median": 40.8, "min": 33.9, "max": 47.8 },
          "lvids_mm": { "median": 31.3, "min": 24, "max": 38.8},
          "ivsd_mm": { "median": 10.5, "min": 7.3, "max": 13.5 },
          "lvfwd_mm": { "median": 10.4, "min": 8.4, "max": 12.3 },
          "la_ao": { "median": 1.33, "min": 1.18, "max": 1.49 },        
          "FS_PCT": { "min": 12, "max": 34 },
          "ao_vmax": { "min": 0.97, "max": 1.96 },
          "edv_smod": {  "min": 49, "max": 103 },
          "esv_smod": { "min": 20, "max": 53 },
          "edvi_smod_m2": {  "min": 68, "max": 127 },
          "esvi_smod_m2": { "min": 26, "max": 65 },
          "EF_PCT": { "min": 41, "max": 64 }
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
    "cornell_standard": {
        label: "Standard Canine (Cornell)",
        species: "canine",
        reference: "Cornell et al. (2004)", 
        isCm: true,
        clinicalNote: "Original allometric dataset. Included sighthound breeds so this skews dataset somewhat as they are outliers typically. LAD included from Marchesotti et al. (2019)",
        pmid: "15188817",
        params: {
            lvidd: { a: 1.53, b: 0.294, normMin: 1.27, normMax: 1.85, type: "norm" },
            lvids: { a: 0.95, b: 0.315, normMin: 0.71, normMax: 1.26, type: "norm" },
            ivsd:  { a: 0.41, b: 0.241, normMin: 0.29, normMax: 0.59, type: "norm" },
            ivss:  { a: 0.58, b: 0.240, normMin: 0.43, normMax: 0.79, type: "norm" },
            lvpwd: { a: 0.42, b: 0.232, normMin: 0.29, normMax: 0.60, type: "norm" },
            lvpws: { a: 0.64, b: 0.222, normMin: 0.48, normMax: 0.87, type: "norm" },
            ao:    { a: 0.78, b: 0.292, normMin: 0.63, normMax: 0.96, type: "norm" },
            la:    { a: 0.76, b: 0.355, normMin: 0.59, normMax: 0.97, type: "norm" },
            lad:   { a: 1.10, b: 0.309, normMin: 0.89, normMax: 1.6, type: "norm" }
        }
    },
    "esser_non_sighthound": {
        label: "Non-Sighthound (Esser)",
        species: "canine",
        reference: "Esser et al. (2020)",
        pmid: "33009675",
        isCm: true,
        clinicalNote: "Revision of Cornell allometric dataset. Deliberately excluded sighthound breeds so this doesn't skew the dataset. LAD included from Marchesotti et al. (2019)",
        params: {
            lvidd: { a: 1.38, b: 0.322, normMin: 1.17, normMax: 1.63, type: "norm" },
            lvids: { a: 0.87, b: 0.346, normMin: 0.70, normMax: 1.09, type: "norm" },
            ivsd:  { a: 0.36, b: 0.289, normMin: 0.27, normMax: 0.49, type: "norm" },
            ivss:  { a: 0.51, b: 0.276, normMin: 0.38, normMax: 0.68, type: "norm" },
            lvpwd: { a: 0.40, b: 0.261, normMin: 0.30, normMax: 0.53, type: "norm" },
            lvpws: { a: 0.60, b: 0.247, normMin: 0.46, normMax: 0.78, type: "norm" },
            ao:    { a: 0.78, b: 0.292, normMin: 0.63, normMax: 0.96, type: "norm" },
            la:    { a: 0.76, b: 0.355, normMin: 0.59, normMax: 0.97, type: "norm" },
            lad:   { a: 1.10, b: 0.309, normMin: 0.89, normMax: 1.6, type: "norm" }
        }
    },
    "stepien_sighthound": {
        label: "Sighthound/Whippet (Stepien)",
	species: "canine",
 	reference: "Stepien et al. (2023)",
        breed: "Whippet",
        pmid: "36975003",
        isCm: true,
        clinicalNote: "Specific to North American Whippets. Higher ranges account for 'Athletic Heart' phenotype in conditioned dogs. Apply to other sighthounds with care.",
        params: {
        // b = scaling exponent, normMin/Max calculated from SE of Y estimate
        lvidd: { a: 1.51, b: 0.332, normMin: 1.13, normMax: 2.01, type: "norm" },
        lvids: { a: 0.89, b: 0.433, normMin: 0.60, normMax: 1.33, type: "norm" },
        ivsd:  { a: 0.55, b: 0.222, normMin: 0.35, normMax: 0.86, type: "norm" },
        lvpwd: { a: 0.35, b: 0.335, normMin: 0.21, normMax: 0.57, type: "norm" },
        lad:   { a: 1.20, b: 0.391, normMin: 0.91, normMax: 1.58, type: "norm" }
    }
    },
"isayama_toy_breed_2022": {
    label: "Toy Breed (Isayama)",
    species: "canine",
    pmid: "35812853",
    reference: "Isayama et al. (2022)",
    isCm: true, // Constants are in cm
    clinicalNote: "Specific to toy breeds (e.g., Chihuahua, Yorkie, Toy Poodle). These breeds often have smaller heart dimensions relative to BW compared to standard models. Study was specific to dogs <5kg.",
    params: {
        // b = Exponent, a = 50th %, normMin = 2.5th %, normMax = 97.5th %
        lvidd: { a: 1.26, b: 0.332, normMin: 1.02, normMax: 1.57, type: "norm" },
        lvids: { a: 0.78, b: 0.263, normMin: 0.54, normMax: 1.15, type: "norm" },
        ivsd:  { a: 0.34, b: 0.486, normMin: 0.15, normMax: 0.77, type: "norm" },
        ivss:  { a: 0.62, b: 0.238, normMin: 0.46, normMax: 0.83, type: "norm" },
        lvpwd: { a: 0.43, b: 0.275, normMin: 0.33, normMax: 0.57, type: "norm" },
        lvpws: { a: 0.57, b: 0.310, normMin: 0.43, normMax: 0.75, type: "norm" },
        ao:    { a: 0.91, b: 0.183, normMin: 0.70, normMax: 1.18, type: "norm" },
        la:    { a: 0.92, b: 0.345, normMin: 0.65, normMax: 1.30, type: "norm" }
    }
},
"sisson_puppy_1991": {
    label: "Puppy (Sisson)",
    species: "canine",
    pmid: "1767977",
    reference: "Sisson and Schaeffer (1991)",
    isCm: false, // Constants are already in mm
    clinicalNote: "Applicable to growing puppies (1wk–1yr). **CARE - OLDER PAPER BASED ON SMALL SAMPLE SIZE OF ENGLISH POINTERS.** Puppy measurements should always be interpreted with great care, and very few studies have reported on allometric scaling as yet. Note: Reference ranges calculated using Natural Log SEE (base e) from Table 2 in paper.",
    params: {
        // a = antilog(ln a) in mm, b = exponent, normMin/Max = a * e^(+/- 1.96 * SEE)
        lvidd: { a: 11.63, b: 0.409, normMin: 9.94, normMax: 13.60, type: "norm" },
        lvids: { a: 6.76,  b: 0.445, normMin: 5.32, normMax: 8.60, type: "norm" },
        ivsd:  { a: 2.36,  b: 0.367, normMin: 1.74, normMax: 3.19, type: "norm" }, 
        ivss:  { a: 4.13,  b: 0.319, normMin: 3.43, normMax: 4.97, type: "norm" },
        lvpwd: { a: 2.47,  b: 0.348, normMin: 1.92, normMax: 3.18, type: "norm" }, 
        lvpws: { a: 4.50,  b: 0.313, normMin: 3.66, normMax: 5.53, type: "norm" },
        ao:    { a: 7.28,  b: 0.401, normMin: 6.27, normMax: 8.45, type: "norm" },
        la:    { a: 7.22,  b: 0.380, normMin: 6.02, normMax: 8.65, type: "norm" }
    }
},
"karsten_adult_cat": {
    label: "Adult Cat (Karsten)",
    species: "feline",
    pmid: "28993567",
    isCm: false,
    reference: "Karsten et al. (2017)",
    clinicalNote: "Applicable to adult cats. Measurements are 2D-derived. Ventricular data (LVDd, IVSd, LVPWd) uses Short-axis 2D measurements; Max LAD uses Long-axis 2D.",
    params: {
        lvidd: { a: 9.96, b: 0.247, normMin: 7.74, normMax: 12.82, type: "norm" },
        ivsd:  { a: 3.73, b: 0.177, normMin: 2.77, normMax: 5.01,  type: "norm" },
        lvpwd: { a: 3.21, b: 0.212, normMin: 2.59, normMax: 3.97,  type: "norm" },
        lad:   { a: 11.23, b: 0.177, normMin: 9.24, normMax: 13.65, type: "norm" }
    }
},
    "visser_kitten": {
        label: "Kitten Growth (Visser)",
        species: "feline",
        reference: "Visser et al. (2022)",
        pmid: "32812464",
        isCm: true,
        clinicalNote: "Applicable to growing kittens (6–16 weeks). Calibrated for pediatric feline heart development. Discrepancy Note: Values here are 95% intervals, the paper published a table that seemingly uses 90% intervals and mislabelled.",
params: {
        // Data from Source 1: a is the log-intercept, b is the exponent
        lad:   { a: -0.077, b: 0.289, see: 0.0461, type: "log_direct" }, // Left atrial diam (Lx)
        rad:   { a: -0.016, b: 0.316, see: 0.0498, type: "log_direct" }, // Right atrial diam (Lx)
        la:    { a: -0.099, b: 0.275, see: 0.0422, type: "log_direct" }, // Left atrium (Sx)
        ao:    { a: -0.235, b: 0.292, see: 0.0370, type: "log_direct" }, // Aorta
        lvidd: { a: 0.046,  b: 0.278, see: 0.0509, type: "log_direct" }, // LVIDd (M-mode, Sx)
        lvids: { a: -0.296, b: 0.376, see: 0.0989, type: "log_direct" }, // LVIDs (M-mode, Sx)
        ivsd:  { a: -0.510, b: 0.274, see: 0.0672, type: "log_direct" }, // IVSd (M-mode, Sx)
        lvpwd: { a: -0.507, b: 0.213, see: 0.0758, type: "log_direct" },  // LVFWd (M-mode, Sx)
        rvidd: { a: -0.328, b: 0.255, see: 0.109, type: "log_direct" }, // RVIDd ( Sx)
    }
    }
};

const mineModels = {
    mine_1: {
        label: "MINE 1 (Vezzosi 2021 - 4 Parameter)",
        variables: ['laAo', 'lviddn', 'fs', 'eVel'],
        ranges: {
            laAo: [ { max: 1.7, pts: 1 }, { max: 1.9, pts: 2 }, { max: 2.5, pts: 3 }, { max: Infinity, pts: 4 } ],
            lviddn: [ { max: 1.7, pts: 1 }, { max: 2.0, pts: 2 }, { max: 2.3, pts: 3 }, { max: Infinity, pts: 4 } ],
            fs: [ { max: 45, pts: 1 }, { max: 50, pts: 2 }, { max: Infinity, pts: 3 } ],
            eVel: [ { max: 1.2, pts: 1 }, { max: 1.5, pts: 2 }, { max: Infinity, pts: 3 } ]
        },
        tiers: [
            { min: 4, max: 5, label: "Mild Severity", mst: "2344 days", class: "mild" },
            { min: 6, max: 7, label: "Moderate Severity", mst: "1882 days", class: "moderate" },
            { min: 8, max: 12, label: "Severe Severity", mst: "623 days", class: "severe" },
            { min: 13, max: 14, label: "Late Stage Severity", mst: "157 days", class: "late" }
        ]
    },
    mine_2: {
        label: "MINE 2 (Vezzosi 2025 - 3 Parameter Simplified)",
        variables: ['laAo', 'lviddn', 'eVel'],
        ranges: {
            laAo: [ { max: 1.7, pts: 1 }, { max: 1.9, pts: 2 }, { max: 2.5, pts: 3 }, { max: Infinity, pts: 4 } ],
            lviddn: [ { max: 1.7, pts: 1 }, { max: 2.0, pts: 2 }, { max: 2.3, pts: 3 }, { max: Infinity, pts: 4 } ],
            eVel: [ { max: 1.2, pts: 1 }, { max: 1.5, pts: 2 }, { max: Infinity, pts: 3 } ]
        },
        tiers: [
            { min: 3, max: 4, label: "Mild Risk / Lower Progression", mst: "2604 days", class: "mild" },
            { min: 5, max: 6, label: "Moderate Risk / Intermediate Progression", mst: "1216 days", class: "moderate" },
            { min: 7, max: 10, label: "Severe Risk (Advanced B2 Status)", mst: "718 days", class: "severe" },
            { min: 11, max: 12, label: "Late Stage C / D", mst: "152 days (estimated)", class: "late" }
        ]
    }
};

const diastolicRules = {
    ear: [
        { min: 0, max: 0.99, category: 'Impaired Relaxation', grade: 'Grade I', points: 3 },
        { min: 1.0, max: 1.99, category: 'Normal / Pseudonormal Overlap', grade: 'Normal', points: 0 },
        { min: 2.0, max: Infinity, category: 'Restrictive Filling', grade: 'Grade III', points: 4 }
    ],
    eivrt: [
        { min: 0, max: 1.49, category: 'Normal Flow Timing', grade: 'Normal', points: 0 },
        { min: 1.5, max: 2.49, category: 'Elevated Filling Pressure', grade: 'Grade II', points: 2 },
        { min: 2.5, max: Infinity, category: 'Severe Left Atrial Pressure', grade: 'Grade III', points: 4 }
    ],
    eePrime: [
        { min: 0, max: 7.99, category: 'Normal Basal Velocity', grade: 'Normal', points: 0 },
        { min: 8.0, max: 12.0, category: 'Elevated Filling Pressure', grade: 'Grade II', points: 3 },
        { min: 12.01, max: Infinity, category: 'Severe Left Atrial Pressure', grade: 'Grade III', points: 4 }
    ],
    lveio: [
        { min: 0, max: 7.99, category: 'Normal Outflow Ratio', grade: 'Normal', points: 0 },
        { min: 8.0, max: 11.84, category: 'Elevated Filling Pressure', grade: 'Grade II', points: 3 },
        { min: 11.85, max: Infinity, category: 'Severe Left Atrial Pressure', grade: 'Grade III', points: 4 }
    ],
    laAo: [
        { min: 0, max: 1.59, category: 'Normal Atrial Size', grade: 'Normal', points: 0 },
        { min: 1.6, max: 1.99, category: 'Mild-Moderate Atrial Enlargement', grade: 'Grade II', points: 2 },
        { min: 2.0, max: Infinity, category: 'Severe Atrial Enlargement', grade: 'Grade III', points: 3 }
    ],
    ivrt: [
        { min: 80.01, max: Infinity, category: 'Prolonged Relaxation', grade: 'Grade I', points: 2 },
        { min: 50.0, max: 80.0, category: 'Normal / Pseudonormal Overlap', grade: 'Normal', points: 0 },
        { min: 0, max: 49.99, category: 'Severe Restrictive Blunting', grade: 'Grade III', points: 3 }
    ],
    mdt: [
        { min: 100.01, max: Infinity, category: 'Prolonged Deceleration', grade: 'Grade I', points: 2 },
        { min: 60.0, max: 100.0, category: 'Normal / Pseudonormal Overlap', grade: 'Normal', points: 0 },
        { min: 0, max: 59.99, category: 'Severe Restrictive Acceleration', grade: 'Grade III', points: 3 }
    ],
    trMax: [
        { min: 0, max: 2.79, category: 'Normal Pulmonary Velocity', grade: 'Normal', points: 0 },
        { min: 2.8, max: 3.4, category: 'Pulmonary Hypertension / High LAP', grade: 'Grade II', points: 3 },
        { min: 3.41, max: Infinity, category: 'Severe Pulmonary Hypertension', grade: 'Grade III', points: 4 }
    ]
};


// --- Right Heart Allometric Models ---
const rightHeartModels = {

    gentile_solomon_2016: {
        label: "Gentile-Solomon Functional Metrics",
        species: "Canine",
        PMID: 27453517,
        params: {
            tapse: { a: 3.98, b: 0.352, see: 1.08 },
            rvwt:  { a: 0.22, b: 0.284, see: 0.05, multiplier: 10 }, // cm -> mm

            //  (Grosso 2023)
            mpamin: { type: 'log_direct', a: -0.084, b: 0.306, see: 0.042, multiplier: 10 },
            rpamax: { type: 'log_direct', a: -0.201, b: 0.335, see: 0.061, multiplier: 10 },
            rpamin: { type: 'log_direct', a: -0.439, b: 0.364, see: 0.079, multiplier: 10 }
        }
    },
    feldhutter_2022: {
        label: "Feldhutter (2022) 3D & Functional Model",
        species: "Canine",
        PMID: 34874066,
        params: {
            rveda:    { type: 'log_direct', a: -0.004, b: 0.665, see: 0.094 }, 
            rvesa:    { type: 'log_direct', a: -0.296, b: 0.695, see: 0.126 },
            tapse:    { type: 'log_direct', a: 0.790,  b: 0.285, see: 0.087 },
            rvedv:    { type: 'log_direct', a: 0.235,  b: 0.942, see: 0.109 }, 
            rvesv:    { type: 'log_direct', a: -0.095, b: 0.962, see: 0.118 }, 
            rvSPrime: { type: 'log_direct', a: -1.076, b: 0.186, see: 0.113 },
            
            //  (linear models)
            rad:      { a: 1.12, b: 0.341, see: 0.18, multiplier: 10 }, // cm -> mm
            rvd1:     { a: 0.92, b: 0.298, see: 0.19, multiplier: 10 },  // cm -> mm

            //  Vascular scaling (Grosso 2023)
            mpamin: { type: 'log_direct', a: -0.084, b: 0.306, see: 0.042, multiplier: 10 },
            rpamax: { type: 'log_direct', a: -0.201, b: 0.335, see: 0.061, multiplier: 10 },
            rpamin: { type: 'log_direct', a: -0.439, b: 0.364, see: 0.079, multiplier: 10 }
        }
    }
};

// --- Left Heart Volumetric Models ---
const leftHeartModels = {
wess_2021_smod_sighthound: {
        label: "Wess SMOD Volumetric RIs (Sighthound)",
        species: "Canine",
        PMID: 33783907,
        type: 'interpolation_table',
        data: [
            { weight: 1, edvMin: 2.4, edvMax: 12.9, esvMin: 0.9, esvMax: 5.1 },
            { weight: 2, edvMin: 3.4, edvMax: 14.7, esvMin: 1.3, esvMax: 5.9 },
            { weight: 3, edvMin: 4.9, edvMax: 16.9, esvMin: 1.9, esvMax: 6.9 },
            { weight: 4, edvMin: 6.7, edvMax: 19.7, esvMin: 2.7, esvMax: 8.3 },
            { weight: 5, edvMin: 9.1, edvMax: 23.7, esvMin: 3.8, esvMax: 10.1 },
            { weight: 6, edvMin: 11.8, edvMax: 29.0, esvMin: 5.0, esvMax: 12.5 },
            { weight: 7, edvMin: 14.7, edvMax: 35.3, esvMin: 6.3, esvMax: 15.4 },
            { weight: 8, edvMin: 17.5, edvMax: 41.6, esvMin: 7.6, esvMax: 18.3 },
            { weight: 9, edvMin: 20.1, edvMax: 47.3, esvMin: 8.9, esvMax: 21.0 },
            { weight: 10, edvMin: 22.4, edvMax: 52.5, esvMin: 10.0, esvMax: 23.5 },
            { weight: 12.5, edvMin: 28.3, edvMax: 65.4, esvMin: 12.8, esvMax: 29.8 },
            { weight: 15, edvMin: 33.8, edvMax: 78.0, esvMin: 15.5, esvMax: 35.9 },
            { weight: 17.5, edvMin: 38.8, edvMax: 89.5, esvMin: 18.0, esvMax: 41.6 },
            { weight: 20, edvMin: 43.3, edvMax: 99.9, esvMin: 20.2, esvMax: 46.8 },
            { weight: 22.5, edvMin: 47.4, edvMax: 109.1, esvMin: 22.3, esvMax: 51.5 },
            { weight: 25, edvMin: 50.9, edvMax: 117.2, esvMin: 24.2, esvMax: 55.7 },
            { weight: 27.5, edvMin: 54.1, edvMax: 124.3, esvMin: 25.8, esvMax: 59.5 },
            { weight: 30, edvMin: 57.2, edvMax: 131.3, esvMin: 27.5, esvMax: 63.1 },
            { weight: 32.5, edvMin: 60.6, edvMax: 139.2, esvMin: 29.2, esvMax: 67.1 },
            { weight: 35, edvMin: 64.3, edvMax: 147.7, esvMin: 30.9, esvMax: 71.2 },
            { weight: 37.5, edvMin: 68.1, edvMax: 156.5, esvMin: 32.7, esvMax: 75.4 },
            { weight: 40, edvMin: 71.6, edvMax: 165.0, esvMin: 34.4, esvMax: 79.4 },
            { weight: 42.5, edvMin: 74.7, edvMax: 172.4, esvMin: 35.8, esvMax: 82.9 },
            { weight: 45, edvMin: 77.4, edvMax: 178.8, esvMin: 37.1, esvMax: 85.9 },
            { weight: 47.5, edvMin: 79.8, edvMax: 184.5, esvMin: 38.2, esvMax: 88.6 },
            { weight: 50, edvMin: 82.1, edvMax: 189.9, esvMin: 39.3, esvMax: 91.1 },
            { weight: 52.5, edvMin: 84.4, edvMax: 195.4, esvMin: 40.3, esvMax: 93.8 },
            { weight: 55, edvMin: 86.7, edvMax: 201.0, esvMin: 41.4, esvMax: 96.5 },
            { weight: 57.5, edvMin: 89.0, edvMax: 206.7, esvMin: 42.6, esvMax: 99.3 },
            { weight: 60, edvMin: 91.4, edvMax: 212.6, esvMin: 43.7, esvMax: 102.3 },
            { weight: 62.5, edvMin: 93.7, edvMax: 218.7, esvMin: 44.9, esvMax: 105.4 },
            { weight: 65, edvMin: 96.1, edvMax: 224.9, esvMin: 46.0, esvMax: 108.6 },
            { weight: 67.5, edvMin: 98.4, edvMax: 231.4, esvMin: 47.2, esvMax: 112.0 },
            { weight: 70, edvMin: 100.7, edvMax: 238.2, esvMin: 48.3, esvMax: 115.6 },
            { weight: 72.5, edvMin: 102.9, edvMax: 245.3, esvMin: 49.5, esvMax: 119.4 },
            { weight: 75, edvMin: 105.1, edvMax: 252.8, esvMin: 50.6, esvMax: 123.5 },
            { weight: 77.5, edvMin: 107.1, edvMax: 260.7, esvMin: 51.7, esvMax: 127.9 },
            { weight: 80, edvMin: 109.0, edvMax: 269.2, esvMin: 52.7, esvMax: 132.6 }
        ]
    },
    
    
    wess_2021_smod_nonsighthound: {
        label: "Wess SMOD Volumetric RIs (Non-Sighthound)",
        species: "Canine",
        PMID: 33783907,
        type: 'interpolation_table',
        data: [
            { weight: 1, edvMin: 1.4, edvMax: 4.7, esvMin: 0.4, esvMax: 1.5 },
            { weight: 2, edvMin: 2.8, edvMax: 7.2, esvMin: 0.9, esvMax: 2.3 },
            { weight: 3, edvMin: 4.0, edvMax: 10.1, esvMin: 1.4, esvMax: 3.5 },
            { weight: 4, edvMin: 5.4, edvMax: 13.3, esvMin: 1.9, esvMax: 4.8 },
            { weight: 5, edvMin: 6.8, edvMax: 16.8, esvMin: 2.5, esvMax: 6.2 },
            { weight: 6, edvMin: 8.1, edvMax: 20.1, esvMin: 3.1, esvMax: 7.6 },
            { weight: 7, edvMin: 9.3, edvMax: 23.1, esvMin: 3.6, esvMax: 9.0 },
            { weight: 8, edvMin: 10.4, edvMax: 25.8, esvMin: 4.1, esvMax: 10.1 },
            { weight: 9, edvMin: 11.4, edvMax: 28.2, esvMin: 4.4, esvMax: 11.0 },
            { weight: 10, edvMin: 12.4, edvMax: 30.8, esvMin: 4.8, esvMax: 11.8 },
            { weight: 11, edvMin: 13.6, edvMax: 33.8, esvMin: 5.2, esvMax: 13.0 },
            { weight: 12, edvMin: 15.0, edvMax: 37.3, esvMin: 5.8, esvMax: 14.4 },
            { weight: 13, edvMin: 16.6, edvMax: 41.2, esvMin: 6.5, esvMax: 16.2 },
            { weight: 14, edvMin: 18.4, edvMax: 45.5, esvMin: 7.3, esvMax: 18.2 },
            { weight: 15, edvMin: 20.2, edvMax: 50.1, esvMin: 8.2, esvMax: 20.3 },
            { weight: 16, edvMin: 22.0, edvMax: 54.6, esvMin: 9.1, esvMax: 22.5 },
            { weight: 17, edvMin: 23.8, edvMax: 59.0, esvMin: 9.9, esvMax: 24.7 },
            { weight: 18, edvMin: 25.6, edvMax: 63.4, esvMin: 10.8, esvMax: 26.9 },
            { weight: 19, edvMin: 27.3, edvMax: 67.6, esvMin: 11.7, esvMax: 29.1 },
            { weight: 20, edvMin: 29.0, edvMax: 71.8, esvMin: 12.5, esvMax: 31.2 },
            { weight: 22.5, edvMin: 32.9, edvMax: 81.4, esvMin: 14.4, esvMax: 35.8 },
            { weight: 25, edvMin: 36.2, edvMax: 89.6, esvMin: 16.0, esvMax: 39.7 },
            { weight: 27.5, edvMin: 38.8, edvMax: 96.1, esvMin: 17.3, esvMax: 42.9 },
            { weight: 30, edvMin: 41.1, edvMax: 101.6, esvMin: 18.4, esvMax: 45.6 },
            { weight: 32.5, edvMin: 43.3, edvMax: 107.1, esvMin: 19.5, esvMax: 48.2 },
            { weight: 35, edvMin: 45.5, edvMax: 112.6, esvMin: 20.5, esvMax: 50.8 },
            { weight: 37.5, edvMin: 47.8, edvMax: 118.3, esvMin: 21.5, esvMax: 53.3 },
            { weight: 40, edvMin: 50.1, edvMax: 124.0, esvMin: 22.5, esvMax: 56.0 },
            { weight: 42.5, edvMin: 52.4, edvMax: 129.9, esvMin: 23.6, esvMax: 58.7 },
            { weight: 45, edvMin: 54.8, edvMax: 135.8, esvMin: 24.8, esvMax: 61.5 },
            { weight: 47.5, edvMin: 57.3, edvMax: 142.0, esvMin: 26.0, esvMax: 64.5 },
            { weight: 50, edvMin: 59.9, edvMax: 148.5, esvMin: 27.2, esvMax: 67.8 },
            { weight: 52.5, edvMin: 62.7, edvMax: 155.4, esvMin: 28.6, esvMax: 71.3 },
            { weight: 55, edvMin: 65.6, edvMax: 162.8, esvMin: 30.1, esvMax: 75.0 },
            { weight: 57.5, edvMin: 68.7, edvMax: 170.7, esvMin: 31.6, esvMax: 79.0 },
            { weight: 60, edvMin: 72.1, edvMax: 179.0, esvMin: 33.3, esvMax: 83.3 },
            { weight: 62.5, edvMin: 75.6, edvMax: 187.9, esvMin: 35.1, esvMax: 87.8 },
            { weight: 65, edvMin: 79.3, edvMax: 197.4, esvMin: 37.0, esvMax: 92.7 },
            { weight: 67.5, edvMin: 83.3, edvMax: 207.4, esvMin: 39.0, esvMax: 98.0 },
            { weight: 70, edvMin: 87.4, edvMax: 218.1, esvMin: 41.1, esvMax: 103.6 },
            { weight: 72.5, edvMin: 91.7, edvMax: 229.4, esvMin: 43.2, esvMax: 109.7 },
            { weight: 75, edvMin: 96.1, edvMax: 241.6, esvMin: 45.4, esvMax: 116.3 },
            { weight: 77.5, edvMin: 100.6, edvMax: 254.6, esvMin: 47.6, esvMax: 123.6 },
            { weight: 80, edvMin: 105.2, edvMax: 268.6, esvMin: 49.8, esvMax: 131.6 }
        ]
    }
};

