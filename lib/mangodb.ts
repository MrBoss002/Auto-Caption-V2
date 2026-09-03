import { MongoClient, Db } from "mongodb";

const dbName = process.env.MONGODB_DB || "auto_caption_v2";

type GlobalMongo = typeof globalThis & {
  __autoCaptionMongoClient?: MongoClient;
  __autoCaptionMongoPromise?: Promise<MongoClient>;
};

const globalMongo = globalThis as GlobalMongo;

function connect(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not configured");
  }

  globalMongo.__autoCaptionMongoPromise ??= new MongoClient(uri, {
    maxPoolSize: 10,
    minPoolSize: 0,
    serverSelectionTimeoutMS: 8000,
  })
    .connect()
    .catch((error) => {
      globalMongo.__autoCaptionMongoPromise = undefined;
      throw error;
    });

  return globalMongo.__autoCaptionMongoPromise;
}

export async function getMongoClient(): Promise<MongoClient> {
  const client = await connect();
  globalMongo.__autoCaptionMongoClient = client;
  return client;
}

export async function getDb(): Promise<Db> {
  const client = await getMongoClient();
  return client.db(dbName);
}

export async function pingDb(): Promise<boolean> {
  try {
    const db = await getDb();
    await db.command({ ping: 1 });
    return true;
  } catch {
    return false;
  }
}
