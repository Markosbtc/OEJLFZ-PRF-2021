const mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true, lowercase: true },
    name: { type: String, required: true },
    desc: { type: String },
    price: { type: Number, required: true }
}, { collection: 'item' });

mongoose.model('item', itemSchema);