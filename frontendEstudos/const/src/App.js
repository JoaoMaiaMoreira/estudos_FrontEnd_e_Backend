import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import NewProject from './components/pages/NewProject';
import Projects from './components/pages/Projects';
import Company from './components/pages/Company';
import Container from './components/layout/Container';
import Rota from './components/layout/Rota';
import Footer from './components/layout/Footer'

function App() {
  return (
    <>
      <Router>
        <Rota />
        <Container customClass="min-height">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/company" element={<Company />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/newproject" element={<NewProject />} />
            <Route exact path="/projects" element={<Projects />} />
          </Routes>
        </Container>
        <div>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
