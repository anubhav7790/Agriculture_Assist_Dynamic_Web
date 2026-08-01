export const safetyCrops = [
  {
    id: "rice",
    icon: "🌾",
    name: { en: "Rice", hi: "धान" },
    season: { en: "Kharif", hi: "खरीफ" },
    commonRisks: {
      en: ["Stem borer", "Leaf folder", "Sheath blight", "Brown planthopper"],
      hi: ["तना छेदक", "लीफ फोल्डर", "शीथ ब्लाइट", "ब्राउन प्लांटहॉपर"]
    },
    safetyFocus: {
      en: "Avoid spraying before rain and watch water channels near paddy fields.",
      hi: "बारिश से पहले छिड़काव न करें और धान के खेतों के आसपास पानी की निकासी पर ध्यान दें।"
    },
    sprayWindow: {
      en: "Early morning or late afternoon, when wind is low and standing water overflow is controlled.",
      hi: "सुबह जल्दी या शाम को, जब हवा कम हो और खेत में पानी का बहाव नियंत्रित हो।"
    },
    doList: {
      en: ["Check bunds and outlets before spray", "Use gloves and mask near standing water", "Inspect pest level before repeating spray"],
      hi: ["स्प्रे से पहले मेड़ और निकासी जांचें", "खड़े पानी के पास दस्ताने और मास्क पहनें", "दोबारा स्प्रे से पहले कीट स्तर देखें"]
    },
    dontList: {
      en: ["Do not spray before heavy rain", "Do not let chemical runoff enter ponds", "Do not mix products without advice"],
      hi: ["तेज़ बारिश से पहले स्प्रे न करें", "रसायन को तालाब या नाली में न जाने दें", "बिना सलाह के मिश्रण न बनाएं"]
    },
    recommendedChemicalIds: ["chlorpyrifos", "mancozeb", "imidacloprid"]
  },
  {
    id: "wheat",
    icon: "🌾",
    name: { en: "Wheat", hi: "गेहूं" },
    season: { en: "Rabi", hi: "रबी" },
    commonRisks: {
      en: ["Aphids", "Rust disease", "Termite attack"],
      hi: ["माहू", "रतुआ रोग", "दीमक का प्रकोप"]
    },
    safetyFocus: {
      en: "Use the correct dose and avoid repeated spray cycles without field inspection.",
      hi: "सही मात्रा का उपयोग करें और खेत की जांच बिना बार-बार छिड़काव न करें।"
    },
    sprayWindow: {
      en: "Best during cool hours after dew dries but before strong afternoon sun.",
      hi: "ओस सूखने के बाद और दोपहर की तेज धूप से पहले ठंडे समय में सबसे अच्छा।"
    },
    doList: {
      en: ["Inspect lower canopy for aphids", "Record spray interval", "Keep fertilizer and pesticide handling separate"],
      hi: ["निचली पत्तियों में माहू देखें", "स्प्रे अंतराल नोट करें", "उर्वरक और कीटनाशक की हैंडलिंग अलग रखें"]
    },
    dontList: {
      en: ["Do not over-spray just because yellowing appears", "Do not skip PPE in winter fog", "Do not store products near grain bags"],
      hi: ["सिर्फ पीलापन देखकर अधिक स्प्रे न करें", "सर्दी के कोहरे में PPE न छोड़ें", "दवा को अनाज की बोरियों के पास न रखें"]
    },
    recommendedChemicalIds: ["mancozeb", "chlorpyrifos", "urea"]
  },
  {
    id: "cotton",
    icon: "🧵",
    name: { en: "Cotton", hi: "कपास" },
    season: { en: "Kharif", hi: "खरीफ" },
    commonRisks: {
      en: ["Whitefly", "Bollworm", "Sucking pests"],
      hi: ["सफेद मक्खी", "बॉलवर्म", "रस चूसने वाले कीट"]
    },
    safetyFocus: {
      en: "Protect skin fully because cotton spraying often requires repeated exposure hours.",
      hi: "त्वचा को पूरी तरह ढकें क्योंकि कपास में छिड़काव के दौरान लंबे समय तक रसायनों का संपर्क हो सकता है।"
    },
    sprayWindow: {
      en: "Spray only in calm weather and use directional coverage because the canopy is dense.",
      hi: "शांत मौसम में ही स्प्रे करें और दिशा-नियंत्रित कवरेज रखें क्योंकि फसल घनी होती है।"
    },
    doList: {
      en: ["Use full sleeves and goggles", "Target lower leaf surface", "Monitor resistance before repeating same insecticide"],
      hi: ["फुल स्लीव और चश्मा पहनें", "पत्तियों की निचली सतह पर ध्यान दें", "एक ही दवा दोहराने से पहले रेसिस्टेंस पर ध्यान दें"]
    },
    dontList: {
      en: ["Do not spray at midday heat", "Do not touch concentrate directly", "Do not let children enter field immediately after spray"],
      hi: ["दोपहर की गर्मी में स्प्रे न करें", "सांद्र दवा को सीधे हाथ से न छुएं", "स्प्रे के तुरंत बाद बच्चों को खेत में न जाने दें"]
    },
    recommendedChemicalIds: ["imidacloprid", "chlorpyrifos", "mancozeb"]
  },
  {
    id: "vegetables",
    icon: "🥬",
    name: { en: "Vegetables", hi: "सब्जियां" },
    season: { en: "All season", hi: "सभी मौसम" },
    commonRisks: {
      en: ["Fruit borer", "Fungal spots", "Residue risk before harvest"],
      hi: ["फल छेदक", "फफूंद के धब्बे", "कटाई से पहले अवशेष का खतरा"]
    },
    safetyFocus: {
      en: "Follow waiting period carefully because vegetables are sold quickly after harvest.",
      hi: "वेटिंग पीरियड का ध्यान रखें क्योंकि सब्जियां कटाई के तुरंत बाद बाज़ार में जाती हैं।"
    },
    sprayWindow: {
      en: "Prefer evening sprays on tender leaves and always check the label interval before harvest.",
      hi: "कोमल पत्तियों पर शाम का स्प्रे बेहतर रहता है और कटाई से पहले लेबल अंतराल जरूर देखें।"
    },
    doList: {
      en: ["Use low-residue options when possible", "Wash harvest crates separately", "Maintain spray date record"],
      hi: ["संभव हो तो कम अवशेष वाले विकल्प लें", "कटाई की पेटियों को अलग रखें", "स्प्रे की तारीख दर्ज करें"]
    },
    dontList: {
      en: ["Do not spray just before harvest", "Do not reuse vegetable crates for chemical storage", "Do not exceed label dose"],
      hi: ["कटाई से ठीक पहले स्प्रे न करें", "सब्जी की पेटियों का रसायन भंडारण में उपयोग न करें", "लेबल से अधिक मात्रा न दें"]
    },
    recommendedChemicalIds: ["mancozeb", "imidacloprid", "glyphosate", "neem-oil"]
  },
  {
    id: "maize",
    icon: "🌽",
    name: { en: "Maize", hi: "मक्का" },
    season: { en: "Kharif / Rabi", hi: "खरीफ / रबी" },
    commonRisks: {
      en: ["Fall armyworm", "Stem borer", "Leaf blight", "Waterlogging"],
      hi: ["फॉल आर्मीवर्म", "तना छेदक", "लीफ ब्लाइट", "जलभराव"]
    },
    safetyFocus: {
      en: "Scout the field before spray because maize damage is often patch-based, not uniform.",
      hi: "स्प्रे से पहले खेत की जांच करें क्योंकि मक्का में नुकसान अक्सर पूरे खेत में समान नहीं होता।"
    },
    sprayWindow: {
      en: "Spot treatment is often safer than whole-field repeat spray.",
      hi: "अक्सर पूरे खेत में दोहराव वाले स्प्रे से बेहतर स्पॉट ट्रीटमेंट होता है।"
    },
    doList: {
      en: ["Inspect whorl area carefully", "Use directed spray only where infestation exists", "Wear a mask in dusty fields"],
      hi: ["व्हॉर्ल क्षेत्र को ध्यान से देखें", "जहां प्रकोप हो वहीं निर्देशित स्प्रे करें", "धूल भरे खेतों में मास्क पहनें"]
    },
    dontList: {
      en: ["Do not treat every patch the same way", "Do not work in strong hot wind", "Do not ignore leaf blight symptoms"],
      hi: ["हर हिस्से का एक जैसा उपचार न करें", "तेज़ गर्म हवा में काम न करें", "लीफ ब्लाइट के लक्षणों को नजरअंदाज न करें"]
    },
    recommendedChemicalIds: ["chlorpyrifos", "mancozeb", "neem-oil"]
  },
  {
    id: "mustard",
    icon: "🌼",
    name: { en: "Mustard", hi: "सरसों" },
    season: { en: "Rabi", hi: "रबी" },
    commonRisks: {
      en: ["Aphids", "Alternaria blight", "Pod damage"],
      hi: ["माहू", "अल्टरनेरिया ब्लाइट", "फली को नुकसान"]
    },
    safetyFocus: {
      en: "Avoid harsh spraying during flowering to protect pollinators and pod setting.",
      hi: "फूल आने के समय तेज़ स्प्रे से बचें ताकि परागण और फली बनना प्रभावित न हो।"
    },
    sprayWindow: {
      en: "Spray only when bee activity is low, preferably late evening if essential.",
      hi: "जरूरी होने पर मधुमक्खियों की गतिविधि कम होने पर, बेहतर है शाम को स्प्रे करें।"
    },
    doList: {
      en: ["Observe flowering stage", "Choose targeted pest control", "Keep pollinator safety in mind"],
      hi: ["फूल आने की अवस्था पर ध्यान दें", "लक्षित कीट नियंत्रण चुनें", "परागण करने वाले कीटों की सुरक्षा का ध्यान रखें"]
    },
    dontList: {
      en: ["Do not spray during peak pollinator activity", "Do not assume every yellow patch is aphid damage", "Do not skip gloves"],
      hi: ["मधुमक्खियों की अधिक गतिविधि के समय स्प्रे न करें", "हर पीले हिस्से को माहू का नुकसान न मानें", "दस्ताने न छोड़ें"]
    },
    recommendedChemicalIds: ["imidacloprid", "mancozeb", "neem-oil"]
  },
  {
    id: "sugarcane",
    icon: "🎋",
    name: { en: "Sugarcane", hi: "गन्ना" },
    season: { en: "Long duration crop", hi: "लंबी अवधि की फसल" },
    commonRisks: {
      en: ["Early shoot borer", "Pyrilla", "Red rot", "Trash burning risk"],
      hi: ["अर्ली शूट बोरर", "पाइरिला", "रेड रॉट", "कचरा जलाने का जोखिम"]
    },
    safetyFocus: {
      en: "Because the crop is tall and dense, full body protection and directional spraying matter more.",
      hi: "क्योंकि फसल लंबी और घनी होती है, इसलिए पूरे शरीर की सुरक्षा और सही दिशा में स्प्रे बहुत महत्वपूर्ण है।"
    },
    sprayWindow: {
      en: "Use lane-wise movement and never rush through dense rows without full protection.",
      hi: "लाइन के हिसाब से चलें और घनी कतारों में बिना पूरी सुरक्षा के जल्दीबाजी में काम न करें।"
    },
    doList: {
      en: ["Wear full sleeves and boots", "Keep sprayer hose untangled", "Check disease spread before chemical decision"],
      hi: ["फुल स्लीव और बूट पहनें", "स्प्रे पाइप को उलझने न दें", "दवा तय करने से पहले रोग का फैलाव देखें"]
    },
    dontList: {
      en: ["Do not burn trash near chemical storage", "Do not enter dense crop without goggles", "Do not assume all cane yellowing is nutrient issue"],
      hi: ["रसायन भंडारण के पास कचरा न जलाएं", "बिना चश्मे के घनी फसल में न जाएं", "हर पीलापन सिर्फ पोषण समस्या है ऐसा न मानें"]
    },
    recommendedChemicalIds: ["chlorpyrifos", "copper-oxychloride", "urea"]
  }
];

