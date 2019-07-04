import AnimalRepo from "../repository/animal.repository";
import { Service } from "@tsed/common";
import UserRepo from "../repository/user.repository";
import HabitatRepo from "../repository/habitat.repository";
import PredatorRepo from "../repository/predator.repository";
@Service()
export default class Repository {
  private _animalRepository: AnimalRepo;
  private _userRepository: UserRepo;
  private _habitatRepository: HabitatRepo;
  private _predatorRepository: PredatorRepo;
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

  get habitats(): HabitatRepo {
    if (this._habitatRepository == null) {
      this._habitatRepository = new HabitatRepo();
    }
    return this._habitatRepository;
  }

  get predators(): PredatorRepo {
    if (this._predatorRepository == null) {
      this._predatorRepository = new PredatorRepo();
    }
    return this._predatorRepository;
  }
}
