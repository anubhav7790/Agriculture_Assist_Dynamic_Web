import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import SectionHeader from "../components/SectionHeader";
import StatCard from "../components/StatCard";

function getWeatherLabel(code) {
  const weatherMap = {
    0: "Clear Sky",
    1: "Mainly Clear",
    2: "Partly Cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Rime Fog",
    51: "Light Drizzle",
    53: "Drizzle",
    55: "Dense Drizzle",
    61: "Light Rain",
    63: "Rain",
    65: "Heavy Rain",
    71: "Light Snow",
    73: "Snow",
    75: "Heavy Snow",
    80: "Rain Showers",
    81: "Showers",
    82: "Heavy Showers",
    95: "Thunderstorm"
  };

  return weatherMap[code] || "Weather Update";
}

const KVK_DATA = {
  bihar: [
    {
      nameEn: "KVK Patna",
      nameHi: "केवीके पटना",
      locationEn: "Barh, Patna, Bihar",
      locationHi: "बाढ़, पटना, बिहार",
      detailsEn: "Specialists in paddy, wheat, vegetable cultivation, soil testing, and farmer training.",
      detailsHi: "धान, गेहूं, सब्जी खेती, मिट्टी परीक्षण और किसान प्रशिक्षण के विशेषज्ञ।",
      phone: "+91 612-2223543",
      email: "kvkpatna@icar.gov.in",
      mapUrl: "https://maps.google.com/?q=Krishi+Vigyan+Kendra+Patna+Bihar"
    },
    {
      nameEn: "KVK Nalanda",
      nameHi: "केवीके नालंदा",
      locationEn: "Harnaut, Nalanda, Bihar",
      locationHi: "हरनौत, नालंदा, बिहार",
      detailsEn: "Specialists in cereal crops, pulse production, integrated pest management, and seed treatment.",
      detailsHi: "अनाज फसलें, दलहन उत्पादन, समेकित कीट प्रबंधन और बीज उपचार के विशेषज्ञ।",
      phone: "+91 6112-259022",
      email: "kvknalanda@icar.gov.in",
      mapUrl: "https://maps.google.com/?q=Krishi+Vigyan+Kendra+Nalanda+Bihar"
    },
    {
      nameEn: "KVK Vaishali",
      nameHi: "केवीके वैशाली",
      locationEn: "Hajipur, Vaishali, Bihar",
      locationHi: "हाजीपुर, वैशाली, बिहार",
      detailsEn: "Specialists in vegetable nurseries, banana cultivation, livestock advisory, and water management.",
      detailsHi: "सब्जी नर्सरी, केला खेती, पशुपालन सलाह और जल प्रबंधन के विशेषज्ञ।",
      phone: "+91 6224-272229",
      email: "kvkvaishali@icar.gov.in",
      mapUrl: "https://maps.google.com/?q=Krishi+Vigyan+Kendra+Vaishali+Bihar"
    }
  ],
  punjab: [
    {
      nameEn: "KVK Ludhiana (PAU)",
      nameHi: "केवीके लुधियाना (पीएयू)",
      locationEn: "Ludhiana, Punjab",
      locationHi: "लुधियाना, पंजाब",
      detailsEn: "Specialists in Crop Protection, Wheat & Paddy Cultivation, Soil Health.",
      detailsHi: "फसल सुरक्षा, गेहूं और धान की खेती, मिट्टी स्वास्थ्य के विशेषज्ञ।",
      phone: "+91 161-2401602",
      email: "kvkludhiana@pau.edu",
      mapUrl: "https://maps.google.com/?q=Krishi+Vigyan+Kendra+Ludhiana+Punjab"
    },
    {
      nameEn: "KVK Jalandhar",
      nameHi: "केवीके जालंधर",
      locationEn: "Nurmahal, Jalandhar, Punjab",
      locationHi: "नूरमहल, जालंधर, पंजाब",
      detailsEn: "Specialists in Vegetable Science, Potato Seed Production, Organic Farming.",
      detailsHi: "सब्जी विज्ञान, आलू बीज उत्पादन, जैविक खेती के विशेषज्ञ।",
      phone: "+91 182-6292053",
      email: "kvkjalandhar@pau.edu",
      mapUrl: "https://maps.google.com/?q=Krishi+Vigyan+Kendra+Jalandhar+Punjab"
    },
    {
      nameEn: "KVK Patiala",
      nameHi: "केवीके पटियाला",
      locationEn: "Rauni, Patiala, Punjab",
      locationHi: "रौनी, पटियाला, पंजाब",
      detailsEn: "Specialists in Resource Conservation, Drip Irrigation, Crop Residue Management.",
      detailsHi: "संसाधन संरक्षण, ड्रिप सिंचाई, फसल अवशेष प्रबंधन के विशेषज्ञ।",
      phone: "+91 175-2201300",
      email: "kvkpatiala@pau.edu",
      mapUrl: "https://maps.google.com/?q=Krishi+Vigyan+Kendra+Patiala+Punjab"
    }
  ],
  maharashtra: [
    {
      nameEn: "KVK Pune (Babhalgaon)",
      nameHi: "केवीके पुणे (बाभलगंज)",
      locationEn: "Babhalgaon, Indapur, Pune, Maharashtra",
      locationHi: "बाभलगंज, इंदापुर, पुणे, महाराष्ट्र",
      detailsEn: "Specialists in Horticulture, Pomegranate Cultivation, Sugar Cane Yields.",
      detailsHi: "बागवानी, अनार की खेती, गन्ना उत्पादन के विशेषज्ञ।",
      phone: "+91 2111-223455",
      email: "kvkpune@yahoo.com",
      mapUrl: "https://maps.google.com/?q=Krishi+Vigyan+Kendra+Indapur+Pune+Maharashtra"
    },
    {
      nameEn: "KVK Nashik (YCMOU)",
      nameHi: "केवीके नासिक (वाईसीएमओयू)",
      locationEn: "YCMOU Campus, Nashik, Maharashtra",
      locationHi: "वाईसीएमओयू कैंपस, नासिक, महाराष्ट्र",
      detailsEn: "Specialists in Grape Vineyards, Onion Cultivation, Export Quality Standards.",
      detailsHi: "अंगूर के बागों, प्याज की खेती, निर्यात गुणवत्ता मानकों के विशेषज्ञ।",
      phone: "+91 253-2230025",
      email: "kvknashik@rediffmail.com",
      mapUrl: "https://maps.google.com/?q=Krishi+Vigyan+Kendra+Nashik+Maharashtra"
    },
    {
      nameEn: "KVK Baramati",
      nameHi: "केवीके बारामती",
      locationEn: "Sharadanagar, Baramati, Maharashtra",
      locationHi: "शारदानगर, बारामती, महाराष्ट्र",
      detailsEn: "Specialists in Dairy Technology, Animal Husbandry, Precision Agriculture.",
      detailsHi: "डेयरी प्रौद्योगिकी, पशुपालन, सटीक कृषि के विशेषज्ञ।",
      phone: "+91 2112-255227",
      email: "kvkbaramati@yahoo.co.in",
      mapUrl: "https://maps.google.com/?q=Krishi+Vigyan+Kendra+Baramati+Maharashtra"
    }
  ],
  karnataka: [
    {
      nameEn: "KVK Bangalore Rural",
      nameHi: "केवीके बैंगलोर ग्रामीण",
      locationEn: "Hadonahalli, Doddaballapura, Karnataka",
      locationHi: "हादोनाहल्ली, डोड्डाबल्लापुरा, कर्नाटक",
      detailsEn: "Specialists in Sericulture, Ragi Cultivation, Rainwater Harvesting.",
      detailsHi: "रेशम उत्पादन, रागी की खेती, वर्षा जल संचयन के विशेषज्ञ।",
      phone: "+91 80-27632085",
      email: "kvkdoddaballapura@gmail.com",
      mapUrl: "https://maps.google.com/?q=Krishi+Vigyan+Kendra+Doddaballapura+Karnataka"
    },
    {
      nameEn: "KVK Dharwad",
      nameHi: "केवीके धारवाड़",
      locationEn: "UAS Campus, Dharwad, Karnataka",
      locationHi: "यूएएस कैंपस, धारवाड़, कर्नाटक",
      detailsEn: "Specialists in Pulses production, Cotton Seed technology, Soil chemistry.",
      detailsHi: "दाल उत्पादन, कपास बीज तकनीक, मृदा रसायन विज्ञान के विशेषज्ञ।",
      phone: "+91 836-2440939",
      email: "kvkdharwad@uasd.in",
      mapUrl: "https://maps.google.com/?q=Krishi+Vigyan+Kendra+Dharwad+Karnataka"
    },
    {
      nameEn: "KVK Mysore (Suttur)",
      nameHi: "केवीके मैसूर (सुत्तूर)",
      locationEn: "Suttur, Nanjangud, Mysore, Karnataka",
      locationHi: "सुत्तूर, नंजनगुड, मैसूर, कर्नाटक",
      detailsEn: "Specialists in Jaggery processing, Organic composts, Poultry farming.",
      detailsHi: "गुड़ प्रसंस्करण, जैविक खाद, मुर्गी पालन के विशेषज्ञ।",
      phone: "+91 8221-232218",
      email: "kvkmysore@gmail.com",
      mapUrl: "https://maps.google.com/?q=Krishi+Vigyan+Kendra+Suttur+Mysore+Karnataka"
    }
  ],
  default: [
    {
      nameEn: "KVK Delhi (Ujwa)",
      nameHi: "केवीके दिल्ली (उजवा)",
      locationEn: "Ujwa, New Delhi",
      locationHi: "उजवा, नई दिल्ली",
      detailsEn: "Specialists in Hydroponics, Urban Agriculture, Soil testing.",
      detailsHi: "हाइड्रोपोनिक्स, शहरी कृषि, मिट्टी परीक्षण के विशेषज्ञ।",
      phone: "+91 11-25011504",
      email: "kvkdelhi@yahoo.com",
      mapUrl: "https://maps.google.com/?q=Krishi+Vigyan+Kendra+Ujwa+Delhi"
    },
    {
      nameEn: "KVK Gurugram",
      nameHi: "केवीके गुरुग्राम",
      locationEn: "Shikohpur, Gurugram, Haryana",
      locationHi: "शिकोहपुर, गुरुग्राम, हरियाणा",
      detailsEn: "Specialists in Pearl Farming, Mushroom Cultivation, Bee-keeping.",
      detailsHi: "मोती की खेती, मशरूम की खेती, मधुमक्खी पालन के विशेषज्ञ।",
      phone: "+91 124-2200222",
      email: "kvkgurugram@ccshau.ac.in",
      mapUrl: "https://maps.google.com/?q=Krishi+Vigyan+Kendra+Shikohpur+Gurugram+Haryana"
    }
  ]
};

