import styles from "@/styles/MenuMusic.module.css";
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import { useEffect } from "react";
import { useAudio } from "react-use";

const MenuMusic: React.FC = () => {
    const [audio, state, controls, ref] = useAudio({
        src: "/music/Soliloquy.mp3",
        autoPlay: true,
        loop: true,
        hidden: true,
    });

    useEffect(() => {
        controls.volume(0.035);
    }, []);

    return (
        <>
            {audio}
            {!state.muted ?
                <VolumeUpRoundedIcon onClick={(e) => { e.preventDefault(); controls.mute(); }} className={styles.icon} />
                :
                <VolumeOffRoundedIcon onClick={(e) => { e.preventDefault(); controls.unmute(); }} className={styles.icon} titleAccess='Unmute' />
            }
        </>
    );
};

export default MenuMusic;