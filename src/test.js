const {principalToAccountIdentifier,principalToSubAccount,getAccountCredentials} = require("./converter.js");
const {MNEMONIC,YUKU_SWAP_CANISTER} = require("../config.js");
const { Principal } = require("@dfinity/principal");
const MAIN_USER = getAccountCredentials(MNEMONIC,0);
const FIRST_USER = getAccountCredentials(MNEMONIC,1);
const SECOND_USER = getAccountCredentials(MNEMONIC,1);
function main() {
    const user = FIRST_USER.getPrincipal()
    console.log("user:",user.toString());
    let subAccount = principalToSubAccount(user);
    console.log(subAccount)
    console.log(principalToAccountIdentifier(Principal.fromText(YUKU_SWAP_CANISTER),subAccount))
}
main();
// 7942...4f55