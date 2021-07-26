import { UserModel } from '@/data/models'
import { LoadUserRepository, SaveUserRepository } from '@/data/protocols'

export class MongoRepository implements LoadUserRepository, SaveUserRepository {
  save(user: UserModel): Promise<UserModel> {
    return Promise.resolve(user)
  }

  findById(id: string): Promise<UserModel> {
    return Promise.resolve({
      id,
      name: 'any_name',
      email: 'any_emaila'
    })
  }
}
