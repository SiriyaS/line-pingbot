// Channel access token
const accessToken = "bT4pvobm8H5jOiV/Ahy4SU3h1oMSy6b+bNat3Xrsvplb1QDioJHXCiw9oztninnGe7h58GRf2lzPWAGFHMh4A7Rryf3lYt3eWtSsLIqpoEv+Znl7TlikfOwRKHq159UsQtp56bc15EGaQNDF0SJWgQdB04t89/1O/w1cDnyilFU="
const secretToken =  "cd1d98e643ce2194b31acbfecb286213"


// Import Library
const express = require('express');
const line = require('@line/bot-sdk');
const https = require("https");

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

// test
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
    
    // make message to lowercase
    var eventText = event.message.text.toLowerCase();
    
    var trimed = eventText.trim(); //trim the space of the message

    if(trimed === 'nbot'){
        var msg = {
            type: 'text',
            text: 'Interact with nbot type "nbot hi" for adding event type "nbot event:<eventName>"'
        }; 
    }
    else{
        // split word by " "
        var splited = trimed.split(" ");
        console.log(splited);
        if(splited[0] === 'nbot'){
            
            if(splited[1] === 'hi'){
                var msg = {
                    type: 'text',
                    text: 'Hi !'
                };
            }
            // check if there are 2 spaces between 'nbot  hi'
            else if(splited[1] === ''){
                if(splited[2] === 'hi'){
                    var msg = {
                        type: 'text',
                        text: 'Hi !'
                    };
                }
            }
            // for 'nbot event:<eventName>'
            else if(splited[1].includes('event:')){
                var eventName = splited[1].slice(6); // slice splited[1] to get only eventName
                var select = `Please select date and time for ${eventName}`;  // `gfd ${gmh}gfd`
                var msg = {
                    type: 'text',
                    text: select,
                    quickReply: {
                        items: [
                            {
                            "type": "action",
                            "imageUrl": "https://icla.org/wp-content/uploads/2018/02/blue-calendar-icon.png",
                            "action": {
                                "type": "datetimepicker",
                                "label": "Datetime Picker",
                                "data": "storeId=12345",
                                "mode": "datetime",
                                "initial": "2019-12-21t00:00",
                                "max": "2020-04-30t23:59",
                                "min": "2019-12-20t00:00"
                            }
                            }
                        ]
                    }
                };
            }
            // for 'nbot working'
            else if(splited[1] === 'working'){
                var msg = {
                    "type": "flex",
                    "altText": "this is a flex message",
                    "contents": {
                        "type": "bubble",
                        "header": {
                            "type": "box",
                            "layout": "vertical",
                            "contents": [
                                {
                                    "type": "text",
                                    "text": "Where do you work today?",
                                    "weight": "bold",
                                    "size": "lg",
                                    "align": "center"
                                }
                            ]
                        },
                        "hero": {
                            "type": "image",
                            "url": "https://www.romania-insider.com/sites/default/files/styles/article_large_image/public/2020-04/remote_working_laptop_-_photo_pattanaphong_khuankaew_-_dreamstime.com_.jpg",
                            "size": "full",
                            "aspectRatio": "2:1"
                        },
                        "body": {
                            "type": "box",
                            "layout": "vertical",
                            "spacing": "md",
                            "contents": [
                                // แนวนอน แถว 1
                                {
                                    "type": "box",
                                    "layout": "horizontal",
                                    "spacing": "md",
                                    "contents": [
                                        {
                                            // "type": "text",
                                            // "text": "Home"
                                            "type": "button",
                                            "style": "link",
                                            "action": {
                                                "type":"message",
                                                "label":"Home",
                                                "text":"Home"
                                            }
                                        },
                                        {
                                            "type": "separator"   // เส้นกั้นแนวตั้ง
                                        },
                                        {
                                            "type": "button",
                                            "style": "link",
                                            "action": {
                                                "type":"message",
                                                "label":"Office",
                                                "text":"Office"
                                            }
                                        }
                                    ]
                                },
                                {
                                    "type": "separator"  // เส้นกั้นแนวนอน
                                },
                                // แนวนอน แถว 2
                                {
                                    "type": "box",
                                    "layout": "horizontal",
                                    "spacing": "md",
                                    "contents": [
                                        {
                                            "type": "button",
                                            "style": "link",
                                            "action": {
                                                "type":"message",
                                                "label":"Client's Office",
                                                "text":"Client's Office"
                                            }
                                        },
                                        {
                                            "type": "separator"   // เส้นกั้นแนวตั้ง
                                        },
                                        {
                                            "type": "button",
                                            "style": "link",
                                            "action": {
                                                "type":"message",
                                                "label":"Absent",
                                                "text":"Absent"
                                            }
                                        }
                                    ]
                                },
                                // {
                                //     "type": "separator"
                                // },
                                // {
                                //     "type": "box",
                                //     "layout": "horizontal",
                                //     "spacing": "md",
                                //     "contents": [
                                //         {
                                //             "type": "text",
                                //             "text": "grape"
                                //         },
                                //         {
                                //             "type": "separator"
                                //         },
                                //         {
                                //             "type": "text",
                                //             "text": "lemon"
                                //         }
                                //     ]
                                // }
                            ]
                        }
                    }
                };
            }
            // for 'nbot quick reply'
            else if(splited[1] === 'quick'){
                if(splited[2] === 'reply'){
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
            }
            // for 'nbot ออกไป' nbot will leave the group chat
            else if(splited[1] === 'ออกไป'){
                // console.log(event.source)
                console.log(event.source.groupId)
                client.leaveGroup(event.source.groupId)
                .then(() => {
                    // return status 200 and empty json 
                    res.status(200).json({});
                })
                .catch((err) => {
                    // error handling
                    console.log(err)
                });
            }
            // for nbot covid
            else if(splited[1] === 'covid'){
                // get http requests https://www.valentinog.com/blog/http-js/
                https.get('https://covid19.th-stat.com/api/open/today', res => {
                    res.setEncoding("utf8");
                    let body = "";
                    res.on("data", data => {
                      body += data;
                    });
                    res.on("end", () => {
                      body = JSON.parse(body);
                      console.log(body);
                      var msg = {
                        type: 'text',
                        text: `ยืนยันยอดผู้ป่วย COVID-19 ในไทย \nอัพเดตล่าสุดเมื่อ ${body.UpdateDate} \nยอดผู้ติดเชื้อสะสม ${body.Confirmed} คน (🔺${body.NewConfirmed}) \nรักษาหาย ${body.Recovered} คน (🔺${body.NewRecovered}) \nกำลังรักษา ${body.Hospitalized} คน (🔺${body.NewHospitalized}) \nเสียชีวิต ${body.Deaths} คน (🔺${body.NewDeaths}) \n \nที่มา : ${body.Source} `
                        };
                        return client.replyMessage(event.replyToken, msg);
                    });
                });
            }
            // for 'nbot ...'
            else{
                var msg = {
                    type: 'text',
                    text: 'Interact with nbot type "nbot hi" for adding event type "nbot event:<eventName>"'
                }; 
            }
        }
    }

    
    // else{
    //     if(eventText === 'quick reply'){
    //         var msg = {
    //             "type": "text",
    //             "text": "Hello Quick Reply!",
    //             "quickReply": {
    //             "items": [
    //                 {
    //                 "type": "action",
    //                 "action": {
    //                     "type": "cameraRoll",
    //                     "label": "Camera Roll"
    //                 }
    //                 },
    //                 {
    //                 "type": "action",
    //                 "action": {
    //                     "type": "camera",
    //                     "label": "Camera"
    //                 }
    //                 },
    //                 {
    //                 "type": "action",
    //                 "action": {
    //                     "type": "location",
    //                     "label": "Location"
    //                 }
    //                 },
    //                 {
    //                 "type": "action",
    //                 "imageUrl": "https://cdn1.iconfinder.com/data/icons/mix-color-3/502/Untitled-1-512.png",
    //                 "action": {
    //                     "type": "message",
    //                     "label": "Message",
    //                     "text": "Hello World!"
    //                 }
    //                 },
    //                 {
    //                 "type": "action",
    //                 "action": {
    //                     "type": "postback",
    //                     "label": "Postback",
    //                     "data": "action=buy&itemid=123",
    //                     "displayText": "Buy"
    //                 }
    //                 },
    //                 {
    //                 "type": "action",
    //                 "imageUrl": "https://icla.org/wp-content/uploads/2018/02/blue-calendar-icon.png",
    //                 "action": {
    //                     "type": "datetimepicker",
    //                     "label": "Datetime Picker",
    //                     "data": "storeId=12345",
    //                     "mode": "datetime",
    //                     "initial": "2018-08-10t00:00",
    //                     "max": "2018-12-31t23:59",
    //                     "min": "2018-08-01t00:00"
    //                 }
    //                 }
    //             ]
    //             }
    //         };
            
    //     }
    //     else if(eventText === 'recommend'){
    //         var msg = {
    //             type: 'text',
    //             text: 'https://www.ryoiireview.com/article/dessert-siam-thailand/#'
    //         };
    //     }
    //     else if (eventText === 'menu1') {
    //         image = "https://danielfooddiary.com/wp-content/uploads/2016/09/maygori3.jpg"
    //         msg = {
    //             'type': 'image',
    //             'originalContentUrl': image,
    //             'previewImageUrl': image,
                
    //         }
    //     }
    //     else if(eventText === 'menu2'){
    //         image = "https://coconuts.co/wp-content/uploads/2016/11/fudge_pancake_with_syrup.jpg"
    //         msg = {
    //             'type': 'image',
    //             'originalContentUrl': image,
    //             'previewImageUrl': image,
                
    //         }
    //     }
    //     else if(eventText === 'menu3'){
    //         image = "https://i.pinimg.com/originals/4f/c9/40/4fc9403eba50c92c849d433b3297377f.jpg"
    //         msg = {
    //             'type': 'image',
    //             'originalContentUrl': image,
    //             'previewImageUrl': image,
                
    //         }
    //     }
    // }
    return client.replyMessage(event.replyToken, msg);
}

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
    console.log('run at port', app.get('port'));
});