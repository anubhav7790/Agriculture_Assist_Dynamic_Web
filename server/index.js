import bcrypt from "bcryptjs";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import crypto from "node:crypto";
import { signToken, verifyToken } from "./auth.js";
import { query } from "./db.js";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 5000);
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(
  cors({
    origin: [corsOrigin, "http://127.0.0.1:5173"],
    credentials: true
  })
);
app.use(express.json());

function mapUser(row) {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email,
    address: row.address,
    role: row.role,
    farmSize: row.farm_size,
    cropFocus: row.crop_focus,
    createdAt: row.created_at
  };
}

function mapListing(row) {
  return {
    id: row.id,
    cropName: row.crop_name,
    price: Number(row.price),
    quantity: row.quantity,
    location: row.location,
    phone: row.phone,
    image: row.image,
    description: row.description,
    tags: typeof row.tags === "string" ? JSON.parse(row.tags) : row.tags || ["Fresh"],
    sellerType: row.seller_type,
    ownerId: row.owner_id,
    ownerName: row.owner_name,
    createdAt: row.created_at
  };
}

function buildSoilRecommendations(report) {
  const recommendations = [];
  const hasK = report.k !== undefined && report.k !== null && report.k !== "";

  recommendations.push(
    Number(report.n) < 60
      ? "Apply nitrogen-rich fertilizer in split doses after irrigation."
      : "Nitrogen levels are stable. Maintain the current nitrogen schedule."
  );
  recommendations.push(
    Number(report.p) < 40
      ? "Use single super phosphate to improve root growth and early vigor."
      : "Phosphorus is in a suitable range for the current crop."
  );
  recommendations.push(
    hasK
      ? Number(report.k) < 50
        ? "Add muriate of potash to improve crop quality and water regulation."
        : "Potassium is healthy and supports balanced crop development."
      : "Potassium value was not provided, so include K in the next soil test for more accurate guidance."
  );
  recommendations.push(
    Number(report.ph) > 7.5
      ? "Add organic matter to reduce alkalinity and improve nutrient uptake."
      : Number(report.ph) < 6
        ? "Review pH correction before the next crop cycle."
        : "Soil pH is suitable for most field crops."
  );

  return recommendations;
}

function mapSoilReport(row) {
  return {
    id: row.id,
    crop: row.crop,
    n: Number(row.n_value),
    p: Number(row.p_value),
    k: Number(row.k_value),
    ph: Number(row.ph_value),
    status: row.status,
    recommendations:
      typeof row.recommendations === "string"
        ? JSON.parse(row.recommendations)
        : row.recommendations || [],
    date: row.created_at
  };
}

