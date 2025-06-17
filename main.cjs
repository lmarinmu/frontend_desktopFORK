const { app, BrowserWindow } = require("electron");
app.commandLine.appendSwitch('--no-sandbox');
app.commandLine.appendSwitch('--disable-dev-shm-usage');
const path = require("path");
const fs = require("fs");
const { spawn } = require("child_process");

const isDev = process.env.NODE_ENV !== "production";

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    icon: (() => {
      // Detecta si estamos en Windows o WSL
      const isWindowsOrWSL = process.platform === 'win32' || process.platform === 'linux' && fs.existsSync('/proc/sys/fs/binfmt_misc/WSLInterop');
      const iconPath = isWindowsOrWSL ? 'public/app-icon/icon.ico' : 'public/app-icon/icon.png';
      const fallbackPath = 'public/app-icon/icon.png';
      try {
        const iconFullPath = path.join(__dirname, iconPath);
        return fs.existsSync(iconFullPath) ? iconFullPath : path.join(__dirname, fallbackPath);
      } catch {
        return path.join(__dirname, fallbackPath);
      }
    })(),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadURL("http://localhost:3000/sign-in");
  if(isDev){
    mainWindow.webContents.openDevTools();

  }

}

app.whenReady().then(() => {
  if (!isDev) {
    // Solo ejecuta en producción
    spawn("npm", ["run", "start"], {
      shell: true,
      stdio: "inherit",
    });
  }

  setTimeout(() => {
    createWindow();
  }, 4000);
});
