# line-pingbot
### sample Line chatbot Messaging API
## 1. Setting Line Official Account
- เข้าไปที่หน้าเว็บ https://developers.line.me/
- log in ด้วย line account หรือด้วย bussiness account ก็ได้
- จากนั้นก็ create Providers (จะตั้งเป็นชื่อเราก็ได้)
- กด Create a Messaging API Channel
- ทีนี้ก็ใส่รายละเอียดของ channel ของเราให้เรียบร้อย แล้วกด create
- สามารถเข้าไปแก้ไข setting อื่นๆได้ใน https://manager.line.biz
- copy Channel Secret key (ในแท็บ Basic Settings) และ Channel Access Token key (ในแท็บ Messaging API กด issue เพื่อสร้าง key ก่อนด้วย) เพื่อไปใช้ต่อตอนเขียนโปรแกรม
>เนื่องจากเราจะให้ bot เป็นคนตอบแชต ในแท็บ Messaging API เราจึงต้อง disabled Auto-reply message และ  enabled Webhooks ด้วย

## 2. Implement Line API
- สร้าง git ของเราก่อน ให้ add .gitignore ไปด้วย (เพื่อที่เราจะเอา git ไปเชื่อมกับ Heroku)
- Implement code
 1. clone git
```
git clone 
```
  2. Install npm
```
npm install
``` 
  3. แก้ส่วนที่เป็น channelSecret และ channelAccessToken ตรงส่วน config ให้เป็น key ของ channel เรา
  4. เพิ่มเงื่อนไข eventText ส่วนที่เป็น handleMessageEvent ว่าถ้ามีข้อความแบบไหนส่งเข้ามา จะให้ตอบกลับไปแบบไหน
- save file แล้ว upload ขึ้น git ของเราที่สร้างไว้ตอนแรก
```
git add .
git commit -m "edit chatbot"
git push
```

## 3. เอา code Line API ขึ้น Heroku
Heroku จะเสียตังค์ ถ้าเรา create มากกว่า 1 app
- log in to Heroku https://id.heroku.com/login
- create new app : ตั้งชื่อ app แล้วก็กด create
- connect with GitHub (แท็บ Deploy)
  - Deployment method > เลือก GitHub
  - App connected to GitHub > ให้ใส่ repository ที่ project เราอยู่
  - Automatic deploys > กด Enable Automatic Deploys เพื่อเวลาเรา push ลง git จะได้ deploy ขึ้น Heroku อัตโนมัติเลย
  - (optional) Manual deploy > กด Deploy Branch
- create pipeline (แท็บ Deploy)
ตั้งชื่อ pipeline เลือกแบบ staging

## 4. ต่อ Webhook เข้ากับ channel ของเรา
- กลับไปที่ Line Develop
- แท็บ Messaging API > Webhook setting
  - Webhook URL > ให้ใส่ https://ชื่อappที่เราตั้งไว้.herokuapp.com/webhook
  - จากนั้นกด verify ถ้า success แปลว่า webhook ผ่าน
  - กดเปิด Use webhook

## 5. ทดลอง Line
add friend chatbot ของเรา แล้วทดลองส่ง message เล่นได้เลย
