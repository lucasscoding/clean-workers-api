import { UserModel } from '@/data/models'

export namespace ILoadUser {
  export type Params = {
    id?: string
    email?: string
  }
  export type Result = UserModel
}
export interface ILoadUser {
  findOne(params: ILoadUser.Params): Promise<ILoadUser.Result>
  findByEmail(params: ILoadUser.Params): Promise<ILoadUser.Result>
  findAll(): Promise<Array<ILoadUser.Result>>
}
