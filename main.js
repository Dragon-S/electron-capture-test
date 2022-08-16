// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain, desktopCapturer}=require('electron')

let mainWindow

function createWindow() {
  mainWindow=new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      nativeWindowOpen: true,
      contextIsolation: false,
    },
  })

  mainWindow.loadFile('index.html')

  mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length===0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', function () {
  if (process.platform!=='darwin') app.quit()
})

ipcMain.on("start", (_, arg) => {
  desktopCapturer.getSources({types: ['window', 'screen']}).then((sources)=>{
    mainWindow.webContents.send("getSources", sources)
  })
})