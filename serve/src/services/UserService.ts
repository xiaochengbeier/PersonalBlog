import md5 from "md5";
import { User } from "../db";
import { resetPassSendMailTo} from "../utils/email";
export default class UserService {
    /**
     * 根据邮箱向用户邮箱发送 四位校验码
     * @param email  邮箱
     */
    static async sendResetPassCode(email:string){
        // 根据邮箱查询用户名字
        const findResult = await User.findOne({
            where:{
                email
            }
        });
        const  findObj:any  = findResult.toJSON();
        if(!findObj.name){
            return false;
        }
        // 随机生成四位数字
        const  code =  Math.floor((Math.random() *99999));
        resetPassSendMailTo(email,code,findObj.name);
        return code;
    }
    /**
     * @returns  返回的是重置数据库结果
     * @param email 重置密码邮箱
     * @param pass  密码 注意该方法会对其 md5加密 传入参数的时候就不需要了
     */
    static async restPass(email:string,pass:string){
       pass = md5(pass);
       const [times, userArr] =   await User.update({pass},{where:{email}});
       console.log(times, userArr,"----times, userArr");
       if(times > 0){
           return true;
       }
       return false;
    }
    /**
     * @returns 如果范湖false 表示登录失败 如果返回的是一个用户对象表示登录成功
     * @param email 邮箱账号
     * @param pass  密码
     */
    static async login(email:string,pass:string){
         //   对密码进行md5加密
         const passMd = md5(pass);
        //  根据邮箱查询数据
        const findResult = await User.findOne({
            attributes:["userId","email","pass","name","birth","ctime","poster"],
            where:{email}
        });
        const userObj:any = findResult.toJSON();
        // 获得密码
        if(userObj.pass === passMd){
            delete userObj.pass
            return userObj;
        }
        return false;
    }
   /**
    * @returns Promise<boolean> true表示修改成功 false表示原始密码 不正确或者数据库操作失败
    * @param email  邮箱账号
    * @param oldPass  老密码
    * @param newPass 新密码
    */
    static async updatePass(email:string,oldPass:string,newPass:string){
        // 首先对旧密码进行md5加密 然后根据数据库比对
        const oldMd = md5(oldPass);
        // 根据email查询该用户获得数据库密码
        const user = await  User.findOne({
            where:{
                email
            }
        });
        const userObj:any = user.toJSON();
        // 对比数据库密码和老密码md5字符串
        if(userObj.pass !== oldMd){
            return false;
        }
        // 如果对比相同那么就修改数据库将新密码通过md5加密存入数据库
        const newMd = md5(newPass);
        const  [num, use] =   await User.update({pass:newMd},{
            where:{
                email
            }
        });
        if(num === 0){
            return false;
        }
        return true;
    }
    /**
     * @returns Promise<boolean> true表示修改成功
     * @param email 用户邮箱账号
     * @param name  新用户名
     */
    static async updateName(email:string,name:string){
      const [num ,user] =   await User.update({name},{where:{email}});
      if(num >0){
          return true;
      }
      return false;
    }
    /**
     * @returns Promise<boolean> true表示修改成功
     * @param email 用户邮箱账号
     * @param birth 新的出生日期
     */
    static async updateBirth(email:string,birth:Date){
        const [num ,user] =   await User.update({birth},{where:{email}});
        if(num >0){
            return true;
        }
        return false;
      }
    /**
     * 根据用户id 获得用户信息
     */
    static async getUserById(userId: number){
       const findByIdResult = await  User.findByPk(userId,{
         attributes:["userId","email","pass","name","birth","ctime","poster"]
       });
       return findByIdResult.toJSON();
    }
    /**
     * 更换用户头像
     * @param poster 头像字符串
     * @param userId 用户id
     */
    static async changePoster(poster: string,userId: number){
      const  [num, use]  = await  User.update({poster},{where:{userId}});
      if(num > 0){
          return true;
      }
      return false;
    }
}
