import { UserModel } from '@/data/models'
import { UserService } from '@/data/usecases'
import { MongoRepository } from '@/infra/databases/mongo-db-repository'

const makeSystemUnderTest = (): any => {
  const userMock: UserModel = {
    id: '123',
    name: 'any_name',
    email: 'any_email'
  }
  const mockMongoRepository = new MongoRepository()
  const mockUserService: UserService = new UserService(mockMongoRepository)

  return { userMock, mockUserService, mockMongoRepository }
}

describe('UserService', () => {
  it('should load a user with the current id', async () => {
    const { userMock, mockUserService } = makeSystemUnderTest()
    const user: UserModel = await mockUserService.findOne(userMock.id)
    expect(user).toBeTruthy()
    expect(user.id).toBe(userMock.id)
  })

  it('should return erro if id not informed', async () => {
    const { mockUserService } = makeSystemUnderTest()
    const invalidId = null
    const user: UserModel = await mockUserService.findOne(invalidId)
    expect(user).toBeNull()
  })

  it('should save a anime with sucess', async () => {
    const { userMock, mockUserService, mockMongoRepository } = makeSystemUnderTest()
    jest.spyOn(mockMongoRepository, 'save').mockResolvedValueOnce(userMock)
    const saveFromService = await mockUserService.save(userMock)
    expect(saveFromService).toBeTruthy()
    expect(saveFromService.name).toBe(userMock.name)
    expect(saveFromService.email).toBe(userMock.email)
  })

  it('should return null with invalid email', async () => {
    const { userMock, mockUserService, mockMongoRepository } = makeSystemUnderTest()
    jest.spyOn(mockMongoRepository, 'save').mockResolvedValueOnce(userMock)
    const userWithOutEmail = { ...userMock, email: null }
    const invalidReturn = await mockUserService.save(userWithOutEmail)
    expect(invalidReturn).toBeNull()
  })

  it('should return null with invalid name', async () => {
    const { userMock, mockUserService, mockMongoRepository } = makeSystemUnderTest()
    jest.spyOn(mockMongoRepository, 'save').mockResolvedValueOnce(userMock)
    const userWithOutName = { ...userMock, name: null }
    const invalidReturn = await mockUserService.save(userWithOutName)
    expect(invalidReturn).toBeNull()
  })
})
