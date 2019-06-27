// import * as Passport from "passport";
// import { Strategy } from "passport-local";
// import {
//   Service,
//   BeforeRoutesInit,
//   AfterRoutesInit,
//   ServerSettingsService,
//   Inject,
//   ExpressApplication
// } from "@tsed/common";

// @Service()
// export class PassportLocalService implements BeforeRoutesInit, AfterRoutesInit {
//   constructor(
//     private serverSettings: ServerSettingsService,
//     @Inject(ExpressApplication) private expressApplication: ExpressApplication
//   ) {}

//   $beforeRoutesInit() {
//     const options: any = this.serverSettings.get("passport") || ({} as any);
//     const { userProperty, pauseStream } = options; // options stored with ServerSettings

//     this.expressApplication.use(Passport.initialize({ userProperty }));
//     this.expressApplication.use(Passport.session({ pauseStream }));
//   }

//   $afterRoutesInit() {
//     this.initializeSignup();
//     this.initializeLogin();
//   }
// }
