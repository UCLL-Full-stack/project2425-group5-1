import styles from "@/styles/game/village/Merchant.module.css";
import { useEffect, useRef, useState } from "react";
// // import { animated } from '@react-spring/web';
// import { useEffect, useState, useRef } from "react";
// import { motion, useAnimate, useTime, useTransform, steps } from "motion/react";

// // const transition = { duration: 4, yoyo: Infinity, ease: "linear" };

// export default function Merchant() {
//     const [animationState, setAnimationState] = useState<"idle" | "walking">("walking");
//     const [scope, animate] = useAnimate();
//     const easing = steps(-1);
//     // const [progress, setProgress] = useState<number>();

//     // const time = useTime();

//     // const x = useTransform(time, [0, 8000], [0, 1000], { clamp: false });
    
//     useEffect(() => {
//         console.log(animationState);
//         const animation = animate(scope.current, { x: 1000 }, { repeatType: "reverse", repeat: Infinity, duration: 8, ease: "linear" });
//         if (animationState === "idle") {
//             animation.stop();
//             scope.current.style;
//         } else if (animationState === "walking") {
//             animation.play();
//         }
//     }, [animationState]);
//     // useEffect(() => {
//     //     console.log(animationState);
//     // }, [animationState]);

//     return (
//         <>
//             {/* {animationState === "walking" ?
//                 <motion.div onMouseDown={(e) => { setAnimationState("idle"); setUpdate(!update); }} className={`${styles.spritesheet} ${styles.animate_walking}`}></motion.div>
//                 : */}
//             <motion.div
//                 ref={scope}
//                 initial={
//                     { x: 0 }
//                 }
//                 animate={
//                     { x: 1000 }
//                 }
//                 transition={
//                     {
//                         duration: 8,
//                         ease: "linear",
//                         repeatType: "reverse",
//                         repeat: Infinity
//                     }
//                 }
//                 onMouseDown={
//                     (e) => {
//                         setAnimationState(animationState === "walking" ? "idle" : "walking");
//                     }
//                 }
//             >
//                 <motion.div
//                     initial={
//                         {
//                             "transform": "scaleX(1)"
//                         }
//                     }
//                     animate={
//                         {
//                             "transform": "scaleX(-1)"
//                         }
//                     }
//                     transition={
//                         {
//                             ease: easing,
//                             repeatType: "reverse",
//                             repeat: Infinity,
//                             duration: 8
//                         }
//                     }
//                     className={`${styles.spritesheet} ${animationState === "walking" ? styles.animate_walking : styles.animate_idle}`}
//                 />
//             </motion.div>
//             {/* } */}
//         </>
//     );
// }


export default function Merchant() {
    const [animationState, setAnimationState] = useState<"idle" | "walking">("walking");
    const villagerContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(!villagerContainerRef.current) return;
        if(animationState === "idle") {
            villagerContainerRef.current.style.animationPlayState = "paused";
        } else {
            villagerContainerRef.current.style.animationPlayState = "running";
        }

        return () => {}
    }, [animationState]);

    return (
        <div className={`${styles.spritesheet_container} ${styles.animate_position}`}
            ref={villagerContainerRef}
            onClick={() => setAnimationState(animationState === "walking" ? "idle": "walking")}
        >
            <div className={
                `${styles.spritesheet} ${animationState === "walking" ?
                    `${styles.walking} ${styles.animate_walking}`
                    :
                    `${styles.idle} ${styles.animate_idle}`
                }`}
            />
        </div>
    );
}
