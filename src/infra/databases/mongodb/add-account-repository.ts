import { AccountRepository } from '@/data/protocols'

export class AccountMongoDatabase implements AccountRepository {
  async save(account: AccountRepository.Params): Promise<AccountRepository.Result> {
    return { id: 'teste', name: null, ...account }
  }
}
