require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || '';
if (!uri) {
  console.error('MONGODB_URI not set. Set it in your environment or .env file.');
  process.exit(1);
}

async function seed() {
  const client = new MongoClient(uri);
  await client.connect();
  const dbName = process.env.MONGODB_DB || 'ecommerce';
  const db = client.db(dbName);
  
  const products = [
    // Men's T-Shirts
    { id: 1, name: 'Seamless Gym Tee', price: 4500, category: 'men', subcategory: 't-shirts', tag: 'NEW DROP', gender: 'men', 
      image: 'https://images.pexels.com/photos/4066293/pexels-photo-4066293.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [
        'https://images.pexels.com/photos/4066293/pexels-photo-4066293.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/4066287/pexels-photo-4066287.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/4066288/pexels-photo-4066288.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      video: '/videos/rightcoloumn.mp4',
      description: 'Ultimate comfort fit', desc: 'Ultimate comfort fit' },
    { id: 2, name: 'Performance Tee', price: 5000, category: 'men', subcategory: 't-shirts', gender: 'men', 
      image: 'https://cdn.pixabay.com/photo/2018/07/22/21/59/fashion-3555650_1280.jpg',
      images: [
        'https://cdn.pixabay.com/photo/2018/07/22/21/59/fashion-3555650_1280.jpg',
        'https://images.pexels.com/photos/5580207/pexels-photo-5580207.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      video: '/videos/rightcoloumn.mp4',
      description: 'Moisture wicking', desc: 'Moisture wicking' },
    { id: 3, name: 'Athletic V-Neck Tee', price: 4200, category: 'men', subcategory: 't-shirts', tag: 'BACK IN STOCK', gender: 'men', 
      image: 'https://images.pexels.com/photos/4210850/pexels-photo-4210850.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [
        'https://images.pexels.com/photos/4210850/pexels-photo-4210850.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      video: '/videos/rightcoloumn.mp4',
      description: 'Breathable fabric', desc: 'Breathable fabric' },
    
    // Men's Hoodies & Jackets
    { id: 4, name: 'Level Up Hoodie', price: 27200, category: 'men', subcategory: 'hoodies-jackets', tag: 'NEW DROP', gender: 'men', 
      image: 'https://media.istockphoto.com/id/955641488/photo/clothes-shop-costume-dress-fashion-store-style-concept.jpg?s=612x612&w=0&k=20&c=ZouECh5-XOCuBzvKBQfxgyw0RIGEUg9u5F0sJiZV86s=',
      images: [
        'https://media.istockphoto.com/id/955641488/photo/clothes-shop-costume-dress-fashion-store-style-concept.jpg?s=612x612&w=0&k=20&c=ZouECh5-XOCuBzvKBQfxgyw0RIGEUg9u5F0sJiZV86s=',
        'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      video: '/videos/rightcoloumn.mp4',
      description: 'Tawny Port collection', desc: 'Tawny Port collection' },
    { id: 5, name: 'Elite Hoodie', price: 7200, category: 'men', subcategory: 'hoodies-jackets', gender: 'men', 
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [
        'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      video: '/videos/rightcoloumn.mp4',
      description: 'Premium cotton blend', desc: 'Premium cotton blend' },
    { id: 6, name: 'Training Jacket', price: 8500, category: 'men', subcategory: 'hoodies-jackets', gender: 'men', 
      image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [
        'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      video: '/videos/rightcoloumn.mp4',
      description: 'Wind resistant', desc: 'Wind resistant' },
    
    // Men's Shorts
    { id: 7, name: 'Flex Pro Shorts', price: 3800, category: 'men', subcategory: 'shorts', gender: 'men', 
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [
        'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      video: '/videos/rightcoloumn.mp4',
      description: '4-way stretch fabric', desc: '4-way stretch fabric' },
    { id: 8, name: 'Training Shorts', price: 3500, category: 'men', subcategory: 'shorts', tag: 'BACK IN STOCK', gender: 'men', 
      image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [
        'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      video: '/videos/rightcoloumn.mp4',
      description: 'Lightweight mesh', desc: 'Lightweight mesh' },
    
    // Women's Leggings
    { id: 9, name: 'Power Joggers', price: 23000, category: 'women', subcategory: 'leggings', tag: 'NEW DROP', gender: 'women', 
      image: 'https://cdn.pixabay.com/photo/2015/09/02/11/01/woman-918267_1280.jpg',
      images: [
        'https://cdn.pixabay.com/photo/2015/09/02/11/01/woman-918267_1280.jpg'
      ],
      video: '/videos/rightcoloumn.mp4',
      description: 'High waist support', desc: 'High waist support' },
    { id: 10, name: 'Power Leggings', price: 4800, category: 'women', subcategory: 'leggings', gender: 'women', 
      image: 'https://images.pexels.com/photos/4498610/pexels-photo-4498610.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [
        'https://images.pexels.com/photos/4498610/pexels-photo-4498610.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      video: '/videos/rightcoloumn.mp4',
      description: 'High waist support', desc: 'High waist support' },
    { id: 11, name: 'Compression Leggings', price: 5200, category: 'women', subcategory: 'leggings', gender: 'women', 
      image: 'https://images.pexels.com/photos/4462583/pexels-photo-4462583.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [
        'https://images.pexels.com/photos/4462583/pexels-photo-4462583.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      video: '/videos/rightcoloumn.mp4',
      description: 'Squat proof', desc: 'Squat proof' },
    
    // Women's Sports Bras
    { id: 12, name: 'Sports Bra Pro', price: 2900, category: 'women', subcategory: 'sports-bras', tag: 'BACK IN STOCK', gender: 'women', 
      image: 'https://images.pexels.com/photos/4066288/pexels-photo-4066288.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [
        'https://images.pexels.com/photos/4066288/pexels-photo-4066288.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      video: '/videos/rightcoloumn.mp4',
      description: 'High impact support', desc: 'High impact support' },
    { id: 13, name: 'Active Sports Bra', price: 3200, category: 'women', subcategory: 'sports-bras', gender: 'women', 
      image: 'https://images.pexels.com/photos/4498182/pexels-photo-4498182.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [
        'https://images.pexels.com/photos/4498182/pexels-photo-4498182.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      video: '/videos/rightcoloumn.mp4',
      description: 'Moisture wicking', desc: 'Moisture wicking' },
    
    // Women's Jackets
    { id: 14, name: 'Performance Jacket', price: 9500, category: 'women', subcategory: 'jackets', gender: 'women', 
      image: 'https://cdn.pixabay.com/photo/2020/03/03/12/52/girl-4898696_1280.jpg',
      images: [
        'https://cdn.pixabay.com/photo/2020/03/03/12/52/girl-4898696_1280.jpg'
      ],
      video: '/videos/rightcoloumn.mp4',
      description: 'Breathable mesh', desc: 'Breathable mesh' },
    { id: 15, name: 'Windbreaker Elite', price: 8200, category: 'women', subcategory: 'jackets', tag: 'NEW DROP', gender: 'women', 
      image: 'https://media.istockphoto.com/id/854321536/photo/look-at-this-gorgeous-dress.jpg?s=612x612&w=0&k=20&c=UyxEiEddYEFQPAoopwYs-_8xJ5vp0vKE0Sl3GnrQpK8=',
      images: [
        'https://media.istockphoto.com/id/854321536/photo/look-at-this-gorgeous-dress.jpg?s=612x612&w=0&k=20&c=UyxEiEddYEFQPAoopwYs-_8xJ5vp0vKE0Sl3GnrQpK8='
      ],
      video: '/videos/rightcoloumn.mp4',
      description: 'Lightweight design', desc: 'Lightweight design' },
    
    // Accessories - Socks
    { id: 16, name: 'Training Socks', price: 1999, category: 'accessories', subcategory: 'all-socks', tag: 'BACK IN STOCK', 
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [
        'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      video: '/videos/rightcoloumn.mp4',
      description: 'Cushioned support', desc: 'Cushioned support' },
    { id: 17, name: 'Performance Socks Pack', price: 2500, category: 'accessories', subcategory: 'all-socks', 
      image: 'https://images.pexels.com/photos/6214478/pexels-photo-6214478.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [
        'https://images.pexels.com/photos/6214478/pexels-photo-6214478.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      video: '/videos/rightcoloumn.mp4',
      description: '3-pack bundle', desc: '3-pack bundle' },
    { id: 18, name: 'Compression Socks', price: 2200, category: 'accessories', subcategory: 'all-socks', 
      image: 'https://images.pexels.com/photos/5473237/pexels-photo-5473237.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [
        'https://images.pexels.com/photos/5473237/pexels-photo-5473237.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      video: '/videos/rightcoloumn.mp4',
      description: 'Enhanced circulation', desc: 'Enhanced circulation' },
    
    // Accessories - Gym Bags
    { id: 19, name: 'Gym Bag Pro', price: 5500, category: 'accessories', subcategory: 'gym-bags', tag: 'NEW DROP', 
      image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [
        'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      video: '/videos/rightcoloumn.mp4',
      description: 'Durable fabric', desc: 'Durable fabric' },
    { id: 20, name: 'Duffle Bag Elite', price: 6200, category: 'accessories', subcategory: 'gym-bags', 
      image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [
        'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      video: '/videos/rightcoloumn.mp4',
      description: 'Multiple compartments', desc: 'Multiple compartments' },
    
    // Additional items for variety
    { id: 21, name: 'Seamless Set', price: 12000, category: 'women', subcategory: 'leggings', tag: 'NEW DROP', gender: 'women', 
      image: 'https://images.pexels.com/photos/4462782/pexels-photo-4462782.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [
        'https://images.pexels.com/photos/4462782/pexels-photo-4462782.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      video: '/videos/rightcoloumn.mp4',
      description: 'Full set bundle', desc: 'Full set bundle' },
    { id: 22, name: 'Runner Top', price: 4100, category: 'women', subcategory: 'sports-bras', gender: 'women', 
      image: 'https://images.pexels.com/photos/5580207/pexels-photo-5580207.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [
        'https://images.pexels.com/photos/5580207/pexels-photo-5580207.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      video: '/videos/rightcoloumn.mp4',
      description: 'Lightweight tech', desc: 'Lightweight tech' },
    { id: 23, name: 'Stringer Vest', price: 3500, category: 'men', subcategory: 't-shirts', gender: 'men', 
      image: 'https://images.pexels.com/photos/5412168/pexels-photo-5412168.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [
        'https://images.pexels.com/photos/5412168/pexels-photo-5412168.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      video: '/videos/rightcoloumn.mp4',
      description: 'Classic fit', desc: 'Classic fit' },
    { id: 24, name: 'Pro Joggers', price: 5000, category: 'men', subcategory: 'shorts', gender: 'men', 
      image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [
        'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      video: '/videos/rightcoloumn.mp4',
      description: 'Breathable mesh', desc: 'Breathable mesh' },
  ];

  const col = db.collection('products');
  await col.deleteMany({});
  await col.insertMany(products);
  console.log(`Seeded ${products.length} products to ${dbName}`);
  await client.close();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
