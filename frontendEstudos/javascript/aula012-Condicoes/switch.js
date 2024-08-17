const diadasemana = new Date()
const diaseman = diadasemana.getDay()

switch(diaseman){
    case 0:
         console.log('Domingo')
         break

    case 1:
         console.log('segunda')
         break
    
    case 2:
         console.log('Terça')
         break

    case 3:
         console.log('Quarta')
         break
   
     case 4:
          console.log('Quinta')
          break
       
    case 5:
         console.log('sexta')
         break

    case 6:
         console.log('sabado')
         break

    default:
          console.log ('erro, nao existe')
          break


}