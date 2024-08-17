let num = [9, 8, 1, 3, 5]

num.sort()

num.push(1)

console.log( `os numeros sao ${num}`)

console.log(`O vetor tem ${num.length} posicoes`)

console.log(`O primeiro valor é ${num[0]}`)

console.log("")

for(let inicio=0; inicio < num.length; inicio++) {
    console.log(num[inicio])
}