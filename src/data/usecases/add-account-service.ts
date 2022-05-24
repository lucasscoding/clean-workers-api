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
    const encryptPassword = await this.encrypter.encode(account.password)
    const exist = await this.accountRepository.find({ email: account.email })
    if(!exist) {
      const result = await this.accountRepository.save({ ...account, password: encryptPassword })
      return result
    }
    return null
  }
}
