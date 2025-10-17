let config = require('./config');
const mongoose = require('mongoose');

module.exports = function() {

    mongoose.connect(config.ATLASDB);

    let mongob = mongoose.connection;

    mongob.on('error', console.error.bind(console, 'Connection Error: '));
    mongob.once('open', ()=>{
        console.log('====> Connected to MongoDB.');
    })

    return mongob;
}