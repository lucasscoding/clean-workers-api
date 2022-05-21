import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { HttpHelper } from '@/presentation/helpers'
import { AddAccount } from '@/domain/usecases'
import { SignUpAccountController, Validator } from '@/presentation/protocols'

export class SignUpController implements SignUpAccountController {
  private readonly addAccount: AddAccount
  private readonly validators: Array<Validator>

  constructor(addAccount: AddAccount, validators: Array<Validator>) {
    this.addAccount = addAccount
    this.validators = validators
  }

  async handle(httpRequest: SignUpAccountController.Request): SignUpAccountController.Result {
    const checks = ['email', 'password']
    for(const param of checks) {
      if(!httpRequest[param]) {
        return HttpHelper.badRequest(new MissingParamError(param))
      }
    }
    for(const validator of this.validators) {
      const result = validator.verify(httpRequest)
      if(!result.success) {
        return HttpHelper.badRequest(new InvalidParamError(result.message))
      }
    }
    const result = await this.addAccount.add(httpRequest)
    return HttpHelper.created(result)
  }
}
