"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const envConfig_class_1 = require("../config/env/envConfig.class");
const api_error_function_1 = require("./middlewares/api-error.function");
const routes_1 = __importDefault(require("./routes"));
exports.default = new class App {
    constructor() {
        this.PORT = +new envConfig_class_1.EnvConfig().get("DEV_PORT");
        this._app = (0, express_1.default)();
        this.setMiddlewares();
    }
    start() {
        try {
            this._app.listen(this.PORT, () => {
                console.log(`Server started on PORT ${this.PORT}`);
            });
        }
        catch (e) {
            console.log(e.message);
        }
    }
    setMiddlewares() {
        this._app.disable('x-powered-by');
        this._app.use(express_1.default.urlencoded({ extended: true }));
        this._app.use(express_1.default.json());
        this._app.use('/api', routes_1.default);
        this._app.use(api_error_function_1.APIErrorMiddleware); // error handler
    }
    get app() {
        return this._app;
    }
};
