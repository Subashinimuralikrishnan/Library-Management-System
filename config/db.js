var conn_string="mongodb+srv://admin:admin@subacluster.zqxy1.mongodb.net/libraryDB?retryWrites=true&w=majority&appName=subacluster";
const mongoose=require("mongoose");
const connectDB=async  ()=>
{
    try{
        const connect = await mongoose.connect(conn_string,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });

        console.log("Database connected:",connect.connection.host)

    }
    catch(err)
    {
        console.log(err);
        process.exit(1);
    }
}
module.exports=connectDB;