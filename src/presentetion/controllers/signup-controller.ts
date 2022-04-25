import { ISignUpController } from '@/presentetion/protocol'
import { MissingParamError } from '@/presentetion/errors'
import { HttpHelper } from '@/presentetion/helpers'
import { UserService } from '@/data/usecases'

export class SignUpController implements ISignUpController {
  private readonly userService: UserService

  constructor(userService: UserService) {
    this.userService = userService
  }

  async handle(httpRequest: ISignUpController.Request): Promise<ISignUpController.Result> {
    const checks = ['email', 'password']
    for(const param of checks) {
      if(!httpRequest[param]) {
        return HttpHelper.badRequest(new MissingParamError(param))
      }
    }
    return HttpHelper.ok(null)
  }
}
