const {principalToAccountIdentifier,principalToSubAccount,getAccountCredentials} = require("./converter.js");
const {MNEMONIC,YUKU_SWAP_CANISTER} = require("../config.js");
const { Principal } = require("@dfinity/principal");
const MAIN_USER = getAccountCredentials(MNEMONIC,0);
const FIRST_USER = getAccountCredentials(MNEMONIC,1);
const SECOND_USER = getAccountCredentials(MNEMONIC,1);
function main() {
    // const user = Principal.fromText("5fq4w-lyaaa-aaaag-qjqta-cai");
    // const user = Principal.fromText("tx5c4-hrsfx-6vtmx-6qkhq-yfqkl-ekxba-yhmvi-ttfcu-c7fh6-c4fi3-hqe");

    console.log("user:",MAIN_USE.getPrincipal().toString());
    // let subAccount = principalToSubAccount(user);
    // console.log(subAccount)
    // console.log(principalToAccountIdentifier(Principal.fromText(YUKU_SWAP_CANISTER),subAccount))
}
// main();
const canister_governace = "auadn-oqaaa-aaaaq-aacya-cai";
let subAccount2 = principalToSubAccount(Principal.fromText(canister_governace));
console.log(subAccount2)
let subAccount = principalToSubAccount(Principal.fromText("lsyd6-e7avj-lnf7q-fqga7-nb3x4-gum2h-fajff-4urd5-gve2l-tppm2-7ae"));
console.log(subAccount)
console.log(principalToAccountIdentifier(Principal.fromText(canister_governace),subAccount))
// 7942...4f55

console.log("user:",MAIN_USER.getPrincipal().toString());