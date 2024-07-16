import path from 'path'
import { app, BrowserWindow, ipcMain } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import Store from "electron-store";

const store = new Store({ name: "dnd-app" });

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

; (async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  if (isProd) {
    await mainWindow.loadURL('app://./home')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`)
    mainWindow.webContents.openDevTools()
  }
})()

async function createSecondWindow() {
  const mainWindow = createWindow('combat', {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  if (isProd) {
    await mainWindow.loadURL('app://./test')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/test`)
    mainWindow.webContents.openDevTools()
  }
}

app.on('window-all-closed', () => {
  app.quit()
})

ipcMain.on('message', async (event, arg) => {
  const Browsers = BrowserWindow.getAllWindows();

  Browsers.forEach(browser => {
    browser.webContents.send('message', arg)
  })
})

ipcMain.on('openNewWindow', async (event, arg) => {
  createSecondWindow()
});

ipcMain.on('electron-store-get', async (event, val) => {
  event.returnValue = store.get(val);
});
ipcMain.on('electron-store-set', async (event, key, val) => {
  store.set(key, val);
});