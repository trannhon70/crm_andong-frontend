
import instance from "../helper/api.helper";
import { IGetPaging } from "../interface/roles";

export const diseaseAPI = {
    createdisease,
    getPagingDisease
}

function createdisease (body: any){
    return instance.post(`/disease/create`, body);
}

function getPagingDisease (query: IGetPaging){
    
    return instance.get(`/disease/get-paging?pageIndex=${query.pageIndex}&pageSize=${query.pageSize}&search=${query.search}&hospitalId=${query.hospitalId}&isshow=${query.isshow}`);
}