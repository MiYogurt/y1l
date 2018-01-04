"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command = require("common-bin");
const path = require("path");
class Y1LCommand extends Command {
    constructor(rawArgv) {
        super(rawArgv);
        this.init();
    }
    init() {
        this.usage = "Usage: y1l <command> [options]";
        this.load(path.join(__dirname, "command"));
        this.yargs.alias("V", "version");
    }
}
exports.Y1LCommand = Y1LCommand;
