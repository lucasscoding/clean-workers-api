import { ILoadUser, ISaveUser } from '@/domain/protocols'
import { UserRepository } from '@/data/protocols'

export class UserService implements ILoadUser, ISaveUser {
  private readonly userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async findAll(): Promise<Array<ILoadUser.Result>> {
    const list = await this.userRepository.findAll()
    return list
  }

  async save(params: ISaveUser.Params): Promise<ISaveUser.Result> {
    if(params.user.name && params.user.email) {
      const exist = await this.findByEmail({ email: params.user.email })
      if(!exist) {
        const saved = await this.userRepository.save(params.user)
        return saved
      }
    }
    return null
  }

  async findOne(params: ILoadUser.Params): Promise<ILoadUser.Result> {
    if(params.id) {
      const user = await this.userRepository.findById(params.id)
      return user
    }
    return null
  }

  async findByEmail(params: ILoadUser.Params): Promise<ILoadUser.Result> {
    if(params.email) {
      const user = await this.userRepository.findByEmail(params.email)
      return user
    }
    return null
  }
}
