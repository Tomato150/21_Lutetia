const Electron = require("electron");
const {spawn} = require('child_process');

/*let server = spawn('python', ['main.py']);*/

Electron.app.on('ready', () => {
    const mainWindow = new Electron.BrowserWindow({
        height:2560,
        width:1440,
        webPreferences: {
            webSecurity: false
        }
    });

    mainWindow.loadURL("C:\\Pycharm projects\\21_lutetia\\templates\\index.html");

    Electron.app.on('will-quit', function (e) {
        /*server.kill();
        server = null;*/
    });
});
