import instance from "../helper/api.helper";
import { IGetPaging } from "../interface/roles";

export const hospitalAPI = {
    getPaging,
   
}

function getPaging(query: IGetPaging) {
    return instance.get(`/hospital/get-paging?pageIndex=${query.pageIndex}&pageSize=${query.pageSize}&search=${query.search}`);
}