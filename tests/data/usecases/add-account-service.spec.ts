import { Account } from '@/domain/models'
import { AccountRepository, Encrypter } from '@/data/protocols'
import { mock, MockProxy } from 'jest-mock-extended'
import { AddAccountService } from '@/data/usecases'
import faker from '@faker-js/faker'

describe('AddAccountService', () => {
  let accountRepository: MockProxy<AccountRepository>
  let bcryptEncrypterAdapter: MockProxy<Encrypter>
  let addAccountService: AddAccountService
  let account: Account

  beforeAll(() => {
    accountRepository = mock()
    bcryptEncrypterAdapter = mock()
    addAccountService = new AddAccountService(accountRepository, bcryptEncrypterAdapter)
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
