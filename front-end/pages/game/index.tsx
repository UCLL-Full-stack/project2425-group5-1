import Music from "@/components/Music";
import Village from "@/components/game/Village";
import localFont from 'next/font/local'

const quinquefiveFont = localFont({ src: "./fonts/quinque-five-font/Quinquefive-ALoRM.ttf" });

export default function Game() {
    return (
        <main className={quinquefiveFont.className}>
            <Village />
            <Music musicPath='/music/rpg_village_loop.mp3' volume={0.07} />
        </main>
    );
}
