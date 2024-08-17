// import {useState} from 'react'
// import SeuNome from './componentes/SeuNome.';
// import Salve from './componentes/Salve';


import './App.css';
// import { Outlet } from 'react-router-dom';
// import Nav from './componentes/Nav';
// import Estrutura from './componentes/Estrutura';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Aba1 from './pages/Aba1';
import Aba2 from './pages/Aba2';
import Caminho from './ccomponent/Caminho';


function App() {
  // const[nome, setNome] = useState()

  return (
    // <div className="App">
    //      <h1>State Lifte</h1>
    //      {/* <SeuNome setNome = {setNome}/>
    //      <Salve nome = {nome}/> */}
    //      {/* <Evento numero = "1"/>
    //      <Formulario/>
    //      <Condicional/> */}
    //       {/* <Hello /2
    //       <Frase />
    //       <Frase />
    //       { gurizada.map((guri) => {

    //         return(<MyName nome={guri}/>)

    //       })}
    //       <Pessoa 
    //       nome="Rodrigo"
    //       idade= "28"
    //       profissao= "Programador"
    //       foto= "https://via.placeholder.com/150"
    //       />

    //       <List /> */}

    //   </div>

        <Router>
          <Routes>
            <Route path= "/" element={<Aba1 />}/> 
            <Route path=  './pages/Aba2' element={<Aba2 />}/> 
          </Routes>
          <Caminho/>
        </Router>

  )
}
export default App;
