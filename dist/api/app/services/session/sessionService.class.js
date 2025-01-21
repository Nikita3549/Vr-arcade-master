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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const uuid_1 = require("uuid");
const api_error_class_1 = require("../../../utils/api-error/api-error.class");
class SessionService {
    createSession(from, to, userId, gameNames, deviceModel) {
        return __awaiter(this, void 0, void 0, function* () {
            const sessionId = (0, uuid_1.v4)();
            try {
                yield prisma_1.default.sessions.create({
                    data: {
                        id: sessionId,
                        from: new Date(from),
                        to: new Date(to),
                        userId
                    }
                });
                for (let i = 0; i < gameNames.length; i++) {
                    yield prisma_1.default.sessions_games.create({
                        data: {
                            sessionId,
                            gameName: gameNames[i]
                        }
                    });
                }
                for (let i = 0; i < deviceModel.length; i++) {
                    yield prisma_1.default.sessions_devices.create({
                        data: {
                            sessionId,
                            device_model: deviceModel[i]
                        }
                    });
                }
            }
            catch (e) {
                this.deleteSession(sessionId);
                throw api_error_class_1.ApiError.BadRequest('Вы неправильно заполнили форму');
            }
        });
    }
    getSessionsByDate(date) {
        return __awaiter(this, void 0, void 0, function* () {
            const startOfDay = new Date(`${date}T00:00:00Z`);
            const endOfDay = new Date(`${date}T23:59:59Z`);
            return prisma_1.default.sessions.findMany({
                where: {
                    from: {
                        gte: startOfDay,
                        lt: endOfDay
                    }
                }
            });
        });
    }
    addGame(sessionId, gameName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma_1.default.sessions_games.create({
                    data: {
                        sessionId,
                        gameName
                    }
                });
            }
            catch (e) {
                throw api_error_class_1.ApiError.BadRequest('Неверно заполнены данные');
            }
        });
    }
    addDevice(sessionId, deviceModel) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma_1.default.sessions_devices.create({
                    data: {
                        sessionId,
                        device_model: deviceModel
                    }
                });
            }
            catch (e) {
                throw api_error_class_1.ApiError.BadRequest('Неверно заполнены данные');
            }
        });
    }
    deleteSession(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_1.default.$transaction([
                prisma_1.default.sessions_games.deleteMany({
                    where: {
                        sessionId
                    }
                }),
                prisma_1.default.sessions_devices.deleteMany({
                    where: {
                        sessionId
                    }
                }),
                prisma_1.default.sessions.deleteMany({
                    where: {
                        id: sessionId
                    }
                })
            ]);
        });
    }
}
exports.SessionService = SessionService;
