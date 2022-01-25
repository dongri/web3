package main

import (
	"encoding/json"
	"fmt"

	"github.com/everFinance/goar"
	"github.com/everFinance/goar/types"
)

type MetaData struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	Image       string `json:"image"`
}

func main() {
	wallet, err := goar.NewWalletFromPath("./keyfile.json", "https://arweave.net")
	if err != nil {
		panic(err)
	}

	testToken := MetaData{
		Name:        "Test Token",
		Description: "This is a test token",
		Image:       "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
	}

	// struct to bytes
	b, err := json.Marshal(testToken)
	if err != nil {
		panic(err)
	}

	id, err := wallet.SendData(
		b, // Data bytes
		[]types.Tag{
			// types.Tag{
			// 	Name:  "testSendData",
			// 	Value: "123",
			// },
		},
	)

	fmt.Println(id, err) //
}