function buildLocalSoilAnalysis(report) {
  const n = Number(report.n);
  const p = Number(report.p);
  const k = Number(report.k);
  const ph = Number(report.ph);
  const status = ph >= 6 && ph <= 7.5 ? "Healthy" : "Needs Attention";

  const english = {
    summary:
      status === "Healthy"
        ? "Your soil looks broadly balanced for common crops, but a few values still need monitoring."
        : "Your soil needs attention before the next crop cycle for better yield and nutrient efficiency.",
    whatIsGood: [
      n >= 60 ? "Nitrogen is in a workable range for vegetative growth." : "Nitrogen is below the preferred range.",
      p >= 40 ? "Phosphorus is supporting root development reasonably well." : "Phosphorus is lower than ideal for strong root support.",
      k >= 50 ? "Potassium is helping crop strength and water regulation." : "Potassium is lower than ideal for crop strength and moisture balance.",
      ph >= 6 && ph <= 7.5
        ? "Soil pH is in a suitable range for nutrient uptake."
        : "Soil pH is outside the optimal range and may reduce nutrient availability."
    ],
    whatIsWrong: [
      n < 60 ? "Low nitrogen can reduce leaf growth and crop vigor." : "Nitrogen is not the primary concern right now.",
      p < 40 ? "Low phosphorus may slow early growth and root establishment." : "Phosphorus is not the primary concern right now.",
      k < 50 ? "Low potassium can weaken plant resilience and crop quality." : "Potassium is not the primary concern right now.",
      ph > 7.5
        ? "Higher pH can reduce availability of some nutrients."
        : ph < 6
          ? "Lower pH can stress many crops and affect nutrient balance."
          : "pH is acceptable for most field crops."
    ],
    recommendations: [
      n < 60
        ? "Apply nitrogen-rich fertilizer in split doses after irrigation."
        : "Maintain the current nitrogen schedule and avoid over-application.",
      p < 40
        ? "Use a phosphorus source such as single super phosphate for better root growth."
        : "Phosphorus looks adequate; maintain balanced nutrition.",
      k < 50
        ? "Add potash to improve water regulation, crop quality, and plant strength."
        : "Potassium is in a stable zone; continue balanced feeding.",
      ph > 7.5
        ? "Add organic matter and review crop-specific pH correction strategy."
        : ph < 6
          ? "Consider pH correction and organic amendments before the next cycle."
          : "pH is good; focus on maintaining organic matter and irrigation balance."
    ]
  };

  const hindi = {
    summary:
      status === "Healthy"
        ? "आपकी मिट्टी सामान्य फसलों के लिए काफ़ी संतुलित दिख रही है, लेकिन कुछ मानों की निगरानी ज़रूरी है।"
        : "अगली फसल से पहले आपकी मिट्टी को ध्यान और सुधार की ज़रूरत है ताकि उत्पादन और पोषक दक्षता बेहतर हो सके।",
    whatIsGood: [
      n >= 60 ? "नाइट्रोजन वनस्पतिक वृद्धि के लिए ठीक सीमा में है।" : "नाइट्रोजन पसंदीदा सीमा से कम है।",
      p >= 40 ? "फॉस्फोरस जड़ों के विकास को ठीक तरह समर्थन दे रहा है।" : "फॉस्फोरस जड़ों के अच्छे विकास के लिए कम है।",
      k >= 50 ? "पोटाश फसल की ताकत और जल संतुलन में मदद कर रहा है।" : "पोटाश फसल की मजबूती के लिए कम है।",
      ph >= 6 && ph <= 7.5
        ? "मिट्टी का pH पोषक तत्वों के अवशोषण के लिए उपयुक्त है।"
        : "मिट्टी का pH सही सीमा से बाहर है और पोषक उपलब्धता कम कर सकता है।"
    ],
    whatIsWrong: [
      n < 60 ? "कम नाइट्रोजन पत्तियों की वृद्धि और फसल की ताकत घटा सकता है।" : "इस समय नाइट्रोजन मुख्य समस्या नहीं है।",
      p < 40 ? "कम फॉस्फोरस शुरुआती वृद्धि और जड़ों की पकड़ को धीमा कर सकता है।" : "इस समय फॉस्फोरस मुख्य समस्या नहीं है।",
      k < 50 ? "कम पोटाश फसल की गुणवत्ता और सहनशीलता को घटा सकता है।" : "इस समय पोटाश मुख्य समस्या नहीं है।",
      ph > 7.5
        ? "ऊँचा pH कुछ पोषक तत्वों की उपलब्धता कम कर सकता है।"
        : ph < 6
          ? "कम pH कई फसलों पर दबाव डाल सकता है और पोषक संतुलन बिगाड़ सकता है।"
          : "pH अधिकांश फसलों के लिए ठीक है।"
    ],
    recommendations: [
      n < 60
        ? "सिंचाई के बाद भागों में नाइट्रोजन युक्त खाद दें।"
        : "नाइट्रोजन की वर्तमान योजना बनाए रखें और अतिरिक्त मात्रा से बचें।",
      p < 40
        ? "जड़ों के बेहतर विकास के लिए फॉस्फोरस स्रोत जैसे सिंगल सुपर फॉस्फेट दें।"
        : "फॉस्फोरस पर्याप्त है; संतुलित पोषण बनाए रखें।",
      k < 50
        ? "जल संतुलन और फसल गुणवत्ता के लिए पोटाश दें।"
        : "पोटाश ठीक है; संतुलित पोषण जारी रखें।",
      ph > 7.5
        ? "जैविक पदार्थ मिलाएँ और pH सुधार की योजना बनाएं।"
        : ph < 6
          ? "अगली फसल से पहले pH सुधार और जैविक सुधारक उपयोग करें।"
          : "pH अच्छा है; जैविक पदार्थ और सिंचाई संतुलन बनाए रखें।"
    ]
  };

  return { status, english, hindi };
}

