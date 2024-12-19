import style from "@/styles/game/village/QuestBoard.module.css";

interface Props {
    isClicked?: (name: "" | "merchant" | "hatman" | "woman" | "questboard" ) => void;
    clickHandler: string;
}

const QuestBoard: React.FC<Props> = ({ isClicked, clickHandler }) => {
    return(
        <div onClick={() => {clickHandler === "" ? (isClicked ? isClicked("questboard") : null) : (isClicked ? isClicked("") : null) }} className={style.image}>
            <p className={style.questmarker}>!</p>
        </div>
    );
};

export default QuestBoard;