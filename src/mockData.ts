import { Product, Shipment, BlogPost, CurrencyRate, CommodityPrice } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Industrial Monocrystalline Solar Panels (550W)",
    category: "Renewable Energy",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80",
    price: 88,
    currency: "USD",
    moq: "100 Units (1 Container)",
    countryOrigin: "Singapore",
    description: "Highly efficient Grade-A monocrystalline silicon solar modules designed for large-scale B2B commercial power generation. Built-in multi-busbar and anti-PID coatings.",
    exportAvailability: "In Stock - Ships in 5 Days",
    specifications: {
      "Power Output": "550 Watts",
      "Efficiency": "21.3%",
      "Dimensions": "2279 x 1134 x 35 mm",
      "Weight": "28.6 kg per panel",
      "Certification": "TUV Nord, CE, IEC 61215",
      "Warrantee": "25-Year Linear Power Warranty"
    }
  },
  {
    id: "prod-2",
    name: "High-Purity 99.99% Copper Cathodes (Grade A)",
    category: "Metals & Minerals",
    image: "https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=600&q=80",
    price: 8520,
    currency: "USD",
    moq: "20 Metric Tons",
    countryOrigin: "Chile",
    description: "Electrolytic copper cathodes of superb purity, conforming strictly to LME Grade A standards. Ideal for high-conductivity cable drawing and mechanical alloy fabrications.",
    exportAvailability: "Continuous Supply - 14 Days Lead",
    specifications: {
      "Purity": "99.99% Minimum",
      "Format": "Palletized sheets bundle",
      "Sheet Mass": "approx 125 kg each",
      "Standard": "ASTM B115-00",
      "Package": "Steel strapped bundles of 2.5 MT"
    }
  },
  {
    id: "prod-3",
    name: "Commercial Cold-Brew Organic Arabica Beans (GP Grade)",
    category: "Agriculture & Wholesale Food",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=600&q=80",
    price: 4.85,
    currency: "USD", // Per kg
    moq: "5,000 kg",
    countryOrigin: "Colombia",
    description: "Single-origin washed arabica beans grown at altitudes of 1,600+ meters in the Huila region. Possesses deep notes of dark chocolate and stone fruits, perfect for commercial roasting franchises.",
    exportAvailability: "Harvest Ready - Immediate Loading",
    specifications: {
      "Bean Grade": "Supreme Excelso",
      "Moisture Content": "11.2% Average",
      "Process": "Wet milled, fully washed",
      "Packaging": "60 kg sisal jute bags with grainpro lining",
      "Sourcing Certificate": "Rainforest Alliance Fully Certified"
    }
  },
  {
    id: "prod-4",
    name: "Active Recharge Lithium-Iron-Phosphate (LFP) Packs",
    category: "Electronics & Grid Batteries",
    image: "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=600&q=80",
    price: 320,
    currency: "USD",
    moq: "50 Packs",
    countryOrigin: "South Korea",
    description: "Reliable, space-saving LFP storage systems designed for utility-scale solar and heavy electric vehicle applications. Thermal management modules fully pre-integrated.",
    exportAvailability: "Lead Time 21 Days",
    specifications: {
      "Model": "LFP-48V-100Ah",
      "Nominal Voltage": "51.2 V",
      "Rated Capacity": "5.12 kWh",
      "Cycle Life": "6,000+ @ 80% DOD",
      "Protocols": "CANBUS, RS485"
    }
  },
  {
    id: "prod-5",
    name: "Precision CNC Machine Center (Heavy Industrial Tooling)",
    category: "Industrial Machinery",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    price: 48500,
    currency: "USD",
    moq: "1 Unit",
    countryOrigin: "Germany",
    description: "High-speed 5-axis vertical machining center engineered for aerospace-grade precision milling. Supported by top-tier servomotors and automatic tool-changers.",
    exportAvailability: "Made to Order - Ships in 60 Days",
    specifications: {
      "Travel Range": "X: 800mm, Y: 550mm, Z: 510mm",
      "Spindle Torque": "135 Nm",
      "Max Spindle Speed": "18,000 RPM",
      "Tool Capacity": "30-slots chain type"
    }
  },
  {
    id: "prod-6",
    name: "Egyptian Giza Premium Quality Cotton Thread Spools",
    category: "Textiles & Materials",
    image: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=600&q=80",
    price: 12.50,
    currency: "USD",
    moq: "1,000 kg",
    countryOrigin: "Egypt",
    description: "Woven long-staple cotton threads sourced ethically from Giza delta farms. Characterized by unmatched durability, minimal fraying, and a natural bright luster for luxury clothing manufacturers.",
    exportAvailability: "In Stock - Custom dyed to PANTONE in 10 Days",
    specifications: {
      "Yarn Count": "80s/2 combed compact",
      "Staple Length": "35.5 mm to 38 mm",
      "Luster Type": "Mercerized finish",
      "Azo Dyes": "100% Free - OEKO-TEX Standard 100"
    }
  }
];

