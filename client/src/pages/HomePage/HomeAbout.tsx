import { animateSlide } from "@/animations/AnimateSlide";
import { motion } from "framer-motion";
import { animateSlideWhenScrolling } from "@/animations/AnimateSlideWhenScrolling";
import { Link } from "react-router-dom";

function HomeAbout() {
    
    const animateRightProps = {
        xHidden: 100,
        xVisible: 0,
        duration: 1,
        delay: 0
    };

    const animateLeftProps = {
        xHidden: -100,
        xVisible: 0,
        duration: 1,
        delay: 0
    };

    return (
        <div className="flex flex-col justify-center items-center border-b border-neutral-900 py-12 md:py-24">
            <div className="flex flex-col max-w-2xl gap-12 md:gap-16">
                <motion.h3
                    variants={animateSlide({
                        yHidden: -70,
                        delay: 1.5,
                        duration: 0.7
                    })}
                    initial="hidden"
                    animate="visible"
                    className="text-2xl mb-8 mt-12 md:mb-12 md:text-4xl"
                >
                    About the <span className="text-purple-400/80 font-semibold">Allcode Community Project</span>
                </motion.h3>
                <div>
                    <motion.h4
                        variants={animateSlideWhenScrolling(animateLeftProps)}
                        initial="hidden"
                        whileInView="visible"
                        className='text-xl md:text-2xl text-neutral-300 pb-4 mb-2 border-b border-slate-900'
                    >
                        Welcome to the Community
                    </motion.h4>
                    <motion.p
                        variants={animateSlideWhenScrolling(animateRightProps)}
                        initial="hidden"
                        whileInView="visible"
                        className='tracking-tight text-base md:text-xl text-neutral-300'
                    >
                        Discover a collaborative space where creativity thrives. Build and contribute unique pages, whether you're an experienced developer or just starting. Create interactive experiences and share your innovations with our vibrant community.
                    </motion.p>
                </div>
                <div>
                    <motion.h4
                        variants={animateSlideWhenScrolling(animateLeftProps)}
                        initial="hidden"
                        whileInView="visible"
                        className='text-xl md:text-2xl text-neutral-300 pb-4 mb-2 border-b border-slate-900'
                    >
                        Easy Contribution
                    </motion.h4>
                    <motion.p
                        variants={animateSlideWhenScrolling(animateRightProps)}
                        initial="hidden"
                        whileInView="visible"
                        className='tracking-tight text-base md:text-xl text-neutral-300'
                    >
                        Contributing is straightforward. Submit a pull request with your changes, and our team will review it for alignment with project <Link className="text-blue-400 hover:text-blue-500 hover:underline" to="/guide">guidelines</Link>. We encourage adherence to our general style but welcome your personal touch.
                    </motion.p>
                </div>
                <div>
                    <motion.h4
                        variants={animateSlideWhenScrolling(animateLeftProps)}
                        initial="hidden"
                        whileInView="visible"
                        className='text-xl md:text-2xl text-neutral-300 pb-4 mb-2 border-b border-slate-900'
                    >
                        Showcase Your Work
                    </motion.h4>
                    <motion.p
                        variants={animateSlideWhenScrolling(animateRightProps)}
                        initial="hidden"
                        whileInView="visible"
                        className='tracking-tight text-base md:text-xl text-neutral-300'
                    >
                        Ensure your name is included at the bottom of your page for proper credit. Experienced contributors are also invited to assist with reviewing submissions to maintain the project's quality and consistency.
                    </motion.p>
                </div>
                <div>
                    <motion.h4
                        variants={animateSlideWhenScrolling(animateLeftProps)}
                        initial="hidden"
                        whileInView="visible"
                        className='text-xl md:text-2xl text-neutral-300 pb-4 mb-2 border-b border-slate-900'
                    >
                        Smooth Contribution Process
                    </motion.h4>
                    <motion.p
                        variants={animateSlideWhenScrolling(animateRightProps)}
                        initial="hidden"
                        whileInView="visible"
                        className='tracking-tight text-base md:text-xl text-neutral-300'
                    >
                        Prepare your page thoroughly before committing to minimize changes and streamline the process. This ensures your work is showcased effectively and efficiently.
                    </motion.p>
                </div>
                <div>
                    <motion.h4
                        variants={animateSlideWhenScrolling(animateLeftProps)}
                        initial="hidden"
                        whileInView="visible"
                        className='text-xl md:text-2xl text-neutral-300 pb-4 mb-2 border-b border-slate-900'
                    >
                        Join Us
                    </motion.h4>
                    <motion.p
                        variants={animateSlideWhenScrolling(animateRightProps)}
                        initial="hidden"
                        whileInView="visible"
                        className='tracking-tight text-base md:text-xl text-neutral-300'
                    >
                        Be part of our creative community. Connect with others, share your projects, and contribute to a space where creativity and collaboration are celebrated.
                    </motion.p>
                </div>
            </div>
        </div>

    )
}

export default HomeAbout;   