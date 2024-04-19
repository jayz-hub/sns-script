const { Principal } = require("@dfinity/principal");
const {principalToSubAccount,getAccountCredentials,principalToAccountIdentifier} = require("./converter.js");
const {LedgerActor,SwapActor} = require("./ic/icAgent.js");
const {MNEMONIC,NUM_PARTICIPANTS,ICP_PER_PARTICIPANT,YUKU_SWAP_CANISTER} = require("../config.js");

//修改助记词。参与数量。每个参与账号的ICP数量来控制脚本
const MAIN_USER = getAccountCredentials(MNEMONIC,0);

async function onParticipate() {
    for(var i =0;i<NUM_PARTICIPANTS; i++ ){
        let user = getAccountCredentials(MNEMONIC,i);
        try {
            await _sendICP(user);
            await _refreshToken(user);    
        } catch (error) {
            console.log(`${user.getPrincipal().toString} happened error: ${error}`)
        }
    }
}

async function _sendICP(user) {
    const subAccount = principalToSubAccount(user.getPrincipal());
    const swapCanisterAccount = {
        owner: Principal.fromText(YUKU_SWAP_CANISTER),
        subaccount: [subAccount]
    }
    const aid = principalToAccountIdentifier(Principal.fromText(YUKU_SWAP_CANISTER),subAccount);
    console.log(`swapCanisterAccount: ${swapCanisterAccount}`);
    const ledger_actor = LedgerActor(MAIN_USER);
    let res = await ledger_actor.icrc1_transfer({
        to: swapCanisterAccount,
        fee: [10000],
        memo: [],
        amount: ICP_PER_PARTICIPANT,
        from_subaccount: [],
        created_at_time: []
    });
    console.log(`user:${user.getPrincipal().toString()} send ${ICP_PER_PARTICIPANT} ICP to ${aid},res:${res['Ok']?res['Ok']:res['Err']}`);
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
    await onParticipate()
}

  main();