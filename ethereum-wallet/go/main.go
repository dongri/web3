package main

import (
	"fmt"
	"log"

	"github.com/dongri/web3/ethereum-wallet/go/hdwallet"
)

func main() {
	mnemonic, err := hdwallet.NewMnemonic(hdwallet.Word24)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("mnemonic:", mnemonic)
	fmt.Println("")
	root, err := hdwallet.New(&hdwallet.Config{
		Mnemonic: mnemonic,
		Path:     "m/44'/60'/0'/0",
	})
	if err != nil {
		panic(err)
	}
	for i := 0; i < 10; i++ {
		wallet, err := root.Derive(uint32(i))
		if err != nil {
			panic(err)
		}
		fmt.Println("address     : ", wallet.AddressHex())
		fmt.Println("private Key : ", wallet.PrivateKeyHex())
		fmt.Println("")
	}
}
