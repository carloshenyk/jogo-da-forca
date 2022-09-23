// Pagina inicial

var bplay = document.getElementById('bt-comecar');
var parteCorpo = document.querySelectorAll(".parte-copo");
var palavraSorteada = document.querySelector(".palavra-sorteada");
var addPalavra = document.querySelector(".bt-add");
var addInpt = document.querySelector("#add-palavra");
var salvarP = document.querySelector(".bt-salvar");

const valueAdd = addInpt.value;

bplay.addEventListener('click', playerJogo);

function playerJogo(evento){
    document.getElementById('container-forca').style.display = 'flex';
    document.getElementById('container').style.display = 'none';
    document.querySelector('.area-bt-jogo').style.display = 'flex';
    document.querySelector('.mostrarLetrasErradas').style.display = 'flex';
    document.querySelector('.palavra-sorteada').style.display = 'block';
}

addPalavra.addEventListener('click', areaAddPalavra);
function areaAddPalavra(evento){
    document.getElementById('container').style.display = 'none';
    document.querySelector(".container-add-palavra").style.display = "flex";
    document.querySelector(".palavra-repetida").style.display = "none";
    
}

function novoJogo(){
    window.location.reload();
}

// LOGICA DAS PALAVRAS

const brasil = [
    "independencia", "descobrimento", "agro", "etnia", "deus", "patria", "familia"
];
// ADICIONAR PALAVRA AO ARRAY BRASIL
salvarP.addEventListener('click', adicionarPalavra);
function adicionarPalavra(evento){
    addInpt.innerText = "";
    brasil.push(valueAdd);
    console.log(brasil);
}
const palavraAleatoria = brasil[Math.floor(Math.random() * brasil.length)];
const letraErrada = [];
const letraCorreta = [];

document.addEventListener("keydown", (evento) =>{
    const codigo = evento.keyCode;
    if(isLetra(codigo)){
        const letra = evento.key;

        if(letraErrada.includes(letra)){
            mostrarAvisoLetraRepetida();
        }else{
            if(palavraAleatoria.includes(letra)){
                letraCorreta.push(letra);
            }else{
                letraErrada.push(letra);
            }
        }

        atualizarJogo();
    }
})

function atualizarJogo(){
    mostrarLetraErrada();
    mostrarCertas();
    desenharForca();
    checarJogo();
}

function mostrarCertas(){
    palavraSorteada.innerHTML = "";

    palavraAleatoria.split("").forEach(letra => {
        if(letraCorreta.includes(letra)){
            palavraSorteada.innerHTML += `<span>${letra}</span>`;
        }else{
            palavraSorteada.innerHTML += `<span> _ </span>`;
        }
    })
}

function mostrarLetraErrada(){
    const div = document.querySelector(".mostrarLetrasErradas");
    div.innerHTML = " ";
    letraErrada.forEach(letra => {
        div.innerHTML += `<span> ${letra} </span>`;
    });
}

//Desenhar Forcar

function desenharForca(){
    for (let i = 0; i < letraErrada.length; i++){
        parteCorpo[i].style.display = "block";
    }
}
// Validar jogada

function checarJogo(){
    let mesagem = "";
    if(letraErrada.length === parteCorpo.length){
        mesagem = "Você Perdeu!";
    }

    if(palavraAleatoria === palavraSorteada.innerText){
        mesagem = "Parabéns, você ganhou!";
    }
    if(mesagem){
        document.querySelector("#mensagem").innerHTML = mesagem;
        document.querySelector(".venceu").style.display = "block"
    }
}

function  mostrarAvisoLetraRepetida(){
    const aviso = document.querySelector('.palavra-repetida');
    aviso.classList.add("show");
    setTimeout(() =>{
        aviso.classList.remove("show");
    }, 1000);
}

function isLetra(codigo){
    return codigo >= 65 && codigo <= 90;
}