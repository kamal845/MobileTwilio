const mongoose=require('mongoose');
const connectionURL="mongodb://localhost:27017/mobileTwilio";
const databaseConnect= async()=>{
try {
    mongoose.connect(connectionURL),{
        useNewUrlParser:true,
        useUnifiedTopology:true
        };
        console.log("database is connected");
} catch (error) {
    console.log("error");
}
}
module.exports=databaseConnect;