import { UserModel } from '@/data/models'

export interface LoadUserRepository {
  findById(id: string): Promise<UserModel>
}
