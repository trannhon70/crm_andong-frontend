
// 'vi', 'en', 'tq'
export const Languege = [
    {id: '1', value:'vi', label: 'Tiếng Việt'},
    {id: '2', value:'en', label: 'Tiếng Anh'},
    {id: '1', value:'tq', label: 'Tiếng Trung'},
]
export const GENDER = [
    {id: '1', value:'nam', label: 'NAM'},
    {id: '2', value:'NỮ', label: 'NỮ'},
    {id: '3', value:'KHÔNG XÁC ĐỊNH', label: 'KHÔNG XÁC ĐỊNH'},
]

export const SATUS = [
    {id: '1', value:'CHỜ ĐỢI', label: 'CHỜ ĐỢI'},
    {id: '1', value:'ĐÃ ĐẾN', label: 'ĐÃ ĐẾN'},
    {id: '1', value:'CHƯA ĐẾN', label: 'CHƯA ĐẾN'},
    {id: '1', value:'KHÔNG XÁC ĐỊNH', label: 'KHÔNG XÁC ĐỊNH'},
]

export function telephoneCheck(phone: string) {
    const isphone = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/.test(phone);
   return isphone;
  }