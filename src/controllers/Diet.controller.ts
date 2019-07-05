import { Controller, Scope, ProviderScope } from "@tsed/common";
import Repository from "../services/repository.service";
import BaseController from "./base.controller";
import { Diet } from "../models/diet";

@Scope(ProviderScope.INSTANCE)
@Controller("/diets")
export class DietController extends BaseController<Diet> {
  constructor(serviceRepo: Repository) {
    super(serviceRepo, Diet);
  }
}
