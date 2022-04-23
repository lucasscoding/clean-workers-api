import { HttpResponse } from '@/presentetion/models'

export class HttpHelper {
  static badRequest(error: Error): Promise<HttpResponse> {
    return Promise.resolve({
      statusCode: 400,
      body: error
    })
  }

  static ok<T>(body: T): Promise<HttpResponse> {
    return Promise.resolve({
      statusCode: 200,
      body: body
    })
  }
}
