import Button from "./evento/Button"


function Evento({ numero }){

    function myEvento(){
        alert(`THE CLICK! ${numero}`)
        alert('meu eventoooooo')
    }

    function my2Evento(){
        alert('Ativando o segundo evento!')
    } 

    return(
        <>
            <p>Clique!Aqui tem um evento:</p>
            <Button event={myEvento} text = "Primeiro evento" />
            <Button event={my2Evento} text = "Segundo evento"/>
            <button onClick={myEvento}> CLICK! </button>
        </>
    )
}

export default Evento