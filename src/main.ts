import { app, BrowserWindow } from 'electron';
import { exec } from "child_process";
import {startApp} from "./api/app/app-start.function";
const AUTHORIZATION_PAGE = '../html/index.html'

let mainWindow: BrowserWindow | null;

app.on('ready', async () => {
    await startApp

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
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
            },
        });

        mainWindow.loadFile(AUTHORIZATION_PAGE);
    }
});
