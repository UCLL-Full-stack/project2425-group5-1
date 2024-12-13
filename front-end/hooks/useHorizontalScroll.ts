import { RefObject, useEffect } from "react";

export function useHorizontalScroll(elRef: RefObject<HTMLDivElement>) {
  useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY === 0) {
          return;
        }
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
          e.preventDefault();
          el.scrollLeft += e.deltaX;
        }
        el.scrollTo({ left: el.scrollLeft + e.deltaY * 5, behavior: "smooth" });
      };
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);

  return elRef;
}
