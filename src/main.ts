import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import { AppOptions } from "nativescript-angular/platform-common";

import { AppModule } from "./app/app.module";

// Optional - attach to livesync hooks and perfrom navigation
import "./livesync-navigation"

let options: AppOptions = {};

if (module["hot"]) {
    options.hmrOptions = {
        moduleTypeFactory: () => AppModule,
        livesyncCallback: (platformReboot) => {
            setTimeout(platformReboot, 0);
        },
    }

    // Path to your app module.
    // You might have to change it if your module is in a different place.
    module["hot"].accept(["./app/app.module"], () => {
        // Currently the context is needed only for application style modules.
        const moduleContext = "{}";
        global["__hmrRefresh"](moduleContext);
    });
}

// Don't forget to pass the options when creating the platform
platformNativeScriptDynamic(options).bootstrapModule(AppModule);
