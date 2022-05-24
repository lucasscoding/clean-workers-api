import { HttpResponse } from '@/presentation/models'

export interface SignUpAccountController {
  handle(httpRequest: SignUpAccountController.Request): Promise<SignUpAccountController.Result>
}

export namespace SignUpAccountController {
  export type Request = {
    email: string
    password: string
  }

  export type Output = {
    id: string
    name: string
    email: string
  }

  export type Result = HttpResponse<Output>
}
