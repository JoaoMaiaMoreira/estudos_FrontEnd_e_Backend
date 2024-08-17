import {useState} from 'react'

function Condicional(){

    const[email, setEmail] = useState()
    const[userEmail, setUserEmail] = useState()

    function enviarEmail(e){
        e.preventDefault()
        console.log('testando')
        setUserEmail(email)
        console.log(userEmail)
    }

    function limparEmail(){
        setUserEmail()
    }

    return(
        <>
         <h2>Cadastre o seu e-mail: </h2>
         <form>
            <input 
            type="email"
            placeholder="Digite o seu e-mail"
            onChange={(e)=> setEmail(e.target.value)}
            />
            <button type="submit" onClick={enviarEmail}>
                Enviar e-mail
            </button>

            {userEmail && (
                <div>
                    <p>O e-mail do usuario é: {userEmail}</p>
                    <button onClick= {limparEmail}>Limpar email</button>
                </div>
            )}
         </form>
        </>

    )

}

export default Condicional