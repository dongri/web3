# NFT

# deploy
```
$ op run -- npx hardhat run --network goerli scripts/deploy.js
0x92F54379B4D47aeB9bC12C7bDAb95Df098DCBD1E
```

# setting
```
$ op run -- npx hardhat console --network goerli

> const f = await ethers.getContractFactory("DelegateCashSample")
undefined

> const c = await f.attach("0x92F54379B4D47aeB9bC12C7bDAb95Df098DCBD1E")
undefined

> await c.setTokenBaseURI("https://lgtm.lol/metadata")

```

# publish
```
$ op run -- npx hardhat verify --network goerli 0x92F54379B4D47aeB9bC12C7bDAb95Df098DCBD1E
```
