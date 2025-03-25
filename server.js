require('dotenv').config();
const express = require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const app=express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

const UserSchema=new mongoose.Schema({
    name:String,
    Id:Number
});

const User=mongoose.model('User',UserSchema);

const BookSchema= new mongoose.Schema({
    Title:{type:String, required:true},
    Author:{type:String,required:true},
    Genre:{type:String,required:true},
    publishedYear:{type:Number},
    AvailableCopies:{type:Number,required:true},
    borrowedBy:{type:String}
});

const book=mongoose.model('books',BookSchema);

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>{console.log("Connected to mongoDB")})
    .catch((err)=>{
        console.error("Error connecting to mongoDB");
    });

app.get("/",(req,res)=>{
        res.send("Welcome to our library!");
});

app.post("/books",async(req,res)=>{
    const newBook= new book(req.body);
    await newBook.save();
    res.json(newBook);

    if(!book){
        res.json("book should contain all required fields");
    }
});

app.get("/books",async(req,res)=>{
    const books= await book.find();
    res.json(books);
});

app.get("/books/:id",async(req,res)=>{
    const bookid= await book.findById(req.params.id,req.body);
    res.json(bookid);
});

app.put("/books/:id",async(req,res)=>{
    const updatedBook= await book.findByIdAndUpdate(req,params.id,req.body,{new:true});
    res.json(updatedBook);

    if(!id){
        res.json("invaild book id");
    }
});

app.delete("/books/:id",async(req,res)=>{
    await book.findByIdAndDelete(req.params.id);
    res.json({message:"Book deleted"});

    if(!id){
        res.json("invaild book id");
    }
});

app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`);
});
