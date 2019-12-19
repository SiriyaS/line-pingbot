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
git clone https://github.com/SiriyaS/line-pingbot.git
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

##

### Create LINE Rich Menu
## 1. สร้างรูป Rich Menu ด้วย Rich Menu Maker
- เข้าไปที่ https://lineforbusiness.com/richmenumaker/
- เลือกรูปแบบ Rich Menu  ที่ต้องการสร้าง กด "ถัดไป"
- ออกแบบไอคอน Rich Menu ของเรา เมื่อเสร็จเรียบร้อยกด "บันทึกไฟล์รูป Rich Menu"
- กดยอมรับเงื่อนไขด้านล่าง แล้วกด "บันทึกไฟล์รูป Rich Menu"
- ที่นี้เราก็จะได้ไฟล์รูป เอาไว้ใช้ในขั้นตอนต่อไป

## 2. สร้าง Rich Menu ใน Line Official Account Manager
- เข้าไปที่ https://manager.line.biz/
- เลือก channel ที่เราต้องการจะเพิ่ม Rich Menu
- แถบด้านซ้ายเลือก Rich menus
- เมื่อเข้ามาที่ Rich menus กด "Create new"
- กรอกรายละเอียด setting ต่างๆ
  - Menu settings
    - Title: ชื่อของ Rich menu (ไม่ได้แสดงให้ผู้ใช้เห็น)
    - Status: เปิด/ปิด Rich menu ตัวนั้น
    - Display period: วันและเวลาในการเริ่มและสิ้นสุดการแสดงผล Rich menu
    - Menu bar label: ชื่อเมนูตรงบาร์ด้านล่าง (ผู้ใช้เห็น)
    - Default behavior: แสดง/ซ่อน Rich menu ตั้งแต่เปิดห้องแชท
  - Menu content
    - กด select template แล้วเลือก template ที่เราเลือกตอนสร้าง Rich menu ตอนแรก
    - กด upload image แล้วเลือกไฟล์ภาพที่เราได้จากขั้นตอนที่ 1.
    - Actions จะเป็น สิ่ง ที่จะเกิดขึ้นเวลาเรากดปุ่ม rich menu
        - Link: เปิด URL ที่ขึ้นต้นด้วย http, https, line และtel
        - Text: ส่งข้อความตัวอักษรกลับไปในห้องแชท
        - Coupon: เปิดหน้าคูปอง
        - Reward cards: เปิดหน้าสะสมแสตมป์
        - No action: กดแล้วไม่เกิดอะไรขึ้น

หมายเหตุ: การสร้าง Rich menu จะต้องระบุข้อมูลให้ครบทุกช่องจึงจะกด Save ได้

## 3. กลับมาที่หน้าแชทของ channel ที่เราเพิ่งเพิ่ม rich menu ไป
จะเห็นว่าจะมีแถบ rich menu เด้งขึ้นมาตามที่เราได้ออกแบบไว้

>ศึกษาเพิ่มเติมได้ในลิ้งค์นี้ https://medium.com/linedevth/%E0%B9%80%E0%B8%81%E0%B9%88%E0%B8%87-rich-menu-%E0%B9%83%E0%B8%99-line-messaging-api-%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%84%E0%B8%A3%E0%B8%9A%E0%B8%AA%E0%B8%B9%E0%B8%95%E0%B8%A3-6cf12b394f38
