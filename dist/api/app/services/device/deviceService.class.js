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
exports.DeviceService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const api_error_class_1 = require("../../../utils/api-error/api-error.class");
class DeviceService {
    createDevice(serialNumber, model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma_1.default.device.create({
                    data: {
                        serialNumber,
                        model
                    }
                });
            }
            catch (e) {
                throw api_error_class_1.ApiError.Conflict('Такое устройство уже существует в базе');
            }
        });
    }
    getDeviceData(serialNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.device.findFirst({
                where: {
                    serialNumber
                }
            });
        });
    }
    getAllDevices() {
        return prisma_1.default.device.findMany();
    }
    getSessionsByModel(deviceModel) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.sessions_devices.findMany({
                where: {
                    device_model: deviceModel
                }
            });
        });
    }
    getSessionsById(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.sessions_devices.findMany({
                where: {
                    sessionId
                }
            });
        });
    }
    setSessions(devices) {
        return __awaiter(this, void 0, void 0, function* () {
            const devicesWithSessions = [];
            for (let i = 0; i < devices.length; i++) {
                devicesWithSessions.push(Object.assign(devices[i], { sessionsAmount: (yield this.getSessionsByModel(devices[i].model)).length }));
            }
            return devicesWithSessions;
        });
    }
}
exports.DeviceService = DeviceService;
