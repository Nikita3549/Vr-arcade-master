import {IDeviceController} from "./deviceController.interface";
import { Request, Response, NextFunction} from "express";
import {ApiError} from "../../../utils/api-error/api-error.class";
import {DeviceService} from "../../services/device/deviceService.class";

export class DeviceController implements IDeviceController {
    async createDevice(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.body?.serialNumber || !req.body?.model) {
                ApiError.BadRequest()
            }
            const {serialNumber, model} = req.body

            await new DeviceService().createDevice(serialNumber, model)

            res
                .status(201)
                .send()
        } catch (e) {
            next(e)
        }
    }

    async getAllDevices(req: Request, res: Response, next: NextFunction) {
        try {
            const devices = await new DeviceService().getAllDevices()

            const devicesWithSessions = await new DeviceService().setSessions(devices)

            res
                .status(200)
                .send(devicesWithSessions)
        } catch (e) {
            next(e)
        }
    }

    async getDeviceData(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.params?.serialNumber) {
                throw ApiError.BadRequest()
            }

            const device = await new DeviceService().getDeviceData(req.params.serialNumber)

            if (!device) {
                throw ApiError.BadRequest('Нету устройства с таким серийным номером')
            }

            res
                .status(200)
                .send(device)
        } catch (e) {
            next(e)
        }
    }

}