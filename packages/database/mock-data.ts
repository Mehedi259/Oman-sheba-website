// Mock Data for Development (Without Database)
// This file provides in-memory data for development without Docker/PostgreSQL

export const mockJobs = [
  {
    id: "1",
    title: "Senior Software Engineer",
    titleBn: "সিনিয়র সফটওয়্যার ইঞ্জিনিয়ার",
    slug: "senior-software-engineer-muscat",
    description: "We are looking for an experienced software engineer to join our team.",
    descriptionBn: "আমরা আমাদের টিমে যোগ দিতে একজন অভিজ্ঞ সফটওয়্যার ইঞ্জিনিয়ার খুঁজছি।",
    company: {
      id: "c1",
      name: "Tech Solutions Oman",
      nameBn: "টেক সলিউশন্স ওমান",
      logo: "/images/companies/tech-solutions.png",
      verified: true,
    },
    category: {
      id: "cat1",
      name: "Information Technology",
      nameBn: "তথ্য প্রযুক্তি",
    },
    type: "FULL_TIME",
    experience: "3-5 years",
    education: "Bachelor's in Computer Science",
    vacancy: 2,
    city: "Muscat",
    area: "Al Khuwair",
    salaryMin: 800,
    salaryMax: 1200,
    salaryCurrency: "OMR",
    salaryPeriod: "MONTHLY",
    skills: ["JavaScript", "React", "Node.js", "TypeScript"],
    benefits: ["Health Insurance", "Annual Leave", "Flight Tickets"],
    applicationDeadline: new Date("2026-07-31"),
    applicationEmail: "hr@techsolutions.om",
    applicationPhone: "+968 9123 4567",
    status: "PUBLISHED",
    featured: true,
    views: 245,
    createdAt: new Date("2026-06-01"),
    updatedAt: new Date("2026-06-15"),
  },
  {
    id: "2",
    title: "Civil Engineer",
    titleBn: "সিভিল ইঞ্জিনিয়ার",
    slug: "civil-engineer-salalah",
    description: "Experienced civil engineer needed for construction projects.",
    descriptionBn: "নির্মাণ প্রকল্পের জন্য অভিজ্ঞ সিভিল ইঞ্জিনিয়ার প্রয়োজন।",
    company: {
      id: "c2",
      name: "Oman Construction LLC",
      nameBn: "ওমান কন্সট্রাকশন এলএলসি",
      logo: "/images/companies/oman-construction.png",
      verified: true,
    },
    category: {
      id: "cat2",
      name: "Engineering",
      nameBn: "প্রকৌশল",
    },
    type: "FULL_TIME",
    experience: "5-8 years",
    education: "Bachelor's in Civil Engineering",
    vacancy: 3,
    city: "Salalah",
    area: "Al Dahariz",
    salaryMin: 900,
    salaryMax: 1400,
    salaryCurrency: "OMR",
    salaryPeriod: "MONTHLY",
    skills: ["AutoCAD", "Project Management", "Site Supervision"],
    benefits: ["Accommodation", "Transportation", "Health Insurance"],
    applicationDeadline: new Date("2026-08-15"),
    applicationEmail: "recruitment@omanconstruction.om",
    applicationPhone: "+968 9234 5678",
    status: "PUBLISHED",
    featured: true,
    views: 189,
    createdAt: new Date("2026-06-10"),
    updatedAt: new Date("2026-06-20"),
  },
  {
    id: "3",
    title: "Restaurant Manager",
    titleBn: "রেস্টুরেন্ট ম্যানেজার",
    slug: "restaurant-manager-muscat",
    description: "Looking for experienced restaurant manager for fine dining restaurant.",
    descriptionBn: "ফাইন ডাইনিং রেস্তোরাঁর জন্য অভিজ্ঞ রেস্তোরাঁ ম্যানেজার খুঁজছি।",
    company: {
      id: "c3",
      name: "Royal Dining Oman",
      nameBn: "রয়্যাল ডাইনিং ওমান",
      logo: "/images/companies/royal-dining.png",
      verified: false,
    },
    category: {
      id: "cat3",
      name: "Hospitality",
      nameBn: "আতিথেয়তা",
    },
    type: "FULL_TIME",
    experience: "3-6 years",
    education: "Diploma in Hotel Management",
    vacancy: 1,
    city: "Muscat",
    area: "Qurum",
    salaryMin: 600,
    salaryMax: 900,
    salaryCurrency: "OMR",
    salaryPeriod: "MONTHLY",
    skills: ["Team Management", "Customer Service", "Food Safety"],
    benefits: ["Meals", "Transportation", "Tips"],
    applicationDeadline: new Date("2026-07-20"),
    applicationEmail: "hr@royaldining.om",
    status: "PUBLISHED",
    featured: false,
    views: 134,
    createdAt: new Date("2026-06-15"),
    updatedAt: new Date("2026-06-15"),
  },
];

