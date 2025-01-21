import {IClientService} from "./clientService.interface";
import prisma from "../../prisma";
import {ApiError} from "../../../utils/api-error/api-error.class";
import {Client, Sessions} from "@prisma/client";

export class ClientService implements IClientService{
    async createClient(firstName: string, lastName: string, patronymic: string){
        try{
            await prisma.client.create({
                data: {
                    firstName,
                    lastName,
                    patronymic
                }
            })
        } catch (e){
            throw ApiError.Conflict('Клиент с таким ФИО уже существует')
        }
    }

    async getClientIdByFullName(firstName: string, lastName: string, patronymic: string): Promise<string | null> {
        const res = await prisma.client.findFirst({
            where:{
                firstName,
                lastName,
                patronymic
            },
            select: {
                id: true
            }
        })
        return res ? res.id : null
    }

    async getClientDataByID(id: string): Promise<Client | null> {
        return prisma.client.findFirst({
            where: {
                id
            }
        })
    }

    async getClientSessions(clientId:string): Promise<Sessions[]> {
        return prisma.sessions.findMany({
            where:{
                userId: clientId
            }
        })
    }

}