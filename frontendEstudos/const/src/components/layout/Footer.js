import {FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa'
import styles from './Footer.module.css'

function Footer(){
    return(
        <footer  className={styles.list}>
            <ul  className={styles.social_list}>
                <li>
                    <FaFacebook/>
                </li>
                
                <li>
                    <FaInstagram/>
                </li>
                <li>
                    <FaLinkedin/>
                </li>
             </ul>
             <p className = {styles.copy_right}>
                <span>Youx_Costs</span> &copy;2023
             </p>
        </footer>
    )
}

export default Footer