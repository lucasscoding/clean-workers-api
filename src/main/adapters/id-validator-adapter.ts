import { Validator } from '@/presentation/protocols'

export class IdValidatorAdapter implements Validator {
  verify(param: Validator.Input): Validator.Output {
    const success = param.id.length == 24
    const message = 'id'
    return { success, message }
  }
}
