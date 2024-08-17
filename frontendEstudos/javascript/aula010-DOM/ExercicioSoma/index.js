function somar() {
    const tn1 = window.document.getElementById('txtn1')
    const tn2 = window.document.querySelector('input#txtn2')
    const res = window.document.getElementById('res') 
    const n1 = Number(tn1.value)
    const n2 = Number(tn2.value)
    const soma = n1 + n2
    res.innerHTML = `a soma é ${soma}`
    
}
