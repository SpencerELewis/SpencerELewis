import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Projects from './components/Projects'
import Resume from './components/Resume'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={
          <div className="container py-5">
            <h1>Welcome</h1>
            <p>This is the home page.</p>
          </div>
        } />
        <Route path="/projects" element={<Projects />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </Router>
  )
}

export default App
