const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || '';
let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }
  if (!uri) {
    console.warn('MONGODB_URI not set. DB operations will be disabled.');
    return { client: null, db: null };
  }
  const client = new MongoClient(uri);
  await client.connect();
  const dbName = process.env.MONGODB_DB || 'ecommerce';
  const db = client.db(dbName);
  cachedClient = client;
  cachedDb = db;
  return { client, db };
}

module.exports = {
  connectToDatabase,
};
