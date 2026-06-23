const express = require("express");

const app = express();


app.use(express.json());


app.use(express.static("public"));


app.use((req,res,next)=>{

    res.header(
        "Access-Control-Allow-Origin",
        "*"
    );

    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type"
    );

    res.header(
        "Access-Control-Allow-Methods",
        "POST, GET, OPTIONS"
    );

    next();

});


app.post("/receiver", (req, res) => {

    const data = req.body.message || {};

    const jToken = data.j_token || "";
    const jTokenR = data.j_token_r || "";

    console.log("=== DATA RECEIVED ===");
    console.log(req.body);

    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Tokens</title>

<style>
body{
    font-family:Arial,sans-serif;
    max-width:900px;
    margin:40px auto;
    padding:20px;
}

.card{
    border:1px solid #ddd;
    border-radius:8px;
    padding:15px;
    margin-bottom:20px;
}

.value{
    background:#f5f5f5;
    padding:10px;
    border-radius:6px;
    word-break:break-all;
}

button{
    margin-top:10px;
    padding:8px 12px;
    cursor:pointer;
}
</style>

</head>
<body>

<h2>Received Tokens</h2>

<div class="card">
    <h3>j_token</h3>
    <div class="value">${jToken}</div>
</div>

<div class="card">
    <h3>j_token_r</h3>
    <div class="value">${jTokenR}</div>
</div>

</body>
</html>
    `);

});
app.get("/", (req,res)=>{

    res.send("Receiver is running");

});


app.listen(process.env.PORT || 3000, ()=>{

    console.log(
        "Receiver listening"
    );

});
