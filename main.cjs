const { app, BrowserWindow } = require("electron");
app.commandLine.appendSwitch('--no-sandbox');
app.commandLine.appendSwitch('--disable-dev-shm-usage');
const path = require("path");
const { spawn } = require("child_process");

const isDev = process.env.NODE_ENV !== "production";

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
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
