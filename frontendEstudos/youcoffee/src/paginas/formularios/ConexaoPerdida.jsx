import styles from './ConexaoPerdida.module.css'
import { RxReload } from "react-icons/rx";

function ConexaoPerdida({handleOnClick}) {
    return (
        <div className={styles.boxConexaoPerdida}>
            <span>Conexão Perdida, verifique sua conexão e tente novamente</span>
            <button onClick={(e) => handleOnClick(e)}><RxReload/></button>
          </div>
    )
} export default ConexaoPerdida