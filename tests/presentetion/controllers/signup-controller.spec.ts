import { SignUpController } from '@/presentetion/controllers'
import { MissingParamError } from '@/presentetion/errors'
import faker from '@faker-js/faker'

describe('SignUpController', () => {
  let signUpController: SignUpController
  let fakerRequest: SignUpController.Request

  beforeEach(() => {
    fakerRequest = { name: faker.name.findName(), email: faker.internet.email(), password: faker.internet.password() }
    signUpController = new SignUpController()
  })

  it('should return 400 if email is missing', async () => {
    const result = await signUpController.handle({ ...fakerRequest, email: null })
    expect(result).toBeTruthy()
    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual(new MissingParamError('email'))
  })
})
