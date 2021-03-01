const webpush = require('web-push');

// console.log(webpush.generateVAPIDKeys());


const publicKey =
'BJRDF8_ppLBQnJoBDn8QRgv4tEysfjYAKRHlDHpNr0SOGsDi7XYbzNMVZJ26EWyukF_5cuBMG50P5Zsjw4pk0W8';
const privateKey =
'p-Fu54dt2JntZ48LNS6QpgF__N81l81B0Cfn-JlZIkw';

const sub = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/dOcp_YxgNp8:APA91bEGpokNeah8KOKjCnh6nqZ-tCl7EKS1SjlGZPUWAccNlhj2Dug5u5Sa4NU85JlBliwaQcDqz_R-wZNztcJnT6PVRx0Uo2eLpy61Vph0RgM7mLTZfIsDAICcvPMSnfCF9XTCWB2p",
  expirationTime:null,
  keys:{
    p256dh:
      "BJx8HHiK42Q4JsBh0Kq3fYO5tYpxFszxLRjXfEopXt4X3O65xSGItNDuHw-OPcPBIVnBkE75q56kCstDiSOi_KY",
      auth:"3EeiI0apTlU8Pw05XMCK6w",
    },
  };

  webpush.setVapidDetails('mailto:example@email.com.br', publicKey, privateKey);
  const payLoad = {
    "notification": {
        "title": "Novas Informações para você!",
        "body": "Newsletter Available!",
        "icon": "assets/icons/android-icon-96x96.png",
        "vibrate": [100, 50, 100],
        "data": {
            "url": 'http://localhost:8080',
            "dateOfArrival": Date.now(),
            "primaryKey": 1
        }

    }
}

  webpush.sendNotification(sub, JSON.stringify(payLoad));