export const safetyChemicals = [
  {
    id: "chlorpyrifos",
    name: "Chlorpyrifos 20% EC",
    category: { en: "Insecticide", hi: "कीटनाशक" },
    riskLevel: { en: "High caution", hi: "उच्च सावधानी" },
    waitingPeriod: { en: "21 days before harvest", hi: "कटाई से 21 दिन पहले तक" },
    reEntry: { en: "12 hours", hi: "12 घंटे" },
    targetCrops: { en: ["Rice", "Cotton", "Wheat", "Maize"], hi: ["धान", "कपास", "गेहूं", "मक्का"] },
    instruction: "Wear gloves, avoid skin exposure, and do not spray near water sources. Wash thoroughly after use.",
    summary: {
      en: "Useful for chewing insects, but strict PPE and dose control are necessary.",
      hi: "चबाने वाले कीटों के लिए उपयोगी, लेकिन सख्त सुरक्षा उपकरण और सही मात्रा जरूरी है।"
    },
    beforeSpray: {
      en: ["Check nozzle leakage and wear gloves, mask, cap, goggles, and full sleeves.", "Do not mix stronger doses assuming faster control.", "Keep children, animals, and feed away from the spray zone."],
      hi: ["नोज़ल लीकेज जांचें और दस्ताने, मास्क, टोपी, चश्मा और फुल स्लीव कपड़े पहनें।", "तेज़ असर के लिए अधिक मात्रा मिलाने की गलती न करें।", "बच्चों, पशुओं और चारे को छिड़काव क्षेत्र से दूर रखें।"]
    },
    duringSpray: {
      en: ["Spray only in calm wind conditions.", "Walk backward while spraying to avoid direct drift on your body.", "Avoid eating, smoking, or touching the face during work."],
      hi: ["केवल कम हवा की स्थिति में छिड़काव करें।", "छिड़काव करते समय पीछे की ओर चलते रहें ताकि स्प्रे शरीर पर न आए।", "काम के दौरान खाना, धूम्रपान या चेहरे को छूना बंद रखें।"]
    },
    afterSpray: {
      en: ["Wash hands, face, and exposed skin with soap immediately.", "Wash clothes separately from family clothes.", "Store leftover chemical in its original labeled container."],
      hi: ["काम के तुरंत बाद हाथ, चेहरा और खुली त्वचा को साबुन से धोएं।", "कपड़ों को परिवार के बाकी कपड़ों से अलग धोएं।", "बचा हुआ रसायन उसी लेबल वाले मूल डिब्बे में रखें।"]
    },
    firstAid: {
      en: "If dizziness, vomiting, or irritation starts, move to fresh air and seek medical help with the product label.",
      hi: "यदि चक्कर, उल्टी या जलन शुरू हो तो तुरंत खुली हवा में जाएं और दवा का लेबल साथ लेकर डॉक्टर को दिखाएं।"
    }
  },
  {
    id: "mancozeb",
    name: "Mancozeb 75% WP",
    category: { en: "Fungicide", hi: "फफूंदनाशक" },
    riskLevel: { en: "Moderate caution", hi: "मध्यम सावधानी" },
    waitingPeriod: { en: "10 days before harvest", hi: "कटाई से 10 दिन पहले तक" },
    reEntry: { en: "8 hours", hi: "8 घंटे" },
    targetCrops: { en: ["Rice", "Wheat", "Vegetables", "Mustard"], hi: ["धान", "गेहूं", "सब्जियां", "सरसों"] },
    instruction: "Use mask and cover eyes while mixing powder. Avoid spray drift and wash after field work.",
    summary: {
      en: "Good for fungal disease management, especially leaf spot and blight conditions.",
      hi: "फफूंद रोग प्रबंधन के लिए उपयोगी, खासकर लीफ स्पॉट और ब्लाइट जैसी स्थितियों में।"
    },
    beforeSpray: {
      en: ["Mix powder slowly to avoid inhalation.", "Prepare only the required amount for one spray cycle.", "Wear mask and goggles before opening the packet."],
      hi: ["पाउडर को धीरे-धीरे मिलाएं ताकि सांस के साथ अंदर न जाए।", "एक बार के छिड़काव के लिए जितनी जरूरत हो उतनी ही मात्रा तैयार करें।", "पैकेट खोलने से पहले मास्क और चश्मा पहनें।"]
    },
    duringSpray: {
      en: ["Maintain even coverage on both sides of leaves.", "Do not spray under strong sunlight at noon.", "Avoid mixing with unknown combinations without expert advice."],
      hi: ["पत्तियों के दोनों ओर समान रूप से स्प्रे करें।", "दोपहर की तेज धूप में छिड़काव न करें।", "विशेषज्ञ सलाह के बिना अनजाने मिश्रण न बनाएं।"]
    },
    afterSpray: {
      en: ["Clean spray tank and nozzle with fresh water.", "Do not dump leftover solution near wells or ponds.", "Record spray date for safe harvest planning."],
      hi: ["स्प्रे टैंक और नोज़ल को साफ पानी से धोएं।", "बचा हुआ घोल कुएं या तालाब के पास न फेंकें।", "सुरक्षित कटाई योजना के लिए छिड़काव की तारीख लिखकर रखें।"]
    },
    firstAid: {
      en: "If powder enters eyes, rinse gently with clean water for several minutes and consult a doctor.",
      hi: "यदि पाउडर आंख में चला जाए तो कई मिनट तक साफ पानी से धोएं और डॉक्टर से सलाह लें।"
    }
  },
  {
    id: "imidacloprid",
    name: "Imidacloprid 17.8% SL",
    category: { en: "Systemic insecticide", hi: "सिस्टमिक कीटनाशक" },
    riskLevel: { en: "Moderate caution", hi: "मध्यम सावधानी" },
    waitingPeriod: { en: "7 days before harvest", hi: "कटाई से 7 दिन पहले तक" },
    reEntry: { en: "6 hours", hi: "6 घंटे" },
    targetCrops: { en: ["Cotton", "Vegetables", "Rice", "Mustard"], hi: ["कपास", "सब्जियां", "धान", "सरसों"] },
    instruction: "Use in recommended dose for sucking pests. Avoid excessive repeat spraying.",
    summary: {
      en: "Effective for whitefly and sucking pests, but resistance risk increases if overused.",
      hi: "व्हाइटफ्लाई और रस चूसने वाले कीटों के लिए प्रभावी, लेकिन अधिक उपयोग से रेसिस्टेंस बढ़ सकता है।"
    },
    beforeSpray: {
      en: ["Confirm pest type before spray to avoid unnecessary use.", "Wear mask and avoid touching concentrate directly.", "Keep bees away from recent spray areas."],
      hi: ["छिड़काव से पहले कीट की सही पहचान करें।", "मास्क पहनें और सांद्र दवा को सीधे हाथ से न छुएं।", "मधुमक्खियों को हाल ही में स्प्रे किए गए क्षेत्र से दूर रखें।"]
    },
    duringSpray: {
      en: ["Target lower leaf surface where sucking pests stay.", "Use measured dose only once in the schedule recommended by experts.", "Do not combine with random pesticides to avoid crop stress."],
      hi: ["पत्तियों की निचली सतह पर ध्यान दें जहां ये कीट रहते हैं।", "विशेषज्ञों द्वारा सुझाई गई अनुसूची में केवल नापी हुई मात्रा का उपयोग करें।", "फसल पर तनाव से बचने के लिए बिना सोचे-समझे मिश्रण न करें।"]
    },
    afterSpray: {
      en: ["Restrict field entry for children and animals for the recommended interval.", "Store container away from sunlight and drinking water.", "Monitor pest response before planning the next spray."],
      hi: ["निर्धारित समय तक बच्चों और पशुओं को खेत में न जाने दें।", "डिब्बे को धूप और पीने के पानी से दूर रखें।", "अगला छिड़काव तय करने से पहले कीट की स्थिति देखें।"]
    },
    firstAid: {
      en: "If accidental swallowing is suspected, seek immediate medical attention and carry the label.",
      hi: "यदि गलती से निगलने की आशंका हो तो तुरंत डॉक्टर के पास जाएं और दवा का लेबल साथ ले जाएं।"
    }
  },
  {
    id: "glyphosate",
    name: "Glyphosate 41% SL",
    category: { en: "Herbicide", hi: "खरपतवारनाशक" },
    riskLevel: { en: "Targeted use only", hi: "सिर्फ लक्षित उपयोग" },
    waitingPeriod: { en: "Avoid contact with crop foliage", hi: "फसल की पत्तियों से संपर्क न हो" },
    reEntry: { en: "24 hours", hi: "24 घंटे" },
    targetCrops: { en: ["Bunds", "Non-crop zones", "Vegetable pathways"], hi: ["मेढ़", "गैर-फसल क्षेत्र", "सब्जी पथ"] },
    instruction: "Spray only on weeds. Protect the main crop from contact because it is non-selective.",
    summary: {
      en: "Useful for weed control, but one accidental drift can damage the crop itself.",
      hi: "खरपतवार नियंत्रण में उपयोगी, लेकिन हल्का सा बहाव भी मुख्य फसल को नुकसान पहुंचा सकता है।"
    },
    beforeSpray: {
      en: ["Use shielded nozzle near crop rows.", "Never spray on windy afternoons.", "Mark the area clearly before work begins."],
      hi: ["फसल की कतारों के पास शील्ड वाले नोज़ल का उपयोग करें।", "हवा वाले समय में छिड़काव बिल्कुल न करें।", "काम शुरू करने से पहले क्षेत्र को साफ-साफ चिन्हित करें।"]
    },
    duringSpray: {
      en: ["Aim below the crop canopy and only on weeds.", "Avoid leakage from hose, nozzle, and cap.", "Do not allow workers to stand downwind."],
      hi: ["फसल की छतरी के नीचे केवल खरपतवार पर स्प्रे करें।", "पाइप, नोज़ल और ढक्कन से लीकेज न होने दें।", "मजदूरों को हवा की दिशा में खड़ा न करें।"]
    },
    afterSpray: {
      en: ["Wash equipment separately before using it for crop-safe sprays.", "Keep livestock away until spray dries fully.", "Monitor weeds after 5 to 7 days instead of re-spraying immediately."],
      hi: ["उपकरण को साफ किए बिना उसे दूसरी फसल-सुरक्षित दवाओं में न उपयोग करें।", "स्प्रे सूखने तक पशुओं को दूर रखें।", "तुरंत दोबारा स्प्रे करने के बजाय 5 से 7 दिन बाद असर देखें।"]
    },
    firstAid: {
      en: "If skin irritation starts, wash the area thoroughly and change contaminated clothes immediately.",
      hi: "यदि त्वचा पर जलन हो तो प्रभावित हिस्से को तुरंत अच्छी तरह धोएं और कपड़े बदलें।"
    }
  },
  {
    id: "urea",
    name: "Urea",
    category: { en: "Fertilizer", hi: "उर्वरक" },
    riskLevel: { en: "Low to moderate caution", hi: "कम से मध्यम सावधानी" },
    waitingPeriod: { en: "Apply in split doses", hi: "विभाजित मात्रा में उपयोग करें" },
    reEntry: { en: "Immediate after incorporation", hi: "मिट्टी में मिलाने के बाद तुरंत" },
    targetCrops: { en: ["Rice", "Wheat", "Vegetables", "Sugarcane"], hi: ["धान", "गेहूं", "सब्जियां", "गन्ना"] },
    instruction: "Use measured quantity, avoid direct inhalation, and keep storage dry and away from livestock feed.",
    summary: {
      en: "A fertilizer, not a pesticide. Safe handling still matters during storage and broadcasting.",
      hi: "यह उर्वरक है, कीटनाशक नहीं। फिर भी भंडारण और उपयोग के दौरान सावधानी जरूरी है।"
    },
    beforeSpray: {
      en: ["Check crop stage before application.", "Do not apply on very dry leaves in strong sunlight.", "Keep fertilizer bags in a dry, raised storage area."],
      hi: ["उपयोग से पहले फसल की अवस्था देखें।", "तेज धूप में सूखी पत्तियों पर उपयोग न करें।", "उर्वरक की बोरियों को सूखी और ऊंची जगह पर रखें।"]
    },
    duringSpray: {
      en: ["Use split dose instead of heavy one-time application.", "Avoid direct contact with eyes while broadcasting.", "Apply near root zone when possible for better efficiency."],
      hi: ["एक बार में अधिक मात्रा देने के बजाय विभाजित मात्रा का उपयोग करें।", "बिखेरते समय आंखों में जाने से बचाएं।", "संभव हो तो जड़ क्षेत्र के पास उपयोग करें।"]
    },
    afterSpray: {
      en: ["Close the bag tightly after use.", "Keep it away from moisture and feed storage.", "Note the date to avoid unnecessary repeat application."],
      hi: ["उपयोग के बाद बोरी को अच्छी तरह बंद करें।", "इसे नमी और चारे से दूर रखें।", "अनावश्यक दोहराव से बचने के लिए तारीख लिख लें।"]
    },
    firstAid: {
      en: "If dust irritation occurs, wash the eyes with clean water and move to fresh air.",
      hi: "यदि धूल से जलन हो तो आंखों को साफ पानी से धोएं और खुली हवा में जाएं।"
    }
  },
  {
    id: "neem-oil",
    name: "Neem Oil",
    category: { en: "Botanical pesticide", hi: "जैविक कीटनाशक" },
    riskLevel: { en: "Lower caution", hi: "कम सावधानी" },
    waitingPeriod: { en: "Short interval, follow label", hi: "कम अंतराल, लेबल देखें" },
    reEntry: { en: "4 hours", hi: "4 घंटे" },
    targetCrops: { en: ["Vegetables", "Mustard", "Maize"], hi: ["सब्जियां", "सरसों", "मक्का"] },
    instruction: "Useful for early pest pressure and low residue use, but still requires careful mixing and timing.",
    summary: {
      en: "A softer option for early pest pressure, especially where residue concern is high.",
      hi: "जब अवशेष का जोखिम महत्वपूर्ण हो तब शुरुआती कीट दबाव के लिए अपेक्षाकृत हल्का विकल्प।"
    },
    beforeSpray: {
      en: ["Shake well and prepare a fresh solution before spraying.", "Test on a small patch first if crop is very tender.", "Spray in cooler hours for better leaf coverage."],
      hi: ["अच्छी तरह हिलाकर ताज़ा घोल तैयार करें।", "यदि फसल बहुत कोमल है तो पहले छोटे हिस्से पर परीक्षण करें।", "अच्छी पत्ती कवरेज के लिए ठंडे समय में स्प्रे करें।"]
    },
    duringSpray: {
      en: ["Ensure both sides of leaves are covered.", "Do not assume botanical means careless handling.", "Avoid mixing random chemicals without compatibility advice."],
      hi: ["पत्तियों के दोनों ओर कवरेज सुनिश्चित करें।", "सिर्फ जैविक होने का मतलब लापरवाही से उपयोग नहीं है।", "मिलाने से पहले संगतता की सलाह लें।"]
    },
    afterSpray: {
      en: ["Wash spray equipment after use.", "Observe the crop and pest response before repeating.", "Store away from direct sun."],
      hi: ["उपयोग के बाद उपकरण धोएं।", "दोहराने से पहले फसल और कीट की प्रतिक्रिया देखें।", "सीधी धूप से दूर रखें।"]
    },
    firstAid: {
      en: "If eye irritation occurs, wash gently with clean water and stop field work for the day.",
      hi: "यदि आंख में जलन हो तो साफ पानी से धोएं और उस दिन का काम रोक दें।"
    }
  },
  {
    id: "copper-oxychloride",
    name: "Copper Oxychloride",
    category: { en: "Fungicide / bactericide", hi: "फफूंदनाशक / जीवाणुनाशक" },
    riskLevel: { en: "Moderate caution", hi: "मध्यम सावधानी" },
    waitingPeriod: { en: "Follow crop-specific label interval", hi: "फसल के अनुसार लेबल अंतराल देखें" },
    reEntry: { en: "8 hours", hi: "8 घंटे" },
    targetCrops: { en: ["Sugarcane", "Vegetables", "Fruit crops"], hi: ["गन्ना", "सब्जियां", "फल फसलें"] },
    instruction: "Useful in protective disease management, but careful dose and leaf coverage are important.",
    summary: {
      en: "Often used as a protective disease spray where leaf and stem infection risk is present.",
      hi: "जहां पत्तियों और तनों में रोग संक्रमण का खतरा हो, वहां सुरक्षा स्प्रे के रूप में उपयोगी।"
    },
    beforeSpray: {
      en: ["Wear goggles while mixing because fine particles can irritate eyes.", "Mix only the required quantity for the day.", "Avoid spraying on heat-stressed crops."],
      hi: ["मिलाते समय चश्मा पहनें क्योंकि बारीक कण आंखों में जलन कर सकते हैं।", "दिन भर के लिए जितनी जरूरत हो उतनी मात्रा ही तैयार करें।", "गर्मी से तनावग्रस्त फसल पर स्प्रे न करें।"]
    },
    duringSpray: {
      en: ["Maintain uniform leaf and stem coverage.", "Avoid runoff from leaves.", "Do not exceed label dose assuming stronger protection."],
      hi: ["पत्तियों और तनों पर समान कवरेज रखें।", "पत्तियों से घोल बहने न दें।", "ज्यादा सुरक्षा के लिए अधिक मात्रा का उपयोग न करें।"]
    },
    afterSpray: {
      en: ["Clean all equipment thoroughly.", "Record crop response and spray timing.", "Keep remaining product sealed and dry."],
      hi: ["सभी उपकरण अच्छी तरह साफ करें।", "स्प्रे समय और फसल की प्रतिक्रिया दर्ज करें।", "बची हुई दवा को बंद और सूखी जगह रखें।"]
    },
    firstAid: {
      en: "If skin or eye irritation persists, seek medical advice with the product name.",
      hi: "यदि त्वचा या आंख की जलन बनी रहे तो दवा का नाम साथ लेकर डॉक्टर से सलाह लें।"
    }
  }
];

