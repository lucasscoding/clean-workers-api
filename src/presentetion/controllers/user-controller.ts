import { UserModel } from '@/data/models'
import { LoadUserProtocol } from '@/domain/protocols'
import { HttpResponse, HttpResponseMessage } from '@/presentetion/models'

export class UserController {
  private readonly userService: LoadUserProtocol

  constructor(userService: LoadUserProtocol) {
    this.userService = userService
  }

  async find(id: string): Promise<HttpResponse<UserModel | HttpResponseMessage>> {
    const user = await this.userService.loadOneUser(id)
    return Promise.resolve({
      statusCode: 200,
      body: user
    })
  }
}
