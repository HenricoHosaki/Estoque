const crypto = require('crypto');

function generatePassword(){
    return crypto.randomBytes(10).toString('hex'); 
}

module.exports = generatePassword;