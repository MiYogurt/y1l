import { Request } from 'express'
export interface Config {
    port?: number
    projectPath?: string
    status404?: string
    status500?: string
    template?: string
    context?: (req: Request) => Promise<any>
    handleError?: Function
    webpackConfig?: {
        base: object
        client: object
        server: object
    }
    faviconURL?: string
}

let _config: Config = {
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
}

export function setConfig(config: Config) {
    Object.assign(_config, config)
    return _config
}

export function getConfig() {
    return _config
}
