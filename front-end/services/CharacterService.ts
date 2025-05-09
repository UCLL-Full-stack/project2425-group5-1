import { Character } from "@/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const createCharacterData = (body: Character, router: AppRouterInstance): Promise<{status: number, data: Character | any}> | {status: number, data: Character | any} => {
	try {
		return fetch(process.env.NEXT_PUBLIC_API_URL + "/character", {
			method: "POST",
			credentials: "include",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (!response.ok) {
            		router.back();
					throw new Error(`Http error, status: ${response.status}, ${response.statusText}`)
				};
				return response.json()
			})
			.then((data) => {
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

const getCharacterData = async (router: AppRouterInstance) => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/character`,
			{
				method: "GET",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		if (!response.ok) {
            router.back();
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		return { status: 200, data: data };
	} catch (error) {
		const err = error as Error;
        router.back();
		return { status: 500, data: { message: err.message } };
	}
};

const getCharacterTemplates = (router: AppRouterInstance) => {
	return fetch(process.env.NEXT_PUBLIC_API_URL + "/character/template", {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(response => {
			console.log(response);
			if (!response.ok) {
            	router.back();
				throw new Error(`Http error, status: ${response.status}, ${response.statusText}`)
			};
			return response.json();
		}).then(data => {
			return { status: 200, data: data };
		}).catch((error) => {
            router.back();
			return { status: error.message.includes('401') ? 401 : 500, data: { message: error.message } };
		});
};

const CharacterService = {
	createCharacterData,
	getCharacterTemplates,
	getCharacterData,
};

export default CharacterService;
