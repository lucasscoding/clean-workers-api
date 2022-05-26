import { Account } from '@/domain/models'
import { LoadAccount } from '@/domain/usecases'
import { LoadAccountController } from '@/presentation/controllers'
import Faker from '@faker-js/faker'
import { mock, MockProxy } from 'jest-mock-extended'

describe('LoadAccountController', () => {
  let loadAccountController: LoadAccountController
  let loadAccount: MockProxy<LoadAccount>
  let account: Account

  beforeEach(() => {
    loadAccount = mock()
    account = { id: Faker.datatype.uuid(), name: Faker.name.findName(), email: Faker.internet.email(), password: Faker.internet.password() }
    loadAccountController = new LoadAccountController(loadAccount)
  })

  it('should return 200 when find a account', async () => {
    loadAccount.load.mockResolvedValueOnce(account)
    const response = await loadAccountController.load({ id: account.id })
    expect(response).toBeTruthy()
    expect(response.statusCode).toBe(200)
  })
})
