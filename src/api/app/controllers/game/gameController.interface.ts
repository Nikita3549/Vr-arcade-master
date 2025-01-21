import {Request, Response, NextFunction} from "express";

export interface IGameController{
    getAllGames(req: Request, res: Response, next: NextFunction): void
    getGameInfo(req: Request, res: Response, next: NextFunction): void
    createGame(req: Request, res: Response, next: NextFunction): void
    getImage(req: Request, res: Response, next: NextFunction): void
}