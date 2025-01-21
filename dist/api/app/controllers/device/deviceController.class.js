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
exports.DeviceController = void 0;
const api_error_class_1 = require("../../../utils/api-error/api-error.class");
const deviceService_class_1 = require("../../services/device/deviceService.class");
class DeviceController {
    createDevice(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.serialNumber) || !((_b = req.body) === null || _b === void 0 ? void 0 : _b.model)) {
                    api_error_class_1.ApiError.BadRequest();
                }
                const { serialNumber, model } = req.body;
                yield new deviceService_class_1.DeviceService().createDevice(serialNumber, model);
                res
                    .status(201)
                    .send();
            }
            catch (e) {
                next(e);
            }
        });
    }
    getAllDevices(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const devices = yield new deviceService_class_1.DeviceService().getAllDevices();
                const devicesWithSessions = yield new deviceService_class_1.DeviceService().setSessions(devices);
                res
                    .status(200)
                    .send(devicesWithSessions);
            }
            catch (e) {
                next(e);
            }
        });
    }
    getDeviceData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (!((_a = req.params) === null || _a === void 0 ? void 0 : _a.serialNumber)) {
                    throw api_error_class_1.ApiError.BadRequest();
                }
                const device = yield new deviceService_class_1.DeviceService().getDeviceData(req.params.serialNumber);
                if (!device) {
                    throw api_error_class_1.ApiError.BadRequest('Нету устройства с таким серийным номером');
                }
                res
                    .status(200)
                    .send(device);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.DeviceController = DeviceController;
