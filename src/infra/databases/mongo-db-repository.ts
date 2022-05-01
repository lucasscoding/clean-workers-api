import { UserModel } from '@/data/models'
import { LoadUserRepository, UserRepository } from '@/data/protocols'
import { User } from '@/domain/models'

export class MongoRepository implements UserRepository {
  findBy(params: LoadUserRepository.Params): Promise<UserModel> {
    return null
  }

  findAll(): Promise<Array<UserModel>> {
    return null
  }

  async save(user: UserModel): Promise<User> {
    return null
  }
}
