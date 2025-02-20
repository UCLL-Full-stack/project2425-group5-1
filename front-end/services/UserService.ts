import { Character, User } from "@/types";
import useSWR from "swr";

const postLoginData = async (body: { email: string; password: string }): Promise<{
  token?: any; message?: string, user?: User,
}> => {
  try {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/user/login", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    }).then(data =>{
      console.log(data);
      sessionStorage.setItem("loggedInUser", JSON.stringify({token: data.token, user: {id: data.user.id, name : data.user.name}}));
  
      return data;
    });
  } catch (error) {
    const err = error as Error;
    return err;
  }
};

const postRegisterData = (body: {
  name: string;
  email: string;
  password: string;
}) => {
  try{
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/user/register", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((data) => {sessionStorage.setItem("loggedInUser", JSON.stringify(
      {
        token: data.token,
        user: {
          id: data.user.id,
          name: data.user.name,
        },
      }));
      return { status: 200, data: data };
    });
  } catch(err) {
    return { status: 500, data: err };
  }
};

const getCharacterData = async (userId: number) => {
  if (!userId) {
    return { status: 400, data: { message: "User  ID is required" } };
  }
  try {
    const loggedInUser  = sessionStorage.getItem("loggedInUser");
    const localData = loggedInUser ? JSON.parse(loggedInUser) : null;
    const token = localData?.token;
    if (!token) {
      return { status: 404, data: {message: "Token does not exist"} };
    }
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}/character`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": JSON.stringify(token)
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return { status: 200, data: data };
  } catch (error) {
    const err = error as Error;
    return { status: 500, data: { message: err.message } };
  }
};

const addCharacterToUser = (characterId: number) => {
  try{
    const loggedInUser  = sessionStorage.getItem("loggedInUser");
    const localData = loggedInUser ? JSON.parse(loggedInUser) : null;
    const token = localData?.token;
    if (!token) {
      return { status: 404, data: {message: "Token does not exist"} };
    }

    return fetch(process.env.NEXT_PUBLIC_API_URL + `/user/addCharacter/${localData.user.id}/${characterId}`, {
      method: "PUT",
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

const UserService = {
  postLoginData,
  postRegisterData,
  addCharacterToUser,
  getCharacterData,
};

export default UserService;
