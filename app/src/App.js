import React, { useEffect } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import apeLogo from './assets/ape-logo.png';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  // Actions

  /*
  * Declare your function
  */
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana && solana.isPhantom) {
          console.log('Phantom wallet found!');

        /*
         * The solana object gives us a function that will allow us to connect
         * directly with the user's wallet!
         */
        const response = await solana.connect({ onlyIfTrusted: true });
        console.log(
          'Connected with Public Key:',
          response.publicKey.toString()
        ); 
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {};
  /*
   * Render mint button when user has not connected wallet yet
   */
  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  /*
   * When our component first mounts, let's check to see if we have a connected
   * Phantom Wallet
   */
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);
  
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <img alt="ape logo" className="ape-logo" src={apeLogo} />
          <p className="header">Solana Apes</p>
          <p className="sub-text">NFT minting machine</p>
          {/* Render your connect to wallet button right here */}
          {renderNotConnectedContainer()}
        </div>
      </div>
    </div>
  );
};

export default App;
