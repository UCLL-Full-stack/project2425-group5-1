const postLoginData = () => {
  return fetch(process.env.API_URL + "/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const postRegisterData = (body: {
  username: string;
  email: string;
  password: string;
}) => {
  fetch(process.env.API_URL + "/user/register", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const UserService = {
  postLoginData,
  postRegisterData,
};

export default UserService;
