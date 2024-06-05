
const form = document.getElementById('form');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value
    };
    window.electronAPI.saveUser(formData);
    console.log('Form data: ' + JSON.stringify(formData)); // Ajouter cette ligne
   // ipcRenderer.send('form-submission', formData);
    console.log('Form data sent to Electron!');                    
    //form.reset();
});