const { electron, app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

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

app.on('ready', createWindow);
app.on('activate', handleActivate);
app.on('window-all-closed', handleAllWindowsClosed);
