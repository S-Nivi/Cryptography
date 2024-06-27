const forge = require('node-forge');

// Generate RSA key pair
function generateKeyPair() {
    const keys = forge.pki.rsa.generateKeyPair({ bits: 2048 });
    const privateKeyPem = forge.pki.privateKeyToPem(keys.privateKey);
    const publicKeyPem = forge.pki.publicKeyToPem(keys.publicKey);
    return { privateKeyPem, publicKeyPem };
}

const crypto = require('crypto');

// Sign file using private key
function signFile(privateKeyPem, fileData) {
    const sign = crypto.createSign('RSA-SHA256');
    sign.update(fileData);
    sign.end();
    const signature = sign.sign(privateKeyPem, 'base64');
    return signature;
}

// Verify file integrity using public key and signature
function verifySignature(publicKeyPem, fileData, signature) {
    const verify = crypto.createVerify('RSA-SHA256');
    verify.update(fileData);
    verify.end();
    const isValid = verify.verify(publicKeyPem, signature, 'base64');
    return isValid;
}

const fs = require('fs');

// Generate keys
const { privateKeyPem, publicKeyPem } = generateKeyPair();

const fileData = fs.readFileSync('test.txt');

// Sign the file
const signature = signFile(privateKeyPem, fileData);

// Verify the file integrity
const isValid = verifySignature(publicKeyPem, fileData, signature);
if (isValid) {
    console.log("File integrity verified: No tampering detected.");
} else {
    console.log("File integrity check failed: File has been tampered.");
}