import { UserModel } from '@/data/models'
import { User } from '@/domain/models'
import { LoadUserProtocol, SaveUserProtocol } from '@/domain/protocols'
import { UserRepository } from '../protocols/user-repository-protocol'

export class UserService implements LoadUserProtocol, SaveUserProtocol {
  private readonly userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  save(user: User): User {
    throw new Error('Method not implemented.')
  }

  async findOne(id: string): Promise<UserModel> {
    if(!id) return null
    const userLoad = await this.userRepository.findById(id)
    return userLoad
  }
}
