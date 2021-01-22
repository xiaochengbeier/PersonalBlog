import {API} from "./API";
export class RainbowService  {
    /**
     * 获得标语
     */
   public static async getRanbow(): Promise<Array<any> | undefined>{
    const response = await fetch(API.RAINBOW_API,{method:"GET"});
    const getRainBowResult = await response.json();
    return getRainBowResult.data as Array<any>;
   }
}
