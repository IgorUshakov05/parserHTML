const express = require('express');
const app = express();
const axios = require('axios');
const cheerio = require('cheerio');

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('dist'));

const start = (PORT) => {
    app.listen(PORT, () => {
        console.log("Сервер запущен на порту:", PORT);
    });
};

const getHTML = async (url) => {
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        const title = $('head title').text();
        const head = $('head').html();
        const body = $('body').html();
        return { title, head, body };
    } catch (error) {
        console.error('Ошибка при получении страницы:', error);
        return '';
    }
};

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.post('/site', async (req, res) => {
    try {
        const url = req.body.url;
        const {title,head,body} = await getHTML(url);
        res.json({ title,head,body });
    } catch (error) {
        console.error('Ошибка при обработке POST-запроса:', error);
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
});

start(3000);
