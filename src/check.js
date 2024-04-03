const { Principal } = require("@dfinity/principal");
const {LedgerActor,SwapActor} = require("./ic/icAgent.js");
const {principalToAccountIdentifier,principalToSubAccount,getAccountCredentials} = require("./converter.js");
const {MNEMONIC,NUM_PARTICIPANTS,YUKU_SWAP_CANISTER} = require("../config.js");
const ledger_actor = LedgerActor();
const swap_actor = SwapActor();

async function check(user,account) {
    const balance = await ledger_actor.icrc1_balance_of(account);
    var participant_amount = 0
    let state = await swap_actor.get_buyer_state({
        'principal_id': [user.getPrincipal()]
    });
    if(state.buyer_state && state.buyer_state[0].icp) {
        participant_amount = state.buyer_state[0].icp[0].amount_e8s;
    };
    if(participant_amount != balance) {
        return false;
    }
    return true;
}

async function _refreshToken(user) {
    const swap_actor = SwapActor(user);
    let result = await swap_actor.refresh_buyer_tokens({
        buyer: user.getPrincipal().toString(),
        confirmation_text: ["I confirm my understanding of the responsibilities and risks associated with participating in this token swap.\n"]
    });
    console.log(`user:${user.getPrincipal().toString()},refreshTokens result:${result}`);
}
async function main() {
    for(var i = 0;i < NUM_PARTICIPANTS; i++ ){
        const user = getAccountCredentials(MNEMONIC,i);
        const subAccount = principalToSubAccount(user.getPrincipal());
        const swapCanisterAccount = {
            owner: Principal.fromText(YUKU_SWAP_CANISTER),
            subaccount: [subAccount]
        }
        const aid = principalToAccountIdentifier(Principal.fromText(YUKU_SWAP_CANISTER),subAccount)
        const isCheck = await check(user,swapCanisterAccount);
        if(isCheck) {
            console.log(`${user.getPrincipal().toString()} is ok`)
        }else {
            console.log(`${user.getPrincipal().toString()}'s subaccount ${aid} should refresh token`)
            await _refreshToken(user);
        }
    }
}

main();