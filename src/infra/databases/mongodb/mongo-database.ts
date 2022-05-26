import { MongoClient } from 'mongodb'
export class MongoDatabaseSingleton {
  private static instance: MongoDatabaseSingleton
  private readonly mongoClient: Promise<MongoClient>

  private constructor(uri: string) {
    this.mongoClient = MongoClient.connect(uri)
  }

  public static getInstance(): MongoDatabaseSingleton {
    if(!MongoDatabaseSingleton.instance) {
      MongoDatabaseSingleton.instance = new MongoDatabaseSingleton(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/workers')
    }
    return MongoDatabaseSingleton.instance
  }

  async connect(): Promise<MongoClient> {
    return await this.mongoClient
  }

  async disconnect(): Promise<void> {
    const conn = await this.mongoClient
    conn.close()
  }
}
