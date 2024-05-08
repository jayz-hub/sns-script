const { Principal } = require("@dfinity/principal");
const {GovernanceActor} = require("./ic/icAgent.js");
const {getAccountCredentials,principalToSubAccount} = require("./converter.js");
const {MNEMONIC,NUM_PARTICIPANTS,TRANSFER_TO_PRINCIPAL} = require("../config.js");
const GOVERNANCE_ACTOR = GovernanceActor();

async function transfer(proposer,to) {
    let neurons = await GOVERNANCE_ACTOR.list_neurons({
        "of_principal": [proposer.getPrincipal()],
        "limit": 100,
        "start_page_at": [],
    });
    for(let i = 0 ;i<neurons.neurons.length; i++){
        const neuron = neurons.neurons[i];
        const neuron_id = neuron.id[0].id;
        const maturity_e8s_equivalent = neuron.maturity_e8s_equivalent;
        if(maturity_e8s_equivalent > 0){
            await disburseMaturity(proposer,neuron_id,maturity_e8s_equivalent,to);
        }
        if(neuron.dissolve_state && neuron.dissolve_state[0].DissolveDelaySeconds > 0){
            continue //还在溶解
        }
        const amount = neuron.cached_neuron_stake_e8s;
        await disburse(proposer,neuron_id,amount,to);
    }
}

async function disburse(proposer,neuron_id,amount,to) {
    const command = {
        "Disburse": {
            'to_account': [{
                'owner': [Principal.fromText(to)],
                'subaccount': [],
            }],
            'amount': [{'e8s': amount}]
        }
    }
    await makeProposal(proposer,command,neuron_id);
}

async function disburseMaturity(proposer,neuron_id,amount,to) {
    const command = {
        "DisburseMaturity": {
            'to_account': [{
                'owner': [Principal.fromText(to)],
                'subaccount': [],
            }],
            'percentage_to_disburse': 100,
        }
    }
    await makeProposal(proposer,command,neuron_id);
}

async function makeProposal(proposer,command,neuron_id) {
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

async function main() {
    for(let i = 0 ;i < NUM_PARTICIPANTS ; i++){
        let proposer = getAccountCredentials(MNEMONIC,i);
        await transfer(proposer,TRANSFER_TO_PRINCIPAL);
    }
}

main()