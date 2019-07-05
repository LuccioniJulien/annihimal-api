import { Base } from "./base.repository";
import { Class } from "../models/class";

export default class ClassRepo extends Base<Class> {
  constructor() {
    super(Class);
  }
}
