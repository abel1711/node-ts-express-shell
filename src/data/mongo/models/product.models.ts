import { Schema, model } from "mongoose";


const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
    },
    price: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
    },
    available: {
        type: Boolean,
        default: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },

});

productSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform(doc, ret, options) {
        delete ret._id;
        
    },
})


export const ProductModel = model('Product', productSchema);