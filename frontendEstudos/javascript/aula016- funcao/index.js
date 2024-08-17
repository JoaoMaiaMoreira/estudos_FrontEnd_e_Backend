// function parImpar (numero){
//     if (numero%2 == 0){
//         return 'Par'
//     } else{
//         return 'impar'
//     }
// }

// console.log(parImpar(123))

// function soma(n1=0, n2=0){
//     return n1 + n2
// }
 
// console.log (soma(10,10))

// function fatorial(numero){
//     if(numero == 1){
//         return 1
//     }else{ 
//         return numero * fatorial(numero-1)
//     }
// }

function fatorial(numero) {
    let fato = 1
    for(let contador = numero; contador > 1; contador --){
        fato *= contador
  
    } 
        return fato
    }

    console.log(fatorial(20))