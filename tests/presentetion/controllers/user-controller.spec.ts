import { UserModel } from '@/data/models'
import { UserController } from '@/presentetion/controllers'
import { UserServiceStub } from '@/tests/data/mocks'

const makeSystemUnderTest = (): any => {
  const userMock: UserModel = {
    id: '123',
    name: 'any_name',
    email: 'any_email'
  }
  const userServiceStub = new UserServiceStub()
  const userController: UserController = new UserController(userServiceStub)
  return { userMock, userController, userServiceStub }
}

describe('User Controller', () => {
  it('should return 200 with correct id', async () => {
    const { userMock, userController, userServiceStub } = makeSystemUnderTest()
    jest.spyOn(userServiceStub, 'findOne').mockResolvedValueOnce(userMock)
    const httpResponse = await userController.find(userMock.id)
    expect(httpResponse).toBeTruthy()
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.id).toBe(userMock.id)
  })
})
