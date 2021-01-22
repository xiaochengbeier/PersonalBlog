import {createTransport} from "nodemailer"
import Mail from "nodemailer/lib/mailer";
import SendmailTransport from "nodemailer/lib/sendmail-transport";
import {tmpelate} from "./template"
import {resetPassTemplate} from "./resetPassTemplate"
const transporter = createTransport({
    host: 'smtp.aliyun.com',
    port: 465,
    service: 'smtp.aliyun.com ',
    auth: {
        user: 'littlecity@aliyun.com', 		// 你自己的邮箱的邮箱地址
        pass: 'ChengQi12'         // 上面我们提到的授权码
    }
});

export  function  sendMailTo(email:string,url:string,name:string,callback?:(error,info)=>void){
    const mailOptions:Mail.Options = {
        from: 'littlecity@aliyun.com',
        to: email,
        subject: '账号注册',
        // 内容
        text: `您的激活验证连接 30分钟内有效，请及时点击激活,请谨慎保管。` ,
        // 这里可以添加html标签
        html:tmpelate(url,name),
    };
    transporter.sendMail(mailOptions,(error,info)=>{
        if(callback){
            callback(error,info);
        }
    });
}

export function resetPassSendMailTo(email:string,code:number,name:string,callback?:(error,info)=>void){
    const mailOptions:Mail.Options = {
        from: 'littlecity@aliyun.com',
        to: email,
        subject: '密码重置',
        // 内容
        text: `您的验证码 30分钟内有效,请谨慎保管。` ,
        // 这里可以添加html标签
        html:resetPassTemplate(code,name),
    };
    transporter.sendMail(mailOptions,(error,info)=>{
        if(callback){
            callback(error,info);
        }
    });
}

