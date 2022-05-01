import { AccountModel } from '@/data/models'
import { UserRepository } from '@/data/protocols'
import { Account } from '@/domain/models'
import { AccountRepository } from '@/infra/protocols'

export class AddAccountRepository implements AccountRepository {
  private readonly userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async save(account: AccountModel): Promise<Account> {
    const result = await this.userRepository.save(account)
    return result
  }
}
