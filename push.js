var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BPCc_NQBWNAYhZumRG_sbWuJeKgnqehqr1rZnK17nrHBKCnNkST95nY1UzI06ru9NJV7_cPX_fDs9_POcksY0Iw",
   "privateKey": "6jP555HBzyN4Pbu_GSHmE3qSE_5BNc-BBbCTNY8NwD4"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/fN5b2BWpRMk:APA91bEjSQ64e7XDKpas_fgdKAKeVrxIe7zBL6PZjwYQyjHHsWlpbF-LYYCVtdD84eSkRChMtRQbQfMze51TrmPqxuT5Pg3xVCm2h70_xvrsck2LKfhyiyp4TfjD-J7NHxqpB8qrwSVk",
   "keys": {
       "p256dh": "BF4rwom3DcqadxLrDrfUUVXLP80vGrM2hO757dzQwmebIYOBmGm8oRzjI0/kD1fCD/PrWEy8aTFKrdcUJhC+Osc=",
       "auth": "SknsVJCoXGqngX75f0snhw=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '177085025128',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);