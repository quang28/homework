const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema(
    {
        name : {
            type : String,
            required: true
        },
        category : {
            type: String,
            required: true,
            unique: true
        },
    },
    { timestamps: false },
)
module.exports = mongoose.model("Product", ProductSchema);