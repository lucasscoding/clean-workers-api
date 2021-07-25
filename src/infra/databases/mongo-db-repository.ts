import { UserModel } from '@/data/models'
import { LoadUserRepository } from '@/data/protocols'

export class MongoRepository implements LoadUserRepository {
  findById(id: string): UserModel {
    return {
      id,
      name: 'any_name',
      email: 'any_email'
    }
  }
}
