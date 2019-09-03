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
    //   console.log('in saltHashPassword ');
    var salt = 'saltHashPassword123'; /** Gives us salt of length 16 */
    // console.log('after genRandomString ');
    var passwordData = WebShoppEncrypt(userpassword, salt);
    console.log('UserPassword = ' + userpassword);
    console.log('Passwordhash = ' + passwordData.passwordHash);
    console.log('nSalt = ' + passwordData.salt);
    return (passwordData.passwordHash)
}

//******End Encrypt password**********/

/*******function to get cart data from login router********/
//return cart data if exists on open status.
//if not - create new cxart and return  the _id
/*var getCartData = function (userId) {
 //   console.log('in getCartData function');
  //  console.log('userId - ' + userId)
    CartSchema.find({ personId: userId ,status:'1'}, function (err, data) {
        if (data.length > 0) {  //on Open's status
            console.log('cart founded-' + JSON.stringify(data));
            return (JSON.stringify(data));  //todo update on open
        } else {//create new cart
            console.log('in else')
            const cartData = new CartSchema();
            // cartData._id = '';
            cartData.personId = userId;
            cartData.status = 1;//open
            cartData.createDate = new Date();
            cartData.updateDate = new Date();
            cartData.save()
                .then(cartD => {
                    console.log('after save')
                    return (cartD);
                })
                .catch(err => {
                    console.log('in error ' + err)
                    return (null);
                });
        }
    });

}
*/
module.exports = { saltHashPassword};//, getCartData };


/*var getCartData = function (userId) {
    console.log('in getCartData function');
    CartSchema.find({ _id: userId }, function (err, data) {
        if ((data.length) && (data['status'] === 1)) {  //on Open's status
            res.json(data);  //todo update on open
        } else {//create new cart
            const cartData = new CartSchema();
            cartData.personId = userId;
            cartData.status = 1;//open
            cartData.createDate = new Date();
            cartData.updateDate = new Date();
            cartData.save()
                .then(cartD => {
                    res.json({
                        status: 'New cart added successfully',
                        cartData: cartD,
                    });
                })
                .catch(err => {
                    res.status(400).send("unable to save to database");
                });
        }
    });
 */