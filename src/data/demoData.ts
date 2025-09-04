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

export interface MissedCall {
  id: string;
  callerPhone: string;
  callerType: 'Household' | 'Vendor' | 'Bulk Generator';
  location: string;
  coordinates: { lat: number; lng: number };
  wasteType?: string;
  status: 'Awaiting waste type confirmation' | 'Confirmed' | 'Collected';
  missedCallTime: string;
  confirmedAt?: string;
  confirmedBy?: string;
  notes?: string;
}

// Locations across major Indian cities for demo data
const indianLocations = [
  // Delhi NCR (30 locations)
  { name: 'Connaught Place, Delhi', lat: 28.6304, lng: 77.2177 },
  { name: 'Karol Bagh, Delhi', lat: 28.6507, lng: 77.1900 },
  { name: 'Lajpat Nagar, Delhi', lat: 28.5656, lng: 77.2430 },
  { name: 'Khan Market, Delhi', lat: 28.5984, lng: 77.2319 },
  { name: 'Saket, Delhi', lat: 28.5244, lng: 77.2066 },
  { name: 'Chandni Chowk, Delhi', lat: 28.6506, lng: 77.2303 },
  { name: 'India Gate, Delhi', lat: 28.6129, lng: 77.2295 },
  { name: 'Rajouri Garden, Delhi', lat: 28.6414, lng: 77.1194 },
  { name: 'Dwarka, Delhi', lat: 28.5921, lng: 77.0460 },
  { name: 'Rohini, Delhi', lat: 28.7041, lng: 77.1025 },
  { name: 'Janakpuri, Delhi', lat: 28.6219, lng: 77.0834 },
  { name: 'Laxmi Nagar, Delhi', lat: 28.6366, lng: 77.2764 },
  { name: 'Pitampura, Delhi', lat: 28.7041, lng: 77.1319 },
  { name: 'Malviya Nagar, Delhi', lat: 28.5355, lng: 77.2066 },
  { name: 'Green Park, Delhi', lat: 28.5600, lng: 77.2067 },
  { name: 'Cyber City, Gurgaon', lat: 28.4595, lng: 77.0266 },
  { name: 'Sector 15, Noida', lat: 28.5935, lng: 77.3910 },
  { name: 'MG Road, Gurgaon', lat: 28.4601, lng: 77.0648 },
  { name: 'Sector 18, Noida', lat: 28.5678, lng: 77.3273 },
  { name: 'Vasant Kunj, Delhi', lat: 28.5244, lng: 77.1589 },
  { name: 'Nehru Place, Delhi', lat: 28.5494, lng: 77.2508 },
  { name: 'CP Metro, Delhi', lat: 28.6315, lng: 77.2167 },
  { name: 'Hauz Khas, Delhi', lat: 28.5494, lng: 77.1956 },
  { name: 'Lodi Colony, Delhi', lat: 28.5933, lng: 77.2307 },
  { name: 'Alaknanda, Delhi', lat: 28.5355, lng: 77.2499 },
  { name: 'South Extension, Delhi', lat: 28.5710, lng: 77.2219 },
  { name: 'Kailash Colony, Delhi', lat: 28.5355, lng: 77.2428 },
  { name: 'Greater Kailash, Delhi', lat: 28.5494, lng: 77.2428 },
  { name: 'Vasant Vihar, Delhi', lat: 28.5678, lng: 77.1589 },
  { name: 'Chanakyapuri, Delhi', lat: 28.5933, lng: 77.1956 },

  // Mumbai (25 locations)
  { name: 'Andheri West, Mumbai', lat: 19.1136, lng: 72.8697 },
  { name: 'Bandra, Mumbai', lat: 19.0596, lng: 72.8295 },
  { name: 'Juhu, Mumbai', lat: 19.1075, lng: 72.8263 },
  { name: 'Colaba, Mumbai', lat: 18.9067, lng: 72.8147 },
  { name: 'Worli, Mumbai', lat: 19.0176, lng: 72.8139 },
  { name: 'Powai, Mumbai', lat: 19.1197, lng: 72.9059 },
  { name: 'Malad, Mumbai', lat: 19.1868, lng: 72.8481 },
  { name: 'Thane, Mumbai', lat: 19.2183, lng: 72.9781 },
  { name: 'Navi Mumbai, Mumbai', lat: 19.0330, lng: 73.0297 },
  { name: 'Borivali, Mumbai', lat: 19.2307, lng: 72.8567 },
  { name: 'Kandivali, Mumbai', lat: 19.2043, lng: 72.8527 },
  { name: 'Goregaon, Mumbai', lat: 19.1556, lng: 72.8497 },
  { name: 'Versova, Mumbai', lat: 19.1317, lng: 72.8142 },
  { name: 'Santacruz, Mumbai', lat: 19.0896, lng: 72.8392 },
  { name: 'Khar, Mumbai', lat: 19.0728, lng: 72.8370 },
  { name: 'Linking Road, Mumbai', lat: 19.0544, lng: 72.8301 },
  { name: 'Marine Drive, Mumbai', lat: 18.9438, lng: 72.8232 },
  { name: 'CST, Mumbai', lat: 18.9401, lng: 72.8352 },
  { name: 'Fort, Mumbai', lat: 18.9338, lng: 72.8356 },
  { name: 'Churchgate, Mumbai', lat: 18.9322, lng: 72.8264 },
  { name: 'Dadar, Mumbai', lat: 19.0178, lng: 72.8478 },
  { name: 'Matunga, Mumbai', lat: 19.0270, lng: 72.8570 },
  { name: 'Kings Circle, Mumbai', lat: 19.0270, lng: 72.8570 },
  { name: 'Sion, Mumbai', lat: 19.0404, lng: 72.8618 },
  { name: 'Kurla, Mumbai', lat: 19.0728, lng: 72.8826 },

  // Bangalore (20 locations)
  { name: 'Koramangala, Bangalore', lat: 12.9352, lng: 77.6245 },
  { name: 'Indiranagar, Bangalore', lat: 12.9719, lng: 77.6412 },
  { name: 'Whitefield, Bangalore', lat: 12.9698, lng: 77.7500 },
  { name: 'Electronic City, Bangalore', lat: 12.8456, lng: 77.6603 },
  { name: 'Marathahalli, Bangalore', lat: 12.9591, lng: 77.6974 },
  { name: 'HSR Layout, Bangalore', lat: 12.9082, lng: 77.6476 },
  { name: 'BTM Layout, Bangalore', lat: 12.9165, lng: 77.6101 },
  { name: 'Jayanagar, Bangalore', lat: 12.9279, lng: 77.5937 },
  { name: 'Banashankari, Bangalore', lat: 12.9249, lng: 77.5619 },
  { name: 'Rajajinagar, Bangalore', lat: 12.9916, lng: 77.5712 },
  { name: 'Malleshwaram, Bangalore', lat: 13.0039, lng: 77.5735 },
  { name: 'MG Road, Bangalore', lat: 12.9716, lng: 77.5946 },
  { name: 'Brigade Road, Bangalore', lat: 12.9716, lng: 77.6089 },
  { name: 'Commercial Street, Bangalore', lat: 12.9820, lng: 77.6094 },
  { name: 'Cunningham Road, Bangalore', lat: 12.9890, lng: 77.5935 },
  { name: 'Hebbal, Bangalore', lat: 13.0355, lng: 77.5910 },
  { name: 'Yelahanka, Bangalore', lat: 13.1007, lng: 77.5963 },
  { name: 'Bannerghatta Road, Bangalore', lat: 12.8956, lng: 77.5946 },
  { name: 'Sarjapur Road, Bangalore', lat: 12.9010, lng: 77.6948 },
  { name: 'Outer Ring Road, Bangalore', lat: 12.9539, lng: 77.6821 },

  // Chennai (15 locations)
  { name: 'T Nagar, Chennai', lat: 13.0418, lng: 80.2341 },
  { name: 'Anna Nagar, Chennai', lat: 13.0850, lng: 80.2101 },
  { name: 'Adyar, Chennai', lat: 13.0067, lng: 80.2206 },
  { name: 'Velachery, Chennai', lat: 12.9815, lng: 80.2209 },
  { name: 'OMR, Chennai', lat: 12.8956, lng: 80.2267 },
  { name: 'Porur, Chennai', lat: 13.0389, lng: 80.1565 },
  { name: 'Tambaram, Chennai', lat: 12.9249, lng: 80.1000 },
  { name: 'Chrompet, Chennai', lat: 12.9516, lng: 80.1462 },
  { name: 'Mylapore, Chennai', lat: 13.0339, lng: 80.2619 },
  { name: 'Express Avenue, Chennai', lat: 13.0732, lng: 80.2609 },
  { name: 'Marina Beach, Chennai', lat: 13.0487, lng: 80.2824 },
  { name: 'Besant Nagar, Chennai', lat: 13.0067, lng: 80.2659 },
  { name: 'Nungambakkam, Chennai', lat: 13.0732, lng: 80.2412 },
  { name: 'Egmore, Chennai', lat: 13.0732, lng: 80.2609 },
  { name: 'Central, Chennai', lat: 13.0827, lng: 80.2707 },

  // Hyderabad (15 locations)
  { name: 'Hitech City, Hyderabad', lat: 17.4483, lng: 78.3915 },
  { name: 'Banjara Hills, Hyderabad', lat: 17.4126, lng: 78.4482 },
  { name: 'Jubilee Hills, Hyderabad', lat: 17.4239, lng: 78.4738 },
  { name: 'Gachibowli, Hyderabad', lat: 17.4400, lng: 78.3487 },
  { name: 'Kondapur, Hyderabad', lat: 17.4618, lng: 78.3664 },
  { name: 'Madhapur, Hyderabad', lat: 17.4483, lng: 78.3808 },
  { name: 'Begumpet, Hyderabad', lat: 17.4399, lng: 78.4482 },
  { name: 'Ameerpet, Hyderabad', lat: 17.4374, lng: 78.4482 },
  { name: 'Abids, Hyderabad', lat: 17.3850, lng: 78.4867 },
  { name: 'Secunderabad, Hyderabad', lat: 17.5040, lng: 78.5428 },
  { name: 'Kukatpally, Hyderabad', lat: 17.4849, lng: 78.4138 },
  { name: 'Miyapur, Hyderabad', lat: 17.4967, lng: 78.3594 },
  { name: 'LB Nagar, Hyderabad', lat: 17.3491, lng: 78.5438 },
  { name: 'Dilsukhnagar, Hyderabad', lat: 17.3687, lng: 78.5242 },
  { name: 'Uppal, Hyderabad', lat: 17.4065, lng: 78.5691 },

  // Pune (12 locations)
  { name: 'Koregaon Park, Pune', lat: 18.5362, lng: 73.8958 },
  { name: 'Hinjewadi, Pune', lat: 18.5679, lng: 73.7143 },
  { name: 'Wakad, Pune', lat: 18.5975, lng: 73.7898 },
  { name: 'Baner, Pune', lat: 18.5679, lng: 73.7798 },
  { name: 'Aundh, Pune', lat: 18.5679, lng: 73.8077 },
  { name: 'Kothrud, Pune', lat: 18.5074, lng: 73.8077 },
  { name: 'Shivajinagar, Pune', lat: 18.5304, lng: 73.8567 },
  { name: 'FC Road, Pune', lat: 18.5204, lng: 73.8567 },
  { name: 'MG Road, Pune', lat: 18.5204, lng: 73.8567 },
  { name: 'Camp, Pune', lat: 18.5074, lng: 73.8798 },
  { name: 'Hadapsar, Pune', lat: 18.5089, lng: 73.9370 },
  { name: 'Viman Nagar, Pune', lat: 18.5679, lng: 73.9143 },

  // Kolkata (10 locations)
  { name: 'Park Street, Kolkata', lat: 22.5542, lng: 88.3516 },
  { name: 'Salt Lake, Kolkata', lat: 22.5958, lng: 88.4497 },
  { name: 'New Town, Kolkata', lat: 22.5958, lng: 88.4887 },
  { name: 'Howrah, Kolkata', lat: 22.5958, lng: 88.2636 },
  { name: 'Gariahat, Kolkata', lat: 22.5204, lng: 88.3731 },
  { name: 'Ballygunge, Kolkata', lat: 22.5354, lng: 88.3731 },
  { name: 'Alipore, Kolkata', lat: 22.5354, lng: 88.3387 },
  { name: 'Esplanade, Kolkata', lat: 22.5726, lng: 88.3639 },
  { name: 'Sealdah, Kolkata', lat: 22.5726, lng: 88.3731 },
  { name: 'Rajarhat, Kolkata', lat: 22.6203, lng: 88.4637 },

  // Ahmedabad (8 locations)
  { name: 'SG Highway, Ahmedabad', lat: 23.0395, lng: 72.5661 },
  { name: 'Satellite, Ahmedabad', lat: 23.0395, lng: 72.5197 },
  { name: 'Vastrapur, Ahmedabad', lat: 23.0395, lng: 72.5197 },
  { name: 'Navrangpura, Ahmedabad', lat: 23.0395, lng: 72.5661 },
  { name: 'CG Road, Ahmedabad', lat: 23.0395, lng: 72.5661 },
  { name: 'Ellis Bridge, Ahmedabad', lat: 23.0204, lng: 72.5797 },
  { name: 'Maninagar, Ahmedabad', lat: 22.9959, lng: 72.5797 },
  { name: 'Paldi, Ahmedabad', lat: 23.0204, lng: 72.5661 }
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

// Generate 250 vendor entries across India
export const mockVendors: Vendor[] = Array.from({ length: 250 }, (_, index) => {
  const location = indianLocations[index % indianLocations.length];
  const vendorNum = String(index + 1).padStart(3, '0');
  
  return {
    id: `V${vendorNum}`,
    location: location.name,
    coordinates: { 
      lat: location.lat + (Math.random() - 0.5) * 0.01, 
      lng: location.lng + (Math.random() - 0.5) * 0.01 
    },
    wasteType: wasteTypes[Math.floor(Math.random() * wasteTypes.length)],
    quantity: getRandomQuantity(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    submittedAt: getRandomTime(),
    contactPhone: Math.random() > 0.3 ? `+91 98765${String(Math.floor(Math.random() * 100000)).padStart(5, '0')}` : undefined
  };
});

// Generate 150 citizen reports across India
export const mockCitizenReports: CitizenReport[] = Array.from({ length: 150 }, (_, index) => {
  const location = indianLocations[index % indianLocations.length];
  const reportNum = String(index + 1).padStart(3, '0');
  const citizenNum = String(Math.floor(Math.random() * 500) + 1).padStart(3, '0');
  
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
export const mockCitizens: Citizen[] = Array.from({ length: 500 }, (_, index) => {
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

// Generate 100 missed call records across India
export const mockMissedCalls: MissedCall[] = Array.from({ length: 100 }, (_, index) => {
  const location = indianLocations[index % indianLocations.length];
  const callNum = String(index + 1).padStart(3, '0');
  const callerTypes: ('Household' | 'Vendor' | 'Bulk Generator')[] = ['Household', 'Vendor', 'Bulk Generator'];
  const phoneNumbers = [
    '9876543210', '9988776655', '8899001122', '7766554433', '9977885566',
    '8866774455', '7755663344', '9988007711', '8877669900', '7744556688',
    '9966778899', '8855442211', '7733669988', '9944557766', '8822110099',
    '7711223344', '9933668877', '8800557711', '7799446688', '9955334422',
    '8844221100', '7722558833', '9911447766', '8833669955', '7700882244',
    '9800123456', '8765432109', '7654321098', '9543210987', '8432109876',
    '7321098765', '9210987654', '8109876543', '7098765432', '9987654321',
    '8876543210', '7765432109', '9654321098', '8543210987', '7432109876',
    '9321098765', '8210987654', '7109876543', '9098765432', '8987654321',
    '7876543210', '9765432109', '8654321098', '7543210987', '9432109876',
    '8321098765', '7210987654', '9109876543', '8098765432', '7987654321',
    '9876543100', '8765432011', '7654321022', '9543210933', '8432109844',
    '7321098755', '9210987666', '8109876577', '7098765488', '9987654399',
    '8876543200', '7765432111', '9654321022', '8543210933', '7432109844',
    '9321098755', '8210987666', '7109876577', '9098765488', '8987654399',
    '7876543200', '9765432111', '8654321022', '7543210933', '9432109844',
    '8321098755', '7210987666', '9109876577', '8098765488', '7987654399',
    '9876543111', '8765432122', '7654321133', '9543210944', '8432109855',
    '7321098766', '9210987677', '8109876588', '7098765499', '9987654300',
    '8876543211', '7765432122', '9654321133', '8543210944', '7432109855'
  ];
  
  const isConfirmed = Math.random() > 0.6; // 40% confirmed
  const isCollected = isConfirmed && Math.random() > 0.7; // 30% of confirmed are collected
  
  let status: 'Awaiting waste type confirmation' | 'Confirmed' | 'Collected';
  if (isCollected) {
    status = 'Collected';
  } else if (isConfirmed) {
    status = 'Confirmed';
  } else {
    status = 'Awaiting waste type confirmation';
  }
  
  return {
    id: `MC${callNum}`,
    callerPhone: phoneNumbers[index % phoneNumbers.length],
    callerType: callerTypes[Math.floor(Math.random() * callerTypes.length)],
    location: location.name,
    coordinates: { 
      lat: location.lat + (Math.random() - 0.5) * 0.01, 
      lng: location.lng + (Math.random() - 0.5) * 0.01 
    },
    wasteType: isConfirmed ? wasteTypes[Math.floor(Math.random() * wasteTypes.length)] : undefined,
    status,
    missedCallTime: `${Math.floor(Math.random() * 48) + 1} hours ago`,
    confirmedAt: isConfirmed ? `${Math.floor(Math.random() * 24) + 1} hours ago` : undefined,
    confirmedBy: isConfirmed ? `Kabadiwala K${String(Math.floor(Math.random() * 50) + 1).padStart(3, '0')}` : undefined,
    notes: isConfirmed && Math.random() > 0.5 ? [
      'Large quantity available',
      'Easy access from main road',
      'Properly sorted waste',
      'Regular pickup location',
      'Contact before arrival'
    ][Math.floor(Math.random() * 5)] : undefined
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