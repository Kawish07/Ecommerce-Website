import { connectToDatabase } from '../../lib/mongodb';

// Comprehensive product database with unique items per category/subcategory
const allProducts = [
  // MEN - T-SHIRTS
  { id: 101, name: 'Classic Black Tee', price: 2499, category: 'men', subcategory: 't-shirts', image: 'https://images.pexels.com/photos/4066293/pexels-photo-4066293.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Essential black performance tee' },
  { id: 102, name: 'White Performance Tee', price: 2499, category: 'men', subcategory: 't-shirts', image: 'https://images.pexels.com/photos/3622622/pexels-photo-3622622.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Moisture-wicking white tee' },
  { id: 103, name: 'Navy Blue Tee', price: 2499, category: 'men', subcategory: 't-shirts', image: 'https://images.pexels.com/photos/3621881/pexels-photo-3621881.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Premium navy blue fit' },
  { id: 104, name: 'Charcoal Grey Tee', price: 2499, category: 'men', subcategory: 't-shirts', image: 'https://images.pexels.com/photos/3622622/pexels-photo-3622622.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Versatile grey training tee' },
  { id: 105, name: 'Red Power Tee', price: 2799, category: 'men', subcategory: 't-shirts', image: 'https://images.pexels.com/photos/4066289/pexels-photo-4066289.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Bold red statement piece' },

  // MEN - HOODIES & JACKETS
  { id: 201, name: 'Black Zip Hoodie', price: 5999, category: 'men', subcategory: 'hoodies-jackets', image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Premium fleece zip hoodie' },
  { id: 202, name: 'Grey Pullover Hoodie', price: 5999, category: 'men', subcategory: 'hoodies-jackets', image: 'https://images.pexels.com/photos/3621881/pexels-photo-3621881.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Cozy grey pullover' },
  { id: 203, name: 'Navy Windbreaker Jacket', price: 7499, category: 'men', subcategory: 'hoodies-jackets', image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Lightweight windbreaker' },
  { id: 204, name: 'Black Track Jacket', price: 6999, category: 'men', subcategory: 'hoodies-jackets', image: 'https://images.pexels.com/photos/3621881/pexels-photo-3621881.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Sleek track jacket' },
  { id: 205, name: 'Bomber Style Jacket', price: 8499, category: 'men', subcategory: 'hoodies-jackets', image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Modern bomber design' },

  // MEN - SHORTS
  { id: 301, name: 'Black Training Shorts', price: 3499, category: 'men', subcategory: 'shorts', image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800', desc: '4-way stretch training shorts' },
  { id: 302, name: 'Grey Gym Shorts', price: 3499, category: 'men', subcategory: 'shorts', image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Comfortable gym shorts' },
  { id: 303, name: 'Navy Athletic Shorts', price: 3499, category: 'men', subcategory: 'shorts', image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Navy performance shorts' },
  { id: 304, name: 'Khaki Casual Shorts', price: 3699, category: 'men', subcategory: 'shorts', image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Casual khaki shorts' },
  { id: 305, name: 'Red Running Shorts', price: 3999, category: 'men', subcategory: 'shorts', image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Lightweight running shorts' },

  // WOMEN - LEGGINGS
  { id: 401, name: 'Black High-Waist Leggings', price: 4499, category: 'women', subcategory: 'leggings', image: 'https://images.pexels.com/photos/4498610/pexels-photo-4498610.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Squat-proof high waist' },
  { id: 402, name: 'Navy Compression Leggings', price: 4499, category: 'women', subcategory: 'leggings', image: 'https://images.pexels.com/photos/4462583/pexels-photo-4462583.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Compression support leggings' },
  { id: 403, name: 'Grey Seamless Leggings', price: 3999, category: 'women', subcategory: 'leggings', image: 'https://images.pexels.com/photos/4498610/pexels-photo-4498610.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Seamless grey leggings' },
  { id: 404, name: 'Purple Yoga Leggings', price: 4799, category: 'women', subcategory: 'leggings', image: 'https://images.pexels.com/photos/4462583/pexels-photo-4462583.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Flexible yoga leggings' },
  { id: 405, name: 'Forest Green Leggings', price: 4499, category: 'women', subcategory: 'leggings', image: 'https://images.pexels.com/photos/4498610/pexels-photo-4498610.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Deep forest green color' },

  // WOMEN - SPORTS BRAS
  { id: 501, name: 'Black High-Impact Sports Bra', price: 3199, category: 'women', subcategory: 'sports-bras', image: 'https://images.pexels.com/photos/4066288/pexels-photo-4066288.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Maximum support sports bra' },
  { id: 502, name: 'White Medium-Impact Bra', price: 2899, category: 'women', subcategory: 'sports-bras', image: 'https://images.pexels.com/photos/4066288/pexels-photo-4066288.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Balanced support design' },
  { id: 503, name: 'Navy Compression Sports Bra', price: 3499, category: 'women', subcategory: 'sports-bras', image: 'https://images.pexels.com/photos/4066288/pexels-photo-4066288.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Compression athletic bra' },
  { id: 504, name: 'Grey Low-Impact Bra', price: 2699, category: 'women', subcategory: 'sports-bras', image: 'https://images.pexels.com/photos/4066288/pexels-photo-4066288.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Lightweight low-impact bra' },
  { id: 505, name: 'Red Power Sports Bra', price: 3299, category: 'women', subcategory: 'sports-bras', image: 'https://images.pexels.com/photos/4066288/pexels-photo-4066288.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Bold red performance bra' },

  // WOMEN - JACKETS
  { id: 601, name: 'Black Zip-Up Jacket', price: 6499, category: 'women', subcategory: 'jackets', image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Sleek black jacket' },
  { id: 602, name: 'Grey Athleisure Jacket', price: 5999, category: 'women', subcategory: 'jackets', image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Versatile grey jacket' },
  { id: 603, name: 'Navy Windbreaker', price: 5499, category: 'women', subcategory: 'jackets', image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Lightweight windbreaker' },
  { id: 604, name: 'Pink Track Jacket', price: 6999, category: 'women', subcategory: 'jackets', image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Trendy pink jacket' },
  { id: 605, name: 'White Cropped Jacket', price: 5799, category: 'women', subcategory: 'jackets', image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Modern cropped fit' },

  // ACCESSORIES - SOCKS
  { id: 701, name: 'Black Performance Socks', price: 799, category: 'accessories', subcategory: 'all-socks', image: 'https://images.pexels.com/photos/5325898/pexels-photo-5325898.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Moisture-wicking socks' },
  { id: 702, name: 'White Crew Socks', price: 899, category: 'accessories', subcategory: 'all-socks', image: 'https://images.pexels.com/photos/5325898/pexels-photo-5325898.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Classic white crew' },
  { id: 703, name: 'Compression Ankle Socks', price: 999, category: 'accessories', subcategory: 'all-socks', image: 'https://images.pexels.com/photos/5325898/pexels-photo-5325898.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Compression ankle support' },
  { id: 704, name: 'Hiking Wool Socks', price: 1299, category: 'accessories', subcategory: 'all-socks', image: 'https://images.pexels.com/photos/5325898/pexels-photo-5325898.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Durable wool blend' },
  { id: 705, name: 'Running Quarter Socks', price: 899, category: 'accessories', subcategory: 'all-socks', image: 'https://images.pexels.com/photos/5325898/pexels-photo-5325898.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Lightweight quarter cut' },

  // ACCESSORIES - GYM BAGS
  { id: 801, name: 'Black Duffle Gym Bag', price: 5999, category: 'accessories', subcategory: 'gym-bags', image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Spacious duffle bag' },
  { id: 802, name: 'Grey Backpack Gym Bag', price: 4999, category: 'accessories', subcategory: 'gym-bags', image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Ergonomic backpack design' },
  { id: 803, name: 'Navy Tote Gym Bag', price: 4499, category: 'accessories', subcategory: 'gym-bags', image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Stylish tote bag' },
  { id: 804, name: 'Red Crossbody Bag', price: 3999, category: 'accessories', subcategory: 'gym-bags', image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Compact crossbody style' },
  { id: 805, name: 'White Weekend Bag', price: 6999, category: 'accessories', subcategory: 'gym-bags', image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Large weekend travel bag' },

  // NEW IN - Latest products across all categories
  { id: 901, name: 'Ultra-Light Tank Top', price: 1999, category: 'new-in', subcategory: null, image: 'https://images.pexels.com/photos/4498182/pexels-photo-4498182.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Latest ultra-light design' },
  { id: 902, name: 'Smart Tech Running Shorts', price: 4999, category: 'new-in', subcategory: null, image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Built-in tech pocket' },
  { id: 903, name: 'Eco-Friendly Yoga Mat', price: 3999, category: 'new-in', subcategory: null, image: 'https://images.pexels.com/photos/6301/woman-girl-sport-exercise.jpg?auto=compress&cs=tinysrgb&w=800', desc: 'Sustainable eco-mat' },
  { id: 904, name: 'Premium Seamless Set', price: 8999, category: 'new-in', subcategory: null, image: 'https://images.pexels.com/photos/4462782/pexels-photo-4462782.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Trending seamless set' },
  { id: 905, name: 'Thermal Compression Socks', price: 1499, category: 'new-in', subcategory: null, image: 'https://images.pexels.com/photos/5325898/pexels-photo-5325898.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'New thermal technology' },
  { id: 906, name: 'Metallic Sports Bra', price: 4499, category: 'new-in', subcategory: null, image: 'https://images.pexels.com/photos/4066288/pexels-photo-4066288.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Trendy metallic finish' },
  { id: 907, name: 'Carbon Fiber Water Bottle', price: 2499, category: 'new-in', subcategory: null, image: 'https://images.pexels.com/photos/4498182/pexels-photo-4498182.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Lightweight water bottle' },
  { id: 908, name: 'Tech-Integrated Hoodie', price: 7999, category: 'new-in', subcategory: null, image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Smart fabric hoodie' },
];

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const { category, subcategory } = req.query;
  
  if (!db) {
    // Fallback to comprehensive static data when DB not configured
    let filteredProducts = allProducts;
    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    if (subcategory) {
      filteredProducts = filteredProducts.filter(p => p.subcategory === subcategory);
    }
    
    return res.status(200).json({ products: filteredProducts });
  }

  if (req.method === 'GET') {
    // Build query based on parameters
    const query = {};
    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;
    
    const products = await db.collection('products').find(query).toArray();
    return res.status(200).json({ products });
  }

  if (req.method === 'POST') {
    const data = req.body;
    const result = await db.collection('products').insertOne(data);
    return res.status(201).json({ insertedId: result.insertedId });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