export const INITIAL_SHIPMENTS: Shipment[] = [
  {
    id: "ship-101",
    trackingNumber: "TRK-9831-285",
    cargoType: "Lithium-Iron Batteries (LFP)",
    weight: "16,200 kg",
    containerSize: "40ft High Cube Container",
    origin: "Port of Busan, South Korea",
    destination: "Port of Los Angeles, USA",
    status: "In Transit",
    currentPort: "Mid-Pacific Transit (Vessel: MSC OSCAR)",
    vesselName: "MSC OSCAR v.032E",
    estimatedArrival: "2026-06-03",
    milestones: [
      { date: "2026-05-18", title: "Order Picked & Safe Loaded", location: "Factory Gumi, KR", completed: true },
      { date: "2026-05-20", title: "Port customs export clearance approved", location: "Busan, KR", completed: true },
      { date: "2026-05-22", title: "Vessel departed origin port", location: "Busan Terminal, KR", completed: true },
      { date: "2026-05-26", title: "Mid-Voyage GPS Check", location: "Pacific Marine Route", completed: true },
      { date: "2026-06-01", title: "Arrival at destination gateway & US Customs", location: "Los Angeles Pier 400", completed: false },
      { date: "2026-06-03", title: "B2B Delivery Dispatch to Warehouse", location: "California Distribution Hub", completed: false }
    ]
  },
  {
    id: "ship-102",
    trackingNumber: "TRK-2410-891",
    cargoType: "Refined Copper Sheets (LME Grade)",
    weight: "25,000 kg",
    containerSize: "20ft Standard Duty Container",
    origin: "Port of Valparaiso, Chile",
    destination: "Port of Rotterdam, Netherlands",
    status: "Customs Clearance",
    currentPort: "Rotterdam customs terminal (Vessel: HMM ALGECIRAS)",
    vesselName: "HMM ALGECIRAS v.109N",
    estimatedArrival: "2026-05-28",
    milestones: [
      { date: "2026-04-25", title: "Cargo Securely Packed in Pallets", location: "Santiago Refinery, CL", completed: true },
      { date: "2026-05-02", title: "Vessel Outbound Departure CL", location: "Valparaiso, CL", completed: true },
      { date: "2026-05-12", title: "Atlantic Crossing Transit Check", location: "Mid-Atlantic Route", completed: true },
      { date: "2026-05-24", title: "Vessel Docked At Terminal Berth", location: "Port of Rotterdam, NL", completed: true },
      { date: "2026-05-26", title: "Customs Inspection & Duty Evaluation", location: "Rotterdam Customs Hub", completed: true },
      { date: "2026-05-28", title: "Final Depot Pickups", location: "Inland Freight Depot, NL", completed: false }
    ]
  },
  {
    id: "ship-103",
    trackingNumber: "TRK-5512-422",
    cargoType: "Industrial Solar Modules (550W)",
    weight: "14,500 kg",
    containerSize: "40ft High Cube Container",
    origin: "Port of Singapore, SG",
    destination: "Port of Mumbai (Nhava Sheva), India",
    status: "Arrived Destination",
    currentPort: "Delivered - Client Signed Receipt",
    vesselName: "COSCO CHONGQING v.891",
    estimatedArrival: "2026-05-24",
    milestones: [
      { date: "2026-05-10", title: "Export Cargo Cleared", location: "Jurong Terminal, SG", completed: true },
      { date: "2026-05-12", title: "Outbound Departure Vessel", location: "Port of Singapore, SG", completed: true },
      { date: "2026-05-18", title: "Docked NHAVA SHEVA Gateway", location: "Nhava Sheva, IN", completed: true },
      { date: "2026-05-21", title: "Customs Duty Settled & Passed", location: "Mumbai Customs Center, IN", completed: true },
      { date: "2026-05-24", title: "Delivery finalized at Solar Array project", location: "Rajasthan Solar Field SITE, IN", completed: true }
    ]
  },
  {
    id: "ship-104",
    trackingNumber: "TRK-0019-338",
    cargoType: "Organic Gourmet Washed Coffee Beans",
    weight: "22,500 kg",
    containerSize: "40ft Standard Container (Ventilated)",
    origin: "Port of Cartagena, Colombia",
    destination: "Port of Hamburg, Germany",
    status: "Pending",
    currentPort: "Cartagena Loading Berth 3",
    vesselName: "OOCL SCANDINAVIA v.004N",
    estimatedArrival: "2026-06-19",
    milestones: [
      { date: "2026-05-24", title: "Inland Transport - Factory Origin to Port", location: "Huila Farm, CO", completed: true },
      { date: "2026-05-26", title: "Received at Export Container Yard", location: "Cartagena Port, CO", completed: true },
      { date: "2026-05-30", title: "Vessel Outbound Departure planned", location: "Cartagena Terminal, CO", completed: false },
      { date: "2026-06-15", title: "Port Terminal Arrival & Entry Customs", location: "Hamburg Port, DE", completed: false }
    ]
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: "blog-1",
    title: "Navigating Red Sea Maritime Logistics: Essential Shipping Updates for 2026",
    category: "Logistics",
    summary: "A practical guide for global freight forwarders on route adaptations, alternative ports of call, fuel pricing variables, and lead-time guarantees.",
    content: "Global shipping ecosystems face continuous, evolving challenges. As routing patterns via the Cape of Good Hope persist for premium Asia-Europe freight corridors, B2B companies must adapt. \n\nTransit duration has extended by a minimum of 10 to 14 days. These extended cycles impact cash flows, warehousing overheads, and supply predictability. Experts predict that buffer stockpiling and decentralized port locations will become standard strategies during 2026 to combat maritime bottleneck surges. This guide explores tactical route structures and insurance models for risk mitigation.",
    date: "2026-05-12",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80",
    author: "Elena Rostov, Senior Logistics Strategist",
    tags: ["Logistics", "Freight Forwarding", "Red Sea Bypass", "Supply Chain Security"]
  },
  {
    id: "blog-2",
    title: "Critical IncoTerms Review: Demystifying FOB vs CIF For New B2B Purchasers",
    category: "International Trade Manual",
    summary: "Misinterpreting liability transfers can result in catastrophic legal costs. Know exactly when risk transfers between cargo loading and destination ports.",
    content: "When arranging million-dollar purchase programs, understanding standard International Commercial Terms (IncoTerms) is crucial for compliance and risk transfer. In high-volume B2B logistics, FOB (Free On Board) and CIF (Cost, Insurance, and Freight) are frequently used, but they have major operational differences.\n\nUnder FOB, the buyer bears absolute responsibility and insurance costs immediately after cargo crosses the ship's rail at the port of origin. Under CIF, the seller is bound to contract and pay ocean freight and insurance up to the named destination port. This article provides a comprehensive analysis of the cost differences and liability splits between FOB and CIF.",
    date: "2026-05-18",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80",
    author: "Richard Vond, Custom House Brokerage Counsel",
    tags: ["IncoTerms", "Customs clearance", "B2B Legal Guidelines", "Insurance Allocation"]
  },
  {
    id: "blog-3",
    title: "The Clean Tech Sourcing Explosion: Solar and Grid Pack Export Trends",
    category: "Renewable Energy Sourcing",
    summary: "As B2B solar purchasing spikes across North America and Europe, carbon duty regulations like CBAM redefine supplier prerequisites.",
    content: "A major transformation is taking place in heavy resource trade. High-performance solar cells and Lithium battery systems are becoming the top commodities in global markets. However, high-quality manufacturing is only part of the puzzle.\n\nDeveloping legal-compliance frameworks, meeting local carbon footprint quotas, and addressing recycling metrics are now critical components of trading. This article examines the rise of South-East Asian shipping gateways and explains how the Carbon Border Adjustment Mechanism (CBAM) protects European buyers while setting a new baseline for global trade quality.",
    date: "2026-05-24",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80",
    author: "Dr. Kenji Tanaka, Sustainable Resources Director",
    tags: ["Clean Energy", "Renewable Battery Tech", "Carbon Adjustment", "Sustainability Certification"]
  }
];

export const MOCK_CURRENCIES: CurrencyRate[] = [
  { pair: "EUR/USD", rate: 1.0854, change: +0.22 },
  { pair: "USD/JPY", rate: 156.45, change: -0.15 },
  { pair: "GBP/USD", rate: 1.2712, change: +0.08 },
  { pair: "AUD/USD", rate: 0.6625, change: +0.41 },
  { pair: "USD/SGD", rate: 1.3482, change: -0.04 },
  { pair: "USD/CNY", rate: 7.2415, change: +0.12 }
];

export const MOCK_COMMODITIES: CommodityPrice[] = [
  { name: "LME Copper Grade-A", price: "$9,850", unit: "Metric Ton", change: +1.48 },
  { name: "Brent Crude Oil", price: "$82.14", unit: "Barrel", change: -0.73 },
  { name: "Industrial Steel Rebar", price: "$645", unit: "Metric Ton", change: +0.85 },
  { name: "Agricultural Arabica Index", price: "$2.18", unit: "Pound (lb)", change: +2.11 },
  { name: "Solar Grade Polysilicon", price: "$7.20", unit: "kg", change: -1.25 }
];
