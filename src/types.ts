export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  currency: string;
  moq: string; // Minimum Order Quantity
  countryOrigin: string;
  description: string;
  exportAvailability: string; // e.g., "Available - Ships in 7 Days"
  specifications: { [key: string]: string };
}

export interface ShipmentMilestone {
  date: string;
  title: string;
  location: string;
  completed: boolean;
}

export interface Shipment {
  id: string;
  trackingNumber: string;
  cargoType: string;
  weight: string; // e.g., "18,500 kg"
  containerSize: string; // e.g., "40ft HC"
  origin: string;
  destination: string;
  status: 'In Transit' | 'Customs Clearance' | 'Departed Port' | 'Arrived Destination' | 'Pending';
  currentPort: string;
  vesselName: string;
  estimatedArrival: string;
  milestones: ShipmentMilestone[];
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  type: 'general' | 'quote' | 'import' | 'export';
  status: 'New' | 'In Contact' | 'Resolved';
  date: string;
  product?: string;
  quantity?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  date: string;
  image: string;
  author: string;
  tags: string[];
}

export interface CurrencyRate {
  pair: string;
  rate: number;
  change: number; // percentage change
}

export interface CommodityPrice {
  name: string;
  price: string;
  unit: string;
  change: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export interface UserSession {
  email: string;
  name: string;
  company: string;
  role: 'admin' | 'client' | null;
  id: string;
}
