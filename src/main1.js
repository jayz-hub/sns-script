const { Principal } = require("@dfinity/principal");
const {principalToSubAccount,getAccountCredentials,principalToAccountIdentifier} = require("./converter.js");
const {LedgerActor,SwapActor} = require("./ic/icAgent.js");
const {MNEMONIC,NUM_PARTICIPANTS,ICP_PER_PARTICIPANT,YUKU_SWAP_CANISTER} = require("../config.js");
const BigNumber = require('bignumber.js');
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
let participates = [1.94, 2.1, 1.12, 1.12, 1.14, 1.11, 1.16, 1.1, 1.61, 1.11, 1.16, 1.12, 2.42, 1.08, 1.37, 1.12, 1.33, 1.12, 1.11, 1.15, 1.09, 1.11, 1.46, 1.14, 1.12, 1.12, 1.13, 1.11, 1.59, 1.1, 1.11, 1.13, 1.12, 1.52, 1.12, 1.1, 1.11, 1.63, 1.07, 1.1, 1.1, 1.17, 1.89, 1.13, 1.13, 1.13, 2.86, 1.13, 1.13, 1.13, 1.1, 1.11, 1.17, 1.72, 1.18, 1.12, 1.12, 1.08, 1.12, 1.13, 1.12, 1.85, 1.13, 1.13, 1.06, 1.13, 1.12, 1.14, 1.07, 1.13, 1.1, 1.12, 1.12, 1.13, 1.11, 1.22, 1.09, 1.11, 1.85, 1.15]
// let participates = [1.22, 1.09, 1.52, 1.12, 1.15, 1.12, 2.01, 1.1, 1.11, 1.28, 2.07, 1.09, 1.13, 1.15, 1.12, 1.11, 1.12, 1.14, 1.14, 1.15, 2.12, 1.11, 1.82, 1.09, 1.14, 1.1, 1.26, 1.11, 1.09, 1.14, 1.14, 1.12, 1.13, 1.12, 1.08, 1.09, 1.1, 1.1, 1.85, 1.1, 2.56, 1.11, 1.2, 1.85, 1.13, 1.15, 1.1, 1.67, 1.12, 1.09, 1.13, 1.1, 1.09, 1.14, 1.4, 1.1, 1.09, 1.1, 1.15, 1.1, 2.1, 1.13, 1.12, 1.15, 1.15, 1.14, 1.12, 1.12, 1.11, 1.11, 1.14, 1.13, 1.54, 2.12, 1.1, 1.1, 1.13, 1.14, 1.1, 1.12]
async function onParticipate2() {
    for(var i = 0;i < participates.length ; i++ ){
        let user = getAccountCredentials(MNEMONIC,i);
        // console.log("participate:",participates[i])
        try {
            await _sendICP(user,participates[i]);
            await _refreshToken(user);    
        } catch (error) {
            console.log(`${user.getPrincipal().toString} happened error: ${error}`)
        }
    }
}

async function _sendICP(user,num) {
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
        amount: new BigNumber(num).multipliedBy(1e8).toNumber(),
        from_subaccount: [],
        created_at_time: []
    });
    console.log(`user:${user.getPrincipal().toString()} send ${new BigNumber(num).multipliedBy(1e8).toNumber()} ICP to ${aid},res:${res['Ok']?res['Ok']:res['Err']}`);
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
    // await onParticipate()
    await onParticipate2()
}

  main();