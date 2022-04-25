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
    const checks = ['email', 'name', 'password']
    for(const param of checks) {
      if(!httpRequest[param]) {
        return HttpHelper.badRequest(new MissingParamError(param))
      }
    }
    const { name, email, password } = httpRequest
    const user = { name, email, password }
    const result = await this.userService.save({ user })
    return HttpHelper.ok(result)
  }
}
