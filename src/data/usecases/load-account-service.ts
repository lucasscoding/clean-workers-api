import { LoadAccount } from '@/domain/usecases/load-account'
import { AccountRepository } from '../protocols'

export class LoadAccountService implements LoadAccount {
  private readonly accountRepository: AccountRepository

  constructor(accountRepository: AccountRepository) {
    this.accountRepository = accountRepository
  }

  async load(params: LoadAccount.Params): Promise<LoadAccount.Result> {
    return await this.accountRepository.find({ id: params.id })
  }
}
