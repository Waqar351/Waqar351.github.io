import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Research from './pages/Research/Research'
import Projects from './pages/Projects/Projects'
import VisualMathLab from './pages/VisualMathLab/VisualMathLab'
import Publications from './pages/Publications/Publications'
import About from './pages/About/About'
import CV from './pages/CV/CV'
import Contact from './pages/Contact/Contact'

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/research" element={<Research />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/visual-math-lab" element={<VisualMathLab />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/about" element={<About />} />
            <Route path="/cv" element={<CV />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
