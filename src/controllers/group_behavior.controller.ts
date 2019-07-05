import { Controller, Scope, ProviderScope } from "@tsed/common";
import Repository from "../services/repository.service";
import BaseController from "./base.controller";
import { Group_Behavior } from "../models/group_Behavior";

@Scope(ProviderScope.INSTANCE)
@Controller("/groupbehaviors")
export class GroupBehaviorController extends BaseController<Group_Behavior> {
  constructor(serviceRepo: Repository) {
    super(serviceRepo, Group_Behavior);
  }
}
