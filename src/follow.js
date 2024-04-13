const {GovernanceActor} = require("./ic/icAgent.js");
const {parseNeuronId,getAccountCredentials} = require("./converter.js");
const {MNEMONIC,NUM_PARTICIPANTS} = require("../config.js");

const FOLLOWEE = parseNeuronId("cec47dab086844799153a44f987082b90d0843ee5c5c4f958cea9f78b07b4936");
let COMMANDS = []
for(var i = 0 ; i< 15; i++ ){
    COMMANDS.push({
        "Follow": {
            'function_id': i,
            "followees": [{id:FOLLOWEE}]
        }
      })
};


async function follow(user) {
    const governance_actor = GovernanceActor(user);
    let neurons = await governance_actor.list_neurons({
        "of_principal": [user.getPrincipal()],
        "limit": 100,
        "start_page_at": [],
    });
    for(var i =0;i<neurons.neurons.length;i++){
        for(var j = 0 ;j<COMMANDS.length;j++) {
            let command = COMMANDS[j];
            let neuron_id_vec = neurons.neurons[i].id[0].id;
            let result = await governance_actor.manage_neuron({
                "command": [command],
                "subaccount":neuron_id_vec
            });
            console.log("result",result)
        }
    }
}

async function main() {
    for(var i =0;i<NUM_PARTICIPANTS; i++ ){
        let user = getAccountCredentials(MNEMONIC,i);
        await follow(user)
    }
}

main()