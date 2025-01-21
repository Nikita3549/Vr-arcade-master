"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIErrorMiddleware = APIErrorMiddleware;
const api_error_class_1 = require("../../utils/api-error/api-error.class");
function APIErrorMiddleware(err, req, res, next) {
    if (err instanceof api_error_class_1.ApiError) {
        console.log(err);
        res.status(err.status).send({
            message: err.message || '',
            errors: err.errors
        });
        return;
    }
    console.log(err);
    res.status(500).send('Техническая ошибка. Попробуйте перезапустить приложение');
}
