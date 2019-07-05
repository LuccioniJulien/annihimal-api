import { Base } from "./base.repository";
import { Class } from "../models/Class";

export default class ClassRepo extends Base<Class> {
  constructor() {
    super(Class);
  }
}
