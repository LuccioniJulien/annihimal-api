import {
  ServerLoader,
  ServerSettings,
  GlobalAcceptMimesMiddleware
} from "@tsed/common";
import "@tsed/swagger";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import * as compress from "compression";
import * as methodOverride from "method-override";
import { GlobalErrorHandlerMiddleware } from "./middlewares/globalError.middleware";
const rootDir = __dirname;

@ServerSettings({
  rootDir,
  acceptMimes: ["application/json"],
  mount: {
    "/api": "${rootDir}/controllers/*.controller.ts"
  },
  port: process.env.PORT || 4242,
  swagger: [
    {
      path: "/api-docs"
    }
  ]
})
export class Server extends ServerLoader {
  /**
   * This method let you configure the express middleware required by your application to works.
   * @returns {Server}
   */
  public $onMountingMiddlewares(): void | Promise<any> {
    this.use(GlobalAcceptMimesMiddleware)
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(
        bodyParser.urlencoded({
          extended: true
        })
      );

    return null;
  }

  $afterRoutesInit() {
    this.use(GlobalErrorHandlerMiddleware);
  }
}
