import { UserModel } from '@/data/models'

export interface SaveUserProtocol {
  save(user: UserModel): Promise<UserModel>
}
