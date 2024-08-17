function embaralhar(arr) {
    // Loop em todos os elementos
for (let i = arr.length - 1; i > 0; i--) {
        // Escolhendo elemento aleatório
    const j = Math.floor(Math.random() * (i + 1));
    // Reposicionando elemento
    [arr[i], arr[j]] = [arr[j], arr[i]];
}
// Retornando array com aleatoriedade
return arr;
}

let guardar = [{
    id: "cardTras1",
    nome: "Hero Avian",
    estado: "abaixado",
    imagem: "url('img/Hero.jpg')"
}
, {
    id: "cardTras2",
    nome: "Mago Negro",
    estado: "abaixado",
    imagem: "url('img/Mago.jpg')"
},
{
   id: "cardTras10",
    nome: "Hero Avian",
    estado: "abaixado",
    imagem: "url('img/Hero.jpg')"
}, {
    id: "cardTras20",
    nome: "Mago Negro",
    estado: "abaixado",
    imagem: "url('img/Mago.jpg')"
}]

imagem = ['img/Mago.jpg', 'img/Hero.jpg'];

const cartasEmbaralhadas = embaralhar(guardar)

cartasEmbaralhadas.forEach(contador => {
    let botao = document.createElement('BUTTON')
    console.log('botao :>> ', botao);
    botao.onclick = function(){
        // botao.style.backgroundImage =  Math.floor(Math.random() * (contador + 1));
        // Math.floor(Math.random() * guardar.length)
       
    }
    
    document.body.appendChild(botao);

})

// for(let contador = 1; contador <= 6; contador++){


// } 