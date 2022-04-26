import { UserModel } from '@/data/models'
import { ILoadUser, ISaveUser } from '@/domain/protocols'
import { HttpResponse, HttpResponseMessage } from '@/presentetion/models'
import { HttpHelper } from '@/presentetion/helpers'
import { InvalidParamError } from '../errors'
export class UserController {
  private readonly loadUserService: ILoadUser
  private readonly saveUserService: ISaveUser

  constructor(loadUserService: ILoadUser, saveUserService: ISaveUser) {
    this.loadUserService = loadUserService
    this.saveUserService = saveUserService
  }

  async find(id: string): Promise<HttpResponse<UserModel | HttpResponseMessage>> {
    const user = await this.loadUserService.findOne({ id })
    return HttpHelper.ok(user)
  }

  async save(user: UserModel): Promise<HttpResponse<UserModel | HttpResponseMessage>> {
    const checks = ['email', 'name', 'password']
    for(const param of checks) {
      if(!user[param]) {
        return HttpHelper.badRequest(new InvalidParamError(param))
      }
    }
    const saved = await this.saveUserService.save({ user })
    return HttpHelper.created(saved)
  }

  async findAll(): Promise<HttpResponse<Array<UserModel> | HttpResponseMessage>> {
    const users = await this.loadUserService.findAll()
    return HttpHelper.ok(users)
  }

  async findByEmail(email: string): Promise<HttpResponse<UserModel | HttpResponseMessage>> {
    const user = await this.loadUserService.findByEmail({ email })
    return HttpHelper.ok(user)
  }
}
