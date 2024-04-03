require("dotenv/config");
const MNEMONIC = process.env.MNEMONIC || "";
const NUM_PARTICIPANTS = 2;
const ICP_PER_PARTICIPANT = 1*1e8;
const YUKU_SWAP_CANISTER = "a2cof-vaaaa-aaaaq-aacza-cai";//YUKU SWAP Canister
module.exports =  {MNEMONIC,NUM_PARTICIPANTS,ICP_PER_PARTICIPANT,ICP_PER_PARTICIPANT,YUKU_SWAP_CANISTER};

