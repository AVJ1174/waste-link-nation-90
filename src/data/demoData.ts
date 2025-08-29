// Demo data for vendors, citizens, and rewards

export interface Vendor {
  id: string;
  location: string;
  coordinates: { lat: number; lng: number };
  wasteType: string;
  quantity: string;
  status: 'available' | 'assigned' | 'collected';
  submittedAt: string;
  contactPhone?: string;
}

export interface CitizenReport {
  id: string;
  citizenId: string;
  citizenName: string;
  location: string;
  coordinates: { lat: number; lng: number };
  wasteType: string;
  description: string;
  imageUrl?: string;
  status: 'reported' | 'assigned' | 'collected';
  submittedAt: string;
  points: number;
}

export interface Citizen {
  id: string;
  name: string;
  phone: string;
  totalPoints: number;
  reportsCount: number;
  joinedAt: string;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  category: 'voucher' | 'product' | 'prize';
  sponsor: string;
  imageUrl?: string;
  stock: number;
}

// Delhi locations for demo data
const delhiLocations = [
  { name: 'Connaught Place', lat: 28.6304, lng: 77.2177 },
  { name: 'Karol Bagh', lat: 28.6507, lng: 77.1900 },
  { name: 'Lajpat Nagar', lat: 28.5656, lng: 77.2430 },
  { name: 'Khan Market', lat: 28.5984, lng: 77.2319 },
  { name: 'Saket', lat: 28.5244, lng: 77.2066 },
  { name: 'Chandni Chowk', lat: 28.6506, lng: 77.2303 },
  { name: 'India Gate', lat: 28.6129, lng: 77.2295 },
  { name: 'Rajouri Garden', lat: 28.6414, lng: 77.1194 },
  { name: 'Dwarka', lat: 28.5921, lng: 77.0460 },
  { name: 'Rohini', lat: 28.7041, lng: 77.1025 },
  { name: 'Janakpuri', lat: 28.6219, lng: 77.0834 },
  { name: 'Laxmi Nagar', lat: 28.6366, lng: 77.2764 },
  { name: 'Tilak Nagar', lat: 28.6414, lng: 77.0916 },
  { name: 'Preet Vihar', lat: 28.6419, lng: 77.2947 },
  { name: 'Mayur Vihar', lat: 28.6088, lng: 77.2914 },
  { name: 'Vasundhara Enclave', lat: 28.6631, lng: 77.2806 },
  { name: 'Pitampura', lat: 28.7041, lng: 77.1319 },
  { name: 'Paschim Vihar', lat: 28.6707, lng: 77.1025 },
  { name: 'Malviya Nagar', lat: 28.5355, lng: 77.2066 },
  { name: 'Green Park', lat: 28.5600, lng: 77.2067 },
];

const wasteTypes = ['Plastic', 'Paper', 'Metal', 'Glass', 'E-waste', 'Organic', 'Textile', 'Mixed'];
const statuses: ('available' | 'assigned' | 'collected')[] = ['available', 'assigned', 'collected'];

function getRandomTime(): string {
  const hours = Math.floor(Math.random() * 24) + 1;
  const unit = hours === 1 ? 'hour' : 'hours';
  return `${hours} ${unit} ago`;
}

function getRandomQuantity(): string {
  const quantities = ['1-2kg', '2-5kg', '5-10kg', '10-15kg', '15-20kg', '1kg', '3kg', '7kg', '12kg', '25kg'];
  return quantities[Math.floor(Math.random() * quantities.length)];
}

