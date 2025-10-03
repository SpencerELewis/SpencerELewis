import { useState } from 'react'
import '../styles/App.css'
import Header from './Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <div>
        <a href="https://vite.dev" target="_blank">
        </a>
        <a href="https://react.dev" target="_blank">
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button 
          className="btn btn-primary" 
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <div>
        <h1>Scroll Test</h1>
        <h1>Scroll Test</h1>
        <h1>Scroll Test</h1>
        <h1>Scroll Test</h1>
        <h1>Scroll Test</h1>
        <h1>Scroll Test</h1>
        <h1>Scroll Test</h1>
        <h1>Scroll Test</h1>
        <h1>Scroll Test</h1>
        <h1>Scroll Test</h1>
        <h1>Scroll Test</h1>
        <h1>Scroll Test</h1>
        <h1>Scroll Test</h1>
        <h1>Scroll Test</h1>
        <h1>Scroll Test</h1>
      </div>
    </>
  )
}

export default App
