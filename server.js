const express = require("express")
const mongoose=require("mongoose")
const app=express()
const cors = require("cors");
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, "public")));
mongoose.connect("mongodb+srv://mani12345qwert_db_user:MtVxOTHg8LXwgNkf@cluster0.ougkmla.mongodb.net/?appName=Cluster0")
.then(()=>console.log("mongoDb is connected successfully"))
.catch(err=>console.error("error",err))

const schema=new mongoose.Schema({
    itemId:{
        type:Number,
        unique:true,
        required:true
    },
    itemName:String,
    price:Number,
    available:Number
})

const onlineShop=mongoose.model("shopping",schema)

app.post("/api/items",async (req,res)=>{
    try{
        const online=await onlineShop.insertOne(req.body)
        console.log("Item added successfully")
        res.status(200).send("added successfully")
    }
    catch(err){
        const error=err.message
        res.status(500).send(error)
    }

})
app.get("/api/items",async(req,res)=>{
    try{
        const data=await onlineShop.find()
        res.send(data)
    }catch(err){
        res.status(500).send(err)
    }
})

app.put("/api/items/:itemId", async (req,res)=>{
    try{
        const result=await onlineShop.updateOne(
        { itemId:req.params.itemId},
        {$set:req.body}
    )
     if (result.matchedCount === 0) {
            return res.status(404).send("Item not found");
        }
    res.send("data updated")
    }catch(err){
        res.status(500).send(err)
    }

})

app.delete("/api/items/:itemId", async (req,res)=>{
    try{
        const result=await onlineShop.deleteOne(
        { itemId:req.params.itemId}
    )
       if (result.deletedCount === 0) {
            return res.status(404).send("Item not found");
        }
    return res.send("data deleted")
    }catch(err){
        res.status(500).send(err)
    }

})


app.listen(3000,()=>{
    console.log("server is running at 3000 port")
})