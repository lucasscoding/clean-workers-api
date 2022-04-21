import { ControllerProtocol } from '@/presentetion/protocol'
import { HttpRequest, HttpResponse } from '@/presentetion/models'
import { UserModel } from '@/data/models'
import { InvalidParamError } from '../errors'

export class SignUpController implements ControllerProtocol<UserModel, UserModel | InvalidParamError> {
  handle(httpRequest: HttpRequest<UserModel>): HttpResponse<UserModel | InvalidParamError> {
    if(!httpRequest.body.email || httpRequest.body.email.length < 5) {
      return {
        statusCode: 400,
        body: new InvalidParamError('email')
      }
    }
    return {
      statusCode: 200
    }
  }
}
