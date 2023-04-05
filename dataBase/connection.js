const mongoose = require('mongoose');
const dotenv = require('dotenv');
// connect ./config.env to process.env of node with dotenv module
dotenv.config({ path: './config.env' });

// build mongo db string connection
const DBString = process.env.DATABASE_LOCAL.replace(
    'dbname',
    process.env.DATABASENAME
);
// @description estabilish db connection
// @return promise
const getConnection = async ()=>{
    try {
        await mongoose.connect(DBString, {
            useNewUrlParser: true
        })
        console.log('DB connected successfully !!!')
    } catch (err){
        console.log(err, 'something went wrong with db connection...')
        process.exit(1)
    }

}
/*mongoose.connect(DBString, {
    useNewUrlParser: true
}).then(() => console.log('DB connection successful!')).catch((err)=>{
    console.log(err)
    process.exit(1)
})*/
module.exports = getConnection()
