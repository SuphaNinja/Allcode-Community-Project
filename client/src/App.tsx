import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import NavBar from "./components/NavBar"

function App() {

  return (
    <div className="overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900">
      <div className='fixed top-0 -z-10 h-full w-full'></div>
      <div className="fixed top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className='container mx-auto px-8'>
      <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<Home />} />
          <Route path="/Contact" element={<Home />} />  
        </Routes> 
      </div>
    </div>


  )
}

export default App
