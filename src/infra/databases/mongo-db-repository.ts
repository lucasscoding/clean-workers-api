import { UserModel } from '@/data/models'
import { LoadUserRepository, SaveUserRepository } from '@/data/protocols'
import { User } from '@/domain/models'

export class MongoRepository implements LoadUserRepository, SaveUserRepository {
  findAll(): Promise<Array<UserModel>> {
    return null
  }

  save(user: UserModel): Promise<UserModel> {
    return null
  }

  findById(id: string): Promise<UserModel> {
    return null
  }

  findByEmail(email: string): Promise<User> {
    return null
  }
}
