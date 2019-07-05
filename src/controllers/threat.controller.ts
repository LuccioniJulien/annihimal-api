import { Controller, Scope, ProviderScope } from "@tsed/common";
import Repository from "../services/repository.service";
import BaseController from "./base.controller";
import { Threat } from "../models/threat";

@Scope(ProviderScope.INSTANCE)
@Controller("/threats")
export class ThreatController extends BaseController<Threat> {
  constructor(serviceRepo: Repository) {
    super(serviceRepo, Threat);
  }
}
