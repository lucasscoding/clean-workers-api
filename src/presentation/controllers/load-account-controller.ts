import { LoadAccount } from '@/domain/usecases'
import { LoadController, Validator } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'
import { HttpHelper } from '@/presentation/helpers'

export class LoadAccountController implements LoadController {
  private readonly loadAccount: LoadAccount
  private readonly validators: Array<Validator>

  constructor(loadAccount: LoadAccount, validators: Array<Validator>) {
    this.loadAccount = loadAccount
    this.validators = validators
  }

  async load(httpRequest: LoadController.Request): Promise<LoadController.Result> {
    for(const validator of this.validators) {
      const result = validator.verify(httpRequest)
      if(!result.success) {
        return HttpHelper.badRequest(new InvalidParamError(result.message))
      }
    }
    const result = await this.loadAccount.load({ id: httpRequest.id })
    if(!result) {
      return HttpHelper.notFound()
    }
    const { id, name, email } = result
    return HttpHelper.ok<LoadController.Output>({ id, name, email })
  }
}
