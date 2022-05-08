import { InvalidParamError, MissingParamError } from '@/presentetion/errors'
import { HttpHelper } from '@/presentetion/helpers'
import { AddAccount } from '@/domain/usecases'
import { SignUpAccountController } from '@/presentetion/protocol'

export class SignUpController implements SignUpAccountController {
  private readonly addAccount: AddAccount

  constructor(addAccount: AddAccount) {
    this.addAccount = addAccount
  }

  async handle(httpRequest: SignUpAccountController.Request): SignUpAccountController.Result {
    const checks = ['email', 'password']
    for(const param of checks) {
      if(!httpRequest[param]) {
        return HttpHelper.badRequest(new MissingParamError(param))
      }
      if(httpRequest[param].length < 4) {
        return HttpHelper.badRequest(new InvalidParamError(param))
      }
    }
    const result = await this.addAccount.add(httpRequest)
    return HttpHelper.created(result)
  }
}
