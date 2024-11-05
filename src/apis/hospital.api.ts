import instance from "../helper/api.helper";
import { IGetPaging } from "../interface/roles";

export const hospitalAPI = {
    getPaging,
    getAllHospital,
    getByIdHospital
}

function getPaging(query: IGetPaging) {
    return instance.get(`/hospital/get-paging?pageIndex=${query.pageIndex}&pageSize=${query.pageSize}&search=${query.search}`);
}

function getAllHospital() {
    return instance.get(`/hospital/get-all`);
}

function getByIdHospital(id: number) {
    return instance.get(`/hospital/get-by-id/${id}`)
}