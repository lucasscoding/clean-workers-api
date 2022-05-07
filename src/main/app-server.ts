import { ExpressFactory } from '@/main/factories'
import { AccountRouter } from '@/main/routes'

export class AppServer {
  public static readonly PORT: number = 8080

  static run(): void {
    const server = ExpressFactory.createExpressConfig()
    AccountRouter.add(server)
    server.listen(AppServer.PORT, () => console.log('server online port:', AppServer.PORT))
  }
}
