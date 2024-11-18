import instance from "../helper/api.helper";

export const noticationAPI = {
    getPaging,
    updateStatus,
}

function getPaging(query: any) {
    return instance.get(`/notication/get-paging?pageIndex=${query.pageIndex}&pageSize=${query.pageSize}&hospitalId=${query.hospitalId}`);
}

function updateStatus (id: number, body: any) {
    return instance.put(`/notication/update-status/${id}`,body)
}