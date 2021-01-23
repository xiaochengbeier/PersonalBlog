"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassSendMailTo = exports.sendMailTo = void 0;
const nodemailer_1 = require("nodemailer");
const template_1 = require("./template");
const resetPassTemplate_1 = require("./resetPassTemplate");
const transporter = nodemailer_1.createTransport({
    host: 'smtp.aliyun.com',
    port: 465,
    service: 'smtp.aliyun.com ',
    auth: {
        user: 'littlecity@aliyun.com',
        pass: 'ChengQi12' // 上面我们提到的授权码
    }
});
function sendMailTo(email, url, name, callback) {
    const mailOptions = {
        from: 'littlecity@aliyun.com',
        to: email,
        subject: '账号注册',
        // 内容
        text: `您的激活验证连接 30分钟内有效，请及时点击激活,请谨慎保管。`,
        // 这里可以添加html标签
        html: template_1.tmpelate(url, name),
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (callback) {
            callback(error, info);
        }
    });
}
exports.sendMailTo = sendMailTo;
function resetPassSendMailTo(email, code, name, callback) {
    const mailOptions = {
        from: 'littlecity@aliyun.com',
        to: email,
        subject: '密码重置',
        // 内容
        text: `您的验证码 30分钟内有效,请谨慎保管。`,
        // 这里可以添加html标签
        html: resetPassTemplate_1.resetPassTemplate(code, name),
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (callback) {
            callback(error, info);
        }
    });
}
exports.resetPassSendMailTo = resetPassSendMailTo;
