import instance from "../helper/api.helper";
import { IGetPaging } from "../interface/roles";

export const rolesAPI = {
    create,
    getPaging,
    deleteRole
}

function create(data :any) {
    return instance.post("/role/create", data);
}

function deleteRole(id :number) {
    return instance.delete(`/role/delete/${id}`,);
}

function getPaging(query: IGetPaging) {
    return instance.get(`/role/get-paging?pageIndex=${query.pageIndex}&pageSize=${query.pageSize}&search=${query.search}`);
}