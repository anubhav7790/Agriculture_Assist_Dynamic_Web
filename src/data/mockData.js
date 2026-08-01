export const languageText = {
  en: {
    heroTitle: "Empowering Farmers Digitally",
    heroSubtitle:
      "Manage soil, stay safe, discover schemes, and sell crops directly without middlemen.",
    dashboardTitle: "Farm Operations Snapshot",
    marketplaceTitle: "Direct Farmer-to-Buyer Marketplace"
  },
  hi: {
    heroTitle: "किसानों को डिजिटल रूप से सशक्त बनाना",
    heroSubtitle:
      "मिट्टी प्रबंधन, सुरक्षा जानकारी, सरकारी योजनाएं और सीधी फसल बिक्री एक ही प्लेटफॉर्म पर।",
    dashboardTitle: "खेती संचालन का सारांश",
    marketplaceTitle: "किसान से खरीदार तक सीधा बाजार"
  }
};

export const userProfile = {
  name: "Ravi Kumar",
  phone: "+91 98765 43210",
  email: "ravi@krishivikas.in",
  address: "Nashik, Maharashtra",
  farmSize: "8 Acres",
  cropFocus: "Tomato, Wheat, Onion"
};

export const initialSoilReports = [
  { id: 1, date: "28/03/2026", n: 72, p: 41, k: 58, ph: 6.7, status: "Healthy", crop: "Wheat" },
  { id: 2, date: "14/02/2026", n: 48, p: 28, k: 39, ph: 7.4, status: "Needs Attention", crop: "Onion" },
  { id: 3, date: "10/01/2026", n: 66, p: 51, k: 62, ph: 6.4, status: "Healthy", crop: "Tomato" }
];

export const chemicals = [
  {
    name: "Chlorpyrifos",
    instruction:
      "Wear gloves, avoid skin exposure, and do not spray near water sources. Wash thoroughly after use."
  },
  {
    name: "Glyphosate",
    instruction:
      "Use mask and full sleeves. Spray only in low wind conditions and keep children away from treated fields."
  },
  {
    name: "Urea",
    instruction:
      "Use measured quantity, avoid direct inhalation, and keep storage dry and away from livestock feed."
  }
];

export const equipmentItems = [
  { title: "Safety Gloves", icon: "🧤", detail: "Protects skin from pesticide exposure." },
  { title: "Face Mask", icon: "😷", detail: "Helps reduce inhalation of harmful chemicals." },
  { title: "Protective Goggles", icon: "🥽", detail: "Keeps eyes safe from spray splashes." },
  { title: "Rubber Boots", icon: "🥾", detail: "Prevents contact with wet chemical surfaces." }
];

