import { Character, User } from "@/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import useSWR from "swr";

const postLoginData = async (body: {
	email: string;
	password: string;
}, router: AppRouterInstance) => {
	try {
		return await fetch(process.env.NEXT_PUBLIC_API_URL + "/user/login", {
			method: "POST",
			body: JSON.stringify(body),
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				console.log(response);
				if (response.status !== 200) {
            		router.back();
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				console.log(data);
				// sessionStorage.setItem("loggedInUser", JSON.stringify({token: data.token, user: {id: data.user.id, name : data.user.name}}));
				
				return data;
			});
	} catch (error) {
        router.back();
		const err = error as Error;
		return err;
	}
};


const postRegisterData = (body: {
	name: string;
	email: string;
	password: string;
}, router: AppRouterInstance) => {
	try {
		return fetch(process.env.NEXT_PUBLIC_API_URL + "/user/register", {
			method: "POST",
			body: JSON.stringify(body),
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				sessionStorage.setItem(
					"loggedInUser",
					JSON.stringify({
						token: data.token,
						user: {
							id: data.user.id,
							name: data.user.name,
						},
					})
				);
				return { status: 200, data: data };
			});
	} catch (err) {
        router.back();
		return { status: 500, data: err };
	}
};

const checkJwt = async (router: AppRouterInstance): Promise<any> => {
	try {
		await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/verifyJwt`, {
			method: "GET",
			credentials: "include",
			headers: {
				'Content-Type': 'application/json'
			},
		})
		.then(res => res.json())
		.then((d: {message: string, redirectUrl: string}) => {
			if(d.message === "Authenticated") {
				console.log(d);
				router.push(d.redirectUrl);
				return d;
			} else {
				console.error("Error authenticating jwt!");
			}
		});

	} catch(error) {
		console.error("Error checking auth: ", error);
	}
}

const UserService = {
	postLoginData,
	postRegisterData,
	checkJwt,
};

export default UserService;
