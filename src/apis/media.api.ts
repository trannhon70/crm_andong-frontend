import instance from "../helper/api.helper";

export const mediaAPI = {
    getAllMedia,
    
}

function getAllMedia (id: number){
    return instance.get(`/media/get-all/${id}`);
}