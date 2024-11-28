const { MANAGER } = require("../../config.js");
const { Erc721Actor } = require("../ic/icAgent.js");
const { getAccountCredentials,ab2str } = require("../converter.js");
const MANAGER_USER = getAccountCredentials(MANAGER, 0);
const encoder = new TextEncoder()
async function main() {
    let erc721 = "2zepj-eqaaa-aaaah-aq4ba-cai";
    let erc721Actor = Erc721Actor(erc721, MANAGER_USER);
    let tokens = await erc721Actor.getTokens();
    let params = []
    for (token of tokens) {
        let metadata = token[1].nonfungible.metadata[0];
        let json = JSON.parse(ab2str(metadata));
        json.url = json.url.replace("https://bafybeig2d4fzipnkwckx63qod7bu5rerroubd6vawb3c65fld7vcytgefm.ipfs.w3s.link/","https://bafybeig2d4fzipnkwckx63qod7bu5rerroubd6vawb3c65fld7vcytgefm.ipfs.w3s.link/image")
        json.thumb = json.thumb.replace("https://bafybeig2d4fzipnkwckx63qod7bu5rerroubd6vawb3c65fld7vcytgefm.ipfs.w3s.link/","https://bafybeig2d4fzipnkwckx63qod7bu5rerroubd6vawb3c65fld7vcytgefm.ipfs.w3s.link/image")
        console.log(json)
        // if (token_ids.indexOf(index) != -1) {
        //     console.log(`index:${index}`);
        //     console.log(json)
        //     json.url = json.url.replace("png","jpg");
        //     json.thumb = json.thumb.replace("png","jpg");
        //     params.push([index, [[...encoder.encode(JSON.stringify(json))]]])
        // }
    }
    console.log("parmas",params);
    // return 
    // await erc721Actor.updateMetadata(params);
}

main();