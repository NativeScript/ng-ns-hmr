import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app.module";

// AOT
// import { AppModuleNgFactory } from "./app.module.ngfactory";

import { AppOptions } from "nativescript-angular/platform-common";

import "./livesync-navigation"

declare const __webpack_require__;

let options: AppOptions = {};
if (module['hot']) {
    const hmrUpdate = () => {
        const update = require('nativescript-dev-webpack/hot');
        const fileSystemModule = require("tns-core-modules/file-system");
        const applicationFiles = fileSystemModule.knownFolders.currentApp();
        update(__webpack_require__['h'](), filename => applicationFiles.getFile(filename));
    }

    options.hmr = {
        // AOT
        moduleTypeFactory: () => AppModule,
        // moduleTypeFactory: () => AppModuleNgFactory,
        
        livesyncCallback: (platformReboot) => {
            console.log("livesyncCallback ")
            hmrUpdate();

            // Call platform reboot in a setTimeout because hmrUpdate is async
            setTimeout(() => {
                platformReboot();
            }, 0);
        },
    }

    // Trigger initial update
    hmrUpdate();

    // AOT
    // module['hot'].accept(["./app.module", "./app.module.ngfactory"]);
    module['hot'].accept(["./app.module"])
}

platformNativeScriptDynamic(options).bootstrapModule(AppModule);
