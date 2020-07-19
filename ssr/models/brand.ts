import * as mongoose from 'mongoose';

const brandSchema = mongoose.Schema({
    name:{
        required: true,
        type: String,
        unique: 1,
        maxlength:100
    },
    description: {
        required: true,
        type: String
    }
});

export default mongoose.model('Brand',brandSchema);
