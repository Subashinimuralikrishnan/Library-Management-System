const mongoose=require("mongoose");
const bcrypt=require('bcryptjs');
const StudentSchema =new mongoose.Schema({
    name: {
        type:String,
        required:[true,'Name is mandatory']
    },
    email:
    {
        type:String,
        required:[true,'Email is mandatory!'],
        unique:true
        
    },
    password:
    {
        type:String,
        required:true
    },
    booksBorrowed:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Book'
        }
    ],
    dueAmount:
    {
        type:Number,
        default:0
    }
});

StudentSchema.pre('save',async function(next)
{
    if(!this.isModified('password'))return next();
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
});

module.exports=mongoose.model('Student',StudentSchema);