import { UserModel } from '@/data/models'
import { LoadUserProtocol } from '@/domain/protocols'
import { LoadUserRepository } from '../protocols'

export class UserService implements LoadUserProtocol {
  private readonly loadUserRepository: LoadUserRepository

  constructor(loadUserRepository: LoadUserRepository) {
    this.loadUserRepository = loadUserRepository
  }

  async loadOneUser(id: string): Promise<UserModel> {
    if(!id) return null
    const userLoad = await this.loadUserRepository.findById(id)
    return userLoad
  }
}
