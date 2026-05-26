import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { INITIAL_PRODUCTS, INITIAL_SHIPMENTS, INITIAL_BLOGS, MOCK_CURRENCIES, MOCK_COMMODITIES } from './src/mockData';
import { Product, Shipment, Lead, BlogPost, ChatMessage } from './src/types';

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory persistent arrays for session database
let products: Product[] = [...INITIAL_PRODUCTS];
let shipments: Shipment[] = [...INITIAL_SHIPMENTS];
let leads: Lead[] = [
  {
    id: "lead-1",
    name: "Hiroshi Sato",
    company: "Sato Electronics Corp",
    email: "sato@satoelec.co.jp",
    phone: "+81 3-5555-0143",
    message: "Requesting immediate quote for LFP-48V battery packs. Sourcing for residential solar arrays.",
    type: "quote",
    status: "New",
    date: "2026-05-25",
    product: "Active Recharge Lithium-Iron-Phosphate (LFP) Packs",
    quantity: "200 packs"
  },
  {
    id: "lead-2",
    name: "Amara Adebayo",
    company: "Nigeria CleanPower",
    email: "amara@cleanpower.ng",
    phone: "+234 803 555 1234",
    message: "Inquiring about export logistics for Giza premium threads to Nigeria textiles port. What are typical transit times?",
    type: "import",
    status: "In Contact",
    date: "2026-05-22"
  }
];

let blogs: BlogPost[] = [...INITIAL_BLOGS];

// Lazy-loaded Gemini AI client helper
let aiClient: any = null;
function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      console.warn("GEMINI_API_KEY environment variable is not defined or is placeholder. Falling back to local offline Trade Intelligence system.");
      return null;
    }
    try {
      aiClient = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    } catch (err) {
      console.error("Failed to initialize GoogleGenAI client:", err);
      return null;
    }
  }
  return aiClient;
}

// Ensure unique ID generation
const nextId = () => Math.random().toString(36).substring(2, 9);

// API Routes -------------------------------------------------------------

// Products API
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/products', (req, res) => {
  const newProduct: Product = {
    id: `prod-${nextId()}`,
    name: req.body.name || "Unnamed B2B Resource",
    category: req.body.category || "General Cargo",
    image: req.body.image || "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80",
    price: Number(req.body.price) || 10,
    currency: req.body.currency || "USD",
    moq: req.body.moq || "1 Unit",
    countryOrigin: req.body.countryOrigin || "Standard",
    description: req.body.description || "No description provided.",
    exportAvailability: req.body.exportAvailability || "Available",
    specifications: req.body.specifications || { "Standard": "Grade A Quality" }
  };
  products.unshift(newProduct);
  res.status(201).json(newProduct);
});

app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  products = products.filter(p => p.id !== id);
  res.json({ success: true, message: `Product ${id} deleted successfully.` });
});

// Shipments API
app.get('/api/shipments', (req, res) => {
  res.json(shipments);
});

app.get('/api/shipments/:trackingNumber', (req, res) => {
  const { trackingNumber } = req.params;
  const found = shipments.find(s => s.trackingNumber.toUpperCase() === trackingNumber.trim().toUpperCase());
  if (found) {
    res.json(found);
  } else {
    res.status(404).json({ error: "Shipment tracking record not found. Please review the ID and retry." });
  }
});

app.post('/api/shipments', (req, res) => {
  const { trackingNumber, cargoType, weight, containerSize, origin, destination, status, vesselName, estimatedArrival, currentPort } = req.body;
  
  // Find or create
  const existingIndex = shipments.findIndex(s => s.trackingNumber.toUpperCase() === trackingNumber.toUpperCase());
  
  if (existingIndex > -1) {
    // Update existing shipment
    shipments[existingIndex] = {
      ...shipments[existingIndex],
      status: status || shipments[existingIndex].status,
      currentPort: currentPort || shipments[existingIndex].currentPort,
      vesselName: vesselName || shipments[existingIndex].vesselName,
      estimatedArrival: estimatedArrival || shipments[existingIndex].estimatedArrival,
    };
    
    // Add milestone
    if (currentPort) {
      const today = new Date().toISOString().split('T')[0];
      const newMilestone = {
        date: today,
        title: `Status Update: ${status}`,
        location: currentPort,
        completed: true
      };
      
      // Prevent duplicates of the same milestone title
      const hasMilestone = shipments[existingIndex].milestones.some(m => m.title === newMilestone.title && m.date === today);
      if (!hasMilestone) {
        shipments[existingIndex].milestones.push(newMilestone);
      }
    }
    
    res.json(shipments[existingIndex]);
  } else {
    // Create new shipment
    const newShip: Shipment = {
      id: `ship-${nextId()}`,
      trackingNumber,
      cargoType: cargoType || "General Cargo Container",
      weight: weight || "15,000 kg",
      containerSize: containerSize || "40ft High Cube",
      origin: origin || "Port of Singapore",
      destination: destination || "Port of London",
      status: status || "In Transit",
      currentPort: currentPort || "Origin Terminal Yard",
      vesselName: vesselName || "Global Carrier Alliance",
      estimatedArrival: estimatedArrival || "2026-06-30",
      milestones: [
        { date: new Date().toISOString().split('T')[0], title: "Manifest Logged & Booked", location: origin || "Origin", completed: true }
      ]
    };
    shipments.unshift(newShip);
    res.status(201).json(newShip);
  }
});

// Leads API
app.get('/api/leads', (req, res) => {
  res.json(leads);
});

