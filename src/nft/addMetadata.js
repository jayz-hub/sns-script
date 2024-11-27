const { Erc721Actor } = require("../ic/icAgent.js");
const { getAccountCredentials ,ab2str} = require("../converter.js");
const encoder = new TextEncoder()
async function updateMetadata(erc721) {
    let user = getAccountCredentials('car mutual present alter oil index siege brick collect level split feature', 0)
    let erc721_actor = Erc721Actor(erc721, user);
    let tokens = await erc721_actor.getTokens()
    let params = []
    for (i = 0; i < tokens.length; i++) {
        let token = tokens[i]
        let tokenIndex = token[0]
        let metadata = JSON.parse(ab2str(token[1]['nonfungible'].metadata[0]))
        metadata.name = i + "";
        if (i < 523) {
            metadata.description = `This is the NFT from Iconic Stars collection. These are the building blocks of our collection, making up 50% of the total supply. With a 2x multiplier and 100 points.`
            metadata.attributes = JSON.parse(`[
                {
                    "trait_type": "Rare",
                    "value": "Common"
                },
                {
                    "trait_type": "Stars",
                    "value": "1 star"
                },
                {
                    "trait_type": "Points",
                    "value": "100 points"
                },
                {
                    "trait_type": "Multiplier",
                    "value": "2x"
                }
            ]`)
        }else if (i > 522 && i < 786) {
            metadata.description = `This is the NFT from Iconic Stars collection. A step up in rarity, these NFTs offer a 3x multiplier and 200 points. They represent 25% of the collection.`
            metadata.attributes = JSON.parse(`[
                {
                    "trait_type": "Rare",
                    "value": "Uncommon"
                },
                {
                    "trait_type": "Stars",
                    "value": "2 star"
                },
                {
                    "trait_type": "Points",
                    "value": "200 points"
                },
                {
                    "trait_type": "Multiplier",
                    "value": "3x"
                }
            ]`)
        }else if (i > 785 && i < 944) {
            metadata.description = `This is the NFT from Iconic Stars collection. Comprising 15% of the collection, these rare gems provide a 4x multiplier and 300 points, giving holders an edge in earning and rewards.`
            metadata.attributes = JSON.parse(`[
                {
                    "trait_type": "Rare",
                    "value": "Rare"
                },
                {
                    "trait_type": "Stars",
                    "value": "3 star"
                },
                {
                    "trait_type": "Points",
                    "value": "300 points"
                },
                {
                    "trait_type": "Multiplier",
                    "value": "4x"
                }
            ]`)
        }else if(i > 943 && i < 1018){
            metadata.description = `This is the NFT from Iconic Stars collection. These NFTs account for 7% of the collection. They come with a 6x multiplier and 500 points.`
            metadata.attributes = JSON.parse(`[
                {
                    "trait_type": "Rare",
                    "value": "Epic"
                },
                {
                    "trait_type": "Stars",
                    "value": "4 star"
                },
                {
                    "trait_type": "Points",
                    "value": "500 points"
                },
                {
                    "trait_type": "Multiplier",
                    "value": "6x"
                }
            ]`)
        }else {
            metadata.description = `This is the NFT from Iconic Stars collection. These are the rarest, making up only 3% of the total. With a 10x multiplier, 1000 points.`
            metadata.attributes = JSON.parse(`[
                {
                    "trait_type": "Rare",
                    "value": "Legendary"
                },
                {
                    "trait_type": "Stars",
                    "value": "5 star"
                },
                {
                    "trait_type": "Points",
                    "value": "1000 points"
                },
                {
                    "trait_type": "Multiplier",
                    "value": "10x"
                }
            ]`)
        }
        // console.log(metadata)
        params.push([tokenIndex, [[...encoder.encode(JSON.stringify(metadata))]]])
    }
    // return
    await erc721_actor.updateMetadata(params)
}

async function main() {
    let canister = "6c5sv-yyaaa-aaaah-aecoq-cai";
    await updateMetadata(canister);
};
main()