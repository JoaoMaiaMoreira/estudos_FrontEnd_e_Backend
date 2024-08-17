function OutraLIsta({itens}){
    return(
        <>
            <h3>Lista Randola</h3>
            {itens.length > 0 ?(
                itens.map((item, index)=> (
                <p key={index}>{item}</p>
            ))):(
                <p>Nao tem itens</p>
            )}


        </>
    )
}

export default OutraLIsta