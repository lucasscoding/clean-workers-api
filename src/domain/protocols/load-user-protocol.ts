import { User } from '@/domain/models'

export interface LoadUserProtocol {
  loadOneUser(id: string): User
}
