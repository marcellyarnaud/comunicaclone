import axios from "axios";

const baseURL = "https://sso.supop.serpro/api/auth";

function axiosInstance()    {
    let instance = axios.create();
    instance.defaults.headers.common["Content-type"] = "application/json";
    instance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

    return instance;
}
export function login(username, password)   {
    axiosInstance().post(baseURL,
        {
            username: username,
            password: password
        }).then( (response) => {
            return response.data;
        }).catch( (error) => {
            console.log(error);
        });
}

export function logout(token)    {
    axios.delete(baseURL + "/" + token)
        .then( (response) => {
            return true;
        }).catch( (error) => {
            console.log(error);
            return false;
        });
}

export function isLoggedIn(token)   {
    axios.get(baseURL + "?token=" + token)
        .then( (response) => {
            return response.data;
        }).catch( (error) => {
            console.log(error);
            return null;
        })
}

/*
{
  "token": {
    "string": "AP8NfpvzVFVacIfQckx2WWxGsnylpt",
    "used_at": null,
    "created_at": 1670347467
  },
  "user": {
    "cpf": "75814943653",
    "nome": "Lucas Martins do Amaral",
    "email": "lucas.amaral@serpro.gov.br",
    "conexao": "SERPRO"
  }
}
*/