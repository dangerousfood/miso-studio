import MISO_TOKEN_FACTORY_ABI from './abis/MISOTokenFactory.json'
import MISO_FARM_FACTORY_ABI from './abis/MISOFarmFactory.json'
import LIST_FACTORY_ABI from './abis/ListFactory.json'
import MISO_LAUNCHER_ABI from './abis/MISOLauncher.json'
import MISO_MARKET_ABI from './abis/MISOMarket.json'
import CROWDSALE_ABI from './abis/Crowdsale.json'
import DUTCH_AUCTION_ABI from './abis/DutchAuction.json'
import BATCH_AUCTION_ABI from './abis/BatchAuction.json'
import HYPERBOLIC_AUCTION_ABI from './abis/HyperbolicAuction.json'
import ERC20_ABI from './abis/ERC20.json'
import POOL_LIQUIDITY_ABI from './abis/PoolLiquidity.json'
import MISO_RECIPE_02_ABI from './abis/MISORecipe02.json'
import WETH_ABI from './abis/WETH9.json'
import MISO_HELPER_ABI from './abis/MISOHelper.json'
import MISO_MASTER_CHEF_ABI from './abis/MISOMasterChef.json'

/* eslint-disable prettier/prettier */
export const tokenFactory = {
	address: {
		1: "0xA550114ee3688601006b8b9f25e64732eF774934", // main
		3: "0x9fEc0402944037d8d96Cfd05bFDEb4324400653C", // ropsten
		4: "0x29FeaCd4329833Af72fb3Eb33aD3838F36f9385a", // rinkeby
		42: "0xb3943350DF5856A48fCeBF393771d8802A2cd92D", // kovan
		5: "0x494C9ECF590126d2784D8f72cc0BfCEb72f3Cdaa", // goerli
		56: "", // BSC mainnet
		97: "0x20AcBac4BB3200b27DA8f2Fca154C8A346098254", // BSC testnet
	},
	abi: MISO_TOKEN_FACTORY_ABI,
}

export const farmFactory = {
	address: {
		1: "", // main
		3: "0xA6fBa394Ab40C29fEa394Fc4Ea8Afe4184149553", // ropsten
		4: "0x08BD0C9F9154212E8d0684e0EEf92300034E8743", // rinkeby
		42: "0xC9FdA883AFD33606ff4faAEEa59554a3be3AA271", // kovan
		5: "0x4fFc1D3a04bfb3E657c3248AE1986786A49362cF", // goerli
		56: "", // BSC mainnet
		97: "0xCFe87a56b896ec8aB9560569e14B70B262131B5a", // BSC testnet
	},
	abi: MISO_FARM_FACTORY_ABI,
}

export const listFactory = {
	address: {
		1: "", // main
		3: "0x428C2E48FD89Fd759C14ac97e33Ce541159e0583", // ropsten
		4: "0xFde0Ac8Ab559cb04b0033Ae8bAe706F21105E4d1", // rinkeby
		42: "0x28a84670c4C1C5D74bF164AE18688f2AA6ea7411", // kovan
		5: "0x4C2b109dde326efDFfa9d106fC1ade6463Eb6Db1", // goerli
		56: "", // BSC mainnet
		97: "0x2600BD29BB067489ED9969493E9D5caD6Fd29f28", // BSC testnet
	},
	abi: LIST_FACTORY_ABI,
}

export const misoLauncher = {
	address: {
		1: "", // main
		3: "0x89d9C21cABb1eE74E8e2BB792FCafdF8EDc366A4", // ropsten
		4: "0x44706B409453baBa660a4Ac480677AeD6C731EBC", // rinkeby
		42: "0x5940DF4FD357b6e1f5ED17EE9Baf9Da0ae9C17Cb", // kovan
		5: "0x3e1deFf91dF395e9024c3b450096131A36BD297D", // goerli
		56: "", // BSC mainnet
		97: "0xE25FE96924f68320C59F2Df776Fe63AFd3292cdF", // BSC testnet
	},
	abi: MISO_LAUNCHER_ABI,
}

export const misoMarket = {
	address: {
		1: "", // main
		3: "0x264711419866C6ADD2BbCDd5746790E84cF62e48", // ropsten
		4: "0x6bF3e9E9Dc251106Fd6202B8eD63d3b481B1f7d6", // rinkeby
		42: "0xc75cbBDAd0Cd33b616Ec25bA914D039ed2085d42", // kovan
		5: "0xA370345F738d5795BA62Db3f142e2E84cAfD3760", // goerli
		56: "", // BSC mainnet
		97: "0x3a445de8fc2afAEc163e531D8f8C0A15D8af7D5c", // BSC testnet
	},
	abi: MISO_MARKET_ABI,
}

export const crowdsaleTemplate = {
	address: {
		1: "", // main
		3: "0x6f5391dD88C2FB327d5894dcbE42A5e3C87e2fC0", // ropsten
		4: "0x8349ddEa4fdfF24201890D90C6af72Dc971caB91", // rinkeby
		42: "0x9245997d0E7D692f39eFFB1Ed6f61d620750Eb3B", // kovan
		5: "0x357913c8ffCDa8344E47a7F0eF8388B5063410ae", // goerli
		56: "", // BSC mainnet
		97: "0x38916D314ba3101C35126D54BfeC11bb3Be9b6AA", // BSC testnet
	},
	abi: CROWDSALE_ABI,
}

