const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMlBkSm9zMjVHeHBrYXdJemk0S3E0STVVMlZLaWJhaDI5Q0pDeVlXRW1tVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidGFLZDBhZ2hya09XRWpHclMvbElMVGNIRC9QY3JIZDEzZnBUNCs3V3kyZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnQWU5Tmcvd2JDdmNmS1AyMmM4Z0plZjhaK1g3blFFSXZIMjNPTHFreFdzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJWRU8zVFlUUW9sWFZlY001RHZablVaNWVYRkpMTjNkcjdueTdhWmhKQUFRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZNZUFVeUlZbE1JV0ZUYW1TS2RCbXJtRlFUeTYvSXJBbFgyYVlybjJjVk09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitwSWdYeE83ZS9ZNU5NazVmWFVkNTFIOEtWaDlRRHN1TlhBQTYrN3dhMzg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0ZuMDVYdUk5dHV2bGY4dmpOdVNld29qL2VhU2MwLzZRQzhKSFVpOHhtaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU1AxcWZLVUltR3RGNmtGTXF5MUJnRldRS01EUUN2aU52WjZqUHQ0NTRCYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik5jWjRyaHJ3YmtKdmFJdXI5cDd5MFFXaHVWOHp2eU5SMExQNEhMTWFrV1hzbUpyUUtBWUtkSkRxNllLOHdvdkZoU0p1emd0L3E5dUVadUpoK0NsZ2pnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTI4LCJhZHZTZWNyZXRLZXkiOiJBY2dlMVI4RUw3Q3ZGWUFjbkZwMERtTzZHeE5aRXFDNnAybjJocTR0TkV3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJxVTR4QkJxaFJNR1U0dEtwQWZ0SE93IiwicGhvbmVJZCI6ImViNTdjZmRkLTc1YTUtNDUxZi04YTc5LTllNGRhZDI5OGE0ZCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjQW8vaTJGOUJKQjhkMVcrZGwyM3MwdFBMZzA9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaHlWOTM2cGpwbnNVVlJFR0FtQ2ZXWDdJemk0PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjEyM004TlBEIiwibWUiOnsiaWQiOiIyMzQ5MDM5MDMxMzkyOjhAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi44OExoEwVMOXzZzDl0ZBVEjGkFLwk4O2In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLYXY3UlVRMFlTeHRnWVlDU0FBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJWanlFano1NDJEOXFzRG5Oa0NKNzdpdEpRMkpYMmxESG1xaFZHbHJkOWhJPSIsImFjY291bnRTaWduYXR1cmUiOiJJUTNqVU9NZGJLb3NMbFFSZm04MzhCbk5PVnJGZ3BwSS9DZzJrZGVEQmViVExqTFQySEFidU03cE9FNGtydGpDQ1FNam1QYU5idkpXQVd3Ylp2QWVCQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiUi9SVkxFVm1ab1FVbHhYQVg0Und4TUdvQzYyWFgyNUkzcWRYU2h5K2JXdGcwL0lsQkZwZzVNWXFRK2l5M0wyeWJWSjJ3dVhjMkYyWlVyOGVXdStkaUE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MDM5MDMxMzkyOjhAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVlk4aEk4K2VOZy9hckE1elpBaWUrNHJTVU5pVjlwUXg1cW9WUnBhM2ZZUyJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNDY2MjM2Nn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "LORD CONFRONTER",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 2349039031392",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || 'recording,
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});