// Generate 60 vendor entries
export const mockVendors: Vendor[] = Array.from({ length: 60 }, (_, index) => {
  const location = delhiLocations[index % delhiLocations.length];
  const vendorNum = String(index + 1).padStart(3, '0');
  
  return {
    id: `V${vendorNum}`,
    location: location.name,
    coordinates: { 
      lat: location.lat + (Math.random() - 0.5) * 0.02, 
      lng: location.lng + (Math.random() - 0.5) * 0.02 
    },
    wasteType: wasteTypes[Math.floor(Math.random() * wasteTypes.length)],
    quantity: getRandomQuantity(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    submittedAt: getRandomTime(),
    contactPhone: Math.random() > 0.3 ? `+91 98765${String(Math.floor(Math.random() * 100000)).padStart(5, '0')}` : undefined
  };
});

// Generate 50 citizen reports
export const mockCitizenReports: CitizenReport[] = Array.from({ length: 50 }, (_, index) => {
  const location = delhiLocations[index % delhiLocations.length];
  const reportNum = String(index + 1).padStart(3, '0');
  const citizenNum = String(Math.floor(Math.random() * 200) + 1).padStart(3, '0');
  
  return {
    id: `CR${reportNum}`,
    citizenId: `C${citizenNum}`,
    citizenName: `Citizen ${citizenNum}`,
    location: location.name,
    coordinates: { 
      lat: location.lat + (Math.random() - 0.5) * 0.015, 
      lng: location.lng + (Math.random() - 0.5) * 0.015 
    },
    wasteType: wasteTypes[Math.floor(Math.random() * wasteTypes.length)],
    description: [
      'Illegal dumping near residential area',
      'Overflowing garbage bin',
      'Construction waste on roadside',
      'Plastic bottles scattered in park',
      'Food waste near market area',
      'Electronic waste dumped in open area',
      'Medical waste improperly disposed',
      'Large pile of mixed waste'
    ][Math.floor(Math.random() * 8)],
    status: ['reported', 'assigned', 'collected'][Math.floor(Math.random() * 3)] as 'reported' | 'assigned' | 'collected',
    submittedAt: getRandomTime(),
    points: Math.floor(Math.random() * 50) + 10, // 10-60 points
    imageUrl: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=400&h=300&fit=crop`
  };
});

// Demo citizens
export const mockCitizens: Citizen[] = Array.from({ length: 200 }, (_, index) => {
  const citizenNum = String(index + 1).padStart(3, '0');
  const reportsCount = Math.floor(Math.random() * 15) + 1;
  const avgPoints = Math.floor(Math.random() * 40) + 20;
  
  return {
    id: `C${citizenNum}`,
    name: `Citizen ${citizenNum}`,
    phone: `+91 98765${String(Math.floor(Math.random() * 100000)).padStart(5, '0')}`,
    totalPoints: reportsCount * avgPoints,
    reportsCount,
    joinedAt: `${Math.floor(Math.random() * 30) + 1} days ago`
  };
});

// Demo rewards
export const mockRewards: Reward[] = [
  {
    id: 'R001',
    title: 'Amazon Gift Voucher - ₹500',
    description: 'Get a ₹500 Amazon gift voucher for your eco-friendly efforts!',
    pointsCost: 500,
    category: 'voucher',
    sponsor: 'Amazon',
    stock: 50
  },
  {
    id: 'R002',
    title: 'Zomato Gold Membership',
    description: '3-month Zomato Gold membership with exclusive discounts',
    pointsCost: 750,
    category: 'voucher',
    sponsor: 'Zomato',
    stock: 25
  },
  {
    id: 'R003',
    title: 'Eco-Friendly Water Bottle',
    description: 'Stainless steel water bottle made from recycled materials',
    pointsCost: 300,
    category: 'product',
    sponsor: 'EcoLife',
    stock: 100
  },
  {
    id: 'R004',
    title: 'Plant a Tree Certificate',
    description: 'Plant a tree in your name and get a certificate',
    pointsCost: 200,
    category: 'prize',
    sponsor: 'Green Delhi',
    stock: 200
  },
  {
    id: 'R005',
    title: 'Flipkart Voucher - ₹1000',
    description: 'Shopping voucher worth ₹1000 for Flipkart',
    pointsCost: 1000,
    category: 'voucher',
    sponsor: 'Flipkart',
    stock: 30
  },
  {
    id: 'R006',
    title: 'Organic Vegetable Box',
    description: 'Fresh organic vegetables delivered to your home',
    pointsCost: 400,
    category: 'product',
    sponsor: 'Organic Farm',
    stock: 40
  },
  {
    id: 'R007',
    title: 'Movie Tickets - PVR',
    description: 'Two movie tickets for any PVR cinema',
    pointsCost: 600,
    category: 'voucher',
    sponsor: 'PVR',
    stock: 20
  },
  {
    id: 'R008',
    title: 'Solar Power Bank',
    description: 'Eco-friendly solar power bank for your devices',
    pointsCost: 800,
    category: 'product',
    sponsor: 'SolarTech',
    stock: 15
  }
];