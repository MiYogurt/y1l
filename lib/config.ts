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
}

let _config: Config = {
    projectPath: process.cwd(),
    status404: "404 | Page Not Found",
    status500: "500 | Internal Server Error",
    template: "./src/index.template.html",
    context: null,
    webpackConfig: {
        base: {},
        client: {},
        server: {}
    }
};

export function setConfig(config: Config) {
    Object.assign(_config, config);
    return _config;
}

export function getConfig() {
    return _config;
}
