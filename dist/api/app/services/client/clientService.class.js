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
exports.ClientService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const api_error_class_1 = require("../../../utils/api-error/api-error.class");
class ClientService {
    createClient(firstName, lastName, patronymic) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma_1.default.client.create({
                    data: {
                        firstName,
                        lastName,
                        patronymic
                    }
                });
            }
            catch (e) {
                throw api_error_class_1.ApiError.Conflict('Клиент с таким ФИО уже существует');
            }
        });
    }
    getClientIdByFullName(firstName, lastName, patronymic) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield prisma_1.default.client.findFirst({
                where: {
                    firstName,
                    lastName,
                    patronymic
                },
                select: {
                    id: true
                }
            });
            return res ? res.id : null;
        });
    }
    getClientDataByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.client.findFirst({
                where: {
                    id
                }
            });
        });
    }
    getClientSessions(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.sessions.findMany({
                where: {
                    userId: clientId
                }
            });
        });
    }
}
exports.ClientService = ClientService;
