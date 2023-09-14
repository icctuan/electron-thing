const { app, BrowserWindow, ipcMain, globalShortcut } = require("electron");
const path = require("path");

let win;
const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { preload: path.join(__dirname, "/config/preload.js") }, // __dirname当前正在执行脚本的路径 ，join将两个路径连接起来
  });

  win.loadFile("index.html"); // 将页面加载到新的 BrowserWindow 实例
};

app.whenReady().then(() => {
  ipcMain.handle("ping", () => "pong");
  createWindow();

  // 注册f12快捷键
  globalShortcut.register("CommandOrControl+f12", () => {
    if (win.webContents.isDevToolsOpened()) {
      win.webContents.closeDevTools();
    } else {
      win.webContents.openDevTools();
    }
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

console.log("welcome to Electron"); // 主进程里的console打印在终端
