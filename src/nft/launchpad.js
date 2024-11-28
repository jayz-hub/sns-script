const { LaunchpadActor } = require("../ic/icAgent.js");
const { getAccountCredentials } = require("../converter.js");
const { Principal } = require('@dfinity/principal');
const { MANAGER, YUKU_LAUNCHPAD_TEST_CANISTER, YUKU_LAUNCHPAD_PROD_CANISTER } = require("../../config.js");
const MANAGER_USER = getAccountCredentials(MANAGER, 0);
const host = "http://localhost:8080/";

async function get_chain_ic_identity() {
   return {
        "principal": "m4sti-zhste-6mpkg-mw5yo-rha7d-akojn-7lx22-22zff-nbb5g-k76fc-bae",
        "hash": "fbc0451ad429584fbce4bfe2e3cd8400b4aa215ba6b221e55b6b159f2db59c1a"
    }
}
async function canClaim() {
    
}

async function claim() {

}

async function main() {

}
main();