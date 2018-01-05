# y1l

让 Vue SSR 更加简单，vue-hackernews 的例子请看我的 [y1l-example](https://github.com/MiYogurt/y1l-vue-hackernews) 仓库， 视频教程请看 [视频](https://nodelover.me/status/video/13)

从 vue-hackernews 提取出来的一些公共代码。

### 支持的配置项

```ts
export interface Config {
    port?: number;
    projectPath?: string;
    status404?: string;
    status500?: string;
    template?: string; // html 模板的位置
    context?: object; // 模板里面可以访问的值
    handleError?: Function;
    webpackConfig?: {
        base: object;
        client: object;
        server: object;
    };
    serviceWorkerConfig?: object; 
    faviconURL?: string; // 图标的地址 如 ./public/logo-48.png
}
```

