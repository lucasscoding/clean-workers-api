import { SignUpController } from '@/presentetion/controllers'
import { InvalidParamError, MissingParamError } from '@/presentetion/errors'
import { AddAccount } from '@/domain/usecases'
import { Account } from '@/domain/models'
import { SignUpAccountController } from '@/presentetion/protocol'
import { mock, MockProxy } from 'jest-mock-extended'
import faker from '@faker-js/faker'
import { EmailValidatorAdapter, PasswordValidatorAdapter } from '@/presentetion/adapters'

describe('SignUpController', () => {
  let signUpController: SignUpController
  let fakeRequest: SignUpAccountController.Request
  let addAccount: MockProxy<AddAccount>
  let account: Account

  beforeEach(() => {
    addAccount = mock()
    fakeRequest = { email: faker.internet.email(), password: faker.internet.password() }
    account = { id: faker.datatype.uuid(), name: faker.name.findName(), ...fakeRequest }
    signUpController = new SignUpController(addAccount, [new EmailValidatorAdapter(), new PasswordValidatorAdapter()])
  })

  it('should return 201 when user sign up', async () => {
    addAccount.add.mockResolvedValueOnce(account)
    const result = await signUpController.handle(fakeRequest)
    expect(result).toBeTruthy()
    expect(result.statusCode).toBe(201)
    expect(result.body).toBe(account)
    expect(addAccount.add).toHaveBeenCalledTimes(1)
  })

  it('should return 400 if email is missing', async () => {
    const result = await signUpController.handle({ ...fakeRequest, email: null })
    expect(result).toBeTruthy()
    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual({ sucess: false, message: new MissingParamError('email').message })
  })

  it('should return 400 if password is missing', async () => {
    const result = await signUpController.handle({ ...fakeRequest, password: null })
    expect(result).toBeTruthy()
    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual({ sucess: false, message: new MissingParamError('password').message })
  })

  it('should return 400 if email less than 4 digit', async () => {
    const result = await signUpController.handle({ ...fakeRequest, email: '123' })
    expect(result).toBeTruthy()
    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual({ sucess: false, message: new InvalidParamError('email').message })
  })

  it('should return 400 if password less than 4 digit', async () => {
    const result = await signUpController.handle({ ...fakeRequest, password: '123' })
    expect(result).toBeTruthy()
    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual({ sucess: false, message: new InvalidParamError('password').message })
  })
})
