import { Account } from '@/domain/models'
import { AccountRepository } from '@/data/protocols'
import { mock, MockProxy } from 'jest-mock-extended'
import { AddAccountService } from '@/data/usecases'
import faker from '@faker-js/faker'

describe('AddAccountService', () => {
  let accountRepository: MockProxy<AccountRepository>
  let addAccountService: AddAccountService
  let account: Account

  beforeAll(() => {
    accountRepository = mock()
    addAccountService = new AddAccountService(accountRepository)
  })

  beforeEach(() => {
    account = { id: faker.datatype.uuid(), name: faker.name.findName(), email: faker.internet.email(), password: faker.internet.password() }
  })

  it('should add a new account', async () => {
    accountRepository.save.mockResolvedValueOnce(account)
    const result = await addAccountService.add(account)
    expect(result).toBeTruthy()
  })
})
