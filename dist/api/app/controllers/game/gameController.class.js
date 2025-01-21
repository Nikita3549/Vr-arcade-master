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
exports.GameController = void 0;
const api_error_class_1 = require("../../../utils/api-error/api-error.class");
const gameService_class_1 = require("../../services/game/gameService.class");
const node_path_1 = __importDefault(require("node:path"));
class GameController {
    getAllGames(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const games = yield new gameService_class_1.GameService().getAllGames();
                const gamesWithSessions = yield new gameService_class_1.GameService().setSessions(games);
                res
                    .status(200)
                    .send(gamesWithSessions);
            }
            catch (e) {
                next(e);
            }
        });
    }
    getGameInfo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (!((_a = req.params) === null || _a === void 0 ? void 0 : _a.name)) {
                    throw api_error_class_1.ApiError.BadRequest();
                }
                const game = yield new gameService_class_1.GameService().getGameInfo(req.params.name);
                if (!game) {
                    throw api_error_class_1.ApiError.BadRequest();
                }
                res
                    .status(200)
                    .send(game);
            }
            catch (e) {
                next(e);
            }
        });
    }
    createGame(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.gameName)) {
                    throw api_error_class_1.ApiError.BadRequest("Форма заполнена неправильно");
                }
                if (!req.file) {
                    throw api_error_class_1.ApiError.BadRequest("Форма заполнена неправильно");
                }
                const fileName = `${req.body.gameName}${node_path_1.default.extname(req.file.originalname)}`;
                yield new gameService_class_1.GameService().saveGame(req.body.gameName, fileName);
                res
                    .status(201)
                    .send('Игра сохранена');
            }
            catch (e) {
                next(e);
            }
        });
    }
    getImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (!((_a = req.params) === null || _a === void 0 ? void 0 : _a.pathToImage)) {
                    throw api_error_class_1.ApiError.BadRequest();
                }
                const imagePath = node_path_1.default.join(__dirname.replace('/dist/api/app/controllers/game', ''), "gamesImages", req.params.pathToImage);
                res.sendFile(imagePath);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.GameController = GameController;
