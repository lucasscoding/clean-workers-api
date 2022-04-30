import { UserModel } from '@/data/models'
import { HttpResponse, HttpResponseMessage } from '@/presentetion/models'

export namespace IUserController {
  export type Params = {
    id?: string
    email?: string
  }
  export type Result<T = UserModel> = HttpResponse<T | HttpResponseMessage>
}

export interface IUserController {
  find(params: IUserController.Params): Promise<IUserController.Result>
  save(user: UserModel): Promise<IUserController.Result>
  findAll(): Promise<IUserController.Result<Array<UserModel>>>
}
