
import Image from 'next/image'; 
import styles from '../styles/Home.module.css'; 
import { ConnectButton } from "web3uikit"


// Define a custom loader function for images
const customLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };






export default function Header() {
    return (
            <navClass>
            <h1 className="py-4 px-4 font-bold text-7xl"> Decentralized Raffle</h1>
            <div className={`${styles.imageContainer} flex justify-center items-center`}>
                <Image
                loader={customLoader} 
                src="/chainlink.png"
                width={300} 
                height={300}                
                priority
                />
                </div>


            <div className="ml-auto py-2 px-4">
                <ConnectButton moralisAuth={false}/>
            </div>
        </navClass>
    )
}