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
let votoBranco = false; // variavel de ambiente para "VOTO EM BRANCO"
let vote = [];

function startPhase() {

    let stage = phases[initialStage];

    let numeroHtml = '';
    numeroAgora = '';
    votoBranco= false;
    

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

    let stage = phases[initialStage];
    let candidato = stage.candidatos.filter((item) => {
        if(item.numero === numeroAgora) {
            return true;
        }
        else{
            return false;
        }
    });
        if (candidato.length > 0) {
            candidato = candidato[0];
            seuVotoPara.style.display = 'block';
            screenBotton.style.display ='block';
            descricao.innerHTML = `Nome: ${candidato.nome} <br/> Partido: ${candidato.partido}`;
            
            let fotosHtml = '';
            for (let i in candidato.fotos) {
                if (candidato.fotos[i].small) {// PARA DIFERENDIAR O TAMANHA DA FOTO DO CANDIDATO NA TELA. (USAMOS O SMALL)
                    fotosHtml += `<div class="topScreenRightImage small"> 
                                <img src="./componets/imagensUse/${candidato.fotos[i].url}">
                                ${candidato.fotos[i].legenda}
                              </div>`; 
                }
                else {
                    fotosHtml += `<div class="topScreenRightImage">
                                <img src="./componets/imagensUse/${candidato.fotos[i].url}">
                                ${candidato.fotos[i].legenda}
                              </div>`;
                    }
            }
            image.innerHTML = fotosHtml;
        }
        else{
            seuVotoPara.style.display = 'block';
            screenBotton.style.display ='block';
            descricao.innerHTML = '<div class = "aviso--grande pisca">CANDIDATO NÃO EXISTE.<br/> CASO CONFIRME:<br/>SEU VOTO SERÁ NULO!</div>'
        }

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
    if (numeroAgora === '') {
        votoBranco = true;

        seuVotoPara.style.display = 'block';
        screenBotton.style.display ='block';
        numeros.innerHTML ="";
        image.innerHTML = '';
        descricao.innerHTML = '<div class = "aviso--grande branco pisca"><center>AVISO <br/>CASO CONFIRME<br/> SEU VOTO SERÁ EM BRANCO.</center></div>'
    }
    else{
        alert('PARA VOTAR EM "BRANCO" NÃO PODE SER DIGITADO NENHUM NUMERO.   CASO TENHA DIGITADO ALGUN NUMERO APERTE "CORRIGE" E DEPOIS EM "BRANCO".')
    }
}

function corrige() { // BOTÃO PARA CORRIGIR E VOLTAR A ETAPA PARA =>ZERO.
    startPhase();
}

function confirma() {

    let stage = phases[initialStage];

    let confirmVote = false;

    if (votoBranco === true){
        confirmVote = true;  //confirmação do "VOTO"
        vote.push({
            stage: phases[initialStage].titulo,
            vote: 'branco'
        });
    } 
    else if(numeros.length === stage.numero){
        confirmVote = true;  //confirmação do "VOTO"
        vote.push({
            stage: phases[initialStage].titulo,
            vote: numeros
        });
    
    }
    if (confirmVote) {
        initialStage ++;
        if(phases[initialStage] !== undefined, null){
            refreshScreen();
    }
    else{
        document.querySelector('.tela').innerHTML = '<div class="aviso--gigante fim pisca">FIM</div>';
        console.log(vote);
    }
 }
}

/* ------------------ CHAMARDAS --------------- */

startPhase();

