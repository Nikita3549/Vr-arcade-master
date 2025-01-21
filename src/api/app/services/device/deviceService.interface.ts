import {Device, sessions_devices} from "@prisma/client";

export interface IDeviceService{
    createDevice(serialNumber: string, model: string): void
    getDeviceData(serialNumber: string): Promise<Device | null>
    getAllDevices(): Promise<Device[]>
    getSessionsByModel(deviceModel: string): Promise<sessions_devices[]>
    getSessionsById(sessionId: string): Promise<sessions_devices[]>
    setSessions(devices: Device[]): Promise<Array<Device & { sessionsAmount: number }>>
}