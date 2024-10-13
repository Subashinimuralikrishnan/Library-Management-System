const express=require('express');
const {authenticateToken,authorizeAdmin}=require("../middlewares/authMiddleware");
const router=express.Router();
const Book =require("../models/book");
router.post('/books',authenticateToken,authorizeAdmin,async (req,res)=>{
const {title,author,copiesAvailable}=req.body;
try{
    const book = new Book({title,author,copiesAvailable});
    await book.save();
    res.status(201).json(book);
}
catch(err){
    res.status(500).json({error:"Invalid arguments/parameters/fields..."});

}
});

router.get('/books',authenticateToken,async (req,res)=>
{
    try{
        const books=await Book.find();
        res.status(200).json(books);
    }
    catch(err)
    {
        res.status(500).json({error:'Server error!'});
    }
});
module.exports=router;