// const infuraKey = "06c80c13728d4878a465b5a097a158e7"
const infuraKey = "d3076417cfaf4ecbb9028ea909de7356"
const alchemyKey = "Tf4PvJTEiSItmINABzwspg-7bgRDPnfS"

module.exports = {
	rightNetworks: [5, 97],
	defaultNetwork: 5,
	1: {
		name: "Ethereum Mainnet",
		unit: "ETH",
		isTest: false,
		hasExplorer: true,
		explorer: {
			root: "https://etherscan.io/",
			address: "address/",
			tx: "tx/",
		},
		httpProvider: `https://mainnet.infura.io/v3/${infuraKey}`,
		wssProvider: `wss://mainnet.infura.io/ws/v3/${infuraKey}`,
	},
	2: {
		name: "Deprecated Morden test network",
		isTest: true,
		hasExplorer: false,
	},
	3: {
		name: "Ropsten test network",
		unit: "ETH",
		isTest: true,
		hasExplorer: true,
		explorer: {
			root: "https://ropsten.etherscan.io/",
			address: "address/",
			tx: "tx/",
		},
		httpProvider: `https://ropsten.infura.io/v3/${infuraKey}`,
		wssProvider: `wss://ropsten.infura.io/ws/v3/${infuraKey}`,
	},
	4: {
		name: "Rinkeby test network",
		unit: "ETH",
		isTest: true,
		hasExplorer: true,
		explorer: {
			root: "https://rinkeby.etherscan.io/",
			address: "address/",
			tx: "tx/",
		},
		httpProvider: `https://rinkeby.infura.io/v3/${infuraKey}`,
		wssProvider: `wss://rinkeby.infura.io/ws/v3/${infuraKey}`,
	},
	5: {
		name: "Görli test network",
		unit: "GoETH",
		isTest: true,
		hasExplorer: true,
		explorer: {
			root: "https://goerli.etherscan.io/",
			address: "address/",
			tx: "tx/",
		},
		// httpProvider: `https://goerli.infura.io/v3/${infuraKey}`,
		// wssProvider: `wss://goerli.infura.io/ws/v3/${infuraKey}`,
		httpProvider: `https://eth-goerli.alchemyapi.io/v2/${alchemyKey}`,
		wssProvider: `wss://eth-goerli.ws.alchemyapi.io/v2/${alchemyKey}`,
	},
	42: {
		name: " Kovan test network",
		unit: "ETH",
		isTest: true,
		hasExplorer: true,
		explorer: {
			root: "https://goerli.etherscan.io/",
			address: "address/",
			tx: "tx/",
		},
		httpProvider: `https://goerli.infura.io/v3/${infuraKey}`,
		wssProvider: `wss://mainnet.infura.io/ws/v3/${infuraKey}`,
	},
	66: {
		name: "Aldwych network",
		unit: "ETH",
		isTest: true,
		hasExplorer: true,
		explorer: {
			root: "https://explorer.aldwych.blaquetec.org/",
			address: "account/",
			tx: "tx/",
		},
	},
	56: {
		name: "BSC Mainnet",
		unit: "BNB",
		isTest: false,
		hasExplorer: true,
		explorer: {
			root: "https://testnet.bscscan.com/",
			address: "account/",
			tx: "tx/",
		},
		httpProvider: "https://bsc-dataseed.binance.org",
	},
	97: {
		name: "BSC Testnet",
		unit: "BNB",
		isTest: true,
		hasExplorer: true,
		explorer: {
			root: "https://testnet.bscscan.com/",
			address: "account/",
			tx: "tx/",
		},
		httpProvider: "https://data-seed-prebsc-1-s1.binance.org:8545",
	},
	4447: {
		name: "Truffle Develop Network",
		isTest: true,
		hasExplorer: false,
	},
	5777: {
		name: "Ganache Blockchain",
		isTest: true,
		hasExplorer: false,
	},
}
