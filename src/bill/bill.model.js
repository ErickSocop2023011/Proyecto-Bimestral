import {Schema, model} from "mongoose";

const billSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true
    },
    products: [{
        idProduct: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        subTotal: {
            type: Number,
            required: true
        }
    }],
    total: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})

export default model('Bill', billSchema)