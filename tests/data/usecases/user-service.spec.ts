import { UserModel } from '@/data/models'
import { UserService } from '@/data/usecases'
import { MongoRepository } from '@/infra/databases/mongo-db-repository'

const makeSystemUnderTest = (): any => {
  const userMock: UserModel = {
    id: '123',
    name: 'any_name',
    email: 'any_email'
  }

  const mockUserService: UserService = new UserService(new MongoRepository())

  return { userMock, mockUserService }
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
    await expect(user).toBeNull()
  })
})
