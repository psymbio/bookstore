// db.ts
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.DB_CONN_STRING || "";
const dbName = process.env.DB_NAME || "";

if (!uri || !dbName) {
    throw new Error("Database connection string or database name is not defined in the environment variables.");
}

let client: MongoClient;
let db: any;

export const connectToDatabase = async () => {
    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
        db = client.db(dbName);
    }
    return db;
};
