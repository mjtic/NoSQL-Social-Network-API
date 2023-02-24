const { connect, connection } = require('mongoose');
// const mongoose = require("mongoose");
require('dotenv').config();
const connectionString = process.env.MONGODB_URI

connect( connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// mongoose.set('strictQuery', false);
// mongoose.set('strictQuery', true);
/* STACK OVERFLOW (https://stackoverflow.com/questions/74747476/deprecationwarning-mongoose-the-strictquery-option-will-be-switched-back-to)and CHAT GPT
To prepare for this change, the warning message suggests that you use 
mongoose.set('strictQuery', false); if you want to explicitly set the option to its default value,
 or use mongoose.set('strictQuery', true); to suppress the warning.

It's important to note that this warning is a deprecation warning, 
which means that this behavior will be removed in future versions of Mongoose. 
Therefore, it's recommended that you update your code accordingly to prevent 
any future compatibility issues.
*/
module.exports = connection;
