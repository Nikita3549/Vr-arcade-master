import {Request, Response, NextFunction} from "express";

export interface IClientController{
    createClient(req: Request, res: Response, next: NextFunction): void
    getClientSessions(req: Request, res: Response, next: NextFunction): void
}