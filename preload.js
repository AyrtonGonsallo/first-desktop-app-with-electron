const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  saveUser: (formData) => ipcRenderer.send('form-submission', formData)
})