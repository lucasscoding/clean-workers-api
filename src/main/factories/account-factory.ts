import { AddAccountService } from '@/data/usecases'
import { MongoRepository } from '@/infra/databases'
import { AddAccountRepository } from '@/infra/usecases'
import { SignUpController } from '@/presentetion/controllers'

export class AccountFactory {
  public static createSignUpController(): SignUpController {
    const mongoRepository = new MongoRepository()
    const accountRepository = new AddAccountRepository(mongoRepository)
    const addAccountService = new AddAccountService(accountRepository)
    return new SignUpController(addAccountService)
  }
}
