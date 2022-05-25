import { LoadAccount } from '@/domain/usecases'
import { LoadController } from '@/presentation/protocols'
import { HttpHelper } from '../helpers'

export class LoadAccountController implements LoadController {
  private readonly loadAccount: LoadAccount

  constructor(loadAccount: LoadAccount) {
    this.loadAccount = loadAccount
  }

  async load(httpRequest: LoadController.Request): Promise<LoadController.Result> {
    const result = await this.loadAccount.load({ id: httpRequest.id })
    return HttpHelper.ok(result)
  }
}
