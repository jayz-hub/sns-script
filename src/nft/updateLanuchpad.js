const { LaunchpadActor } = require("../ic/icAgent.js");
const { getAccountCredentials } = require("../converter.js");
const { Principal } = require('@dfinity/principal');
const { MANAGER } = require("../../config.js");
const MANAGER_USER = getAccountCredentials(MANAGER, 0);
async function update(erc721) {

}

async function main() {
    let erc721 = "rrcvy-giaaa-aaaah-aq2aa-cai";
    let launchpad = "pczmq-maaaa-aaaah-abhwa-cai";
    let launchpadActor = LaunchpadActor(launchpad, MANAGER_USER);
    _collection = await launchpadActor.getCollection(Principal.fromText(erc721));
    let collection = _collection[0];
    collection.endTime = new Date('2024-12-31 00:00:00').getTime() * 1000000;
    console.log(collection)
    let res = await launchpadActor.removeCollection(collection.id);
    console.log("removeCollection :result:",res);
    let resp =await launchpadActor.importCollection(collection)
    console.log("importCollection resp:",resp)
    // console.log(collection.typicalNFTs[4].NFTUrl)
}

main();