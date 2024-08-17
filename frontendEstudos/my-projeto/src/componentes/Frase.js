import styles from './Frase.module.css'

function Frase(){
    return(
        <div className = {styles.fraseContainer}>
            <p className ={styles.fraseContent} >Frase rapida</p>
        </div>
    )
}

export default Frase