const { Principal } = require("@dfinity/principal");
const {FakeLedgerActor,LedgerActor} = require("../ic/icAgent.js");
const {principalToSubAccount,getAccountCredentials} = require("../converter.js");
const PICK_PUMP_CANISTER = "mft6s-gaaaa-aaaap-anrea-cai";
async function _sendICP(user, amount) {
    const subAccount = principalToSubAccount(user.getPrincipal());
    console.log("subaccount:",subAccount);
    const to_account = {
        owner: Principal.fromText(PICK_PUMP_CANISTER),
        subaccount: [subAccount]
    }
    const ledger_actor = LedgerActor(user);
    // const ledger_actor = FakeLedgerActor(user);
    let res = await ledger_actor.icrc1_transfer({
        to: to_account,
        fee: [10000],
        memo: [],
        amount: 100010000,
        from_subaccount: [],
        created_at_time: []
    });
    console.log(res)
}

async function balance(user) {
    const subAccount = principalToSubAccount(user.getPrincipal());
    const account = {
        owner: Principal.fromText(PICK_PUMP_CANISTER),
        subaccount: [subAccount]
    }
    const ledger_actor = FakeLedgerActor(user);
    const balance = await ledger_actor.icrc1_balance_of(account);
    console.log(balance)
}

async function balance2(user) {
    const subAccount = principalToSubAccount(Principal.fromText("fv4e3-4qaaa-aaaap-akqca-cai"));
    const account = {
        owner: Principal.fromText(PICK_PUMP_CANISTER),
        subaccount: [subAccount]
    }
    const ledger_actor = FakeLedgerActor(user);
    const balance = await ledger_actor.icrc1_balance_of(account);
    console.log(balance)
}


async function main() {
    const user = getAccountCredentials("remember dance impose moon coast stable tail pet amused enjoy almost runway", 0);
    await _sendICP(user,1);
    // await balance2(user)
    
}
main()