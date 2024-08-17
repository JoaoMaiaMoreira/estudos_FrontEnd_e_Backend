let a = window.document.getElementById ('lugar')     
a.addEventListener('click', clicar)
a.addEventListener('mouseenter', entrar)
a.addEventListener('mouseout', sair)



function clicar() {
    a.innerText = 'clicou!'
    a.style.background = 'green'
}

function entrar() {
     a.innerText = 'Entrou!'
     a.style.background = 'yellow'
}

function sair(){
    a.innerText = 'saiu'
    a.style.background = 'blue'
}