function buildCleanSoilAnalysis(report) {
  const n = Number(report.n);
  const p = Number(report.p);
  const hasK = report.k !== undefined && report.k !== null && report.k !== "";
  const k = hasK ? Number(report.k) : null;
  const ph = Number(report.ph);
  const status = ph >= 6 && ph <= 7.5 ? "Healthy" : "Needs Attention";

  return {
    status,
    english: {
      summary:
        status === "Healthy"
          ? "Your soil looks broadly balanced for common crops, but a few values still need monitoring."
          : "Your soil needs attention before the next crop cycle for better yield and nutrient efficiency.",
      whatIsGood: [
        n >= 60 ? "Nitrogen is in a workable range for vegetative growth." : "Nitrogen is below the preferred range.",
        p >= 40 ? "Phosphorus is supporting root development reasonably well." : "Phosphorus is lower than ideal for strong root support.",
        hasK
          ? k >= 50
            ? "Potassium is helping crop strength and water regulation."
            : "Potassium is lower than ideal for crop strength and moisture balance."
          : "Potassium value was not submitted, so K-specific analysis is limited.",
        ph >= 6 && ph <= 7.5
          ? "Soil pH is in a suitable range for nutrient uptake."
          : "Soil pH is outside the optimal range and may reduce nutrient availability."
      ],
      whatIsWrong: [
        n < 60 ? "Low nitrogen can reduce leaf growth and crop vigor." : "Nitrogen is not the primary concern right now.",
        p < 40 ? "Low phosphorus may slow early growth and root establishment." : "Phosphorus is not the primary concern right now.",
        hasK
          ? k < 50
            ? "Low potassium can weaken plant resilience and crop quality."
            : "Potassium is not the primary concern right now."
          : "Potassium impact cannot be judged well because K value is missing.",
        ph > 7.5
          ? "Higher pH can reduce availability of some nutrients."
          : ph < 6
            ? "Lower pH can stress many crops and affect nutrient balance."
            : "pH is acceptable for most field crops."
      ],
      recommendations: [
        n < 60
          ? "Apply nitrogen-rich fertilizer in split doses after irrigation."
          : "Maintain the current nitrogen schedule and avoid over-application.",
        p < 40
          ? "Use a phosphorus source such as single super phosphate for better root growth."
          : "Phosphorus looks adequate; maintain balanced nutrition.",
        hasK
          ? k < 50
            ? "Add potash to improve water regulation, crop quality, and plant strength."
            : "Potassium is in a stable zone; continue balanced feeding."
          : "Include potassium in the next soil test so the recommendation becomes more precise.",
        ph > 7.5
          ? "Add organic matter and review crop-specific pH correction strategy."
          : ph < 6
            ? "Consider pH correction and organic amendments before the next cycle."
            : "pH is good; focus on maintaining organic matter and irrigation balance."
      ]
    },
    hindi: {
      summary:
        status === "Healthy"
          ? "Aapki mitti aam faslon ke liye kaafi santulit lag rahi hai, lekin kuch values ko monitor karna zaroori hai."
          : "Agli fasal se pehle mitti ko dhyan aur sudhar ki zaroorat hai taki upaj aur poshak santulan behtar ho sake.",
      whatIsGood: [
        n >= 60 ? "Nitrogen theek range me hai aur paudhon ki growth ko support karega." : "Nitrogen ideal range se kam hai.",
        p >= 40 ? "Phosphorus jadon ke vikas ke liye theek support de raha hai." : "Phosphorus kam hai aur root growth prabhavit ho sakti hai.",
        hasK
          ? k >= 50
            ? "Potassium fasal ki majbooti aur pani santulan me madad kar raha hai."
            : "Potassium ki value kam taraf hai."
          : "Potassium value submit nahi hui, isliye uska poora analysis pending hai.",
        ph >= 6 && ph <= 7.5
          ? "Mitti ka pH poshak tatvon ke avshoshan ke liye accha hai."
          : "Mitti ka pH sahi range se bahar hai."
      ],
      whatIsWrong: [
        n < 60 ? "Kam nitrogen se pattiyon ki growth aur crop vigor kam ho sakti hai." : "Nitrogen is samay mukhya problem nahi hai.",
        p < 40 ? "Kam phosphorus se early growth aur root establishment dheema ho sakta hai." : "Phosphorus is samay mukhya problem nahi hai.",
        hasK
          ? k < 50
            ? "Kam potassium se crop quality aur resilience kam ho sakti hai."
            : "Potassium is samay mukhya problem nahi hai."
          : "K value missing hone ki wajah se potassium wali salah seemit hai.",
        ph > 7.5
          ? "Zyada pH hone se kuch poshak tatva paudhon ko kam mil pate hain."
          : ph < 6
            ? "Kam pH kai faslon me stress badha sakta hai."
            : "pH adhikansh faslon ke liye theek hai."
      ],
      recommendations: [
        n < 60
          ? "Sinchai ke baad hisson me nitrogen wali khaad dein."
          : "Nitrogen schedule ko balance me rakhen aur extra matra se bachen.",
        p < 40
          ? "Root growth ke liye phosphorus source jaise single super phosphate ka upyog karein."
          : "Phosphorus theek lag raha hai; balanced nutrition rakhen.",
        hasK
          ? k < 50
            ? "Crop strength aur pani santulan ke liye potash dein."
            : "Potassium theek zone me hai; balanced feeding jaari rakhen."
          : "Agli soil test report me K bhi zaroor jodein.",
        ph > 7.5
          ? "Organic matter milayein aur pH correction plan banayein."
          : ph < 6
            ? "Agli fasal se pehle pH sudhar aur organic amendment par kaam karein."
            : "pH accha hai; organic matter aur irrigation balance banaye rakhen."
      ]
    }
  };
}

