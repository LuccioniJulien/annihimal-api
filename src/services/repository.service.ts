import AnimalRepo from "../repository/animal.repository";
import { Service } from "@tsed/common";
import UserRepo from "../repository/user.repository";
import HabitatRepo from "../repository/habitat.repository";
import PredatorRepo from "../repository/predator.repository";
import PreyRepo from "../repository/prey.repository";
import ThreatRepo from "../repository/threat.repository";
import Group_BehaviorRepo from "../repository/group_behavior.repository";
import LifestyleRepo from "../repository/lifestyle.repository";
import DietRepo from "../repository/diet.repository";
@Service()
export default class Repository {
  private _animalRepository: AnimalRepo;
  private _userRepository: UserRepo;
  private _habitatRepository: HabitatRepo;
  private _predatorRepository: PredatorRepo;
  private _preyRepository: PreyRepo;
  private _threatRepository: ThreatRepo;
  private _group_behaviorRepo: Group_BehaviorRepo;
  private _lifestyleRepo: LifestyleRepo;
  private _dietRepo: DietRepo;

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

  get preys(): PreyRepo {
    if (this._preyRepository == null) {
      this._preyRepository = new PreyRepo();
    }
    return this._preyRepository;
  }

  get threats(): ThreatRepo {
    if (this._threatRepository == null) {
      this._threatRepository = new ThreatRepo();
    }
    return this._threatRepository;
  }

  get group_Behaviors(): Group_BehaviorRepo {
    if (this._group_behaviorRepo == null) {
      this._group_behaviorRepo = new Group_BehaviorRepo();
    }
    return this._group_behaviorRepo;
  }

  get lifestyles(): LifestyleRepo {
    if (this._lifestyleRepo == null) {
      this._lifestyleRepo = new LifestyleRepo();
    }
    return this._lifestyleRepo;
  }

  get diets(): DietRepo {
    if (this._dietRepo == null) {
      this._dietRepo = new DietRepo();
    }
    return this._dietRepo;
  }
}
