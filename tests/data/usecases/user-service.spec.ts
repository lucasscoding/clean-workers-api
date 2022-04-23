import { UserModel } from '@/data/models'
import { UserService } from '@/data/usecases'
import { mock } from 'jest-mock-extended'
import { faker } from '@faker-js/faker'
import { UserRepository } from '../protocols'

type SystemUnderTest = {
  fakerUser: UserModel
  databaseRepository: UserRepository
  userService: UserService
}

const systemUnderTest = (): SystemUnderTest => {
  const fakerUser: UserModel = {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email()
  }
  const databaseRepository = mock<UserRepository>()
  const userService: UserService = new UserService(databaseRepository)

  return { fakerUser, userService, databaseRepository }
}

const { fakerUser, userService, databaseRepository } = systemUnderTest()

describe('UserService', () => {
  it('should load a user with the current id', async () => {
    jest.spyOn(databaseRepository, 'findById').mockResolvedValueOnce(fakerUser)
    const result = await userService.findOne(fakerUser.id)
    expect(result).toBeTruthy()
    expect(result.id).toBe(fakerUser.id)
    expect(databaseRepository.findById).toHaveBeenCalledTimes(1)
    expect(databaseRepository.findById).toHaveBeenCalledWith(fakerUser.id)
  })

  it('should return erro if id not informed', async () => {
    const invalidId = null
    jest.spyOn(databaseRepository, 'findById').mockResolvedValueOnce(fakerUser)
    const user: UserModel = await userService.findOne(invalidId)
    expect(user).toBeNull()
  })

  it('should save a anime with sucess', async () => {
    jest.spyOn(databaseRepository, 'save').mockResolvedValueOnce(fakerUser)
    const saveFromService = await userService.save({ user: fakerUser })
    expect(saveFromService).toBeTruthy()
    expect(saveFromService.name).toBe(fakerUser.name)
    expect(saveFromService.email).toBe(fakerUser.email)
  })

  it('should return null when try save with invalid email', async () => {
    jest.spyOn(databaseRepository, 'save').mockResolvedValueOnce(fakerUser)
    const userWithOutEmail = { ...fakerUser, email: null }
    const invalidReturn = await userService.save({ user: userWithOutEmail })
    expect(invalidReturn).toBeNull()
  })

  it('sould been call findByEmail with the correct param', async () => {
    jest.spyOn(userService, 'findByEmail')
    await userService.save({ user: fakerUser })
    expect(userService.findByEmail).toHaveBeenCalledTimes(1)
    expect(userService.findByEmail).toHaveBeenCalledWith(fakerUser.email)
  })

  it('should return null when try save with invalid name', async () => {
    jest.spyOn(databaseRepository, 'save').mockResolvedValueOnce(fakerUser)
    const userWithOutName = { ...fakerUser, name: null }
    const invalidReturn = await userService.save({ user: userWithOutName })
    expect(invalidReturn).toBeNull()
  })

  it('sould return null if email already exist', async () => {
    jest.spyOn(userService, 'findByEmail').mockResolvedValueOnce(fakerUser)
    const user = await userService.save({ user: fakerUser })
    expect(user).toBeFalsy()
  })

  it('should return a list of user', async () => {
    const mockList = Array(10).fill(fakerUser)
    jest.spyOn(databaseRepository, 'findAll').mockResolvedValueOnce(mockList)
    const users = await userService.findAll()
    expect(users).toBeTruthy()
    expect(users.length).toBe(10)
  })

  it('should return a user by email', async () => {
    jest.spyOn(databaseRepository, 'findByEmail').mockResolvedValueOnce(fakerUser)
    const user = await userService.findByEmail(fakerUser.email)
    expect(user).toBeTruthy()
    expect(user.name).toBe(fakerUser.name)
    expect(user.email).toBe(fakerUser.email)
  })

  it('should return null with invalid email', async () => {
    const user = await userService.findByEmail(null)
    expect(user).toBeFalsy()
  })
})
