import { UserModel } from '@/data/models'
import { LoadUserProtocol, SaveUserProtocol } from '@/domain/protocols'
import { UserRepository } from '@/data/protocols'

export class UserService implements LoadUserProtocol, SaveUserProtocol {
  private readonly userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async findAll(): Promise<Array<UserModel>> {
    const list = await this.userRepository.findAll()
    return list
  }

  async save(param: SaveUserProtocol.Params): Promise<SaveUserProtocol.Result> {
    if(param.user.name && param.user.email) {
      const exist = await this.findByEmail(param.user.email)
      if(!exist) {
        const saved = await this.userRepository.save(param.user)
        return saved
      }
    }
    return null
  }

  async findOne(id: string): Promise<UserModel> {
    if(id) {
      const user = await this.userRepository.findById(id)
      return user
    }
    return null
  }

  async findByEmail(email: string): Promise<UserModel> {
    if(email) {
      const user = await this.userRepository.findByEmail(email)
      return user
    }
    return null
  }
}
