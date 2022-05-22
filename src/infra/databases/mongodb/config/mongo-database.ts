import { MongoClient } from 'mongodb'

export class MongoDatabaseSingleton {
  private static instance: MongoDatabaseSingleton
  private readonly mongoClient: Promise<MongoClient>

  private constructor() {
    this.mongoClient = MongoClient.connect(process.env.MONGO_URL)
  }

  public static getInstance(): MongoDatabaseSingleton {
    if(!MongoDatabaseSingleton.instance) {
      MongoDatabaseSingleton.instance = new MongoDatabaseSingleton()
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
