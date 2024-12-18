import style from "@/styles/game/ui/TextButton.module.css";
import React from "react";

interface Props {
    text: string;
    setLevelId?: (levelId: string) => void;
    useMove?: (moveId: number) => void;
    moveId?: number;
}

const TextButton: React.FC<Props> = ({ text, setLevelId, useMove, moveId }) => {
    return(
        <p className={style.text} onClick={(e) => {
            setLevelId ? setLevelId(text) : null;
            useMove && moveId !== undefined ? useMove(moveId) : null;
        }}>
            {text}
        </p>
    );
}

export default TextButton;