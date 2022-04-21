import { HttpRequest, HttpResponse } from '@/presentetion/models'

export interface ControllerProtocol<T, R> {
  handle(httpRequest: HttpRequest<T>): HttpResponse<R>
}
