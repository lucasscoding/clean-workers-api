import { UserModel } from '@/data/models'

export namespace ISaveUser {
  export type Params = {
    user: UserModel
  }
  export type Result = UserModel
}

export interface ISaveUser {
  save(params: ISaveUser.Params): Promise<ISaveUser.Result>
}
