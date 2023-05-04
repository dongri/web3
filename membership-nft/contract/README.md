# NFT

# deploy
```
$ op run -- npx hardhat run --network goerli scripts/deploy.js
0xEd19dDc9c0760af11294827b713919460c1aa3Dc
```

# setting
```
$ op run -- npx hardhat console --network goerli

> const f = await ethers.getContractFactory("Membership")
undefined

> const c = await f.attach("0xEd19dDc9c0760af11294827b713919460c1aa3Dc")
undefined

> await c.setTokenBaseURI("ipfs://QmQGJGWneTtUQUfM6AH3WnDj2xH8Zm9jZjzCYEwrYU3n4x")

> await c.setMembershipPrice(1, ethers.utils.parseEther("0.001"))

> await c.setMembershipPrice(2, ethers.utils.parseEther("0.002"))

> await c.setMembershipPrice(3, ethers.utils.parseEther("0.003"))
```

# publish
```
$ op run -- npx hardhat verify --network goerli 0xb78742b3b1666B48E22C0E275Fd009eBDcE9115C
```
