const swapIdl = require('./swap.did.js');
const ledger  = require('./ledger.did.js');
const erc721Idl = require('./erc721.did.js');
const yukuIdl = require('./yuku.did.js');
const recordIdl = require('./record.did.js');
const launchpadIdl = require('./launchpad.did.js');
const pointIdl = require('./point.did.js');
const governanceIdl = require('./goverance.did.js');
const oatIdl = require('./oat.did.js');
const {Actor, HttpAgent} = require("@dfinity/agent");
const fetch = require('node-fetch');
const HOST_MAINNET = "https://boundary.ic0.app";
const ICP_CANISTER_ID = "ryjl3-tyaaa-aaaaa-aaaba-cai";//正式的ICP罐子
// const FAKE_ICP_CANISTER_ID = "irzpe-yqaaa-aaaah-abhfa-cai";//正式的ICP罐子
const FAKE_ICP_CANISTER_ID = "xinuw-qiaaa-aaaah-aq2ua-cai";//测试的ICP罐子
const {YUKU_SWAP_CANISTER,YUKU_GOVERNANCE_CANISTER,YUKU_RECORD_CANISTER} = require("../../config.js");

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
const FakeLedgerActor = (user) => {
    return create_actor(FAKE_ICP_CANISTER_ID,ledger.idlFactory,HOST_MAINNET,user)
}

const SwapActor = (user) => {
    return create_actor(YUKU_SWAP_CANISTER,swapIdl.idlFactory,HOST_MAINNET,user);
}

const GovernanceActor = (user) => {
    return create_actor(YUKU_GOVERNANCE_CANISTER,governanceIdl.idlFactory,HOST_MAINNET,user);
}

const Erc721Actor = (canister,user) => {
    return create_actor(canister,erc721Idl.idlFactory,HOST_MAINNET,user);
}

const YukuActor = (canister,user) => {
    return create_actor(canister,yukuIdl.idlFactory,HOST_MAINNET,user);
}

const LaunchpadActor = (canister,user) => {
    return create_actor(canister,launchpadIdl.idlFactory,HOST_MAINNET,user);
}

const RecordActor = (user) => {
    return create_actor(YUKU_RECORD_CANISTER,recordIdl.idlFactory,HOST_MAINNET,user);
}

const OatActor = (canister) => {
    return create_actor(canister,oatIdl.idlFactory,HOST_MAINNET);
}

const PointActor = (canister,user) => {
    return create_actor(canister,pointIdl.idlFactory,HOST_MAINNET,user);
}

module.exports = {LedgerActor,SwapActor,GovernanceActor,Erc721Actor,YukuActor,LaunchpadActor,RecordActor,OatActor,PointActor,FakeLedgerActor}