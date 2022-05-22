import { AccountRepository } from '@/data/protocols'
import { AccountMongoDatabase } from '@/infra/databases'
import { MongoClient } from 'mongodb'
import { MongoDatabaseSingleton } from '@/infra/databases/mongodb/config'
import Faker from '@faker-js/faker'

describe('AccountMongoDatabase', () => {
  let accountMongoDatabase: AccountRepository
  let account: AccountRepository.Params
  let mongoClient: MongoClient

  beforeAll(async () => {
    mongoClient = await MongoDatabaseSingleton.getInstance().connect()
  })

  afterAll(async () => {
    // await MongoDatabaseSingleton.getInstance().disconnect()
    mongoClient.close()
  })

  beforeEach(() => {
    account = { email: Faker.internet.email(), password: Faker.internet.password() }
    accountMongoDatabase = new AccountMongoDatabase()
  })

  it('should save a account on mongodb', async () => {
    const result = await accountMongoDatabase.save(account)
    expect(result).toBeTruthy()
    expect(result.id).not.toBeNull()
    expect(result.email).toBe(account.email)
  })
})
