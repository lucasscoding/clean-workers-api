import { AddAccountService } from '@/data/usecases'
import { AccountMongoDatabase } from '@/infra/databases'
import { SignUpController } from '@/presentetion/controllers'
import { ValidatorBuilder } from '@/main/builders'
import { BcryptEncrypterAdapter } from '@/infra/adapters'

export class AccountFactory {
  public static createSignUpController(): SignUpController {
    const accountMongoDatabase = new AccountMongoDatabase()
    const bcryptEncrypterAdapter = new BcryptEncrypterAdapter()
    const addAccountService = new AddAccountService(accountMongoDatabase, bcryptEncrypterAdapter)
    const validators = ValidatorBuilder.builder().email().password().build()
    return new SignUpController(addAccountService, validators)
  }
}
