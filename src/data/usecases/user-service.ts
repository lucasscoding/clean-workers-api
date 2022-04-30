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
      const exist = await this.findBy({ email: params.user.email })
      if(!exist) {
        const saved = await this.userRepository.save(params.user)
        return saved
      }
    }
    return null
  }

  async findBy(params: ILoadUser.Params): Promise<ILoadUser.Result> {
    let user = null
    if(params.id) {
      user = await this.userRepository.findById(params.id)
    } else if (params.email) {
      user = await this.userRepository.findByEmail(params.email)
    }
    return user
  }
}
