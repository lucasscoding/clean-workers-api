import { UserModel } from '@/data/models'
import { UserService } from '@/data/usecases'

const makeSystemUnderTest = (): any => {
  const userMock: UserModel = {
    id: '123',
    name: 'any_name',
    email: 'any_email'
  }
  return { userMock }
}

describe('UserService', () => {
  it('should load a user', () => {
    const { userMock } = makeSystemUnderTest()
    const userService = new UserService()
    const user: UserModel = userService.loadOneUser(userMock.id)
    expect(user).toBeTruthy()
    expect(user.id).toBe(userMock.id)
  })
})
