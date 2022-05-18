import { Encrypter } from '@/data/protocols'

export class BcryptEncrypterAdapter implements Encrypter {
  encode(encrypt: string): Promise<string> {
    return Promise.resolve(encrypt)
  }
}
