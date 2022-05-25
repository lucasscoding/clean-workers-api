import { Account } from '@/domain/models'

export namespace LoadAccount {
  export type Params = {
    id: string
  }
  export type Result = Account
}

export interface LoadAccount {
  load(params: LoadAccount.Params): Promise<LoadAccount.Result>
}
