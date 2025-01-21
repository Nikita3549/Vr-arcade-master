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
exports.ClientController = void 0;
const api_error_class_1 = require("../../../utils/api-error/api-error.class");
const clientService_class_1 = require("../../services/client/clientService.class");
class ClientController {
    createClient(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.firstName) || !((_b = req.body) === null || _b === void 0 ? void 0 : _b.lastName) || !((_c = req.body) === null || _c === void 0 ? void 0 : _c.patronymic)) {
                    throw api_error_class_1.ApiError.BadRequest();
                }
                const { firstName, lastName, patronymic } = req.body;
                yield new clientService_class_1.ClientService().createClient(firstName, lastName, patronymic);
                res
                    .status(201)
                    .send();
            }
            catch (e) {
                next(e);
            }
        });
    }
    getClientSessions(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.firstName) || !((_b = req.body) === null || _b === void 0 ? void 0 : _b.lastName) || !((_c = req.body) === null || _c === void 0 ? void 0 : _c.patronymic)) {
                    throw api_error_class_1.ApiError.BadRequest();
                }
                const { firstName, lastName, patronymic } = req.body;
                const clientId = yield new clientService_class_1.ClientService().getClientIdByFullName(firstName, lastName, patronymic);
                if (!clientId) {
                    throw api_error_class_1.ApiError.BadRequest('Такого клиента не существует');
                }
                const clientSessions = yield new clientService_class_1.ClientService().getClientSessions(clientId);
                res
                    .status(200)
                    .send(clientSessions);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.ClientController = ClientController;
