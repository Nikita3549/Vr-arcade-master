import {Sessions} from "@prisma/client";

export interface ISessionService {
    createSession(from: string, to: string, userId: string, gameNames: string[], deviceModel: string[]): void
    getSessionsByDate(date: string): Promise<Sessions[]>
    addGame(sessionId: string, gameName: string): void
    addDevice(sessionId: string, deviceModel: string): void
    deleteSession(sessionId: string): void
}