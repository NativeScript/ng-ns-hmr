import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app.module";

const options = module['hot'] ? {
    hmrModuleFactory: () => require("./app.module").AppModule
}: {};

const bootstrap = () => platformNativeScriptDynamic(options).bootstrapModule(AppModule);

declare const __webpack_require__;
function hmrBootstrap() {
    bootstrap();

    global['__livesyncBackup'] = global.__onLiveSyncCore;
    global.__onLiveSyncCore = function() {
        const update = require('nativescript-dev-webpack/hot');
        const fileSystemModule = require("tns-core-modules/file-system");
        const applicationFiles = fileSystemModule.knownFolders.currentApp();
        update(__webpack_require__['h'](), filename => applicationFiles.getFile(filename));
    }
    global.__onLiveSyncCore();
}

if (module['hot']) {
    hmrBootstrap();
} else {
    bootstrap();
}
