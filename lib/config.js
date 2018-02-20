"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _config = {
    projectPath: process.cwd(),
    status404: '404 | Page Not Found',
    status500: '500 | Internal Server Error',
    template: './src/index.template.html',
    context: req => Promise.resolve(null),
    webpackConfig: {
        base: {},
        client: {},
        server: {}
    }
};
function setConfig(config) {
    Object.assign(_config, config);
    return _config;
}
exports.setConfig = setConfig;
function getConfig() {
    return _config;
}
exports.getConfig = getConfig;
