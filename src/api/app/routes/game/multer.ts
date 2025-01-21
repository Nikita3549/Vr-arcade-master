import multer from "multer";
import {Express, Request} from "express";
import path from "node:path";

export const upload = multer({ storage: multer.diskStorage({
        destination: (req: Request, file: Express.Multer.File, cb) => {
            cb(null, "gamesImages/");
        },
        filename: (req: Request, file: Express.Multer.File, cb) => {
            const customName = req.body.gameName;
            const extension = path.extname(file.originalname);
            cb(null, `${customName}${extension}`);
        },
    })})