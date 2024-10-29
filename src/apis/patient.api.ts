import instance from "../helper/api.helper";
import { IPatient } from "../interface/patient";
import { IGetPaging } from "../interface/roles";

export const patiantAPI = {
    createPatiant,
    getPagingPatient
    
}

function createPatiant(body : IPatient) {
    return instance.post(`/patient/create`,body);
}

function getPagingPatient(query : IGetPaging) {
    return instance.get(`/patient/get-paging?pageIndex=${query.pageIndex}&pageSize=${query.pageSize}&search=${query.search}&hospitalId=${query.hospitalId}`);
}

