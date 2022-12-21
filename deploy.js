const ethers = require("ethers")
const fs = require("fs")
require("dotenv").config()

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(
        process.env.RPC_SERVER
    )
    const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider)

    const abi = fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.abi",
        "utf-8"
    )
    const binary = fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.bin",
        "utf-8"
    )

    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
    console.log("Deploying, plz wait ...")
    const contract = await contractFactory.deploy()
    await contract.deployTransaction.wait(1)
    // const deploymentReceipt = await contract.deployTransaction.wait(1)
    // console.log(deploymentReceipt)
    const curFavNum = await contract.retrieve()
    console.log(`Initial favorite number: ${curFavNum.toString()}`)

    const txResponse = await contract.store("19")
    const txReceipt = await txResponse.wait(1)
    const updatedFavNum = await contract.retrieve()
    console.log(`Updated favorite number: ${updatedFavNum.toString()}`)
}

main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
