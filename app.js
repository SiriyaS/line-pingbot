// Channel access token
const accessToken = "bT4pvobm8H5jOiV/Ahy4SU3h1oMSy6b+bNat3Xrsvplb1QDioJHXCiw9oztninnGe7h58GRf2lzPWAGFHMh4A7Rryf3lYt3eWtSsLIqpoEv+Znl7TlikfOwRKHq159UsQtp56bc15EGaQNDF0SJWgQdB04t89/1O/w1cDnyilFU="
const secretToken =  "cd1d98e643ce2194b31acbfecb286213"


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
    console.log(req.body);
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});

app.get('/ping', function (req,res){
    console.log('pingping-pong');
    res.send('pingping-pong');
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
            
        }
    }
    else if(eventText === 'menu2'){
        image = "https://f.ptcdn.info/879/051/000/ormrfseeexhs84plE8Q-o.jpg"
        msg = {
            'type': 'image',
            'originalContentUrl': image,
            'previewImageUrl': image,
            
        }
    }
    else if(eventText === 'menu3'){
        image = "https://f.ptcdn.info/945/058/000/pctho1c9u7D3gnAI570-o.jpg"
        msg = {
            'type': 'image',
            'originalContentUrl': image,
            'previewImageUrl': image,
            
        }
    }
    return client.replyMessage(event.replyToken, msg);
}

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
    console.log('run at port', app.get('port'));
});