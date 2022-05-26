import { Request, Response, NextFunction, RequestHandler } from 'express'
import { AccountFactory } from '@/main/factories'

export class AccountAdapter {
  public static signUpAdapter(): RequestHandler {
    return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
      const { email, password } = request.body
      const signUpController = await AccountFactory.createSignUpController()
      const res = await signUpController.handle({ email, password })
      response.status(res.statusCode).json(res.body)
    }
  }

  public static loadAdapter(): RequestHandler {
    return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
      const { id } = request.params
      const loadAccountController = await AccountFactory.createLoadAccountController()
      const res = await loadAccountController.load({ id })
      response.status(res.statusCode).json(res.body)
    }
  }
}
