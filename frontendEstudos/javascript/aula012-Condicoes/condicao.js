let horaatual = new Date()// "new DAte" serve para pegar a hora atual, do momento
const hora = horaatual.getHours()
console.log(`A hora atual é ${hora}. `)
if (hora < 12){
    console.log('Bom dia')
} else if (hora <= 18) {
    console.log('Boa tarde')
} else {
    console.log('Boa noite!')
}

