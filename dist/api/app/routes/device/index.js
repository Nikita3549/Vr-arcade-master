"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const deviceController_class_1 = require("../../controllers/device/deviceController.class");
const router = (0, express_1.Router)();
const deviceController = new deviceController_class_1.DeviceController();
router.post('/create', deviceController.createDevice);
router.get('/:serialNumber', deviceController.getDeviceData);
router.get('/', deviceController.getAllDevices);
exports.default = router;
