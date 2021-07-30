import { UserModel } from '@/data/models'
import { User } from '@/domain/models'
import { LoadUserProtocol, SaveUserProtocol } from '@/domain/protocols'

export class UserServiceStub implements LoadUserProtocol, SaveUserProtocol {
  findByEmail(email: string): Promise<User> {
    return null
  }

  async findAll(): Promise<Array<User>> {
    return null
  }

  async save(user: User): Promise<UserModel> {
    return null
  }

  async findOne(id: string): Promise<UserModel> {
    return null
  }
}
