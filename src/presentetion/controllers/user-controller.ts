import { UserModel } from '@/data/models'
import { LoadUserProtocol } from '@/domain/protocols'
import { HttpResponse, HttpResponseMessage } from '@/presentetion/models'

export class UserController {
  private readonly userService: LoadUserProtocol

  constructor(userService: LoadUserProtocol) {
    this.userService = userService
  }

  async find(id: string): Promise<HttpResponse<UserModel | HttpResponseMessage>> {
    const user = await this.userService.findOne(id)
    return Promise.resolve({
      statusCode: 200,
      body: user
    })
  }

  async save(user: UserModel): Promise<HttpResponse<UserModel | HttpResponseMessage>> {
    const saved = await this.userService.save(user)
    return Promise.resolve({
      statusCode: 201,
      body: saved
    })
  }

  async findAll(): Promise<HttpResponse<Array<UserModel> | HttpResponseMessage>> {
    const users = await this.userService.findAll()
    return Promise.resolve({
      statusCode: 200,
      body: users
    })
  }
}
