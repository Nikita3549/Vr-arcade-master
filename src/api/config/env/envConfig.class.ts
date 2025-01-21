import {IEnvConfig} from "./envConifg.interface";
import {config, DotenvParseOutput} from "dotenv";

export class EnvConfig implements IEnvConfig{
    config: DotenvParseOutput

    constructor() {
        const { error, parsed } = config()

        if (error){
            throw new Error('env. doesn\'t exist')
        }
        if (!parsed){
            throw new Error('invalid env. file')
        }

        this.config = parsed
    }
    public get(key: string): string{
        const res: string = this.config[key]

        if (!res){
            throw new Error(`Key "${key}" not found in the config`)
        }

        return res
    }
}