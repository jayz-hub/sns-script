const { MANAGER } = require("../../config.js");
const { Erc721Actor } = require("../ic/icAgent.js");
const { getAccountCredentials,ab2str } = require("../converter.js");
const encoder = new TextEncoder()
async function main() {
    let token_ids = [48, 51, 52, 53]
    let erc721 = "grh6z-jaaaa-aaaah-ad7gq-cai";
    let erc721Actor = Erc721Actor(erc721, MANAGER_USER);
    let tokens = await erc721Actor.getTokens();
    let params = []
    // for (token of tokens) {
    //     let index = token[0];
    //     let metadata = token[1].nonfungible.metadata[0];
    //     let json = JSON.parse(ab2str(metadata));
    //     if (token_ids.indexOf(index) != -1) {
    //         console.log(`index:${index}`);
    //         console.log(json)
    //         json.url = json.url.replace("png","jpg");
    //         json.thumb = json.thumb.replace("png","jpg");
    //         params.push([index, [[...encoder.encode(JSON.stringify(json))]]])
    //     }
    // }
    for (token_id of token_ids) {
        let json = {
            name: `Modernistic Villas#${token_id}`,
            mimeType: 'image',
            url: `https://cf-assets.yuku.app/BatchMint/Modernistic_Villas_NFT_Collection/${token_id}.jpg`,
            thumb: `https://cf-assets.yuku.app/BatchMint/Modernistic_Villas_NFT_Collection/${token_id}.jpg`
        }
        console.log(json)
        params.push([token_id, [[...encoder.encode(JSON.stringify(json))]]])
    }
    console.log(params);
    // return 
    await erc721Actor.updateMetadata(params);
}

main();