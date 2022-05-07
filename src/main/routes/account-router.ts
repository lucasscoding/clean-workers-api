import { Router } from 'express'
import { AccountAdapter } from '@/main/adapters'

export class AccountRouter {
  public static add(router: Router): void {
    router.post('/signup', AccountAdapter.signUpAdapter())
  }
}
