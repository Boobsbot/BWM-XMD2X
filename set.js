const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNE5vSDZJdTdRN1MxS1liTDFDcVdjK1ozU2VtY2diNVFseUNVSXppUGlscz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZFA0SFBFckkrRTZPRjdCcEw3VVJUY0Iram90MlhZaDlMSkdKaHBuRFlqQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTQmRhTzdLYUJ5Z1dLVXFrVG1mL0E4RnN1YlRocG1Bb1NMcElhbWt2WTB3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIvOXAyc29kcEJmc0plWTVDUm1aOWVLRVJjdjRDeG1vZTNWMW1TS0hLUnpFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVKTHM4WHlJZVo0QTZvM3ZncWJ4a1VEcjkyRGRIb3Q3ZmJ1YjVNQW9Ebjg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZVMGhBMFZDYkN3N0RhNXB2YzkzKzNiRU0vTXYvOWQ2bVBmaTFYbThlbEU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0FON2VwU0VYUm12UGk1N0tjUk5QWXdYZSt6Nk9aOVd1dzlkZW1HcXZFcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMDFycnFoTmJzQ1hhMFhBUEVTeE1TN2NJSG15VmdrN1JjbUYzVXZqdDBFST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjdxUElUK1RwVHJIdm45MUNNVWdVZFJKazNwOHhic2hHaE9qSTBQTVlORVJBNGNUL1BDbGx4OXZTNThia0VRS0lUVkwwVXZEeE84R20rMk5IQ1BaZmpRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjAzLCJhZHZTZWNyZXRLZXkiOiJkK0hFb3VyTWs4NkxyUWpCcFFDckh2dVlGVE5NOE52YUNEaFZoai9DTUEwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJNb2IyWmlOVVRKUzUtZ2YxRnpHYWF3IiwicGhvbmVJZCI6ImFlOTE1OWE4LTc2NDItNDliNy04ZjBkLWRiODBlYjZlMDZiNiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrd2dyUmR0WG5Ock51a2dyS2lybTY5eU96YW89In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTEhCQlZQRHdzV216R3BjU2sxam5wODhlRVo0PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkpQNkJCV0U5IiwibWUiOnsiaWQiOiIyMzQ5MDM5MDMxMzkyOjkwQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCTg7ZkZXZpbCdzIHN0b3Jlc+ODhCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSit2N1JVUTU3bUR0Z1lZQWlBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiVmp5RWp6NTQyRDlxc0RuTmtDSjc3aXRKUTJKWDJsREhtcWhWR2xyZDloST0iLCJhY2NvdW50U2lnbmF0dXJlIjoiaUkvV2pGajdEb05IcUw0KzJWZ2JqejJPYTU3WkpHblBmOFg3VldNTmdzUVljRW9KdzBMalpKRXY0ajIxQXZqbEdxNDZNSE1yNGs5UHdFbHd2K0ovRHc9PSIsImRldmljZVNpZ25hdHVyZSI6IjhMNC9SdUU4c0xCOFJjOSs5S3QrR01UbkNubHhPUnNyQ0xyY0orN0dsM3UyTTRLay80TTBJZFd5QnZFSkVGeTJOMkoxRlRWNkRlUjVZaG4xTVV6cmpRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0OTAzOTAzMTM5Mjo5MEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWWThoSTgrZU5nL2FyQTV6WkFpZSs0clNVTmlWOXBReDVxb1ZScGEzZllTIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIzOTE1NTA5LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUMyciJ9',
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


