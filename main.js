const { app, BrowserWindow ,Menu} = require('electron');
const path = require('path');
function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile('index.html');
    // Création du menu
    const mainMenu = Menu.buildFromTemplate([
        {
            label: 'File',
            submenu: [
                {
                    label: 'Accueil',
                    click() {
                        win.loadFile('index.html');
                    }
                },
                {
                    label: 'Sports',
                    click() {
                        win.loadFile('sports.html');
                    }
                },
                // Ajoutez d'autres éléments de menu pour les autres routes si nécessaire
            ]
        }
    ]);

    // Définition du menu comme menu de l'application
    Menu.setApplicationMenu(mainMenu);
}

app.whenReady().then(createWindow);


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
