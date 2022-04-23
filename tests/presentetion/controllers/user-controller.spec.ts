import { UserModel } from '@/data/models'
import { LoadUserProtocol, SaveUserProtocol } from '@/domain/protocols'
import { UserController } from '@/presentetion/controllers'
import { faker } from '@faker-js/faker'
import { mock } from 'jest-mock-extended'

describe('User Controller', () => {
  let fakeUser: UserModel
  let userController: UserController
  let loadUserService: LoadUserProtocol
  let saveUserService: SaveUserProtocol

  beforeEach(() => {
    fakeUser = { id: faker.datatype.uuid(), name: faker.name.findName(), email: faker.internet.email() }
    loadUserService = mock<LoadUserProtocol>()
    saveUserService = mock<SaveUserProtocol>()
    userController = new UserController(loadUserService, saveUserService)
  })

  it('should return 200 with correct id', async () => {
    jest.spyOn(loadUserService, 'findOne').mockResolvedValueOnce(fakeUser)
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
    jest.spyOn(loadUserService, 'findByEmail').mockResolvedValueOnce(fakeUser)
    const httpResponse = await userController.findByEmail(fakeUser.email)
    expect(httpResponse).toBeTruthy()
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toMatchObject(fakeUser)
  })
})
