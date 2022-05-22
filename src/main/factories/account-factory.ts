import { AddAccountService } from '@/data/usecases'
import { AccountMongoDatabase } from '@/infra/databases'
import { SignUpController } from '@/presentation/controllers'
import { ValidatorBuilder } from '@/main/builders'
import { BcryptEncrypterAdapter } from '@/infra/encrypters'
import { MongoDatabaseSingleton } from '@/infra/databases/mongodb/config'

export class AccountFactory {
  public static async createSignUpController(): Promise<SignUpController> {
    const mongoClient = await MongoDatabaseSingleton.getInstance().connect()
    const accountMongoDatabase = new AccountMongoDatabase(mongoClient)
    const bcryptEncrypterAdapter = new BcryptEncrypterAdapter()
    const addAccountService = new AddAccountService(accountMongoDatabase, bcryptEncrypterAdapter)
    const validators = ValidatorBuilder.builder().email().password().build()
    return new SignUpController(addAccountService, validators)
  }
}
