import { ResponseDataType } from "@/entry/ResDataEntry";
import axios from "axios";
import {API} from "./API";
export class RainbowService  {
    /**
     * 获得标语
     */
   public static async getRanbow(): Promise<Array<any> | undefined>{
    const response: any = await axios.get<ResponseDataType>(API.RAINBOW_API);
    return response.data.data;
   }
}
