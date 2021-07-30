import { UserModel } from '@/data/models'
import { User } from '@/domain/models'
import { LoadUserProtocol, SaveUserProtocol } from '@/domain/protocols'
import { UserRepository } from '@/data/protocols'

export class UserService implements LoadUserProtocol, SaveUserProtocol {
  private readonly userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async findAll(): Promise<Array<User>> {
    const userList = await this.userRepository.findAll()
    return userList
  }

  async save(user: User): Promise<UserModel> {
    if(!user.name || !user.email) return null
    const savedUser = await this.userRepository.save(user)
    return savedUser
  }

  async findOne(id: string): Promise<UserModel> {
    if(!id) return null
    const loadUser = await this.userRepository.findById(id)
    return loadUser
  }

  findByEmail(email: string): Promise<User> {
    throw new Error('Method not implemented.')
  }
}
