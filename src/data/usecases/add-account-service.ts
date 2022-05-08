import { Account } from '@/domain/models'
import { AddAccount } from '@/domain/usecases'
import { AccountRepository } from '@/data/protocols'

export class AddAccountService implements AddAccount {
  private readonly accountRepository: AccountRepository

  constructor(accountRepository: AccountRepository) {
    this.accountRepository = accountRepository
  }

  async add(account: AddAccount.Params): Promise<Account> {
    const result = this.accountRepository.save(account)
    return result
  }
}
