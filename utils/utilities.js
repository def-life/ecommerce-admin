import crypto from "crypto"

function generateRandomImgNames(bytes=32) {
    return crypto.randomBytes(bytes).toString('hex');
}

export {generateRandomImgNames}