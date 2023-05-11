const mongoose = require('mongoose');
const mongoUrl = "mongodb://localhost:27017/";

const connectToMongo=  ()=>{
    mongoose.connect(mongoUrl).then(()=> console.log ("connected to mongo successfully")).catch(()=> console.error("it's fail to connect with mongodatabase"))
};

module.exports= connectToMongo;