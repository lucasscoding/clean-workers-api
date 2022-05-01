import { UserModel } from '@/data/models'

export namespace LoadUserRepository {
  type Id = {
    id: string
    email?: string
  }

  type Email = {
    id?: string
    email: string
  }
  export type Params = Email | Id
}
export interface LoadUserRepository {
  findBy(params: LoadUserRepository.Params): Promise<UserModel>
  findAll(): Promise<Array<UserModel>>
}
