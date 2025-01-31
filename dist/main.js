"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_start_function_1 = require("./api/app/app-start.function");
const AUTHORIZATION_PAGE = '../html/index.html';
const electron_1 = require("electron");
const fs_1 = __importDefault(require("fs"));
let mainWindow;
electron_1.app.on('ready', () => __awaiter(void 0, void 0, void 0, function* () {
    yield app_start_function_1.startApp;
    mainWindow = new electron_1.BrowserWindow({
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
}));
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', () => {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        mainWindow = new electron_1.BrowserWindow({
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
electron_1.ipcMain.on('save-devices-to-file', (event, fileContent) => {
    if (mainWindow) {
        const savePath = electron_1.dialog.showSaveDialogSync(mainWindow, {
            title: 'Сохранить устройства',
            defaultPath: 'devices.txt',
            filters: [{ name: 'Text Files', extensions: ['txt'] }],
        });
        if (savePath) {
            fs_1.default.writeFile(savePath, fileContent, (err) => {
                if (err) {
                    console.error('Ошибка при сохранении файла:', err);
                }
                else {
                    console.log('Файл успешно сохранен:', savePath);
                }
            });
        }
    }
});
