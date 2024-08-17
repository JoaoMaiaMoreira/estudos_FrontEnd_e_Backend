function adicionar() {

    let number = document.querySelector('#txtnumber')
    
    if(number.value.lengh == 0){

        window.alert('ERRO, Digite um numero!')

    } else {
        const select = document.getElementById("select");
        const option = new Option(number.value, number.value);
        select.add (option);       
        

  }
}

let num = []

function soma(){
    
    const resposta = document.getElementById('resposta')
    const resposta2 = document.getElementById('resposta2')
    console.log(resposta2)
    let numeros = document.querySelector('#txtnumber')
    num.push(Number(numeros.value))

    
    let sum = 0
    let contador = 0
    for(let inicio=0; inicio < num.length; inicio++) {
        contador ++
        console.log(num[inicio])
        sum += num[inicio]
        console.log(sum)
        console.log(contador)
    }

    const medi = sum / contador

    console.log(medi)
    console.log(resposta2)
    resposta.innerHTML = `a soma de todos os valores é ${sum} e a media é ${medi} `
    resposta2.innerText= `o maior numero digitado foi ${(Math.max.apply(null, num))} e o menor numero  ${(Math.min.apply(null, num))}` 
}


