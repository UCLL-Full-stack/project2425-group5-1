const postLoginData = () => {
  return fetch(process.env.API_URL + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
