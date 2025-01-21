import {Request, Response, NextFunction} from "express";

export interface ISessionController{
    createSession(req: Request, res: Response, next: NextFunction): void
    deleteSession(req: Request, res: Response, next: NextFunction): void
    getSessionsByDate(req: Request, res: Response, next: NextFunction): void
    addGame(req: Request, res: Response, next: NextFunction): void
    addDevice(req: Request, res: Response, next: NextFunction): void
}