import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
const productSchema = mongoose.Schema({
    name:{
        required: true,
        type: String,
        unique: 1,
        maxlength: 100
    },
    description:{
        required: true,
        type: String,
        maxlength: 100000
    },
    price:{
        required: true,
        type: Number,
        maxlength: 255
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    shipping:{
        required: true,
        type: Boolean
    },
    available:{
        required: true,
        type: Boolean
    },
    featured:{
        required: true,
        type: Boolean
    },
    sold:{
        type: Number,
        maxlength: 100,
        default: 0
    },
    publish:{
        required: true,
        type: Boolean
    },
    images:{
        type: Array,
        default:[]
    },
    availableQuantity: {
        type: Number,
        maxlength: 100,
        default: 0
    }
}, {
    timestamps:true
});

export default mongoose.model('Product', productSchema);