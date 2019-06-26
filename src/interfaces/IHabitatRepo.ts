import { Habitat } from "../models/habitat";

export default interface IHabitatRepo {
    get(id:number): Promise<Habitat>;
}
