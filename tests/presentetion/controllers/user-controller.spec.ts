import { UserModel } from '@/data/models'
import { UserService } from '@/data/usecases'
import { MongoRepository } from '@/infra/databases/mongo-db-repository'
import { UserController } from '@/presentetion/controllers'

const makeSystemUnderTest = (): any => {
  const userMock: UserModel = {
    id: '123',
    name: 'any_name',
    email: 'any_email'
  }
  const mockUserService = new UserService(new MongoRepository())
  const mockUserController: UserController = new UserController(mockUserService)
  return { userMock, mockUserController, mockUserService }
}

describe('User Controller', () => {
  it('should return 200 with correct id', async () => {
    const { userMock, mockUserController, mockUserService } = makeSystemUnderTest()
    jest.spyOn(mockUserService, 'loadOneUser').mockResolvedValueOnce(userMock)
    const httpResponse = await mockUserController.find(userMock.id)
    expect(httpResponse).toBeTruthy()
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.id).toBe(userMock.id)
  })
})
