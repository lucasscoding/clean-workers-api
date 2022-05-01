import { HttpResponse } from '@/presentetion/models'

export interface SignUpAccountController {
  handle(httpRequest: SignUpAccountController.Request): SignUpAccountController.Result
}

export namespace SignUpAccountController {
  export type Request = {
    email: string
    password: string
  }
  export type Result = Promise<HttpResponse | any>
}
