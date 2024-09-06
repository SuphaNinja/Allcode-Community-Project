import { motion } from "framer-motion";
import { animateSlideWhenScrolling } from "@/animations/AnimateSlideWhenScrolling";
import { Link } from "react-router-dom";

export default function HomeOurGoals() {

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
                    variants={animateSlideWhenScrolling({
                        yHidden: -100,
                        xHidden: 0
                    })}
                    initial="hidden"
                    whileInView="visible"
                    className="text-2xl mb-8 mt-12 md:mb-12 md:text-4xl"
                >
                    Our <span className="text-purple-400/80 font-semibold">Goals</span>
                </motion.h3>
                <div>
                    <motion.h4
                        variants={animateSlideWhenScrolling(animateLeftProps)}
                        initial="hidden"
                        whileInView="visible"
                        className='text-xl md:text-2xl text-neutral-300 pb-4 mb-2 border-b border-slate-900'
                    >
                        Celebrate Creativity and Diversity
                    </motion.h4>
                    <motion.p
                        variants={animateSlideWhenScrolling(animateRightProps)}
                        initial="hidden"
                        whileInView="visible"
                        className='tracking-tight text-base md:text-xl text-neutral-300'
                    >
                        Our main goal is to cultivate a vibrant community where creativity thrives. We want every page to be a unique expression of its creator’s vision, reflecting the rich diversity of ideas within our community.
                    </motion.p>
                </div>
                <div>
                    <motion.h4
                        variants={animateSlideWhenScrolling(animateLeftProps)}
                        initial="hidden"
                        whileInView="visible"
                        className='text-xl md:text-2xl text-neutral-300 pb-4 mb-2 border-b border-slate-900'
                    >
                        Foster Exploration and Engagement
                    </motion.h4>
                    <motion.p
                        variants={animateSlideWhenScrolling(animateRightProps)}
                        initial="hidden"
                        whileInView="visible"
                        className='tracking-tight text-base md:text-xl text-neutral-300'
                    >
                        We aim to create an environment where every visit is a new adventure. Explore a variety of unique pages—from interactive games to personal showcases—that captivate and engage users.
                    </motion.p>
                </div>
                <div>
                    <motion.h4
                        variants={animateSlideWhenScrolling(animateLeftProps)}
                        initial="hidden"
                        whileInView="visible"
                        className='text-xl md:text-2xl text-neutral-300 pb-4 mb-2 border-b border-slate-900'
                    >
                        Promote Collaborative Growth
                    </motion.h4>
                    <motion.p
                        variants={animateSlideWhenScrolling(animateRightProps)}
                        initial="hidden"
                        whileInView="visible"
                        className='tracking-tight text-base md:text-xl text-neutral-300'
                    >
                        Collaboration is essential to our success. We encourage open and supportive interactions where members can share knowledge, inspire each other, and grow together.
                    </motion.p>
                </div>
                <div>
                    <motion.h4
                        variants={animateSlideWhenScrolling(animateLeftProps)}
                        initial="hidden"
                        whileInView="visible"
                        className='text-xl md:text-2xl text-neutral-300 pb-4 mb-2 border-b border-slate-900'
                    >
                        Uphold High Quality Standards
                    </motion.h4>
                    <motion.p
                        variants={animateSlideWhenScrolling(animateRightProps)}
                        initial="hidden"
                        whileInView="visible"
                        className='tracking-tight text-base md:text-xl text-neutral-300'
                    >
                        While embracing creativity, we maintain high standards of quality. We ensure that submissions meet our <Link className="text-blue-400 hover:text-blue-500 hover:underline" to="/guide">guidelines</Link>, allowing for personal expression while maintaining consistency.
                    </motion.p>
                </div>
                <div>
                    <motion.h4
                        variants={animateSlideWhenScrolling(animateLeftProps)}
                        initial="hidden"
                        whileInView="visible"
                        className='text-xl md:text-2xl text-neutral-300 pb-4 mb-2 border-b border-slate-900'
                    >
                        Encourage Continuous Innovation
                    </motion.h4>
                    <motion.p
                        variants={animateSlideWhenScrolling(animateRightProps)}
                        initial="hidden"
                        whileInView="visible"
                        className='tracking-tight text-base md:text-xl text-neutral-300'
                    >
                        We are committed to inspiring ongoing innovation. Our platform evolves with new features and tools, empowering our community to push the boundaries of creativity.
                    </motion.p>
                </div>
                <div>
                    <motion.h4
                        variants={animateSlideWhenScrolling(animateLeftProps)}
                        initial="hidden"
                        whileInView="visible"
                        className='text-xl md:text-2xl text-neutral-300 pb-4 mb-2 border-b border-slate-900'
                    >
                        Build a Supportive Community
                    </motion.h4>
                    <motion.p
                        variants={animateSlideWhenScrolling(animateRightProps)}
                        initial="hidden"
                        whileInView="visible"
                        className='tracking-tight text-base md:text-xl text-neutral-300'
                    >
                        We are dedicated to fostering a supportive and inclusive community where every member feels valued. By celebrating each other's successes, we ensure that everyone can thrive and enjoy their journey with us.
                    </motion.p>
                </div>
            </div>
        </div>

    )
} 