import { User } from '@/domain/models'

export interface SaveUserProtocol {
  save(user: User): User
}
