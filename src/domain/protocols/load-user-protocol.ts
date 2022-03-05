import { User } from '@/domain/models'

export interface LoadUserProtocol {
  findOne(id: string): Promise<User>
  findByEmail(email: string): Promise<User>
  findAll(): Promise<Array<User>>
  save(user: User): Promise<User>
}
