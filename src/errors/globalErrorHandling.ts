// import { MiddlewareError, IMiddlewareError, Err, Request, Response, Next } from "@tsed/common";
// import { NextFunction as ExpressNext, Request as ExpressRequest, Response as ExpressResponse } from "express";
// import ErrorRequest from "./errorRequest";

// @MiddlewareError()
// export class GlobalErrorHandlerMiddleware implements IMiddlewareError {

//     use(
//         @Err() error: any,
//         @Request() request: ExpressRequest,
//         @Response() response: ExpressResponse,
//         @Next() next: ExpressNext
//     ): any {
//         if (response.headersSent) {
//             return next(error);
//         }
//         if (error instanceof ErrorRequest) {
//             response.status(error.status).send();
//             return next();
//         }
//         response.status(error.status || 500).send("Internal Error");
//         return next();
//     }
// }