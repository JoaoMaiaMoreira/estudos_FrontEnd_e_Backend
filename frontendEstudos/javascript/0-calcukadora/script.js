let operacao = null
let histo = []
let resul = []



function set(value){

    const n = document.querySelector(`#n${value}`)
    resposta.innerText += n.value
    console.log(resposta.innerText.length)
    if(resposta.innerText.length >= 3){
        if(resposta.innerText.includes("+")){
            histo.push(resposta.innerText)

        }
        if(resposta.innerText.includes("-")){
            histo.push(resposta.innerText)
        }
        if(resposta.innerText.includes("/")){
            histo.push(resposta.innerText)
        }
        if(resposta.innerText.includes("*")){
            histo.push(resposta.innerText)
        }
    }
    console.log(histo, "1")

}

 function realizarOperacao(operacaoChamada){
    operacao = operacaoChamada
    resposta.innerText += operacao
 }

 function calcular(){


    const numeros = resposta.innerText.split(operacao)
    let resultado = parseInt(numeros[0]);
    for(let i = 1; i < numeros.length; i++) {
        if(operacao == "-"){ console.log('historico :>> ', historico);

            resultado = resultado - parseInt(numeros[i])
            resposta.innerText = resultado
            resul.push(resultado)
        }  
        if(operacao == "+"){
            resultado = resultado + parseInt(numeros[i])
            resposta.innerText = resultado
            resul.push(resultado)
        }  
        if(operacao == "/"){
            resultado = resultado / parseInt(numeros[i])
            resposta.innerText = resultado
            resul.push(resultado)
        }  
        if(operacao == "*"){
            resultado = resultado * parseInt(numeros[i])
            resposta.innerText = resultado
            resul.push(resultado)
        }  
    }

    const historico = document.getElementById('historico')

    console.log('historico :>> ', historico);

    const resu = document.getElementById('resu')

    console.log('resu :>> ', resu);

    
    let p = document.createElement("p") 
    p.textContent = `${histo[histo.length -1]} = ${resul[resul.length -1]};`;
    historico.appendChild(p)


}

 function apagar(){
    
    resposta.innerText = ""
    
    // const pp = document.createTextNode(resul[resul.length -1], " -");
    // resu.appendChild(pp)



    // console.log(histo.length, "coisa")
    // histo.forEach(h => {
    //     const p = document.createTextNode(h)
    //     historico.appendChild(p)
    // })
    // // console.log(p)
 }

 console.log(historico)

 