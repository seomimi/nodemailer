const express = require('express');
const cors = require('cors');
const mailRouter = require('./routes/mail');
const app = express();

app.use(
    cors({
        origin: ['http://localhost:3000'],
        credentials: true,
    })
);

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));

app.get('/back/', (req, res) => {
    res.send('hello');
});

app.get('/back/mail', (req, res) => {
    res.send('hello12355');
});

app.use('/back/mail', mailRouter);

app.listen(3005, () => {
    console.log('서버 실행 중!');
});
