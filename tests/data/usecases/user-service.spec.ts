import { UserModel } from '@/data/models'
import { UserService } from '@/data/usecases'
import { DatabaseRepositoryStub } from '@/tests/data/mocks'

type SystemUnderTest = {
  mockUser: UserModel
  databaseRepositoryStub: DatabaseRepositoryStub
  mockUserService: UserService
}

const makeSystemUnderTest = (): SystemUnderTest => {
  const mockUser: UserModel = {
    id: '123',
    name: 'any_name',
    email: 'any_email'
  }
  const databaseRepositoryStub = new DatabaseRepositoryStub()
  const mockUserService: UserService = new UserService(databaseRepositoryStub)

  return { mockUser, mockUserService, databaseRepositoryStub }
}

const { mockUser, mockUserService, databaseRepositoryStub } = makeSystemUnderTest()

describe('UserService', () => {
  it('should load a user with the current id', async () => {
    jest.spyOn(databaseRepositoryStub, 'findById').mockResolvedValueOnce(mockUser)
    const user: UserModel = await mockUserService.findOne(mockUser.id)
    expect(user).toBeTruthy()
    expect(user.id).toBe(mockUser.id)
  })

  it('should return erro if id not informed', async () => {
    const invalidId = null
    jest.spyOn(databaseRepositoryStub, 'findById').mockResolvedValueOnce(mockUser)
    const user: UserModel = await mockUserService.findOne(invalidId)
    expect(user).toBeNull()
  })

  it('should save a anime with sucess', async () => {
    jest.spyOn(databaseRepositoryStub, 'save').mockResolvedValueOnce(mockUser)
    const saveFromService = await mockUserService.save(mockUser)
    expect(saveFromService).toBeTruthy()
    expect(saveFromService.name).toBe(mockUser.name)
    expect(saveFromService.email).toBe(mockUser.email)
  })

  it('should return null when try save with invalid email', async () => {
    jest.spyOn(databaseRepositoryStub, 'save').mockResolvedValueOnce(mockUser)
    const userWithOutEmail = { ...mockUser, email: null }
    const invalidReturn = await mockUserService.save(userWithOutEmail)
    expect(invalidReturn).toBeNull()
  })

  it('sould been call findByEmail with the correct param', async () => {
    const spy = jest.spyOn(mockUserService, 'findByEmail')
    await mockUserService.save(mockUser)
    expect(spy).toHaveBeenCalledWith(mockUser.email)
  })

  it('should return null when try save with invalid name', async () => {
    jest.spyOn(databaseRepositoryStub, 'save').mockResolvedValueOnce(mockUser)
    const userWithOutName = { ...mockUser, name: null }
    const invalidReturn = await mockUserService.save(userWithOutName)
    expect(invalidReturn).toBeNull()
  })

  it('sould return null if email already exist', async () => {
    jest.spyOn(mockUserService, 'findByEmail').mockResolvedValueOnce(mockUser)
    const user = await mockUserService.save(mockUser)
    expect(user).toBeFalsy()
  })

  it('should return a list of user', async () => {
    const mockList = Array(10).fill(mockUser)
    jest.spyOn(databaseRepositoryStub, 'findAll').mockResolvedValueOnce(mockList)
    const users = await mockUserService.findAll()
    expect(users).toBeTruthy()
    expect(users.length).toBe(10)
  })

  it('should return a user by email', async () => {
    jest.spyOn(databaseRepositoryStub, 'findByEmail').mockResolvedValueOnce(mockUser)
    const user = await mockUserService.findByEmail(mockUser.email)
    expect(user).toBeTruthy()
    expect(user.name).toBe(mockUser.name)
    expect(user.email).toBe(mockUser.email)
  })

  it('should return null with invalid email', async () => {
    const user = await mockUserService.findByEmail(null)
    expect(user).toBeFalsy()
  })
})
