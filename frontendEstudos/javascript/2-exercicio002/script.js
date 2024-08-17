function contar(){
    const inicio = document.getElementById('txtInicio')
    const fim = document.getElementById('txtFim')
    const etapa = document.getElementById('txtPasso')
    const resposta = document.getElementById('resposta')

    if(inicio.value.length == 0){
          window.alert('Erro, escreva um numero!')
    } else {
        resposta.innerHTML = 'contando: '
        let inici = Number(inicio.value)
        let fi = Number(fim.value) 
        let etap = Number(etapa.value)
   
        for(let cont = inici; cont <= fi; cont += etap){
           // setTimeout(() => {
                resposta.innerHTML += `${cont}${cont >= fi ? '.' : ', '} `
            //}// cont * 1000)
        }
     }
    }
        
