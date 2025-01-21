"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionController = void 0;
const api_error_class_1 = require("../../../utils/api-error/api-error.class");
const clientService_class_1 = require("../../services/client/clientService.class");
const sessionService_class_1 = require("../../services/session/sessionService.class");
const deviceService_class_1 = require("../../services/device/deviceService.class");
const gameService_class_1 = require("../../services/game/gameService.class");
class SessionController {
    createSession(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { from, to, firstName, lastName, patronymic, deviceModels, gameNames } = req.body;
                if (!from || !to || !firstName || !lastName || !patronymic || !gameNames || !gameNames) {
                    throw api_error_class_1.ApiError.BadRequest('');
                }
                let userId = yield new clientService_class_1.ClientService().getClientIdByFullName(firstName, lastName, patronymic);
                if (!userId) {
                    yield new clientService_class_1.ClientService().createClient(firstName, lastName, patronymic);
                }
                userId = yield new clientService_class_1.ClientService().getClientIdByFullName(firstName, lastName, patronymic);
                yield new sessionService_class_1.SessionService().createSession(from, to, userId, gameNames, deviceModels);
                res
                    .status(201)
                    .send();
            }
            catch (e) {
                next(e);
            }
        });
    }
    deleteSession(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.params.id) {
                    throw api_error_class_1.ApiError.BadRequest();
                }
                yield new sessionService_class_1.SessionService().deleteSession(req.params.id);
                res
                    .status(204)
                    .send();
            }
            catch (e) {
                next(e);
            }
        });
    }
    addGame(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                debugger;
                if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.sessionId) || !((_b = req.body) === null || _b === void 0 ? void 0 : _b.gameName)) {
                    throw api_error_class_1.ApiError.BadRequest();
                }
                debugger;
                yield new sessionService_class_1.SessionService().addGame(req.body.sessionId, req.body.gameName);
                res
                    .status(201)
                    .send();
            }
            catch (e) {
                next(e);
            }
        });
    }
    addDevice(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.sessionId) || !((_b = req.body) === null || _b === void 0 ? void 0 : _b.deviceModel)) {
                    throw api_error_class_1.ApiError.BadRequest();
                }
                yield new sessionService_class_1.SessionService().addDevice(req.body.sessionId, req.body.deviceModel);
                res
                    .status(201)
                    .send();
            }
            catch (e) {
                next(e);
            }
        });
    }
    getSessionsByDate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.params.date) {
                    throw api_error_class_1.ApiError.BadRequest();
                }
                const sessions = yield new sessionService_class_1.SessionService().getSessionsByDate(req.params.date);
                const sessionWithClient = [];
                for (let i = 0; i < sessions.length; i++) {
                    const client = yield new clientService_class_1.ClientService().getClientDataByID(sessions[i].userId);
                    if (!client) {
                        throw new Error();
                    }
                    sessionWithClient.push(Object.assign(sessions[i], { client: client }));
                }
                const sessionsWithClientWithDevicesWithGames = [];
                for (let i = 0; i < sessionWithClient.length; i++) {
                    sessionsWithClientWithDevicesWithGames.push(Object.assign(sessionWithClient[i], { devices: yield new deviceService_class_1.DeviceService().getSessionsById(sessionWithClient[i].id) }, { gameName: yield new gameService_class_1.GameService().getSessionsById(sessionWithClient[i].id) }));
                }
                res
                    .status(200)
                    .send(sessionsWithClientWithDevicesWithGames);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.SessionController = SessionController;
