import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { animateSlide } from "@/animations/AnimateSlide";
import { Variants } from "framer-motion";

export const iconVariants = (duration: any): Variants => ({
    initial: { y: -20 },
    animate: {
        y: [20, -20],
        transition: {
            duration,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse"
        }
    }
}); 


const NavBar = () => {
    return (
        <nav className=" flex sm:flex-row flex-col items-center border-b border-slate-800 justify-between py-8">
            <motion.div 
                variants={animateSlide({
                    xHidden: -100,
                    duration: 1
                })}
                initial="hidden"
                animate="visible"
                className="flex flex-shrink-0 items-center text-xl font-semibold sm:text-4xl">
                <a href="/">{"</>"} A.C.P</a>
            </motion.div>
            <div className="m-8 flex items-center justify-center gap-4 text-2xl">
                <motion.div
                    variants={animateSlide({
                        xHidden: 200,
                        duration: 1
                    })}
                    initial="hidden"
                    animate="visible"
                    className="inline-block"
                >
                    <motion.a
                        variants={iconVariants(1.3)}
                        initial="initial"
                        animate="animate"
                        whileHover={{ scale: 2 }}
                        className="inline-block transition-transform duration-300"
                        href="https://www.linkedin.com/in/sid-rico-bj%C3%B6rk/"
                    >
                        <FaLinkedin />
                    </motion.a>
                </motion.div>
                <motion.div
                    variants={animateSlide({
                        xHidden: 200,
                        duration: 1
                    })}
                    initial="hidden"
                    animate="visible"
                    className="inline-block"
                >
                    <motion.a
                        variants={iconVariants(1)}
                        initial="initial"
                        animate="animate"
                        whileHover={{ scale: 2 }}
                        className="inline-block hover:scale-150 transition-transform duration-300"
                        href="https://www.linkedin.com/in/sid-rico-bj%C3%B6rk/"
                    >
                        <FaGithub />
                    </motion.a>
                </motion.div>
            </div>
        </nav>
    )
}

export default NavBar