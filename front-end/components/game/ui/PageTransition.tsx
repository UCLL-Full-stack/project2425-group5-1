import styles from "@/styles/game/ui/PageTransition.module.css";

interface Props {
    state: "shrink" | "expand";
}

const PageTransition: React.FC<Props> = ({state}) => {
    return(
        <>
            <div className={`${state === "shrink" ? styles.shrink : styles.expand} ${styles.container}`} />
        </>
    );
};

export default PageTransition;