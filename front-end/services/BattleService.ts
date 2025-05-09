import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const checkExistingBattles = async (router: AppRouterInstance) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/battle/getExisting`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(response => {
            if (!response.ok) throw new Error(`Http error, status: ${response.status}, ${response.statusText}`);
            return response.json();
        })
        .then(data => {
            console.log(data);
            router.back();
            return { status: 200, data: data };
        }).catch((error) => {
            router.back();
            return { status: error.message.includes('401') ? 401 : 500, data: { message: error.message } };
        });
}

const createBattle = async (progress: { world: number, level: number }, router: AppRouterInstance) => {
    try {
        return fetch(`${process.env.NEXT_PUBLIC_API_URL}/battle`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(progress),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => {
            if (!response.ok) {
                router.back();
                throw new Error(`Http error, status: ${response.status}, ${response.statusText}`)
            };
            return response.json();
        }).then(data => {
            console.log(data);
            return { status: 200, data: data };
        }).catch((error) => {
            router.back();
            return { status: error.message.includes('401') ? 401 : 500, data: { message: error.message } };
        });
    } catch (err) {
        return { status: 500, data: err };
    }
};

const BattleService = {
    checkExistingBattles,
    createBattle,
}

export default BattleService;
