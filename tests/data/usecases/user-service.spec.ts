import { UserModel } from '@/data/models'
import { UserService } from '@/data/usecases'
import { mock, MockProxy } from 'jest-mock-extended'
import { faker } from '@faker-js/faker'
import { UserRepository } from '../protocols'

describe('UserService', () => {
  let databaseRepository: MockProxy<UserRepository>
  let userService: UserService
  let fakeUser: UserModel

  beforeEach(() => {
    databaseRepository = mock()
    fakeUser = { id: faker.datatype.uuid(), name: faker.name.findName(), email: faker.internet.email() }
    userService = new UserService(databaseRepository)
  })

  it('should load a user with the current id', async () => {
    jest.spyOn(databaseRepository, 'findById').mockResolvedValueOnce(fakeUser)
    const result = await userService.findBy({ id: fakeUser.id })
    expect(result).toBeTruthy()
    expect(result.id).toBe(fakeUser.id)
    expect(databaseRepository.findById).toHaveBeenCalledTimes(1)
    expect(databaseRepository.findById).toHaveBeenCalledWith(fakeUser.id)
  })

  it('should return erro if id not informed', async () => {
    const invalidId = null
    jest.spyOn(databaseRepository, 'findById').mockResolvedValueOnce(fakeUser)
    const user: UserModel = await userService.findBy({ id: invalidId })
    expect(user).toBeNull()
  })

  it('should save a anime with sucess', async () => {
    jest.spyOn(databaseRepository, 'save').mockResolvedValueOnce(fakeUser)
    const saveFromService = await userService.save(fakeUser)
    expect(saveFromService).toBeTruthy()
    expect(saveFromService.name).toBe(fakeUser.name)
    expect(saveFromService.email).toBe(fakeUser.email)
  })

  it('should return null when try save with invalid email', async () => {
    jest.spyOn(databaseRepository, 'save').mockResolvedValueOnce(fakeUser)
    const userWithOutEmail = { ...fakeUser, email: null }
    const invalidReturn = await userService.save(userWithOutEmail)
    expect(invalidReturn).toBeNull()
  })

  it('should return null when try save with invalid name', async () => {
    jest.spyOn(databaseRepository, 'save').mockResolvedValueOnce(fakeUser)
    const userWithOutName = { ...fakeUser, name: null }
    const invalidReturn = await userService.save(userWithOutName)
    expect(invalidReturn).toBeNull()
  })

  it('sould return null if email already exist', async () => {
    jest.spyOn(userService, 'findBy').mockResolvedValueOnce(fakeUser)
    const user = await userService.save(fakeUser)
    expect(user).toBeFalsy()
  })

  it('should return a list of user', async () => {
    const mockList = Array(10).fill(fakeUser)
    jest.spyOn(databaseRepository, 'findAll').mockResolvedValueOnce(mockList)
    const users = await userService.findAll()
    expect(users).toBeTruthy()
    expect(users.length).toBe(10)
  })

  it('should return a user by email', async () => {
    jest.spyOn(databaseRepository, 'findByEmail').mockResolvedValueOnce(fakeUser)
    const user = await userService.findBy({ email: fakeUser.email })
    expect(user).toBeTruthy()
    expect(user.name).toBe(fakeUser.name)
    expect(user.email).toBe(fakeUser.email)
  })

  it('should return null with invalid email', async () => {
    databaseRepository.findByEmail.mockResolvedValueOnce(fakeUser)
    const user = await userService.findBy({ email: null })
    expect(user).toBeFalsy()
  })
})
