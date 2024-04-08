const {SwapActor} = require("./ic/icAgent.js");
const {getAccountCredentials} = require("./converter.js");
const {MNEMONIC,NUM_PARTICIPANTS,ICP_PER_PARTICIPANT,YUKU_SWAP_CANISTER} = require("../config.js");
const  fs = require('fs');
const BigNumber = require('bignumber.js');

async function main() {
    var strs = "principal,amount\r\n";
    const swap_actor = SwapActor();
    for(var i =0;i<NUM_PARTICIPANTS; i++ ){
        let user = getAccountCredentials(MNEMONIC,i);
        let state = await swap_actor.get_buyer_state({
            'principal_id': [user.getPrincipal()]
        });
        console.log(state);
        if(state.buyer_state && state.buyer_state[0].icp) {
            let amount = new BigNumber(state.buyer_state[0].icp[0].amount_e8s).dividedBy(1e8).toNumber();
            strs = strs + user.getPrincipal().toString() + ","+ amount.toString() + "\r\n";
        }
    }
    fs.writeFileSync("export.csv",strs);
}

main()