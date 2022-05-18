import { Encrypter } from '@/data/protocols'
import Bcrypt from 'bcrypt'

export class BcryptEncrypterAdapter implements Encrypter {
  private readonly SALT: number = 12

  encode(encrypt: string): Promise<string> {
    const encoded = Bcrypt.hash(encrypt, this.SALT)
    return encoded
  }
}
