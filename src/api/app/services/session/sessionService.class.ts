import {ISessionService} from "./sessionService.interface";
import prisma from "../../prisma";
import {v4 as uuid} from "uuid";
import {ApiError} from "../../../utils/api-error/api-error.class";
import {Sessions} from "@prisma/client";

export class SessionService implements ISessionService{
    async createSession(from: string, to: string, userId: string, gameNames: string[], deviceModel: string[]) {
        const sessionId = uuid()
        try {
            await prisma.sessions.create({
                data: {
                    id: sessionId,
                    from: new Date(from),
                    to: new Date(to),
                    userId
                }
            })

            for (let i = 0; i < gameNames.length; i++) {
                await prisma.sessions_games.create({
                    data: {
                        sessionId,
                        gameName: gameNames[i]
                    }
                })
            }
            for (let i = 0; i < deviceModel.length; i++) {
                await prisma.sessions_devices.create({
                    data: {
                        sessionId,
                        device_model: deviceModel[i]
                    }
                })
            }
        } catch (e){
            this.deleteSession(sessionId)

            throw ApiError.BadRequest('Вы неправильно заполнили форму')
        }
    }

    async getSessionsByDate(date: string): Promise<Sessions[]> {
        const startOfDay = new Date(`${date}T00:00:00Z`);
        const endOfDay = new Date(`${date}T23:59:59Z`);

        return prisma.sessions.findMany({
            where: {
                from: {
                    gte: startOfDay,
                    lt: endOfDay
                }
            }
        })
    }

    async addGame(sessionId: string, gameName: string){
        try{
            await prisma.sessions_games.create({
                data: {
                    sessionId,
                    gameName
                }
            })
        } catch (e){
            throw ApiError.BadRequest('Неверно заполнены данные')
        }
    }

    async addDevice(sessionId: string, deviceModel: string){
        try{
            await prisma.sessions_devices.create({
                data: {
                    sessionId,
                    device_model: deviceModel
                }
            })
        } catch (e){
            throw ApiError.BadRequest('Неверно заполнены данные')
        }
    }

    async deleteSession(sessionId: string) {
        await prisma.$transaction([
            prisma.sessions_games.deleteMany({
                where:{
                    sessionId
                }
            }),
            prisma.sessions_devices.deleteMany({
                where: {
                    sessionId
                }
            }),
            prisma.sessions.deleteMany({
                where: {
                    id: sessionId
                }
            })
        ])
    }

}