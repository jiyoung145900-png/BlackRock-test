const { app, BrowserWindow, ipcMain } = require('electron');
const { keyboard, Key } = require("@nut-tree-fork/nut-js"); // 설치하신 포크 버전
const path = require('path');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 400,
        height: 600,
        alwaysOnTop: true, // 항상 위에 표시 (상담할 때 편함)
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    win.loadFile('index.html');
}

// 텍스트를 받아서 실제로 타이핑하는 로직
ipcMain.on('type-text', async (event, text) => {
    // 사용자가 메신저 창을 클릭할 시간을 주기 위해 0.5초 대기
    await new Promise(r => setTimeout(r, 500)); 
    await keyboard.type(text);
    await keyboard.keyTap(Key.Enter); // 전송까지 원하면 추가
});

app.whenReady().then(createWindow);
