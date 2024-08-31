import { Routes, Route } from "react-router-dom"
import Home from "./pages/HomePage/Home"
import NavBar from "./components/NavBar"
import Signup from "./pages/SignupPage/Signup"
import ConfirmEmail from "./pages/ConfirmEmailPage/ConfirmEmail"

function App() {

  return (
    <div className="overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900 bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] min-h-screen">
      <div className='container mx-auto px-8'>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/confirm-email/token/:token/username/:username" element={<ConfirmEmail />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
