
var enc = require('./encryption-hap');
var bufferShim = require('buffer-shims');


function encryptAndSeal(plainText, AAD, nonce, key) {
    if (AAD == null) {
        AAD = Buffer.alloc(0);
    }

    var ciphertextBuffer = bufferShim.alloc(plainText.length);
    var macBuffer = bufferShim.alloc(16);
    
    enc.encryptAndSeal(key, nonce, plainText, AAD, ciphertextBuffer, macBuffer); // NOTE: AAD was undefined here

    return [ciphertextBuffer, macBuffer];
}


function verifyAndDecrypt(cipherText, mac, AAD, nonce, key) {
    if (AAD == null) {
        AAD = Buffer.alloc(0);
    }

    var plaintextBuffer = bufferShim.alloc(cipherText.length);
    
    var result = enc.verifyAndDecrypt(key, nonce, cipherText, mac, AAD, plaintextBuffer);
    if (!result) {
        console.log('Verify Fail');
        throw new Error("verifyAndDecrypt fail");
    }
    return plaintextBuffer;
    // key, nonce, ciphertext, data, mac
//    return aead_decrypt(key, nonce, cipherText, AAD, mac);
}

export default {
    encryptAndSeal,
    verifyAndDecrypt
}