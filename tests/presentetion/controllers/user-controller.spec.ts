import { UserModel } from '@/data/models'
import { UserController } from '@/presentetion/controllers'
import { UserServiceStub } from '@/tests/data/mocks'

type SystemUnderTest = {
  fakeUser: UserModel
  userController: UserController
  userServiceStub: UserServiceStub
}

const systemUnderTest = (): SystemUnderTest => {
  const fakeUser: UserModel = {
    id: '123',
    name: 'any_name',
    email: 'any_email'
  }
  const userServiceStub = new UserServiceStub()
  const userController: UserController = new UserController(userServiceStub)
  return { fakeUser: fakeUser, userController, userServiceStub }
}

describe('User Controller', () => {
  it('should return 200 with correct id', async () => {
    const { fakeUser, userController, userServiceStub } = systemUnderTest()
    jest.spyOn(userServiceStub, 'findOne').mockResolvedValueOnce(fakeUser)
    const httpResponse = await userController.find(fakeUser.id)
    expect(httpResponse).toBeTruthy()
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toMatchObject({ id: fakeUser.id })
  })

  it('should return 201 when create a user', async () => {
    const { fakeUser, userController, userServiceStub } = systemUnderTest()
    jest.spyOn(userServiceStub, 'save').mockResolvedValueOnce(fakeUser)
    const httpResponse = await userController.save({ ...fakeUser, id: null })
    expect(httpResponse).toBeTruthy()
    expect(httpResponse.statusCode).toBe(201)
    expect(httpResponse.body).toMatchObject(fakeUser)
  })

  it('should return 200 when find a user list', async () => {
    const { fakeUser, userController, userServiceStub } = systemUnderTest()
    jest.spyOn(userServiceStub, 'findAll').mockResolvedValueOnce([fakeUser])
    const httpResponse = await userController.findAll()
    expect(httpResponse).toBeTruthy()
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toMatchObject([fakeUser])
  })
})
