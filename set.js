const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR1AvZGJxdVA3YkgrU3ZpcWNuVEkvNDZhQjRqb0VCcnUvVXhKK2E2WktHZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUmxCM1M3akxYNmdHRFRXOFBLbXlBTmpUelptNG52NzdjQkFVSGR5OVpDUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNTkozVmhIZzdhZVhidHphdGNSVkpZTnpPU0RoUWVPYzhQRnNJNkxVcm5VPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJcVY4bUJLMWZTZUQxYTFJckxLS2JLOWZlV2k1aGxlOWwwQkhaMWJkT0Z3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNQbmZDSnE0U3YvdXZoLytYUGRXQmFBbE0yZVV3TitCUEVzblY4U1ZyMEk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlZyNWhGcWRKdUhjeVA1SWdYMXR0bkp5TGdTbGFQd3k2RzZaZVRIV3RIU1k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUZLY290QVJDUFdSODdkV1hwM3Bjb2ZvdDNrRFo4Ty9GMTNmWkVRdmhHQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiL3hvSmMxb281OHRkbXRGa3p4K1I0azlZLzd0RDY1Mjh1ekxsM3pCbWNSND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJYSTFDM0NNOE1rS3lWUzQ4NGw5RnNwMURoQlRTOEppb1ZRLzRnL1libjQxelY1cml0VDZ3WHZUVkxCVS94N0tSbW5sYW1zMjVZcmk5N3pIRGhNY0NRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTUzLCJhZHZTZWNyZXRLZXkiOiI4T1VJMUtsSGtJOGUxcTdqVzJFMExYKzBsTTh1YzlpdzEwM2I5QWFvaFBNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJGVTY3Ym9ZblFOeVZDU0diR0J1anhnIiwicGhvbmVJZCI6IjYwYWExMzMyLWQ1MWQtNGZkMS1hYjIyLWY5NGQwZGY0YWM4NyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJSdkMrR3NEZVIvT3ZMWmo1RmZwWnA5eXhXRmM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUQ4eEdpdEFKa2g2R2wvNnB2eHJFR2hjTTFRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkRaNVk2WDVGIiwibWUiOnsiaWQiOiIyMzQ5MDM5MDMxMzkyOjU4QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNSFk0cWdDRUo3eGlyVUdHQWNnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJWTTd5SkpheEFmdDNxYXJ1dW1jWEFDc1JydDAzeWFCR0UyTmlxVEJZU0h3PSIsImFjY291bnRTaWduYXR1cmUiOiI1K0d6Ui9Db0JHME0wRG5vTnFhUjlubDZvR2d5SWc5SmgweTFJUGJWQktLVDRyclAydTlEQVZSYXVUY0JPS0VSc1VLd2RtZjhrTE5CTmlFN0NlSVhDZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoidjh4NWh6aWdpQlZ4djJWVWw0VzB2ZWRKQ2RjQnN3SnNyUVNUdDEzdU9vdis4V1F5Q2lSR3BtUy90dnlWNEkyblJjRm0rZXVmOXE5TVdEcE0xYXlLQ2c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MDM5MDMxMzkyOjU4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlZUTzhpU1dzUUg3ZDZtcTdycG5Gd0FyRWE3ZE44bWdSaE5qWXFrd1dFaDgifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjE5NDAxMzksIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBR1BMIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
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
