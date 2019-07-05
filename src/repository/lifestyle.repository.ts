import { Base } from "./base.repository";
import { Lifestyle } from "../models/Lifestyle";

export default class LifestyleRepo extends Base<Lifestyle> {
  constructor() {
    super(Lifestyle);
  }
}
