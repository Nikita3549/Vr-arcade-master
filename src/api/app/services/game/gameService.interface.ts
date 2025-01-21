import {Game, sessions_games} from "@prisma/client";

export interface IGameService{
    saveGame(name: string, fileName: string): void
    getAllGames(): Promise<Game[]>
    getGameInfo(name: string): Promise<Game | null>
    setSessions(games: Game[]): Promise<Array<Game & { sessionsAmount: number }>>
    getSessionsById(sessionId: string): Promise<sessions_games[]>
    getSessionsAmount(game: Game): Promise<number>
}