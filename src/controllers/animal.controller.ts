import * as express from "express";

export function get(request: express.Request, response: express.Response) {
  response.send("{msg:hello}");
}
