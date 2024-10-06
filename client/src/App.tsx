import { Routes, Route, Link, useLocation } from "react-router-dom"
import Home from "./pages/HomePage/Home"
import NavBar from "./components/NavBar"
import Signup from "./pages/SignupPage/Signup"
import ConfirmEmail from "./pages/ConfirmEmailPage/ConfirmEmail"
import Login from "./pages/LoginPage/Login"
import ForgotPassword from "./pages/ForgotPasswordPage/ForgotPassword"
import UpdatePassword from "./pages/ForgotPasswordPage/UpdatePassword"
import { useQuery } from "@tanstack/react-query"
import axiosInstance from "./lib/axiosInstance"
import Guide from "./pages/GuidePage/Guide"
import LiveChat from "./pages/LiveChatPage/LiveChat"
import { useEffect } from "react"
import socket from "./lib/socket"
import { useToast } from "./hooks/use-toast"
import { ArrowRight, Bell } from "lucide-react"
import { Button } from "./components/ui/button"
import Footer from "./components/Footer"
import PrivacyPolicy from "./pages/PrivacyPolicyPage/PrivacyPolicy"
import FindPages from "./pages/FindPagesPage/FindPages"
import Profile from "./pages/ProfilePage/ProfilePage"
import NotFound from "./pages/NotFound"


function App() {
  const { toast }= useToast();
  const location = useLocation();

  const currentUser = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => axiosInstance.get("/api/users/get-current-user")
  });


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  useEffect(() => {
    if (currentUser.isSuccess && !currentUser.isLoading && !currentUser.data.data.error) {
      const handleConnect = () => {
        console.log('Connected:', socket.id);
      };

      const handleDisconnect = () => {
        console.log(`User ${socket.id} disconnected`);
      };

      const handleNotification = (notification: any) => {
        const { dismiss } = toast({
          description: (
            <div className="flex flex-col items-start space-y-3">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-blue-500" />
                <span className="font-semibold text-neutral-100">{notification.Title}</span>
              </div>
              <p className="text-sm text-neutral-300">{notification.content}</p>
              <Link
                to={notification.linkUrl}
                className="group flex items-center space-x-2 text-sm font-medium text-blue-500 hover:text-blue-400 transition-colors"
              >
                <span>View</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ),
          className: " border border-neutral-800 rounded-xl shadow-lg",
          duration: 5000,
          action: (
            <Button
              variant="outline"
              size="sm"
              onClick={() => dismiss()}
              className="mt-2 text-neutral-300 hover:text-neutral-100 hover:bg-neutral-800 border-neutral-700"
            >
              Dismiss
            </Button>
          ),
        });
      };

      socket.on("connect", handleConnect);
      socket.on("disconnect", handleDisconnect);
      socket.on("notification", handleNotification);

      socket.emit("register", currentUser.data?.data.success?.id);

      return () => {
        socket.off("connect", handleConnect);
        socket.off("disconnect", handleDisconnect);
        socket.off("notification", handleNotification);
      };
    }
  }, [currentUser]);

  if (currentUser.isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-950 z-50">
        <div className="relative">
          <div className="h-32 w-32 rounded-full border-t-8 border-b-8 border-cyan-500"></div>
          <div className="absolute top-0 left-0 h-32 w-32 rounded-full border-t-8 border-b-8 border-cyan-300 animate-spin"></div>
        </div>
      </div>
    )
  };

  return (
    <div className="overflow-x-hidden text-neutral-300 selection:bg-cyan-300 selection:text-cyan-900 bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] min-h-screen">
      <div className='container mx-auto px-8'>
        <NavBar currentUser={currentUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Login/>} />
          <Route path="/confirm-email/token/:token/username/:username" element={<ConfirmEmail/>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/update-password/token/:token/email/:email" element={<UpdatePassword />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/profile/:userId" element={<Profile currentUser={currentUser} />} />
          <Route path="/livechat" element={<LiveChat currentUser={currentUser} />} />
          <Route path="/findpages" element={<FindPages />} />
          <Route path="/privacy" element={<PrivacyPolicy/>} />
          <Route path="*" element={<NotFound />} /> {}
        </Routes>
      </div>
      <Footer/>
    </div>
  )
}

export default App