import { Encrypter } from '@/data/protocols'
import { BcryptEncrypterAdapter } from '@/infra/encrypters'
import Faker from '@faker-js/faker'
import Bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return Promise.resolve('encrypted_password')
  }
}))

describe('BcryptEncrypterAdapter', () => {
  let bcryptEncrypter: Encrypter
  let password: string

  beforeEach(() => {
    bcryptEncrypter = new BcryptEncrypterAdapter()
    password = Faker.internet.password()
  })

  it('should encrypt a string with the correct value', async () => {
    const spy = jest.spyOn(Bcrypt, 'hash')
    const result = await bcryptEncrypter.encode(password)
    expect(result).toBeTruthy()
    expect(spy).toHaveBeenCalledWith(password, 12)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should return a encrypted string', async () => {
    const result = await bcryptEncrypter.encode(password)
    expect(result).toBeTruthy()
    expect(result).toBe('encrypted_password')
  })
})
