
import CryptoJS from "crypto-js";
// import { encryptionKey } from "./keys";
// import { apikey } from "./keys";

const encryptionKey = import.meta.env.VITE_encryptionKey
const apikey = import.meta.env.VITE_apikey
export function encryptData(data) {
    // console.log('process', encryptionKey);
    // console.log('meta', apikey);

    data.apiKey = apikey
    var key = CryptoJS.enc.Latin1.parse(encryptionKey);
    var iv = CryptoJS.enc.Latin1.parse(encryptionKey);
    var encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    }).toString();
    return encrypted
}
export function decryptData(encryptedData) {
    var key = CryptoJS.enc.Latin1.parse(encryptionKey);
    var iv = CryptoJS.enc.Latin1.parse(encryptionKey);
    var decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
        // padding: CryptoJS.pad.Pkcs7
    });
    var decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedText);
}