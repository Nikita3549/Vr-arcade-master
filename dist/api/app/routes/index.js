"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = __importDefault(require("./client"));
const game_1 = __importDefault(require("./game"));
const session_1 = __importDefault(require("./session"));
const device_1 = __importDefault(require("./device"));
const router = (0, express_1.Router)();
router.use('/client', client_1.default);
router.use('/game', game_1.default);
router.use('/session', session_1.default);
router.use('/device', device_1.default);
exports.default = router;
