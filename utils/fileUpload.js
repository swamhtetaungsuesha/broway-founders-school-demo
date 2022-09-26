import axios from "axios";
import ACTIONS from "../store/Action";
import { postFormData } from "./fetchData";

export const fileUpload = async (files,errArr,setPercent,percent,name) => {
  
  const config = {
    headers: { 'content-type': 'multipart/form-data' },
    onUploadProgress: (event) => {
      setPercent({...percent,[name]:Math.round((event.loaded * 100) / event.total)}) 


    },
  };
  let fileArr = []
  
  for (const item of files) {

    const formdata = new FormData()
    if (item.size >= 1024 * 1024 * 16) {
      errArr.push(`${item.name} is too large to upload!`)

    }else{

      formdata.append('file', item)
      const response = await axios.post('/api/uploadFiles', formdata, config);

      fileArr.push({ file_id: response.data.fileId, file_name: response.data.fileName })
    }
  }

  return fileArr

}