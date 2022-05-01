import { Account } from '@/domain/models'

export namespace AddAccount {
  export type Params = {
    name?: string
    email: string
    password: string
  }
  export type Result = Account
}

export interface AddAccount {
  add(account: AddAccount.Params): Promise<AddAccount.Result>
}
