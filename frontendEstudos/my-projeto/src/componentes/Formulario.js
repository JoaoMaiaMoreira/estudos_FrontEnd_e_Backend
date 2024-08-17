import{ useState } from 'react'

function Formulario(){
    
    function cadastrarUsuario(e){
        e.preventDefault()
        console.log(name)
        console.log("Cadastrou o usuario")
        console.log(`Usuario ${name} foi cadastrado com a senha ${password}`)
    }

    const [name, setName] = useState()
    const [password, setPassword] = useState()
    return(
        <div>
            <h1> Meu cadastro: </h1>
            <form onSubmit={cadastrarUsuario} action='https://youtu.be/dQw4w9WgXcQ?si=g8JXfGE78ytuoXaI'>
                <div>
                    <label htmlFor ="name"> Nome: </label>
                    <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Escreve alguma coisa"
                    onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                <label htmlFor ="password"> Senha: </label>
                    <input 
                    type="password"
                    id="password" 
                    name="password"
                     placeholder="Digite sua senha" 
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <input type="submit" value="Cadastrar"/>
                </div>
            </form>
        </div>
    )
}

export default Formulario