import Item from "./Item"

function List(){
    return(
        <>
        <h1>Lista</h1>
        <ul>
            <li> Primeiro Item</li>
            <li> segundo Item</li>
            <Item marca="Ferrari" ano_lancamento = {20014}/>
            <Item marca= "Uno" ano_lancamento = {1948}/>
            <item marcca= "Monza" ano_lancamento = {1970}/>
            <Item/>
        </ul>
        </>
    )
}

export default List