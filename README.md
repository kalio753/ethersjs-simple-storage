# How to run this Project

\_yarn  
\_yarn compile  
\_Create .env file with variable of RPC_SERVER, WALLET_PRIVATE_KEY (in this project I used Ganache)  
\_node deploy.js

## Secure Private Key (Optional)

\_Place WALLET\*PRIVATE_KEY and PRIVATE_KEY_PASSWORD in .env  
\_node encryptedKey.js -> Generate .encryptedKey.json  
\_Delete WALLET_PRIVATE_KEY and PRIVATE_KEY_PASSWORD in .env  
\_In deploy.js:

```solidity
const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8")
let wallet = new ethers.Wallet.fromEncryptedJsonSync(encryptedJson,process.env.PRIVATE_KEY_PASSWORD)
wallet = await wallet.connect(provider)
```

\_PRIVATE_KEY_PASSWORD=password node deploy.js
