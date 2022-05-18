import { Encrypter } from '@/data/protocols'

export class BcryptEncrypterAdapter implements Encrypter {
  encode(encrypt: string): string {
    return encrypt
  }
}
