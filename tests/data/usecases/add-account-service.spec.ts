import { Account } from '@/domain/models'
import { AccountRepository, Encrypter } from '@/data/protocols'
import { mock, MockProxy } from 'jest-mock-extended'
import { AddAccountService } from '@/data/usecases'
import faker from '@faker-js/faker'

describe('AddAccountService', () => {
  let accountRepository: MockProxy<AccountRepository>
  let bcryptEncrypter: MockProxy<Encrypter>
  let addAccountService: AddAccountService
  let account: Account

  beforeEach(() => {
    accountRepository = mock()
    bcryptEncrypter = mock()
    account = { id: faker.datatype.uuid(), name: faker.name.findName(), email: faker.internet.email(), password: faker.internet.password() }
    addAccountService = new AddAccountService(accountRepository, bcryptEncrypter)
  })

  it('should add a new account', async () => {
    accountRepository.save.mockResolvedValueOnce(account)
    const result = await addAccountService.add(account)
    expect(result).toBeTruthy()
    expect(accountRepository.save).toHaveBeenCalledTimes(1)
  })

  it('should encrypt the password', async () => {
    bcryptEncrypter.encode.mockResolvedValueOnce('bcrypt_password')
    await addAccountService.add(account)
    expect(bcryptEncrypter.encode).toHaveBeenCalledTimes(1)
    expect(bcryptEncrypter.encode).toHaveBeenCalledWith(account.password)
  })
})
