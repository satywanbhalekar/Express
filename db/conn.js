const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://satyawan:satyam@cluster.vv5iexl.mongodb.net/olympics", {
    
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
   
}).then(() => {
    console.log("Connection successful");
}).catch((e) => {
    console.log("Connection unsuccessful:", e);
});
