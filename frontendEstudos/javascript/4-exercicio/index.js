function fatorial(){
    const fat = document.getElementById('txtnumero')
    const resposta = document.getElementById('resposta')
    let fato = parseInt(fat.value)

    for(let contador = fato -1; contador > 1; contador --){
        fato *= contador
        console.log(contador, fat, resposta, fato);
    }
    
    resposta.innerText = `o resultado é ${fato}`

    console.log('fat :>> ', fat);

}