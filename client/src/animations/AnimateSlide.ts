interface AnimateSlideOptions {
    xHidden?: number;
    xVisible?: number;
    yHidden?: number;
    yVisible?: number;
    opacityHidden?: 0;
    opacityVisible?: 1;
    duration?: number;
    delay?: number;
};

export const animateSlide = ({
    xHidden = 0,
    xVisible = 0,
    yHidden = 0,  
    yVisible = 0,
    opacityHidden = 0,
    opacityVisible = 1,
    duration = 0.5,
    delay = 0
}: AnimateSlideOptions) => ({
    hidden: {
        x: xHidden,
        y: yHidden,
        opacity: opacityHidden
    },
    visible: {
        x: xVisible,
        y: yVisible,
        opacity: opacityVisible,
        transition: {
            duration,
            delay
        }
    }
});


// Example Usage.

/* 
<motion.div 
    variants={animateSlide({
        yHidden: -100, 
        xHidden: -100,
        yVisible: 0,
        delay: 0.1
    })}
    initial="hidden"            // Will be hidden by default
    animate="visible"           // The animation config to make it visible
    className="flex flex-shrink-0 items-center text-4xl">
    The Allcode Community Project
</motion.div>
 */
