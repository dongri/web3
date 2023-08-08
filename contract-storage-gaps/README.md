# Deploy
```
$ op run -- npx hardhat run --network goerli scripts/deploy.ts
0xb0a07e4cE6b34c33887D5c1edbc4bD86C48bF406

$ op run -- npx hardhat run --network goerli scripts/upgrade.ts
```

# Verify
```
$ op run -- npx hardhat verify --network goerli 0xb0a07e4cE6b34c33887D5c1edbc4bD86C48bF406
```

# Document

https://docs.openzeppelin.com/upgrades-plugins/1.x/writing-upgradeable#storage-gaps

# 親contractに変数追加できないパターン

```solidity
# Papa.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Papa {
    string private name;

    function setName(string memory _name) public {
        name = _name;
    }

    function getName() public {
        name = "Papa";
    }

}

# Son.sol
pragma solidity ^0.8.9;
import "./Papa.sol";

contract Son is Papa {
    string private school;

    function setSchool(string memory _school) public {
        school = _school;
    }

    function getSchool() public view returns (string memory) {
        return school;
    }

}

```

deployProxy(Son)

```solidity
# Papa.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Papa {
    string private name;
    string private age;

    function setName(string memory _name) public {
        name = _name;
    }

    function getName() public {
        name = "Papa";
    }

}

```

upgradeProxy('0xXXXX', Son)

```solidity
Error: New storage layout is incompatible

contracts/Papa.sol:6: Inserted `age`
  > New variables should be placed after all existing inherited variables

```

# 親contract変数できるパターン

```solidity
# Papa.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Papa {
    string private name;
    uint256[50] __gap;

    function setName(string memory _name) public {
        name = _name;
    }

    function getName() public {
        name = "Papa";
    }

}

```

deployProxy(Son)

```solidity
# Papa.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Papa {
    string private name;
    string private age;
    uint256[49] __gap;

    function setName(string memory _name) public {
        name = _name;
    }

    function getName() public {
        name = "Papa";
    }

}

```

upgradeProxy('0xXXXXXX', Son)

デプロイできて、子contractでも使用可能

`__gap` の主な目的は継承元（親クラス）に新しい変数を追加したい場合に用意する
