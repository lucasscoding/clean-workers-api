import { User } from '@/domain/models'
import { UserModel } from '@/data/models'

export interface SaveUserRepository {
  save(user: UserModel): Promise<User>
}
