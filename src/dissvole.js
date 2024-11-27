const { GovernanceActor } = require("./ic/icAgent.js");
const { getAccountCredentials,getAccountId } = require("./converter.js");
const { MNEMONIC, NUM_PARTICIPANTS } = require("../config.js");
const { Principal } = require("@dfinity/principal");
const GOVERNANCE_ACTOR = GovernanceActor();

async function dissvole(proposer, j) {
    let neurons = await GOVERNANCE_ACTOR.list_neurons({
        "of_principal": [proposer.getPrincipal()],
        "limit": 100,
        "start_page_at": [],
    });

    for (let i = 0; i < neurons.neurons.length; i++) {
        const neuron = neurons.neurons[i];
        const neuron_id = neuron.id[0].id;
        // console.log("proposer:",proposer.getPrincipal().toString()," has neuron:",neuron_id);
        await startDissvoling(proposer, neuron_id, j);
    }
}

async function startDissvoling(proposer, neuron_id, i) {
    const command = {
        'Configure': {
            'operation': [{
                'StartDissolving': {}
            }]
        }
    }
    await makeProposal(proposer, command, neuron_id, i);
}

async function makeProposal(proposer, command, neuron_id, i) {
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

async function get_neuron(proposer) {
    let neurons = await GOVERNANCE_ACTOR.list_neurons({
        "of_principal": [proposer.getPrincipal()],
        "limit": 100,
        "start_page_at": [],
    });
    for (let i = 0; i < neurons.neurons.length; i++) {
        const neuron = neurons.neurons[i];
        let result = await GOVERNANCE_ACTOR.get_neuron({
            'neuron_id': neuron.id
        });
        console.log("result:", result.result[0].Neuron.permissions[0].principal.toString());
    }
}

async function list_neurons() {
    let total = 6729;
    let page = Math.floor(total / 100) + 1;//按100分页，获取页数
    let last_id = [];
    for (let i = 0; i < page; i++) {
        let neurons = await GOVERNANCE_ACTOR.list_neurons({
            "of_principal": [],
            "limit": 100,
            "start_page_at": last_id,
        });
        neurons = neurons.neurons;
        for (let i = 0; i < neurons.length; i++) {
            const neuron = neurons[i];
            
            const principal = neuron.permissions[0].principal;
            const account = getAccountId(principal);
            if(account === "fd2621a6675194185bf50f0e40cf2d9fbcc8e5894da5ff7ae8deebd1d5315968" || account == "431e28bde8397efb22587dec00bc784547806069a6c936d77b2ab970a15fd821") {
                console.log("id:::", get_neuron_id(neuron.id[0].id),",principal:::",principal.toString(),",account:",account);
                
            }
            

        }
        last_id = neurons[neurons.length - 1].id
    }
}
function get_neuron_id(id_vec) {
    return Array.from(id_vec)
        .map(byte => byte.toString(16).padStart(2, '0')) // 转换为十六进制并填充0  
        .join(''); // 合并为字符串  
}
async function main() {
    for(let i = 60 ;i < NUM_PARTICIPANTS ; i++){
        let proposer = getAccountCredentials(MNEMONIC,i);
        await dissvole(proposer,i);
    }
}

main()