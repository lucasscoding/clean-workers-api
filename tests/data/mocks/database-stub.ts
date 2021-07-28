import { UserModel } from '@/data/models'
import { UserRepository } from '@/data/protocols'

export class DatabaseRepositoryStub implements UserRepository {
  findById(id: string): Promise<UserModel> {
    return null
  }

  findAll(): Promise<UserModel[]> {
    return null
  }

  save(user: UserModel): Promise<UserModel> {
    return null
  }
}
