const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    name: { type: String, required: true },
    dateBirth: { type: String, required: true },
    contactMail: { type: String, required: false },
    contactTel: { type: String, required: false },
    localisation: { type: String, required: true },
    isStudent: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);