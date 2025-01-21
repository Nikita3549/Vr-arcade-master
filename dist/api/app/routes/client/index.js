"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientController_class_1 = require("../../controllers/client/clientController.class");
const router = (0, express_1.Router)();
const clientController = new clientController_class_1.ClientController();
router.post('/create', clientController.createClient);
router.post('/sessions/', clientController.getClientSessions);
exports.default = router;
