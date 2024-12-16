import { useHorizontalScroll } from '@/hooks/useHorizontalScroll';
import { useEffect, useRef, useState } from 'react';
import Background from './village/Background';
import Merchant from './village/Merchant';
import HatMan from './village/HatMan';
import Woman from './village/Woman';
import TextContainer from './ui/TextContainer';

export default function Village() {
    const ref = useRef(null);
    const scrollRef = useHorizontalScroll(ref);
    const [clickHandler, setClickHandler] = useState("");

    useEffect(() => {
        // Adapted to horizontal https://jsfiddle.net/byeam39o/2/
        const container = scrollRef.current;
        if (container) {
            container.appendChild(container.lastElementChild!.cloneNode(true));
            container.scrollLeft = 1;
            container.scrollLeft = 0;

            container.addEventListener("scroll", (e) => scrollListener(e as UIEvent, container));
            return container.removeEventListener("scroll", (e) => scrollListener(e as UIEvent, container));
        }
    }, []);

    function scrollListener(e: Event, container: HTMLDivElement) {
        if (!e.target) return;
        const target = e.target as HTMLDivElement;
        const totalWidth = target.scrollWidth;
        const scrollLocation = Math.round(target.scrollLeft);
        const containerWidth = target.clientWidth;

        // If end reached
        if (totalWidth - scrollLocation <= containerWidth) {
            target.scrollTo({ left: (container.scrollWidth / 3) - window.innerWidth });

            // If start reached
        } else if (scrollLocation === 0) {
            const childWidth = container.firstElementChild!.scrollWidth;
            target.scrollTo({ left: totalWidth - childWidth });
        }
    }

    return (
        <div ref={ref} style={{ overflowX: "scroll", display: 'flex', }}>
            <div style={{ width: "1536px", height: "100vh", overflowX: "scroll" }}></div>


            <Merchant isClicked={setClickHandler} textHandler={clickHandler} />
            <HatMan isClicked={setClickHandler} textHandler={clickHandler} />
            <Woman isClicked={setClickHandler} textHandler={clickHandler} />
            
            {clickHandler === "merchant" ? (
                <TextContainer isClicked={setClickHandler} textContent={"Hello there, adventurer!\n Come take a look at my wares!"} />
            ) : clickHandler === "hatman" ? (
                <TextContainer isClicked={setClickHandler} textContent={"Hello there, adventurer!\n Come take a look at my wares!"} />
            ) : clickHandler === "woman" ? (
                <TextContainer isClicked={setClickHandler} textContent={"Hello there, adventurer!\n Come take a look at my wares!"} />
            ) : null}

            {/* Background always needs to be the last element inside this container */}
            <Background />
        </div>
    );
}
