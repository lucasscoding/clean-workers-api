import { UserModel } from '@/data/models'
import { LoadUserProtocol, SaveUserProtocol } from '@/domain/protocols'
import { HttpResponse, HttpResponseMessage } from '@/presentetion/models'
import { HttpHelper } from '@/presentetion/helpers'
export class UserController {
  private readonly loadUserService: LoadUserProtocol
  private readonly saveUserService: SaveUserProtocol

  constructor(loadUserService: LoadUserProtocol, saveUserService: SaveUserProtocol) {
    this.loadUserService = loadUserService
    this.saveUserService = saveUserService
  }

  async find(id: string): Promise<HttpResponse<UserModel | HttpResponseMessage>> {
    const user = await this.loadUserService.findOne(id)
    return HttpHelper.ok(user)
  }

  async save(user: UserModel): Promise<HttpResponse<UserModel | HttpResponseMessage>> {
    const saved = await this.saveUserService.save({ user })
    return HttpHelper.created(saved)
  }

  async findAll(): Promise<HttpResponse<Array<UserModel> | HttpResponseMessage>> {
    const users = await this.loadUserService.findAll()
    return HttpHelper.ok(users)
  }

  async findByEmail(email: string): Promise<HttpResponse<UserModel | HttpResponseMessage>> {
    const user = await this.loadUserService.findByEmail(email)
    return HttpHelper.ok(user)
  }
}
