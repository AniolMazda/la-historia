const usuario = "",
    preguntas = ["Los pensamientos suelen fluir fácilmente sin quedarse atrapados en mi mente.",
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
function colocarPreguntasHTML(){
    let form = document.getElementById("test"),
        button = document.getElementById("button-form");
    preguntas.forEach((pregunta,i) => {
        let contenedor = document.createElement(`fieldset`);
        contenedor.innerHTML = `<legend><strong>${++i} </strong>${pregunta}</legend>
                        <div><input type="radio" name="resp${i}" value="Si"><label for="Si">Si</label></div>
                        <div><input type="radio" name="resp${i}" value="No"><label for="No">No</label></div>`;
        form.insertBefore(contenedor,button);
    });
    let fieldsetContainer = document.querySelectorAll("fieldset");
    fieldsetContainer.forEach((fieldset,i) => {
        fieldset.classList.add(`pregunta-${++i}`);
    });
}
const obtenerRespuestas = function (callbackMostrar){
    let respuestas = [];
    for(let i = 1;i < preguntas.length+1; i++){
        let pregunta = document.querySelector(`input[name="resp${i}"]:checked`);
        if(pregunta === null){
            let fieldsetClass = document.querySelector(`.pregunta-${i}`);
                errorP = document.createElement("span");
            errorP.classList.add("error-message");
            errorP.innerHTML = "<p>Te falto responder esta pregunta</p>";
            fieldsetClass.append(errorP);
            let errorPs = document.getElementsByClassName("error-message");
            errorPs.length >= 2 && errorP.remove();
            fieldsetClass.scrollIntoView({
                behavior: 'smooth'
            });
            break
        }else{
            respuestas.push(pregunta.value);
        }
    }
    let borrarErrorMessage = document.querySelectorAll('input[type="radio"]'),
        errorMessage = document.querySelector(".error-message");
        borrarErrorMessage.forEach((error) => {
            error.addEventListener('click',() => {
                errorMessage.classList.add("error-message-close");
                setTimeout(() => {errorMessage.remove()},500);
            });
        });
    return respuestas.length === preguntas.length && callbackMostrar(respuestas);
}
const mostrarRespuestas = function (array){
    let resumen = [];
    class Resultados{
        constructor(pregunta,respuesta){
            this.pregunta = pregunta;
            this.respuesta = respuesta;
        }
        resumen(){
            return `${this.pregunta}: ${this.respuesta}`;
        }
    }
    preguntas.forEach((pregunta,i) => {
        resumen.push(new Resultados(pregunta,array[i]));
    });
    console.log(resumen);
}
colocarPreguntasHTML();