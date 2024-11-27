const { Principal } = require("@dfinity/principal");
const {PointActor} = require("../ic/icAgent");
const { getAccountCredentials } = require("../converter.js");
const MAIN_USER = getAccountCredentials("reveal purse lunch phone present robust holiday yard offer bless rule harvest",0);
let pointActor = PointActor("qqamp-7iaaa-aaaah-qakha-cai",MAIN_USER);
const xlsx = require('xlsx');  

async function airdrop_point_from_excel() {
    // 读取 Excel 文件  
    const workbook = xlsx.readFile('/Users/jayz/work/sns-script/AI Avatar Skin: Novia Cybereel Drop.csv');  

    // 选择工作表  
    const sheetName = workbook.SheetNames[0]; // 选择第一个工作表  
    const worksheet = workbook.Sheets[sheetName];  

    // 将工作表转换为 JSON 格式  
    const jsonData = xlsx.utils.sheet_to_json(worksheet);  

    const dataArray = jsonData.map(row => Object.values(row));  
    let params = [];
    for(data of dataArray) {
        let user = data[0];
        let add = data[1];
        console.log(user)
        console.log(add)
        if (user.length == 64) {
            params.push([{'address':user},add*1e9])
        }else if(user.length == 63) {
            params.push([{'principal': Principal.fromText(user)},add*1e9])
        }else {
            console.log(user," not match")
        }
    }
    console.log(params)
    await pointActor.batchMint(params);
}

async function airdrop() {
    let whitelists = [
        "brwzr-vwwfy-4s45i-rx23f-nuw4h-ucx73-uaov4-ug7fm-j4fka-sr32g-pae",
        "jayd6-pqnwz-tb6pq-357ck-uwwud-5xhso-ju6dw-wwgnl-3fkxv-676xn-bae",
        "23jeh-d4pjo-r2biy-e6hrf-tgo36-xqjrg-kkk5h-lmw7p-rch6o-rz2aa-xqe",
        "35vwb-zkwso-kr7mj-gocoe-uorla-eclsj-jumnc-cbypf-sl45n-cwacv-2ae",
        "7u2me-6set2-hs3xc-a3nxv-ivq2u-w2lwo-itfaq-l4ogl-uly4h-5lgkc-tqe",
        "fhcsw-zyuqp-d572e-ndv3x-j7s6a-km5bh-dl622-64kxg-k6mim-gigvq-4qe",
        "e7ngv-rcrdf-ttp4v-wfujn-q75ez-xvwjq-qziaq-rwnep-cctp5-vb7zw-pqe",
        "war3a-o6zbh-uc2bv-2l33q-4l62p-2xfps-wql6z-k4wzb-wlttx-fj5ux-eqe",
        "bg5z5-k44xg-gpmlj-tw2rp-6kibr-ubpj7-72yng-2cc2h-p2la5-qxbvt-gae",
        "2ycgi-n6how-wsxbk-egwvx-htdjq-627p6-w3xqb-dzdoj-k3uwa-b4k4c-xae",
    ];
    let point = 10 * 1e8;
    let params = [];
    for(user of whitelists) {
        params.push([{'principal': Principal.fromText(user)},point])
    }

    await pointActor.batchMint(params);
}

async function main() {
    airdrop_point_from_excel()
}

main()
