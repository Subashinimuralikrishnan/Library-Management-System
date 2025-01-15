const express=require('express');
const {authenticateToken,authorizeAdmin}=require("../middlewares/authMiddleware");
const router=express.Router();
const Book =require("../models/book");

router.get('/books',authenticateToken,async(req,res)=>
    {
        console.log("Inside! in get BOOKS!");
        try
        {
            const books=await Book.find({copiesAvailable:{$gt:0}});
            res.status(200).json({'books':books});
    
        }
        catch(err)
        {
            res.status(500).json({error:"Server error!"});
        }
    });
router.post('/books',authenticateToken,authorizeAdmin,async (req,res)=>{
    console.log("Hello post!");
const {id,title,author,copiesAvailable}=req.body;
console.log(req.body);
try{
    const book = new Book({id,title,author,copiesAvailable});
    await book.save();
    console.log('saved successfully the books!')
    res.status(201).json(book);
}
catch(err){
    res.status(500).json({error:"Invalid arguments/parameters/fields..."});

}
});
module.exports=router;