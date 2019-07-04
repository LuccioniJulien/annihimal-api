import {
  NextFunction as ExpressNext,
  Request as ExpressRequest,
  Response as ExpressResponse
} from "express";
import {
  MiddlewareError,
  IMiddlewareError,
  Request,
  Response,
  Next,
  Err
} from "@tsed/common";
import { Exception } from "ts-httpexceptions";
import { $log } from "ts-log-debug";
import ErrorRequest from "../errors/ErrorRequest";

@MiddlewareError()
export class GlobalErrorHandlerMiddleware implements IMiddlewareError {
  use(
    @Err() error: any,
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
    @Next() next: ExpressNext
  ): any {
    if (response.headersSent) {
      return next(error);
    }

    const toArr = (errors: string) => errors.split(/\n/gi);

    if (error instanceof ErrorRequest || error instanceof Exception) {
      $log.error("" + error);
      response.status(error.status).send({ errors: toArr(error.message) });
      return next();
    }

    if (typeof error === "string") {
      response.status(404).send();
      return next();
    }

    $log.error("" + error);
    response.status(error.status || 500).send("Internal Error");

    return next();
  }
}
