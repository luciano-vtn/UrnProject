/* ------------------VARIAVEIS TELA CANDIDATOS (controle de interface.)--------------- */
let seuVotoPara = document.querySelector('.topScreenLeft-01 span');
let cargo = document.querySelector('.topScreenLeft-02 span');
let descricao = document.querySelector('.topScreenLeft-04');
let screenBotton = document.querySelector('.bottonSreen');
let image = document.querySelector('.topScreenRight');
let numeros = document.querySelector('.topScreenLeft-03');

/* ------------------VARIAVEIS TELA CANDIDATOS (controle de ambiente.)--------------- */

let initialStage = 0; // controla o inicio da tela.
let numeroAgora = ''; // numeros digitados (candidatos)


function startPhase() {

    let stage = phases[initialStage];

    let numeroHtml = '';
    numeroAgora = '';
    

    for(let i=0 ; i < stage.numeros; i++) 
    {
        if (i === 0) {
             numeroHtml += '<div class="topScreenLeft-numero pisca"></div>';
                     }
        else {
             numeroHtml += '<div class="topScreenLeft-numero"></div>';
             }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = stage.titulo;
    descricao.innerHTML ='';
    screenBotton.style.display ='none';
    image.innerHTML ='';
    numeros.innerHTML = numeroHtml;

}

/* ------------------FUNÇÕES "TECLADO"--------------- */

function refreshScreen() {
    console.log('Este numero foi digitado');
    //console.log(numeroAgora);

}

function clicou(n) {
    let elNumero = document.querySelector('.topScreenLeft-numero.pisca');
    if (elNumero !== null) {
        elNumero.innerHTML = n;
        numeroAgora = `${numeroAgora}${n}`;

        elNumero.classList.remove('pisca');
       
        if(elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca');
        } else {
            refreshScreen();
        }
    }
    
}
function branco () {
    alert("Clicou em BRANCO.");
}
function corrige() {
    alert("Clicou em CORRIGE.");
}

function confirma() {
    alert("Clicou em CONFIRMA.");
}

/* ------------------ CHAMARDAS --------------- */

startPhase();
