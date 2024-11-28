const { LaunchpadActor } = require("../ic/icAgent.js");
const { getAccountCredentials } = require("../converter.js");
const { Principal } = require('@dfinity/principal');
const { MANAGER } = require("../../config.js");
const MANAGER_USER = getAccountCredentials(MANAGER, 0);
let launchpad = "pczmq-maaaa-aaaah-abhwa-cai";
let launchpadActor = LaunchpadActor(launchpad, MANAGER_USER);
let erc721 = Principal.fromText("rrcvy-giaaa-aaaah-aq2aa-cai");
async function updateMetadata() {
    _collection = await launchpadActor.getCollection(erc721);
    let collection = _collection[0];
    collection.endTime = new Date('2024-12-31 00:00:00').getTime() * 1000000;
    console.log(collection)
    let res = await launchpadActor.removeCollection(collection.id);
    console.log("removeCollection :result:",res);
    // let resp =await launchpadActor.importCollection(collection)
    // console.log("importCollection resp:",resp)
    // console.log(collection.typicalNFTs[4].NFTUrl)
}
/**
 * {
  id: Principal {
    _arr: Uint8Array(10) [
        0,   0, 0, 0, 0,
      224, 135, 0, 1, 1
    ],
    _isPrincipal: true
  },
  faq: [ { Question: '', Answer: '' } ],
  whitelistTimeStart: 1732730400880000000n,
  whitelistTimeEnd: 1732730400880000000n,
  featured: '',
  starTime: 1732730400880000000n,
  endTime: 1735574400000000000,
  production: '',
  typicalNFTs: [],
  name: 'ICP Bros ',
  team: '{"name":"","desc":""}',
  banner: '',
  description: 'A Premium NFT Created ICP Master That Lives Fully On Chain On The Internet Computer Protocol. All NFT Proceeds Will Go To Paying CoinMarketCap Fast Track Token Listing Of $McDoms Token On Bob Dot Fun',
  totalSupply: 42n,
  whitelistCount: 0n,
  links: [
    {
      twitter: [Array],
      instagram: [Array],
      discord: [Array],
      yoursite: [Array],
      telegram: [Array],
      medium: [Array]
    }
  ],
  addTime: 1732722961100000000n,
  approved: 'pending',
  normalPerCount: [],
  featured_mobile: '',
  index: 132n,
  price: 1250000000n,
  teamImage: [],
  normalCount: 0n,
  whitelistPerCount: 0n,
  standard: { ext: null },
  whitelistPrice: 0n,
  avaliable: 42n
}
 */
//添加mint池
async function addPool() {
    let token_ids = [4,6,7,8,13,14,16,23,24,30,32,40,43,46,47,49,51,52,53,62,67,70,71,72,74,76,78,83,84,85,87,89,90,91,92,93,96,101,102,103,104,106,107,110,111,113,114,115,116,120,123,126,127,128,129,137,139,142,143,144,145,146,148,149,151,154,155,158,160,165,168,171,172,177,178,181,182,183,184,185,193,194,198,205,206,207,208,209,211,213,215,216,222,231,232,234,235,237,238,241,244,245,246,249,251,252,253,256,261,262,264,271,275,279,283,286,288,290,292,293,294,295,296,300,303,304,306,313,316,317,319,321,328,331,332,333,335,337,338,339,340,341,342,345,347,348,349,350,355,359,360,361,362,365,369,372,374,375,376,381,382,385,386,387,389,391,392,394,395,397,400,402,404,405,406,408,409,411,412,413,414,415,416,417,418,420,421,422,424,426,427,429,431,436,438,440,441,446,448,449,452,453,455,456,457,461,462,464,466,470,475,476,477,478,480,482,483,487,490,492,494,497,498];
    let result = await launchpadActor.massEnableClaim(erc721,token_ids.sort(() => Math.random() - 0.5));
    console.log("result:",result)
}
async function main() {
    addPool()
    
}

main();