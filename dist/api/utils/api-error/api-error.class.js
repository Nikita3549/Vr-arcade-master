"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    constructor(status, message, errors = []) {
        !!message ? super(message) : super();
        this.status = status;
        this.errors = errors;
    }
    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }
    static Unauthorized(message, errors = []) {
        return new ApiError(401, message, errors);
    }
    static NotFound(message, errors = []) {
        return new ApiError(404, message, errors);
    }
    static Conflict(message, errors = []) {
        return new ApiError(409, message, errors);
    }
}
exports.ApiError = ApiError;
