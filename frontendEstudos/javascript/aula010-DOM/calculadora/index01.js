function somar() {
    const texton1 = window.document.getElementById ('txtnumero1')
    const texton2 = window.document.getElementById ('txtnumero2')
    const resposta = window.document.getElementById('resposta') 
    const n1 = Number (texton1.value)
    const n2 = Number (texton2.value)
    const soma = n1 + n2
    resposta.innerHTML = `O resultado é ${soma}`
} 

function menos() {
    const texton1 = window.document.getElementById ('txtnumero1')
    const texton2 = window.document.getElementById ('txtnumero2')
    const resposta = window.document.getElementById('resposta') 
    const n1 = Number (texton1.value)
    const n2 = Number (texton2.value)
    const meno = n1 - n2
    resposta.innerHTML = `O resultado é ${meno}`
} 

function multi(){
    const texton1 = window.document.getElementById ('txtnumero1')
    const texton2 = window.document.getElementById ('txtnumero2')
    const resposta = window.document.getElementById('resposta')
    const n1 = Number(texton1.value)
    const n2 = Number(texton2.value)
    const mult = n1 * n2
    resposta.innerHTML = `O resultado é ${mult}`
}

function divisao(){
    const texton1 = window.document.getElementById ('txtnumero1')
    const texton2 = window.document.getElementById ('txtnumero2')
    const resposta = window.document.getElementById ('resposta')
    const n1 = Number(texton1.value)
    const n2 = Number(texton2.value)
    const divi = n1 / n2
    resposta.innerHTML = `O resultado é ${divi}`
}