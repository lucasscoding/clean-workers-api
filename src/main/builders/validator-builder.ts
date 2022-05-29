import { Validator } from '@/presentation/protocols'
import { EmailValidatorAdapter, PasswordValidatorAdapter, IdValidatorAdapter } from '@/main/adapters'

export class ValidatorBuilder {
  private readonly validators: Array<Validator> = []

  private constructor() {}

  public static builder(): ValidatorBuilder {
    return new ValidatorBuilder()
  }

  public email(): ValidatorBuilder {
    this.validators.push(new EmailValidatorAdapter())
    return this
  }

  public password(): ValidatorBuilder {
    this.validators.push(new PasswordValidatorAdapter())
    return this
  }

  public id(): ValidatorBuilder {
    this.validators.push(new IdValidatorAdapter())
    return this
  }

  public build(): Array<Validator> {
    return this.validators
  }
}
