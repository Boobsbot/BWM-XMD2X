const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSU9UdVI1bGIyVnlNQUJkNHRmemtsVzV1M3BFR3Qzd0p4UUVqLzlhSlozTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV2JySnRjcmczM2YvUlh4a1JUUU5XQmZDMStWOGl6WjN2cldlRko4cHZsRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVQmVIV3FJYWNPd3g4VDdkcGpFSXNkdXo0NHJaTjF3MlZjampNOHVqcm1nPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQUW1kYVkyM0x0elYxaU95QjVrdS9BbWZuSldrT2N5bWFDbmdVOEZlTW5RPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVPWDAxY3dBY01lUTdTR1J1UkErajJLTzVJZ2wxNEVnOHpOZHlpU25LWGs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im5Ic1RiZU93NGJ5ZzV5ZXRqaTd5SnhYWXd0ZVNjTDRvWVJPYy9YSmFSSE09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRVBUaVJIM3hjVkJTSHdmdFRIOUdCV3JuZnRPMTg5U24vV2lxR24rU0hWOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUXBpWEU4Q2pSK3VxUktscjF1aE1ITGVCT2FQNnpJYkxkamRVZlFxNW1Saz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBuSVgrSEEyeGlTTDZpa05QZzFpNlBCRTFkMkp6WUpYTUd0MGhhVys4Y2hkTm5xTnFCN2UyM29xRk1Tejh0aUo3eVRzRnBMNUtJajd4bmlvWkZYSmhnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTI1LCJhZHZTZWNyZXRLZXkiOiJjR3ZvMnRlWEdlc0lkaWlySTlkVUdCaXU0NUpzdGM3WWFQMCtRWDUyUnJNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ5NUo2Q3RXbFRueW5Md1hnZnVIbGZnIiwicGhvbmVJZCI6ImRhYTU0MzgwLWNhMDAtNDY5Ni04MDRjLTdkZDZmNTc4NGMzYiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyQmtxeFZ1MkxmZG1Ea1IySW1GTExKOW0wWVU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZGxMY0J4UjdCQnpXTk1Wd0g2T0Z6bEFVVmpNPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Iks5QTc1UFRWIiwibWUiOnsiaWQiOiIyMzQ5MDM5MDMxMzkyOjgzQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNZlk0cWdDRUtXZCtMVUdHQU1nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJWTTd5SkpheEFmdDNxYXJ1dW1jWEFDc1JydDAzeWFCR0UyTmlxVEJZU0h3PSIsImFjY291bnRTaWduYXR1cmUiOiJxV0ZDVXVaNHF2eHNSUFhEUHZRWmlKNzEzS3NvM08rb0FHWEZqWUloc3pBNXpKaU9QSmwvRGkxK0FsRGZJbUQ1WnBMT0dmT3gzUFlxNWhTYmExT2FDQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiUm1nUExLSGdmcDJNWnpncER6U1NRNW1OOGoyeXVINW9VRlVVTTFsWE9RSlNBdUl6OVhRYktCTWt5eWhIUWxMYURpNHRUMXAxTDVockg3UEl6Q1hsaFE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MDM5MDMxMzkyOjgzQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlZUTzhpU1dzUUg3ZDZtcTdycG5Gd0FyRWE3ZE44bWdSaE5qWXFrd1dFaDgifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjM3MzE2MzV9',
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


