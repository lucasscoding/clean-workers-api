export class MongoHelper {
  public static parser<T>(data: any): T {
    const { _id, ...rest } = data
    const result: T = { ...rest, id: _id.toHexString() }
    return result
  }
}
