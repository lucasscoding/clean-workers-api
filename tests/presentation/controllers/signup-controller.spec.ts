import { SignUpController } from '@/presentation/controllers'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { AddAccount } from '@/domain/usecases'
import { Account } from '@/domain/models'
import { SignUpAccountController } from '@/presentation/protocols'
import { mock, MockProxy } from 'jest-mock-extended'
import Faker from '@faker-js/faker'
import { ValidatorBuilder } from '@/main/builders'

describe('SignUpController', () => {
  let signUpController: SignUpController
  let fakeRequest: SignUpAccountController.Request
  let addAccount: MockProxy<AddAccount>
  let account: Account

  beforeEach(() => {
    addAccount = mock()
    fakeRequest = { email: Faker.internet.email(), password: Faker.internet.password() }
    account = { id: Faker.datatype.uuid(), name: Faker.name.findName(), ...fakeRequest }
    signUpController = new SignUpController(addAccount, ValidatorBuilder.builder().email().password().build())
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
