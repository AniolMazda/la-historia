//CONSTANTES
const preguntas = [{
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
// VARIABLES LET
let form = document.getElementById("test"),
    contenedorTest = document.getElementById("contenedor-test"),
    usuario = "",
    perfil = "",
    comprobarLocal = localStorage.getItem("resumenTest");
//FUNCIONES
function colocarPreguntasHTML(){
    preguntas.forEach((preguntacontent,i) => {
        let contenedor = document.createElement(`fieldset`);
        contenedor.innerHTML = `<legend><strong>${++i} </strong>${preguntacontent.pregunta}</legend>
                        <div><input id="pregunta-test${i}-si" type="radio" name="resp${i}" value="Si"><label for="pregunta-test${i}">Si</label></div>
                        <div><input id="pregunta-test${i}-no" type="radio" name="resp${i}" value="No"><label for="pregunta-test${i}">No</label></div>`;
        form.insertBefore(contenedor,buttonForm);
    });
    let fieldsetContainer = document.querySelectorAll("fieldset");
    fieldsetContainer.forEach((fieldset,i) => {
        fieldset.classList.add(`pregunta-${++i}`);
    });
}
const obtenerUsuario = function (){
    let valorUser = document.getElementById("name-form");
    usuario = valorUser.value;
    localStorage.setItem("Nombre",usuario);
}
const obtenerRespuestas = function (callbackGuardar){
    let respuestas = [],
        esValido = true;
    for(let i = 1;i < preguntas.length+1; i++){
        let pregunta = document.querySelector(`input[name="resp${i}"]:checked`);
        if(pregunta === null || pregunta === undefined){
            esValido = false;
            mensajeError(i);
            break
        }else{
            respuestas.push(pregunta.value);
            esValido = true;
        }
    }
    borrarMensajeError();
    const validarRespuestas = () => {
        return new Promise((resolve,reject) => {
            let validarTruitly = respuestas.every((respuesta) => !!respuesta),
                validarRespuestaBinaria = respuestas.every((respuesta) => respuesta === "Si" || respuesta === "No");
            if(esValido && validarTruitly && validarRespuestaBinaria && respuestas.length === preguntas.length){
                resolve();
            }else{
                reject();
            }
        });
    }
    validarRespuestas().then(()=>{
        callbackGuardar(respuestas);
        Swal.fire({
            customClass:{
                container:"success-alert"
            },
            title: "Test Concluido",
            text: "Has terminado el test, ahora puedes ver tus resultados",
            icon: "success",
            iconColor:"#003049",
            background:"#FDF0D5",
            confirmButtonText:"† Ver Resultados †",
            allowOutsideClick:false,
            allowEscapeKey:false
        }).then((result)=>{
            if(result.isConfirmed){
                form.submit();
            }
        }) 
    }).catch(()=>{
        respuestas = [];
            Swal.fire({
            customClass:{
                container:"error-alert"
            },
            title: "Hubo un error en el test, vuelve a realizarlo por favor",
            icon: "error",
            iconColor:"#FDF0D5",
            background:"#C1121F",
            position:"top-start",
            toast:true,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        });
    })
}
const guardarRespuestas = function (array){
    let resumen = [];
    class Resultados{
        constructor(estructuraPregunta,respuesta){
            this.estructuraPregunta = estructuraPregunta;
            this.respuesta = respuesta;
        }
        resumen(){
            return `${this.estructuraPregunta}: ${this.respuesta}`;
        }
    }
    preguntas.forEach((pregunta,i) => {
        resumen.push(new Resultados(pregunta,array[i]));
    });
    return localStorage.setItem("resumenTest", JSON.stringify(resumen));
}
const categorizarRespuestas = function(local){
    function definirPorcentajes(a,b){
        let valorPorcentual = a * b / 100;
        return Math.round(valorPorcentual);
    }
    function definirPerfil (a,b,c){
        if(a > b && c){
            perfil = "Ansiedad Generalizada";
        }else if(b > a && c){
            perfil = "Espectro Bipolar";
        }else if(c > b && c){
            perfil = "Tendencias Adictivas";
        }
    }
    let valorAnsiedad = [],
        valorBipolar = [],
        valorVicios = [],
        totalAnsiedad = 12,
        totalBipolar = 10,
        totalVicios = 9;
    local.forEach((resultado)=>{
        if(resultado.respuesta === "Si"){
            resultado.estructuraPregunta.valor_true.grupo === "ansiedad" && valorAnsiedad.push(resultado.estructuraPregunta.valor_true.valor);
            resultado.estructuraPregunta.valor_true.grupo === "bipolar" && valorBipolar.push(resultado.estructuraPregunta.valor_true.valor);
            resultado.estructuraPregunta.valor_true.grupo === "vicios" && valorVicios.push(resultado.estructuraPregunta.valor_true.valor);
        }else if(resultado.respuesta === "No"){
            resultado.estructuraPregunta.valor_false.grupo === "ansiedad" && valorAnsiedad.push(resultado.estructuraPregunta.valor_false.valor);
            resultado.estructuraPregunta.valor_false.grupo === "bipolar" && valorBipolar.push(resultado.estructuraPregunta.valor_false.valor);
            resultado.estructuraPregunta.valor_false.grupo === "vicios" && valorVicios.push(resultado.estructuraPregunta.valor_false.valor);
        }
    });
    let valorTotalAnsiedad = valorAnsiedad.reduce((a,b)=> a + b,0)*10;
    let valorTotalBipolar = valorBipolar.reduce((a,b)=> a + b,0)*10;
    let valorTotalVicios = valorVicios.reduce((a,b)=> a + b,0)*10;
    let valorFinalAnsiedad = definirPorcentajes(totalAnsiedad,valorTotalAnsiedad),
        valorFinalBipolar = definirPorcentajes(totalBipolar,valorTotalBipolar),
        valorFinalVicios = definirPorcentajes(totalVicios,valorTotalVicios);
    return definirPerfil(valorFinalAnsiedad,valorFinalBipolar,valorFinalVicios);
}
function mostrarRespuestas (){
    if(comprobarLocal){
        let resumenLocal = JSON.parse(comprobarLocal),
            usuarioLocal = localStorage.getItem("Nombre");
            categorizarRespuestas(resumenLocal);
            form.remove();
        let contenedorPresentacionResumen = document.createElement("div");
            contenedorPresentacionResumen.classList.add("contenedor-presentacion-resumen");
            contenedorPresentacionResumen.innerHTML = `<h2>Informe De Resultados</h2>
                <p><strong>Nombre:</strong> ${usuarioLocal}</p>
                <p><strong>Perfil:</strong> ${perfil}</p>`;
            contenedorTest.append(contenedorPresentacionResumen);
        let contenedorResumen = document.createElement("div");
            contenedorResumen.classList.add("contenedor-resumen");
            contenedorResumen.innerHTML = "<h3>Resultados</h3>";
            resumenLocal.forEach((resumenIndividual) => {
                contenedorResumen.innerHTML += `<div class="resumen"><p class="pregunta">${resumenIndividual.estructuraPregunta.pregunta}</p><p class="respuesta">${resumenIndividual.respuesta}</p></div>`;
                contenedorTest.append(contenedorResumen);
            });
    }
}

// CONTROL DE ERRORES

const mensajeError = function(i){
    let fieldsetClass = document.querySelector(`.pregunta-${i}`),
        errorP = document.createElement("span");
        errorP.classList.add("error-message");
        errorP.innerHTML = "<p>Te falto responder esta pregunta</p>";
        fieldsetClass.append(errorP);
    let errorPs = document.getElementsByClassName("error-message");
        errorPs.length >= 2 && errorP.remove();
        fieldsetClass.scrollIntoView({
            behavior: 'smooth'
        });
}
const borrarMensajeError = function(){
    let borrarErrorMessage = document.querySelectorAll('input[type="radio"]'),
        errorMessage = document.querySelector(".error-message");
        borrarErrorMessage.forEach((error) => {
            error.addEventListener('click',() => {
                errorMessage.classList.add("error-message-close");
                setTimeout(() => {errorMessage.remove()},500);
            });
        });
}

colocarPreguntasHTML();
comprobarLocal && mostrarRespuestas();
form.addEventListener("submit",(event) => {
    event.preventDefault();
    obtenerUsuario();
    obtenerRespuestas(guardarRespuestas);
});