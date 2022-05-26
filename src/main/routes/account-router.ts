import { Router } from 'express'
import { AccountAdapter } from '@/main/adapters'

export class AccountRouter {
  public static add(router: Router): void {
    router.post('/account/signup', AccountAdapter.signUpAdapter())
    router.get('/account/:id', AccountAdapter.loadAdapter())
  }
}
