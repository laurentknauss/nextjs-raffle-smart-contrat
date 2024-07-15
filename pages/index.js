import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import LotteryEntrance from "../components/LotteryEntrance";
import { useMoralis } from "react-moralis";

const supportedChains = ["43113"]

export default function Home() {
  const { isWeb3Enabled, chainId } = useMoralis();

  return (
    <div className={styles.container}>
      <Head>
        <title>Web3 Raffle</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <Header />
      {isWeb3Enabled ? (
        <div>
          {supportedChains.includes(parseInt(chainId).toString()) ? (
            <div className="flex flex-row">
              <LotteryEntrance className="p-8" />
            </div>
          ) : (
            <div>{`Please switch to a supported chain ! 
               The supported Chain is Avalanche Testnet , Id ${supportedChains}`}</div>
          )}
        </div>
      ) : (
          <div> </div> 
      )}
      </div>
      );   
      
    

}
