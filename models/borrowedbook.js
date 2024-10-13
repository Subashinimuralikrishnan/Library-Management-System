const mongoose=require('mongoose');
const BorrowedBookSchema =new mongoose.Schema({
    student:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student',
        required:true
    },
    book:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Book',
        required:true
    },
    borrow_Date:
    {
        type:Date,
        default:Date.now
    },
    return_Date:
    {
        type:Date,
        required:true,
        default:Date.now+10
    }
});

module.exports=mongoose.model('borrowedbook',BorrowedBookSchema);