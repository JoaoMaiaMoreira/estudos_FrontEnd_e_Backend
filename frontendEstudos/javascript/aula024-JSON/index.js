const carro  = {
    marca: "fiat",
    modelo: "uno",
    ano: 2001
}

let texto = JSON.stringify(carro);

document.getElementById('local').innerHTML = texto