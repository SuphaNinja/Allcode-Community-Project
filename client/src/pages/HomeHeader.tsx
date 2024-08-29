import { animateSlide } from "@/animations/AnimateSlide";
import { motion } from "framer-motion";

function HomeHeader() {
    return (
        <div className="flex flex-col justify-center items-center border-b border-neutral-900 py-12 md:py-32">
            <div className="flex flex-col justify-evenly text-center gap-12 md:gap-16">
                <motion.h1
                    variants={animateSlide({
                        xHidden: -200,
                        delay: 0.5,
                        duration: 0.7
                    })}
                    initial="hidden"
                    animate="visible"
                    className="text-2xl tracking-tighter font-extralight md:text-4xl"
                >
                    Welcome to the
                </motion.h1>
                <motion.h2
                    variants={animateSlide({
                        xHidden: 200,
                        delay: 1,
                        duration: 1
                    })}
                    initial="hidden"
                    animate="visible"
                    className='bg-gradient-to-r font-semibold from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-4xl md:text-6xl tracking-tight text-transparent'
                >
                    Allcode Community Project
                </motion.h2>
                <motion.p
                    variants={animateSlide({
                        yHidden: 70,
                        delay: 1.2,
                        duration: 1
                    })}
                    initial="hidden"
                    animate="visible"
                    className="text-xl font-extralight tracking-tight md:text-2xl"
                >
                    Where your creativity comes to life!
                </motion.p>
            </div>
        </div>
    )
}

export default HomeHeader