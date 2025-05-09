import { useHorizontalScroll } from '@/hooks/useHorizontalScroll';
import { useEffect, useRef, useState } from 'react';
import Background from './village/Background';
import Merchant from './village/Merchant';
import HatMan from './village/HatMan';
import Woman from './village/Woman';
import TextContainer from './ui/TextContainer';
import Shop from './ui/Shop';
import Well from './village/Well';
import QuestBoard from './village/QuestBoard';
import TextButton from './ui/TextButton';
import { useRouter } from 'next/navigation';
import PageTransition from './ui/PageTransition';
import UserService from '@/services/UserService';
import CharacterService from '@/services/CharacterService';

export default function Village() {
    const ref = useRef(null);
    const router = useRouter()
    const scrollRef = useHorizontalScroll(ref);
    const [clickHandler, setClickHandler] = useState<"merchant" | "hatman" | "woman" | "questboard" | "">("");
    const [levelId, setLevelId] = useState<string>("");
    const [pageTransition, setPageTransition] = useState<boolean>(false);
    const [currentLevel, setCurrentLevel] = useState<{world: number, level: number}>({world: 1, level: 1});
    const [levelArr, setLevelArr] = useState<string[]>([]);

    useEffect(() => {

        (async () => {
            const check = await UserService.checkJwt(router);
            if(check === "undefined") router.push("/characterCreator");

            const character = await CharacterService.getCharacterData(router);
            console.log(character);
            if(!character) return;
            setCurrentLevel(character.data.progress);
        })();

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

    useEffect(() => {
            if(!levelId) return;
            setPageTransition(true);
            setTimeout(() => router.push(`/game/battle/${levelId}`), 1000);
    }, [levelId]);

    useEffect(() => {
        handleLevels();
        return () => {};
    }, [currentLevel]);

    const handleLevels = () => {
        const world = currentLevel.world;
        const maxLevel = currentLevel.level;
        const newLevelArr = [];
        for(let level = 1; level <= maxLevel; level++) {
            newLevelArr.push(`${world}-${level}`);
        }
        setLevelArr(newLevelArr);
    };

    const scrollListener = (e: Event, container: HTMLDivElement) => {
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
    };

    return (
        <div ref={ref} style={{ overflowX: "scroll", display: 'flex', }}>
            <div style={{ width: "1536px", height: "100vh", overflowX: "scroll" }}></div>

            {pageTransition ? <PageTransition state='shrink' /> : null}

            <Merchant isClicked={setClickHandler} textHandler={clickHandler} />
            <HatMan isClicked={setClickHandler} textHandler={clickHandler} />
            <Woman isClicked={setClickHandler} textHandler={clickHandler} />
            <Well />
            <QuestBoard isClicked={setClickHandler} clickHandler={clickHandler} />

            {clickHandler === "merchant" ? (
                <Shop isClicked={setClickHandler} textContent={["Hello there, adventurer!\n Come take a look at my wares!"]} />
            ) : clickHandler === "hatman" ? (
                <Shop isClicked={setClickHandler} textContent={["Hello there, adventurer!\n Come take a look at my wares!"]} />
            ) : clickHandler === "woman" ? (
                <Shop isClicked={setClickHandler} textContent={["Hello there, adventurer!\n Come take a look at my wares!"]} />
            ) : clickHandler === "questboard" ? (
                <>
                    <TextContainer isClicked={setClickHandler} textContent={["Clear the well"]} >
                        <p style={{marginBottom: "1.5rem"}}>Quests:</p>
                        <div style={{display: "flex", flexWrap: "wrap"}}>
                            {levelArr.map((level) => (
                                <TextButton key={level} text={level} setLevelId={setLevelId} />
                            ))}
                        </div>
                    </TextContainer>
                </>
            ) : null}

            {/* Background always needs to be the last element inside this container */}
            <Background />
        </div>
    );
}
