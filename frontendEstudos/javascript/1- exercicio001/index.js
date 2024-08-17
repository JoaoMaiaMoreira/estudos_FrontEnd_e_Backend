function carregar(){

const msg = window.document.getElementById('msg')
const img = window.document.getElementById('imagem')
const boa = window.document.getElementById('boa')
const data = new Date()
//const hora = data.getHours() // pega a hora atual
const hora = 13 //<- editar para ver o resultado

msg.innerHTML = `Agora são ${hora} horas. `

    if (hora >= 0 && hora < 12){
        img.src = 'dia.jpg'
        document.body.style.background =  '#1cb82b'
        boa.innerHTML= 'Bom dia!'
    } else if (hora >= 12 && hora < 18){
        img.src = 'tarde.jpg'
        document.body.style.background =  '#df840d'
        boa.innerHTML = 'Boa tarde!'
    } else{
        img.src = 'lua.jpg'
        document.body.style.background =  '#000000'
        boa.innerHTML = 'boa noite'   
    }

}