import { Link } from "react-router-dom"

const Nav = () =>{
    return(
        <nav>
            <Link to= "/"> Home </Link>
            <Link to= "/Contato"> contato </Link>
            <Link to= "/Empresa"> empresa </Link>
        </nav>
    );
};

export default Nav