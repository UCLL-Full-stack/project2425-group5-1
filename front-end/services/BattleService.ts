import { BattleType } from "@/types";

const createBattle = async () => {
    try{
        const loggedInUser  = sessionStorage.getItem("loggedInUser");
        const localData = loggedInUser ? JSON.parse(loggedInUser) : null;
        const token = localData?.token;
        if (!token) {
            return { status: 404, data: {message: "Token does not exist"} };
        }
        const character  = sessionStorage.getItem("character");
        const localCharacter = character ? JSON.parse(character) : null;

        const battle: BattleType = {
            turn: 1,
            currentTurn: 1,
            state: localCharacter.data.progress,
            characterId: localCharacter.data.id,
        };

        return fetch(`${process.env.NEXT_PUBLIC_API_URL}/battle`, {
            method: "POST",
            body: JSON.stringify(battle),
            headers: {
              "Content-Type": "application/json",
              "authorization": JSON.stringify(token)
            },
        }).then(response => {
            if(!response.ok) throw new Error(`Http error, status: ${response.status}, ${response.statusText}`);
            return response.json();
        }).then(data => {
            console.log(data);
            return {status: 200, data: data};
        }).catch((error) => {
            return { status: error.message.includes('401') ? 401 : 500, data: { message: error.message } };
        });
    } catch(err) {
        return { status: 500, data: err };
    }
};

const BattleService = {
    createBattle,
}

export default BattleService;
