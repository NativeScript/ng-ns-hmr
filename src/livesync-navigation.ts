import { Router } from "@angular/router";
import { onBeforeLivesync, onAfterLivesync } from "nativescript-angular/platform-common";
import { RouterExtensions } from "nativescript-angular/router";

let cachedRoute: string;
onBeforeLivesync.subscribe(moduleRef => {
    console.log("#### onBeforeLivesync");
    if (moduleRef) {
        const router = <Router>moduleRef.injector.get(Router);
        cachedRoute = router.url;
        console.log(`Caching the current route: ${cachedRoute}`);
    }
});

onAfterLivesync.subscribe(({ moduleRef, error }) => {
    console.log(`#### onAfterLivesync`);
    if (moduleRef && !error) {
        const router = <RouterExtensions>moduleRef.injector.get(RouterExtensions);
        if (router && cachedRoute) {
            console.log(`Restoring the cached route: ${cachedRoute}`);
            router.navigateByUrl(cachedRoute, { animated: false })
                .then((navigatedSuccessfully: boolean) => {
                    if (!navigatedSuccessfully) {
                        fallback(router, cachedRoute);
                        cachedRoute = null;
                    }
                })
                .catch(e => {
                    fallback(router, cachedRoute, e);
                    cachedRoute = null;
                });
        }
    }
});

function fallback(router: RouterExtensions, failedRoute, error?) {
    console.log(`Navigation to ${failedRoute} failed!`);
    if (error) {
        console.log(`Original error:\n${error}`);
    }

    console.log(`Navigating to the default route...`);
    const navigationFailedMessage = `Navigating to default route failed!`;
    router.navigateByUrl('', { animated: false })
        .then(navigatedSuccessfully => {
            if (!navigatedSuccessfully) {
                console.log(navigationFailedMessage);
            }
        })
        .catch(e => {
            console.log(navigationFailedMessage);
            console.dir(`Original error:\n${e}`);
        });
}