export const safetyEquipment = [
  {
    title: "Chemical-resistant Gloves",
    titleHi: "रसायनरोधी दस्ताने",
    icon: "🧤",
    detail: "Protects hands while mixing, pouring, and cleaning sprayers.",
    detailHi: "दवा मिलाते समय, डालते समय और स्प्रे मशीन साफ करते समय हाथों की सुरक्षा करता है।",
    priority: "Required"
  },
  {
    title: "Face Mask / Respirator",
    titleHi: "फेस मास्क / रेस्पिरेटर",
    icon: "😷",
    detail: "Reduces inhalation of powders, droplets, and strong chemical smell.",
    detailHi: "पाउडर, स्प्रे की बूंदों और तेज रासायनिक गंध को सांस के साथ अंदर जाने से कम करता है।",
    priority: "Required"
  },
  {
    title: "Protective Goggles",
    titleHi: "सुरक्षा चश्मा",
    icon: "🥽",
    detail: "Prevents splashes from reaching the eyes during mixing and spraying.",
    detailHi: "मिलाने और छिड़काव के दौरान आंखों में छींटे जाने से बचाता है।",
    priority: "Required"
  },
  {
    title: "Full-sleeve Apron",
    titleHi: "फुल स्लीव एप्रन",
    icon: "🧥",
    detail: "Adds skin protection when repeated spraying is expected.",
    detailHi: "बार-बार छिड़काव की स्थिति में त्वचा को अतिरिक्त सुरक्षा देता है।",
    priority: "Recommended"
  },
  {
    title: "Rubber Boots",
    titleHi: "रबर बूट",
    icon: "🥾",
    detail: "Protects feet from wet spray surfaces and puddles in the field.",
    detailHi: "गीले स्प्रे और खेत में जमा पानी से पैरों की सुरक्षा करता है।",
    priority: "Recommended"
  },
  {
    title: "Clean Water & Soap Kit",
    titleHi: "साफ पानी और साबुन किट",
    icon: "🧼",
    detail: "Useful for immediate washing if accidental exposure happens.",
    detailHi: "यदि गलती से दवा लग जाए तो तुरंत सफाई के लिए उपयोगी है।",
    priority: "Emergency"
  }
];
