import { HttpResponse, HttpResponseMessage } from '@/presentation/models'
export class HttpHelper {
  public static readonly OK: number = 200
  public static readonly CREATED: number = 201
  public static readonly BAD_REQUEST: number = 400
  public static readonly CONFLICT: number = 409
  public static readonly INTERNAL_SERVER_ERROR = 500

  static ok<T>(body: T): Promise<HttpResponse<T>> {
    const result = { body: body, statusCode: HttpHelper.OK }
    return Promise.resolve(result)
  }

  static created<T>(body: T): Promise<HttpResponse<T>> {
    const result = { body: body, statusCode: HttpHelper.CREATED }
    return Promise.resolve(result)
  }

  static badRequest(error: Error): Promise<HttpResponse> {
    const body: HttpResponseMessage = { sucess: false, message: error.message }
    const result = { body, statusCode: HttpHelper.BAD_REQUEST }
    return Promise.resolve(result)
  }

  static conflict(error: Error): Promise<HttpResponse> {
    const body: HttpResponseMessage = { sucess: false, message: error.message }
    const result = { body, statusCode: HttpHelper.CONFLICT }
    return Promise.resolve(result)
  }

  static internalServerError(error: Error): Promise<HttpResponse> {
    const body: HttpResponseMessage = { sucess: false, message: error.message }
    const result = { body, statusCode: HttpHelper.INTERNAL_SERVER_ERROR }
    return Promise.resolve(result)
  }
}
