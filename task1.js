
var fs = require("fs");
const crypto = require("crypto");

// Generate public key and private key
const { privateKey, publicKey } = 
    crypto.generateKeyPairSync('rsa', { 
        modulusLength: 2048, 
    }); 

// reading file
const data = fs.readFileSync('test.txt');

//generate signature using private key
const sign = crypto.createSign("SHA256");
sign.update(data);
sign.end();

const signature = sign.sign(privateKey);

//Verify signature using public key
const verify = crypto.createVerify("SHA256");
verify.update(data);
verify.end();

const valid = verify.verify(publicKey,signature);

//result of verification
console.log(valid);



