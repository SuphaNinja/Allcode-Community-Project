import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

function HomeHeader() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.5,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.6, -0.05, 0.01, 0.99]
            }
        }
    };

    const handleScroll = () => {
        const targetElement = document.getElementById('about');
        if (targetElement) {
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            const startPosition = window.scrollY;
            const distance = targetPosition - startPosition;
            const duration = 1500;
            let start: number | null = null;

            const animation = (currentTime: number) => {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            };

            const ease = (t: number, b: number, c: number, d: number) => {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            };

            requestAnimationFrame(animation);
        }
    };

    return (
        <motion.div
            className="flex flex-col justify-center items-center border-b border-neutral-900 py-16 md:py-32 px-4 md:px-8 bg-gradient-to-b from-background to-background/80"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="flex flex-col justify-evenly text-center gap-8 md:gap-12 max-w-4xl">
                <motion.h1
                    variants={itemVariants}
                    className="text-2xl tracking-tighter font-light md:text-4xl text-primary/80"
                >
                    Welcome to the
                </motion.h1>
                <motion.h2
                    variants={itemVariants}
                    className='bg-gradient-to-r font-bold from-pink-400 via-purple-500 to-indigo-500 bg-clip-text text-4xl md:text-6xl lg:text-7xl tracking-tight text-transparent'
                >
                    Allcode Community Project
                </motion.h2>
                <motion.p
                    variants={itemVariants}
                    className="text-xl font-light tracking-tight md:text-2xl text-primary/90"
                >
                    Where your creativity comes to life!
                </motion.p>
                <motion.div
                    variants={itemVariants}
                    className="mt-8"
                >
                    <Button
                        size="lg"
                        onClick={handleScroll}
                        className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                    >
                        <span className="mr-2">Learn More</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 inline-block"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                        </svg>
                    </Button>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default HomeHeader