import instance from "../helper/api.helper";

export const rolesAPI = {
    create
}

function create(data :any) {
    return instance.post("/role/create", data);
}