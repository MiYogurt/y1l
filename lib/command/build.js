"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const config_1 = require("../config");
const Command = require("common-bin");
const webpack = require("webpack");
const path = require("path");
module.exports = class BuildCommand extends Command {
    constructor(rawArgv) {
        super(rawArgv);
        this.init();
        try {
            const ssrConfigPath = path.resolve(process.cwd(), "./vue-ssr.config");
            const ssrConfig = require(ssrConfigPath);
            config_1.setConfig(ssrConfig);
        }
        catch (e) {
            console.log("you need create vue-ssr.config.js in your project path!");
            console.error(e);
            process.exit(1);
        }
    }
    init() {
        this.options = {
            env: {
                description: "choose build env",
                choices: ["all", "client", "server"],
                default: "all"
            },
            debug: {
                description: "print config",
                type: "boolean",
                default: false
            }
        };
    }
    run({ argv }) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientConfig = require("../config/webpack.client.config");
            const serverConfig = require("../config/webpack.server.config");
            if (argv.argv) {
                console.log("======== clientConfig start ======== ");
                console.dir(clientConfig);
                console.log("======== clientConfig end ======== ");
                console.log("======== serverConfig start ======== ");
                console.dir(serverConfig);
                console.log("======== serverConfig end ======== ");
            }
            switch (argv.env) {
                case "client":
                    yield this.compile(clientConfig);
                    break;
                case "server":
                    yield this.compile(serverConfig);
                    break;
                default:
                    yield this.compile(clientConfig);
                    yield this.compile(serverConfig);
                    break;
            }
        });
    }
    compile(config) {
        return new Promise((yes, no) => {
            webpack(config).run((err, stats) => {
                if (err) {
                    console.error(err);
                    no(err);
                }
                console.log(stats.toString({
                    chunks: false,
                    colors: true // 在控制台展示颜色
                }));
                yes();
            });
        });
    }
    get description() {
        return "build server or client bundle";
    }
};