export const mockProperties = [
  {
    id: "p1",
    title: "Spacious 2 BHK Apartment in Al Khuwair",
    titleBn: "আল খুয়াইরে প্রশস্ত ২ বিএইচকে অ্যাপার্টমেন্ট",
    slug: "2bhk-apartment-al-khuwair",
    description: "Modern 2 bedroom apartment with all amenities in prime location.",
    descriptionBn: "প্রধান অবস্থানে সমস্ত সুবিধা সহ আধুনিক 2 শয়নকক্ষ অ্যাপার্টমেন্ট।",
    type: "RESIDENTIAL",
    category: "APARTMENT",
    purpose: "RENT",
    city: "Muscat",
    area: "Al Khuwair",
    bedrooms: 2,
    bathrooms: 2,
    size: 1200,
    sizeUnit: "sqft",
    floor: 3,
    totalFloors: 5,
    furnished: "SEMI_FURNISHED",
    price: 350,
    currency: "OMR",
    priceNegotiable: true,
    amenities: ["Parking", "Gym", "Swimming Pool", "Security", "Elevator"],
    images: ["/images/properties/apt1-1.jpg", "/images/properties/apt1-2.jpg"],
    contactName: "Ahmed Rahman",
    contactPhone: "+968 9345 6789",
    contactWhatsapp: "+968 9345 6789",
    availableFrom: new Date("2026-07-01"),
    status: "PUBLISHED",
    featured: true,
    verified: true,
    views: 312,
    createdAt: new Date("2026-06-05"),
  },
  {
    id: "p2",
    title: "3 BHK Villa for Sale in Al Mawaleh",
    titleBn: "আল মাওয়ালেহে বিক্রয়ের জন্য ৩ বিএইচকে ভিলা",
    slug: "3bhk-villa-al-mawaleh-sale",
    description: "Beautiful villa with garden and private parking.",
    descriptionBn: "বাগান এবং ব্যক্তিগত পার্কিং সহ সুন্দর ভিলা।",
    type: "RESIDENTIAL",
    category: "VILLA",
    purpose: "SALE",
    city: "Muscat",
    area: "Al Mawaleh",
    bedrooms: 3,
    bathrooms: 3,
    size: 2500,
    sizeUnit: "sqft",
    furnished: "UNFURNISHED",
    price: 85000,
    currency: "OMR",
    priceNegotiable: true,
    amenities: ["Garden", "Parking", "Maid Room", "Storage"],
    images: ["/images/properties/villa1-1.jpg"],
    contactName: "Karim Abdullah",
    contactPhone: "+968 9456 7890",
    contactWhatsapp: "+968 9456 7890",
    status: "PUBLISHED",
    featured: true,
    verified: true,
    views: 456,
    createdAt: new Date("2026-06-12"),
  },
  {
    id: "p3",
    title: "Bed Space Available in Ruwi",
    titleBn: "রুভিতে বেড স্পেস উপলব্ধ",
    slug: "bed-space-ruwi",
    description: "Clean bed space in shared room for working professionals.",
    descriptionBn: "কর্মজীবী পেশাদারদের জন্য শেয়ার করা রুমে পরিষ্কার বিছানার জায়গা।",
    type: "RESIDENTIAL",
    category: "BED_SPACE",
    purpose: "RENT",
    city: "Muscat",
    area: "Ruwi",
    price: 45,
    currency: "OMR",
    priceNegotiable: false,
    amenities: ["WiFi", "AC", "Kitchen", "Laundry"],
    images: ["/images/properties/bedspace1.jpg"],
    contactName: "Rashid Ahmed",
    contactPhone: "+968 9567 8901",
    availableFrom: new Date("2026-07-01"),
    status: "PUBLISHED",
    featured: false,
    verified: false,
    views: 89,
    createdAt: new Date("2026-06-18"),
  },
];

