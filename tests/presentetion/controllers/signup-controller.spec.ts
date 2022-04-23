import { SignUpController } from '@/presentetion/controllers'
import { MissingParamError } from '@/presentetion/errors'
import faker from '@faker-js/faker'

const signUpController = new SignUpController()

const fakerRequest: SignUpController.Request = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
}

describe('SignUpController', () => {
  it('should return 400 if email is missing', async () => {
    const result = await signUpController.handle({ ...fakerRequest, email: null })
    expect(result).toBeTruthy()
    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual(new MissingParamError('email'))
  })
})
