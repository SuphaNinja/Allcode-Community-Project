import { animateSlideWhenScrolling } from "@/animations/AnimateSlideWhenScrolling";
import { iconVariants } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

function HomeFooter() {
  return (
        <footer className=" text-center py-8">
            <div className="container mx-auto px-4">
                <div className="mb-8 flex flex-col gap-4">
                    <motion.p
                        variants={animateSlideWhenScrolling({
                            yHidden: -100,
                            xVisible: 0,
                            duration: 1,
                            delay: 0
                        })}
                        initial="hidden"
                        whileInView="visible"
                        className="text-neutral-300 text-md  sm:text-lg"
                    >
                        Welcome to the Allcode Community Project.
                    </motion.p>
                    <motion.p
                        variants={animateSlideWhenScrolling({
                            xHidden: 100,
                            xVisible: 0,
                            duration: 1,
                            delay: 0
                        })}
                        initial="hidden"
                        whileInView="visible"
                      className="text-neutral-300 text-sm sm:text-lg"
                    >
                        Discover and contribute to a creative space where everyone can share their unique projects and ideas.
                    </motion.p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                    <motion.div
                        variants={animateSlideWhenScrolling({
                            xHidden: -100,
                            xVisible: 0,
                            duration: 1,
                            delay: 0
                        })}
                        initial="hidden"
                        whileInView="visible"
                        className="flex gap-4"
                    >
                        <Button asChild variant="link">
                            <a href="/signup">Sign Up</a>
                        </Button>
                        <Button asChild variant="link">
                            <a href="/signin">Sign In</a>
                        </Button>
                    </motion.div>
                    <motion.div
                        variants={animateSlideWhenScrolling({
                            xHidden: 100,
                            xVisible: 0,
                            duration: 1,
                            delay: 0
                        })}
                        initial="hidden"
                        whileInView="visible"
                        className="flex gap-4"
                    >
                        <Button asChild variant="link">
                            <a href="https://www.allcode.co/">
                                Allcode Website
                            </a>
                        </Button>
                    </motion.div>
                </div>
                <motion.div
                    variants={animateSlideWhenScrolling({
                        xHidden: 100,
                        xVisible: 0,
                        duration: 1,
                        delay: 0
                    })}
                    initial="hidden"
                    whileInView="visible"
                    className="flex justify-center"
                >
                    <motion.a
                        variants={iconVariants(1)}
                        initial="initial"
                        animate="animate"
                        whileHover={{ scale: 1.5 }}
                        className=" transition-transform duration-300"
                        href="https://github.com/SuphaNinja/allcode-community-project"
                    >
                        <FaGithub className="text-3xl" />
                    </motion.a>
                </motion.div>
            </div>
        </footer>


  )
}

export default HomeFooter;