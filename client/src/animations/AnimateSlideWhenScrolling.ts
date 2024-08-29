import { Variants } from 'framer-motion';

interface AnimateSlideWhenScrollingOptions {
    xHidden?: number;
    xVisible?: number;
    yHidden?: number;
    yVisible?: number;
    duration?: number;
    delay?: number;
}

export const animateSlideWhenScrolling = ({
    xHidden = 100,
    xVisible = 0,
    yHidden = 0,
    yVisible = 0,
    duration = 1,
    delay = 0
}: AnimateSlideWhenScrollingOptions): Variants => ({
    hidden: {
        x: xHidden,
        y: yHidden,
        opacity: 0,
    },
    visible: {
        x: xVisible,
        y: yVisible,
        opacity: 1,
        transition: {
            duration,
            delay
        }
    }
});
