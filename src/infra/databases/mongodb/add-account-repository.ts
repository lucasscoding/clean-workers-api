import { AccountRepository } from '@/data/protocols'
import { Account } from '@/domain/models'
import { Collection, MongoClient, ObjectId } from 'mongodb'

export class AccountMongoDatabase implements AccountRepository {
  private readonly collection: Collection

  constructor(mongoClient: MongoClient) {
    this.collection = mongoClient.db().collection('accounts')
  }

  async save(params: AccountRepository.Params): Promise<AccountRepository.Result> {
    const data = { _id: null, ...params, timestamp: new Date() }
    await this.collection.insertOne(data)
    const account = { id: data._id, name: params.name, ...params }
    return account
  }

  async find(input: AccountRepository.Input): Promise<AccountRepository.Result> {
    const query = { $or: [{ _id: new ObjectId(input.id) }, { email: input.email }] }
    const account = await this.collection.findOne<Account>(query)
    return account
  }
}
