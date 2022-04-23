import { HttpResponse } from '@/presentetion/models'

export class HttpHelper {
  static badRequest(error: Error): HttpResponse {
    return {
      statusCode: 400,
      body: error
    }
  }

  static ok<T>(body: T): HttpResponse {
    return {
      statusCode: 200,
      body
    }
  }
}
