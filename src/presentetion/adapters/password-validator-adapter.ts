import { Validator } from '@/presentetion/protocol'

export class PasswordValidatorAdapter implements Validator {
  verify(input: Validator.Input): Validator.Output {
    const success = !((input.password.length < 4))
    const message = 'password'
    return { success, message }
  }
}
