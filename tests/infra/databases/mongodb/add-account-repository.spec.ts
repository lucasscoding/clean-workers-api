import { AccountRepository } from '@/data/protocols'
import { AccountMongoDatabase } from '@/infra/databases'
import { MongoDatabaseSingleton } from '@/infra/databases/mongodb'
import Faker from '@faker-js/faker'

describe('AccountMongoDatabase', () => {
  let accountMongoDatabase: AccountRepository
  let account: AccountRepository.Params

  beforeAll(async () => {
    await MongoDatabaseSingleton.getInstance().connect()
  })

  afterAll(async () => {
    await MongoDatabaseSingleton.getInstance().disconnect()
  })

  beforeEach(async () => {
    account = { email: Faker.internet.email(), password: Faker.internet.password() }
    accountMongoDatabase = new AccountMongoDatabase(await MongoDatabaseSingleton.getInstance().connect())
  })

  it('should save a account on mongodb', async () => {
    const result = await accountMongoDatabase.save(account)
    expect(result).toBeTruthy()
    expect(result.id).not.toBeNull()
    expect(result.email).toBe(account.email)
  })
})
