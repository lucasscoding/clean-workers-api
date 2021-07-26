import { UserModel } from '@/data/models'
import { User } from '@/domain/models'
import { LoadUserProtocol, SaveUserProtocol } from '@/domain/protocols'
import { UserRepository } from '@/data/protocols'

export class UserService implements LoadUserProtocol, SaveUserProtocol {
  private readonly userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async save(user: User): Promise<UserModel> {
    const savedUser = await this.userRepository.save(user)
    return savedUser
  }

  async findOne(id: string): Promise<UserModel> {
    if(!id) return null
    const loadUser = await this.userRepository.findById(id)
    return loadUser
  }
}
