import { AddAccountService } from '@/data/usecases'
import { AccountMongoDatabase } from '@/infra/databases'
import { SignUpController } from '@/presentetion/controllers'

export class AccountFactory {
  public static createSignUpController(): SignUpController {
    const accountMongoDatabase = new AccountMongoDatabase()
    const addAccountService = new AddAccountService(accountMongoDatabase)
    return new SignUpController(addAccountService)
  }
}
