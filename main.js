// app => controls the applications lifecycle
// BrowserWindow => which creates and manages app windows.

const {app, BrowserWindow, ipcMain} = require('electron')
const path = require("path")

const createWindow = ()=>  {
    const win = new BrowserWindow({ 
        webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
      },
    })
    win.maximize();
    win.loadFile('index.html');
    win.show();
    ipcMain.handle('ping', ()=>'pong');
}

app.whenReady().then(()=>{
    createWindow();

    app.on('activate', ()=> {   
        if(BrowserWindow.getAllWindows().length == 0) createWindow();
    })
})

app.on("window-all-closed", ()=> {
    if(process.platform !== 'darwin') app.quit();
    console.log("Good Bye !!")
})
