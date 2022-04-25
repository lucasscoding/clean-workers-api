import { HttpResponse } from '@/presentetion/models'

export interface ISignUpController {
  handle(httpRequest: ISignUpController.Request): Promise<ISignUpController.Result>
}

export namespace ISignUpController {
  export type Request = {
    email: string
    password: string
  }
  export type Result = HttpResponse | any
}
