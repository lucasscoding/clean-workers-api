import { UserModel } from '@/data/models'
import { LoadUserRepository, SaveUserRepository } from '@/data/protocols'
import { User } from '@/domain/models'

export class MongoRepository implements LoadUserRepository, SaveUserRepository {
  save(user: User): User {
    throw new Error('Method not implemented.')
  }

  findById(id: string): Promise<UserModel> {
    return Promise.resolve({
      id,
      name: 'any_name',
      email: 'any_emaila'
    })
  }
}
