
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { animateSlide } from "@/animations/AnimateSlide";
import { Variants } from "framer-motion";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import Position from "./ui/coolText";
import SearchBar from "./SearchBar";


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

const NavBar = ({currentUser}:any) => {

    const logout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    return (
        <nav className=" flex sm:flex-row flex-col items-center border-b border-slate-800 justify-between py-0 pt-4 sm:py-4">
            <motion.div 
                variants={animateSlide({
                    xHidden: -100,
                    duration: 1
                })}
                initial="hidden"
                animate="visible"
                className="flex flex-shrink-0 items-center text-3xl font-semibold sm:text-4xl"
            >
                <a href="/">{"</>"} A.C.P</a>
            </motion.div>
            <motion.div
                variants={animateSlide({
                    yHidden: 0,
                    duration: 3,
                    delay: 1
                })}
                initial="hidden"
                animate="visible"
                className="sm:block hidden"
            >
                <SearchBar />
            </motion.div>
            <div className="m-8 flex sm:flex-row flex-col items-center justify-center gap-4 text-2xl">  
                <div>
                    {currentUser.isSuccess && currentUser.data.data.success ? (
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex sm:flex-row flex-col gap-8">
                                <motion.div
                                    variants={animateSlide({
                                        yHidden: -200,
                                        duration: 1
                                    })}
                                    initial="hidden"
                                    animate="visible"
                                    className="inline-block"
                                >
                                    <div className="sm:mr-12 mb-6">
                                        <Position to="/profile" text1={currentUser.data.data.success.userName} text2={currentUser.data.data.success.userName} />
                                    </div>
                                </motion.div>
                            </div>
                            <div className="flex gap-4 sm:mt-0 mt-4 items-center justify-center">
                                <motion.div
                                    variants={animateSlide({
                                        yHidden: -200,
                                        duration: 1
                                    })}
                                    initial="hidden"
                                    animate="visible"
                                    className="inline-block"
                                >
                                    <Button onClick={logout} variant={"link"} className="text-base">
                                        Sign Out
                                    </Button>
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
                                        <FaGithub className="sm:text-4xl text-2xl" />
                                    </motion.a>
                                </motion.div>
                            </div>
                        </div>
                    ) : (
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
                                <FaGithub className="sm:text-4xl text-2xl" />
                            </motion.a>
                        </motion.div>
                    </div>
                    )}
                </div>
                <motion.div 
                    variants={animateSlide({
                        yHidden: -200,
                        duration: 1
                    })}
                    initial="hidden"
                    animate="visible"
                    className="sm:hidden">
                    <SearchBar />
                </motion.div>
            </div>
        </nav>
    )
}

export default NavBar