const { Principal } = require("@dfinity/principal");
const {GovernanceActor} = require("./ic/icAgent.js");
const {getAccountCredentials} = require("./converter.js");
const {MNEMONIC,NUM_PARTICIPANTS} = require("../config.js");

const GOVERNANCE_ACTOR = GovernanceActor();

async function getNeuronId(p) {
    let neurons = await GOVERNANCE_ACTOR.list_neurons({
        "of_principal": [Principal.fromText(p)],
        "limit": 100,
        "start_page_at": [],
    });
    return neurons.neurons[0].id[0];
}

const TRANSFER_FROM_ICP_TREASURY = 1;
const TRANSFER_FROM_SNS_TOKEN_TREASURY = 2;
async function transfer(user,to,amount,from_treasury) {
    let neuron_id = await getNeuronId(user.getPrincipal().toString());
    console.log("neuron_id",neuron_id)
    const governance_actor = GovernanceActor(user);
    const token = from_treasury==1? "ICP":"YUKU";
    let result = await governance_actor.manage_neuron({
      "command": [{
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
      }],
      "subaccount":neuron_id.id
    });
    console.log(result.command[0]['Error']);
}

async function main() {
    const to = Principal.fromText("");
    const user = getAccountCredentials(MNEMONIC,0);
    transfer(user,to,1,TRANSFER_FROM_SNS_TOKEN_TREASURY);
    transfer(user,to,1,TRANSFER_FROM_ICP_TREASURY);
}

main()