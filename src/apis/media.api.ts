import instance from "../helper/api.helper";

export const mediaAPI = {
    getAllMedia,
    
}

function getAllMedia (){
    return instance.get(`/media/get-all`);
}