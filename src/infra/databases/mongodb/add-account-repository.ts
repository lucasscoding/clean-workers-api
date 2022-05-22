import { AccountRepository } from '@/data/protocols'
import { Collection, MongoClient } from 'mongodb'

export class AccountMongoDatabase implements AccountRepository {
  private readonly collection: Collection

  constructor(mongoClient: MongoClient) {
    this.collection = mongoClient.db().collection('accounts')
  }

  async save(account: AccountRepository.Params): Promise<AccountRepository.Result> {
    const data = { _id: null, ...account }
    await this.collection.insertOne(data)
    return { id: data._id, name: account.name, ...account }
  }
}
