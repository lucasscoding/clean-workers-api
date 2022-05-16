import { AddAccountService } from '@/data/usecases'
import { AccountMongoDatabase } from '@/infra/databases'
import { EmailValidatorAdapter, PasswordValidatorAdapter } from '@/presentetion/adapters'
import { SignUpController } from '@/presentetion/controllers'

export class AccountFactory {
  public static createSignUpController(): SignUpController {
    const accountMongoDatabase = new AccountMongoDatabase()
    const addAccountService = new AddAccountService(accountMongoDatabase)
    const validators = [new EmailValidatorAdapter(), new PasswordValidatorAdapter()]
    return new SignUpController(addAccountService, validators)
  }
}
