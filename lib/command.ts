import * as Command from "common-bin";

import pkg from "../package.json";

import * as path from "path";

export class Y1LCommand extends Command {
    constructor(rawArgv) {
        super(rawArgv);
        this.init();
    }

    init(this: any) {
        this.usage = "Usage: y1l <command> [options]";

        this.load(path.join(__dirname, "command"));

        this.yargs.alias("V", "version");
    }
}
