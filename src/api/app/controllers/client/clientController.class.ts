import {IClientController} from "./clientController.interface";
import e, { Request, Response, NextFunction } from "express";
import {ApiError} from "../../../utils/api-error/api-error.class";
import {ClientService} from "../../services/client/clientService.class";
import client from "../../routes/client";

export class ClientController implements IClientController{
    async createClient(req: Request, res: Response, next: NextFunction) {
        try{
            if (!req.body?.firstName || !req.body?.lastName || !req.body?.patronymic) {
                throw ApiError.BadRequest()
            }

            const {firstName, lastName, patronymic} = req.body

            await new ClientService().createClient(firstName, lastName, patronymic)

            res
                .status(201)
                .send()
        } catch (e){
            next(e)
        }
    }

    async getClientSessions(req: Request, res: Response, next: NextFunction) {
        try{
            if (!req.body?.firstName || !req.body?.lastName || !req.body?.patronymic) {
                throw ApiError.BadRequest()
            }

            const {firstName, lastName, patronymic} = req.body

            const clientId = await new ClientService().getClientIdByFullName(firstName, lastName, patronymic)

            if (!clientId) {
                throw ApiError.BadRequest('Такого клиента не существует')
            }

            const clientSessions = await new ClientService().getClientSessions(clientId)

            res
                .status(200)
                .send(clientSessions)
        } catch (e){
            next(e)
        }
    }

}