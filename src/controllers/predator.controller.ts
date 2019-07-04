import { Controller, Scope, ProviderScope } from "@tsed/common";
import Repository from "../services/repository.service";
import BaseController from "./base.controller";
import { Predator } from "../models/predator";

@Scope(ProviderScope.INSTANCE)
@Controller("/predator")
export class PredatorController extends BaseController<Predator> {
  constructor(serviceRepo: Repository) {
    super(serviceRepo, Predator);
  }
}
