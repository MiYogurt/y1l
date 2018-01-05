# y1l

让 Vue SSR 更加简单，vue-hackernews 的例子请看我的 [y1l-example](https://github.com/MiYogurt/y1l-vue-hackernews) 仓库

从 vue-hackernews 提取出来的一些公共代码。

```ts
export interface Config {
    port?: number;
    projectPath?: string;
    status404?: string;
    status500?: string;
    template?: string;
    context?: object;
    handleError?: Function;
    webpackConfig?: {
        base: object;
        client: object;
        server: object;
    };
    serviceWorkerConfig?: object;
    faviconURL?: string;
}
```

## how to use

add some compile dependencies to package.json

```json
    "dependencies": {
        "babel-polyfill": "^6.26.0",
        "cross-env": "^5.1.3",
        "es6-promise": "^4.2.2",
        "stylus-loader": "^3.0.1",
        "vue": "^2.5.13",
        "vue-router": "^3.0.1",
        "vuex": "^3.0.1",
        "vuex-router-sync": "^5.0.0"
    },
    "devDependencies": {
        "autoprefixer": "^7.2.4",
        "babel-core": "^6.26.0",
        "babel-loader": "^7.1.2",
        "babel-plugin-syntax-dynamic-import": "^6.18.0",
        "babel-preset-env": "^1.6.1",
        "css-loader": "^0.28.7",
        "file-loader": "^1.1.5",
        "stylus": "^0.54.5",
        "url-loader": "^0.6.2",
        "vue-loader": "^13.5.0",
        "vue-style-loader": "^3.0.3",
        "vue-template-compiler": "^2.5.3",
        "webpack": "^3.10.0",
        "webpack-hot-middleware": "^2.21.0",
        "webpack-node-externals": "^1.6.0"
    }
```

```bash
npm i -S y1l y1l-server y1l-client
```

create vue-ssr.config.js

it's look like this

```js
module.exports.default = module.exports = {
    projectPath: __dirname,
    context: {
        title: "Vue HN 2.0"
    },
    webpackConfig: {
        client: {
            resolve: {
                alias: {
                    "create-api": "./create-api-client.js"
                }
            }
        },
        server: {
            resolve: {
                alias: {
                    "create-api": "./create-api-server.js"
                }
            }
        }
    },
    serviceWorkerConfig: {
        cacheId: "vue-hn",
        filename: "service-worker.js",
        minify: true,
        dontCacheBustUrlsMatching: /./,
        staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
        runtimeCaching: [
            {
                urlPattern: "/",
                handler: "networkFirst"
            },
            {
                urlPattern: /\/(top|new|show|ask|jobs)/,
                handler: "networkFirst"
            },
            {
                urlPattern: "/item/:id",
                handler: "networkFirst"
            },
            {
                urlPattern: "/user/:id",
                handler: "networkFirst"
            }
        ]
    }
};
```

create src/entry-client.js

```js
import Vue from "vue";
import "es6-promise/auto";
import { createApp } from "./app";
import ProgressBar from "./components/ProgressBar.vue";

import installClient from "y1l-client";

// global progress bar
const bar = (Vue.prototype.$bar = new Vue(ProgressBar).$mount());
document.body.appendChild(bar.$el);

installClient(createApp, Vue, bar, "/service-worker.js");
```

create src/entry-server.js

```js
import { createApp } from "./app";

import installServer from "y1l-server";

export default installServer(createApp);
```
