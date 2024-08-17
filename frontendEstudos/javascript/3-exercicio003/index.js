// const numero = document.querySelector("#txtnumero")
// const resultado = document.querySelector("#resultado")
// const tabuada = () => {
//     console.log(numero.value)
//     for(let i = 1; i <= 10; i++){
//         const li = document.createElement("li")
//         console.log("ok") 
//         resultado.appendChild(li)
//         li.innerText = `${numero.value} x ${i} = ${numero.value * i}`
//     }
// }


const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const numero = document.querySelector("#txtnumero")
const resultado = document.querySelector("#resultado")
const tabuada = () => {
    resultado.innerHTML = ""
    console.log(numero.value)
    numeros.forEach((n, i) => {
        const li = document.createElement("li")
        console.log(i + 1) 
        resultado.appendChild(li)
        li.innerText = `${numero.value} x ${n} = ${numero.value * n}`
    })
}

const frutas = ["maçã", "uva"]
frutas.forEach((fruta, index) => {
    console.log(fruta, index)
})