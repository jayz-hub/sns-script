const { Principal } = require("@dfinity/principal");
const {GovernanceActor} = require("./ic/icAgent.js");
const {getAccountCredentials,principalToSubAccount} = require("./converter.js");
const {MNEMONIC,YUKU_ICP_POOL_CANISTER,YUKU_GOVERNANCE_CANISTER} = require("../config.js");
const TRANSFER_FROM_ICP_TREASURY = 1;//划转ICP
const TRANSFER_FROM_SNS_TOKEN_TREASURY = 2;//划转Token
const YUKU_ICP_POOL_CANISTER_SUBACCOUNT = principalToSubAccount(Principal.fromText(YUKU_GOVERNANCE_CANISTER));
const GOVERNANCE_ACTOR = GovernanceActor();

async function getNeuronId(p) {
    let neurons = await GOVERNANCE_ACTOR.list_neurons({
        "of_principal": [Principal.fromText(p)],
        "limit": 100,
        "start_page_at": [],
    });
    return neurons.neurons[0].id[0].id;
}

async function makeProposal(proposer,command) {
    let neuron_id = await getNeuronId(proposer.getPrincipal().toString());
    const governance_actor = GovernanceActor(proposer);
    console.log("start make propsal with command",command);
    let result = await governance_actor.manage_neuron({
        "command": [command],
        "subaccount":neuron_id
      });
      if(result.command[0] && result.command['MakeProposal'] && result.command['MakeProposal']['proposal_id'] && result.command['MakeProposal']['proposal_id'][0]['id']){
        const proposal_id = result.command['MakeProposal']['proposal_id'][0]['id'];
        console.log(`make proposal success get proposal_id ${proposal_id}`)
      }else if(result.command[0] && result.command[0]['Error']) {
        const err = result.command[0]['Error'];
        console.log(`make proposal error with ${err.error_message}`)
      }
}

async function transfer(proposer,to,amount,from_treasury) {
    const token = from_treasury==1? "ICP":"YUKU";
    const command = {
        "MakeProposal": {
            'url':"",
            "title": `Transfer ${token} from SNS treasury`,
            "action": [{
                "TransferSnsTreasuryFunds": {
                    'from_treasury' : from_treasury,
                    'to_principal' : [to],
                    'to_subaccount' : [],
                    'memo' : [],
                    'amount_e8s' : amount * 1e8,
                }
            }],
            "summary": `Transfer ${amount} ${token} to team wallet`
        }
    };
    await makeProposal(proposer,command);
}

async function transferToICPSwapPool(proposer,amount,from_treasury){
    const token = from_treasury == 1 ? "ICP" : "YUKU";
    const command = {
        "MakeProposal": {
            'url':"https://app.icpswap.com/swap",
            "title": `Transfer ${amount} ${token} to the ICPSwap Pool`,
            "action": [{
                "TransferSnsTreasuryFunds": {
                    'from_treasury' : from_treasury,
                    'to_principal' : [Principal.fromText(YUKU_ICP_POOL_CANISTER)],
                    'to_subaccount' : [YUKU_ICP_POOL_CANISTER_SUBACCOUNT],
                    'memo' : [],
                    'amount_e8s' : amount * 1e8,
                }
            }],
            "summary": `Transfer ${amount} ${token} to add liquidity to the YUKU/ICP pool on ICPSwap`
        }
    };
    await makeProposal(proposer,command);
}

async function motion(proposer,motion_text) {
    const command = {
        "MakeProposal": {
            'url':"https://app.icpswap.com/swap",
            "title": `Add liquidity to YUKU/ICP pool on ICPSwap`,
            "action": [{
                "Motion": {
                  "motion_text": "Add liquidity to YUKU/ICP pool on ICPSwap"
              }
            }],
            "summary": `Transfer ${amount} ${token} to add liquidity to the YUKU/ICP pool on ICPSwap`
        }
    };
    await makeProposal(proposer,command);
}

//mode 0-unspecified 1-install 2-reinstall 3-upgrade，默认2
async function updateCanisterWasm(proposer) {
    const command = {
        "MakeProposal": {
            'url':"https://app.icpswap.com/swap",
            "title": `Add liquidity to YUKU/ICP pool on ICPSwap`,
            "action": [{
                "UpgradeSnsControlledCanister": {
                    "new_canister_wasm": [],
                    "mode": [],
                    "canister_id": [Principal.fromText("")],
                    "canister_upgrade_arg": [],
              }
            }],
            "summary": `Transfer ${amount} ${token} to add liquidity to the YUKU/ICP pool on ICPSwap`
        }
    };
    await makeProposal(proposer,command)
}

async function main() {
    const to = Principal.fromText("");
    const user = getAccountCredentials(MNEMONIC,0);
    transfer(user,to,1,TRANSFER_FROM_SNS_TOKEN_TREASURY);
    transfer(user,to,1,TRANSFER_FROM_ICP_TREASURY);
}

main()