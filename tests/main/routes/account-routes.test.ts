import request from 'supertest'
import { ExpressFactory } from '@/main/factories'
import { AccountRouter } from '@/main/routes'
import { HttpHelper } from '@/presentation/helpers'
import { AccountMongoDatabase, MongoDatabaseSingleton } from '@/infra/databases'
import Faker from '@faker-js/faker'

describe('Account Routes', () => {
  const app = ExpressFactory.createExpressConfig()
  AccountRouter.add(app)

  beforeAll(async () => {
    await MongoDatabaseSingleton.getInstance().connect()
  })

  afterAll(async () => {
    await MongoDatabaseSingleton.getInstance().disconnect()
  })

  describe('POST /account/signup', () => {
    it('should return 201 when create a account', async () => {
      const payload = {
        name: 'any name',
        email: 'any_email@gmail.com',
        password: '10203040'
      }
      await request(app).post('/account/signup').send(payload).expect(HttpHelper.CREATED)
      await request(app).post('/account/signup').send(payload).expect(HttpHelper.CONFLICT)
    })
  })

  describe('GET /account/:id', () => {
    it('should return 200 and find account', async () => {
      const accountMongoDatabase = new AccountMongoDatabase(await MongoDatabaseSingleton.getInstance().connect())
      const result = await accountMongoDatabase.save({ name: Faker.name.findName(), email: Faker.internet.email(), password: Faker.internet.password() })
      await request(app).get('/account/' + result.id).expect(HttpHelper.OK)
      await request(app).get('/account/' + Faker.database.mongodbObjectId()).expect(HttpHelper.NOT_FOUND)
    })
  })
})
