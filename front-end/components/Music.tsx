import styles from "@/styles/main-menu/MenuMusic.module.css";
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import { useEffect } from "react";
import { useAudio } from "react-use";

interface MusicProps {
    musicPath: string;
    volume: number;
};

const Music: React.FC<MusicProps> = ({ musicPath, volume }) => {
    const [audio, state, controls, ref] = useAudio({
        src: musicPath,
        autoPlay: false,
        loop: true,
        hidden: true,
    });

    useEffect(() => {
        controls.volume(volume);
        controls.play();
    }, []);

    return (
        <>
            {audio}
            {!state.muted ?
                <VolumeUpRoundedIcon onClick={(e) => { controls.mute(); }} className={styles.icon} />
                :
                <VolumeOffRoundedIcon onClick={(e) => { controls.unmute(); }} className={styles.icon} titleAccess='Unmute' />
            }
        </>
    );
};

export default Music;