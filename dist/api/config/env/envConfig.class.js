"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvConfig = void 0;
const dotenv_1 = require("dotenv");
class EnvConfig {
    constructor() {
        const { error, parsed } = (0, dotenv_1.config)();
        if (error) {
            throw new Error('env. doesn\'t exist');
        }
        if (!parsed) {
            throw new Error('invalid env. file');
        }
        this.config = parsed;
    }
    get(key) {
        const res = this.config[key];
        if (!res) {
            throw new Error(`Key "${key}" not found in the config`);
        }
        return res;
    }
}
exports.EnvConfig = EnvConfig;
