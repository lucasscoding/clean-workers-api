import { SignUpController } from '@/presentetion/controllers'
import { MissingParamError } from '@/presentetion/errors'
import { AddAccount } from '@/domain/usecases'
import { Account } from '@/domain/models'
import { SignUpAccountController } from '@/presentetion/protocol'
import { mock, MockProxy } from 'jest-mock-extended'
import faker from '@faker-js/faker'

describe('SignUpController', () => {
  let signUpController: SignUpController
  let fakeRequest: SignUpAccountController.Request
  let addAccount: MockProxy<AddAccount>
  let account: Account

  beforeEach(() => {
    addAccount = mock()
    fakeRequest = { email: faker.internet.email(), password: faker.internet.password() }
    account = { id: faker.datatype.uuid(), name: faker.name.findName(), ...fakeRequest }
    signUpController = new SignUpController(addAccount)
  })

  it('should return 200 when user sign up', async () => {
    addAccount.add.mockResolvedValueOnce(account)
    const result = await signUpController.handle(fakeRequest)
    expect(result).toBeTruthy()
    expect(result.statusCode).toBe(200)
    expect(result.body).toBe(account)
    expect(addAccount.add).toHaveBeenCalledTimes(1)
  })

  it('should return 400 if email is missing', async () => {
    const result = await signUpController.handle({ ...fakeRequest, email: null })
    expect(result).toBeTruthy()
    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual(new MissingParamError('email'))
  })

  it('should return 400 if password is missing', async () => {
    const result = await signUpController.handle({ ...fakeRequest, password: null })
    expect(result).toBeTruthy()
    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual(new MissingParamError('password'))
  })
})
