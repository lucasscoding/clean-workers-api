import { Validator } from '@/presentation/protocols'
import validator from 'validator'

export class EmailValidatorAdapter implements Validator {
  verify(input: Validator.Input): Validator.Output {
    const success = validator.isEmail(input.email)
    const message = 'email'
    return { success, message }
  }
}
