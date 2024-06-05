const { app, BrowserWindow ,Menu, ipcMain} = require('electron');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
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
                {
                    label: 'Ajouter un exercice',
                    click() {
                        win.loadFile('ajouter-exercice.html');
                    }
                },
                // Ajoutez d'autres éléments de menu pour les autres routes si nécessaire
            ]
        }
    ]);

    // Définition du menu comme menu de l'application
    Menu.setApplicationMenu(mainMenu);
    // Activer les outils de développement (DevTools)
    win.webContents.openDevTools();


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


// Handle form submission
function saveFormData(data) {
    const db = new sqlite3.Database('database.db');
    db.serialize(function() {
        db.run('CREATE TABLE IF NOT EXISTS formData (name TEXT, email TEXT)');
        const stmt = db.prepare('INSERT INTO formData VALUES (?, ?)');
        stmt.run(data.name, data.email);
        stmt.finalize();
    });
    db.close();
    console.log("base de donnees")
}

/*
Réception des données du formulaire dans le processus principal :
Maintenant, dans votre fichier principal Electron, écoutez l'événement envoyé par le processus de rendu pour recevoir les données du formulaire. Vous avez déjà une fonction saveFormData, il vous suffit de la connecter à l'événement approprié. Modifiez votre fonction createWindow comme ceci :
*/
ipcMain.on('form-submission', (event, data) => {
    saveFormData(data);
});

