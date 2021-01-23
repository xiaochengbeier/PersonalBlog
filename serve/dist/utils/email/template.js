"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tmpelate = void 0;
function tmpelate(ref, name) {
    const str = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>账号注册</title>
        <style>
            *{
                margin: 0px;
                padding: 0px;
                text-decoration: none;
                list-style: none;
            }
            header, footer{
                display: flex;
                height: 70px;
                justify-content: space-around;
                align-items: center;
                background-image: linear-gradient(to right, #fa709a 0%, #fee140 100%);
            }
            footer{
                background-image: linear-gradient(to right, #6a11cb 0%, #2575fc 100%);
            }
            ul{
                display: flex;
                justify-content: space-between;
            }
           ul>li{
                margin: 0px 10px;
            }
            ul>li>a{
                margin-right: 10px;
            }
           .title{
              font-size: 25px;
              font-weight: bolder;
              color: rgb(231, 236, 234);
              text-shadow: 1px 2px 4px rgb(38, 73, 56), 1px 2px 7px rgb(174, 185, 20), 1px 2px 7px rgb(174, 185, 20);
           }
           p{
               width: 70%;
               margin:20px  auto;
           }
           .name{
               font-weight: bolder;
           }
           .button{
               display: inline-block;
               background-color: rgb(49, 45, 42);
               padding: 15px;
           }
           .button a{
               color: white;
           }
        </style>
    </head>
    <body>
        <header>
             <div class="title">个人博客系统</div>
             <ul>
                 <li> <a href="">订阅</a> |</li>
                 <li> <a href="">我的帐户</a> |</li>
                 <li> <a href="">帮助</a> </li>
             </ul>
        </header>
        <div>
            <p>尊敬的: <span class="name">${name}</span></p>
            <p>请验证您的电子邮件地址以完成 个人博客 帐户创建。</p>
            <p><span class="button"><a href=${ref}> 点击验证电子邮件地址 </a></span> </p>
            <p>此链接有效期为 24 小时。 如果已过期，请尝试 请求新的验证电子邮件。.</p>
            <p>我们收到了使用您的电子邮件地址申请 博客 帐户的请求。如果您没有发出该请求，则请提交帮助请求 或发送电子邮件至littlecity@aliyun.com
                谢谢，</p>
        </div>
        <footer>
            <div> 版权所有 @ 2020，博客。 保留所有权利。</div>
             <div> <span>帐户帮助 |</span> <span> 使用条款 |</span> <span>隐私政策</span></div>
        </footer>
    </body>
    </html>`;
    return str;
}
exports.tmpelate = tmpelate;
