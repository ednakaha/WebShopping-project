const CartSchema = require('../server/models/cart.model');
//******Encrypt password**********/
var crypto = require('crypto');
// generates random string of characters i.e salt */
function genRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0, length);   /** return required number of characters */
};


function WebShoppEncrypt(password, salt) {
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    };
};

var saltHashPassword = function (userpassword) {
    var salt = 'saltHashPassword123'; /** Gives us salt of length 16 */
    var passwordData = WebShoppEncrypt(userpassword, salt);
    // console.log('UserPassword = ' + userpassword);
    // console.log('Passwordhash = ' + passwordData.passwordHash);
    // console.log('nSalt = ' + passwordData.salt);
    return (passwordData.passwordHash)
}

//******End Encrypt password**********/
module.exports = { saltHashPassword};//, getCartData };

