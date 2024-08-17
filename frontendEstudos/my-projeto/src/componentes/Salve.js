function Salve({nome}){

    function gerarSalve(algumNome){
        return `oi, ${algumNome}, joia?`
    }


    return(
        <>
            <p>{gerarSalve(nome)}</p>
        </>
    )
}

export default Salve