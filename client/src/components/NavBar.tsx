import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { animateSlide } from "@/animations/AnimateSlide";
import { Variants } from "framer-motion";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

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
            <div className="m-8 flex sm:flex-row flex-col items-center justify-center gap-4 text-2xl">
                <div>
                    <motion.div
                        variants={animateSlide({
                            yHidden: -200,
                            duration: 1
                        })}
                        initial="hidden"
                        animate="visible"
                        className="inline-block"
                    >
                        <Button asChild variant={"link"}>
                            <Link to="/signup">
                                Sign Up
                            </Link>
                        </Button>
                    </motion.div>
                    <motion.div
                        variants={animateSlide({
                            yHidden: -200,
                            duration: 1
                        })}
                        initial="hidden"
                        animate="visible"
                        className="inline-block"
                    >
                        <Button asChild variant={"link"}>
                            <Link to="/signin">
                                Sign In
                            </Link>
                        </Button>
                    </motion.div>
                </div>
                <div className="flex gap-4">
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
                            href="https://github.com/SuphaNinja/allcode-community-project"
                        >
                            <FaGithub />
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar