import {Client, Sessions} from "@prisma/client";

export interface IClientService{
    createClient(firstName: string, lastName: string, patronymic: string): void
    getClientIdByFullName(firstName: string, lastName: string, patronymic: string): Promise<string | null>
    getClientDataByID(id: string): Promise<Client | null>
    getClientSessions(clientId: string): Promise<Sessions[]>
}