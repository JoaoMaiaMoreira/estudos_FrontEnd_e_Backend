import { Link } from "react-router-dom"
function Caminho(){
    return(
        <header>
            <nav>
            <li><Link to = "/" > aba1 </Link>  </li>
       <li> <Link to = "/Aba2" > aba2 </Link> </li> 
            </nav>
        
        </header>
    )
}
export default Caminho