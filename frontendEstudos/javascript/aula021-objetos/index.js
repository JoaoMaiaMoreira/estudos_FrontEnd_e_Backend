const carro = {
    marca: "ford",
    modelo:"ka", 
    ano: 2015, 
    placa: "abc-1234",
    buzina: function(){ alert('biiiiiiiiiiiii')},
    completo: function(){
        return "mmarca é" +this.marca+ "modelo é " + this.modelo 
    }
}

    // console.log(carro)
    // console.log(carro.marca)

    // carro.buzina();
console.log(carro.completo)