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
    { id: 1, name: 'Performance Tee', price: 29.99, image: 'https://images.unsplash.com/photo-1520975665373-7a0a4b6b9e5b?w=1200&q=80', description: 'Lightweight performance tee.' },
    { id: 2, name: 'Training Shorts', price: 39.99, image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=1200&q=80', description: 'Breathable training shorts.' },
    { id: 3, name: 'Hooded Jacket', price: 79.99, image: 'https://images.unsplash.com/photo-1514996937319-344454492b37?w=1200&q=80', description: 'Water-resistant hooded jacket.' }
  ];

  const col = db.collection('products');
  await col.deleteMany({});
  await col.insertMany(products);
  console.log('Seeded products to', dbName);
  await client.close();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
