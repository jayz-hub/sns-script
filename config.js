require("dotenv/config");
const MNEMONIC = process.env.MNEMONIC || "";
const NUM_PARTICIPANTS = 80;
const ICP_PER_PARTICIPANT = 35.88 * 1e8;
const YUKU_SWAP_CANISTER = "a2cof-vaaaa-aaaaq-aacza-cai";//YUKU SWAP Canister
const YUKU_GOVERNANCE_CANISTER = "auadn-oqaaa-aaaaq-aacya-cai";//YUKU Governance Canister
const YUKU_RECORD_CANISTER = "56www-tyaaa-aaaap-aai4q-cai";//YUKU Governance Canister
const YUKU_ICP_POOL_CANISTER = "tj7zf-aiaaa-aaaag-qjrsa-cai"; //ICPSwap YUKUICP Pool Canister
const TRANSFER_TO_PRINCIPAL = "7ieat-dxek4-m2mpl-6tujn-hsvcp-etsw2-76o66-orkys-on7o7-zudxi-uqe";
const MANAGER = "car mutual present alter oil index siege brick collect level split feature";
const YUKU_LAUNCHPAD_TEST_CANISTER = "o2qzt-caaaa-aaaah-abhsa-cai";
const YUKU_LAUNCHPAD_PROD_CANISTER = "pczmq-maaaa-aaaah-abhwa-cai";
const YUKU_MARKETPLACE_TEST_CANISTER = "ajy76-hiaaa-aaaah-aa3mq-cai";
const YUKU_MARKETPLACE_PROD_CANISTER = "udtw4-baaaa-aaaah-abc3q-cai";
module.exports =  {YUKU_LAUNCHPAD_TEST_CANISTER,YUKU_LAUNCHPAD_PROD_CANISTER,YUKU_MARKETPLACE_TEST_CANISTER,YUKU_MARKETPLACE_PROD_CANISTER,MNEMONIC,NUM_PARTICIPANTS,ICP_PER_PARTICIPANT,ICP_PER_PARTICIPANT,YUKU_SWAP_CANISTER,YUKU_GOVERNANCE_CANISTER,YUKU_ICP_POOL_CANISTER,TRANSFER_TO_PRINCIPAL,MANAGER,YUKU_RECORD_CANISTER};