import { Controller } from '@/presentetion/protocol'
import { HttpResponse } from '@/presentetion/models'
import { UserModel } from '@/data/models'
import { MissingParamError } from '@/presentetion/errors'
import { HttpHelper } from '@/presentetion/helpers'

export namespace SignUpController {
  export type Request = {
    name: string
    email: string
    password: string
  }
}

export class SignUpController implements Controller {
  handle(httpRequest: SignUpController.Request): Promise<HttpResponse> {
    if(!httpRequest.email) {
      return Promise.resolve(HttpHelper.badRequest(new MissingParamError('email')))
    }
    return Promise.resolve(HttpHelper.ok<UserModel>(null))
  }
}
