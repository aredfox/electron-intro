const { electron, app, BrowserWindow, Tray } = require('electron');
const path = require('path');
const url = require('url');
const os = require('os');
const imageFolder = path.join(__dirname, '/resources/');
const images = {
    'red': path.join(imageFolder, `red${os.platform() === 'darwin' ? '-16.png' : '.ico'}`)
};

let mainWindow;
let tray;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 775, height: 600,
        resizable: false
    });

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, 'main.html'),
            protocol: 'file',
            slashes: true
        })
    );

    mainWindow.on('closed', function () {
        mainWindow = null;
    });

    createTrayIcon();
}
function createTrayIcon() {
    tray = new Tray(images.red);
}

function handleActivate() {
    if (mainWindow === null) {
        createWindow();
    }
}
function handleAllWindowsClosed() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
}
function handleQuit() {
    tray.destroy();
}

app.on('will-quit', handleQuit);
app.on('ready', createWindow);
app.on('activate', handleActivate);
app.on('window-all-closed', handleAllWindowsClosed);
