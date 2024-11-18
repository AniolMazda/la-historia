//VARIABLES CONSTANTES
const usuario = "",
    preguntas = [{
        id:1,
        pregunta:"Los pensamientos suelen fluir fácilmente sin quedarse atrapados en mi mente.",
        valor_true:0,
        valor_false:{
            valor:2,
            grupo:"ansiedad"
        }
    },
    {
        id:2,
        pregunta:"Rara vez me preocupo por las cosas; suelo vivir el momento.",
        valor_true:{
            valor:1,
            grupo:"vicios"
        },
        valor_false:{
            valor:2,
            grupo:"ansiedad"
        }
    },
    {
        id:3,
        pregunta:"A veces las personas se molestan conmigo porque dicen que hablo mucho o demasiado rápido.",
        valor_true:{
            valor:[1,1],
            grupo:["ansiedad","bipolar"]
        },
        valor_false:0
    },
    {
        id:4,
        pregunta:"Parece que he perdido el interés en la mayoría de las cosas que solía encontrar placenteras, como el sexo.",
        valor_true:{
            valor:2,
            grupo:"ansiedad"
        },
        valor_false:{
            valor:1,
            grupo:"bipolar"
        }
    },
    {
        id:5,
        pregunta:"Últimamente sudo mucho y me siento muy tenso.",
        valor_true:{
            valor:1,
            grupo:"ansiedad"
        },
        valor_false:0
    },
    {
        id:6,
        pregunta:"Disfruto haciendo tantas cosas diferentes que no puedo decidir por cuál empezar.",
        valor_true:{
            valor:2,
            grupo:"bipolar"
        },
        valor_false:0
    },
    {
        id:7,
        pregunta:"Muchas veces me siento muy alegre y animado sin ninguna razón.",
        valor_true:{
            valor:2,
            grupo:"bipolar"
        },
        valor_false:{
            valor:1,
            grupo:"ansiedad"
        }
    },
    {
        id:8,
        pregunta:"Se me da muy bien inventar excusas cuando me meto en problemas",
        valor_true:{
            valor:[1,1],
            grupo:["bipolar","vicios"]
        },
        valor_false:0
    },
    {
        id:9,
        pregunta:"En muchos periodos de mi vida he estado tan animado y he consumido tanta energía que luego me he sentido muy bajo de ánimo.",
        valor_true:{
            valor:2,
            grupo:"bipolar"
        },
        valor_false:0
    },
    {
        id:10,
        pregunta:"Soy una persona muy variable, cambio de opinión y de sentimientos continuamente.",
        valor_true:{
            valor:1,
            grupo:"bipolar"
        },
        valor_false:0
    },
    {
        id:11,
        pregunta:"Tengo muchos problemas para controlar la sensación de evadir la realidad.",
        valor_true:{
            valor:2,
            grupo:"vicios"
        },
        valor_false:0
    },
    {
        id:12,
        pregunta:"A menudo echo a perder las cosas buenas que me ocurren.",
        valor_true:{
            valor:[1,1],
            grupo:["vicios","ansiedad"]
        },
        valor_false:0
    },
    {
        id:13,
        pregunta:"Siempre he seguido las indicaciones médicas y no he tomado medicación sin receta.",
        valor_true:{
            valor:1,
            grupo:"ansiedad"
        },
        valor_false:{
            valor:1,
            grupo:"vicios"
        }
    },   
    {
        id:14,
        pregunta:"Sé que he tenido una vida caótica y desenfrenada.",
        valor_true:{
            valor:2,
            grupo:"vicios"
        },
        valor_false:0
    },
    {
        id:15,
        pregunta:"Los castigos nunca me impidieron hacer lo que quería.",
        valor_true:{
            valor:1,
            grupo:"vicios"
        },
        valor_false:{
            valor:1,
            grupo:"ansiedad"
        }
    }],
    buttonForm = document.getElementById("button-form");
let form = document.getElementById("test"),
    contenedorTest = document.getElementById("contenedor-test"),
    comprobarLocal = localStorage.getItem("resumenTest");
//FUNCIONES
function colocarPreguntasHTML(){
    preguntas.forEach((preguntacontent,i) => {
        let contenedor = document.createElement(`fieldset`);
        contenedor.innerHTML = `<legend><strong>${++i} </strong>${preguntacontent.pregunta}</legend>
                        <div><input type="radio" name="resp${i}" value="Si"><label for="test">Si</label></div>
                        <div><input type="radio" name="resp${i}" value="No"><label for="test">No</label></div>`;
        form.insertBefore(contenedor,buttonForm);
    });
    let fieldsetContainer = document.querySelectorAll("fieldset");
    fieldsetContainer.forEach((fieldset,i) => {
        fieldset.classList.add(`pregunta-${++i}`);
    });
}
const obtenerRespuestas = function (callbackGuardar){
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
    return respuestas.length === preguntas.length && callbackGuardar(respuestas);
}
const guardarRespuestas = function (array){
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
    return localStorage.setItem("resumenTest", JSON.stringify(resumen));
}
function mostrarRespuestas (){
    if(comprobarLocal){
        let resumenLocal = JSON.parse(comprobarLocal);
            form.remove();
        let contenedorPresentacionResumen = document.createElement("div");
            contenedorPresentacionResumen.classList.add("contenedor-presentacion-resumen");
            contenedorPresentacionResumen.innerHTML = `<h2>Informe De Resultados</h2>
                <p>Nombre: ${usuario}</p>`;
            contenedorTest.append(contenedorPresentacionResumen);
        let contenedorResumen = document.createElement("div");
            contenedorResumen.classList.add("contenedor-resumen");
            contenedorResumen.innerHTML = "<h3>Resultados</h3>";
            resumenLocal.forEach((resumenIndividual) => {
                contenedorResumen.innerHTML += `<div class="resumen"><p class="pregunta">${resumenIndividual.pregunta}</p><p class="respuesta">${resumenIndividual.respuesta}</p></div>`;
                contenedorTest.append(contenedorResumen);
            });
    }
}
colocarPreguntasHTML();
comprobarLocal && mostrarRespuestas();
buttonForm.addEventListener("click",() => {
    obtenerRespuestas(guardarRespuestas);
});