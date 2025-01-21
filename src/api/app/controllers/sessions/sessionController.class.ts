import {ISessionController} from "./sessionController.interface";
import {Request, Response, NextFunction} from "express";
import {ApiError} from "../../../utils/api-error/api-error.class";
import {ClientService} from "../../services/client/clientService.class";
import {SessionService} from "../../services/session/sessionService.class";
import prisma from "../../prisma";
import {Client, Sessions, sessions_devices, sessions_games} from "@prisma/client";
import {DeviceService} from "../../services/device/deviceService.class";
import {GameService} from "../../services/game/gameService.class";

export class SessionController implements ISessionController{
    async createSession(req: Request, res: Response, next: NextFunction) {
        try {
            const {from, to, firstName, lastName, patronymic, deviceModels, gameNames} = req.body

            if(!from || !to || !firstName || !lastName || !patronymic || !gameNames || !gameNames){
                throw ApiError.BadRequest('')
            }
            let userId = await new ClientService().getClientIdByFullName(firstName, lastName, patronymic)
            if(!userId){
                await new ClientService().createClient(firstName, lastName, patronymic)
            }
            userId = await new ClientService().getClientIdByFullName(firstName, lastName, patronymic)

            await new SessionService().createSession(from, to, userId!, gameNames, deviceModels)

            res
                .status(201)
                .send()
        } catch (e){
            next(e)
        }
    }

    async deleteSession(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.params.id){
                throw ApiError.BadRequest()
            }

            await new SessionService().deleteSession(req.params.id)

            res
                .status(204)
                .send()
        } catch (e){
            next(e)
        }
    }

    async addGame(req: Request, res: Response, next: NextFunction){
        try {
            debugger
            if (!req.body?.sessionId || !req.body?.gameName){
                throw ApiError.BadRequest()
            }
            debugger
            await new SessionService().addGame(req.body.sessionId, req.body.gameName)

            res
                .status(201)
                .send()
        } catch (e){
            next(e)
        }
    }

    async addDevice(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.body?.sessionId || !req.body?.deviceModel){
                throw ApiError.BadRequest()
            }
            await new SessionService().addDevice(req.body.sessionId, req.body.deviceModel)

            res
                .status(201)
                .send()
        } catch (e){
            next(e)
        }
    }
    async getSessionsByDate(req: Request, res: Response, next: NextFunction) {
        try {
            if(!req.params.date){
                throw ApiError.BadRequest()
            }

            const sessions = await new SessionService().getSessionsByDate(req.params.date)

            const sessionWithClient: Array<Sessions & {client: Client }> = []

            for(let i = 0; i < sessions.length; i++){
                const client = await new ClientService().getClientDataByID(sessions[i].userId)

                if (!client){
                    throw new Error()
                }

                sessionWithClient.push(Object.assign(sessions[i], {client: client}!))
            }

            const sessionsWithClientWithDevicesWithGames: Array<Sessions & {client: Client } & { devices: sessions_devices[]} & { gameName: sessions_games[] }> = []

            for (let i = 0; i < sessionWithClient.length; i++){
                sessionsWithClientWithDevicesWithGames.push(
                    Object.assign(sessionWithClient[i],
                        { devices: await new DeviceService().getSessionsById(sessionWithClient[i].id)},
                        { gameName: await new GameService().getSessionsById(sessionWithClient[i].id)})
                )
            }
            res
                .status(200)
                .send(sessionsWithClientWithDevicesWithGames)
        } catch (e){
            next(e)
        }
    }
}