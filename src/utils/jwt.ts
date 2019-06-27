import * as jwt from "jsonwebtoken";
import { $log } from "ts-log-debug";
import ErrorRequest from "../errors/ErrorRequest";
import { stringify } from "querystring";

export function jwtSign(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
}

export function verifToken(bearer) {
  if (!bearer) throw new ErrorRequest("unauthorized no Bearer", 401);
  const token: string = bearer.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded as Ipayload;
  } catch (err) {
    throw new ErrorRequest(err, 401);
  }
}

interface Ipayload {
  id: number;
  email: string;
}
