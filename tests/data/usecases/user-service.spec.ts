import { UserModel } from '@/data/models'
import { UserService } from '@/data/usecases'
import { DatabaseRepositoryStub } from '@/tests/data/mocks'
import { faker } from '@faker-js/faker'

type SystemUnderTest = {
  fakerUser: UserModel
  databaseRepositoryStub: DatabaseRepositoryStub
  mockUserService: UserService
}

const systemUnderTest = (): SystemUnderTest => {
  const fakerUser: UserModel = {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email()
  }
  const databaseRepositoryStub = new DatabaseRepositoryStub()
  const mockUserService: UserService = new UserService(databaseRepositoryStub)

  return { fakerUser, mockUserService, databaseRepositoryStub }
}

const { fakerUser, mockUserService, databaseRepositoryStub } = systemUnderTest()

describe('UserService', () => {
  it('should load a user with the current id', async () => {
    jest.spyOn(databaseRepositoryStub, 'findById').mockResolvedValueOnce(fakerUser)
    const user: UserModel = await mockUserService.findOne(fakerUser.id)
    expect(user).toBeTruthy()
    expect(user.id).toBe(fakerUser.id)
  })

  it('should return erro if id not informed', async () => {
    const invalidId = null
    jest.spyOn(databaseRepositoryStub, 'findById').mockResolvedValueOnce(fakerUser)
    const user: UserModel = await mockUserService.findOne(invalidId)
    expect(user).toBeNull()
  })

  it('should save a anime with sucess', async () => {
    jest.spyOn(databaseRepositoryStub, 'save').mockResolvedValueOnce(fakerUser)
    const saveFromService = await mockUserService.save({ user: fakerUser })
    expect(saveFromService).toBeTruthy()
    expect(saveFromService.name).toBe(fakerUser.name)
    expect(saveFromService.email).toBe(fakerUser.email)
  })

  it('should return null when try save with invalid email', async () => {
    jest.spyOn(databaseRepositoryStub, 'save').mockResolvedValueOnce(fakerUser)
    const userWithOutEmail = { ...fakerUser, email: null }
    const invalidReturn = await mockUserService.save({ user: userWithOutEmail })
    expect(invalidReturn).toBeNull()
  })

  it('sould been call findByEmail with the correct param', async () => {
    const spy = jest.spyOn(mockUserService, 'findByEmail')
    await mockUserService.save({ user: fakerUser })
    expect(spy).toHaveBeenCalledWith(fakerUser.email)
  })

  it('should return null when try save with invalid name', async () => {
    jest.spyOn(databaseRepositoryStub, 'save').mockResolvedValueOnce(fakerUser)
    const userWithOutName = { ...fakerUser, name: null }
    const invalidReturn = await mockUserService.save({ user: userWithOutName })
    expect(invalidReturn).toBeNull()
  })

  it('sould return null if email already exist', async () => {
    jest.spyOn(mockUserService, 'findByEmail').mockResolvedValueOnce(fakerUser)
    const user = await mockUserService.save({ user: fakerUser })
    expect(user).toBeFalsy()
  })

  it('should return a list of user', async () => {
    const mockList = Array(10).fill(fakerUser)
    jest.spyOn(databaseRepositoryStub, 'findAll').mockResolvedValueOnce(mockList)
    const users = await mockUserService.findAll()
    expect(users).toBeTruthy()
    expect(users.length).toBe(10)
  })

  it('should return a user by email', async () => {
    jest.spyOn(databaseRepositoryStub, 'findByEmail').mockResolvedValueOnce(fakerUser)
    const user = await mockUserService.findByEmail(fakerUser.email)
    expect(user).toBeTruthy()
    expect(user.name).toBe(fakerUser.name)
    expect(user.email).toBe(fakerUser.email)
  })

  it('should return null with invalid email', async () => {
    const user = await mockUserService.findByEmail(null)
    expect(user).toBeFalsy()
  })
})
