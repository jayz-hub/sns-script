const {principalToAccountIdentifier,principalToSubAccount,getAccountCredentials} = require("./converter.js");
const {MNEMONIC,YUKU_SWAP_CANISTER} = require("../config.js");
const { Principal } = require("@dfinity/principal");
const MAIN_USER = getAccountCredentials(MNEMONIC,0);
const FIRST_USER = getAccountCredentials(MNEMONIC,1);
const SECOND_USER = getAccountCredentials(MNEMONIC,1);
function main() {
    const user = Principal.fromText("5fq4w-lyaaa-aaaag-qjqta-cai");
    // const user = Principal.fromText("tx5c4-hrsfx-6vtmx-6qkhq-yfqkl-ekxba-yhmvi-ttfcu-c7fh6-c4fi3-hqe");

    console.log("user:",user.toString());
    let subAccount = principalToSubAccount(user);
    console.log(subAccount)
    console.log(principalToAccountIdentifier(Principal.fromText(YUKU_SWAP_CANISTER),subAccount))
}
// main();
const canister_governace = "dwv6s-6aaaa-aaaaq-aacta-cai";
const swapPoolCanister = "5fq4w-lyaaa-aaaag-qjqta-cai";
let subAccount2 = principalToSubAccount(Principal.fromText(canister_governace));
console.log(subAccount2)
let subAccount = principalToSubAccount(Principal.fromText(swapPoolCanister));
console.log(subAccount)
console.log(principalToAccountIdentifier(Principal.fromText(canister_governace),subAccount))
// 7942...4f55