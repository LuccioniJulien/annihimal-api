import { Controller, Scope, ProviderScope } from "@tsed/common";
import Repository from "../services/repository.service";
import BaseController from "./base.controller";
import { Lifestyle } from "../models/lifestyle";

@Scope(ProviderScope.INSTANCE)
@Controller("/lifestyle")
export class LifestyleController extends BaseController<Lifestyle> {
  constructor(serviceRepo: Repository) {
    super(serviceRepo, Lifestyle);
  }
}
