import {IDeviceService} from "./deviceService.interface";
import prisma from "../../prisma";
import {ApiError} from "../../../utils/api-error/api-error.class";
import {Device, Game, sessions_devices} from "@prisma/client";

export class DeviceService implements IDeviceService{
    async createDevice(serialNumber: string, model: string) {
        try{
            await prisma.device.create({
                data: {
                    serialNumber,
                    model
                }
            })
        } catch (e){
            throw ApiError.Conflict('Такое устройство уже существует в базе')
        }
    }
    async getDeviceData(serialNumber: string): Promise<Device | null>{
        return prisma.device.findFirst({
            where: {
                serialNumber
            }
        })
    }

    getAllDevices(): Promise<Device[]> {
        return prisma.device.findMany()
    }

    async getSessionsByModel(deviceModel: string): Promise<sessions_devices[]> {
        return prisma.sessions_devices.findMany({
            where: {
                device_model: deviceModel
            }
        })
    }

    async getSessionsById(sessionId: string): Promise<sessions_devices[]> {
        return prisma.sessions_devices.findMany({
            where: {
                sessionId
            }
        })
    }

    async setSessions(devices: Device[]): Promise<Array<Device & { sessionsAmount: number }>> {
        const devicesWithSessions: Array<Device & { sessionsAmount: number }> = []

        for(let i = 0; i < devices.length; i++){
            devicesWithSessions.push(Object.assign(devices[i],
                { sessionsAmount: (await this.getSessionsByModel(devices[i].model)).length}
            ))
        }

        return devicesWithSessions
    }

}