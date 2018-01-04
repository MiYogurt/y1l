export interface Bar {
    start(): void;
    finish(): void;
    error(): void;
}

export function installClient(
    createApp,
    Vue,
    bar?: Bar,
    serviceWorkerURL?: string
) {
    const { app, store, router } = createApp();
    vueMixin(Vue);
    mixState(store);
    router.onReady(onRouterReady(app, router, store, bar));
    serviceWorker(serviceWorkerURL);
}

function vueMixin(Vue) {
    Vue.mixin({
        beforeRouteUpdate(to, from, next) {
            const { asyncData } = this.$options;
            if (asyncData) {
                asyncData({
                    store: this.$store,
                    route: to
                })
                    .then(next)
                    .catch(next);
            } else {
                next();
            }
        }
    });
}

function mixState(store) {
    if ((window as any).__INITIAL_STATE__) {
        store.replaceState((window as any).__INITIAL_STATE__);
    }
}

function serviceWorker(path: string) {
    if ("https:" === location.protocol && navigator.serviceWorker) {
        navigator.serviceWorker.register(path);
    }
}

function onRouterReady(app, router, store, bar?: Bar) {
    return () => {
        router.beforeResolve((to, from, next) => {
            const matched = router.getMatchedComponents(to);
            const prevMatched = router.getMatchedComponents(from);
            let diffed = false;
            const activated = matched.filter((c, i) => {
                return diffed || (diffed = prevMatched[i] !== c);
            });
            const asyncDataHooks = activated
                .map(c => c.asyncData)
                .filter(_ => _);
            if (!asyncDataHooks.length) {
                return next();
            }
            if (bar && bar.start) bar.start();
            Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
                .then(() => {
                    if (bar && bar.finish) bar.finish();
                    next();
                })
                .catch(() => {
                    if (bar && bar.error) bar.error();
                    next();
                });
        });
        app.$mount("#app");
    };
}
