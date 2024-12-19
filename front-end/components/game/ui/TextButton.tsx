import style from "@/styles/game/ui/TextButton.module.css";
import React from "react";

interface Props {
    text: string;
    setLevelId?: (levelId: string) => void;
    useMove?: (moveId: number) => void;
    moveId?: number;
    onClick?: () => void;
}

const TextButton: React.FC<Props> = ({ text, setLevelId, useMove, moveId, onClick }) => {
    return(
        <p className={style.text} onClick={(e) => {
            setLevelId ? setLevelId(text) : null;
            useMove && moveId !== undefined ? useMove(moveId) : null;
            if(onClick) onClick();
        }}>
            {text}
        </p>
    );
}

export default TextButton;