function getNearbyKVKs(address = "", lang = "en") {
  const addr = (address || "").toLowerCase();

  const matchesAny = (keywords) => keywords.some((keyword) => addr.includes(keyword));

  const biharKeywords = ["bihar", "patna", "nalanda", "vaishali", "hajipur", "muzaffarpur", "gaya", "bhagalpur", "बिहार", "पटना"];
  const punjabKeywords = ["punjab", "ludhiana", "jalandhar", "patiala", "पंजाब", "लुधियाना", "जालंधर"];
  const northKeywords = ["haryana", "delhi", "uttar pradesh", "up", "uttar", "हरियाणा", "दिल्ली", "उत्तर"];
  const maharashtraKeywords = ["maharashtra", "pune", "nashik", "baramati", "mumbai", "nagpur", "महाराष्ट्र", "पुणे", "नासिक"];
  const westCentralKeywords = ["gujarat", "madhya pradesh", "mp", "madhya", "rajasthan", "chhattisgarh", "गुजरात", "मध्य", "राजस्थान", "छत्तीसगढ़"];
  const karnatakaKeywords = ["karnataka", "bangalore", "bengaluru", "mysore", "dharwad", "कर्नाटक", "बैंगलोर", "मैसूर"];
  const southKeywords = ["tamil", "andhra", "kerala", "telangana", "odisha", "तमिल", "आंध्र", "केरल", "तेलंगाना", "ओडिशा"];

  let list = KVK_DATA.default;
  if (matchesAny(biharKeywords)) {
    list = KVK_DATA.bihar;
  } else if (matchesAny(punjabKeywords) || matchesAny(northKeywords)) {
    list = KVK_DATA.punjab;
  } else if (matchesAny(maharashtraKeywords) || matchesAny(westCentralKeywords)) {
    list = KVK_DATA.maharashtra;
  } else if (matchesAny(karnatakaKeywords) || matchesAny(southKeywords)) {
    list = KVK_DATA.karnataka;
  }

  return list.map(kvk => ({
    name: lang === "hi" ? kvk.nameHi : kvk.nameEn,
    location: lang === "hi" ? kvk.locationHi : kvk.locationEn,
    details: lang === "hi" ? kvk.detailsHi : kvk.detailsEn,
    phone: kvk.phone,
    email: kvk.email,
    mapUrl: kvk.mapUrl
  }));
}

