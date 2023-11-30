const path = require('path')
const isDev = require('electron-is-dev')
const { app, BrowserWindow } = require('electron')

const isProd = !isDev

function createWindow() {
  const win = new BrowserWindow({
    width: 1080,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })

  getFilePath()

  if (isProd) {
    win.loadURL(`file://${path.join(__dirname, '../build/index.html')}`)
    win.removeMenu()
  }

  if (isDev) {
    win.loadURL('http://localhost:3000')
    win.removeMenu()
  }
}

function getFilePath() {
  try {
    const path = process.argv[2]

    if (!path) throw new Error('A file argument must be informed!')

    console.log(path)

    global.path = path
  } catch (error) {
    console.warn(error)
  }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
