
export interface Encrypter {
  encode(encrypt: string): Promise<string>
}
