const { Principal } = require("@dfinity/principal");
const {GovernanceActor} = require("./ic/icAgent.js");
const {getAccountCredentials,principalToSubAccount} = require("./converter.js");
const {MNEMONIC,YUKU_ICP_POOL_CANISTER,YUKU_GOVERNANCE_CANISTER} = require("../config.js");
const TRANSFER_FROM_ICP_TREASURY = 1;//划转ICP
const TRANSFER_FROM_SNS_TOKEN_TREASURY = 2;//划转Token
const YUKU_ICP_POOL_CANISTER_SUBACCOUNT = principalToSubAccount(Principal.fromText(YUKU_GOVERNANCE_CANISTER));
const GOVERNANCE_ACTOR = GovernanceActor();

const NEURON_ID = "a5ebe7299b8ed6b83d02d45f71105643ff40c987acdd7f37e73548b2c6cd1d0f";
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

async function transfer(proposer,amount) {
    const command = {
        "MakeProposal": {
            'url':"https://yuku.app/",
            "title": `Liquidity test: take out 10 icp to the Dev neuron`,
            "action": [{
                "TransferSnsTreasuryFunds": {
                    'from_treasury' : TRANSFER_FROM_ICP_TREASURY,
                    'to_principal' : [Principal.fromText("34aix-k4xym-qj2hq-b3lje-jzv54-rs4kz-dmfq3-pbo4b-i4sfp-lqnr4-bqe")],
                    'to_subaccount' : [],
                    'memo' : [],
                    'amount_e8s' : 10 * 1e8,
                }
            }],
            "summary": `This proposal is intended to test the transfer of ICP in preparation for the addition of liquidity pools.`
        }
    };

    const command2 = {
        "MakeProposal": {
            'url':"https://yuku.app/",
            "title": `Liquidity test: take out 10k YUKU to the Dev neuron`,
            "action": [{
                "TransferSnsTreasuryFunds": {
                    'from_treasury' : TRANSFER_FROM_SNS_TOKEN_TREASURY,
                    'to_principal' : [Principal.fromText("34aix-k4xym-qj2hq-b3lje-jzv54-rs4kz-dmfq3-pbo4b-i4sfp-lqnr4-bqe")],
                    'to_subaccount' : [],
                    'memo' : [],
                    'amount_e8s' : 10000 * 1e8,
                }
            }],
            "summary": `This proposal is intended to test the transfer of YUKU in preparation for the addition of liquidity pools.`
        }
    };
    await makeProposal(proposer,command);
    await makeProposal(proposer,command2);
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

async function motion(proposer) {
    const command = {
        "MakeProposal": {
            'url':"https://www.youtube.com/watch?v=p1BqzpFvQ50",
            "title": `Introducing YUKU DAO DEV Neuron for Community Consideration [Neuron ID: cec47dab086844799153a44f987082b90d0843ee5c5c4f958cea9f78b07b4936]`,
            "action": [{
                "Motion": {
                  "motion_text": "A motion proposal to introduce YUKU DAO DEV Neuron for community consideration."
              }
            }],
            "summary": 
            `
            ## We are excited to inform the YUKU DAO community about the integration of the YUKU DAO DEV Neuron. This proposal is intended to disseminate information across the YUKU DAO community and submit the YUKU DAO DEV Neuron for a collective decision-making process.
            
            The core role of the YUKU DAO DEV Neuron is to engage in and kick-start the voting procedure on pivotal technical proposals and other major initiatives that foster the development and improvement of the YUKU DAO environment. The essential objective is to guarantee that followers of the neuron are regularly and rightfully awarded for their participation in the voting process.

            ## To Follow YUKU DAO Neuron:

            1. Log in to your NNS account at https://nns.ic0.app.
            2. Access "My Neuron Staking" and navigate to "YUKU DAO" Nervous System.
            3. Choose your neuron you wish to follow, the **YUKU DAO DEV **Neuron
            4. Scroll down and click the "Follow Neurons" button, select it, and opt for "All topics" for following.
            5. Simply copy and paste the YUKU DAO DEV Neuron ID: cec47dab086844799153a44f987082b90d0843ee5c5c4f958cea9f78b07b4936 into the input box, and then click the "Follow Neuron" button.
            `
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

async function disburse(proposer,to) {
    let neurons = await GOVERNANCE_ACTOR.list_neurons({
        "of_principal": [Principal.fromText(p)],
        "limit": 100,
        "start_page_at": [],
    });

    for(let i = 0 ;i<neurons.length; i++){
        let neuron = neurons[i];
        
    }

    let neuron_id = await getNeuronId(proposer.getPrincipal().toString());
    const command = {
        "Disburse": {
            'to_account': [{
                'owner': [Principal.fromText(to)],
                'subaccount': [],
            }],
            'amount': [{'e8s': amount*1e8}]
        }
    }
    await makeProposal(proposer,command)
}

async function main() {
    const to = "";

    for(let i = 0 ;i < 10;i++){
        let proposer = getAccountCredentials(MNEMONIC,i);

        await disburse(proposer,)
    }
}

main()