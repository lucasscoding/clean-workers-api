import { AccountModel } from '@/data/models'
import { Account } from '@/domain/models'

export namespace AccountRepository {
  export type Params = AccountModel
  export type Result = Account
  export type Input = {
    id?: string
    email?: string
  }
}

export interface AccountRepository {
  save(account: AccountRepository.Params): Promise<AccountRepository.Result>
  find(input: AccountRepository.Input): Promise<AccountRepository.Result>
}
