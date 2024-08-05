import { ConnectWallet } from '../../components/ConnectWallet/ConnectWallet';
import { Header } from '../../components/Header';
import './index.css';
export default function Wallet() {
  return (
    <div className="home-container">
      <Header />
      <div className="home-content">
        <ConnectWallet/>
      </div>
    </div>
  );
}
