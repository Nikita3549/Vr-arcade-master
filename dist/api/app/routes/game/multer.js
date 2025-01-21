"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const node_path_1 = __importDefault(require("node:path"));
exports.upload = (0, multer_1.default)({ storage: multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "gamesImages/");
        },
        filename: (req, file, cb) => {
            const customName = req.body.gameName;
            const extension = node_path_1.default.extname(file.originalname);
            cb(null, `${customName}${extension}`);
        },
    }) });
