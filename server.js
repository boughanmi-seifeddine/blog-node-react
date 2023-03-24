const mongoose = require('mongoose');
const dotenv = require('dotenv');
// connect ./config.env to process.env of node with dotenv module
dotenv.config({ path: './config.env' });
const app = require('./app');
// build mongo db string connection
const DBString = process.env.DATABASE_LOCAL.replace(
    'dbname',
    process.env.DATABASENAME
);
mongoose.connect(DBString, {
  useNewUrlParser: true
}).then(() => console.log('DB connection successful!'));
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
