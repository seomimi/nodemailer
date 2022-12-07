const nodemailer = require('nodemailer');

// 메일발송 객체
const mailSender = {
    // 메일발송 함수
    sendGmail: function (param) {
        let transporter = nodemailer.createTransport({
            port: 587,
            host: 'smtp.gmail.com',
            auth: {
                user: 'xxx@gmail.com', // 보내는 메일의 주소
                pass: '16자리 앱 비밀번호', // 보내는 메일의 비밀번호
            },
        });
        // 메일 옵션
        let mailOptions = {
            from: 'xxx@gmail.com', // 보내는 메일의 주소
            to: param.toEmail, // 수신할 이메일
            subject: param.subject, // 메일 제목
            html: param.text, // 메일 내용
            attachments: param.attachments, //첨부파일
        };

        return transporter.sendMail(mailOptions);
    },
};

module.exports = mailSender;