export const mockVehicles = [
  {
    id: "v1",
    title: "Toyota Corolla 2020 - Excellent Condition",
    titleBn: "টয়োটা করোলা 2020 - চমৎকার অবস্থা",
    slug: "toyota-corolla-2020-muscat",
    description: "Well maintained Toyota Corolla with full service history.",
    descriptionBn: "সম্পূর্ণ সেবা ইতিহাস সহ ভাল রক্ষণাবেক্ষণ টয়োটা করোলা।",
    type: "CAR",
    make: "Toyota",
    model: "Corolla",
    year: 2020,
    color: "White",
    mileage: 45000,
    condition: "USED_GOOD",
    transmission: "AUTOMATIC",
    fuelType: "PETROL",
    engineCapacity: "1.8L",
    seats: 5,
    doors: 4,
    insurance: true,
    insuranceExpiry: new Date("2027-03-15"),
    purpose: "SALE",
    price: 5500,
    currency: "OMR",
    priceNegotiable: true,
    images: ["/images/vehicles/corolla1.jpg", "/images/vehicles/corolla2.jpg"],
    city: "Muscat",
    area: "Al Ghubrah",
    contactName: "Mahmood Hassan",
    contactPhone: "+968 9678 9012",
    contactWhatsapp: "+968 9678 9012",
    status: "PUBLISHED",
    featured: true,
    verified: true,
    sold: false,
    views: 278,
    createdAt: new Date("2026-06-08"),
  },
  {
    id: "v2",
    title: "Nissan Patrol 2019 - 4WD",
    titleBn: "নিসান প্যাট্রোল 2019 - 4WD",
    slug: "nissan-patrol-2019-4wd",
    description: "Powerful 4WD SUV perfect for desert driving.",
    descriptionBn: "মরুভূমি ড্রাইভিং জন্য নিখুঁত শক্তিশালী 4WD SUV।",
    type: "CAR",
    make: "Nissan",
    model: "Patrol",
    year: 2019,
    color: "Black",
    mileage: 60000,
    condition: "USED_GOOD",
    transmission: "AUTOMATIC",
    fuelType: "PETROL",
    engineCapacity: "4.0L",
    seats: 7,
    doors: 4,
    insurance: true,
    insuranceExpiry: new Date("2027-01-20"),
    purpose: "SALE",
    price: 12500,
    currency: "OMR",
    priceNegotiable: true,
    images: ["/images/vehicles/patrol1.jpg"],
    city: "Sohar",
    area: "Central Sohar",
    contactName: "Tariq Ali",
    contactPhone: "+968 9789 0123",
    contactWhatsapp: "+968 9789 0123",
    status: "PUBLISHED",
    featured: false,
    verified: true,
    sold: false,
    views: 167,
    createdAt: new Date("2026-06-14"),
  },
];

