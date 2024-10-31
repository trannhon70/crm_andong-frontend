import instance from "../helper/api.helper";
import { IPatient } from "../interface/patient";
import { IGetPaging } from "../interface/roles";

export const patiantAPI = {
    createPatiant,
    getPagingPatient,
    deletePatiant,
    getByIdPatiant,
    updatePatiant,
    uploadPatient
}

function createPatiant(body : IPatient) {
    return instance.post(`/patient/create`,body);
}

function uploadPatient(form: any, id: number){
    return instance.post(`/patient/upload/${id}`,form,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );
}

function updatePatiant(body : IPatient, id : number) {
    return instance.put(`/patient/update/${id}`,body);
}

function deletePatiant(id : number) {
    return instance.delete(`/patient/delete/${id}`);
}

function getByIdPatiant(id : number) {
    return instance.get(`/patient/get-by-id/${id}`);
}

function getPagingPatient(query : IGetPaging) {
    return instance.get(`/patient/get-paging?pageIndex=${query.pageIndex}&pageSize=${query.pageSize}&search=${query.search}&hospitalId=${query.hospitalId}`);
}



