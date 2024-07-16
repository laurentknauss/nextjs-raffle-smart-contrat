
import Image from 'next/image'; 
import styles from '../styles/Home.module.css'; 
import { ConnectButton } from "web3uikit"


// Define a custom loader function for images
const customLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };






export default function Header() {
    return (
            <nav className="flex flex-col md:flex-row items-center justify-between p-4">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-0">
                 Decentralized Raffle</h1>
            <div className={`${styles.imageContainer} w-full md:w-auto flex justify-center items-center mb-4 md:mb-0`}>
                <Image
                loader={customLoader} 
                src="/chainlink.png"
                alt="chainlink"
                width={300} 
                height={300}                
                priority
                />
                </div>


            <div className="w-full md:w-auto flex justify-center md:justify-end">
                <ConnectButton moralisAuth={false}/>
            </div>
        </nav>
    )
}