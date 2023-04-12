# contract

```
$ op run -- npx hardhat run --network goerli scripts/deploy.js
```
token deployed to: 0x94309F12493b99D6b21104ca9B33973b1c9c74ea

```
$ op run -- npx hardhat console --network goerli

> const f = await ethers.getContractFactory("NFTCreator")
undefined

> const c = await f.attach("0x94309F12493b99D6b21104ca9B33973b1c9c74ea")
undefined

> await c.setAdmin('0x9D7Fa65552609eDF74417485D80613da5eC09Fe5')
```
