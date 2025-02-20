import styles from "@/styles/game/battle/Background.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
    world: string | string[] | undefined;
}

const Background: React.FC<Props> = ({world}) => {
    const [srcBg, setSrcBg] = useState<string>("/images/backgrounds/battleback1-2.png"); // defaults to world 1
    const [srcParallax, setSrcParallax] = useState<string>("/images/backgrounds/battleback1-1.png"); // defaults to world 1


    useEffect(() => {
        document.addEventListener("mousemove", parallax);
        return () => {
            document.removeEventListener("mousemove", parallax);
        }
    }, []);

    useEffect(() => {
        if(!world) return;
        if(world[0] === "8") {
            setSrcBg(`/images/backgrounds/battleback${world[0]}.png`);
            setSrcParallax("");
            return;
        }
        if(world.length > 3) {
            setSrcBg(`/images/backgrounds/battleback${world[0]}${world[1]}-2.png`);
            setSrcParallax(`/images/backgrounds/battleback${world[0]}${world[1]}-1.png`);
            return;
        }
        setSrcBg(`/images/backgrounds/battleback${world[0]}-2.png`);
        setSrcParallax(`/images/backgrounds/battleback${world[0]}-1.png`);
    }, []);

    const parallax = (e:  MouseEvent) => {
        const position = 2;
        const x = (window.innerWidth - e.pageX * position) / 90;

        document.querySelectorAll<HTMLElement>(`.${styles.parallax}`).forEach((item) => {
            item.style.transform = `translateX(${x}px)`;
        });
    }


    return (
        <>
            <Image className={`${styles.image}`} src={srcBg} width={1536} height={288} alt="Background Image" quality={100} draggable={false}  />
            <Image className={`${styles.parallax} ${styles.image}`} src={srcParallax} width={1536} height={288} alt="Background Image" quality={100}  draggable={false}  />
        </>
    );
}

export default Background;
