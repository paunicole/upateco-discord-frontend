window.addEventListener('load', function () {
    getProfile();
});

document.getElementById("logout").addEventListener("click", logout);

function getProfile() {
    const url = "http://127.0.0.1:5000/users/profile";
    
    fetch(url, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            return response.json().then(data => {
                // Mostrar la imagen de avatar
                const avatarImage = document.getElementById("avatar");
                const avatarFileName = data.avatar;
                const avatarUrl = `/assets/${avatarFileName}`;
                avatarImage.src = avatarUrl; // Asignar la URL de la imagen al atributo src
                avatarImage.alt = "Avatar"; // Agregar un atributo alt para accesibilidad
                document.getElementById("avatar").innerText = data.avatar;
                document.getElementById("username").innerText = data.username;
                document.getElementById("email").innerText = data.email;
                document.getElementById("first_name").innerText = data.first_name;
                document.getElementById("last_name").innerText = data.last_name;
                document.getElementById("birthdate").innerText = data.birthdate;
            });
        } else {
            return response.json().then(data => {
                document.getElementById("message").innerHTML = data.message;
            });
        }
    })
    .catch(error => {
        document.getElementById("message").innerHTML = "An error occurred.";
    });
}

function logout() {
    const url = "http://127.0.0.1:5000/users/logout";
    
    fetch(url, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            return response.json().then(data => {
                window.location.href = "login.html";
            });
        } else {
            return response.json().then(data => {
                document.getElementById("message").innerHTML = data.message;
            });
        }
    })
    .catch(error => {
        document.getElementById("message").innerHTML = "An error occurred.";
    });
}