export const mockServices = [
  {
    id: "s1",
    name: "Al Noor Medical Center",
    nameBn: "আল নূর মেডিকেল সেন্টার",
    slug: "al-noor-medical-center",
    description: "Comprehensive healthcare services with experienced doctors.",
    descriptionBn: "অভিজ্ঞ ডাক্তারদের সাথে ব্যাপক স্বাস্থ্যসেবা সেবা।",
    category: {
      id: "sc1",
      name: "Medical",
      nameBn: "চিকিৎসা",
    },
    email: "info@alnoormedical.om",
    phone: "+968 2456 7890",
    whatsapp: "+968 9890 1234",
    website: "https://alnoormedical.om",
    address: "Al Khuwair Street, Building 123",
    city: "Muscat",
    area: "Al Khuwair",
    services: ["General Medicine", "Dentistry", "Laboratory", "Pharmacy"],
    images: ["/images/services/medical1.jpg"],
    verified: true,
    status: "APPROVED",
    rating: 4.5,
    reviewCount: 89,
    views: 523,
    createdAt: new Date("2026-05-20"),
  },
  {
    id: "s2",
    name: "Quick Visa Services",
    nameBn: "কুইক ভিসা সার্ভিসেস",
    slug: "quick-visa-services",
    description: "Fast and reliable visa processing services.",
    descriptionBn: "দ্রুত এবং নির্ভরযোগ্য ভিসা প্রসেসিং সেবা।",
    category: {
      id: "sc2",
      name: "Visa Services",
      nameBn: "ভিসা সেবা",
    },
    phone: "+968 2567 8901",
    whatsapp: "+968 9901 2345",
    address: "Ruwi Commercial District",
    city: "Muscat",
    area: "Ruwi",
    services: ["Visa Renewal", "Family Visa", "Visit Visa", "Work Permit"],
    images: ["/images/services/visa1.jpg"],
    verified: true,
    status: "APPROVED",
    rating: 4.7,
    reviewCount: 156,
    views: 712,
    createdAt: new Date("2026-05-15"),
  },
  {
    id: "s3",
    name: "Bismillah Travel Agency",
    nameBn: "বিসমিল্লাহ ট্রাভেল এজেন্সি",
    slug: "bismillah-travel-agency",
    description: "Complete travel solutions for Bangladesh and international destinations.",
    descriptionBn: "বাংলাদেশ এবং আন্তর্জাতিক গন্তব্যের জন্য সম্পূর্ণ ভ্রমণ সমাধান।",
    category: {
      id: "sc3",
      name: "Travel Agency",
      nameBn: "ট্রাভেল এজেন্সি",
    },
    email: "booking@bismillahtravel.om",
    phone: "+968 2678 9012",
    whatsapp: "+968 9012 3456",
    website: "https://bismillahtravel.om",
    address: "Qurum Business District",
    city: "Muscat",
    area: "Qurum",
    services: ["Flight Booking", "Hotel Reservation", "Tour Packages", "Travel Insurance"],
    images: ["/images/services/travel1.jpg"],
    verified: true,
    status: "APPROVED",
    rating: 4.8,
    reviewCount: 234,
    views: 891,
    createdAt: new Date("2026-05-10"),
  },
];

export const mockNews = [
  {
    id: "n1",
    title: "New Work Visa Rules in Oman 2026",
    titleBn: "ওমানে নতুন ওয়ার্ক ভিসা নিয়ম ২০২৬",
    slug: "new-work-visa-rules-oman-2026",
    excerpt: "Important updates on work visa regulations for expatriates in Oman.",
    excerptBn: "ওমানে প্রবাসীদের জন্য ওয়ার্ক ভিসা নিয়মে গুরুত্বপূর্ণ আপডেট।",
    content: "The Ministry of Labour has announced new regulations...",
    contentBn: "শ্রম মন্ত্রণালয় নতুন নিয়ম ঘোষণা করেছে...",
    type: "NEWS",
    featuredImage: "/images/news/visa-rules.jpg",
    tags: ["visa", "work permit", "regulations"],
    status: "PUBLISHED",
    featured: true,
    views: 1234,
    publishedAt: new Date("2026-06-25"),
    createdAt: new Date("2026-06-25"),
  },
  {
    id: "n2",
    title: "Bangladesh Embassy Announces New Services",
    titleBn: "বাংলাদেশ দূতাবাস নতুন সেবা ঘোষণা করেছে",
    slug: "bangladesh-embassy-new-services",
    excerpt: "Bangladesh Embassy in Muscat introduces online passport renewal.",
    excerptBn: "মাস্কাটে বাংলাদেশ দূতাবাস অনলাইন পাসপোর্ট নবায়ন চালু করেছে।",
    content: "The Embassy of Bangladesh has launched...",
    contentBn: "বাংলাদেশ দূতাবাস চালু করেছে...",
    type: "NEWS",
    featuredImage: "/images/news/embassy.jpg",
    tags: ["embassy", "passport", "services"],
    status: "PUBLISHED",
    featured: true,
    views: 987,
    publishedAt: new Date("2026-06-26"),
    createdAt: new Date("2026-06-26"),
  },
];

