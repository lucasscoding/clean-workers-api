import { UserModel } from '@/data/models'
import { LoadUserProtocol } from '@/domain/protocols'
import { InvalidParamError } from '@/presentetion/errors/invalid-param-error'

export class UserService implements LoadUserProtocol {
  loadOneUser(id: string): Promise<UserModel> {
    if(!id) {
      throw new InvalidParamError('id')
    }

    const mock = {
      id,
      name: '',
      email: ''
    }
    return new Promise((resolve, reject) => resolve(mock))
  }
}
