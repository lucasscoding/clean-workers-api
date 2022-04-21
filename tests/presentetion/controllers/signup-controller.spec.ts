import { SignUpController } from '@/presentetion/controllers'
import { InvalidParamError } from '@/presentetion/errors'
import { UserModel } from '@/data/models'
import faker from '@faker-js/faker'
import { HttpRequest } from '../models'

const controller = new SignUpController()

const fakeUser: UserModel = {
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
}

describe('SignUpController', () => {
  it('should return 400 if email is missing', () => {
    const request: HttpRequest<UserModel> = {
      body: { ...fakeUser, email: null }
    }
    const result = controller.handle(request)
    expect(result).toBeTruthy()
    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual(new InvalidParamError('email'))
  })
})
