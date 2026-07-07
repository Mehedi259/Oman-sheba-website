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
  // Doctors
  {
    id: "s1",
    name: "Dr. Rahman Cardiovascular Specialist",
    nameBn: "ডা. রহমান - হৃদরোগ বিশেষজ্ঞ",
    slug: "dr-rahman-cardiologist",
    description: "Experienced cardiologist with 15+ years of practice.",
    descriptionBn: "15+ বছরের অভিজ্ঞতা সম্পন্ন হৃদরোগ বিশেষজ্ঞ।",
    category: {
      id: "doctors",
      name: "Specialist Doctor",
      nameBn: "বিশেষজ্ঞ ডাক্তার",
    },
    phone: "+968 2456 7890",
    whatsapp: "+968 9890 1234",
    address: "Al Khuwair Medical Complex, 2nd Floor",
    city: "Muscat",
    area: "Al Khuwair",
    services: ["Heart Disease", "Blood Pressure", "ECG", "Consultation"],
    images: ["/images/services/doctor1.jpg"],
    verified: true,
    status: "APPROVED",
    rating: 4.9,
    reviewCount: 145,
    views: 823,
    createdAt: new Date("2026-05-20"),
  },
  {
    id: "s2",
    name: "Dr. Fatima - Pediatrician",
    nameBn: "ডা. ফাতিমা - শিশু বিশেষজ্ঞ",
    slug: "dr-fatima-pediatrician",
    description: "Child specialist with expertise in child development and diseases.",
    descriptionBn: "শিশু বিকাশ এবং রোগে দক্ষতাসম্পন্ন শিশু বিশেষজ্ঞ।",
    category: {
      id: "doctors",
      name: "Specialist Doctor",
      nameBn: "বিশেষজ্ঞ ডাক্তার",
    },
    phone: "+968 2467 8901",
    whatsapp: "+968 9901 2345",
    address: "Qurum Medical Center",
    city: "Muscat",
    area: "Qurum",
    services: ["Child Care", "Vaccination", "Development Check", "Emergency"],
    images: ["/images/services/doctor2.jpg"],
    verified: true,
    status: "APPROVED",
    rating: 4.8,
    reviewCount: 98,
    views: 567,
    createdAt: new Date("2026-05-22"),
  },
  
  // Hospitals
  {
    id: "s3",
    name: "Al Noor Hospital",
    nameBn: "আল নূর হাসপাতাল",
    slug: "al-noor-hospital",
    description: "Multi-specialty hospital with 24/7 emergency services.",
    descriptionBn: "24/7 জরুরী সেবা সহ বহু-বিশেষত্ব হাসপাতাল।",
    category: {
      id: "hospitals",
      name: "Hospital",
      nameBn: "হাসপাতাল",
    },
    email: "info@alnoorhospital.om",
    phone: "+968 2456 7890",
    whatsapp: "+968 9890 1234",
    website: "https://alnoorhospital.om",
    address: "Al Khuwair Street, Building 123",
    city: "Muscat",
    area: "Al Khuwair",
    services: ["Emergency", "Surgery", "ICU", "Laboratory", "Pharmacy", "X-Ray"],
    images: ["/images/services/hospital1.jpg"],
    verified: true,
    status: "APPROVED",
    rating: 4.7,
    reviewCount: 234,
    views: 1523,
    createdAt: new Date("2026-05-15"),
  },
  {
    id: "s4",
    name: "Royal Hospital Muscat",
    nameBn: "রয়্যাল হাসপাতাল মাস্কাট",
    slug: "royal-hospital-muscat",
    description: "Government hospital with comprehensive medical facilities.",
    descriptionBn: "সম্পূর্ণ চিকিৎসা সুবিধা সহ সরকারি হাসপাতাল।",
    category: {
      id: "hospitals",
      name: "Hospital",
      nameBn: "হাসপাতাল",
    },
    phone: "+968 2459 9000",
    address: "Bausher, Muscat",
    city: "Muscat",
    area: "Bausher",
    services: ["All Specialties", "Emergency", "Surgery", "Maternity", "ICU"],
    images: ["/images/services/hospital2.jpg"],
    verified: true,
    status: "APPROVED",
    rating: 4.6,
    reviewCount: 456,
    views: 2134,
    createdAt: new Date("2026-05-10"),
  },

  // Lawyers
  {
    id: "s5",
    name: "Advocate Karim - Labor Law Expert",
    nameBn: "অ্যাডভোকেট করিম - শ্রম আইন বিশেষজ্ঞ",
    slug: "advocate-karim-labor-law",
    description: "Specialized in labor disputes and employment law.",
    descriptionBn: "শ্রম বিরোধ এবং কর্মসংস্থান আইনে বিশেষজ্ঞ।",
    category: {
      id: "lawyers",
      name: "Lawyer",
      nameBn: "আইনজীবী",
    },
    phone: "+968 2478 9012",
    whatsapp: "+968 9912 3456",
    address: "Ruwi Legal Complex, Office 301",
    city: "Muscat",
    area: "Ruwi",
    services: ["Labor Court", "Contract Review", "Visa Issues", "Legal Consultation"],
    images: ["/images/services/lawyer1.jpg"],
    verified: true,
    status: "APPROVED",
    rating: 4.8,
    reviewCount: 123,
    views: 789,
    createdAt: new Date("2026-05-18"),
  },
  {
    id: "s6",
    name: "Rahman & Associates Legal Firm",
    nameBn: "রহমান এন্ড অ্যাসোসিয়েটস আইনি ফার্ম",
    slug: "rahman-associates-legal",
    description: "Full-service law firm handling all expatriate legal matters.",
    descriptionBn: "সকল প্রবাসী আইনি বিষয় পরিচালনাকারী সম্পূর্ণ সেবা আইন ফার্ম।",
    category: {
      id: "lawyers",
      name: "Lawyer",
      nameBn: "আইনজীবী",
    },
    email: "info@rahmanlegal.om",
    phone: "+968 2489 0123",
    whatsapp: "+968 9923 4567",
    website: "https://rahmanlegal.om",
    address: "Al Khuwair Business District",
    city: "Muscat",
    area: "Al Khuwair",
    services: ["Immigration", "Business Law", "Family Law", "Criminal Defense"],
    images: ["/images/services/lawyer2.jpg"],
    verified: true,
    status: "APPROVED",
    rating: 4.9,
    reviewCount: 189,
    views: 1123,
    createdAt: new Date("2026-05-12"),
  },

  // Travel Agencies
  {
    id: "s7",
    name: "Bismillah Travel Agency",
    nameBn: "বিসমিল্লাহ ট্রাভেল এজেন্সি",
    slug: "bismillah-travel-agency",
    description: "Complete travel solutions for Bangladesh and international destinations.",
    descriptionBn: "বাংলাদেশ এবং আন্তর্জাতিক গন্তব্যের জন্য সম্পূর্ণ ভ্রমণ সমাধান।",
    category: {
      id: "travel-agency",
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
    services: ["Flight Booking", "Hotel Reservation", "Tour Packages", "Travel Insurance", "Visa Assistance"],
    images: ["/images/services/travel1.jpg"],
    verified: true,
    status: "APPROVED",
    rating: 4.8,
    reviewCount: 234,
    views: 891,
    createdAt: new Date("2026-05-10"),
  },
  {
    id: "s8",
    name: "Musafly Travel Services",
    nameBn: "মুসাফলাই ট্রাভেল সার্ভিস",
    slug: "musafly-travel-services",
    description: "Your trusted partner for affordable flights and tours.",
    descriptionBn: "সাশ্রয়ী ফ্লাইট এবং ট্যুরের জন্য আপনার বিশ্বস্ত সঙ্গী।",
    category: {
      id: "travel-agency",
      name: "Travel Agency",
      nameBn: "ট্রাভেল এজেন্সি",
    },
    email: "contact@musafly.com",
    phone: "+968 2689 0123",
    whatsapp: "+968 9034 5678",
    website: "https://musafly-website.vercel.app",
    address: "Ruwi Commercial Area",
    city: "Muscat",
    area: "Ruwi",
    services: ["Cheap Flights", "Group Tours", "Umrah Packages", "Honeymoon Packages"],
    images: ["/images/services/travel2.jpg"],
    verified: true,
    status: "APPROVED",
    rating: 4.7,
    reviewCount: 178,
    views: 723,
    createdAt: new Date("2026-05-14"),
  },

  // Hotels
  {
    id: "s9",
    name: "Dhaka Guest House",
    nameBn: "ঢাকা গেস্ট হাউস",
    slug: "dhaka-guest-house",
    description: "Affordable accommodation for Bangladeshi travelers.",
    descriptionBn: "বাংলাদেশী ভ্রমণকারীদের জন্য সাশ্রয়ী আবাসন।",
    category: {
      id: "hotels",
      name: "Hotel",
      nameBn: "হোটেল",
    },
    phone: "+968 2490 1234",
    whatsapp: "+968 9045 6789",
    address: "Ruwi Main Street",
    city: "Muscat",
    area: "Ruwi",
    services: ["Daily Rent", "Weekly Rent", "WiFi", "Parking", "Bengali Food"],
    images: ["/images/services/hotel1.jpg"],
    verified: true,
    status: "APPROVED",
    rating: 4.3,
    reviewCount: 87,
    views: 456,
    createdAt: new Date("2026-05-16"),
  },
  {
    id: "s10",
    name: "Comfort Inn Muscat",
    nameBn: "কমফোর্ট ইন মাস্কাট",
    slug: "comfort-inn-muscat",
    description: "Budget-friendly hotel with modern amenities.",
    descriptionBn: "আধুনিক সুবিধা সহ বাজেট-বান্ধব হোটেল।",
    category: {
      id: "hotels",
      name: "Hotel",
      nameBn: "হোটেল",
    },
    email: "reservation@comfortinn.om",
    phone: "+968 2401 2345",
    whatsapp: "+968 9056 7890",
    address: "Al Ghubrah, Near City Center",
    city: "Muscat",
    area: "Al Ghubrah",
    services: ["AC Rooms", "Restaurant", "WiFi", "Laundry", "24/7 Reception"],
    images: ["/images/services/hotel2.jpg"],
    verified: true,
    status: "APPROVED",
    rating: 4.5,
    reviewCount: 156,
    views: 678,
    createdAt: new Date("2026-05-13"),
  },

  // Money Exchange
  {
    id: "s11",
    name: "Al Ansari Exchange",
    nameBn: "আল আনসারি এক্সচেঞ্জ",
    slug: "al-ansari-exchange",
    description: "Trusted money transfer and currency exchange services.",
    descriptionBn: "বিশ্বস্ত মানি ট্রান্সফার এবং কারেন্সি এক্সচেঞ্জ সেবা।",
    category: {
      id: "money-exchange",
      name: "Money Exchange",
      nameBn: "মানি এক্সচেঞ্জ",
    },
    phone: "+968 2412 3456",
    address: "Ruwi High Street",
    city: "Muscat",
    area: "Ruwi",
    services: ["Money Transfer", "Currency Exchange", "Western Union", "MoneyGram"],
    images: ["/images/services/exchange1.jpg"],
    verified: true,
    status: "APPROVED",
    rating: 4.6,
    reviewCount: 234,
    views: 1234,
    createdAt: new Date("2026-05-11"),
  },
  {
    id: "s12",
    name: "Wall Street Exchange",
    nameBn: "ওয়াল স্ট্রিট এক্সচেঞ্জ",
    slug: "wall-street-exchange",
    description: "Fast remittance to Bangladesh with best rates.",
    descriptionBn: "সেরা হারে বাংলাদেশে দ্রুত রেমিট্যান্স।",
    category: {
      id: "money-exchange",
      name: "Money Exchange",
      nameBn: "মানি এক্সচেঞ্জ",
    },
    phone: "+968 2423 4567",
    whatsapp: "+968 9067 8901",
    address: "Al Khuwair Shopping Complex",
    city: "Muscat",
    area: "Al Khuwair",
    services: ["Bangladesh Remittance", "Currency Exchange", "Online Transfer"],
    images: ["/images/services/exchange2.jpg"],
    verified: true,
    status: "APPROVED",
    rating: 4.7,
    reviewCount: 189,
    views: 967,
    createdAt: new Date("2026-05-09"),
  },

  // Embassy
  {
    id: "s13",
    name: "Bangladesh Embassy Muscat",
    nameBn: "বাংলাদেশ দূতাবাস মাস্কাট",
    slug: "bangladesh-embassy-muscat",
    description: "Official embassy providing consular services to Bangladeshi citizens.",
    descriptionBn: "বাংলাদেশী নাগরিকদের কনস্যুলার সেবা প্রদানকারী সরকারি দূতাবাস।",
    category: {
      id: "embassy",
      name: "Embassy",
      nameBn: "দূতাবাস",
    },
    email: "embassymuscat@mofa.gov.bd",
    phone: "+968 2469 8989",
    alternatePhone: "+968 2469 7373",
    website: "https://moscowmission.mofa.gov.bd",
    address: "Way No. 3007, Building No. 2772, Shatti Al Qurum",
    city: "Muscat",
    area: "Shatti Al Qurum",
    services: ["Passport Services", "Visa Attestation", "Emergency Assistance", "Certificate Services"],
    images: ["/images/services/embassy1.jpg"],
    verified: true,
    status: "APPROVED",
    rating: 4.2,
    reviewCount: 567,
    views: 3456,
    createdAt: new Date("2026-05-01"),
  },

  // Ambulance
  {
    id: "s14",
    name: "24/7 Emergency Ambulance Service",
    nameBn: "24/7 জরুরী অ্যাম্বুলেন্স সেবা",
    slug: "emergency-ambulance-24-7",
    description: "Round the clock ambulance service across Muscat.",
    descriptionBn: "মাস্কাট জুড়ে 24 ঘন্টা অ্যাম্বুলেন্স সেবা।",
    category: {
      id: "ambulance",
      name: "Ambulance",
      nameBn: "আম্বুলেন্স",
    },
    phone: "9999",
    alternatePhone: "+968 2434 5678",
    address: "Al Khuwair",
    city: "Muscat",
    area: "Al Khuwair",
    services: ["Emergency Transport", "ICU Ambulance", "Inter-city Transfer"],
    images: ["/images/services/ambulance1.jpg"],
    verified: true,
    status: "APPROVED",
    rating: 4.8,
    reviewCount: 345,
    views: 2345,
    createdAt: new Date("2026-05-05"),
  },

  // Police
  {
    id: "s15",
    name: "Al Khuwair Police Station",
    nameBn: "আল খুয়াইর পুলিশ স্টেশন",
    slug: "al-khuwair-police-station",
    description: "Local police station serving Al Khuwair area.",
    descriptionBn: "আল খুয়াইর এলাকায় সেবা প্রদানকারী স্থানীয় পুলিশ স্টেশন।",
    category: {
      id: "police",
      name: "Police Station",
      nameBn: "পুলিশ স্টেশন",
    },
    phone: "9999",
    alternatePhone: "+968 2460 3030",
    address: "Al Khuwair Main Road",
    city: "Muscat",
    area: "Al Khuwair",
    services: ["Emergency Response", "Report Filing", "Lost & Found", "Traffic Issues"],
    images: ["/images/services/police1.jpg"],
    verified: true,
    status: "APPROVED",
    rating: 4.5,
    reviewCount: 234,
    views: 1567,
    createdAt: new Date("2026-05-03"),
  },

  // Tourist Places
  {
    id: "s16",
    name: "Sultan Qaboos Grand Mosque",
    nameBn: "সুলতান কাবুস গ্র্যান্ড মসজিদ",
    slug: "sultan-qaboos-grand-mosque",
    description: "Iconic architectural masterpiece and largest mosque in Oman.",
    descriptionBn: "ওমানের বৃহত্তম মসজিদ এবং স্থাপত্যের অনন্য নিদর্শন।",
    category: {
      id: "tourist-places",
      name: "Tourist Place",
      nameBn: "দর্শনীয় স্থান",
    },
    phone: "+968 2450 5170",
    address: "Sultan Qaboos Street",
    city: "Muscat",
    area: "Bousher",
    services: ["Guided Tours", "Prayer Facility", "Library", "Gardens"],
    images: ["/images/services/mosque1.jpg"],
    verified: true,
    status: "APPROVED",
    rating: 4.9,
    reviewCount: 1234,
    views: 5678,
    createdAt: new Date("2026-05-02"),
  },

  // Maktab Certificate
  {
    id: "s17",
    name: "Islamic Education Certificate Center",
    nameBn: "ইসলামিক শিক্ষা সার্টিফিকেট সেন্টার",
    slug: "islamic-education-certificate",
    description: "Maktab certificate services and Islamic education documentation.",
    descriptionBn: "মক্তব সার্টিফিকেট সেবা এবং ইসলামিক শিক্ষার ডকুমেন্টেশন।",
    category: {
      id: "maktab",
      name: "Maktab Certificate",
      nameBn: "মক্তব সানাদ",
    },
    phone: "+968 2445 6789",
    address: "Ruwi Islamic Center",
    city: "Muscat",
    area: "Ruwi",
    services: ["Certificate Issuance", "Attestation", "Quran Education", "Arabic Classes"],
    images: ["/images/services/maktab1.jpg"],
    verified: true,
    status: "APPROVED",
    rating: 4.6,
    reviewCount: 123,
    views: 567,
    createdAt: new Date("2026-05-07"),
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
  
  if (filters?.category) {
    filtered = filtered.filter(service => service.category.id === filters.category);
  }
  
  if (filters?.limit) {
    filtered = filtered.slice(0, filters.limit);
  }
  
  return filtered;
};

export const getServiceById = (id: string) => {
  return mockServices.find(service => service.id === id);
};

export const getServicesByCategory = (categoryId: string) => {
  return mockServices.filter(service => service.category.id === categoryId);
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
