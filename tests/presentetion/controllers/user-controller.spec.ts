import { UserModel } from '@/data/models'
import { UserController } from '@/presentetion/controllers'
import { UserServiceStub } from '@/tests/data/mocks'

type SystemUnderTest = {
  mockUser: UserModel
  userController: UserController
  userServiceStub: UserServiceStub
}

const makeSystemUnderTest = (): SystemUnderTest => {
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
    expect(httpResponse.body).toMatchObject({ id: mockUser.id })
  })

  it('should return 201 when create a user', async () => {
    const { mockUser, userController, userServiceStub } = makeSystemUnderTest()
    jest.spyOn(userServiceStub, 'save').mockResolvedValueOnce(mockUser)
    const httpResponse = await userController.save({ ...mockUser, id: null })
    expect(httpResponse).toBeTruthy()
    expect(httpResponse.statusCode).toBe(201)
    expect(httpResponse.body).toMatchObject(mockUser)
  })
})
