import { HttpResponse } from '@/presentetion/models'

export interface Controller<T = any> {
  handle(httpRequest: T): Promise<HttpResponse>
}
