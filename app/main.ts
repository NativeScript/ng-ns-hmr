import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import { AppOptions } from "nativescript-angular/platform-common";

import { AppModule } from "./app.module";

// Optional - attach to livesync hooks and perfrom navigation
import "./livesync-navigation"

let options: AppOptions = {};
if (module['hot']) {
    const hmrUpdate = require("nativescript-dev-webpack/hmr").hmrUpdate;

    options.hmrOptions = {
        moduleTypeFactory: () => AppModule,
        livesyncCallback: (platformReboot) => {
            console.log("HMR: Sync...")
            hmrUpdate();
            setTimeout(platformReboot, 0);
        },
    }
    hmrUpdate();

    // Path to your app module. You might have to change if your module is in deferent place
    module['hot'].accept(["./app.module"])
}

// Don't forget to pass the options when creating the platform
platformNativeScriptDynamic(options).bootstrapModule(AppModule);