import networkConfig from "../config/networkConfig"

const rightNetworks = networkConfig.rightNetworks

export const getAccount = async () => {
	try {
		const accounts = await web3.eth.getAccounts()
		return accounts[0]
	} catch (err) {
		return false
	}
}

export const getNetwork = () => {
	return new Promise((resolve) => {
		const networkId = window.ethereum.networkVersion || window.ethereum.chainId
		if (!networkId) {
			setTimeout(() => {
				return resolve(getNetwork())
			}, 2000)
		} else {
			return resolve(networkId)
		}
	})
}

export const getNetworkOldVersion = () =>
	new Promise((resolve) => {
		if (web3.version.getNetwork) {
			web3.version.getNetwork((err, chainId) => {
				if (!err) {
					resolve(chainId)
				} else {
					resolve(false)
				}
			})
		} else {
			web3.eth.getChainId((err, chainId) => {
				if (!err) {
					resolve(chainId)
				} else {
					resolve(false)
				}
			})
		}
	})

export const connect = async () => {
	let account = null
	try {
		const accounts = await window.ethereum.enable()
		account = accounts[0]
	} catch (error) {
		console.log("error on connecting account", error)
	}
	return account
}

export const isRightNetwork = (networkId) => {
	return rightNetworks.includes(parseInt(networkId))
}
