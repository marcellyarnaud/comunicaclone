import axios from "axios";

const baseURL = "https://sso.supop.serpro/api/auth";

function axiosInstance() {
    let instance = axios.create();
    instance.defaults.headers.common["Content-type"] = "application/json";

    return instance;
}
export async function login(username, password) {
    return await axiosInstance().post(baseURL,
        {
            username: username,
            password: password
        });
}

export async function logout(token) {
    return await axios.delete(baseURL + "/" + token);
}

export async function isLoggedIn(token) {
    return await axios.get(baseURL + "?token=" + token);
}

