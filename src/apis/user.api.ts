import instance from "../helper/api.helper";
import { ILogin } from "../interface/users";

export const userAPI = {
    login,
};

function login(data : ILogin) {
    return instance.post("/user/login", data);
}
