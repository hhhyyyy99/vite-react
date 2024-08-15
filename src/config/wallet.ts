import { http, createConfig } from 'wagmi';
import { base, mainnet, optimism } from 'wagmi/chains';
import { injected, metaMask, safe,coinbaseWallet } from 'wagmi/connectors';

export const config = createConfig({
  chains: [mainnet, optimism, base],
  connectors: [coinbaseWallet(),injected(), metaMask(), safe()],
  transports: {
    [mainnet.id]: http(),
    [optimism.id]: http(),
    [base.id]: http(),
  },
});
