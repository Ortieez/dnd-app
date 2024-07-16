import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'

const handler = {
  ipc: {
    send(channel: string, value: unknown) {
      ipcRenderer.send(channel, value)
    },
    on(channel: string, callback: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        callback(...args)
      ipcRenderer.on(channel, subscription)

      return () => {
        ipcRenderer.removeListener(channel, subscription)
      }
    },
  },
  store: {
    get(key: string) {
      return ipcRenderer.sendSync('electron-store-get', key);
    },
    set(key: string, val: any) {
      ipcRenderer.send('electron-store-set', key, val);
    },
  }
}

contextBridge.exposeInMainWorld('api', handler)

export type IpcHandler = typeof handler.ipc
