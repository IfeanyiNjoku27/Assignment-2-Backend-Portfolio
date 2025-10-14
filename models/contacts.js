const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema(
    {
        firstName: String,
        lastname: String,
        email: {
            type: String,
            unique: true,
            match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
        }
    }
);

module.exports = mongoose.model('Contact', contactSchema);