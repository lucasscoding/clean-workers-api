import { UserModel } from '@/data/models'
import { UserService } from '@/data/usecases'
import { DatabaseRepositoryStub } from '@/tests/data/mocks'

const makeSystemUnderTest = (): any => {
  const userMock: UserModel = {
    id: '123',
    name: 'any_name',
    email: 'any_email'
  }
  const databaseRepositoryStub = new DatabaseRepositoryStub()
  const mockUserService: UserService = new UserService(databaseRepositoryStub)

  return { userMock, mockUserService, databaseRepositoryStub }
}

describe('UserService', () => {
  it('should load a user with the current id', async () => {
    const { userMock, mockUserService, databaseRepositoryStub } = makeSystemUnderTest()
    jest.spyOn(databaseRepositoryStub, 'findById').mockResolvedValueOnce(userMock)
    const user: UserModel = await mockUserService.findOne(userMock.id)
    expect(user).toBeTruthy()
    expect(user.id).toBe(userMock.id)
  })

  it('should return erro if id not informed', async () => {
    const { userMock, mockUserService, databaseRepositoryStub } = makeSystemUnderTest()
    const invalidId = null
    jest.spyOn(databaseRepositoryStub, 'findById').mockResolvedValueOnce(userMock)
    const user: UserModel = await mockUserService.findOne(invalidId)
    expect(user).toBeNull()
  })

  it('should save a anime with sucess', async () => {
    const { userMock, mockUserService, databaseRepositoryStub } = makeSystemUnderTest()
    jest.spyOn(databaseRepositoryStub, 'save').mockResolvedValueOnce(userMock)
    const saveFromService = await mockUserService.save(userMock)
    expect(saveFromService).toBeTruthy()
    expect(saveFromService.name).toBe(userMock.name)
    expect(saveFromService.email).toBe(userMock.email)
  })

  it('should return null with invalid email', async () => {
    const { userMock, mockUserService, databaseRepositoryStub } = makeSystemUnderTest()
    jest.spyOn(databaseRepositoryStub, 'save').mockResolvedValueOnce(userMock)
    const userWithOutEmail = { ...userMock, email: null }
    const invalidReturn = await mockUserService.save(userWithOutEmail)
    expect(invalidReturn).toBeNull()
  })

  it('should return null with invalid name', async () => {
    const { userMock, mockUserService, databaseRepositoryStub } = makeSystemUnderTest()
    jest.spyOn(databaseRepositoryStub, 'save').mockResolvedValueOnce(userMock)
    const userWithOutName = { ...userMock, name: null }
    const invalidReturn = await mockUserService.save(userWithOutName)
    expect(invalidReturn).toBeNull()
  })

  it('should return a list of user', async () => {
    const { userMock, mockUserService, databaseRepositoryStub } = makeSystemUnderTest()
    const mockList = Array(10).fill(userMock)
    jest.spyOn(databaseRepositoryStub, 'findAll').mockResolvedValueOnce(mockList)
    const users = await mockUserService.findAll()
    expect(users).toBeTruthy()
    expect(users.length).toBe(10)
  })
})
