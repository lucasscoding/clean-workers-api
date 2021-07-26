import { LoadUserRepository } from './load-user-repository-protocol'
import { SaveUserRepository } from './save-user-repository-protocol'

export interface UserRepository extends LoadUserRepository, SaveUserRepository {

}
