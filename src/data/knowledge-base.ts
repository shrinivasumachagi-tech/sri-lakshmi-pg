export const pgKnowledgeBase = {
  about: {
    name: 'Sri Lakshmi Ladies PG',
    location: 'Davangere, Karnataka, India',
    type: 'Ladies PG (women only)',
    tagline: 'A premium living space designed for women who value comfort, safety, and community.',
    description:
      'Located in the heart of Davangere, Sri Lakshmi Ladies PG offers fully furnished accommodation with modern amenities. We provide 24/7 security, CCTV surveillance, hygienic food, high-speed WiFi, and a welcoming community for students and working professionals.',
    mission:
      'To create a home away from home where every resident feels safe, respected, and empowered to pursue her dreams.',
    yearsOfTrust: '8+',
  },

  roomTypes: [
    {
      type: 'Single Sharing (Premium)',
      label: 'Premium Private Room',
      description: 'Private room for those who prefer personal space and privacy.',
    },
    {
      type: 'Double Sharing (Comfort)',
      label: 'Most Popular',
      description: 'Comfortable sharing with one roommate — the most popular choice.',
    },
    {
      type: 'Triple Sharing (Standard)',
      label: 'Best Value',
      description: 'Affordable shared accommodation with two roommates.',
    },
  ],

  rent: {
    note: 'Rent varies by room type and duration. Please contact us for current pricing.',
    paymentBasis: 'Monthly',
    paymentDue: 'In advance by the 5th of every month',
    paymentMethods: ['UPI', 'Bank Transfer', 'Cash'],
  },

  food: {
    type: '100% Vegetarian, home-style meals',
    mealsPerDay: 4,
    meals: [
      {
        name: 'Breakfast',
        description: 'Healthy South Indian breakfast with tea or coffee.',
      },
      {
        name: 'Lunch',
        description: 'Full meals with 2 curries, rice, dal, and more.',
      },
      {
        name: 'Evening Snacks',
        description: 'Evening snacks with hot beverages.',
      },
      {
        name: 'Dinner',
        description: 'Light and nutritious dinner varieties.',
      },
    ],
    specialDiet: 'Special dietary requirements can be accommodated on request.',
  },

  facilities: [
    'Fully Furnished Rooms',
    'CCTV Monitoring',
    'Attached Bathrooms',
    'RO Water',
    'Laundry Service',
    'Power Backup',
    'High Speed WiFi',
    'Dining Hall',
    'Housekeeping',
  ],

  houseRules: {
    checkIn: 'From 10:00 AM onwards',
    checkOut: 'Before 12:00 PM on departure date',
    visitorHours: '9:00 AM to 7:00 PM',
    visitorPolicy: 'Family visitors allowed with prior registration at reception. All visitors must provide valid ID proof.',
    gateClosingTime: '9:30 PM',
    lateEntry: 'Available with prior intimation to the warden. 24/7 security ensures safe entry at all hours.',
  },

  contact: {
    address: 'Sri Lakshmi Ladies PG, Davangere, Karnataka',
    phone1: '+91 98441 27319',
    phone2: '+91 76768 22216',
    whatsapp: '+91 98441 27319',
    email: 'contact@shrilakshmipg.com',
    visitingHours: '9:00 AM - 7:00 PM',
    mapsUrl: 'https://maps.google.com/?q=Sri+Lakshmi+Ladies+PG+Davangere',
  },

  admissionProcess: {
    steps: [
      'Fill out the online admission form with personal and academic details.',
      'Upload ID proof (Aadhaar/PAN/Passport) and a passport-size photo.',
      'Submit the form — our team will review and contact you within 24 hours.',
    ],
    documents: ['ID Proof (Aadhaar / PAN / Passport)', 'Passport Size Photo'],
    acceptedFormats: 'PNG, JPG, or PDF (Max 5MB)',
    note: 'Documents are encrypted and used only for mandatory police verification.',
  },

  stayDurations: ['1 Month', '3 Months', '6 Months', '1 Year'],
};
