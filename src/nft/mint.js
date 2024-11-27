const { Principal } = require('@dfinity/principal');
const { Erc721Actor,YukuActor } = require("../ic/icAgent.js");
const { getAccountCredentials, ab2str } = require("../converter.js");
async function mint(erc721, user, args) {
    let erc721_actor = Erc721Actor(erc721, user);
    let res = await erc721_actor.batchMintNFT(args);
    console.log(res)
}

const encoder = new TextEncoder()
let chunkSize = 250;
async function load_attribute_from_json(erc721,user) {
    for (i = 0; i < 40; i++) {
        let mint_args = [];
        for(j = i * chunkSize;j< (i+1) * chunkSize;j++) {
            let metadata = {
                "name": `AI Agent #${i}`,
                "mimeType": "image",
                "url": `https://bafybeifmsmdoe7bj5x7bcyrrdwromlpkij3rcs27eriajixnn56vgamrpa.ipfs.w3s.link/yuku_aI_${j}.jpg`,
                "thumb": `https://bafybeifmsmdoe7bj5x7bcyrrdwromlpkij3rcs27eriajixnn56vgamrpa.ipfs.w3s.link/yuku_aI_${j}.jpg`,
            }
            if (j < 9000) {
                metadata.attributes = [{
                    "trait_type": "tier",
                    "value": "A"
                }];
            } else if (j < 9900) {
                metadata.attributes = [{
                    "trait_type": "tier",
                    "value": "S"
                }];
            } else {
                metadata.attributes = [{
                    "trait_type": "tier",
                    "value": "S+"
                }];
            }
            let mint_arg = {
                to: { "principal": Principal.fromText("hytfo-grj3z-jgww5-m67dc-bg4t6-tzuw3-76bdj-i2ybu-7ptwv-xpoxn-gqe") },
                metadata: [[...encoder.encode((JSON.stringify(metadata)))]]
            }
            mint_args.push(mint_arg);
        }
        await mint(erc721, user, mint_args);
    }
}

async function load_attribute_from_file(path) {

}

async function importExplore(yuku,erc721,minter,creator) {
    let collection_init = {
        'url': [],
        'featured': [],
        'logo': ["https://bafybeifyrb6wmzafyo2lx6gueqrl3zixrwzzah75r3cj6bfje6hdadjbzm.ipfs.w3s.link/Eldritch%20Pact%20collection%20Logo.png"],
        'name': ['Fragments of the Eldritch Pact'],
        'banner': ["https://bafybeifyrb6wmzafyo2lx6gueqrl3zixrwzzah75r3cj6bfje6hdadjbzm.ipfs.w3s.link/Eldritch%20Pact%20%20Banner.png"],
        'description': [`
            Fragments of the Eldritch Pact is an NFT collection deeply inspired by the Cthulhu Mythos, where each NFT represents a unique fragment of a larger, foreboding narrative. These NFTs arise from Bitomni's strategic partnerships, with each collaborator contributing a distinct element to this evolving story. Together, they create a tapestry of eldritch horror, where every NFT tells its own tale, yet seamlessly fits into a grander mosaic of cosmic dread and ancient pacts.
            With the emergence of BitoBridge, the world draws closer to exploring this mysterious, unknown, and unsettling realm. As more fragments are collected, the full narrative emerges, drawing participants deeper into the eerie depths of these interconnected mythos, revealing the hidden secrets that will shape the future of the crypto world.
        `],
        'links': [
            {
                "yoursite": ["https://www.bitomni.io"],
                "discord": ["https://oc.app/community/dq6eb-jiaaa-aaaar-beeqa-cai/channel/214369805762538754138185926899449354254"],
                "twitter": ["https://twitter.com/Bitomni_Global"],
                "instagram": [],
                "medium": ["https://medium.com/@bitomni"],
                "telegram": ["https://t.me/Bitomni"]
            }
        ],
        'isVisible': true,
        'royalties': { 'rate': 0, 'precision': 0 },
        'category': ["art"],
        'releaseTime': [new Date('2050-01-01 00:00:00 GMT+8').getTime() * 1000000],
        'openTime': [],
        'standard': {
            'ext': null
        }
    };
    let erc721Actor = YukuActor(yuku, creator);
    console.log(collection_init);
    let res = await erc721Actor.importCollection(Principal.fromText(minter), erc721, collection_init);
    console.log(res);
}

let yuku= "udtw4-baaaa-aaaah-abc3q-cai";
async function main() {
    let user = getAccountCredentials('car mutual present alter oil index siege brick collect level split feature', 0)
    console.log("user:", user.getPrincipal().toString());
    // return
    let erc721 = "puzb7-uyaaa-aaaah-aebgq-cai";
    let args =await load_attribute_from_json(erc721,user);
};

main()