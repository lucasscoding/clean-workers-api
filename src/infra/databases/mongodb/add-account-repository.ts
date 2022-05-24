import { AccountRepository } from '@/data/protocols'
import { Account } from '@/domain/models'
import { Collection, MongoClient, ObjectId } from 'mongodb'

export class AccountMongoDatabase implements AccountRepository {
  private readonly collection: Collection

  constructor(mongoClient: MongoClient) {
    this.collection = mongoClient.db().collection('accounts')
  }

  async save(account: AccountRepository.Params): Promise<AccountRepository.Result> {
    const data = { _id: null, ...account, timestamp: new Date() }
    await this.collection.insertOne(data)
    return { id: data._id, name: account.name, ...account }
  }

  async find(input: AccountRepository.Input): Promise<AccountRepository.Result> {
    const query = { $or: [{ _id: new ObjectId(input.id) }, { email: input.email }] }
    return await this.collection.findOne<Account>(query)
  }
}
