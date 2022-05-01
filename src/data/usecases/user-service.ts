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
    if(params.name && params.email) {
      const exist = await this.findBy({ email: params.email })
      if(!exist) {
        const saved = await this.userRepository.save(params)
        return saved
      }
    }
    return null
  }

  async findBy(params: ILoadUser.Params): Promise<ILoadUser.Result> {
    if(!params.id && !params.email) {
      return null
    }
    const result = await this.userRepository.findBy({ id: params.id, email: params.email })
    return result
  }
}
