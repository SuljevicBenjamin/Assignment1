function kontakt_js() {
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const formStatus = document.getElementById('form-status');
    
    
    const password = document.getElementById('password').value;
    const passwordStrength = document.getElementById('passwordStrength');

    if (password.length < 8) {
        alert('Lozinka mora imati barem 8 karaktera!');
        passwordStrength.textContent = 'Slaba lozinka';
        passwordStrength.style.color = 'red';
        return;
    }

    if (password.length < 8) {
        passwordStrength.textContent = 'Slaba lozinka';
        passwordStrength.style.color = 'red';
    } else if (password.length < 12) {
        passwordStrength.textContent = 'Srednja lozinka';
        passwordStrength.style.color = 'orange';
    } else {
        passwordStrength.textContent = 'Dobra lozinka';
        passwordStrength.style.color = 'green';
    }

    
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
    
        formStatus.textContent = 'Podaci su uspješno poslani!';
        formStatus.style.color = 'green';
        form.reset(); 
    })
    .catch(error => {
        
        formStatus.textContent = 'Došlo je do greške prilikom slanja podataka. Pokušajte ponovo.';
        formStatus.style.color = 'red';
    });
});
}

