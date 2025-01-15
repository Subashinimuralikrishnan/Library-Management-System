const express=require('express');
const router=express.Router();
const Book=require('../models/book');
const BorrowedBook=require('../models/borrowedbook');
const {authenticateToken}=require('../middlewares/authMiddleware');



router.get('/borrowed-books',authenticateToken,async(req,res)=>
{
    try{
        const studentId=req.body["_id"];
        const Borrbooks=await BorrowedBook.find({student:studentId}).populate('book');
        if(!Borrbooks.length)
        {
            return res.status(404).json({
                message:'No books borrwed by the student.'
            });
        }
        res.json(Borrbooks);

    }
    catch(err)
    {
        console.log("Hi!");
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});





module.exports=router;