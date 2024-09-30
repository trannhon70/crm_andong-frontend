import instance from "../helper/api.helper";
import { ILogin } from "../interface/users";

export const userAPI = {
    login,
    getByIdUser,
    UpdateUserId
};

function login(data : ILogin) {
    return instance.post("/user/login", data);
}

function getByIdUser() {
    return instance.get("/user/get-by-user");
}


function UpdateUserId(id: number, body: any) {
    return instance.put(`/user/update-user/${id}`, body);
}