import { MenuItem, Review } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // --- COOKIES ---
  {
    id: 'b2b-cookies-assorted',
    name: 'Chocolate Crunch / Jaggery Oats / Almond Coconut Cookies',
    description: 'Elite gourmet cafe biscuit cookies baked freshly in Chocolate Crunch, Jaggery Oats, and Almond Coconut profiles.',
    category: 'cookies',
    price: 4500, // INR ₹
    image: '/src/assets/images/choco_crunch_1780047370556.png',
    rating: 4.9,
    reviewsCount: 312,
    tags: ['Quality Verified', 'Top Seller', '75 Pcs Box'],
    options: {
      sizes: ['Standard Box (75 Pcs)', 'Mega Carton (150 Pcs)'],
      flavors: ['Chocolate Crunch', 'Jaggery Oats', 'Almond Coconut'],
      icings: ['Individually Sealed Wrapper', 'Hygienic Wholesale Pack']
    }
  },
  {
    id: 'b2b-finger-cakes',
    name: 'Finger Cake (Box Pack & Jar Pack)',
    description: 'Perfectly baked golden sponge finger cakes by Vardhaman Foods. Formulated for maximum freshness, high moisture retention, and long shelf-life in retail boxes and protective display jars.',
    category: 'cakes',
    price: 3200,
    image: '/src/assets/images/vardhaman_finger_cakes_1780047956346.png',
    rating: 5.0,
    reviewsCount: 78,
    tags: ['Vardhaman Approved', 'Long Shelf-Life', 'Box & Jar Packs'],
    options: {
      sizes: ['Box Pack (50 Pcs)', 'Jar Pack (24 Pcs)'],
      flavors: ['Classic Sweet Sponge', 'Vanilla Butter Infused'],
      icings: ['Individually Sealed Wrapper', 'Protective Airtight Jar']
    }
  },
  {
    id: 'b2b-cream-rolls',
    name: 'Cream Roll',
    description: 'Flaky multi-layered golden pastry horns generously piping whipped organic Madagascar vanilla bean sweet cream.',
    category: 'cookies', // fits within cookies category tab
    price: 2400,
    image: '/src/assets/images/cream_roll_box_1780047413276.png',
    rating: 5.0,
    reviewsCount: 198,
    tags: ['Flaky Crispy', 'Fresh Cream Filled', '24 Pcs Box'],
    options: {
      sizes: ['Standard Box (24 Pcs)', 'Double Carton (48 Pcs)'],
      flavors: ['Classic Sweet Vanilla', 'Cream Fudge Infused'],
      icings: ['Pristine Sugar Dusting', 'Golden Glazed']
    }
  },
  {
    id: 'b2b-almond-slice-cakes',
    name: 'Almond Slice Cake',
    description: 'Moist golden tea cake slices loaded with sliced Californian almonds. Standardized texture for hospitality counters.',
    category: 'cakes',
    price: 9500,
    image: '/src/assets/images/almond_slice_cake_1780047322967.png',
    rating: 4.9,
    reviewsCount: 167,
    tags: ['White-Label', 'Café Counter Ready', '40 Pcs * 6 Jar'],
    options: {
      sizes: ['Standard Case (6 Jars * 40 Pcs)', 'Trial Carton (2 Jars)'],
      flavors: ['Californian Almond Sponge', 'Rich Saffron Almond'],
      icings: ['Hygienic Jar Pack', 'Loose Catering Case']
    }
  },
  {
    id: 'b2b-display-jars-cookies',
    name: 'Cookies (Choco Crunch / Jaggery Oats / Almond Coconut)',
    description: 'Crisp cookie selections packed directly inside professional-tier airtight transparent display jars to grab retail customer focus.',
    category: 'cookies',
    price: 3600,
    image: '/src/assets/images/jaggery_oats_1780047395262.png',
    rating: 4.8,
    reviewsCount: 145,
    tags: ['Bestseller', 'White-Label', '40 Pcs * 6 Jar'],
    options: {
      sizes: ['Standard Case (6 Jars * 40 Pcs)', 'Mini Case (3 Jars)'],
      flavors: ['Choco Crunch Blend', 'Jaggery Oats Blend', 'Almond Coconut Blend'],
      icings: ['Airtight Retail Sealed', 'Custom Jar Wrapping']
    }
  },
  {
    id: 'b2b-karela-pista-tost',
    name: 'Karela Cookies / Pista Cookies / Makkhan Tost',
    description: 'Salty-sweet Karela-shaped biscuits, buttery crunch Pistachio cookies, and crispy traditional milk-butter Makkhan Tost rusks.',
    category: 'cookies',
    price: 1800,
    image: '/src/assets/images/pistachio_cookies_1780047447191.png',
    rating: 4.9,
    reviewsCount: 220,
    tags: ['Traditional Rusk', 'Buttery Crunch', '40 Pcs * 6 Jar'],
    options: {
      sizes: ['Standard Case (6 Jars)', 'Bulk Carton Delivery'],
      flavors: ['Karela Biscuits Swirl', 'Buttery Pista Crunch', 'Kashmiri Makkhan Tost'],
      icings: ['Moisture Resistant Jars', 'Standard Wholesale Carton']
    }
  },
  {
    id: 'b2b-khari-usmania-cookies',
    name: 'Butter Khari / Usmania Cookies',
    description: 'Hyper-flaky Indian Butter Khari puffed tea-pastries alongside crumbly Hyderabad style Usmania sweet-salt cookies.',
    category: 'cookies',
    price: 1500,
    rating: 4.9,
    reviewsCount: 110,
    image: '/src/assets/images/teatime_cookies_1780047351747.png',
    tags: ['Indian Chai Classics', 'Flaky & Buttery', '40 Pcs * 6 Jar'],
    options: {
      sizes: ['Standard Case (6 Jars)', 'Exquisite Gifting Pack'],
      flavors: ['Super-Flaky Jeera Khari', 'Hyderabad Famous Usmania'],
      icings: ['Standard Airtight Jars', 'Eco-friendly Tin Boxes']
    }
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-b2b-1',
    name: 'Aarav Mehta',
    rating: 5,
    text: 'Cakey and Cookie Bakers has revolutionized our dessert pipeline at The Bean Haven Cafés (with 15 locations across Pune & Mumbai). The quality consistency of their Madagascar Vanilla Cream Rolls is absolutely flawless. Operational stress is down, and customer satisfaction is at an all-time high!',
    date: 'May 16, 2026',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=250&h=250&q=80',
    category: 'Partner Café Chain'
  },
  {
    id: 'rev-b2b-2',
    name: 'Priya Sharma',
    rating: 5,
    text: 'As Purchasing Manager at Vardhaman Supermarkets, I can confirm that their Saffron Milk Toast and Bulk Cookies are massive hits. The science of baking shines through (exactly identical taste in every packet!), their delivery is punctual, and client customization meets our dynamic packaging requirements.',
    date: 'May 22, 2026',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=250&h=250&q=80',
    category: 'Vardhaman Supermarkets Group'
  },
  {
    id: 'rev-b2b-3',
    name: 'Chef Kabir Roy',
    rating: 5,
    text: 'Exceptional wholesale partner! We use their White-Label Slab Cakes and customized celebration bases for our elite wedding banquet bookings. Saving dozens of high-stress prep hours while serving a "premium bakery standard" with pure organic butter and real cacao. Absolute gold standard.',
    date: 'May 10, 2026',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=250&h=250&q=80',
    category: 'Taj Gateway Banquets'
  }
];
