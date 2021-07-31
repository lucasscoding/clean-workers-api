import { UserModel } from '@/data/models'
import { UserController } from '@/presentetion/controllers'
import { UserServiceStub } from '@/tests/data/mocks'

const makeSystemUnderTest = (): any => {
  const mockUser: UserModel = {
    id: '123',
    name: 'any_name',
    email: 'any_email'
  }
  const userServiceStub = new UserServiceStub()
  const userController: UserController = new UserController(userServiceStub)
  return { mockUser, userController, userServiceStub }
}

describe('User Controller', () => {
  it('should return 200 with correct id', async () => {
    const { mockUser, userController, userServiceStub } = makeSystemUnderTest()
    jest.spyOn(userServiceStub, 'findOne').mockResolvedValueOnce(mockUser)
    const httpResponse = await userController.find(mockUser.id)
    expect(httpResponse).toBeTruthy()
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.id).toBe(mockUser.id)
  })
})
