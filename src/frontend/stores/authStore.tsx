import create from 'zustand'
import { provider } from "../initializers/ethers"
type TAuthStore = {
    connectWallet():void
}

export const authStore = create<TAuthStore>((set) => ({
    connectWallet : ()=>{
        provider.send('eth_requestAccounts', [])
        .catch(() => console.log('user rejected request'));

    },
}))

export default authStore
