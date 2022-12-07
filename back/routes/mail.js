const express = require('express');
const mailer = require('./mailSender');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const { email, title, message, file } = req.body;
        console.log(req.body);
        const emailParam = {
            toEmail: 'xxx@gmail.com', // 수신할 이메일
            subject: 'nodemailer test', // 메일 제목
            text: `
            <div>
                <h2>Message Details</h2>
                <div class="email" style="font-size: 1.1em;">Email : ${email}</div>
                <div class="phone" style="font-size: 1.1em;">Title : ${title}</div>
                <div class="message" style="font-size: 1.1em;">message : </div>
                <pre class="message" style="font-size: 1.2em;">${message}</pre>
            </div>
            `,
            attachments: [
                {
                    path: file,
                },
            ],
        };
        await mailer
            .sendGmail(emailParam)
            .then(() => res.status(200).send('저장 및 발송 성공'))
            .catch(() => res.status(500).send('에러'));
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
