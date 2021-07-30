import { UserModel } from '@/data/models'

export interface LoadUserRepository {
  findById(id: string): Promise<UserModel>
  findByEmail(email: string): Promise<UserModel>
  findAll(): Promise<Array<UserModel>>
}
