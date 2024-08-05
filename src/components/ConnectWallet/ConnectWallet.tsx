import { useAccount } from 'wagmi';

import { Account } from './Account';
import { Connect } from './Connect';

export function ConnectWallet() {
  const { isConnected } = useAccount();
  return (
    <div className="container">{isConnected ? <Account /> : <Connect />}</div>
  );
}
