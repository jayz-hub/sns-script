const { MANAGER } = require("../../config.js");
const { getAccountCredentials } = require("../converter.js");
const { RecordActor } = require("../ic/icAgent.js");
const MANAGER_USER = getAccountCredentials(MANAGER, 0);
let recordActor = RecordActor(MANAGER_USER);
async function main() {
    let set = new Set();
    let record = await recordActor.getEventsByRange(289999,290473);
    let records = record[0][0];
    for (record of records) {
        let canister = record.collection.toString();
        if(canister == "ft6xr-taaaa-aaaam-aafmq-cai"){
            console.log(record)
        }
        // set.add(record.collection.toString());
    }
    console.log(set)
};
main();