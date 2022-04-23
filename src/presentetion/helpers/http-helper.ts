import { HttpResponse } from '@/presentetion/models'
export class HttpHelper {
  public static readonly OK: number = 200
  public static readonly CREATED: number = 201
  public static readonly BAD_REQUEST: number = 400

  static badRequest(error: Error): Promise<HttpResponse> {
    const result = { body: error, statusCode: HttpHelper.BAD_REQUEST }
    return Promise.resolve(result)
  }

  static ok<T>(body: T): Promise<HttpResponse<T>> {
    const result = { body: body, statusCode: HttpHelper.OK }
    return Promise.resolve(result)
  }

  static created<T>(body: T): Promise<HttpResponse<T>> {
    const result = { body: body, statusCode: HttpHelper.CREATED }
    return Promise.resolve(result)
  }
}
