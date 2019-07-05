import {
  Controller,
  Scope,
  ProviderScope,
} from "@tsed/common";
import Repository from "../services/repository.service";
import BaseController from "./base.controller";
import { Habitat } from "../models/habitat";

@Scope(ProviderScope.INSTANCE)
@Controller("/habitats")
export class HabitatController extends BaseController<Habitat> {
  constructor(serviceRepo: Repository) {
    super(serviceRepo, Habitat);
  }
}
