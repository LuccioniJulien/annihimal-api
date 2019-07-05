import { Base } from "./base.repository";
import { Diet } from "../models/diet";

export default class DietRepo extends Base<Diet> {
  constructor() {
    super(Diet);
  }
}
