// Channel access token
const accessToken = "bT4pvobm8H5jOiV/Ahy4SU3h1oMSy6b+bNat3Xrsvplb1QDioJHXCiw9oztninnGe7h58GRf2lzPWAGFHMh4A7Rryf3lYt3eWtSsLIqpoEv+Znl7TlikfOwRKHq159UsQtp56bc15EGaQNDF0SJWgQdB04t89/1O/w1cDnyilFU="
const secretToken =  "cd1d98e643ce2194b31acbfecb286213"


// Import Library
const express = require('express');
const line = require('@line/bot-sdk');
const quickReply = require('./quickreply');

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
    console.log('ping-pong1');
    res.send('ping-pong1');
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

    if(eventText === 'quickreply'){
        var msg = {
            "type": "text",
            "text": "Hello Quick Reply!",
            "quickReply": {
            "items": [
                {
                "type": "action",
                "action": {
                    "type": "cameraRoll",
                    "label": "Camera Roll"
                }
                },
                {
                "type": "action",
                "action": {
                    "type": "camera",
                    "label": "Camera"
                }
                },
                {
                "type": "action",
                "action": {
                    "type": "location",
                    "label": "Location"
                }
                },
                {
                "type": "action",
                "imageUrl": "https://cdn1.iconfinder.com/data/icons/mix-color-3/502/Untitled-1-512.png",
                "action": {
                    "type": "message",
                    "label": "Message",
                    "text": "Hello World!"
                }
                },
                {
                "type": "action",
                "action": {
                    "type": "postback",
                    "label": "Postback",
                    "data": "action=buy&itemid=123",
                    "displayText": "Buy"
                }
                },
                {
                "type": "action",
                "imageUrl": "https://icla.org/wp-content/uploads/2018/02/blue-calendar-icon.png",
                "action": {
                    "type": "datetimepicker",
                    "label": "Datetime Picker",
                    "data": "storeId=12345",
                    "mode": "datetime",
                    "initial": "2018-08-10t00:00",
                    "max": "2018-12-31t23:59",
                    "min": "2018-08-01t00:00"
                }
                }
            ]
            }
        };
           
    }
    else if(eventText === 'recommend'){
        var msg = {
            type: 'text',
            text: 'https://www.ryoiireview.com/article/dessert-siam-thailand/#'
        };
    }
    else if (eventText === 'menu1') {
        image = "https://danielfooddiary.com/wp-content/uploads/2016/09/maygori3.jpg"
        msg = {
            'type': 'image',
            'originalContentUrl': image,
            'previewImageUrl': image,
            
        }
    }
    else if(eventText === 'menu2'){
        image = "https://coconuts.co/wp-content/uploads/2016/11/fudge_pancake_with_syrup.jpg"
        msg = {
            'type': 'image',
            'originalContentUrl': image,
            'previewImageUrl': image,
            
        }
    }
    else if(eventText === 'menu3'){
        image = "https://i.pinimg.com/originals/4f/c9/40/4fc9403eba50c92c849d433b3297377f.jpg"
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