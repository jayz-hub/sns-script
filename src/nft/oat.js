const {OatActor} = require("../ic/icAgent");
const { Erc721Actor } = require("../ic/icAgent.js");
var fs = require('fs')
async function export_oat_holders() {
    let oatActor = OatActor("v43fl-cyaaa-aaaah-abc7a-cai");
    let events = await oatActor.getEvents();
    for(const event of events) {
        const canister = event.canister.toString();
        const name = event.name;
        await export_holders(canister,name);
    }
}
async function export_Web3_Alphas() {
    const canister = "zi3rc-wiaaa-aaaah-ad2sq-cai";
    const name = "Web3 Alphas";
    await export_holders(canister,name);
}
async function export_Ai() {
    const canister = "kkbh4-7iaaa-aaaah-adzuq-cai";
    const name = "AI Avatar Skin: Novia Cybereel Drop";
    await export_holders(canister,name);
}
async function export_martain() {
    const canister = "3hzxy-fyaaa-aaaap-aaiiq-cai";
    const name = "Martian";
    await export_holders(canister,name);
}

async function export_holders(canister,name) {
    console.log(`start export ${canister} holders`);
    let nft_actor = Erc721Actor(canister);
    let registries = await nft_actor.getRegistry();
    let holders = new Map();
    for(const registry of registries) {
        let account = registry[1];
        if (holders.get(account)) {
            let count = holders.get(account);
            holders.set(account, count + 1);
        } else {
            holders.set(account, 1);
        }
    }
    let strs = "account,own_num\r\n";
    for (const [key, value] of holders.entries()) {  
        console.log(`${key}:${value}`)
        strs += key + "," + value + "\r\n";
    }
    fs.writeFileSync(`${name}.csv`, strs);
}


async function main() {
    await export_Web3_Alphas()
    // await export_Ai()
    // await export_martain()
    // await export_oat_holders();
}
main()
