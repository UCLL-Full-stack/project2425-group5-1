import {
    motion,
    useScroll,
    useSpring,
    useTransform
} from "framer-motion";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import ResizeObserver from "resize-observer-polyfill";

const SmoothScroll = ({ children }: any) => {
    // scroll container
    const scrollRef = useRef(null);

    // page scrollable height based on content length
    const [pageWidth, setPageWidth] = useState(0);

    // update scrollable height when browser is resizing
    const resizePageWidth = useCallback((entries: any) => {
        for (let entry of entries) {
            setPageWidth(entry.contentRect.width);
        }
    }, []);

    // observe when browser is resizing
    useLayoutEffect(() => {
        const resizeObserver = new ResizeObserver(entries =>
            resizePageWidth(entries)
        );
        if (!scrollRef.current) return;
        scrollRef && resizeObserver.observe(scrollRef.current);
        return () => resizeObserver.disconnect();
    }, [scrollRef, resizePageWidth]);

    const { scrollX } = useScroll(); // measures how many pixels user has scrolled vertically
    // as scrollY changes between 0px and the scrollable height, create a negative scroll value...
    // ... based on current scroll position to translateY the document in a natural way
    const transform = useTransform(scrollX, [0, pageWidth], [0, -pageWidth]);
    const physics = { damping: 15, mass: 0.27, stiffness: 55 }; // easing of smooth scroll
    const spring = useSpring(transform, physics); // apply easing to the negative scroll value

    return (
        <>
            <motion.div
                ref={scrollRef}
                style={{ x: spring, overflowY: "auto", overflowX: "hidden", transform: "rotate(-90deg)", transformOrigin: "right top" }} // translateY of scroll container using negative scroll value
                className="scroll-container"
            >
                {children}
            </motion.div>
            {/* blank div that has a dynamic height based on the content's inherent height */}
            {/* this is neccessary to allow the scroll container to scroll... */}
            {/* ... using the browser's native scroll bar */}
            <div style={{ width: pageWidth }} />
        </>
    );
};

export default SmoothScroll;
