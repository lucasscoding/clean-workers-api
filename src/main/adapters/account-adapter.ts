import { Request, Response, NextFunction, RequestHandler } from 'express'
import { AccountFactory } from '@/main/factories'

export class AccountAdapter {
  public static signUpAdapter(): RequestHandler {
    return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
      const { email, password } = request.body
      const signUpController = AccountFactory.createSignUpController()
      const signUpResponse = await signUpController.handle({ email, password })
      response.status(signUpResponse.statusCode).json(signUpResponse.body)
    }
  }
}
