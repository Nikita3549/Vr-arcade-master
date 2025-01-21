import {IGameController} from "./gameController.interface";
import e, {Request, Response, NextFunction} from "express";
import {ApiError} from "../../../utils/api-error/api-error.class";
import {GameService} from "../../services/game/gameService.class";
import game from "../../routes/game";
import path from "node:path";

export class GameController implements IGameController{
    async getAllGames(req: Request, res: Response, next: NextFunction) {
        try {
            const games = await new GameService().getAllGames()

            const gamesWithSessions = await new GameService().setSessions(games)
            res
                .status(200)
                .send(gamesWithSessions)
        } catch (e){
            next(e)
        }
    }

    async getGameInfo(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.params?.name){
                throw ApiError.BadRequest()
            }
            const game = await new GameService().getGameInfo(req.params.name)
            if (!game){
                throw ApiError.BadRequest()
            }

            res
                .status(200)
                .send(game)
        } catch (e){
            next(e)
        }
    }

    async createGame(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.body?.gameName){
                throw ApiError.BadRequest("Форма заполнена неправильно")
            }
            if (!req.file) {
                throw ApiError.BadRequest("Форма заполнена неправильно")
            }

            const fileName = `${req.body.gameName}${path.extname(req.file.originalname)}`

            await new GameService().saveGame(req.body.gameName, fileName)

            res
                .status(201)
                .send('Игра сохранена')

        } catch (e){
            next(e)
        }
    }

    async getImage(req: Request, res: Response, next: NextFunction){
        try {
            if(!req.params?.pathToImage){
                throw ApiError.BadRequest()
            }

            const imagePath = path.join(__dirname.replace('/dist/api/app/controllers/game', ''), "gamesImages", req.params.pathToImage);

            res.sendFile(imagePath);
        } catch (e){
            next(e)
        }
    }

}