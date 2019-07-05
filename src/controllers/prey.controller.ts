import { Controller, Scope, ProviderScope } from "@tsed/common";
import Repository from "../services/repository.service";
import BaseController from "./base.controller";
import { Prey } from "../models/prey";

@Scope(ProviderScope.INSTANCE)
@Controller("/preys")
export class PreyController extends BaseController<Prey> {
  constructor(serviceRepo: Repository) {
    super(serviceRepo, Prey);
  }
}
