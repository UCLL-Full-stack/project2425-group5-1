import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const getMoveById = (moveId: number, router: AppRouterInstance) => {
    try {
        const loggedInUser = sessionStorage.getItem("loggedInUser");
        const localData = loggedInUser ? JSON.parse(loggedInUser) : null;
        const token = localData?.token;
        if (!token) {
            router.back();
            return { status: 404, data: { message: "Token does not exist" } };
        }

        return fetch(process.env.NEXT_PUBLIC_API_URL + `/move/getmoves/${moveId}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                console.log(response);
                if (!response.ok) {
                    router.back();
                    throw new Error(`Http error, status: ${response.status}, ${response.statusText}`)
                };
                return response.json();
            })
            .then((data) => {
                console.log(data);
                return { status: 200, data: data };
            }).catch((error) => {
            router.back();
                return { status: error.message.includes('401') ? 401 : 500, data: { message: error.message } };
            });
    } catch (err) {
        router.back();
        return { status: 500, data: err };
    }
};

const MoveService = {
    getMoveById,
};

export default MoveService;
