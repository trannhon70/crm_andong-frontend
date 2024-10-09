
import instance from "../helper/api.helper";

export const departmentAPI = {
    getAllByIdHospital,
    createDepartment
}

function getAllByIdHospital(id: number) {
    return instance.get(`/department/get-all/${id}`);
}

function createDepartment (body: any){
    return instance.post(`/department/create`, body);
}