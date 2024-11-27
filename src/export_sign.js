const { sign } = require('crypto');
const fetch = require('node-fetch');  
const  fs = require('fs');
async function main() {
    const headers = {
        "X-Token": "fNISAmB5wRN2dEpTs9fHsAozbWZEkmg5"
    }

    const requestOptions = {
        method: "GET",
        headers: headers,
        redirect: "follow"
    };

    fetch("https://api.yuku.app/user/sign/export", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            let json = JSON.parse(result);
            let signs = json.data;
            let content = "user_id,email,date\n";
            for (var sign of signs) {
                content += sign.user_id+"\t" + "," + sign.email + "," + sign.sign_in_date + "\r\n";
            }
            fs.writeFileSync("./sign.csv",content);
        })
        .catch((error) => console.error(error));
}

main();