async function generateGeminiSoilAnalysis(report) {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }

  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `You are an expert agricultural soil advisor for Indian farmers.
Return ONLY valid JSON with this exact shape:
{
  "status": "Healthy or Needs Attention",
  "english": {
    "summary": "string",
    "whatIsGood": ["string", "string", "string", "string"],
    "whatIsWrong": ["string", "string", "string", "string"],
    "recommendations": ["string", "string", "string", "string"]
  },
  "hindi": {
    "summary": "string",
    "whatIsGood": ["string", "string", "string", "string"],
    "whatIsWrong": ["string", "string", "string", "string"],
    "recommendations": ["string", "string", "string", "string"]
  }
}

Analyze this soil report in detail and clearly explain what is right, what is wrong, and what the farmer should do next.
Crop: ${report.crop}
Nitrogen: ${report.n}
Phosphorus: ${report.p}
Potassium: ${report.k ?? "Not provided"}
pH: ${report.ph}`
              }
            ]
          }
        ],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "object",
            properties: {
              status: { type: "string" },
              english: {
                type: "object",
                properties: {
                  summary: { type: "string" },
                  whatIsGood: {
                    type: "array",
                    items: { type: "string" }
                  },
                  whatIsWrong: {
                    type: "array",
                    items: { type: "string" }
                  },
                  recommendations: {
                    type: "array",
                    items: { type: "string" }
                  }
                },
                required: ["summary", "whatIsGood", "whatIsWrong", "recommendations"]
              },
              hindi: {
                type: "object",
                properties: {
                  summary: { type: "string" },
                  whatIsGood: {
                    type: "array",
                    items: { type: "string" }
                  },
                  whatIsWrong: {
                    type: "array",
                    items: { type: "string" }
                  },
                  recommendations: {
                    type: "array",
                    items: { type: "string" }
                  }
                },
                required: ["summary", "whatIsGood", "whatIsWrong", "recommendations"]
              }
            },
            required: ["status", "english", "hindi"]
          }
        }
      })
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini analysis request failed: ${errorText}`);
  }

  const data = await response.json();
  const outputText = data?.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("") || "";

  if (!outputText) {
    throw new Error("Gemini returned an empty analysis.");
  }

  return JSON.parse(outputText);
}

function getTokenFromHeader(req) {
  const authHeader = req.headers.authorization || "";
  if (!authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.slice(7);
}

async function requireAuth(req, res, next) {
  try {
    const token = getTokenFromHeader(req);
    if (!token) {
      return res.status(401).json({ message: "Authorization token missing." });
    }

    const payload = verifyToken(token);
    const result = await query(
      `SELECT id, name, phone, email, address, role, farm_size, crop_focus, created_at
       FROM users
       WHERE id = ?`,
      [payload.userId]
    );

    if (!result[0]) {
      return res.status(401).json({ message: "User not found." });
    }

    req.authUser = mapUser(result[0]);
    next();
  } catch (_error) {
    return res.status(401).json({ message: "Session expired. Please login again." });
  }
}

app.get("/api/health", async (_req, res) => {
  try {
    await query("SELECT 1");
    res.json({ status: "ok", message: "Krishi Vikas MySQL server running" });
  } catch (_error) {
    res.status(500).json({ status: "error", message: "Database connection failed." });
  }
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, phone, email, address, password, role = "Farmer" } = req.body;

    if (!name || !phone || !email || !address || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPhone = phone.trim();
    const existingUser = await query(
      "SELECT id FROM users WHERE email = ? OR phone = ? LIMIT 1",
      [normalizedEmail, normalizedPhone]
    );

    if (existingUser[0]) {
      return res.status(409).json({ message: "User already exists with this email or phone." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userId = crypto.randomUUID();
    await query(
      `INSERT INTO users (id, name, phone, email, address, role, password_hash)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [userId, name.trim(), normalizedPhone, normalizedEmail, address.trim(), role, passwordHash]
    );
    const createdUser = await query(
      `SELECT id, name, phone, email, address, role, farm_size, crop_focus, created_at
       FROM users WHERE id = ?`,
      [userId]
    );

    const user = mapUser(createdUser[0]);
    const token = signToken(user.id);

    res.status(201).json({
      message: "Registration successful.",
      token,
      user
    });
  } catch (_error) {
    res.status(500).json({ message: "Unable to register user right now." });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    if (!emailOrPhone || !password) {
      return res.status(400).json({ message: "Email/phone and password are required." });
    }

    const loginValue = emailOrPhone.trim();
    const result = await query(
      `SELECT id, name, phone, email, address, role, farm_size, crop_focus, created_at, password_hash
       FROM users
       WHERE email = ? OR phone = ?
       LIMIT 1`,
      [loginValue.toLowerCase(), loginValue]
    );

    const userRow = result[0];
    if (!userRow) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isValid = await bcrypt.compare(password, userRow.password_hash);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const user = mapUser(userRow);
    const token = signToken(user.id);

    res.json({
      message: "Login successful.",
      token,
      user
    });
  } catch (_error) {
    res.status(500).json({ message: "Unable to login right now." });
  }
});

