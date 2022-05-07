import App, { Express } from 'express'
import Cors from 'cors'

export class ExpressFactory {
  static createExpressConfig(): Express {
    const app = App()
    app.use(Cors())
    app.use(App.json())
    app.use(App.urlencoded({ extended: false }))
    return app
  }
}
