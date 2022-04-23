import { ControllerProtocol } from '@/presentetion/protocol'
import { HttpRequest, HttpResponse } from '@/presentetion/models'
import { UserModel } from '@/data/models'
import { MissingParamError } from '@/presentetion/errors'
import { HttpHelper } from '@/presentetion/helpers'

export class SignUpController implements ControllerProtocol<UserModel, UserModel | MissingParamError> {
  handle(httpRequest: HttpRequest<UserModel>): HttpResponse<UserModel | MissingParamError> {
    if(!httpRequest.body.email) {
      return HttpHelper.badRequest(new MissingParamError('email'))
    }
    return HttpHelper.ok<UserModel>(null)
  }
}
