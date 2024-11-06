const postLoginData = (body: { email: string; password: string }) => {
  return fetch(process.env.API_URL + "/user/login", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("userId", data.user.id);
    });
};

const postRegisterData = (body: {
  username: string;
  email: string;
  password: string;
}) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/user/register", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("userId", data.user.id);
    });
};

const UserService = {
  postLoginData,
  postRegisterData,
};

export default UserService;
