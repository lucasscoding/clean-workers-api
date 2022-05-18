import { Account } from '@/domain/models'
import { AddAccount } from '@/domain/usecases'
import { AccountRepository, Encrypter } from '@/data/protocols'

export class AddAccountService implements AddAccount {
  private readonly accountRepository: AccountRepository
  private readonly encrypter: Encrypter

  constructor(accountRepository: AccountRepository, encrypter: Encrypter) {
    this.accountRepository = accountRepository
    this.encrypter = encrypter
  }

  async add(account: AddAccount.Params): Promise<Account> {
    const encryptPassword = this.encrypter.encode(account.password)
    const result = this.accountRepository.save({ ...account, password: encryptPassword })
    return result
  }
}
