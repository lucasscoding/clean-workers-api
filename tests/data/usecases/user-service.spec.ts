import { UserModel } from '@/data/models'
import { UserService } from '@/data/usecases'
import { InvalidParamError } from '@/presentetion/errors'

const makeSystemUnderTest = (): any => {
  const userMock: UserModel = {
    id: '123',
    name: 'any_name',
    email: 'any_email'
  }

  const mockUserService: UserService = new UserService()

  return { userMock, mockUserService }
}

describe('UserService', () => {
  it('should load a user with the current id', async () => {
    const { userMock, mockUserService } = makeSystemUnderTest()
    const user: UserModel = await mockUserService.loadOneUser(userMock.id)
    expect(user).toBeTruthy()
    expect(user.id).toBe(userMock.id)
  })

  it('should return erro if id not informed', async () => {
    const { mockUserService } = makeSystemUnderTest()
    const invalidId = null
    await expect(() => mockUserService.loadOneUser(invalidId)).toThrow(/id/)
  })
})
