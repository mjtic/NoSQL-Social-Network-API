const {User} = require('../Models');

module.exports = {
 //Get all users
 getUsers(req, res){
    User.find().
 }
}