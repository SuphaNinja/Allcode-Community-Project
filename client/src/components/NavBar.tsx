import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { animateSlide } from "@/animations/AnimateSlide";
import { Variants } from "framer-motion";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import Position from "./ui/coolText";
import SearchBar from "./SearchBar";

export const iconVariants = (duration: number): Variants => ({
    initial: { y: -20 },
    animate: {
        y: [5, -5],
        transition: {
            duration,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse"
        }
    }
});

const NavBar = ({ currentUser }: { currentUser: any }) => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
        window.location.reload();
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b">
            <div className="container px-4 py-2 sm:py-4">
                <div className="flex flex-col sm:flex-row items-center justify-between">
                    <div className="flex w-full sm:w-auto justify-between items-center mb-4 sm:mb-0">
                        <motion.div
                            variants={animateSlide({
                                xHidden: -100,
                                duration: 1
                            })}
                            initial="hidden"
                            animate="visible"
                            className="flex flex-shrink-0 items-center"
                        >
                            <Link to="/" className="text-2xl font-bold text-primary">
                                {"</>"} A.C.P
                            </Link>
                        </motion.div>
                        <motion.div
                            variants={animateSlide({
                                xHidden: 200,
                                duration: 1
                            })}
                            initial="hidden"
                            animate="visible"
                            className="sm:hidden"
                        >
                            <motion.a
                                variants={iconVariants(1)}
                                initial="initial"
                                animate="animate"
                                whileHover={{ scale: 1.2 }}
                                className="inline-block text-foreground/60 hover:text-foreground transition-colors"
                                href="https://github.com/SuphaNinja/allcode-community-project"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaGithub className="h-6 w-6" />
                            </motion.a>
                        </motion.div>
                    </div>

                    <motion.div
                        variants={animateSlide({
                            yHidden: 0,
                            duration: 3,
                            delay: 1
                        })}
                        initial="hidden"
                        animate="visible"
                        className="w-full flex sm:w-auto sm:flex-1 sm:mx-4 mb-4 sm:mb-0"
                    >
                        <SearchBar />
                    </motion.div>
                    
                    <div className="flex items-center justify-center sm:justify-end w-full sm:w-auto space-x-2 sm:space-x-4">
                        {currentUser.isSuccess && currentUser.data.data.success ? (
                            <>
                                <motion.div
                                    variants={animateSlide({
                                        yHidden: -200,
                                        duration: 1
                                    })}
                                    initial="hidden"
                                    animate="visible"
                                    className="flex flex-col sm:flex-row gap-12 space-x-2 sm:space-x-4"
                                >
                                    <Link to="/profile" className="text-sm sm:text-base">
                                        <Position text1={currentUser.data.data.success.userName} text2={currentUser.data.data.success.userName} />
                                    </Link>
                                    <div className="flex">
                                        <Button onClick={logout} variant="link" size="sm" className="text-sm sm:text-base">
                                            Sign Out
                                        </Button>
                                        <Button asChild variant="link" size="sm" className="text-sm sm:hidden sm:text-base">
                                           <Link to="/livechat">
                                            Live Chat
                                           </Link>
                                        </Button>
                                    </div>
                                </motion.div>
                            </>
                        ) : (
                            <>
                                <motion.div
                                    variants={animateSlide({
                                        yHidden: -200,
                                        duration: 1
                                    })}
                                    initial="hidden"
                                    animate="visible"
                                    className="flex items-center space-x-2"
                                >
                                    <Button asChild variant="ghost" size="sm">
                                        <Link to="/signup" className="text-sm sm:text-base">Sign Up</Link>
                                    </Button>
                                    <Button asChild variant="ghost" size="sm">
                                        <Link to="/signin" className="text-sm sm:text-base">Sign In</Link>
                                    </Button>
                                </motion.div>
                            </>
                        )}
                        <motion.div
                            variants={animateSlide({
                                xHidden: 200,
                                duration: 1
                            })}
                            initial="hidden"
                            animate="visible"
                            className="hidden sm:block"
                        >
                            <motion.a
                                variants={iconVariants(1)}
                                initial="initial"
                                animate="animate"
                                whileHover={{ scale: 1.2 }}
                                className="inline-block text-foreground/60 hover:text-foreground transition-colors"
                                href="https://github.com/SuphaNinja/allcode-community-project"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaGithub className="h-6 w-6" />
                            </motion.a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;