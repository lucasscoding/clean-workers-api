import { HttpResponse } from '@/presentation/models'

export namespace LoadController {
  export type Request = {
    id?: string
  }

  export type Output = {
    id: string
    name: string
    email: string
  }

  export type Result = HttpResponse<Output>
}

export interface LoadController {
  load(httpRequest: LoadController.Request): Promise<LoadController.Result>
}
