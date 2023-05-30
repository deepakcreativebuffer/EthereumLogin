import { create } from 'zustand';
import { provider } from "../initializers/ethers"
import axios from "axios"
import { SiweMessage } from 'siwe';
type TAuthStore = {
    address: string
    ready: boolean
    loggedIn: boolean
    connectWallet(): void
    signin(): void
    init(): void
}

export const authStore = create<TAuthStore>((set) => ({
    address: '',
    loggedIn: false,
    ready: false,

    init: async () => {
        try {
            const res = await axios.get('/api/validate')
            // console.log("res>>>>>",res)
            set({ address: res.data.address, loggedIn: true, ready: true })

        } catch (err) {
            const accounts = await provider.listAccounts()
            // console.log("accounts >>>>>>>",accounts)
            if (accounts[0]) {
                // console.log("accounts[0]>>>>>>>>>>>>>>",accounts[0])
                set({ ready: true, address:accounts[0].toString() })
            } else {
                set({ ready: true })
            }
        }
    },

    connectWallet: async () => {
        const accounts = await provider.send('eth_requestAccounts', [])
            .catch(() => console.log('user rejected request'));
        console.log("account ",accounts)
        if (accounts[0]) {
            set({ address: accounts[0] })
        }
    },


    signin: async () => {
        const signer = await provider.getSigner();
        try {  
            // Get nonce 
            const res = await axios.get('/api/nonce')

            // Create Message 
            const messageRaw = new SiweMessage({
                domain: window.location.host,
                address: await signer.getAddress(),
                statement: 'Sign in with Ethereum to the app',
                uri: window.location.origin,
                version: '1',
                chainId: 1,
                nonce: res.data
            });

            const message = messageRaw.prepareMessage();

            // Get Signature 
            const signature = await signer.signMessage(message);
            
            // Send to server 
            const res2 = await axios.post('/api/verify', { message, signature })
            set({ loggedIn: true })
        } catch (err) { 
            console.log(err)
        }
    }
}))

export default authStore