export const initialSchemes = [
  {
    id: 1,
    name: {
      en: "PM-KISAN Samman Nidhi",
      hi: "पीएम-किसान सम्मान निधि"
    },
    state: {
      en: "All India",
      hi: "अखिल भारतीय"
    },
    benefit: {
      en: "Direct income support of Rs. 6,000 per year paid in three equal installments of Rs. 2,000 directly into bank accounts.",
      hi: "बैंक खातों में सीधे 2,000 रुपये की तीन समान किश्तों में भुगतान की जाने वाली प्रति वर्ष 6,000 रुपये की प्रत्यक्ष आय सहायता।"
    },
    eligibility: {
      en: "Small and marginal landholding farmer families with cultivable land ownership under their names.",
      hi: "छोटे और सीमांत भूमिधारक किसान परिवार जिनके नाम पर कृषि योग्य भूमि का स्वामित्व है।"
    },
    documents: {
      en: ["Aadhaar Card", "Land Records (Khasra/Khatauni)", "Bank Account Details", "Mobile Number linked to Aadhaar"],
      hi: ["आधार कार्ड", "भूमि रिकॉर्ड (खसरा/खतौनी)", "बैंक खाता विवरण", "आधार से लिंक मोबाइल नंबर"]
    },
    guide: {
      en: "Self-register on the official PM-Kisan portal, or complete the application through your nearest Common Service Centre (CSC).",
      hi: "आधिकारिक पीएम-किसान पोर्टल पर स्वयं पंजीकरण करें, या अपने निकटतम सामान्य सेवा केंद्र (सीएससी) के माध्यम से आवेदन पूरा करें।"
    },
    applyLink: "https://pmkisan.gov.in/"
  },
  {
    id: 2,
    name: {
      en: "Soil Health Card Scheme",
      hi: "मृदा स्वास्थ्य कार्ड योजना"
    },
    state: {
      en: "All India",
      hi: "अखिल भारतीय"
    },
    benefit: {
      en: "Free soil testing and customized nutrient recommendation cards issued every 2 years for optimized fertilizer doses.",
      hi: "अनुकूलित उर्वरक खुराक के लिए हर 2 साल में मुफ्त मिट्टी परीक्षण और अनुकूलित पोषक तत्व सिफारिश कार्ड जारी किए जाते हैं।"
    },
    eligibility: {
      en: "All active farmers across India who want scientific guidance on soil nutrients and soil health.",
      hi: "पूरे भारत के सभी सक्रिय किसान जो मिट्टी के पोषक तत्वों और मिट्टी के स्वास्थ्य पर वैज्ञानिक मार्गदर्शन चाहते हैं।"
    },
    documents: {
      en: ["Aadhaar Card", "Soil Sample Details (Collection Depth & Location)", "Land Survey Number Proof"],
      hi: ["आधार कार्ड", "मिट्टी के नमूने का विवरण (संग्रहण गहराई और स्थान)", "भूमि सर्वेक्षण संख्या प्रमाण"]
    },
    guide: {
      en: "Collect soil samples from your fields as per guidelines and submit them to nearest Agriculture Office or Soil Testing Lab.",
      hi: "दिशानिर्देशों के अनुसार अपने खेतों से मिट्टी के नमूने एकत्र करें और उन्हें निकटतम कृषि कार्यालय या मृदा परीक्षण प्रयोगशाला में जमा करें।"
    },
    applyLink: "https://soilhealth.dac.gov.in/"
  },
  {
    id: 3,
    name: {
      en: "PM Fasal Bima Yojana (PMFBY)",
      hi: "पीएम फसल बीमा योजना"
    },
    state: {
      en: "All India",
      hi: "अखिल भारतीय"
    },
    benefit: {
      en: "Affordable crop insurance coverage against natural calamities, pests, and disease at very low premium rates (1.5% to 5%).",
      hi: "बहुत कम प्रीमियम दरों (1.5% से 5%) पर प्राकृतिक आपदाओं, कीटों और बीमारी के खिलाफ सस्ती फसल बीमा कवरेज।"
    },
    eligibility: {
      en: "Farmers including sharecroppers and tenant farmers growing notified crops in notified areas during the current season.",
      hi: "चालू सीजन के दौरान अधिसूचित क्षेत्रों में अधिसूचित फसलें उगाने वाले बटाईदार और किरायेदार किसानों सहित सभी किसान।"
    },
    documents: {
      en: ["Land Sowing Certificate", "Land Record Proof (Record of Rights)", "Aadhaar Card", "Bank Account Details"],
      hi: ["फसल बुवाई प्रमाणपत्र", "भूमि रिकॉर्ड प्रमाण (अधिकारों का रिकॉर्ड)", "आधार कार्ड", "बैंक खाता विवरण"]
    },
    guide: {
      en: "Apply through your primary lending bank, authorized insurance agent, local CSC, or directly on the crop insurance portal.",
      hi: "अपने प्राथमिक ऋणदाता बैंक, अधिकृत बीमा एजेंट, स्थानीय सीएससी के माध्यम से या सीधे फसल बीमा पोर्टल पर आवेदन करें।"
    },
    applyLink: "https://pmfby.gov.in/"
  },
  {
    id: 4,
    name: {
      en: "PM Krishi Sinchayee Yojana (PMKSY)",
      hi: "प्रधानमंत्री कृषि सिंचाई योजना"
    },
    state: {
      en: "All India",
      hi: "अखिल भारतीय"
    },
    benefit: {
      en: "Up to 55% financial subsidy for installing micro-irrigation systems like drip and sprinkler setups to conserve farm water.",
      hi: "कृषि जल के संरक्षण के लिए ड्रिप और स्प्रिंकलर सेटअप जैसी सूक्ष्म सिंचाई प्रणालियों को स्थापित करने के लिए 55% तक वित्तीय सब्सिडी।"
    },
    eligibility: {
      en: "Farmers with cultivable agricultural land, members of cooperative farming societies, and self-help groups.",
      hi: "कृषि योग्य कृषि भूमि वाले किसान, सहकारी कृषि समितियों के सदस्य और स्वयं सहायता समूह।"
    },
    documents: {
      en: ["Land Registry Certificate", "Electricity Pump Connection Details", "Aadhaar Card", "Bank Passbook Copy"],
      hi: ["भूमि रजिस्ट्री प्रमाणपत्र", "बिजली पंप कनेक्शन विवरण", "आधार कार्ड", "बैंक पासबुक की प्रति"]
    },
    guide: {
      en: "Register with the local Horticulture or Agriculture Department office in your district with your field details.",
      hi: "अपने खेत के विवरण के साथ अपने जिले के स्थानीय बागवानी या कृषि विभाग कार्यालय में पंजीकरण करें।"
    },
    applyLink: "https://pmksy.gov.in/"
  },
  {
    id: 5,
    name: {
      en: "Paramparagat Krishi Vikas Yojana (PKVY)",
      hi: "परंपरागत कृषि विकास योजना"
    },
    state: {
      en: "All India",
      hi: "अखिल भारतीय"
    },
    benefit: {
      en: "Financial assistance of Rs. 50,000 per hectare for 3 years to adopt organic farming inputs, cluster certification, and marketing.",
      hi: "जैविक खेती इनपुट, क्लस्टर प्रमाणीकरण और विपणन को अपनाने के लिए 3 वर्षों के लिए प्रति हेक्टेयर 50,000 रुपये की वित्तीय सहायता।"
    },
    eligibility: {
      en: "Farmers willing to transition to organic farming, organized in local clusters of at least 20 hectares in contiguous area.",
      hi: "जैविक खेती में संक्रमण के इच्छुक किसान, निकटवर्ती क्षेत्रों में कम से कम 20 हेक्टेयर के स्थानीय क्लस्टर (समूह) में संगठित हों।"
    },
    documents: {
      en: ["Cluster Registration Proof", "Individual Land Record Copies", "Aadhaar Card", "Bank Account Details"],
      hi: ["क्लस्टर पंजीकरण प्रमाण", "व्यक्तिगत भूमि रिकॉर्ड की प्रतियां", "आधार कार्ड", "बैंक खाता विवरण"]
    },
    guide: {
      en: "Form a local farming cluster with neighboring farmers and register under the regional organic farming node.",
      hi: "पड़ोसी किसानों के साथ एक स्थानीय कृषि क्लस्टर बनाएं और क्षेत्रीय जैविक खेती नोड के तहत पंजीकरण करें।"
    },
    applyLink: "https://www.myscheme.gov.in/schemes/pkvy"
  },
  {
    id: 6,
    name: {
      en: "Kisan Credit Card (KCC) Scheme",
      hi: "किसान क्रेडिट कार्ड (केसीसी) योजना"
    },
    state: {
      en: "All India",
      hi: "अखिल भारतीय"
    },
    benefit: {
      en: "Flexible, short-term cultivation loans up to Rs. 3 Lakhs with low interest rates starting from 4% (after timely repayment subsidy).",
      hi: "समय पर पुनर्भुगतान सब्सिडी के बाद 4% से शुरू होने वाली कम ब्याज दरों के साथ 3 लाख रुपये तक के लचीले, अल्पकालिक खेती ऋण।"
    },
    eligibility: {
      en: "All active farmers, tenant farmers, oral lessees, sharecroppers, and joint liability groups of cultivators.",
      hi: "सभी सक्रिय किसान, किरायेदार किसान, बटाईदार और कृषकों के संयुक्त देयता समूह।"
    },
    documents: {
      en: ["Identity Proof (Aadhaar/PAN/Voter ID)", "Address Proof", "Land Ownership Record Copy", "Crop Sowing Certificate"],
      hi: ["पहचान प्रमाण (आधार/पैन/वॉटर आईडी)", "पता प्रमाण", "भूमि स्वामित्व रिकॉर्ड प्रति", "फसल बुवाई प्रमाणपत्र"]
    },
    guide: {
      en: "Apply directly at your nearest commercial, regional rural, or cooperative bank branch with required land credentials.",
      hi: "आवश्यक भूमि क्रेडेंशियल्स के साथ अपने निकटतम वाणिज्यिक, क्षेत्रीय ग्रामीण या सहकारी बैंक शाखा में सीधे आवेदन करें।"
    },
    applyLink: "https://www.myscheme.gov.in/schemes/kcc"
  },
  {
    id: 7,
    name: {
      en: "PM-KUSUM Solar Pumps Scheme",
      hi: "पीएम-कुसुम सोलर पंप योजना"
    },
    state: {
      en: "All India",
      hi: "अखिल भारतीय"
    },
    benefit: {
      en: "Up to 60% combined subsidy to install off-grid or grid-connected solar water pumps to replace diesel-powered pump sets.",
      hi: "डीजल से चलने वाले पंप सेटों को बदलने के लिए ऑफ-ग्रिड या ग्रिड से जुड़े सोलर वाटर पंप स्थापित करने के लिए 60% तक संयुक्त सब्सिडी।"
    },
    eligibility: {
      en: "Individual farmers, cooperative societies, panchayats, and water user associations with land and water source.",
      hi: "भूमि और जल स्रोत वाले व्यक्तिगत किसान, सहकारी समितियां, पंचायतें और जल उपभोक्ता संघ।"
    },
    documents: {
      en: ["Aadhaar Card", "Land Possession Certificate", "Electricity Bill (for grid-tied pumps)", "Bank Passbook Copy"],
      hi: ["आधार कार्ड", "भूमि कब्जा प्रमाणपत्र", "बिजली बिल (ग्रिड-कनेक्टेड पंपों के लिए)", "बैंक पासबुक की प्रति"]
    },
    guide: {
      en: "Submit the solar pump installation application online through your state's dedicated renewable energy agency portal.",
      hi: "अपने राज्य के समर्पित नवीकरणीय ऊर्जा एजेंसी पोर्टल के माध्यम से सोलर पंप स्थापना आवेदन ऑनलाइन जमा करें।"
    },
    applyLink: "https://pmkusum.mnre.gov.in/"
  }
];

export const initialListings = [
  {
    id: "101",
    cropName: "Organic Tomatoes",
    price: 28,
    quantity: "450 kg",
    quantityKg: 450,
    district: "Pune",
    location: "Pune, Maharashtra",
    phone: "+91 98760 10011",
    image:
      "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=900&q=80",
    description: "Freshly harvested organic tomatoes with same-day dispatch available.",
    tags: ["Fresh", "Organic"]
  },
  {
    id: "102",
    cropName: "Premium Wheat",
    price: 31,
    quantity: "2.5 tons",
    quantityKg: 2500,
    district: "Karnal",
    location: "Karnal, Haryana",
    phone: "+91 99900 22331",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80",
    description: "Clean, dry, export-grade wheat stored in ventilated conditions.",
    tags: ["Fresh"]
  },
  {
    id: "103",
    cropName: "Red Onions",
    price: 24,
    quantity: "800 kg",
    quantityKg: 800,
    district: "Nashik",
    location: "Lasalgaon, Maharashtra",
    phone: "+91 98111 70220",
    image:
      "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=900&q=80",
    description: "Market-ready onions sorted by size and ideal for wholesale buyers.",
    tags: ["Fresh", "Bulk"]
  }
];
