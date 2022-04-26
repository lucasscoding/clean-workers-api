import { UserModel } from '@/data/models'
import { UserService } from '@/data/usecases'
import { mock } from 'jest-mock-extended'
import { faker } from '@faker-js/faker'
import { UserRepository } from '../protocols'

describe('UserService', () => {
  let databaseRepository: UserRepository
  let userService: UserService
  let fakeUser: UserModel

  beforeEach(() => {
    databaseRepository = mock<UserRepository>()
    fakeUser = { id: faker.datatype.uuid(), name: faker.name.findName(), email: faker.internet.email() }
    userService = new UserService(databaseRepository)
  })

  it('should load a user with the current id', async () => {
    jest.spyOn(databaseRepository, 'findById').mockResolvedValueOnce(fakeUser)
    const result = await userService.findOne({ id: fakeUser.id })
    expect(result).toBeTruthy()
    expect(result.id).toBe(fakeUser.id)
    expect(databaseRepository.findById).toHaveBeenCalledTimes(1)
    expect(databaseRepository.findById).toHaveBeenCalledWith(fakeUser.id)
  })

  it('should return erro if id not informed', async () => {
    const invalidId = null
    jest.spyOn(databaseRepository, 'findById').mockResolvedValueOnce(fakeUser)
    const user: UserModel = await userService.findOne({ id: invalidId })
    expect(user).toBeNull()
  })

  it('should save a anime with sucess', async () => {
    jest.spyOn(databaseRepository, 'save').mockResolvedValueOnce(fakeUser)
    const saveFromService = await userService.save({ user: fakeUser })
    expect(saveFromService).toBeTruthy()
    expect(saveFromService.name).toBe(fakeUser.name)
    expect(saveFromService.email).toBe(fakeUser.email)
  })

  it('should return null when try save with invalid email', async () => {
    jest.spyOn(databaseRepository, 'save').mockResolvedValueOnce(fakeUser)
    const userWithOutEmail = { ...fakeUser, email: null }
    const invalidReturn = await userService.save({ user: userWithOutEmail })
    expect(invalidReturn).toBeNull()
  })

  it('sould been call findByEmail with the correct param', async () => {
    jest.spyOn(userService, 'findByEmail')
    await userService.save({ user: fakeUser })
    expect(userService.findByEmail).toHaveBeenCalledTimes(1)
    expect(userService.findByEmail).toHaveBeenCalledWith({ email: fakeUser.email })
  })

  it('should return null when try save with invalid name', async () => {
    jest.spyOn(databaseRepository, 'save').mockResolvedValueOnce(fakeUser)
    const userWithOutName = { ...fakeUser, name: null }
    const invalidReturn = await userService.save({ user: userWithOutName })
    expect(invalidReturn).toBeNull()
  })

  it('sould return null if email already exist', async () => {
    jest.spyOn(userService, 'findByEmail').mockResolvedValueOnce(fakeUser)
    const user = await userService.save({ user: fakeUser })
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
    const user = await userService.findByEmail({ email: fakeUser.email })
    expect(user).toBeTruthy()
    expect(user.name).toBe(fakeUser.name)
    expect(user.email).toBe(fakeUser.email)
  })

  it('should return null with invalid email', async () => {
    const user = await userService.findByEmail({ email: null })
    expect(user).toBeFalsy()
  })
})