export const dutchAuction = {
	address: {
		1: "", // main
		3: "0x92F43e9C8636AE8E011e89c0928AC865a5d6A6E3", // ropsten
		4: "0x848abB2A27041A5a175fFf0A4Bc108a39028F398", // rinkeby
		42: "0x89540210D56c18760115FD2c4C7847D98c408b28", // kovan
		5: "0xcD1377dd0e0093681af5a58c14dD644Fe9dB80A1", // goerli
		56: "", // BSC mainnet
		97: "0xb597Ebb2caAe14e3b73AC98dd68aBA75fb267475", // BSC testnet
	},
	abi: DUTCH_AUCTION_ABI,
}

export const batchAuction = {
	address: {
		1: "", // main
		3: "0x5771c1647001250456EBE3B4310aE257e325D5b2", // ropsten
		4: "0x357913c8ffCDa8344E47a7F0eF8388B5063410ae", // rinkeby
		42: "0x501db6C8a7427cf6e0b4F8A5727D111DcF5F702a", // kovan
		5: "0x6bF3e9E9Dc251106Fd6202B8eD63d3b481B1f7d6", // goerli
		56: "", // BSC mainnet
		97: "0xB84465da75Da56aC2482AA41088B2e28aB4B2110", // BSC testnet
	},
	abi: BATCH_AUCTION_ABI,
}

export const hyperbolicAuction = {
	address: {
		1: "", // main
		3: "0xBfc67Cd67928a0Ee6dF88a2d7cE4031533FCB7e5", // ropsten
		4: "0xcD1377dd0e0093681af5a58c14dD644Fe9dB80A1", // rinkeby
		42: "0x6cCC1998876486CE0cB662FC151Abb84eA19Ad4d", // kovan
		5: "0x6Ab711D341a384BaFD602A1952079066AA78Cb19", // goerli
		56: "", // BSC mainnet
		97: "0x6ED09B747077463311b7BF8D9897BC5472976008", // BSC testnet
	},
	abi: HYPERBOLIC_AUCTION_ABI,
}

export const poolLiquidityTemplate = {
	address: {
		1: "", // main
		3: "", // ropsten
		4: "", // rinkeby
		42: "", // kovan
		5: "0xB73186801a10119e372a097F8f2647188DC417c9", // goerli
		56: "", // BSC mainnet
		97: "0x26E90aE3d4a41557D7141E280D3A495401a05371", // BSC testnet
	},
	abi: POOL_LIQUIDITY_ABI,
}

export const recipe02 = {
	address: {
		1: "", // main
		3: "", // ropsten
		4: "", // rinkeby
		42: "", // kovan
		5: "0x33B6Cc1627554D34E3446CD6721c5f4b56699794", // goerli
		56: "", // BSC mainnet
		97: "", // BSC testnet
	},
	abi: MISO_RECIPE_02_ABI,
}

export const ERC20 = {
	abi: ERC20_ABI,
}

export const wethToken = {
	address: "0xbf81FD58BAC258905f052DEd3F6535Ea25336Fb3",
	abi: WETH_ABI,
}

export const sushi = {
	address: {
		1: "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2",
		3: "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2", // ropsten
		4: "", // rinkeby
		42: "", // kovan
		5: "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2", // goerli
		56: "", // BSC mainnet
		97: "", // BSC testnet
	}, 
}



export const dai = {
	address: {
		1: "0x6b175474e89094c44da98b954eedeac495271d0f",
		3: "", // ropsten
		4: "", // rinkeby
		42: "", // kovan
		5: "0xF2D1F94310823FE26cFa9c9B6fD152834b8E7849", // goerli
		56: "", // BSC mainnet
		97: "", // BSC testnet
	}, // main
	misoFeeAcct: "0x2a3070d384f2871c4fddf05f4c5dd9b6272fb54c", // integratorFeeAccount
}

export const misoHelper = {
	address: {
		1: "",
		3: "0x69563367EE14928d15c2Cc5Eb3E92847b23A32ec", // ropsten
		4: "0x69563367EE14928d15c2Cc5Eb3E92847b23A32ec", // rinkeby
		42: "0xA564bf9EAE15816d89f9fbC8d9264B056f039a3E", // kovan
		5: "0x0e9aA0158AB5FFb44f6839857dC8024c38695ae3", // goerli
		56: "", // BSC mainnet
		97: "0xd51CEf756e61b11028b6604430a66816d99Bf6FF", // BSC testnet
	},
	abi: MISO_HELPER_ABI,
}

export const masterChefTemplate = {
	address: {
		1: "", // main
		3: "0xae4630aBD1a489fDa717C127F2744ec5d14fCBa2", // ropsten
		4: "0xbA90BF5c7cbd43F54bF5BAcdc83E6BE0AC6943D0", // rinkeby
		42: "0x6A21a80C62b86e1EaC7A7E0a039066Fc1fBfC03D", // kovan
		5: "0x3Fc0f7340a8F81558ee42260A6b86D53926CA642", // goerli
		56: "", // BSC mainnet
		97: "0x724E805B2Cb91067df95243963Ca50Dea91C6756", // BSC testnet
	},
	abi: MISO_MASTER_CHEF_ABI,
}
