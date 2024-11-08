import instance from "../helper/api.helper";

export const historyLoginAPI = {
    getPaging,
    
}

function getPaging(query: any) {
    return instance.get(`/history-login/get-paging?pageIndex=${query.pageIndex}&pageSize=${query.pageSize}&search=${query.search}&action=${query.action}`);
}