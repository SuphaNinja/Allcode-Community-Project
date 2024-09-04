import { animateSlide } from "@/animations/AnimateSlide";
import { motion } from "framer-motion";

const animateLeftProps = {
    xHidden: -100, 
    xVisible: 0,
    duration: 0.5,
    delay: 0
};

<div>
    <motion.h3
        variants={animateSlide(animateLeftProps)}
        initial="hidden"
        animate="visible"
        className="text-2xl md:text-4xl"
    >
        Example of text sliding in for the left when page loads
    </motion.h3>

</div>