export const mockEmergencyContacts = [
  {
    id: "e1",
    name: "Royal Oman Police",
    nameBn: "রয়্যাল ওমান পুলিশ",
    category: "Police",
    phone: "9999",
    description: "Emergency police services",
    descriptionBn: "জরুরী পুলিশ সেবা",
    order: 1,
    active: true,
  },
  {
    id: "e2",
    name: "Ambulance Service",
    nameBn: "অ্যাম্বুলেন্স সেবা",
    category: "Medical",
    phone: "9999",
    description: "Emergency medical services",
    descriptionBn: "জরুরী চিকিৎসা সেবা",
    order: 2,
    active: true,
  },
  {
    id: "e3",
    name: "Fire Service",
    nameBn: "ফায়ার সার্ভিস",
    category: "Fire",
    phone: "9999",
    description: "Fire emergency services",
    descriptionBn: "আগুন জরুরী সেবা",
    order: 3,
    active: true,
  },
  {
    id: "e4",
    name: "Bangladesh Embassy Muscat",
    nameBn: "বাংলাদেশ দূতাবাস মাস্কাট",
    category: "Embassy",
    phone: "+968 2469 8989",
    alternatePhone: "+968 2469 7373",
    description: "Bangladesh Embassy emergency hotline",
    descriptionBn: "বাংলাদেশ দূতাবাস জরুরী হটলাইন",
    order: 4,
    active: true,
  },
];

// Helper functions
export const getJobs = (filters?: { city?: string; type?: string; limit?: number }) => {
  let filtered = [...mockJobs];
  
  if (filters?.city) {
    filtered = filtered.filter(job => job.city === filters.city);
  }
  
  if (filters?.type) {
    filtered = filtered.filter(job => job.type === filters.type);
  }
  
  if (filters?.limit) {
    filtered = filtered.slice(0, filters.limit);
  }
  
  return filtered;
};

export const getJobById = (id: string) => {
  return mockJobs.find(job => job.id === id);
};

export const getJobBySlug = (slug: string) => {
  return mockJobs.find(job => job.slug === slug);
};

export const getProperties = (filters?: { city?: string; purpose?: string; limit?: number }) => {
  let filtered = [...mockProperties];
  
  if (filters?.city) {
    filtered = filtered.filter(prop => prop.city === filters.city);
  }
  
  if (filters?.purpose) {
    filtered = filtered.filter(prop => prop.purpose === filters.purpose);
  }
  
  if (filters?.limit) {
    filtered = filtered.slice(0, filters.limit);
  }
  
  return filtered;
};

export const getPropertyById = (id: string) => {
  return mockProperties.find(prop => prop.id === id);
};

export const getPropertyBySlug = (slug: string) => {
  return mockProperties.find(prop => prop.slug === slug);
};

export const getVehicles = (filters?: { city?: string; type?: string; limit?: number }) => {
  let filtered = [...mockVehicles];
  
  if (filters?.city) {
    filtered = filtered.filter(vehicle => vehicle.city === filters.city);
  }
  
  if (filters?.type) {
    filtered = filtered.filter(vehicle => vehicle.type === filters.type);
  }
  
  if (filters?.limit) {
    filtered = filtered.slice(0, filters.limit);
  }
  
  return filtered;
};

export const getVehicleById = (id: string) => {
  return mockVehicles.find(vehicle => vehicle.id === id);
};

export const getServices = (filters?: { city?: string; category?: string; limit?: number }) => {
  let filtered = [...mockServices];
  
  if (filters?.city) {
    filtered = filtered.filter(service => service.city === filters.city);
  }
  
  if (filters?.limit) {
    filtered = filtered.slice(0, filters.limit);
  }
  
  return filtered;
};

export const getServiceById = (id: string) => {
  return mockServices.find(service => service.id === id);
};

export const getNews = (filters?: { type?: string; featured?: boolean; limit?: number }) => {
  let filtered = [...mockNews];
  
  if (filters?.featured !== undefined) {
    filtered = filtered.filter(news => news.featured === filters.featured);
  }
  
  if (filters?.limit) {
    filtered = filtered.slice(0, filters.limit);
  }
  
  return filtered;
};

export const getEmergencyContacts = () => {
  return mockEmergencyContacts.filter(contact => contact.active);
};
