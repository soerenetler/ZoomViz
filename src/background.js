'use strict'

import { app, protocol, BrowserWindow } from 'electron'
import { autoUpdater } from 'electron-updater'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, {
  JQUERY_DEBUGGER,
  VUEJS_DEVTOOLS,
} from 'electron-devtools-installer'

const isDevelopment = process.env.NODE_ENV !== 'production'

// Setup logger
autoUpdater.logger = require('electron-log')
autoUpdater.logger.transports.file.level = 'info'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
])

async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      //nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
      nodeIntegration: true,
      //nodeIntegrationInWorker: true
    },
  })
  //win.removeMenu()

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    installExtension(JQUERY_DEBUGGER)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err))
    installExtension(VUEJS_DEVTOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err))
  } else {
    autoUpdater.checkForUpdatesAndNotify()
  }
  createWindow()
})

autoUpdater.on('checking-for-update', () => {
  console.log('Checking for update...')
})
autoUpdater.on('update-available', (info) => {
  console.log('Update available.')
  console.log(info)
})
autoUpdater.on('update-not-available', (info) => {
  console.log('Update not available.')
  console.log(info)
})
autoUpdater.on('error', (err) => {
  console.log('Error in auto-updater. ' + err)
})
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = 'Download speed: ' + progressObj.bytesPerSecond
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%'
  log_message =
    log_message + ' (' + progressObj.transferred + '/' + progressObj.total + ')'
  console.log(log_message)
})
autoUpdater.on('update-downloaded', (info) => {
  console.log('Update downloaded')
  console.log(info)
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
