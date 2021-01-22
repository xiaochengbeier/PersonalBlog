import axios from "axios";
import { API } from "./API";

export class UploadFileService  {
    /**
     * 上传文件操作
     * @param fileData 上传的文件信息
     */
    static async uploadFile(fileData: {file: string|Blob;filename: string}){
        const  formdata = new FormData();
        formdata.append("poster", fileData.file, fileData.filename);
        const uploadResult = await axios.post(API.UPLOAD_API,formdata);
        return uploadResult;
    }
}
