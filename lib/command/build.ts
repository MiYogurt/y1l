import { setConfig } from '../config'
import * as Command from 'common-bin'
import * as webpack from 'webpack'
import * as path from 'path'

export = class BuildCommand extends Command {
    constructor(rawArgv) {
        super(rawArgv)
        this.init()
        try {
            const ssrConfigPath = path.resolve(
                process.cwd(),
                './vue-ssr.config'
            )
            const ssrConfig = require(ssrConfigPath)
            setConfig(ssrConfig)
        } catch (e) {
            console.log(
                'you need create vue-ssr.config.js in your project path!'
            )
            console.error(e)
            process.exit(1)
        }
    }

    init(this: any) {
        this.options = {
            env: {
                description: 'choose build env [all/client/server]',
                choices: ['all', 'client', 'server'],
                default: 'all'
            },
            debug: {
                description: 'print config',
                type: 'boolean',
                default: false
            }
        }
    }

    async run({ argv }) {
        const clientConfig = require('../config/webpack.client.config')
        const serverConfig = require('../config/webpack.server.config')
        if (argv.debug) {
            console.log('======== clientConfig start ======== ')
            console.dir(clientConfig)
            console.log('======== clientConfig end ======== ')

            console.log('======== serverConfig start ======== ')
            console.dir(serverConfig)
            console.log('======== serverConfig end ======== ')
        }
        switch (argv.env) {
            case 'client':
                await this.compile(clientConfig)
                break
            case 'server':
                await this.compile(serverConfig)
                break
            default:
                await this.compile(clientConfig)
                await this.compile(serverConfig)
                break
        }
    }

    compile(config) {
        return new Promise((yes, no) => {
            webpack(config).run((err, stats) => {
                if (err) {
                    console.error(err)
                    no(err)
                }

                console.log(
                    stats.toString({
                        chunks: false, // 使构建过程更静默无输出
                        colors: true // 在控制台展示颜色
                    })
                )
                yes()
            })
        })
    }

    get description() {
        return 'build server or client bundle'
    }
}
