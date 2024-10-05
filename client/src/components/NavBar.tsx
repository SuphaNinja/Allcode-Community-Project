import { useState } from 'react'
import { FaGithub } from "react-icons/fa"
import { motion } from "framer-motion"
import { animateSlide } from "@/animations/AnimateSlide"
import { Variants } from "framer-motion"
import { Button } from "./ui/button"
import { Link, useNavigate } from "react-router-dom"
import SearchBar from "./SearchBar"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { User, Menu, X } from "lucide-react"

export const iconVariants = (duration: number): Variants => ({
    initial: { y: -5 },
    animate: {
        y: [5, -5],
        transition: {
            duration,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse"
        }
    }
})

const NavBar = ({ currentUser }: { currentUser: any }) => {
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const logout = () => {
        localStorage.removeItem("token")
        navigate("/")
        window.location.reload()
    }

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container px-4 py-3 sm:py-4">
                <div className="flex items-center justify-between">
                    <motion.div
                        variants={animateSlide({
                            xHidden: -100,
                            duration: 1
                        })}
                        initial="hidden"
                        animate="visible"
                        className="flex items-center"
                    >
                        <Link to="/" className="text-2xl font-bold text-primary">
                            {"</>"} A.C.P
                        </Link>
                    </motion.div>

                    <motion.div
                        variants={animateSlide({
                            yHidden: 0,
                            duration: 3,
                            delay: 1
                        })}
                        initial="hidden"
                        animate="visible"
                        className="hidden sm:block flex-1 max-w-md"
                    >
                        <SearchBar />
                    </motion.div>

                    <div className="flex items-center space-x-4">
                        {currentUser.isSuccess && currentUser.data.data.success ? (
                            <motion.div
                                variants={animateSlide({
                                    yHidden: -200,
                                    duration: 1
                                })}
                                initial="hidden"
                                animate="visible"
                                className="hidden sm:flex items-center space-x-4"
                            >
                                
                                <Button asChild variant="link" size="sm">
                                    <Link to="/livechat">Live Chat</Link>
                                </Button>
                                <Link
                                    to={`/profile/${currentUser.data.data.success.id}`}
                                    className="flex items-center space-x-2 hover:underline text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
                                >
                                    <Avatar className="h-8 w-8">
                                        {currentUser.data.data.success.profileImage ? (
                                            <AvatarImage src={currentUser.data.data.success.profileImage} alt={currentUser.data.data.success.userName} />
                                        ) : (
                                            <AvatarFallback>
                                                <User className="h-4 w-4" />
                                            </AvatarFallback>
                                        )}
                                    </Avatar>
                                    <span>{currentUser.data.data.success.userName}</span>
                                </Link>
                                <Button onClick={logout} variant="link" size="sm">
                                    Sign Out
                                </Button>
                            </motion.div>
                        ) : (
                            <motion.div
                                variants={animateSlide({
                                    yHidden: -200,
                                    duration: 1
                                })}
                                initial="hidden"
                                animate="visible"
                                className="hidden sm:flex items-center space-x-2"
                            >
                                <Button asChild variant="link" size="sm">
                                    <Link to="/signup">Sign Up</Link>
                                </Button>
                                <Button asChild variant="link" size="sm">
                                    <Link to="/signin">Sign In</Link>
                                </Button>
                            </motion.div>
                        )}
                        <motion.a
                            variants={iconVariants(1.5)}
                            initial="initial"
                            animate="animate"
                            whileHover={{ scale: 1.2 }}
                            className="hidden sm:inline-block text-foreground/60 hover:text-foreground transition-colors"
                            href="https://github.com/SuphaNinja/allcode-community-project"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaGithub className="h-6 w-6" />
                        </motion.a>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="sm:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X /> : <Menu />}
                        </Button>
                    </div>
                    
                </div>
            </div>
            <div className='pb-2 mx-auto w-3/4 sm:hidden'>
                <SearchBar />
            </div>
            {/* Mobile menu */}
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="sm:hidden"
                >
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {!currentUser.isSuccess || !currentUser.data.data.success ? (
                            <>
                                <Button asChild variant="ghost" size="sm" className="w-full justify-start">
                                    <Link to="/signup">Sign Up</Link>
                                </Button>
                                <Button asChild variant="ghost" size="sm" className="w-full justify-start">
                                    <Link to="/signin">Sign In</Link>
                                </Button>
                            </>
                        ) : (
                            <div className='flex justify-evenly'>
                                <Button asChild variant="ghost" size="sm" className="w-full justify-start">
                                    <Link to="/profile">Profile</Link>
                                </Button>
                                <Button asChild variant="ghost" size="sm" className="w-full justify-start">
                                    <Link to="/livechat">Live Chat</Link>
                                </Button>
                                <Button onClick={logout} variant="ghost" size="sm" className="w-full justify-start">
                                    Sign Out
                                </Button>
                            </div>
                        )}
                        <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start"
                        >
                            <a
                                href="https://github.com/SuphaNinja/allcode-community-project"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center"
                            >
                                <FaGithub className="mr-2 h-4 w-4" />
                                GitHub
                            </a>
                        </Button>
                    </div>
                </motion.div>
            )}
        </nav>
    )
}

export default NavBar