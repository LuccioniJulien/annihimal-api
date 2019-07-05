import { Base } from "./base.repository";
import { Threat } from "../models/threat";

export default class ThreatRepo extends Base<Threat> {
  constructor() {
    super(Threat);
  }
}
