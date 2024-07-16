import { IpcHandler } from '../main/preload'

declare global {
  interface Window {
    api: {
      ipc: IpcHandler,
      store: {
        get: (key: string) => any;
        set: (key: string, val: any) => void;
      }
    }
  }
}
