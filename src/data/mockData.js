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
    name: "PM-KISAN Samman Nidhi",
    state: "All India",
    benefit: "Income support of Rs. 6,000 per year in three installments.",
    eligibility: "Small and marginal landholding farmers with valid land records.",
    guide: "Keep Aadhaar, bank account, and land details ready before applying."
  },
  {
    id: 2,
    name: "Soil Health Card Scheme",
    state: "All India",
    benefit: "Free soil testing and nutrient advisory for better fertilizer use.",
    eligibility: "Farmers seeking periodic soil analysis and field-specific recommendations.",
    guide: "Submit a soil sample through your nearest agriculture office or camp."
  },
  {
    id: 3,
    name: "PM Fasal Bima Yojana",
    state: "All India",
    benefit: "Crop insurance support against natural calamities and crop loss.",
    eligibility: "Farmers enrolled for notified crops during the season.",
    guide: "Apply through banks, CSC centers, or the official crop insurance portal."
  }
];

export const initialListings = [
  {
    id: "101",
    cropName: "Organic Tomatoes",
    price: 28,
    quantity: "450 kg",
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
    location: "Lasalgaon, Maharashtra",
    phone: "+91 98111 70220",
    image:
      "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=900&q=80",
    description: "Market-ready onions sorted by size and ideal for wholesale buyers.",
    tags: ["Fresh", "Bulk"]
  }
];
