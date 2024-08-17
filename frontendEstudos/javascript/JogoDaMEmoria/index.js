let click1 = 0
let click2= 0
let jaClicou = false
let ParaCima = false
let flip1 = false
let flip2 = false
let Guardar = [{
    id: "cardTras1",
    nome: "Hero Avian",
    estado: "abaixado",
    imagem: "url('img/Hero.jpg')"
}, {
    id: "cardTras2",
    nome: "Mago Negro",
    estado: "abaixado",
    imagem: "url('img/Mago.jpg')"
},{
    id: "cardTras3",
    nome: "Guerreiro Sucata",
    estado: "abaixado",
    imagem: "url('img/yugioh_lc5d-en029_en.jpg')"
},{
   id: "cardTras10",
    nome: "Hero Avian",
    estado: "abaixado",
    imagem: "url('img/Hero.jpg')"
}, {
    id: "cardTras20",
    nome: "Mago Negro",
    estado: "abaixado",
    imagem: "url('img/Mago.jpg')"
},{
    id: "cardTras30",
    nome: "Guerreiro Sucata",
    estado: "abaixado",
    imagem: "url('img/yugioh_lc5d-en029_en.jpg')"
}]

function Virar(cardNum) {

    const card = document.querySelector(`#cardTras${cardNum}`);
    const pontuacao = document.querySelector("#pontuacao");

    switch (cardNum) {
        case 1:
            card.style.backgroundImage = "url('img/Hero.jpg')";
            break;

        case 2:
            card.style.backgroundImage = "url('img/Mago.jpg')";
            break;

        case 3:
            card.style.backgroundImage = "url('img/yugioh_lc5d-en029_en.png')";
            break;

        case 10:
            card.style.backgroundImage = "url('img/Hero.jpg')";
            break;
        
        case 20:
            card.style.backgroundImage = "url('img/Mago.jpg')";
        break;
    
        case 30:
            card.style.backgroundImage = "url('img/yugioh_lc5d-en029_en.png')";
         break;

        default: 
        return null;

    }

    card.style.backgroundRepeat = "no-repeat";
    card.style.backgroundSize = "100%";
    console.log(card.value);

    Guardar.forEach(organizacao => {
        
        if(card.id == organizacao.id && organizacao.estado !== "levantado"){
            console.log("TA dando certo");
        
     if(click1 === 0){
        click1 = parseInt(card.value);
        organizacao.estado = "flip"
        flip1 = true 
       }
    
     if(click1 !== 0 && jaClicou === true){
        console.log('clicou:>> ', click2); 
        click2 = parseInt(card.value);
        flip2 = true
     }else{
           jaClicou = true;
           console.log('jaClicou :>> ', jaClicou);
        }

     console.log('click1 :>> ', click1);
     console.log('click2 :>> ', click2);

     if(click1 !== 0 && click2 !== 0  && click1 == click2){
        pontuacao.innerHTML = "Ganhou"
        click1 = 0
        click2 = 0
        jaClicou = false
     }
     
     if(click1 !== 0 && click2 !== 0 && click1 !== click2 && flip1 == true && flip2 == true){
          pontuacao.innerHTML = "Perdeu"
            setInterval(function() {
            card.style.backgroundImage = 'url("img/images.jpeg")'
             console.log("FlipCards ok")
            }, 1000);
          
          click1 = 0
          click2 = 0 
          jaClicou = false
        
        } 

    }})


}



// function defesa(){
//     card.style.backgroundImage = 'url("img/images.jpeg")'
//     alert("dois clicque")
    
// }

// function Virar2(){
//     const card = document.querySelector("#cardTras2");
//    
//     card.style.backgroundRepeat = "no-repeat"
//     card.style.backgroundSize = "100%"
//     console.log(card.value)
// }

// function Virar3(){
//     const card = document.querySelector("#cardTras");
//     card.style.backgroundImage = "url('img/JunkWarrior-SDSE-PT-C-1E.webp)";
//     card.style.backgroundRepeat = "no-repeat"
//     card.style.backgroundSize = "100%"
//     console.log(card.value)
// }

//remover as dives e somar elas