import express ,{Express} from "express";
import {EnvConfig} from "../config/env/envConfig.class";
import {APIErrorMiddleware} from "./middlewares/api-error.function";
import router from "./routes";
import multer, {Multer} from "multer";
import path from "node:path";
import {Request} from "express";

export default new class App{
    private readonly PORT: number
    private readonly _app: Express
    private storage: multer.StorageEngine
    public upload: multer.Multer

    constructor() {
        this.PORT = +new EnvConfig().get("DEV_PORT")
        this._app = express()


        this.setMiddlewares()
    }
    public start(){
        try{
            this._app.listen(this.PORT,() => {
                console.log(`Server started on PORT ${this.PORT}`)
            })
        }catch (e){
            console.log((e as Error).message)
        }
    }
    private setMiddlewares(){
        this._app.disable('x-powered-by')
        this._app.use(express.urlencoded({ extended: true }))
        this._app.use(express.json())
        this._app.use('/api', router)
        this._app.use(APIErrorMiddleware) // error handler
    }
    get app(): Express {
        return this._app;
    }
}
