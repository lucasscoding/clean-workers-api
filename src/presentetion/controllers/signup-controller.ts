import { ISignUpController } from '@/presentetion/protocol'
import { HttpResponse } from '@/presentetion/models'
import { UserModel } from '@/data/models'
import { MissingParamError } from '@/presentetion/errors'
import { HttpHelper } from '@/presentetion/helpers'
import { UserService } from '@/data/usecases'

export class SignUpController implements ISignUpController {
  private readonly userService: UserService

  constructor(userService: UserService) {
    this.userService = userService
  }

  handle(httpRequest: ISignUpController.Request): Promise<HttpResponse> {
    const checks = ['email', 'name', 'password']
    for(const param of checks) {
      if(!httpRequest[param]) {
        return HttpHelper.badRequest(new MissingParamError(param))
      }
    }
    return HttpHelper.ok<UserModel>(null)
  }
}
