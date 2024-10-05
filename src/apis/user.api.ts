import instance from "../helper/api.helper";
import { IGetPaging } from "../interface/roles";
import { ILogin, IUser } from "../interface/users";

export const userAPI = {
    login,
    getByIdUser,
    UpdateUserId,
    create,
    getPaging
};

function login(data : ILogin) {
    return instance.post("/user/login", data);
}

function create(body : IUser) {
    return instance.post("/user/create", body);
}

function getPaging(query: IGetPaging) {
    return instance.get(`/user/get-paging?pageIndex=${query.pageIndex}&pageSize=${query.pageSize}&search=${query.search}&isshow=${query.isshow}&language=${query.language}`);
}

function getByIdUser() {
    return instance.get("/user/get-by-user");
}


function UpdateUserId(id: number, body: any) {
    return instance.put(`/user/update-user/${id}`, body);
}