app.post('/api/leads', (req, res) => {
  const { name, company, email, phone, message, type, product, quantity } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Sender Name and Contact Email are required fields." });
  }
  const newLead: Lead = {
    id: `lead-${nextId()}`,
    name,
    company: company || "Independent Trader",
    email,
    phone: phone || "Not Provided",
    message: message || "Interested in B2B corporate offerings.",
    type: type || "general",
    status: "New",
    date: new Date().toISOString().split('T')[0],
    product,
    quantity
  };
  leads.unshift(newLead);
  res.status(201).json(newLead);
});

app.post('/api/leads/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const leadIndex = leads.findIndex(l => l.id === id);
  if (leadIndex > -1) {
    leads[leadIndex].status = status;
    res.json(leads[leadIndex]);
  } else {
    res.status(404).json({ error: "Lead not found." });
  }
});

// Blogs API
app.get('/api/blogs', (req, res) => {
  res.json(blogs);
});

app.post('/api/blogs', (req, res) => {
  const { title, category, summary, content, author, tags, image } = req.body;
  const newPost: BlogPost = {
    id: `blog-${nextId()}`,
    title: title || "New Global Trade Updates",
    category: category || "Trade News",
    summary: summary || "Quick briefing of international policies and routes.",
    content: content || "No content written yet.",
    date: new Date().toISOString().split('T')[0],
    image: image || "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80",
    author: author || "Senior Trade Analyst",
    tags: tags || ["General"]
  };
  blogs.unshift(newPost);
  res.status(201).json(newPost);
});

// Rates & Commodities feeds
app.get('/api/rates', (req, res) => {
  res.json(MOCK_CURRENCIES);
});

app.get('/api/commodities', (req, res) => {
  res.json(MOCK_COMMODITIES);
});

// Gemini Chat & Trade Intelligence API
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message input is required." });
  }

  const client = getGeminiClient();

  if (!client) {
    // Offline AI intelligence fallback response pattern
    console.log("Using local intelligence for chat response.");
    const query = message.toLowerCase();
    let reply = "Hello! I am TransitGlobal's AI Trade Co-pilot. I can advise you on cargo logistics, tariffs, shipping terms, and product sourcing. Currently I am running in local offline support mode. How can we optimize your supply chains today?";

    if (query.includes("ship") || query.includes("track") || query.includes("carrier") || query.includes("logistic")) {
      reply = "Our logistics terminal shows active container fleets traveling mid-Pacific on COSCO and MSC logistics lines. Standard ocean lines take 14 to 22 days between South-East Asia and Western ports. If you have a tracking code (like TRK-9831-285), type it in our Tracking dashboard above to track the direct maritime container coordinates, customs declarations, and final terminal depot releases.";
    } else if (query.includes("rate") || query.includes("currency") || query.includes("price") || query.includes("usd") || query.includes("euro")) {
      reply = "Trade indexes are displaying slightly high volatility on the LME Copper Grade A index (currently trading at $9,850 per metric ton) while oil has hovered around $82.14. Major currencies EUR/USD are stabilizing around 1.0854. Refer to our interactive 'Global Trade Dashboard' above to preview current exchange indexes, bulk MOQs, and commodity trends.";
    } else if (query.includes("solar") || query.includes("energy") || query.includes("product") || query.includes("sourcing") || query.includes("copper") || query.includes("coffee")) {
      reply = "TransitGlobal provides priority direct sourcing channels for Singapore Solar modules, South Korean LFP Battery arrays, custom German heavy CNC equipment, Chilean Copper cathodes, Colombianwashed organic Arabica coffee, and mercerized Egyptian cotton thread. Every single listed wholesale asset guarantees pre-shipment quality screening, full TUV / ASTM certifications, and standardized B2B volume shipping under CIF or FOB agreements.";
    } else if (query.includes("contract") || query.includes("quote") || query.includes("import") || query.includes("export") || query.includes("help") || query.includes("contact")) {
      reply = "If you wish to schedule an import/export or obtain a customs valuation quote, please fill out the 'Request Quotation' form in our Catalog or use our 'Contact Page' above. Our administrative logistics directors team will instantly review your inquiry, formulate custom freight routes, issue invoices/customs estimates, and update your Client Portal account. Let us know if you need assistance submitting a bulk inquiry.";
    }

    // Wrap in a slight simulated delay for human visual realism
    setTimeout(() => {
      res.json({ text: reply });
    }, 450);
    return;
  }

  try {
    // Format conversation history for Gemini
    const formattedContents = [];
    if (history && Array.isArray(history)) {
      history.forEach((h: ChatMessage) => {
        formattedContents.push({
          role: h.sender === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }]
        });
      });
    }

    // Push current user statement
    formattedContents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: `You are TransitGlobal's Premium AI Trade Co-pilot, an elite corporate advisor on B2B global supply chains, international shipping logistics, customs brokers regulation, IncoTerms (FOB, CIF, EXW, DDP), bulk sourcing, and real-time terminal routing.
Your clients are international merchants, shipping managers, and industrial procurement officers. Always sound extremely corporate, elite, trustworthy, concise, and professional. 
Make direct references to our premium products (Singapore Solar Modules, Copper Cathodes, Colombian Organic Arabica, Grid LFP Battery packs, CNC Machine Toolings, Egyptian Mercerized Cotton) and tracking systems (e.g. TRK-9831-285, TRK-2410-891) if requested. Do not make up fake URLs. Write short, scannable paragraphs and bullet points.`
      }
    });

    const replyText = response.text || "Our Trade servers encountered an temporary network challenge. Please repeat your query.";
    res.json({ text: replyText });
  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    res.status(500).json({ error: "Gemini server response interrupted. Please submit your inquiry manually.", details: error.message });
  }
});

// Start server block ------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Vite middleware integrates to Express in dev
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express application active on http://localhost:${PORT}`);
  });
}

startServer();
