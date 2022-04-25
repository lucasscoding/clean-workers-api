import { SignUpController } from '@/presentetion/controllers'
import { MissingParamError } from '@/presentetion/errors'
import { ISignUpController } from '@/presentetion/protocol'
import { UserService } from '@/data/usecases'
import { mock } from 'jest-mock-extended'
import faker from '@faker-js/faker'

describe('SignUpController', () => {
  let signUpController: SignUpController
  let fakeRequest: ISignUpController.Request
  let userService: UserService

  beforeEach(() => {
    userService = mock()
    fakeRequest = { name: faker.name.findName(), email: faker.internet.email(), password: faker.internet.password() }
    signUpController = new SignUpController(userService)
  })

  it('should return 400 if email is missing', async () => {
    const result = await signUpController.handle({ ...fakeRequest, email: null })
    expect(result).toBeTruthy()
    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual(new MissingParamError('email'))
  })
})
