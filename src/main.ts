import { exec } from "child_process";
import {startApp} from "./api/app/app-start.function";
const AUTHORIZATION_PAGE = '../html/index.html'
import {app, BrowserWindow, ipcMain, dialog} from 'electron'
import fs from "fs"

let mainWindow: BrowserWindow | null;

app.on('ready', async () => {
    await startApp

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    mainWindow.loadFile(AUTHORIZATION_PAGE);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        mainWindow = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            },
        });

        mainWindow.loadFile(AUTHORIZATION_PAGE);
    }
});


ipcMain.on('save-devices-to-file', (event: any, fileContent: any) => {
    if (mainWindow){
        const savePath = dialog.showSaveDialogSync(mainWindow, {
            title: 'Сохранить устройства',
            defaultPath: 'devices.txt',
            filters: [{ name: 'Text Files', extensions: ['txt'] }],
        });

        if (savePath) {
            fs.writeFile(savePath, fileContent, (err: any) => {
                if (err) {
                    console.error('Ошибка при сохранении файла:', err);
                } else {
                    console.log('Файл успешно сохранен:', savePath);
                }
            });
        }
    }
});