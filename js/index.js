let usuario = prompt("Por Favor Escribe Tu Nombre"),
    pregunta = ["Los pensamientos suelen fluir fácilmente sin quedarse atrapados en mi mente.",
    "Rara vez me preocupo por las cosas; suelo vivir el momento.",
    "A veces las personas se molestan conmigo porque dicen que hablo mucho o demasiado rápido.",
    "Parece que he perdido el interés en la mayoría de las cosas que solía encontrar placenteras, como el sexo.",
    "Últimamente sudo mucho y me siento muy tenso.",
    "Disfruto haciendo tantas cosas diferentes que no puedo decidir por cuál empezar.",
    "Muchas veces me siento muy alegre y animado sin ninguna razón.",
    "Se me da muy bien inventar excusas cuando me meto en problemas",
    "En muchos periodos de mi vida he estado tan animado y he consumido tanta energía que luego me he sentido muy bajo de ánimo.",
    "Soy una persona muy variable, cambio de opinión y de sentimientos continuamente.",
    "Tengo muchos problemas para controlar la sensación de evadir la realidad.",
    "A menudo echo a perder las cosas buenas que me ocurren.",
    "Siempre he seguido las indicaciones médicas y no he tomado medicación sin receta.",
    "Sé que he tenido una vida caótica y desenfrenada.",
    "Los castigos nunca me impidieron hacer lo que quería."];
let respuesta = [];
function nombre(){
    let nombreR = document.getElementById("nombre");
    nombreR.innerHTML = usuario;
}
function preguntas(){
    for (let i = 0;i <= 14;i++){
        respuesta.push(prompt(pregunta[i]));
    }
    if (respuesta.includes(null)){
        alert("No respondiste todas las preguntas, vuelve a hacer el test");
        respuesta.length = 0;
        return preguntas();
    }else{
        return respuesta;
    }
}
function mostrarRespuestas() {
    preguntas();
    for (let i = 0;i <= 14;i++){
        console.log(pregunta[i]+": "+respuesta[i]);
    }
}
nombre();
console.log("Hola, "+usuario+" Aqui estan tus respuestas de tu test");
mostrarRespuestas();