import AnimalRepo from "../repository/animal.repository";
import { Service } from "@tsed/common";
import UserRepo from "../repository/user.repository";
@Service()
export default class Repository {
  private _animalRepository: AnimalRepo;
  private _userRepository: UserRepo;

  get animals(): AnimalRepo {
    if (this._animalRepository == null) {
      this._animalRepository = new AnimalRepo();
    }
    return this._animalRepository;
  }

  get users(): UserRepo {
    if (this._userRepository == null) {
      this._userRepository = new UserRepo();
    }
    return this._userRepository;
  }
}
