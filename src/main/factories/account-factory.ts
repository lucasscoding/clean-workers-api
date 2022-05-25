import { AddAccountService, LoadAccountService } from '@/data/usecases'
import { AccountMongoDatabase } from '@/infra/databases'
import { SignUpController, LoadAccountController } from '@/presentation/controllers'
import { ValidatorBuilder } from '@/main/builders'
import { BcryptEncrypterAdapter } from '@/infra/encrypters'
import { MongoDatabaseSingleton } from '@/infra/databases/mongodb/config'

export class AccountFactory {
  public static async createAccountMongoDatabase(): Promise<AccountMongoDatabase> {
    const mongoClient = await MongoDatabaseSingleton.getInstance().connect()
    const accountMongoDatabase = new AccountMongoDatabase(mongoClient)
    return accountMongoDatabase
  }

  public static async createSignUpController(): Promise<SignUpController> {
    const accountMongoDatabase = await AccountFactory.createAccountMongoDatabase()
    const bcryptEncrypterAdapter = new BcryptEncrypterAdapter()
    const addAccountService = new AddAccountService(accountMongoDatabase, bcryptEncrypterAdapter)
    const validators = ValidatorBuilder.builder().email().password().build()
    return new SignUpController(addAccountService, validators)
  }

  public static async createLoadAccountController(): Promise<LoadAccountController> {
    const accountMongoDatabase = await AccountFactory.createAccountMongoDatabase()
    const loadAccountService = new LoadAccountService(accountMongoDatabase)
    return new LoadAccountController(loadAccountService)
  }
}
