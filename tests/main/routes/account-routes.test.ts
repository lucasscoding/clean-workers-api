import request from 'supertest'
import { ExpressFactory } from '@/main/factories'
import { AccountRouter } from '@/main/routes'
import { HttpHelper } from '@/presentation/helpers'

describe('Account Routes', () => {
  const app = ExpressFactory.createExpressConfig()
  AccountRouter.add(app)

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
})
