const swapIdl = require('./swap.did.js');
const ledger  = require('./ledger.did.js');
const governanceIdl = require('./goverance.did.js');
const {Actor, HttpAgent} = require("@dfinity/agent");
const fetch = require('node-fetch');
const HOST_MAINNET = "https://boundary.ic0.app";
const ICP_CANISTER_ID = "ryjl3-tyaaa-aaaaa-aaaba-cai";//正式的ICP罐子
const {YUKU_SWAP_CANISTER,YUKU_GOVERNANCE_CANISTER} = require("../../config.js");

function create_actor(canister_id, factory, host, identity) {
    const defaultAgent = new HttpAgent({host,fetch});
    let agent = new HttpAgent({
        source: defaultAgent,
        identity: identity,
    });

    agent.fetchRootKey().catch(err => {
        console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
        console.error(err);
    });

    const actor = Actor.createActor(factory, {
        agent,
        canisterId: canister_id,
    });
    return actor;
}

const LedgerActor = (user) => {
    return create_actor(ICP_CANISTER_ID, ledger.idlFactory, HOST_MAINNET, user);
}

const SwapActor = (user) => {
    return create_actor(YUKU_SWAP_CANISTER,swapIdl.idlFactory,HOST_MAINNET,user);
}

const GovernanceActor = (user) => {
    return create_actor(YUKU_GOVERNANCE_CANISTER,governanceIdl.idlFactory,HOST_MAINNET,user);
}

module.exports = {LedgerActor,SwapActor,GovernanceActor}