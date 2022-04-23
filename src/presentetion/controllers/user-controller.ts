import { UserModel } from '@/data/models'
import { LoadUserProtocol, SaveUserProtocol } from '@/domain/protocols'
import { HttpResponse, HttpResponseMessage } from '@/presentetion/models'

export class UserController {
  private readonly loadUserService: LoadUserProtocol
  private readonly saveUserService: SaveUserProtocol

  constructor(loadUserService: LoadUserProtocol, saveUserService: SaveUserProtocol) {
    this.loadUserService = loadUserService
    this.saveUserService = saveUserService
  }

  async find(id: string): Promise<HttpResponse<UserModel | HttpResponseMessage>> {
    const user = await this.loadUserService.findOne(id)
    return Promise.resolve({
      statusCode: 200,
      body: user
    })
  }

  async save(user: UserModel): Promise<HttpResponse<UserModel | HttpResponseMessage>> {
    const saved = await this.saveUserService.save({ user })
    return Promise.resolve({
      statusCode: 201,
      body: saved
    })
  }

  async findAll(): Promise<HttpResponse<Array<UserModel> | HttpResponseMessage>> {
    const users = await this.loadUserService.findAll()
    return Promise.resolve({
      statusCode: 200,
      body: users
    })
  }

  async findByEmail(email: string): Promise<HttpResponse<UserModel | HttpResponseMessage>> {
    const user = await this.loadUserService.findByEmail(email)
    return Promise.resolve({
      statusCode: 200,
      body: user
    })
  }
}
