import { UserModel } from '@/data/models'
import { ILoadUser, ISaveUser } from '@/domain/protocols'
import { HttpHelper } from '@/presentetion/helpers'
import { InvalidParamError } from '@/presentetion/errors'
import { IUserController } from '@/presentetion/protocol'

export class UserController implements IUserController {
  private readonly loadUserService: ILoadUser
  private readonly saveUserService: ISaveUser

  constructor(loadUserService: ILoadUser, saveUserService: ISaveUser) {
    this.loadUserService = loadUserService
    this.saveUserService = saveUserService
  }

  async find(params: IUserController.Params): Promise<IUserController.Result> {
    const { id, email } = params
    const user = await this.loadUserService.findBy({ id, email })
    return HttpHelper.ok(user)
  }

  async save(user: UserModel): Promise<IUserController.Result> {
    const checks = ['email', 'name', 'password']
    for(const param of checks) {
      if(!user[param]) {
        return HttpHelper.badRequest(new InvalidParamError(param))
      }
    }
    const saved = await this.saveUserService.save(user)
    return HttpHelper.created(saved)
  }

  async findAll(): Promise<IUserController.Result<Array<UserModel>>> {
    const users = await this.loadUserService.findAll()
    return HttpHelper.ok(users)
  }
}
