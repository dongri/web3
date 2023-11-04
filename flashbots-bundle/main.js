import * as dotenv from 'dotenv'
dotenv.config()

// 1. Import everything
import { Wallet, BigNumber, ethers, providers } from 'ethers'
import { FlashbotsBundleProvider, FlashbotsBundleResolution } from '@flashbots/ethers-provider-bundle'

const RECEIPENT_ADDRESS = '0xC8fE17824bdf7C0FdF7fB63D9F4D0b161a73C2a8'

/*
Mainnet
const provider = new providers.JsonRpcProvider(process.env.PROVIDER_RPC_URL)
const wsProvider = new providers.WebSocketProvider(process.env.PROVIDER_WSS_URL)
*/

// 2. Setup a standard provider in goerli
const provider = new providers.JsonRpcProvider(process.env.PROVIDER_RPC_URL)
const wsProvider = new providers.WebSocketProvider(process.env.PROVIDER_WSS_URL)

// 3. The unique ID for flashbots to identify you and build trust over time
const authSigner = new Wallet(
	process.env.SIGNER_PRIVATE_KEY,
	provider
)

const start = async () => {
	// 4. Create the flashbots provider
	const flashbotsProvider = await FlashbotsBundleProvider.create(
		provider,
		authSigner,
		process.env.RELAY_URL,
		'goerli',
	)

	const GWEI = BigNumber.from(10).pow(9)
	const LEGACY_GAS_PRICE = GWEI.mul(13)
	const PRIORITY_FEE = GWEI.mul(100)
	const blockNumber = await provider.getBlockNumber()
	const block = await provider.getBlock(blockNumber)
	const maxBaseFeeInFutureBlock = FlashbotsBundleProvider.getMaxBaseFeeInFutureBlock(block.baseFeePerGas, 6) // 100 blocks in the future

	console.log('maxBaseFeeInFutureBlock', String(maxBaseFeeInFutureBlock), String(maxBaseFeeInFutureBlock.div('100000000000000000')))

	const amountInEther = '0.001'
	// 5. Setup the transactions to send and sign
	const signedTransactions = await flashbotsProvider.signBundle([
		{ // Both transactions are the same but one is type 1 and the other type 2 after the gas changes
			signer: authSigner,
			transaction: {
				to: RECEIPENT_ADDRESS,
				type: 2,
				maxFeePerGas: PRIORITY_FEE.add(maxBaseFeeInFutureBlock),
				maxPriorityFeePerGas: PRIORITY_FEE,
				data: '0x',
				chainId: 5,
				value: ethers.utils.parseEther(amountInEther),
				gasLimit: 300000,
			},
		},
		// we need this second tx because flashbots only accept bundles that use at least 42000 gas.
		{
			signer: authSigner,
			transaction: {
				to: RECEIPENT_ADDRESS,
				gasPrice: LEGACY_GAS_PRICE,
				data: '0x',
				chainId: 5,
				value: ethers.utils.parseEther(amountInEther),
				gasLimit: 300000,
			},
		},
	])

	// 6. We run a simulation for the next block number with the signed transactions
	console.log(new Date())
	console.log('Starting to run the simulation...')
	const simulation = await flashbotsProvider.simulate(
		signedTransactions,
		blockNumber + 1,
	)
	console.log(new Date())

	// 7. Check the result of the simulation
	if (simulation.firstRevert) {
		console.log(`Simulation Error: ${simulation.firstRevert.error}`)
	} else {
		console.log(`Simulation Success: ${blockNumber}`)
	}

	// 8. Send 10 bundles to get this working for the next blocks in case flashbots doesn't become the block producer
	for (var i = 1; i <= 10; i++) {
		const bundleSubmission = await flashbotsProvider.sendRawBundle(
			signedTransactions,
			blockNumber + i
		)
		console.log('bundle submitted, waiting', bundleSubmission.bundleHash)

		const waitResponse = await bundleSubmission.wait()
		console.log(`Wait Response: ${FlashbotsBundleResolution[waitResponse]}`)
		if (
			waitResponse === FlashbotsBundleResolution.BundleIncluded ||
			waitResponse === FlashbotsBundleResolution.AccountNonceTooHigh
		) {
			console.log('Bundle included!')
			process.exit(0)
		} else {
			console.log({
				bundleStats: await flashbotsProvider.getBundleStats(
					simulation.bundleHash,
					blockNumber + 1,
				),
				userStats: await flashbotsProvider.getUserStats(),
			})
		}
	}
	console.log('bundles submitted')
}

start()
