const urlParams = new URLSearchParams(window.location.search);
const channelID = urlParams.get("channel_id");

let taskBox = document.querySelector(".chatBox");
let channelBtn = document.querySelector(".addTask");

let catchChat = (channelID) => {
    let url = `http://127.0.0.1:5000/messages/?channel_id=${channelID}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        if (data.length === 0) {
            // Si no hay canales, muestra un mensaje de advertencia
            const noChannelsMessage = document.createElement("p");
            noChannelsMessage.textContent = "No hay mensajes. Escribe uno...";
            taskBox.appendChild(noChannelsMessage);
        } else {
            // Si hay canales, crea contenedores para cada uno
            data.map(chat => {
                createTaskContainer(chat);
            });
        }
    })
    .catch(err => console.log(err));
};

catchChat();

let createTaskContainer = (chat) =>{

    // Crear elemento de texto de servidor
    let taskText = document.createElement("p");   // Elemento de texto para representar el nombre del canal
    taskText.classList.add("channelText");        // Agrega la clase "channelText" a este elemento
    taskText.textContent = chat.message;          // Establece su contenido de texto con el nombre de la tarea obtenido de la variable chat.message

    // Crear descripcion
    //let dueTaskSpan = document.createElement("span");
    //let dueTask = `Descripción: ${channel.descripcion}`;
    //dueTaskSpan.textContent = dueTask;
    //dueTaskSpan.classList.add("dueTaskSpan");

    // Añadir elementos
    taskText.appendChild(document.createElement("br"));
    //taskText.appendChild(dueTaskSpan);
    taskBox.appendChild(taskText);
    taskText.setAttribute("data-task-id", channel.channel_id);
}

// Función para crear un canal mediante una solicitud POST a una dirección URL local: "http://127.0.0.1:5000/channels/
let addTask = (channelID) => {
    let taskName = prompt("Ingrese el nombre del canal");
    let taskDescription = prompt("Ingrese la descripción del canal");

    fetch("http://127.0.0.1:5000/channels/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: taskName,
            due_date: taskDescription,
            category_id: +categoryID
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Canal creado:", data);
    })
    .catch(error => {
        console.error("Error al crear el canal:", error);
        alert("El nombre del canal y la fecha no puede estar vacío")
    });
}

// CONTROL
if (channelID) {
    catchChat(channelID);
} else {
    console.log("No se ha proporcionado un ID de canal.");
}

document.getElementById('chatBox').addEventListener('click', event => {
    if (event.target.classList.contains('chatBox')) {
      const canalSeleccionado = event.target.dataset.canalId; // Hay que definir 'data-canal-id' en los elementos de canal
      
      console.log(canalSeleccionado);
    }
  });