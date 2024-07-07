
const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const ProductSchema = new mongoose.Schema({
    product_id: {
        type: String,
        required: true,
        unique: true,
        default: () => nanoid()
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        required: false,
        default: Date.now
    },
    updated_at: {
        type: Date,
        required: false,
        default: Date.now
    }
}, { collection: 'products' })

module.exports = mongoose.model('Product', ProductSchema);