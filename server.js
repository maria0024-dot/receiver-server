const express = require("express");

const app = express();

app.use(express.json());


app.use((req,res,next)=>{

    res.header(
        "Access-Control-Allow-Origin",
        "*"
    );

    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type"
    );

    next();

});


app.post("/receiver", (req,res)=>{


    console.log("=== DATA RECEIVED ===");

    console.log(req.body);



    res.json({

        status:"ok"

    });


});


app.get("/", (req,res)=>{

    res.send("Receiver is running");

});


app.listen(process.env.PORT || 3000, ()=>{

    console.log(
        "Receiver listening"
    );

});
