const { NFTStorage, File } = require('nft.storage');
const fs = require('fs');
const path = require('path');

// Paste your NFT.Storage API key into the quotes:
const NFT_STORAGE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEUwZjgyOTYzY2I3NEE4RTE4ZjA4MjdGMURDZDdkNTNGNmI5YjUyNmUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwODQ0MjY2ODExNCwibmFtZSI6IkFQSSJ9.nfd95SLEERTgvR_ToZADIO3WQjYkmiH0Y_PjurBpK6I'

async function main() {
    let filePath = "/Users/jayz/Desktop/file/1.jpg";
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })
    let content = await fs.promises.readFile(filePath);
    let name = path.basename(filePath);
    let file = new File([content], name);
    nftstorage.store({
        image:file,
        name,
        description: "haha"
    })
}
main();