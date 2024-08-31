import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import SignUpForm from "./SignupForm";
import { animateSlide } from "@/animations/AnimateSlide";
import { Button } from "@/components/ui/button";




export default function SignUp() {
    
    return (
        <div className="mt-6 sm:mt-12">
            <div className="text-center border-b mb-2 border-slate-900 w-1/2 mx-auto pb-2">
                Already have an account? 
                <Button asChild variant={"link"}>
                    <Link to="/signin">Sign In</Link>
                </Button>
            </div>
            <SignUpForm />
        </div>
    );
}


const Transition = () => {

    const [changeOpacity, setChangeOpacity] = useState(false);
    const navigate = useNavigate();
    const test = () => {
        setChangeOpacity(!changeOpacity)
        setTimeout(() => {
            navigate("/")
        }, 2000);
    };
    return (
        <button onClick={test}><div className="absolute overflow-x-hidden top-0 left-0 bg-slate-950 h-screen w-screen">
            <motion.div
                initial={{ x: '-100vw' }}
                animate={changeOpacity ? { x: 0 } : {}}
                transition={{ duration: 2 }}
                className={`${changeOpacity ? "" : "hidden"} overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900 bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] min-h-screen`}
            >
                <div className='container mx-auto px-8'>
                    <NavBar />
                </div>
            </motion.div>
            </div>
        </button>
    )
}