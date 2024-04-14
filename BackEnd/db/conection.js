import dotenv from "dotenv";
import {MongoClient} from "mongodb";

dotenv.config();

const url = process.env.MONGO_URI;
const client = new MongoClient(url);

const dbName = 'Nike';

async function main() {
  await client.connect();

  const db = client.db(dbName);

  return db;
}

export default main;