app.get("/api/auth/me", requireAuth, async (req, res) => {
  res.json({ user: req.authUser });
});

app.put("/api/auth/profile", requireAuth, async (req, res) => {
  try {
    const nextName = req.body.name ?? req.authUser.name;
    const nextPhone = req.body.phone ?? req.authUser.phone;
    const nextEmail = req.body.email ?? req.authUser.email;
    const nextAddress = req.body.address ?? req.authUser.address;
    const nextFarmSize = req.body.farmSize ?? req.authUser.farmSize;
    const nextCropFocus = req.body.cropFocus ?? req.authUser.cropFocus;
    const nextRole = req.body.role ?? req.authUser.role;

    await query(
      `UPDATE users
       SET name = ?,
           phone = ?,
           email = ?,
           address = ?,
           farm_size = ?,
           crop_focus = ?,
           role = ?
       WHERE id = ?`,
      [
        nextName.trim(),
        nextPhone.trim(),
        nextEmail.trim().toLowerCase(),
        nextAddress.trim(),
        nextFarmSize,
        nextCropFocus,
        nextRole,
        req.authUser.id
      ]
    );
    const updated = await query(
      `SELECT id, name, phone, email, address, role, farm_size, crop_focus, created_at
       FROM users WHERE id = ?`,
      [req.authUser.id]
    );

    res.json({
      message: "Profile updated successfully.",
      user: mapUser(updated[0])
    });
  } catch (_error) {
    res.status(500).json({ message: "Unable to update profile right now." });
  }
});

app.post("/api/auth/logout", requireAuth, async (_req, res) => {
  res.json({ message: "Logged out successfully." });
});

app.get("/api/listings", async (_req, res) => {
  try {
    const result = await query(
      `SELECT listings.*, users.name AS owner_name
       FROM listings
       JOIN users ON users.id = listings.owner_id
       ORDER BY listings.created_at DESC`
    );
    res.json({ listings: result.map(mapListing) });
  } catch (_error) {
    res.status(500).json({ message: "Unable to fetch listings right now." });
  }
});

app.get("/api/listings/:listingId", async (req, res) => {
  try {
    const result = await query(
      `SELECT listings.*, users.name AS owner_name
       FROM listings
       JOIN users ON users.id = listings.owner_id
       WHERE listings.id = ?`,
      [req.params.listingId]
    );

    if (!result[0]) {
      return res.status(404).json({ message: "Listing not found." });
    }

    res.json({ listing: mapListing(result[0]) });
  } catch (_error) {
    res.status(500).json({ message: "Unable to fetch listing right now." });
  }
});

