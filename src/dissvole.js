const { GovernanceActor } = require("./ic/icAgent.js");
const { getAccountCredentials } = require("./converter.js");
const { MNEMONIC, NUM_PARTICIPANTS } = require("../config.js");
const GOVERNANCE_ACTOR = GovernanceActor();

async function dissvole(proposer,j) {
    let neurons = await GOVERNANCE_ACTOR.list_neurons({
        "of_principal": [proposer.getPrincipal()],
        "limit": 100,
        "start_page_at": [],
    });

    for (let i = 0; i < neurons.neurons.length; i++) {
        const neuron = neurons.neurons[i];
        const neuron_id = neuron.id[0].id;
        // console.log("proposer:",proposer.getPrincipal().toString()," has neuron:",neuron_id);
        startDissvoling(proposer,neuron_id,j);
    }
}

async function startDissvoling(proposer, neuron_id,i) {
    const command = {
        'Configure': {
            'operation': [{
                'StartDissolving': {}
            }]
        }
    }
    await makeProposal(proposer,command,neuron_id,i);
}

async function makeProposal(proposer, command, neuron_id,i) {
    const governance_actor = GovernanceActor(proposer);
    // console.log("start make propsal with command", command);
    let result = await governance_actor.manage_neuron({
        "command": [command],
        "subaccount": neuron_id
    });
    if (result.command[0] && result.command['MakeProposal'] && result.command['MakeProposal']['proposal_id'] && result.command['MakeProposal']['proposal_id'][0]['id']) {
        const proposal_id = result.command['MakeProposal']['proposal_id'][0]['id'];
        console.log(`make proposal success get proposal_id ${proposal_id}`)
    } else if (result.command[0] && result.command[0]['Error']) {
        const err = result.command[0]['Error'];
        console.log(`make proposal error with ${err.error_message},i =====${i}`)
    }
}

async function main() {
    for (let i = 0; i < NUM_PARTICIPANTS; i++) {
        let proposer = getAccountCredentials(MNEMONIC, i);
        console.log(i);
        // console.log("proposer:",proposer.getPrincipal().toString())
        await dissvole(proposer,i);
    }
}

main()