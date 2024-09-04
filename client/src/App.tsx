import { Routes, Route } from "react-router-dom"
import Home from "./pages/HomePage/Home"
import NavBar from "./components/NavBar"
import Signup from "./pages/SignupPage/Signup"
import ConfirmEmail from "./pages/ConfirmEmailPage/ConfirmEmail"
import Login from "./pages/LoginPage/Login"
import ForgotPassword from "./pages/ForgotPasswordPage/ForgotPassword"
import UpdatePassword from "./pages/ForgotPasswordPage/UpdatePassword"
import "./index.css"
import { useQuery } from "@tanstack/react-query"
import axiosInstance from "./lib/axiosInstance"
import Guide from "./pages/GuidePage/Guide"

function App() {

  const currentUser = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => axiosInstance.get("/api/users/get-current-user"),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  return (
    <div className="overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900 bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] min-h-screen">
      <div className='container mx-auto px-8'>
        <NavBar currentUser={currentUser}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Login currentUser={currentUser} />} />
          <Route path="/confirm-email/token/:token/username/:username" element={<ConfirmEmail currentUser={currentUser} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/update-password/token/:token/email/:email" element={<UpdatePassword />} />
          <Route path="/guide" element={<Guide />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
