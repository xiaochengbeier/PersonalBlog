import axios from "axios";
export  class RainbowService  {
  static async  getOneRainbow(){
    const  url = "https://chp.shadiao.app/api.php";
    const resultt = await  axios.get(url);
    return resultt.data;
  }
}
