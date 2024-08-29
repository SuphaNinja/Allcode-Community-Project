import { animateSlide } from "@/animations/AnimateSlide";
import { motion } from "framer-motion";
import { animateSlideWhenScrolling } from "@/animations/AnimateSlideWhenScrolling";

function HomeAbout() {
    return (
        <div className="flex flex-col justify-center items-center border-b border-neutral-900 pt-12 md:pt-24">
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
                    About The <span className="text-purple-400/80 font-semibold">Project</span>
                </motion.h3>
                <div>
                    <motion.h4
                        variants={animateSlideWhenScrolling({
                            xHidden: -100,
                            xVisible: 0,
                            duration: 1,
                            delay: 0
                        })}
                        initial="hidden"
                        whileInView="visible"
                        className='text-xl md:text-2xl text-neutral-300 pb-4 mb-2 border-b border-slate-900'
                        >
                        Welcome to the Allcode Community Project
                    </motion.h4>
                    <motion.p
                        variants={animateSlideWhenScrolling({
                            xHidden: 100,
                            xVisible: 0,
                            duration: 1,
                            delay: 0
                        })}
                        initial="hidden"
                        whileInView="visible"
                        className='tracking-tight text-base md:text-xl text-neutral-300'
                    >
                        Welcome to a vibrant and inclusive space where your creativity can truly shine! Here, you have the freedom to design and build pages that reflect your unique vision. Whether you’re a seasoned developer or just beginning your coding journey, this platform invites you to create interactive experiences—be it immersive games, engaging live chat rooms, or personal showcases. Every project is an opportunity to innovate and share your creativity with the community.
                    </motion.p>
                </div>
                <div>
                    <motion.h4
                        variants={animateSlideWhenScrolling({
                            xHidden: -100,
                            xVisible: 0,
                            duration: 1,
                            delay: 0
                        })}
                        initial="hidden"
                        whileInView="visible"
                        className='text-xl md:text-2xl text-neutral-300 pb-4 mb-2 border-b border-slate-900'
                    >
                        Contributing Made Simple
                    </motion.h4>
                    <motion.p
                        variants={animateSlideWhenScrolling({
                            xHidden: 100,
                            xVisible: 0,
                            duration: 1,
                            delay: 0
                        })}
                        initial="hidden"
                        whileInView="visible"
                        className='tracking-tight text-base md:text-xl text-neutral-300'
                    >
                        Contributing to the project is straightforward and collaborative. To add your creations, simply submit a pull request with your changes. Our team will review your submission to ensure it aligns with our general guidelines. While we encourage adherence to the overall style patterns used on the homepage, we're not overly strict about styling details. This flexibility allows you to express your personal touch while maintaining a coherent look and feel.
                    </motion.p>
                </div>
                <div>
                    <motion.h4
                        variants={animateSlideWhenScrolling({
                            xHidden: -100,
                            xVisible: 0,
                            duration: 1,
                            delay: 0
                        })}
                        initial="hidden"
                        whileInView="visible"
                        className='text-xl md:text-2xl text-neutral-300 pb-4 mb-2 border-b border-slate-900'
                    >
                        Show Your Contribution
                    </motion.h4>
                    <motion.p
                        variants={animateSlideWhenScrolling({
                            xHidden: 100,
                            xVisible: 0,
                            duration: 1,
                            delay: 0
                        })}
                        initial="hidden"
                        whileInView="visible"
                        className='tracking-tight text-base md:text-xl text-neutral-300'
                    >
                        To ensure proper credit, please include your name at the bottom of your page. This way, everyone can see and appreciate the contributions made by each individual. For those with more experience, there's an opportunity to assist with reviewing pull requests, helping maintain the quality and consistency of our project.
                    </motion.p>
                </div>
                <div>
                    <motion.h4
                        variants={animateSlideWhenScrolling({
                            xHidden: -100,
                            xVisible: 0,
                            duration: 1,
                            delay: 0
                        })}
                        initial="hidden"
                        whileInView="visible"
                        className='text-xl md:text-2xl text-neutral-300 pb-4 mb-2 border-b border-slate-900'
                    >
                        Efficient Contribution Process
                    </motion.h4>
                    <motion.p
                        variants={animateSlideWhenScrolling({
                            xHidden: 100,
                            xVisible: 0,
                            duration: 1,
                            delay: 0
                        })}
                        initial="hidden"
                        whileInView="visible"
                        className='tracking-tight text-base md:text-xl text-neutral-300'
                    >
                        We strive to make the contribution process as smooth as possible. By preparing your page fully before committing, you can help minimize the number of commits and streamline the publication process. This approach ensures that your work is showcased efficiently and effectively.
                    </motion.p>
                </div>
                <div>
                    <motion.h4
                        variants={animateSlideWhenScrolling({
                            xHidden: -100,
                            xVisible: 0,
                            duration: 1,
                            delay: 0
                        })}
                        initial="hidden"
                        whileInView="visible"
                        className='text-xl md:text-2xl text-neutral-300 pb-4 mb-2 border-b border-slate-900 '
                    >
                        Join the Creative Community
                    </motion.h4>
                    <motion.p
                        variants={animateSlideWhenScrolling({
                            xHidden: 100,
                            xVisible: 0,
                            duration: 1,
                            delay: 0
                        })}
                        initial="hidden"
                        whileInView="visible"
                        className='tracking-tight text-base md:text-xl text-neutral-300'
                    >
                        Join us in this collaborative space where creativity and innovation know no bounds. Connect with other creators, share your work, and watch your ideas come to life in a community that values creativity and collaboration.
                    </motion.p>
                </div>
            </div>
        </div>
    )
}

export default HomeAbout;   