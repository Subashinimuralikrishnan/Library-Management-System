const mongoose=require('mongoose');
const BookSchema= new mongoose.Schema({
    title: {
        type:String, 
        required:[true,'All fields are mandatory!']

    },
    author:
    {
        type:String,
        required:[true,'Author required!']
    },
    copiesAvailable:
    {
        type:String,
        default:1
    }
});
module.exports=mongoose.model('Book',BookSchema);