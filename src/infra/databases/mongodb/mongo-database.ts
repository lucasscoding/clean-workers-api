import { MongoClient } from 'mongodb'
export class MongoDatabaseSingleton {
  private static instance: MongoDatabaseSingleton
  private mongoClient: MongoClient

  private constructor() {}

  public static getInstance(): MongoDatabaseSingleton {
    if(!MongoDatabaseSingleton.instance) {
      MongoDatabaseSingleton.instance = new MongoDatabaseSingleton()
    }
    return MongoDatabaseSingleton.instance
  }

  async connect(): Promise<MongoClient> {
    if(!this.mongoClient) {
      this.mongoClient = await MongoClient.connect(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/workers')
    }
    return this.mongoClient
  }

  async disconnect(): Promise<void> {
    this.mongoClient.close()
    this.mongoClient = null
  }
}
