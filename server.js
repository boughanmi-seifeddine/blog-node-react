const dotenv = require('dotenv');
// connect ./config.env to process.env of node with dotenv module
dotenv.config({ path: './config.env' });
const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
