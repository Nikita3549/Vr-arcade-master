import {IGameService} from "./gameService.interface";
import prisma from "../../prisma";
import {ApiError} from "../../../utils/api-error/api-error.class";
import {Game, sessions_games} from "@prisma/client";
import path from "node:path";
import game from "../../routes/game";

export class GameService implements IGameService{
    async saveGame(name: string, fileName: string) {
        console.log(__dirname)
        try{
            await prisma.game.create({
                data: {
                    name: name,
                    pathToImage: path.join(__dirname.replace('dist/api/app/services/game', ''), `gamesImages/${fileName}`)
                }
            })
        } catch (e){
            throw ApiError.Conflict('Такая игра уже существует')
        }
    }

    async getAllGames(): Promise<Game[]>{
        return prisma.game.findMany()
    }

    async getGameInfo(name: string): Promise<Game | null>{
        return prisma.game.findFirst({
            where: {
                name: {
                    contains: name,
                    mode: 'insensitive'
                }
            }
        })
    }

    async getSessionsAmount(game: Game): Promise<number> {
        return prisma.sessions_games.count({
            where: {
                gameName: game.name
            }
        })
    }

    async getSessionsById(sessionId: string): Promise<sessions_games[]> {
        return prisma.sessions_games.findMany({
            where: {
                sessionId
            }
        })
    }


    async setSessions(games: Game[]): Promise<Array<Game & { sessionsAmount: number }>> {
        const gamesWithSessions: Array<Game & { sessionsAmount: number }> = []

        for(let i = 0; i < games.length; i++){
            gamesWithSessions.push(Object.assign(games[i],
                { sessionsAmount: await this.getSessionsAmount(games[i])}
            ))
        }

        return gamesWithSessions
    }

}