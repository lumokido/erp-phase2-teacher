// electron/preload.ts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  getSystemStatus: () => ipcRenderer.invoke('get-system-status'),
  isElectron: true,
});
