import { EnemyType } from "@/types/index";

const getEnemyTemplates = (worldId: number) => {
    try {
        if(!worldId) throw new Error(`worldId is not valid`);

        const loggedInUser  = sessionStorage.getItem("loggedInUser");
        const localData = loggedInUser ? JSON.parse(loggedInUser) : null;
        const token = localData?.token;
        if (!token) {
            return { status: 404, data: {message: "Token does not exist"} };
        }

        return fetch(`${process.env.NEXT_PUBLIC_API_URL}/enemy/template/${worldId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "authorization": JSON.stringify(token)
            },
        }).then(response => {
            console.log(response);
            if(!response.ok) throw new Error(`Http error, status: ${response.status}, ${response.statusText}`);
            return response.json()
        }).then(data => {
            return {status: 200, data: data};
        }).catch((error) => {
            return { status: error.message.includes('401') ? 401 : 500, data: { message: error.message } };
        });
    } catch(err) {
        return { status: 500, data: err };
    }
};

const createEnemies = (enemies: EnemyType[]) => {
    try{
        if(!enemies) throw new Error(`Enemies do not exist or are not valid`);

        const loggedInUser  = sessionStorage.getItem("loggedInUser");
        const localData = loggedInUser ? JSON.parse(loggedInUser) : null;
        const token = localData?.token;
        if (!token) {
            return { status: 404, data: {message: "Token does not exist"} };
        }

        return fetch(`${process.env.NEXT_PUBLIC_API_URL}/enemy/enemies`, {
            method: "POST",
            body: JSON.stringify(enemies),
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
        return { status: 500, data: {message: err} };
    }
}


const addBattleToEnemy = (battleId: number, enemyId: number) => {
    try {
        const loggedInUser  = sessionStorage.getItem("loggedInUser");
        const localData = loggedInUser ? JSON.parse(loggedInUser) : null;
        const token = localData?.token;
        if (!token) {
            return { status: 404, data: {message: "Token does not exist"} };
        }

        return fetch(process.env.NEXT_PUBLIC_API_URL + `/enemy/${enemyId}`, {
        method: "PUT",
        body: JSON.stringify({ battles: battleId }),
        headers: {
          "Content-Type": "application/json",
          "authorization": JSON.stringify(token)
        },
      })
      .then((response) => {
        if(!response.ok) throw new Error(`Http error, status: ${response.status}, ${response.statusText}`);
        return response.json();
      })
      .then((data) => {
          return { status: 200, data: data };
      }).catch((error) => {
        return { status: error.message.includes('401') ? 401 : 500, data: { message: error.message } };
      });
    } catch(err) {
      return { status: 500, data: err };
    }
  };



const EnemyService = {
    getEnemyTemplates,
    createEnemies,
    addBattleToEnemy,
}

export default EnemyService;