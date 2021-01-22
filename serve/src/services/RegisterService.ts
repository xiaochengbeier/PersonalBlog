import { Register, User } from "../db";
import { v4 as uuidv4} from "uuid";
import md5 from "md5";
import { signJwt,verifyJwt } from "../utils/verify";
import { sendMailTo } from "../utils/email";
export  class RegisterService{
    /**
     * @param email 注册邮箱账号
     * @param password  注册密码
     * @return 返回false 表示账号已经存在无法注册
     */
    static async registerCount(email:string,password:string,host:string):Promise<boolean>{
        // 首先判断此账号是否已经存在 如果存在表示已经注册过了
        // 根据邮箱账号在user表中查询
        const findResult = await User.findOne({
            where:{
                email
            }
        });
        // 账号已经存在无法注册
        if(findResult != null){
            return false;
        }
        // 通过md5对密码加密
        const pass = md5(password);
        // 通过uuid生成一个秘钥
        const secrete = uuidv4();
        // 将账户密码存入以及秘钥存入数据库
       const createResult = await  Register.create({email,pass,key:secrete,status:false});
       const registObj:any = createResult.toJSON();
        // 生成 jwt 字符串
        const jwtStr = signJwt({email,pass},secrete,60*60);
        // 给用户发送邮件等待验证
        sendMailTo(email,host+"/regist/verify?jwt="+jwtStr+"&id="+ registObj.registerId,email);
        return true;
    }
   /**
    * @param jwt  jwt 字符串
    * @param secrete  秘钥
    */
    static  async   registerVerify(jwt:string,id:number):Promise<boolean>{
        // 根据id从数据库判断是否已经激活
        const findByPkResult =  await Register.findByPk(id);
        const findObj:any = findByPkResult.toJSON();
        // 如果已经校验过了直接返回true
        if(findObj.status){
            return true;
        }
        //    根据
       const verifyResult:any =  verifyJwt(jwt,findObj.key);
       //    校验失败返回false
       if(verifyResult === false){
           return false;
       }
        //    校验成功 首先将注册表 status 设置为 true表示验证通过
        await Register.update({status:true},{
            where:{
              registerId:findObj.registerId
            }
        });
        //   将用户的账号密码存入用户表
        await User.create({name:"用户名",email:verifyResult.email,pass:verifyResult.pass,birth:new Date("1999-10-12"), ctime:new Date()});
        return true;
    }
}
