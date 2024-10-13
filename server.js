const connectDB=require("./config/db");

connectDB();

const express=require("express");


app=express();
const authRoutes=require('./routes/auth');
app.use(express.json());
app.use(authRoutes);

const adminRoutes=require('./routes/admin');
app.use(adminRoutes);

const studentRoutes=require('./routes/student');
app.use(studentRoutes);

app.use(express.static('public'));
const port=5000;
app.listen(port,()=>
console.log(`Server started! Running on port:${port}`));