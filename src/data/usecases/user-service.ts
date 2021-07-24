import { User } from '@/domain/models'
import { LoadUserProtocol } from '@/domain/protocols'

export class UserService implements LoadUserProtocol {
  loadOneUser(id: string): User {
    return {
      id,
      name: '',
      email: ''
    }
  }
}
