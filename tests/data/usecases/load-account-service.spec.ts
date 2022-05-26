import { LoadAccountService } from '@/data/usecases'
import { AccountRepository } from '@/data/protocols'
import { mock, MockProxy } from 'jest-mock-extended'
import Faker from '@faker-js/faker'
import { Account } from '@/domain/models'

describe('LoadAccountService', () => {
  let loadAccountService: LoadAccountService
  let accountRepository: MockProxy<AccountRepository>
  let account: Account

  beforeAll(async () => {
    account = { id: Faker.datatype.uuid(), name: Faker.name.findName(), email: Faker.internet.email(), password: Faker.internet.password() }
    accountRepository = mock()
    loadAccountService = new LoadAccountService(accountRepository)
  })

  it('should find a account', async () => {
    accountRepository.find.mockResolvedValue(account)
    const data = { id: Faker.datatype.uuid() }
    const result = await loadAccountService.load(data)
    expect(result).toBeTruthy()
    expect(accountRepository.find).toHaveBeenCalledTimes(1)
    expect(accountRepository.find).toHaveBeenCalledWith(data)
  })
})
