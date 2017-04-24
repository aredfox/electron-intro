const { electron, app, BrowserWindow, Tray, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const os = require('os');
const imageFolder = path.join(__dirname, '/resources/');
const images = {
    'red': path.join(imageFolder, `red${os.platform() === 'darwin' ? '-16.png' : '.ico'}`),
    'green': path.join(imageFolder, `green${os.platform() === 'darwin' ? '-16.png' : '.ico'}`),
    'blue': path.join(imageFolder, `blue${os.platform() === 'darwin' ? '-16.png' : '.ico'}`)
};


let mainWindow;
let tray;
let trayImage = images.red;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 775, height: 600,
        resizable: false,
        icon: images.blue
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
    tray = new Tray(trayImage);
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

ipcMain.on('toggle', (event, includeAppIcon) => {
    console.log(`Current tray image: ${trayImage}`);
    trayImage === images.red
        ? trayImage = images.green
        : trayImage = images.red;
    tray.setImage(trayImage);
    tray.setTitle(trayImage);

    if (includeAppIcon) {
        mainWindow.setIcon(trayImage);
    } else {
        mainWindow.setIcon(images.blue);
    }
});
