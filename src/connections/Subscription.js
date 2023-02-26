import { prepareWriteContract, readContract, writeContract } from '@wagmi/core'
import { polygonMumbai } from '@wagmi/core/chains'
import { isValidAddress } from '../helpers/isValidAddress'
import ERC20ABI from '../abis/ERC20.json'
import ContractSubscriptionABI from '../abis/ContentSubscription.json'
import CONTENT_SUBSCRIPTION from '../constants/ContentSubscription.json'

function getSubscriptionContractAddress() {
    const address = CONTENT_SUBSCRIPTION['Mumbai']
    if (!isValidAddress(address)) throw new Error('Invalid contract address.')
    return address
}

/**
 * Compute asset id from the creator address and content id
 * @param {string} creator
 * @param {string} contentId
 * @returns
 */
export function getAssetId(creator, contentId) {
    if (!isValidAddress(creator)) throw new Error('Not a valid creator address.')
    return readContract({
        chainId: polygonMumbai.chainId,
        address: getSubscriptionContractAddress(),
        abi: ContractSubscriptionABI,
        functionName: 'getAssetId',
        args: [creator, contentId],
    })
}

/**
 * Detect ownership of the given asset
 * @param {string} owner
 * @param {string} assetId
 * @returns
 */
export function isQualified(owner, assetId) {
    if (!isValidAddress(owner)) throw new Error('Not a valid owner address.')
    return readContract({
        chainId: polygonMumbai.chainId,
        address: getSubscriptionContractAddress(),
        abi: ContractSubscriptionABI,
        functionName: 'isQualified',
        args: [owner, assetId],
    })
}

/**
 * Return the balance of the owner on the ERC20 contract
 */
export function balanceOf(address, owner) {
    if (!isValidAddress(address)) throw new Error('Not a valid contract address.')
    if (!isValidAddress(owner)) throw new Error('Not a valid owner address.')
    return readContract({
        chainId: polygonMumbai.chainId,
        address,
        abi: ERC20ABI,
        functionName: 'balanceOf',
        args: [owner],
    })
}

/**
 * Create a asset on SC
 * @param {string} contentId
 * @param {string} paymentTokenAddress
 * @param {string} paymentTokenAmount
 * @returns
 */
export async function createAsset(contentId, paymentTokenAddress, paymentTokenAmount) {
    if (!isValidAddress(paymentTokenAddress)) throw new Error('Not a valid payment token address.')
    const config = await prepareWriteContract({
        chainId: polygonMumbai.chainId,
        address: getSubscriptionContractAddress(),
        abi: ContractSubscriptionABI,
        functionName: 'createAsset',
        args: [contentId, paymentTokenAddress, paymentTokenAmount],
    })
    const { hash, wait } = await writeContract(config)

    await wait()
    return hash
}

/**
 * Purchase a asset on SC
 * @param {string} assetId
 * @returns
 */
export async function purchaseAsset(assetId) {
    const config = await prepareWriteContract({
        chainId: polygonMumbai.chainId,
        address: getSubscriptionContractAddress(),
        abi: ContractSubscriptionABI,
        functionName: 'purchaseAsset',
        args: [assetId],
    })
    const { hash, wait } = await writeContract(config)

    await wait()
    return hash
}

/**
 * Withdraw asset from SC
 * @param {string} paymentTokenAddress
 * @param {string} paymentTokenAmount
 * @returns
 */
export async function withdrawToken(paymentTokenAddress, paymentTokenAmount) {
    const config = await prepareWriteContract({
        chainId: polygonMumbai.chainId,
        address: getSubscriptionContractAddress(),
        abi: ContractSubscriptionABI,
        functionName: 'purchaseAsset',
        args: [paymentTokenAddress, paymentTokenAmount],
    })
    const { hash, wait } = await writeContract(config)

    await wait()
    return hash
}
