import { AddAccountService } from '@/data/usecases'
import { AccountMongoDatabase } from '@/infra/databases'
import { SignUpController } from '@/presentetion/controllers'
import { ValidatorBuilder } from '@/main/builders'

export class AccountFactory {
  public static createSignUpController(): SignUpController {
    const accountMongoDatabase = new AccountMongoDatabase()
    const addAccountService = new AddAccountService(accountMongoDatabase)
    const validators = ValidatorBuilder.builder().email().password().build()
    return new SignUpController(addAccountService, validators)
  }
}
