import { Base } from "./base.repository";
import { Group_Behavior } from "../models/group_Behavior";

export default class Group_BehaviorRepo extends Base<Group_Behavior> {
  constructor() {
    super(Group_Behavior);
  }
}
