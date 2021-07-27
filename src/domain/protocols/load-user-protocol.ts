import { User } from '@/domain/models'

export interface LoadUserProtocol {
  findOne(id: string): Promise<User>
  findAll(): Promise<Array<User>>
}
