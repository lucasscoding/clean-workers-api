import { UserModel } from '@/data/models'
import { UserRepository } from '@/data/protocols'
import { User } from '@/domain/models'

export class MongoRepository implements UserRepository {
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
