import { UserModel } from '@/data/models'
import { ILoadUser, ISaveUser } from '@/domain/protocols'
import { UserController } from '@/presentetion/controllers'
import { faker } from '@faker-js/faker'
import { mock } from 'jest-mock-extended'
import { InvalidParamError } from '@/presentetion/errors'

describe('User Controller', () => {
  let fakeUser: UserModel
  let userController: UserController
  let loadUserService: ILoadUser
  let saveUserService: ISaveUser

  beforeEach(() => {
    fakeUser = { id: faker.datatype.uuid(), name: faker.name.findName(), email: faker.internet.email(), password: faker.internet.password() }
    loadUserService = mock<ILoadUser>()
    saveUserService = mock<ISaveUser>()
    userController = new UserController(loadUserService, saveUserService)
  })

  it('should return 200 with correct id', async () => {
    jest.spyOn(loadUserService, 'findBy').mockResolvedValueOnce(fakeUser)
    const httpResponse = await userController.find(fakeUser.id)
    expect(httpResponse).toBeTruthy()
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toMatchObject({ id: fakeUser.id })
  })

  it('should return 201 when create a user', async () => {
    jest.spyOn(saveUserService, 'save').mockResolvedValueOnce(fakeUser)
    const httpResponse = await userController.save({ ...fakeUser, id: null })
    expect(httpResponse).toBeTruthy()
    expect(httpResponse.statusCode).toBe(201)
    expect(httpResponse.body).toMatchObject(fakeUser)
  })

  it('should return 200 when find a user list', async () => {
    jest.spyOn(loadUserService, 'findAll').mockResolvedValueOnce([fakeUser])
    const httpResponse = await userController.findAll()
    expect(httpResponse).toBeTruthy()
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toMatchObject([fakeUser])
  })

  it('should return 200 when find a user by email', async () => {
    jest.spyOn(loadUserService, 'findBy').mockResolvedValueOnce(fakeUser)
    const httpResponse = await userController.findByEmail(fakeUser.email)
    expect(httpResponse).toBeTruthy()
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toMatchObject(fakeUser)
  })

  it('should return 400 if name is missing', async () => {
    const result = await userController.save({ ...fakeUser, name: null })
    expect(result).toBeTruthy()
    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual(new InvalidParamError('name'))
  })

  it('should return 400 if email is missing', async () => {
    const result = await userController.save({ ...fakeUser, email: null })
    expect(result).toBeTruthy()
    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual(new InvalidParamError('email'))
  })

  it('should return 400 if password is missing', async () => {
    const result = await userController.save({ ...fakeUser, password: null })
    expect(result).toBeTruthy()
    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual(new InvalidParamError('password'))
  })
})
