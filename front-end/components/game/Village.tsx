import { useHorizontalScroll } from '@/helpers/useHorizontalScroll';
import { useEffect, useRef } from 'react';
import Background from './village/Background';

export default function Village() {
    const ref = useRef(null);
    const scrollRef = useHorizontalScroll(ref);

    useEffect(() => {
        // Adapted to horizontal https://jsfiddle.net/byeam39o/2/
        const container = scrollRef.current;
        if (container) {
            container.appendChild(container.firstElementChild!.cloneNode(true));
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
        <div ref={ref} style={{ overflowX: "scroll", display: 'flex' }}>
            <Background />
        </div>
    );
}
