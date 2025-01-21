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
exports.GameService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const api_error_class_1 = require("../../../utils/api-error/api-error.class");
const node_path_1 = __importDefault(require("node:path"));
class GameService {
    saveGame(name, fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(__dirname);
            try {
                yield prisma_1.default.game.create({
                    data: {
                        name: name,
                        pathToImage: node_path_1.default.join(__dirname.replace('dist/api/app/services/game', ''), `gamesImages/${fileName}`)
                    }
                });
            }
            catch (e) {
                throw api_error_class_1.ApiError.Conflict('Такая игра уже существует');
            }
        });
    }
    getAllGames() {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.game.findMany();
        });
    }
    getGameInfo(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.game.findFirst({
                where: {
                    name: {
                        contains: name,
                        mode: 'insensitive'
                    }
                }
            });
        });
    }
    getSessionsAmount(game) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.sessions_games.count({
                where: {
                    gameName: game.name
                }
            });
        });
    }
    getSessionsById(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.sessions_games.findMany({
                where: {
                    sessionId
                }
            });
        });
    }
    setSessions(games) {
        return __awaiter(this, void 0, void 0, function* () {
            const gamesWithSessions = [];
            for (let i = 0; i < games.length; i++) {
                gamesWithSessions.push(Object.assign(games[i], { sessionsAmount: yield this.getSessionsAmount(games[i]) }));
            }
            return gamesWithSessions;
        });
    }
}
exports.GameService = GameService;
