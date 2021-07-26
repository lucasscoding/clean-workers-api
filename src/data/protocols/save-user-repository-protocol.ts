import { UserModel } from '../models'

export interface SaveUserRepository {
  save(user: UserModel): Promise<UserModel>
}
