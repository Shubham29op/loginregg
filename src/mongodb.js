const mongoose=require("mongoose")

mongoose.connect('mongodb+srv://sns:$hubham2004@cluster0.fxj9y.mongodb.net/Loginawgp')
  
.then(()=>{
    console.log("mongodb connected");
})

.catch((error)=>{
    console.log("failed to connect",error);
})

const LogInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


const LogInCollection=new mongoose.model("Collection1",LogInSchema)

module.exports=LogInCollection