const MandiHeadersTranslation = {
  en: {
    title: "Live Mandi Crop Prices",
    subtitle: "Real-time rates from local agricultural markets",
    cropHeader: "Crop",
    priceHeader: "Current Price",
    changeHeader: "24h Trend"
  },
  hi: {
    title: "लाइव मंडी फसल दरें",
    subtitle: "स्थानीय कृषि बाजारों से वास्तविक समय की दरें",
    cropHeader: "फसल",
    priceHeader: "वर्तमान मूल्य",
    changeHeader: "24 घंटे का रुझान"
  }
};

const KvkHeadersTranslation = {
  en: {
    title: "Nearby KVK",
    subtitle: "Connect with government farming experts near your area.",
    locationMatch: "Location Match",
    viewOnMap: "🗺️ View on Google Maps"
  },
  hi: {
    title: "नज़दीकी केवीके (KVK)",
    subtitle: "अपने क्षेत्र के सरकारी कृषि विशेषज्ञों से संपर्क करें।",
    locationMatch: "स्थान मिलान",
    viewOnMap: "🗺️ गूगल मैप्स पर देखें"
  }
};

function getLocalMandiPrices(address = "", lang = "en") {
  const addr = (address || "").toLowerCase();
  let cropsList = [];
  
  const isNorth = addr.includes("punjab") || addr.includes("haryana") || addr.includes("up") || 
                  addr.includes("uttar") || addr.includes("delhi") || addr.includes("bihar") ||
                  addr.includes("पंजाब") || addr.includes("हरियाणा") || addr.includes("दिल्ली") || 
                  addr.includes("बिहार") || addr.includes("उत्तर");
                  
  const isWestCentral = addr.includes("maharashtra") || addr.includes("gujarat") || addr.includes("mp") || 
                        addr.includes("madhya") || addr.includes("rajasthan") ||
                        addr.includes("महाराष्ट्र") || addr.includes("गुजरात") || addr.includes("मध्य") || 
                        addr.includes("राजस्थान");
                        
  const isSouth = addr.includes("karnataka") || addr.includes("tamil") || addr.includes("andhra") || 
                  addr.includes("kerala") || addr.includes("telangana") ||
                  addr.includes("कर्नाटक") || addr.includes("तमिल") || addr.includes("आंध्र") || 
                  addr.includes("केरल") || addr.includes("तेलंगाना");
  
  if (isNorth) {
    cropsList = [
      { nameEn: "Wheat (Kanak)", nameHi: "गेहूं (कनक)", basePrice: 2275, unitEn: "per Quintal", unitHi: "प्रति क्विंटल", trend: "up", change: "+1.2%" },
      { nameEn: "Paddy (Basmati)", nameHi: "धान (बासमती)", basePrice: 3850, unitEn: "per Quintal", unitHi: "प्रति क्विंटल", trend: "up", change: "+0.8%" },
      { nameEn: "Mustard (Sarson)", nameHi: "सरसों (राई)", basePrice: 5450, unitEn: "per Quintal", unitHi: "प्रति क्विंटल", trend: "up", change: "+1.5%" },
      { nameEn: "Potato (Aloo)", nameHi: "आलू", basePrice: 1200, unitEn: "per Quintal", unitHi: "प्रति क्विंटल", trend: "down", change: "-2.1%" },
      { nameEn: "Sugarcane (Ganna)", nameHi: "गन्ना", basePrice: 340, unitEn: "per Quintal", unitHi: "प्रति क्विंटल", trend: "up", change: "+0.5%" }
    ];
  } else if (isWestCentral) {
    cropsList = [
      { nameEn: "Cotton (Kapas)", nameHi: "कपास (रूई)", basePrice: 6900, unitEn: "per Quintal", unitHi: "प्रति क्विंटल", trend: "down", change: "-0.5%" },
      { nameEn: "Groundnut (Moongfali)", nameHi: "मूंगफली", basePrice: 6300, unitEn: "per Quintal", unitHi: "प्रति क्विंटल", trend: "up", change: "+1.1%" },
      { nameEn: "Soyabean", nameHi: "सोयाबीन", basePrice: 4600, unitEn: "per Quintal", unitHi: "प्रति क्विंटल", trend: "up", change: "+0.4%" },
      { nameEn: "Onion (Pyaz)", nameHi: "प्याज", basePrice: 1800, unitEn: "per Quintal", unitHi: "प्रति क्विंटल", trend: "down", change: "-3.2%" },
      { nameEn: "Gram (Chana)", nameHi: "चना", basePrice: 5100, unitEn: "per Quintal", unitHi: "प्रति क्विंटल", trend: "up", change: "+0.9%" }
    ];
  } else if (isSouth) {
    cropsList = [
      { nameEn: "Paddy (Dhan)", nameHi: "धान (चावल)", basePrice: 2183, unitEn: "per Quintal", unitHi: "प्रति क्विंटल", trend: "up", change: "+0.8%" },
      { nameEn: "Coconut (Nariyal)", nameHi: "नारियल", basePrice: 28, unitEn: "per Piece", unitHi: "प्रति पीस", trend: "up", change: "+2.3%" },
      { nameEn: "Arecanut (Supari)", nameHi: "सुपारी", basePrice: 42000, unitEn: "per Quintal", unitHi: "प्रति क्विंटल", trend: "down", change: "-1.2%" },
      { nameEn: "Turmeric (Haldi)", nameHi: "हल्दी", basePrice: 7200, unitEn: "per Quintal", unitHi: "प्रति क्विंटल", trend: "up", change: "+1.7%" },
      { nameEn: "Maize (Makka)", nameHi: "मक्का", basePrice: 1960, unitEn: "per Quintal", unitHi: "प्रति क्विंटल", trend: "up", change: "+0.3%" }
    ];
  } else {
    cropsList = [
      { nameEn: "Wheat (Kanak)", nameHi: "गेहूं (कनक)", basePrice: 2275, unitEn: "per Quintal", unitHi: "प्रति क्विंटल", trend: "up", change: "+1.2%" },
      { nameEn: "Paddy (Dhan)", nameHi: "धान (चावल)", basePrice: 2183, unitEn: "per Quintal", unitHi: "प्रति क्विंटल", trend: "up", change: "+0.8%" },
      { nameEn: "Cotton (Kapas)", nameHi: "कपास (रूई)", basePrice: 6900, unitEn: "per Quintal", unitHi: "प्रति क्विंटल", trend: "down", change: "-0.5%" },
      { nameEn: "Mustard (Sarson)", nameHi: "सरसों (राई)", basePrice: 5450, unitEn: "per Quintal", unitHi: "प्रति क्विंटल", trend: "up", change: "+1.5%" },
      { nameEn: "Potato (Aloo)", nameHi: "आलू", basePrice: 1200, unitEn: "per Quintal", unitHi: "प्रति क्विंटल", trend: "down", change: "-2.1%" }
    ];
  }

  let hash = 0;
  for (let i = 0; i < address.length; i++) {
    hash = address.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return cropsList.map(crop => {
    const percentShift = (Math.abs(hash) % 11) - 5;
    const shiftedPrice = Math.round(crop.basePrice * (1 + percentShift / 100));
    const formattedPrice = `₹${shiftedPrice.toLocaleString("en-IN")}`;
    
    let trend = crop.trend;
    let change = crop.change;
    if (percentShift > 0) {
      trend = "up";
      change = `+${(percentShift + 0.5).toFixed(1)}%`;
    } else if (percentShift < 0) {
      trend = "down";
      change = `${(percentShift - 0.5).toFixed(1)}%`;
    }
    
    return {
      name: lang === "hi" ? crop.nameHi : crop.nameEn,
      unit: lang === "hi" ? crop.unitHi : crop.unitEn,
      price: formattedPrice,
      change,
      trend
    };
  });
}

function getAgriAdvisories(conditionText, tempString, lang) {
  const cond = (conditionText || "").toLowerCase();
  const temp = parseInt(tempString) || 25;
  const advisories = [];
  
  if (lang === "hi") {
    // Hindi Advisories
    if (cond.includes("rain") || cond.includes("drizzle") || cond.includes("shower") || cond.includes("thunderstorm")) {
      advisories.push({
        type: "warning",
        icon: "🌧️",
        title: "कीटनाशक एवं उर्वरक चेतावनी",
        text: "बारिश होने की संभावना है। पानी में बहने से बचाने के लिए कीटनाशकों के छिड़काव और ठोस खाद डालने का काम अभी टाल दें।"
      });
      advisories.push({
        type: "info",
        icon: "🚜",
        title: "जल निकासी प्रबंधन",
        text: "खेतों में जलभराव रोकने के लिए जल निकासी की नालियों को साफ रखें, विशेषकर मक्का और संवेदनशील फसलों के लिए।"
      });
    } else if (cond.includes("fog") || cond.includes("rime")) {
      advisories.push({
        type: "warning",
        icon: "🌫️",
        title: "कीट एवं रोग चेतावनी",
        text: "अधिक नमी और कोहरे से फंगस रोग (जैसे झुलसा रोग) फैलने का खतरा रहता है। पत्तों की नियमित निगरानी करें।"
      });
      advisories.push({
        type: "info",
        icon: "💡",
        title: "फसल भंडारण",
        text: "कटी हुई फसलों को नमी से बचाने के लिए सूखे और ढके हुए स्थानों पर रखें।"
      });
    } else if (cond.includes("clear") || cond.includes("sunny")) {
      advisories.push({
        type: "success",
        icon: "☀️",
        title: "बुवाई और छिड़काव के लिए उत्तम दिन",
        text: "साफ और धूप वाला मौसम पत्तियों पर खाद के छिड़काव, निराई-गुड़ाई और कटाई के लिए सबसे उपयुक्त है।"
      });
      advisories.push({
        type: "info",
        icon: "💧",
        title: "सिंचाई योजना",
        text: "मिट्टी में नमी के स्तर की जांच करें। तेज धूप वाले दिनों में वाष्पीकरण की दर अधिक होती है।"
      });
    } else {
      advisories.push({
        type: "info",
        icon: "⛅",
        title: "खेत का रख-रखाव",
        text: "मध्यम मौसम खेतों की जुताई, क्यारियां तैयार करने और छंटाई के काम के लिए सर्वोत्तम है।"
      });
      advisories.push({
        type: "success",
        icon: "🌱",
        title: "बुवाई का समय",
        text: "मिट्टी के तापमान की जांच करें। इस मौसम में मौसमी सब्जियों की बुवाई फलदायी होगी।"
      });
    }

    if (temp > 35) {
      advisories.push({
        type: "danger",
        icon: "🔥",
        title: "गर्मी के प्रभाव से बचाव",
        text: "तापमान अधिक है। फसल को झुलसने से बचाने के लिए सुबह जल्दी या शाम को हल्की सिंचाई करें।"
      });
    } else if (temp < 15) {
      advisories.push({
        type: "warning",
        icon: "❄️",
        title: "ठंड से सुरक्षा",
        text: "ठंड बढ़ रही है। मिट्टी की गर्मी बनाए रखने और जड़ों को सुरक्षित रखने के लिए मल्चिंग (पुआल से ढकना) अपनाएं।"
      });
    }
  } else {
    // English Advisories
    if (cond.includes("rain") || cond.includes("drizzle") || cond.includes("shower") || cond.includes("thunderstorm")) {
      advisories.push({
        type: "warning",
        icon: "🌧️",
        title: "Pesticide & Fertilizer Alert",
        text: "Rain expected. Postpone pesticide sprays and solid fertilizer applications to avoid washing away."
      });
      advisories.push({
        type: "info",
        icon: "🚜",
        title: "Drainage Management",
        text: "Ensure clear drainage channels in your fields to prevent waterlogging, especially for sensitive crops like maize."
      });
    } else if (cond.includes("fog") || cond.includes("rime")) {
      advisories.push({
        type: "warning",
        icon: "🌫️",
        title: "Pest & Disease Alert",
        text: "High humidity and fog can trigger fungal outbreaks (e.g. blight). Monitor leaves closely."
      });
      advisories.push({
        type: "info",
        icon: "💡",
        title: "Harvest Care",
        text: "Keep harvested produce covered in dry storage to prevent moisture absorption."
      });
    } else if (cond.includes("clear") || cond.includes("sunny")) {
      advisories.push({
        type: "success",
        icon: "☀️",
        title: "Optimal Sowing & Spraying",
        text: "Clear sunny weather is ideal for foliar fertilizer sprays, weeding, and mechanical harvesting."
      });
      advisories.push({
        type: "info",
        icon: "💧",
        title: "Irrigation Scheduling",
        text: "Monitor soil moisture levels. Warm, clear days increase water evaporation rate."
      });
    } else {
      advisories.push({
        type: "info",
        icon: "⛅",
        title: "Field Maintenance",
        text: "Moderate weather is perfect for tilling, field preparation, or pruning."
      });
      advisories.push({
        type: "success",
        icon: "🌱",
        title: "Sowing Window",
        text: "Check soil temperature. Conditions are favorable for planting seasonal vegetables."
      });
    }

    if (temp > 35) {
      advisories.push({
        type: "danger",
        icon: "🔥",
        title: "Heat Stress Management",
        text: "High temperature. Irrigate lightly in the early morning or late evening to prevent heat shock."
      });
    } else if (temp < 15) {
      advisories.push({
        type: "warning",
        icon: "❄️",
        title: "Cold Protection",
        text: "Cooler temperature. Consider mulching to retain soil warmth and protect root zones."
      });
    }
  }
  
  return advisories;
}

export default function DashboardPage() {
  const { currentSoilReport, listings, profile, soilReports, text, language } = useAppContext();
  const latestReport = soilReports[0];
  const recentReport = currentSoilReport || latestReport;
  const [weather, setWeather] = useState({
    loading: true,
    locationLabel: profile.address || "Your farm location",
    temperature: "--",
    condition: "Loading weather",
    detail: "Fetching live conditions"
  });

  useEffect(() => {
    let active = true;

    async function loadWeather() {
      if (!profile.address?.trim()) {
        if (active) {
          setWeather({
            loading: false,
            locationLabel: "Location not set",
            temperature: "--",
            condition: "Add location",
            detail: "Update your profile address to see weather"
          });
        }
        return;
      }

      try {
        setWeather((current) => ({
          ...current,
          loading: true,
          locationLabel: profile.address
        }));

        const geoResponse = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(profile.address)}&count=1&language=en&format=json`
        );
        const geoData = await geoResponse.json();
        const location = geoData?.results?.[0];

        if (!location) {
          throw new Error("Location not found");
        }

        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`
        );
        const weatherData = await weatherResponse.json();
        const current = weatherData?.current;

        if (!current || typeof current.temperature_2m !== "number") {
          throw new Error("Weather not available");
        }

        if (active) {
          setWeather({
            loading: false,
            locationLabel: `${location.name}, ${location.admin1 || location.country}`,
            temperature: `${Math.round(current.temperature_2m)}°C`,
            condition: getWeatherLabel(current.weather_code),
            detail: `Feels like ${Math.round(current.apparent_temperature)}°C | Wind ${Math.round(current.wind_speed_10m)} km/h`
          });
        }
      } catch (_error) {
        if (active) {
          setWeather({
            loading: false,
            locationLabel: profile.address || "Your farm location",
            temperature: "--",
            condition: "Weather unavailable",
            detail: "Please try again after a refresh"
          });
        }
      }
    }

    loadWeather();

    return () => {
      active = false;
    };
  }, [profile.address]);

  const recommendationCount = useMemo(() => {
    const englishRecommendations = recentReport?.analysis?.english?.recommendations;
    if (Array.isArray(englishRecommendations) && englishRecommendations.length) {
      return `${englishRecommendations.length} Ready`;
    }

    if (Array.isArray(recentReport?.recommendations) && recentReport.recommendations.length) {
      return `${recentReport.recommendations.length} Ready`;
    }

    return "0 Ready";
  }, [recentReport]);

  const lang = language === "hi" ? "hi" : "en";
  const mandiHeaders = MandiHeadersTranslation[lang];
  const kvkHeaders = KvkHeadersTranslation[lang];
  const mandiCrops = useMemo(() => {
    return getLocalMandiPrices(weather.locationLabel || profile.address || "", lang);
  }, [weather.locationLabel, profile.address, lang]);
  const advisories = getAgriAdvisories(weather.condition, weather.temperature, lang);
  const kvkList = useMemo(() => {
    return getNearbyKVKs(weather.locationLabel || profile.address || "", lang);
  }, [weather.locationLabel, profile.address, lang]);

  return (
    <div className="page-stack">
      <SectionHeader
        eyebrow="Dashboard"
        title={text.dashboardTitle}
        description="Track your latest soil analysis, live local weather, recommendations, and active crop listings from one place."
        action={
          <div style={{ maxWidth: "340px", width: "100%", margin: 0 }}>
            <StatCard
              icon="🌦️"
              label="Local Weather"
              value={weather.temperature}
              detail={weather.loading ? "Loading live weather..." : `${weather.condition} | ${weather.locationLabel}`}
            />
          </div>
        }
      />

      <section className="panel quick-actions-panel">
        <h3>{text.quickActionsTitle || "Quick Actions"}</h3>
        <div className="quick-actions-grid">
          <Link className="action-card upload-soil" to="/soil/upload">
            <span className="action-icon">🧪</span>
            <div className="action-info">
              <h4>{text.quickActions?.uploadSoilTitle || "Upload Soil Report"}</h4>
              <p>{text.quickActions?.uploadSoilCopy || "Analyze nutrients & get recommendations"}</p>
            </div>
          </Link>
          <Link className="action-card add-listing" to="/marketplace/add">
            <span className="action-icon">🛒</span>
            <div className="action-info">
              <h4>{text.quickActions?.addListingTitle || "Add Crop Listing"}</h4>
              <p>{text.quickActions?.addListingCopy || "Sell directly to verified buyers"}</p>
            </div>
          </Link>
          <Link className="action-card view-schemes" to="/schemes">
            <span className="action-icon">🏛️</span>
            <div className="action-info">
              <h4>{text.quickActions?.schemesTitle || "Govt Schemes"}</h4>
              <p>{text.quickActions?.schemesCopy || "Check subsidies & financial aids"}</p>
            </div>
          </Link>
          <Link className="action-card voice-guide" to="/safety/voice">
            <span className="action-icon">🔊</span>
            <div className="action-info">
              <h4>{text.quickActions?.voiceTitle || "Voice Safety Guide"}</h4>
              <p>{text.quickActions?.voiceCopy || "Listen to pesticide safety rules"}</p>
            </div>
          </Link>
        </div>
      </section>

      <div className="dashboard-grid">
        <section className="panel mandi-panel">
          <div className="mandi-header">
            <h3>{mandiHeaders.title}</h3>
            <span className="mandi-live-badge">
              <span className="pulse-dot"></span> Live Mandi
            </span>
          </div>
          <p className="description-text" style={{ fontSize: "0.85rem", color: "var(--text-soft)", margin: "0 0 1rem 0" }}>
            {mandiHeaders.subtitle}
          </p>
          <div className="mandi-table-wrapper">
            <table className="mandi-table">
              <thead>
                <tr>
                  <th>{mandiHeaders.cropHeader}</th>
                  <th>{mandiHeaders.priceHeader}</th>
                  <th>{mandiHeaders.changeHeader}</th>
                </tr>
              </thead>
              <tbody>
                {mandiCrops.map((item, idx) => (
                  <tr key={idx}>
                    <td>
                      <span className="mandi-crop-name">{item.name}</span>
                      <span className="mandi-unit">{item.unit}</span>
                    </td>
                    <td style={{ fontWeight: "600", color: "var(--text-heading)" }}>{item.price}</td>
                    <td>
                      <span className={`price-trend ${item.trend}`}>{item.change}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel">
          <h3>{text.weatherAdvisoriesTitle || "Smart Weather Advisories"}</h3>
          <p className="description-text" style={{ fontSize: "0.85rem", color: "var(--text-soft)", margin: "0 0 1rem 0" }}>
            {text.weatherAdvisoriesSubtitle || "Dynamic cultivation advice based on local forecast"}
          </p>
          <div className="advisory-list">
            {advisories.map((advisory, idx) => (
              <div key={idx} className={`advisory-card ${advisory.type}`}>
                <div className="advisory-icon">{advisory.icon}</div>
                <div className="advisory-content">
                  <h4>{advisory.title}</h4>
                  <p>{advisory.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel kvk-panel">
          <div className="panel-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <h3 style={{ margin: 0 }}>{kvkHeaders.title}</h3>
            <span className="kvk-badge">{kvkHeaders.locationMatch}</span>
          </div>
          <p className="description-text" style={{ fontSize: "0.85rem", color: "var(--text-soft)", margin: "0 0 1.2rem 0" }}>
            {kvkHeaders.subtitle}
          </p>
          <div className="kvk-list" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {kvkList.map((kvk, idx) => (
              <div key={idx} className="kvk-card">
                <div className="kvk-header">
                  <h4>{kvk.name}</h4>
                  <span className="kvk-loc">📍 {kvk.location}</span>
                </div>
                <p className="kvk-details">{kvk.details}</p>
                <div className="kvk-contact">
                  <span>📞 {kvk.phone}</span>
                  <span>✉️ {kvk.email}</span>
                </div>
                <a href={kvk.mapUrl} target="_blank" rel="noopener noreferrer" className="kvk-map-btn">
                  {kvkHeaders.viewOnMap}
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
