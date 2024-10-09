
import instance from "../helper/api.helper";

export const diseaseAPI = {
    createdisease
}



function createdisease (body: any){
    return instance.post(`/disease/create`, body);
}