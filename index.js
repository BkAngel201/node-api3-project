// code away!
require('dotenv').config()
const start = require('./server')

const Port = process.env.PORT || 5000
start.listen(Port, () => {
    console.log(`*** Server Listening Port ${Port}***`);
})