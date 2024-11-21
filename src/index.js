const { app, BrowserWindow, ipcMain} = require('electron');
const path = require('node:path');
const fs = require('fs');
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}
// Handle Loggin

// Get the directory where your main script (index.js or main.js) is located
const appDirectory = __dirname;

// Path to userData.json in the same directory as the main script
const userDataPath = path.join(appDirectory, 'userData.json');

// Function to read user data from userData.json
function readUserData() {
    try {
        const userData = JSON.parse(fs.readFileSync(userDataPath, 'utf-8'));
        return userData;
    } catch (error) {
        console.error('Error reading user data:', error);
        return null;
    }
}

// Example usage:
const userData = readUserData();
const logged_in = userData ? userData.logged_in : false;


const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#F15822',
      symbolColor: '#FFE4C8',
      height: 40
    },
    width: 420,
    height: 801,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration:true,
    },
  });

  let startUrl = logged_in ? 'index.html': './pages/0-login.html';

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, startUrl));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


