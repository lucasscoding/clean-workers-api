import { LoadUserProtocol, SaveUserProtocol } from '@/domain/protocols'
import { UserModel } from '@/data/models'

export class UserServiceStub implements LoadUserProtocol, SaveUserProtocol {
  findByEmail(email: string): Promise<UserModel> {
    return null
  }

  async findAll(): Promise<Array<UserModel>> {
    return null
  }

  async save(param: SaveUserProtocol.Params): Promise<SaveUserProtocol.Result> {
    return null
  }

  async findOne(id: string): Promise<UserModel> {
    return null
  }
}