app.post("/api/listings", requireAuth, async (req, res) => {
  try {
    const { cropName, price, quantity, location, phone, image, description } = req.body;

    if (!cropName || !price || !quantity || !location || !phone) {
      return res.status(400).json({ message: "Please fill all required listing fields." });
    }

    const listingId = crypto.randomUUID();
    await query(
      `INSERT INTO listings (
          id, crop_name, price, quantity, location, phone, image, description, tags, seller_type, owner_id
       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        listingId,
        cropName.trim(),
        Number(price),
        quantity.trim(),
        location.trim(),
        phone.trim(),
        image?.trim() ||
          "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=900&q=80",
        description?.trim() ||
          "Fresh crop listing shared directly by the farmer on Krishi Vikas.",
        JSON.stringify(["Fresh"]),
        req.authUser.role || "Farmer",
        req.authUser.id
      ]
    );
    const result = await query(
      `SELECT listings.*, users.name AS owner_name
       FROM listings
       JOIN users ON users.id = listings.owner_id
       WHERE listings.id = ?`,
      [listingId]
    );

    res.status(201).json({
      message: "Crop listing added successfully.",
      listing: {
        ...mapListing(result[0]),
        ownerName: req.authUser.name
      }
    });
  } catch (_error) {
    res.status(500).json({ message: "Unable to create listing right now." });
  }
});

app.delete("/api/listings/:listingId", requireAuth, async (req, res) => {
  try {
    const result = await query(
      "DELETE FROM listings WHERE id = ? AND owner_id = ?",
      [req.params.listingId, req.authUser.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Listing not found or access denied." });
    }

    res.json({ message: "Listing removed successfully." });
  } catch (_error) {
    res.status(500).json({ message: "Unable to delete listing right now." });
  }
});

app.get("/api/soil-reports", requireAuth, async (req, res) => {
  try {
    const result = await query(
      `SELECT id, crop, n_value, p_value, k_value, ph_value, status, recommendations, created_at
       FROM soil_reports
       WHERE user_id = ?
       ORDER BY created_at DESC`,
      [req.authUser.id]
    );

    res.json({ reports: result.map(mapSoilReport) });
  } catch (_error) {
    res.status(500).json({ message: "Unable to fetch soil reports right now." });
  }
});

app.post("/api/soil-reports", requireAuth, async (req, res) => {
  try {
    const { crop, n, p, k, ph } = req.body;

    if (!crop || n === undefined || p === undefined || ph === undefined) {
      return res.status(400).json({ message: "Please fill all soil report fields." });
    }

    const status = Number(ph) >= 6 && Number(ph) <= 7.5 ? "Healthy" : "Needs Attention";
    const recommendations = buildSoilRecommendations({ n, p, k, ph });
    const reportId = crypto.randomUUID();

    await query(
      `INSERT INTO soil_reports (
          id, user_id, crop, n_value, p_value, k_value, ph_value, status, recommendations
       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        reportId,
        req.authUser.id,
        crop.trim(),
        Number(n),
        Number(p),
        k === undefined || k === null || k === "" ? null : Number(k),
        Number(ph),
        status,
        JSON.stringify(recommendations)
      ]
    );

    const result = await query(
      `SELECT id, crop, n_value, p_value, k_value, ph_value, status, recommendations, created_at
       FROM soil_reports
       WHERE id = ?`,
      [reportId]
    );

    res.status(201).json({
      message: "Soil report uploaded successfully.",
      report: mapSoilReport(result[0])
    });
  } catch (_error) {
    res.status(500).json({ message: "Unable to save soil report right now." });
  }
});

app.post("/api/soil-analysis", requireAuth, async (req, res) => {
  try {
    const { crop, n, p, k, ph } = req.body;

    if (!crop || n === undefined || p === undefined || ph === undefined) {
      return res.status(400).json({ message: "Please fill all soil analysis fields." });
    }

    const localAnalysis = buildCleanSoilAnalysis({ crop, n, p, k, ph });
    let analysis = localAnalysis;
    let provider = "local-fallback";

    try {
      const geminiAnalysis = await generateGeminiSoilAnalysis({ crop, n, p, k, ph });
      if (geminiAnalysis) {
        analysis = geminiAnalysis;
        provider = "gemini";
      }
    } catch (error) {
      console.error("Gemini soil analysis failed:", error.message);
    }

    res.json({
      message: "Soil analysis generated successfully.",
      report: {
        id: `analysis-${Date.now()}`,
        crop: crop.trim(),
        n: Number(n),
        p: Number(p),
        k: k === undefined || k === null || k === "" ? null : Number(k),
        ph: Number(ph),
        status: analysis.status,
        provider,
        analysis,
        recommendations: analysis.english?.recommendations || [],
        date: new Date().toISOString()
      }
    });
  } catch (_error) {
    res.status(500).json({ message: "Unable to analyze soil report right now." });
  }
});

app.listen(PORT, () => {
  console.log(`Krishi Vikas MySQL server listening on http://localhost:${PORT}`);
});
