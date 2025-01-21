import {Request, Response, NextFunction} from "express";

export interface IDeviceController{
    createDevice(req: Request, res: Response, next: NextFunction): void
    getAllDevices(req: Request, res: Response, next: NextFunction): void
    getDeviceData(req: Request, res: Response, next: NextFunction): void
}