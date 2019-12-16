// Channel access token
const accessToken = "NFk2Iy+yuJwD13qJBUqHvEygQdB11fOdXzxkRxr1fpDl/XsbwUMrvCvDqfje5tpI48KHLwOwqyr9YpV7mBB1yJAVUyTuM6uwjZgfJZ34Tj6WZVabU3ZikmTv3ZoY2zuJNm245ng3rvLdxdOkm4iHagdB04t89/1O/w1cDnyilFU="
const secretToken =  "c13b609fa014e99c3a8189c7b0ab68e3"

// Webhooks Signing Secret
// bcb55517135e435f463b757ec7472ce8e2bac783febb232d5bc3f0664409

// แนะนำ https://travel.trueid.net/detail/64Y059oWaez7
// ชาบู https://ed.files-media.com/ud/review/1/154/461876/PPJ02889.jpg
// หมูทะ https://f.ptcdn.info/879/051/000/ormrfseeexhs84plE8Q-o.jpg
// บุฟเฟ่ต์ https://f.ptcdn.info/945/058/000/pctho1c9u7D3gnAI570-o.jpg

// Import Library
const express = require('express');
const line = require('@line/bot-sdk');

require('dotenv').config();

const app = express();

const config = {
    channelAccessToken: accessToken, // Key to call messaging api เรียก
    channelSecret: secretToken       // Key to access line channel
};

const client = new line.Client(config);

// รับพารามิเตอร์ 3 ตัว /webhook ที่อยู่ส่วนสุดท้ายของ url
app.post('/webhook', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});

app.get('/ping', function (req,res){
    console.log('pong');
    res.send('pong');
});

function handleEvent(event) {

    console.log(event);
    if (event.type === 'message' && event.message.type === 'text') {
        handleMessageEvent(event);
    } else {
        return Promise.resolve(null);
    }
}

function handleMessageEvent(event) {
    var msg = {
        type: 'text',
        text: 'สวัสดีครัช'
    };

    var eventText = event.message.text.toLowerCase();

    if(eventText === 'recommend'){
        var msg = {
            type: 'text',
            text: 'https://travel.trueid.net/detail/64Y059oWaez7'
        };
    }
    else if (eventText === 'menu1') {
        image = "https://ed.files-media.com/ud/review/1/154/461876/PPJ02889.jpg"
        msg = {
            'type': 'image',
            'originalContentUrl': image,
            'previewImageUrl': image,
            // 'type': 'text',
            // 'text': 'ชาบูละมุนลิ้น'
        }
    }
    else if(eventText === 'menu2'){
        image = "https://f.ptcdn.info/879/051/000/ormrfseeexhs84plE8Q-o.jpg"
        msg = {
            'type': 'image',
            'originalContentUrl': image,
            'previewImageUrl': image,
            // 'type': 'text',
            // 'text': 'หมูกระทะร้อนฉ่า'
        }
    }
    else if(eventText === 'menu3'){
        image = "https://f.ptcdn.info/945/058/000/pctho1c9u7D3gnAI570-o.jpg"
        msg = {
            'type': 'image',
            'originalContentUrl': image,
            'previewImageUrl': image,
            // 'type': 'text',
            // 'text': 'บุฟเฟ่ต์สุดฟิน'
        }
    }
    return client.replyMessage(event.replyToken, msg);
}

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
    console.log('run at port', app.get('port'));
});