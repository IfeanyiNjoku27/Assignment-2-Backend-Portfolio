const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema(
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

//Ensure virtual fields are serialized 
ContactSchema.set('toJSON', {
    versionKey:false,
    transform: function (doc, ret) {
        delete ret._id;
    }
})

module.exports = mongoose.model('Contact', ContactSchema);