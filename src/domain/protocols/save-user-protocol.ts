import { UserModel } from '@/data/models'

export namespace SaveUserProtocol {
  export type Params = {
    user: UserModel
  }
  export type Result = UserModel
}

export interface SaveUserProtocol {
  save(params: SaveUserProtocol.Params): Promise<SaveUserProtocol.Result>
}
